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

  const hostsToTry = ["212.85.6.169", "ftp.fvsynapse.com.br"];
  let connected = false;

  for (const host of hostsToTry) {
    try {
      console.log(`\n🔌 Conectando ao servidor FTP da Hostinger (${host})...`);
      await client.access({
        host: host,
        user: "u135751739",
        password: password,
        secure: false,
        port: 21
      });
      connected = true;
      console.log(`✅ Conexão estabelecida com sucesso em ${host}!`);
      break;
    } catch (err) {
      console.warn(`⚠️ Tentativa de conexão em ${host} falhou: ${err.message}`);
    }
  }

  if (!connected) {
    console.error("\n❌ Não foi possível conectar ao FTP da Hostinger. Verifique a senha ou regras de firewall.");
    client.close();
    process.exit(1);
  }

  try {
    console.log("📁 Enviando todos os arquivos corrigidos da pasta /out para /public_html/coretools/...");
    await client.uploadFromDir(path.join(__dirname, "../out"), "public_html/coretools");

    console.log("\n==================================================");
    console.log("✅ SUCESSO TOTAL! O DEPLOY FOI CONCLUÍDO COM SUCESSO!");
    console.log("Todas as correções do AdSense já estão ativas e no ar em:");
    console.log("👉 http://coretools.fvsynapse.com.br");
    console.log("==================================================\n");
  } catch (err) {
    console.error("\n❌ Erro durante o envio dos arquivos via FTP:", err.message);
  }
  client.close();
}

main();
