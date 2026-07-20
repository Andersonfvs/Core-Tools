# CoreTools — Próximos Passos

> Ver também [[MOC]] · [[DEPLOY]]
> Última atualização: 2026-07-20

## ✅ RESOLVIDO: deploy automático via Git nativo da Hostinger
**Concluído e funcionando em 2026-07-20.** Não precisa mais fazer nada aqui — o deploy é automático:
`push no main` → Action `build-deploy-branch.yml` publica `out/` no branch `deploy` → Hostinger puxa sozinha → site atualiza (~1-2 min). Sem FTP, sem zip. Detalhes em [[DEPLOY]].

Config final na Hostinger (hPanel → coretools → Avançado → GIT): repo **Core-Tools**, branch **`deploy`**, diretório **`public_html/coretools`**, auto-deploy ativo. App GitHub "Hostinger" com acesso liberado ao repo Core-Tools.

## 🎯 Próxima prioridade real: CONTEÚDO (para o AdSense)
Ver [[SEO_ADSENSE]]. Resumo:
- Hoje: **5 artigos** de 1000+ palavras. Meta: **~15**.
- Site precisa de **2–3 semanas no ar** antes de pedir o AdSense.
- Gerar artigos com o `scripts/generate-article.js` (rodar manual, revisar antes), OU escrever à mão. Autor real ("Anderson Ventura" / "Redação CoreTools"), nunca fictício.
- Quando tiver ~15 artigos + tempo no ar: criar conta AdSense → pegar Pub ID → colocar no secret `ADSENSE_PUB_ID` (o banner aparece sozinho) → pedir revisão.

## Como publicar um artigo novo (fluxo atual)
1. Adicionar/gerar o artigo em `src/data/articles.json` (ou rodar `npm run generate-article` com revisão).
2. Commit + `git push origin main`.
3. Pronto — o site atualiza sozinho via Git da Hostinger.

## Backlog (quando quiser)
- Favicon / OG image próprios da marca CoreTools.
- Revisar densidade de anúncios quando o AdSense for aprovado.
- (Opcional) Se o Git da Hostinger algum dia parar, o backup é o upload manual do zip — passo a passo em [[DEPLOY]]. O FTP continua quebrado, não usar.

## Contexto do Anderson (importante para novas sessões)
- **Quer ficar na Hostinger, NÃO migrar.** Não sugerir Cloudflare/Vercel.
- Passou por uma saga longa e frustrante de deploy (já resolvida). **Ser direto, decisivo, sem chutar, sem oscilar entre opções.**
- Comunicação direta e honesta.
