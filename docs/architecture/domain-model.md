# Domain Model — Motori (MVP)

Este documento descreve o modelo de domínio do Motori para o MVP:
controle de custos do veículo e lembretes de manutenção.

> Princípios do MVP:
> - Simplicidade > completude
> - Dados sempre pertencem ao usuário
> - Multi-veículos, mas uso pessoal
> - Offline-first no cliente; backend é source of truth

---

## 1. Bounded Contexts (visão macro)

No MVP, o domínio pode ser implementado em módulos, mantendo separação clara:

- **Identity & Access**: usuário e autenticação
- **Garage**: veículos
- **Logbook**: registros (abastecimentos, despesas, serviços)
- **Reminders**: lembretes e status
- **Reporting**: agregações e relatórios simples

---

## 2. Entidades principais (MVP)

### 2.1 User
Representa a conta do usuário (uso pessoal).

**Atributos**
- `id` (UUID)
- `email` (único)
- `passwordHash`
- `name` (opcional)
- `createdAt`, `updatedAt`

**Regras**
- Um usuário possui N veículos.
- Tudo é sempre escopado por `userId` (ownership).

---

### 2.2 Vehicle
Representa um veículo cadastrado pelo usuário.

**Atributos (MVP)**
- `id` (UUID)
- `userId` (FK)
- `name` (ex: “Civic 2010”)
- `type` (enum: CAR, MOTORCYCLE, TRUCK, BUS, OTHER)
- `fuelTypeDefault` (opcional; enum)
- `initialOdometer` (number)
- `odometerUnit` (MVP: default `KM`; manter campo para futuro)
- `createdAt`, `updatedAt`

**Regras**
- Um veículo possui N registros: abastecimentos, despesas, serviços, lembretes.
- `initialOdometer` é o valor base quando não há registros ainda.

**Notas**
- “Odômetro atual” no MVP é derivado do maior `odometer` registrado nas entradas do veículo; se não existir, usa `initialOdometer`.

---

## 3. Registros (Logbook)

No MVP, podemos modelar como tabelas separadas (mais simples) e unificar em timeline por query.
Alternativa futura: `Entry` abstrata com herança (não necessária no MVP).

### 3.1 FuelEntry (Abastecimento)

**Atributos**
- `id` (UUID)
- `vehicleId` (FK)
- `date` (datetime)
- `odometer` (number)
- `liters` (number)
- `totalCost` (decimal)
- `fuelType` (enum: GASOLINE, ETHANOL, DIESEL, FLEX, CNG, ELECTRIC, OTHER)
- `pricePerLiter` (decimal, derivado opcional: `totalCost / liters`)
- `notes` (string opcional)
- `createdAt`, `updatedAt`

**Validações**
- `liters > 0`
- `totalCost >= 0`
- `odometer >= 0`

**Observações**
- Não exigir “posto” no MVP (pode virar texto livre depois).

---

### 3.2 ExpenseEntry (Despesa)

**Atributos**
- `id` (UUID)
- `vehicleId` (FK)
- `date` (datetime)
- `amount` (decimal)
- `category` (enum: TAX, FINE, TOLL, INSURANCE, PARKING, WASH, OTHER)
- `odometer` (number opcional)
- `notes` (string opcional)
- `createdAt`, `updatedAt`

**Validações**
- `amount >= 0`
- se `odometer` existir: `odometer >= 0`

---

### 3.3 ServiceEntry (Serviço / Manutenção)

**Atributos**
- `id` (UUID)
- `vehicleId` (FK)
- `date` (datetime)
- `odometer` (number)
- `cost` (decimal)
- `serviceType` (string) *(texto livre no MVP)*
- `notes` (string opcional)
- `nextDueDate` (datetime opcional)
- `nextDueOdometer` (number opcional)
- `createdAt`, `updatedAt`

**Validações**
- `odometer >= 0`
- `cost >= 0`
- pelo menos um de `nextDueDate` ou `nextDueOdometer` pode existir (opcional)

**Observações**
- No MVP, `serviceType` é string. Na v1 pode virar catálogo configurável (com templates).

---

## 4. Reminders (Lembretes)

Lembretes no MVP podem existir:
- Independentes (ex: “Pagar IPVA”)
- Relacionados a um serviço (ex: “Troca de óleo”)

