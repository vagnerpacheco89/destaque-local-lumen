# QA-MASTER-v1.0 — LUMEN

**Data:** 2026-09-15  
**Status final:** **PASS**  
**Template:** LUMEN — Destaque Local | SITES  
**Preview auditado:** https://vagnerpacheco89.github.io/destaque-local-lumen/

## Referências

- referência visual congelada: `00abf2dc09fdfb7e719e727e85ae14029bae57dc`;
- snapshot preservado: `archive/lumen-pre-consolidation-20260914`;
- consolidação estrutural principal: `36d4db823f0ad5fd47d3bee8bed72516181b1cc9`;
- commit do artefato submetido ao QA canônico final: `2199270520b001a3416b96e89cb5aefa3642705f`;
- workflow final: `LUMEN MASTER post-consolidation QA`;
- run final: `34923963997`;
- artifact ID: `10379605168`;
- artifact digest: `sha256:dd4f9e9b14ba9c2e26511987ef20ff4ab9723801ea495525755df94431900ca9`.

A branch `release/lumen-master-v1.0` deve apontar para o descendente final de documentação/limpeza do mesmo artefato auditado. Alterações posteriores ao commit auditado não podem modificar o site sem novo QA.

## Escopo da finalização

O design e o QA visual já estavam fechados. A finalização foi executada sob a regra **refactor sem redesign**.

A auditoria constatou necessidade real de consolidação porque o estado aprovado ainda dependia de reconstrução de conteúdo via JavaScript, CSS injetado em runtime e uma camada de laboratório acumulada. Também faltavam elementos de SEO técnico no HTML inicial.

A consolidação transferiu o estado final para:

- HTML estático com conteúdo e semântica finais;
- CSS estático preservando o visual aprovado;
- JavaScript restrito a comportamento/interações;
- SEO técnico essencial disponível no HTML inicial.

Não houve redesenho nem alteração intencional da direção visual aprovada.

## Gates técnicos

### Estrutura e semântica

**PASS**

- um único H1;
- IDs sem duplicidade;
- hashes internos válidos;
- seis FAQs presentes no HTML inicial;
- conteúdo final não depende de reconstrução de seção por JavaScript;
- claim demo removido (`desde 2017`) não reapareceu;
- CTA final semântico presente.

### Funcionalidade

**PASS**

Validado no deploy publicado:

- CTAs do demo abrem o modal sem navegar para contato real;
- menu mobile abre/fecha, atualiza `aria-expanded`/label e devolve foco com `Escape`;
- FAQ preserva apenas um item aberto por vez;
- âncoras internas não deixam o alvo oculto pela navbar fixa;
- voltar ao topo funciona;
- carrossel mantém comportamento previsto;
- `prefers-reduced-motion` impede avanço automático do carrossel.

### Responsividade e visual

**PASS**

Viewports auditados:

- 320 × 780;
- 390 × 844;
- 768 × 900;
- 1024 × 900;
- 1440 × 1000.

Resultado:

- sem overflow horizontal de documento;
- sem regressão visual bloqueante;
- composição, hierarquia, crops e responsividade compatíveis com a referência congelada;
- screenshots full-page inspecionados após o QA automatizado.

### Assets e runtime

**PASS**

- imagens do documento carregadas sem `naturalWidth=0` após estabilização do lazy loading;
- sem requests do próprio deploy falhando;
- sem erros JavaScript de página bloqueantes;
- sem erros de console bloqueantes;
- artefatos temporários/superseded do laboratório removidos quando comprovadamente não utilizados;
- sem cache-bust estrutural desnecessário no HTML final.

### SEO técnico e modo demo

**PASS**

