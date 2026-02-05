# ADR 002: Arquitetura Web-first com Mobile Posterior

## Status
Accepted

## Contexto
O produto precisa:
- Ser acessível rapidamente
- Funcionar em múltiplas plataformas
- Ter custo inicial baixo de desenvolvimento

Aplicações mobile nativas exigem maior esforço inicial.

## Decisão
Adotar arquitetura web-first:

- Aplicação web como cliente principal
- API central compartilhada
- Aplicativo mobile nativo considerado a partir da v1

## Justificativa
- Web permite iteração mais rápida
- Facilita contribuições open source
- Reduz custo e complexidade no MVP

## Consequências
- MVP será entregue primeiro via web
- Mobile poderá reutilizar API existente
- Algumas experiências mobile podem ser limitadas inicialmente