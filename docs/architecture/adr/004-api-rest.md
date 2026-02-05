# ADR 004: API REST como padrão inicial

## Status
Accepted

## Contexto
GraphQL oferece flexibilidade, mas aumenta:
- Complexidade
- Curva de aprendizado
- Custo de manutenção

Para o MVP, simplicidade é prioridade.

## Decisão
Utilizar API REST como padrão inicial.

GraphQL poderá ser avaliado futuramente se:
- Houver forte necessidade de agregações complexas
- Performance ou flexibilidade se tornarem problemas

## Consequências
- Endpoints claros e previsíveis
- Menor complexidade inicial
- Possível migração futura planejada
