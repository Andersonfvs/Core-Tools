# CoreTools — Estado do Projeto

> Vault de memória canônica do projeto. Ler antes de qualquer alteração.
> Última atualização: 2026-07-20

## O que é
Site estático (Next.js 16 `output: export`) de utilitários que rodam 100% no navegador do usuário. Monetização futura via Google AdSense.

- **No ar:** https://coretools.fvsynapse.com.br
- **Repo:** github.com/Andersonfvs/Core-Tools (público) · branch `main`
- **Local:** `C:\Users\ander\CoreTools`

## Ferramentas
| Rota | Função | Engine |
|------|--------|--------|
| `/converter-png-para-webp` | PNG → WebP | web worker |
| `/converter-jpg-para-webp` | JPG → WebP | web worker |
| `/descompactar-zip-online` | Abrir/extrair ZIP | fflate |
| `/abrir-arquivo-rar-online` | Abrir RAR v4/v5 | unrar.wasm |
| `/artigos` | Blog SEO | gerado por IA |

## Deploy — LEIA ANTES DE MEXER
- Pipeline: GitHub Actions → build estático → FTP Hostinger.
- **Servidor web atual: `2.57.91.36` (srv725).**
- ⚠️ **Causa raiz do "site não atualiza" (resolvida 2026-07-20):** o FTP apontava pro IP `212.85.6.169` = servidor ANTIGO (pré-migração Hostinger). Deploys ficavam verdes mas gravavam numa cópia fantasma que ninguém lia. Site congelou numa build antiga. Correção: `server: 2.57.91.36` no workflow.
- Sempre confirmar o servidor real: `curl -s -4 -o /dev/null -w '%{remote_ip}' https://coretools.fvsynapse.com.br/`
- `server-dir: ./public_html/coretools/` — pasta dedicada. WordPress do fvsynapse fica em `public_html/` e **não pode ser tocado**.
- `dangerous-clean-slate: true` é seguro (server-dir é pasta exclusiva).
- Geração de artigos só manual (`workflow_dispatch`) — cron removido (anti spam Google).

## Como verificar se o deploy REALMENTE subiu
Cada build tem hash único em `_next/static/<hash>/`. Pegar do log e testar:
```
curl -s -o /dev/null -w '%{http_code}' \
  https://coretools.fvsynapse.com.br/_next/static/<hash>/_ssgManifest.js
# 200 = build novo no ar | 404 = build velho ainda servido
```

## Secrets (GitHub repo)
- `FTP_PASSWORD` (trocada após vazamento 2026-07-20)
- `WEB3FORMS_KEY` (form de contato → andersonfvsti@gmail.com)
- `GEMINI_API_KEY` (artigos)
- `ADSENSE_PUB_ID` (futuro; banner se oculta enquanto vazio)

## AdSense — não submeter ainda
Precisa: ~15 artigos 1000+ palavras + 2-3 semanas no ar. Hoje: 5 artigos bons. Recusa suja o domínio.

## ⚠️ BLOQUEIO ABERTO: cache do servidor (2026-07-20)
Site congelado em snapshot `Last-Modified: 12:06:34 UTC` apesar de deploys verdes com clean-slate para 3 destinos (212.85.6.169, 212.85.3.229 public_html/coretools, e domains/.../public_html). Arquivos apagados/reenviados não mudam nada no ar; `next.svg` deletado ainda responde 200; cache-buster `?b=` não fura. **Conclusão: cache LiteSpeed/Hostinger fixado.** Resolução (só no hPanel): **Avançado → Gerenciador de Cache / Cache Manager → Limpar/Purge**, ou plugin LiteSpeed Cache do WordPress → Purge All. FTP correto = `212.85.3.229` (srv725). Após purge, rodar o teste de hash pra confirmar.

## Incidentes resolvidos (2026-07-20)
1. Senha FTP vazada em texto puro no repo público (Antigravity) → trocada.
2. Autores fictícios no gerador de artigos (fraude E-E-A-T) → só "Anderson Ventura" / "Redação CoreTools".
3. Formulário de contato falso (não enviava) → ligado ao Web3Forms; oculta-se se sem chave.
4. Deploy no servidor errado (212.85.6.169) → apontado pro 2.57.91.36.
5. Marca "Antigravity" espalhada → unificada como CoreTools.
6. `ruvector.db` (1.5MB) e SVGs de template no repo → removidos.