- `<title>` e meta description presentes;
- canonical estático e coerente com o preview;
- Open Graph presente;
- Twitter Card presente;
- JSON-LD parseável no HTML inicial;
- JSON-LD representa `WebSite`/`WebPage`/FAQ sem transformar a persona fictícia em negócio real;
- `noindex,follow,max-image-preview:large` preservado no demo;
- `robots.txt` não bloqueia o acesso técnico;
- OAI-SearchBot não está deliberadamente bloqueado;
- sitemap aponta para a URL canônica do demo.

## Ocorrências durante o QA

Os primeiros runs pós-consolidação expuseram falsos positivos do próprio harness, não regressões confirmadas do LUMEN:

- CTA oculto da navbar desktop selecionado em viewport mobile;
- tentativa de clique enquanto o elemento ainda estava em movimento de scroll;
- imagens lazy avaliadas antes de terminar o carregamento;
- âncora medida antes da conclusão do scroll suave;
- limites artificiais mais rígidos que o gate do playbook.

O harness foi endurecido para esperar assets/layout, usar interações estáveis e testar os critérios reais do playbook. O QA canônico final foi então executado **sem patch runtime** e retornou:

`PASS — failures: []`

## Resultado

**Todos os gates obrigatórios da finalização técnica passaram no artefato publicado.**

Não existem pendências técnicas ou visuais bloqueando o MASTER v1.0. O demo permanece deliberadamente não indexável; ativação de dados reais, indexação e publicação de cliente seguem o kit canônico de implementação do nicho e ocorrem em repo próprio do cliente.


## Patch pós-release — qualidade da imagem da Hero — 2026-09-29

Correção técnica solicitada pelo Founder, sem redesign.

### Diagnóstico

- original fornecida para auditoria: PNG 1536 × 1024, 2.892.527 bytes;
- asset anteriormente servida na Hero: `assets/hd/asset-01-hero-quadro-hd.avif`, AVIF 1024 × 683, 21.679 bytes;
- a derivada anterior foi reproduzida byte a byte como resize Lanczos para 1024 × 683 + AVIF quality 45; o Git blob SHA reproduzido foi `266b256a909da1bb0897856d636345c398c37edc`, igual ao blob do repositório;
- o CSS mantinha o `<img>` com `opacity: 0` e exibia a foto por `.hero-card::before`, impedindo a imagem visível de usar seleção responsiva.

### Correção

- `assets/hd/asset-01-hero-quadro-hd.avif`: AVIF 1536 × 1024, quality 90, 215.080 bytes;
- `assets/hd/asset-01-hero-quadro-1024.avif`: AVIF 1024 × 683, quality 80, 69.545 bytes;
- `srcset` + `sizes` adicionados ao `<img>`;
- pseudo-elemento deixou de carregar a fotografia;
- `object-fit: cover` e os enquadramentos existentes por breakpoint foram preservados no `<img>`;
- overlays, copy, layout, dimensões e comportamento não foram alterados.

### QA

A mesma alteração de Hero foi auditada em `main` no commit `ee38428f760cb577c0b685f3aaef16012644326c`:
- GitHub Pages run `36632318443` — **PASS**;
- workflow `LUMEN MASTER post-consolidation QA`, run `36632317999`, attempt 2 — **PASS**;
- artifact `11062619727`;
- artifact digest `sha256:66413b7927f387db871df1362a07571e85db7ed6d438d8d39be83c75b711b8d0`;
- viewports: 320 × 780, 390 × 844, 768 × 900, 1024 × 900 e 1440 × 1000.

A branch canônica `release/lumen-master-v1.0` recebeu o mesmo patch de imagem/CSS no commit `443d01e2313eb29af470f662b3471efe29d39a2a`, preservando suas alterações próprias de domínio/metadata. As assets e o CSS de Hero são os mesmos blobs auditados em `main`.

O LUMEN MASTER v1.0 continua congelado em todo o restante.


## Refactor cromático pós-release — 2026-10-07

Refactor técnico motivado por evidência real na adaptação do Cliente 02 / Emmanuel. O objetivo foi centralizar a identidade cromática sem redesenhar o LUMEN.

