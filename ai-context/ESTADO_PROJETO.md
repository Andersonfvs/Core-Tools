# CoreTools — Estado do Projeto

> Ver também [[MOC]] · [[DEPLOY]] · [[PROXIMOS_PASSOS]] · [[SEO_ADSENSE]] · [[HISTORICO]]
> Última atualização: 2026-07-20

## O que é
Site estático (Next.js 16, `output: export`) de utilitários que rodam 100% no navegador do usuário. Marca **CoreTools**. Monetização futura via Google AdSense.

- **No ar:** https://coretools.fvsynapse.com.br ✅ (funcionando, subido manualmente)
- **Repo:** github.com/Andersonfvs/Core-Tools (público) · branch `main`
- **Local:** `C:\Users\ander\CoreTools` (movido de `.gemini/antigravity/scratch/antigravity-utilities` em 2026-07-20)
- **Stack:** Next.js 16 · React 19 · Tailwind v4 · TypeScript strict

## Ferramentas (todas client-side)
| Rota | Função | Engine |
|------|--------|--------|
| `/converter-png-para-webp` | PNG → WebP | web worker |
| `/converter-jpg-para-webp` | JPG → WebP | web worker |
| `/descompactar-zip-online` | Abrir/extrair ZIP | fflate |
| `/abrir-arquivo-rar-online` | Abrir RAR v4/v5 | unrar.wasm |
| `/artigos` + `/artigos/[slug]` | Blog SEO | gerado por IA (Gemini) |

Páginas institucionais: `/sobre`, `/contato` (Web3Forms), `/politica-de-privacidade`, `/termos-de-uso`.

## Marca e identidade
- Marca em TUDO = **CoreTools** (a pasta/repo antigos se chamavam "antigravity-utilities" mas "Antigravity" foi 100% removido do código).
- E-mail de contato: `contato@fvsynapse.com.br` (e o Web3Forms envia pro `andersonfvsti@gmail.com`).

## Secrets do GitHub (repo Core-Tools)
- `FTP_PASSWORD` — trocada em 2026-07-20 após vazamento no histórico do repo público (ver [[HISTORICO]]).
- `WEB3FORMS_KEY` — chave do formulário de contato (Web3Forms → andersonfvsti@gmail.com).
- `GEMINI_API_KEY` — geração de artigos por IA.
- `ADSENSE_PUB_ID` — (futuro) id do AdSense; enquanto vazio, o banner `AdSenseBanner` se oculta sozinho.

## Infra Hostinger (importante e bagunçada)
Conta única (`fvsynapse.com.br`, plano Business). coretools e tokensaver são **subdomínios addon** dela.
- coretools web responde de **`2.57.91.36`**
- fvsynapse (WordPress) de **`212.85.6.169`**
- Gerenciador de arquivos / FTP em **srv725 = `212.85.3.229`**
- FTP oficial (hPanel → Arquivos → Contas FTP): host **`212.85.6.169`**, user **`u135751739`**, porta 21, pasta base `public_html`.

Esses 3 servidores diferentes são a raiz do problema de deploy (ver [[DEPLOY]]).

## Estado atual (2026-07-20)
- ✅ Código, SEO técnico, conteúdo: prontos e no GitHub.
- ✅ Site no ar (subida manual), design e tudo funcionando.
- ✅ Segurança: senha FTP trocada; `ruvector.db` e SVGs de template removidos.
- ✅ Deploy automático FUNCIONANDO via Git nativo da Hostinger (`push no main` → site atualiza sozinho). FTP quebrado, não usar. Ver [[DEPLOY]].
- 🔴 AdSense: não pedir ainda (ver [[SEO_ADSENSE]]).
