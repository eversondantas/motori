# ADR 001: Stack de Backend (NestJS + Prisma + Postgres)

## Status
Accepted

## Contexto
O projeto precisa de um backend:
- Bem estruturado
- Amigável para open source
- Escalável do MVP até versões futuras
- Com boa experiência de desenvolvimento em TypeScript

## Decisão
Utilizar a seguinte stack backend:

- NestJS como framework principal
- Prisma como ORM
- PostgreSQL como banco de dados relacional
- API REST como interface principal

## Justificativa
- NestJS fornece arquitetura modular clara
- Prisma oferece tipagem forte e migrações previsíveis
- PostgreSQL é estável, open source e amplamente suportado
- REST é simples, previsível e suficiente para o MVP

## Consequências
### Positivas
- Código organizado e fácil de contribuir
- Tipos compartilháveis com frontend
- Escala bem para novos módulos

### Negativas
- NestJS adiciona alguma complexidade inicial
- Overengineering deve ser evitado no MVP
