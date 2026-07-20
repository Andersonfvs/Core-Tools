const ftp = require("basic-ftp");
const path = require("path");

async function main() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  const password = process.env.FTP_PASSWORD || process.argv[2];

  if (!password) {
    console.error("\n❌ ERRO: Digite a senha do seu FTP da Hostinger!");
    console.error("Exemplo de uso: npm run deploy-ftp -- AQUI_SUA_SENHA_DO_FTP\n");
    process.exit(1);
  }

  try {
    console.log("\n🔌 Conectando ao servidor FTP da Hostinger (ftp.fvsynapse.com.br)...");
    await client.access({
      host: "ftp.fvsynapse.com.br",
      user: "u135751739",
      password: password,
      secure: false
    });

    console.log("📁 Enviando os arquivos corrigidos da pasta /out para /public_html/coretools/...");
    await client.uploadFromDir(path.join(__dirname, "../out"), "./public_html/coretools/");

    console.log("\n==================================================");
    console.log("✅ SUCESSO TOTAL! O DEPLOY FOI CONCLUÍDO COM SUCESSO!");
    console.log("Todas as correções do AdSense já estão ativas e no ar em:");
    console.log("👉 http://coretools.fvsynapse.com.br");
    console.log("==================================================\n");
  } catch (err) {
    console.error("\n❌ Erro na conexão ou envio por FTP:", err.message);
  }
  client.close();
}

main();