### Baseline e escopo

- baseline imediatamente anterior ao refactor: `22150aff1a54490f7b4837d2ba17961ab0d27f25`;
- commit de código final auditado: `5f2ee7421f63d14a909fb3c824dec2e92f3f8569`;
- branch canônica: `release/lumen-master-v1.0`;
- nenhuma alteração intencional de copy, layout, tipografia, arquitetura de seções, enquadramento ou comportamento visual.

### Sistema de identidade

Input configurável do cliente em `lumen-theme.css`:

- `--brand-primary: #176b4b`;
- `--brand-secondary: #ffd23f`;
- `--brand-tertiary: #f7f3e8`.

A partir deles são derivados estados `deep`, `hover`, `soft`, linhas, superfícies e variações necessárias. Neutros estáveis ficam separados. Aliases legados continuam existindo apenas como compatibilidade interna e apontam para os novos tokens; não são inputs de configuração.

### Auditoria de hardcodes

No baseline havia **342 ocorrências de HEX** espalhadas pelo CSS de runtime. Após o refactor restaram **15 ocorrências intencionais**:

- 3 inputs de marca + 7 neutros estáveis, todos centralizados em `lumen-theme.css`;
- 5 cores externas no Footer: Instagram (`#ff7a00`, `#ff0069`, `#d300c5`), Facebook (`#1877f2`) e WhatsApp (`#25d366`).

Os demais módulos de componentes não mantêm HEX locais de identidade. O `theme-color` do navegador também passou a sincronizar com `--brand-primary` em runtime, sem fallback verde hardcoded no HTML.

### Contraste

O derivado `--primary-muted` foi calibrado para preservar a leitura do MASTER e atingir o alvo de contraste em texto normal:

`color-mix(in srgb, var(--brand-primary) 25%, var(--neutral-gray) 75%)`.

Na paleta oficial, o resultado fica aproximadamente em `#5f746c`, com contraste de ~4,51:1 contra o canvas claro oficial.

### QA oficial

Workflow: `LUMEN MASTER post-consolidation QA`.

- run final: `37698475926` — **PASS**;
- artifact: `11516726167`;
- digest: `sha256:687209e6e6c89a328414470d7b58d91497bd114e7dbd2ee699829c118cdba041`;
- Cloudflare Pages do commit auditado: **success**;
- preview técnico do commit: `https://75ee9c39.destaque-local-lumen.pages.dev`;
- viewports cobertos: 320×780, 390×844, 768×900, 1024×900 e 1440×1000.

Um run intermediário falhou no timeout já conhecido do harness ao estabilizar o FAQ; o rerun passou sem patch visual. O run final acima passou diretamente após a calibração definitiva de contraste.

### Smoke test de paleta radicalmente diferente

Em branch isolada, a identidade foi temporariamente alterada **somente pelos três tokens-base** para:

- primária: `#111111`;
- secundária: `#ebae10`;
- terciária: `#f7f2e8`.

Resultado:

- run final: `37698491176` — **PASS**;
- head temporário: `f5a350722f10ac812f5994965826c4b524cc53e6`;
- artifact: `11516292117`;
- digest: `sha256:583889ecf3029f6ccc5ec2a2fde53f44dd0890ee759f63d34cdbc5b041086e11`;
- não foram encontrados resíduos visuais evidentes da paleta verde/amarela original nos componentes;
- layout, responsividade e interações permaneceram válidos.

Após o teste, a branch temporária foi restaurada para o estado oficial do LUMEN; nenhuma paleta Emmanuel permanece no MASTER.

### Resultado

**PASS — refactor técnico sem redesign.** A identidade oficial do LUMEN permanece visualmente equivalente, e uma implementação de cliente pode partir da troca dos três tokens-base + revisão de contraste/QA. O Cliente 02 / Emmanuel pode retornar à adaptação usando essa nova camada cromática, em codebase própria.
