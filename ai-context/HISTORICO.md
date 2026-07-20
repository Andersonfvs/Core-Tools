# CoreTools — Histórico

> Ver também [[MOC]] · [[DEPLOY]]
> Última atualização: 2026-07-20

Log do que foi feito e resolvido, pra não repetir investigações.

## 2026-07-20 — Sessão maratona (auditoria SEO → deploy)

### Auditoria AdSense e correções de código
- Auditoria como revisor do AdSense. Corrigidos os bloqueadores:
  - Marca unificada (removido "Antigravity" de todo o código → CoreTools).
  - `metadataBase`, canonical, OpenGraph adicionados.
  - `AdSenseBanner`: bug do `adsbygoogle.push` corrigido; oculta sem Pub ID real.
  - `CookieConsent`: botão "Recusar" + gating do script AdSense.
  - Formulário de contato: era FALSO (não enviava) → ligado ao **Web3Forms** (oculta se sem chave).
  - Gerador de artigos: validação ≥850 palavras, slug único, autor real; **removidos autores fictícios** (fraude E-E-A-T).
  - Artigos expandidos p/ 1000+ palavras (5 artigos) com autor e dateISO.
  - Cron automático de artigos REMOVIDO (anti scaled-content abuse).
  - `public/robots.txt` adicionado (robots.ts não gera no export).

### Segurança
- **Vazamento:** o Antigravity commitou a senha FTP em texto puro (`'CoreTools2026!'`) no workflow de um repo PÚBLICO. GitGuardian alertou. Anderson **trocou a senha** na Hostinger e atualizou o secret `FTP_PASSWORD` → vazamento neutralizado. Regra: nunca credencial em texto puro, sempre `${{ secrets.X }}`.
- Removidos do repo: `ruvector.db` (1.5MB, artefato de ferramenta) e SVGs de template do Next.

### Organização
- Projeto movido de `.gemini/antigravity/scratch/antigravity-utilities` → **`C:\Users\ander\CoreTools`** (a pedido do Anderson; git/remote intactos).

### A saga do deploy (o que consumiu a sessão)
Site ficava servindo versão antiga apesar de deploys "verdes". Investigação provou:
1. FTP apontava pro IP `212.85.6.169` (achei que era antigo); troquei pra `2.57.91.36` (timeout, é só web) e `212.85.3.229` (srv725).
2. Deploys chegavam no servidor mas gravavam em pasta que o site não lê.
3. Testado com marcador (`deploy-test.txt`) e build-hash: **em NENHUMA pasta nem servidor o FTP alcança o docroot servido**. Só o Gerenciador de Arquivos do hPanel alcança.
4. **Conclusão:** defeito de infra Hostinger — 3 servidores desconectados (coretools web `2.57.91.36`, fvsynapse `212.85.6.169`, file manager srv725 `212.85.3.229`). FTP oficial (hPanel) = `212.85.6.169` / user `u135751739` / pasta `public_html`. Conta única (fvsynapse); coretools é subdomínio addon.

### Como o site foi pro ar
- Via **upload manual do zip** pelo Gerenciador de Arquivos. Descoberto no caminho:
  - Não subir a pasta do projeto inteira (só o conteúdo de `out/`).
  - Zip TEM que usar barras `/` (Python zipfile), não `Compress-Archive` (usa `\`, achata `_next` → CSS 404).
  - Upload como "File" + Extract (não "Folder", que achata a estrutura).

### Solução final em configuração
- **Git nativo da Hostinger** (roda server-side, alcança a pasta servida). Criado branch `deploy` com o site compilado (workflow `build-deploy-branch.yml`). Falta o Anderson conectar no hPanel (ver [[PROXIMOS_PASSOS]]).

### Preferências do Anderson (importante)
- **Quer ficar na Hostinger, NÃO migrar** ("se eu quisesse mudar já teria migrado"). Não sugerir Cloudflare/Vercel de novo.
- Ficou MUITO frustrado com o tamanho da saga e gasto de tokens. **Ser direto, decisivo, sem oscilar entre opções, sem chutar.**
- Comunicação direta e honesta.
