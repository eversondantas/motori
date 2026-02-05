# ADR 003: Offline-first no Cliente

## Status
Accepted

## Contexto
Usuários podem registrar dados em situações sem conectividade
(ex: posto de combustível, estrada).

Experiência ruim offline reduz retenção.

## Decisão
Adotar abordagem offline-first no cliente:

- Dados salvos localmente no frontend
- Sincronização com API quando houver conexão
- Backend permanece simples (source of truth)

## Justificativa
- Melhor experiência do usuário
- Complexidade concentrada no cliente
- Evita arquitetura distribuída prematura

## Consequências
### Positivas
- App utilizável sem internet
- Maior retenção

### Negativas
- Necessidade de lidar com conflitos
- Estratégia simples de sync no MVP (last-write-wins)
