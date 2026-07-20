# CoreTools — Próximos Passos

> Ver também [[MOC]] · [[DEPLOY]]
> Última atualização: 2026-07-20

## 🎯 EM ANDAMENTO: conectar o Git nativo da Hostinger (deploy automático sem FTP)

**Já feito:**
- ✅ Branch **`deploy`** criado no repo (site compilado na raiz), via workflow `build-deploy-branch.yml`. A cada push no `main`, o branch `deploy` é regenerado automaticamente.

**Falta o Anderson fazer no hPanel** (hPanel → Painel de controle do **coretools** → Avançado → **GIT** → "Selecione o repositório Git para importar"):
1. **Fazer o repo `Core-Tools` aparecer na lista** (na tela só aparecia `tokensaver`).
   - Digitar `Core` na busca "procure seus requisitos", ou clicar em atualizar (↻).
   - Se não aparecer: dar acesso do app Hostinger ao repo `Core-Tools` no GitHub (dropdown "Andersonfvs" → configurar acesso).
2. Selecionar **`Core-Tools`** → **Próximo**.
3. Na tela seguinte:
   - **Branch: `deploy`** ⚠️ (NÃO `main` — o `main` tem o código-fonte, o `deploy` tem o site pronto).
   - **Pasta de destino:** a pasta servida do coretools — **a mesma onde o upload manual funciona** (breadcrumb `public_html > coretools`). Confirmar essa pasta antes de salvar.
   - **Auto-deploy / Deploy automático:** ligar (se houver a opção / webhook).
4. Salvar / Deploy.

**Depois de conectado, VALIDAR** (porque é a primeira vez que testamos o Git da Hostinger):
- Testar o site com o teste de hash em [[DEPLOY]]. Se o build novo aparecer, **funcionou** — deploy automático dentro da Hostinger, sem FTP.
- Se NÃO aparecer, a pasta de destino provavelmente está errada; ajustar pra pasta servida.

**Se o Git da Hostinger funcionar:** o fluxo vira `push no main → publica sozinho`. Aí o upload manual do zip vira só backup.

## Alternativa (se o Git da Hostinger não resolver)
- Abrir chamado no suporte Hostinger (texto pronto abaixo) para corrigirem o mapeamento FTP↔web do subdomínio coretools.

### Texto do chamado (copiar/colar no chat do hPanel)
> Assunto: Uploads por FTP não aparecem no meu subdomínio coretools.fvsynapse.com.br
>
> Meu plano Business hospeda 2 sites: fvsynapse.com.br (WordPress) e o subdomínio coretools.fvsynapse.com.br (site estático). Quando envio arquivos por FTP (conta u135751739, host 212.85.6.169), eles NÃO aparecem no coretools — o upload conclui mas o site serve a versão antiga. Só funciona pelo Gerenciador de Arquivos do hPanel. Notei que coretools responde do IP 2.57.91.36, fvsynapse do 212.85.6.169, e o gerenciador de arquivos opera no srv725 (212.85.3.229) — servidores diferentes. Parece migração incompleta. Podem corrigir o mapeamento para o FTP publicar no docroot real do coretools, ou informar o host/pasta FTP corretos? Obrigado.

## Backlog (quando o Anderson quiser)
- SEO/AdSense: escrever/gerar mais artigos até ~15 antes de pedir AdSense (ver [[SEO_ADSENSE]]).
- Favicon/OG image próprios da marca CoreTools.
- Revisar densidade de anúncios quando o AdSense for aprovado.