### 4.1 Reminder

**Atributos**
- `id` (UUID)
- `vehicleId` (FK)
- `title` (string)
- `notes` (string opcional)
- `dueDate` (datetime opcional)
- `dueOdometer` (number opcional)
- `status` (enum: PENDING, DONE, DISMISSED)
- `relatedType` (enum opcional: SERVICE, EXPENSE, OTHER)
- `relatedId` (UUID opcional) *(referência fraca no MVP)*
- `createdAt`, `updatedAt`

**Regras**
- Deve ter **pelo menos um**: `dueDate` ou `dueOdometer`.
- Vencido se:
  - `dueDate <= hoje` (considerando timezone do usuário, se existir), ou
  - `dueOdometer <= odometerAtual(vehicle)`
- `DONE` e `DISMISSED` não aparecem como pendentes.

**Notas**
- No MVP, `relatedType/relatedId` é opcional e “soft link”.
- Na v1 pode evoluir para relacionamentos fortes.

---

## 5. Timeline unificada (visão de leitura)

A Timeline é uma **view** unificada (não necessariamente uma tabela).

### 5.1 TimelineItem (Read Model)
**Campos sugeridos**
- `id`
- `type` (FUEL | EXPENSE | SERVICE | REMINDER)
- `date`
- `title`
- `amount` (opcional)
- `odometer` (opcional)
- `metadata` (JSON opcional)

**Objetivo**
- Permitir UI simples “estilo feed”
- Facilitar filtros por período e tipo

---

## 6. Relatórios (Read Models)

Relatórios são agregações, não entidades principais.

### 6.1 MonthlyReport (Read Model)
**Campos**
- `month` (YYYY-MM)
- `fuelTotal`
- `expensesTotal`
- `servicesTotal`
- `grandTotal`
- (opcional) `avgFuelCostPerMonth`, `avgCostPerKm` (quando houver base)

---

## 7. Relacionamentos (resumo)

- `User 1..N Vehicle`
- `Vehicle 1..N FuelEntry`
- `Vehicle 1..N ExpenseEntry`
- `Vehicle 1..N ServiceEntry`
- `Vehicle 1..N Reminder`
- `Reminder 0..1 -> (soft link) ServiceEntry/ExpenseEntry`

---

## 8. Regras de negócio (MVP)

### 8.1 Ownership e isolamento
- Todas as operações devem validar ownership:
  - `Vehicle.userId == currentUser.id`
  - Entradas derivam do veículo, então herdariam ownership.

### 8.2 Odometer atual
- `currentOdometer(vehicle)` = max(odometer em fuel/expense/service que tenham odometer) ou `initialOdometer`.

### 8.3 Consistência de odômetro (não-bloqueante no MVP)
- MVP não deve bloquear registros por “odômetro menor que anterior” (usuários erram).
- Registrar, mas permitir alertas/avisos no futuro.

---

## 9. Evolução planejada (v1 / v2)

### v1 (réplica funcional estilo Drivvo)
- Catálogo de tipos de serviços e despesas
- Anexos (comprovantes/fotos)
- Exportação de dados
- Relatórios avançados e gráficos
- Rotas e renda
- Multi-moeda e unidades

### v2 (ecossistema)
- Price crowdsourcing:
  - `FuelStation`, `FuelPriceReport`, reputação/validação
- Promoções:
  - `Promotion`, `StationOwnerProfile` (verificado)
- Moderação/anti-fraude e governança

---

## 10. Notas de implementação (Prisma/Postgres)

### Tipos numéricos
- Custos e valores devem usar `DECIMAL` no banco (Prisma `Decimal`).
- Evitar float para dinheiro.

### Índices recomendados (MVP)
- `Vehicle(userId)`
- `FuelEntry(vehicleId, date)`
- `ExpenseEntry(vehicleId, date)`
- `ServiceEntry(vehicleId, date)`
- `Reminder(vehicleId, status, dueDate)`
- `Reminder(vehicleId, status, dueOdometer)`

---

## 11. Glossário

- **Registro/Entry**: qualquer item lançado (abastecimento, despesa, serviço)
- **Lembrete/Reminder**: item acionável por data ou km
- **Timeline**: feed unificado de eventos do veículo
- **Read Model**: modelo derivado para consulta/relatório
