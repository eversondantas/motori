# ADR 005: Exclusão de Gestão de Frotas no MVP

## Status
Accepted

## Contexto
Gestão de frotas adiciona:
- Multitenancy
- Papéis e permissões complexas
- Requisitos corporativos

Isso conflita com o objetivo do MVP.

## Decisão
Excluir explicitamente funcionalidades de gestão de frotas no MVP.

O produto foca exclusivamente em:
- Uso pessoal
- Um usuário por conta
- Veículos de propriedade individual

## Consequências
- Escopo mais controlado
- Entrega mais rápida
- Arquitetura preparada para extensão futura
