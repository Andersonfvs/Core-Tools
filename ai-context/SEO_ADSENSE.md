# CoreTools — SEO & AdSense

> Ver também [[MOC]] · [[ESTADO_PROJETO]]
> Última atualização: 2026-07-20

## 🔴 Regra de ouro: NÃO pedir o AdSense ainda
Cada recusa suja o histórico do domínio. Antes de aplicar, precisa:
- **~15 artigos** de 1000+ palavras (hoje: **5 artigos bons**, 1000+ palavras cada).
- Site **2–3 semanas no ar** (recém-publicado é recusado por "site novo").
- Tudo funcionando (formulário, links, páginas) — já está ok.

Aplicar só quando esses 3 baterem. Depois: criar conta AdSense → pegar o Pub ID → colocar no secret `ADSENSE_PUB_ID` → o banner aparece sozinho.

## Estado do SEO técnico (tudo pronto no código)
- ✅ `<title>` com keywords + template `%s - CoreTools`, meta description, `metadataBase`, canonical, OpenGraph/Twitter (em `src/app/layout.tsx`).
- ✅ `sitemap.xml` (14 URLs) e `robots.txt` (adicionado `public/robots.txt` porque `robots.ts` não gera no export estático).
- ✅ JSON-LD: `SoftwareApplication` nas ferramentas, `TechArticle` nos artigos (autor real, dateISO).
- ✅ Página 404 real, HTTPS, idioma pt-BR.

## Gerador de artigos (`scripts/generate-article.js`)
- Usa Gemini (`GEMINI_API_KEY`). Valida ≥850 palavras, slug único, autor real, dateISO.
- **Autores: SÓ "Anderson Ventura" (real) ou "Redação CoreTools".** NUNCA inventar personas fictícias — é fraude de E-E-A-T que o Google caça.
- Rodar SÓ manual (workflow_dispatch), com revisão humana antes de publicar. **Nunca cron automático** (= scaled content abuse, política do Google).

## Blocos de anúncio
- Componente `AdSenseBanner` só renderiza com `NEXT_PUBLIC_ADSENSE_PUB_ID` real (sem placeholder pra revisor).
- Densidade atual: 1 anúncio por página. Não colocar anúncio em páginas sem conteúdo (privacidade/termos).

## Consentimento
- `CookieConsent` com botão "Recusar"; o script do AdSense só carrega após aceite E com Pub ID real (LGPD).
