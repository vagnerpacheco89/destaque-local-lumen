# LUMEN MASTER v1.0 — Destaque Local | SITES

Template MASTER one-page para eletricistas locais da Destaque Local | SITES.

## Status

**MASTER v1.0 — finalização técnica concluída; referência visual congelada.**

O design aprovado pelo Founder foi preservado durante a finalização. A consolidação executada foi estrutural, sem redesign.

## Preview demonstrativo

https://vagnerpacheco89.github.io/destaque-local-lumen/

O preview usa uma persona fictícia apenas para demonstrar o template e permanece **não indexável** (`noindex,follow`). Não representa um prestador real.

## Arquitetura

O estado final do template segue a regra:

`HTML final + CSS final + JavaScript apenas para comportamento`

- `index.html` — conteúdo final, semântica e SEO técnico essencial no HTML inicial;
- `styles.css` — base visual original;
- `lumen-polish.css` — agregador da camada visual aprovada;
- `lumen-*.css` — módulos visuais das seções;
- `lumen-master.css` — regras consolidadas necessárias para preservar o estado aprovado sem injeção de CSS em runtime;
- `script.js` — somente interações e comportamento: navbar, menu mobile, modal demo, FAQ, voltar ao topo e carrossel;
- `robots.txt` e `sitemap.xml` — infraestrutura do demo/template;
- `qa/qa-master.mjs` — QA automatizado contra o deploy real;
- `QA-MASTER-v1.0.md` — registro final de QA e release.

## Direção visual

- light-first;
- off-white / branco como base;
- verde-floresta profundo como contraste;
- amarelo quente como accent;
- fotografia humana e clara;
- composição editorial e arejada;
- cantos moderadamente arredondados;
- Manrope como tipografia do template.

## Demo x cliente real

Este repositório é o **template MASTER** e não deve ser transformado diretamente no site definitivo de um cliente.

Na implementação real:

- criar repo/codebase próprio para o cliente;
- substituir integralmente os fatos da persona demo pelos dados confirmados da **Ficha Mestre do Cliente — Eletricistas**;
- ativar canonical, Schema, contatos, áreas, serviços e indexação reais somente conforme o **Playbook de Implementação — Eletricistas**;
- não reutilizar avaliações, credenciais, horários, áreas ou quaisquer outros dados demonstrativos como fatos do cliente.

O processo comercial e de publicação não é duplicado neste README; a fonte canônica é o Playbook de Implementação do nicho.

## QA e release

A finalização MASTER cobre o deploy real de 320px a 1440px, funcionalidade, assets, HTML/semântica, SEO técnico, modo demo e `prefers-reduced-motion`.

Consulte `QA-MASTER-v1.0.md` para o registro da auditoria final, evidências e commit de release.
