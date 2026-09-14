# Diretrizes do Repositório: NF English (Templates-First)

Este documento define a arquitetura, convenções e regras de desenvolvimento para o repositório da **NF English**. Qualquer assistente de inteligência artificial (Antigravity, Claude Code, Cursor, Copilot) ou desenvolvedor humano deve seguir rigorosamente as regras abaixo.

---

## 🏆 A Regra de Ouro

> **"Edite sempre o template, NUNCA a página."**

1. Este repositório é **Templates-First**: páginas não contêm estruturas HTML ou estilizações soltas e ad-hoc.
2. Todas as páginas (`index.astro`, `destrave.astro`, rotas `/en`, `/ru`, etc.) são montadas **exclusivamente** importando componentes reutilizáveis de `src/components/`.
3. Se um botão, card, seção ou tipografia precisar de ajuste visual, modifique o componente template correspondente. Isso garante que a melhoria seja propagada automaticamente para 100% das páginas do site.

---

## 🧱 Princípio: Hardcoded vs Props

- **Hardcoded no Template (Fixo)**: Estrutura semântica HTML, tags, classes CSS, transições, animações, bordas, sombras e tokens do Design System.
- **Props da Página (Dinâmico)**: Apenas o conteúdo específico daquela página ou idioma (títulos, descrições, textos de botões, URLs de WhatsApp/CTA, itens de listas, dados de depoimentos/FAQ e parâmetros de idioma).

*A regra é hardcoded; a exceção é prop.* Não crie propriedades desnecessárias para estilos — mantenha a consistência visual centralizada.

---

## 🧭 Catálogo Visual: `/templates`

A rota [`/templates`](file:///templates) (`src/pages/templates.astro`) é o showroom vivo de todos os componentes e primitivos do Design System da NF English:
- **Primitivos**: Botões (Padrão/Brand, Gold, Secondary, Outline-White), Eyebrows/Badges, Pills, Ícones.
- **Navegação & Rodapé**: `Header.astro`, `Footer.astro`, `MobileCTA.astro`.
- **Hero & Prova**: `Hero.astro`, `ProofBar.astro`, `CorporateStrip.astro`.
- **Seções de Conteúdo**: `PillarsSection.astro`, `SolutionsSection.astro`, `ComparisonSection.astro`, `TeacherSection.astro`.
- **Estrutura de Programas**: `ProgramMethodSection.astro`, `CurriculumSection.astro`, `OfferSection.astro`.
- **Conversão & FAQ**: `FAQSection.astro`, `CTABanner.astro`.

---

## 🔄 Fluxo Obrigatório para Novas Páginas ou Seções

1. **Verificação**: Inspecione [`src/pages/templates.astro`](file:///Users/tiagofernandes/NF%20English_OS/NF%20English%20site/src/pages/templates.astro) e `src/components/` para identificar os blocos necessários.
2. **Criação de Template Faltante**: Se a página exigir um bloco inédito:
   - Crie o componente em `src/components/<NomeDoComponente>.astro`.
   - Adicione uma demonstração do bloco na página `/templates`.
   - Valide no `localhost:4321/templates`.
3. **Montagem da Página**: Monte a nova página em `src/pages/` apenas importando e configurando as props dos templates existentes.

---

## 🎨 Tokens do Design System

- **Cores Primárias**:
  - `--brand`: `#b84f47` (Terracota principal)
  - `--brand-dark`: `#7f332f`
  - `--brand-light`: `#faebe9`
- **Tons Naturais & Superfícies**:
  - `--sage`: `#6d8372` (Verde sálvia)
  - `--sage-dark`: `#35483d` (Verde escuro institucional)
  - `--sage-light`: `#e7ede8`
  - `--paper`: `#fffaf2` (Fundo quente padrão)
  - `--surface`: `#ffffff`
  - `--surface-soft`: `#f5eadc`
- **Destaque & Acentos**:
  - `--gold`: `#f1bd61` (Dourado de conversão)
  - `--gold-soft`: `#fff1cf`
- **Tipografia**:
  - Títulos (`h1`, `h2`): `Fraunces`, Georgia, serif (elegante, editorial).
  - Texto corrido e UI: `DM Sans`, ui-sans-serif, system-ui, sans-serif.

---

## 🚀 Publicação & Deploy

- Hospedagem: **Cloudflare Pages** (deploy automático via GitHub Actions / Git Push na branch `main`).
- Build command: `npm run build` (saída em `dist`).
- Teste local antes de qualquer commit: `npm run build`.

---

## 📊 Governança de Projetos & Sincronização com o Dashboard

### Regra Obrigatória para Agentes de IA e Desenvolvedores:
Qualquer assistente de inteligência artificial (Antigravity, Claude Code, Cursor, Copilot) ou desenvolvedor atuando neste repositório ou em produtos correlatos da NF English (incluindo o ecossistema Low Ticket e a Área de Membros) **DEVE OBRIGATORIAMENTE LER O DASHBOARD DO PROJETO** no início de cada sessão para saber exatamente onde estamos e quais são os próximos passos:

- **Dashboard Oficial do Projeto (+360 Mapas Mentais / Área de Membros)**:
  - Arquivo: [`/Users/tiagofernandes/Low Ticket/produtos/mapas-mentais-ingles/DASHBOARD.md`](file:///Users/tiagofernandes/Low%20Ticket/produtos/mapas-mentais-ingles/DASHBOARD.md)
  - Plano Mestre de Arquitetura: [`/Users/tiagofernandes/Low Ticket/produtos/mapas-mentais-ingles/plano-portal-membros-mapas-mentais.md`](file:///Users/tiagofernandes/Low%20Ticket/produtos/mapas-mentais-ingles/plano-portal-membros-mapas-mentais.md)

### Protocolo de Trabalho com o Dashboard:
1. **Leitura Obrigatória no Início**: Antes de planejar, executar ou sugerir ações, o agente deve ler o `DASHBOARD.md` para identificar a fase atual, os entregáveis já concluídos e o backlog de tarefas imediatas.
2. **Centralização de Melhorias e Sugestões**: Toda e qualquer melhoria, sugestão de funcionalidade, otimização visual (UI/UX), estratégia de conversão/LTV ou refinamento de código **deve ser obrigatoriamente documentada na seção "Banco de Melhorias & Sugestões Contínuas" do `DASHBOARD.md`**.
3. **Atualização Contínua de Status**: Ao concluir ou avançar em qualquer tarefa, o agente/desenvolvedor deve atualizar o status das fases e marcar as caixas de seleção no `DASHBOARD.md`, mantendo o histórico de decisões e logs em dia.
