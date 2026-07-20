# CoreTools — Deploy (CRÍTICO, ler antes de publicar)

> Ver também [[MOC]] · [[ESTADO_PROJETO]] · [[PROXIMOS_PASSOS]]
> Última atualização: 2026-07-20

## ⛔ O FTP ESTÁ QUEBRADO — não perca tempo com ele
**Provado exaustivamente em 2026-07-20:** o FTP dessa conta grava num sistema de arquivos **diferente** do que o site serve. Testado com marcadores (`deploy-test.txt`) e comparação de build-hash, nos dois servidores (`212.85.6.169` oficial E `212.85.3.229` srv725), em todas as pastas candidatas (`coretools`, `public_html/coretools`, `domains/coretools.fvsynapse.com.br/public_html`). Em NENHUMA o upload FTP muda o site no ar.

- Só o **Gerenciador de Arquivos do hPanel** escreve no filesystem que o site realmente serve.
- É defeito de infra da Hostinger (3 servidores desconectados). **NÃO reinvestigar FTP.**
- O `ftp-diagnose.js` + workflow `ftp-diagnose.yml` no repo servem pra re-diagnosticar se necessário (usam a senha do secret, roda no GitHub Actions).

## ✅ Como publicar HOJE (upload manual do zip)
1. Gerar o build: `cd C:\Users\ander\CoreTools && npm run build` (gera `out/`).
2. **Zipar o conteúdo de `out/` COM barras `/`** — usar Python, NUNCA PowerShell `Compress-Archive` (usa `\` e o Linux não entende → achata a pasta `_next` em arquivos com `\` no nome → CSS/JS dá 404):
   ```bash
   cd out && python -c "import zipfile,os; out=r'C:\Users\ander\CoreTools\coretools-site.zip'; os.remove(out) if os.path.exists(out) else None; z=zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED); [z.write(os.path.join(r,f), os.path.relpath(os.path.join(r,f),'.').replace(os.sep,'/')) for r,_,fs in os.walk('.') for f in fs]; z.close()"
   ```
3. No **Gerenciador de Arquivos do hPanel**, entrar na pasta do coretools (breadcrumb `public_html > coretools`).
4. Apagar o conteúdo antigo → **Upload → "File"** (NÃO "Folder"! Folder achata a estrutura) → selecionar `coretools-site.zip`.
   - Dica: na janela do Windows, se ele entrar DENTRO do zip, subir um nível (clicar em `CoreTools` no caminho) e selecionar o `.zip` inteiro.
5. Botão direito no zip → **Extract** → apagar o zip.
6. `index.html` e `_next` têm que ficar SOLTOS na raiz de `coretools` (não dentro de subpasta).

### O que vai pro servidor vs o que NÃO vai
- **VAI (só o conteúdo de `out/`):** `index.html`, `404.html`, `sitemap.xml`, `favicon.ico`, `unrar.wasm`, `robots.txt`, e as pastas `_next`, `artigos`, `contato`, `sobre`, `converter-*`, `descompactar-*`, `abrir-*`, `politica-*`, `termos-*`.
- **NÃO VAI (nunca):** `src`, `node_modules`, `.github`, `.next`, `ai-context`, `scripts`, `public`, `package.json`, configs, `ruvector.db`, etc.

## ✅✅ SOLUÇÃO ATIVA E FUNCIONANDO: Git nativo da Hostinger (auto-deploy)
**Configurado e CONFIRMADO funcionando em 2026-07-20.** Fluxo automático:
`push no main` → GitHub Action `build-deploy-branch.yml` compila e publica o `out/` no branch **`deploy`** → **Hostinger puxa o branch `deploy` sozinha** → site atualiza. **SEM FTP, SEM zip, SEM clicar em nada.** (Provado com marcador `auto-test.txt` que apareceu no ar sozinho após um push.)

Config na Hostinger (hPanel → painel do coretools → Avançado → GIT):
- Repositório: **Core-Tools** (o app GitHub da Hostinger tem acesso liberado a ele).
- Branch (Filial): **`deploy`** (NÃO main — main é fonte, deploy é o site compilado).
- Diretório raiz: **`public_html/coretools`** (a pasta servida; NÃO `public_html` puro, que é o WordPress!).
- Auto-deploy: ativo (webhook automático via GitHub App).

**Para atualizar o site agora: só dar push no `main`. Pronto.** O upload manual do zip virou backup de emergência.

Se precisar re-conectar: liberar acesso do app Hostinger ao repo em github.com/settings/installations (app "Hostinger" → Configure → Repository access → add Core-Tools).

## 🚀 (Histórico) Como foi configurado o Git nativo da Hostinger
O Git da Hostinger (**hPanel → Painel de controle do coretools → Avançado → GIT**) roda **no servidor da Hostinger**, então alcança a pasta servida (diferente do FTP). Ele só faz `git pull`, **não compila**. Por isso:

- Criamos o workflow **`.github/workflows/build-deploy-branch.yml`**: a cada push no `main`, ele compila e publica o `out/` no branch **`deploy`** (site pronto na raiz), via `peaceiris/actions-gh-pages`.
- O Git da Hostinger deve ser conectado ao repo **Core-Tools**, branch **`deploy`** (NÃO main!), destino = pasta servida do coretools, com auto-deploy ligado.
- Fluxo final: push no `main` → Action compila → publica no branch `deploy` → Hostinger puxa `deploy` → site atualiza. **Sem FTP, sem zip.**

Status e passos detalhados em [[PROXIMOS_PASSOS]].

## Como verificar se um deploy funcionou
Cada build tem hash único em `_next/static/<hash>/`. Testar no ar:
```bash
BUST=$(date +%s)
curl -s "https://coretools.fvsynapse.com.br/?b=$BUST" | grep -oiE "<title>[^<]*</title>"
# título novo esperado: "CoreTools // Utilitários Locais & Processamento no Navegador"
CSS=$(curl -s "https://coretools.fvsynapse.com.br/?b=$BUST" | grep -oiE "/_next/static/chunks/[a-z0-9_-]+\.css" | head -1)
curl -s -o /dev/null -w "CSS %{http_code}\n" "https://coretools.fvsynapse.com.br${CSS}?b=$BUST"  # tem que ser 200
```
Se o CSS der 404 → estrutura de pastas quebrou (provável zip com `\`).

## Cache
O site passa pelo CDN da Hostinger (`cdn.hstgr.net`). Se uma atualização não aparecer, limpar cache em **hPanel → Cache → Limpar cache** (e Ctrl+Shift+R no navegador).
