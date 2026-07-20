// Diagnostico de FTP: descobre ONDE a conta FTP realmente cai ao logar,
// e o que existe nas pastas candidatas. A senha vem de env (secret do GitHub),
// nunca fica no codigo.
const ftp = require("basic-ftp");

async function listSafe(client, path) {
  try {
    const items = await client.list(path);
    return items
      .map((f) => `  ${f.isDirectory ? "[dir] " : "      "}${f.name}` + (f.isDirectory ? "" : `  (${f.size}b)`) + `  ${f.rawModifiedAt || ""}`)
      .join("\n") || "  (vazio)";
  } catch (e) {
    return `  ERRO: ${e.message}`;
  }
}

async function main() {
  const client = new ftp.Client(30000);
  client.ftp.verbose = false;
  const host = process.env.FTP_SERVER;
  try {
    await client.access({
      host,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      secure: false,
      port: 21,
    });
    console.log(`\n===== CONECTADO em ${host} como ${process.env.FTP_USERNAME} =====`);

    const pwd = await client.pwd();
    console.log(`\n>>> DIRETORIO ONDE O FTP CAI AO LOGAR (pwd): ${pwd}`);

    console.log(`\n>>> CONTEUDO DA RAIZ DO LOGIN ("."):`);
    console.log(await listSafe(client, "."));

    console.log(`\n>>> CONTEUDO DE "public_html":`);
    console.log(await listSafe(client, "public_html"));

    console.log(`\n>>> CONTEUDO DE "public_html/coretools" (deve bater com o site no ar):`);
    console.log(await listSafe(client, "public_html/coretools"));

    console.log(`\n>>> EXISTE pasta "domains"?`);
    console.log(await listSafe(client, "domains"));

    console.log(`\n>>> EXISTE "public_html/public_html" (jaula duplicada)?`);
    console.log(await listSafe(client, "public_html/public_html"));

    console.log("\n===== FIM DO DIAGNOSTICO =====\n");
  } catch (err) {
    console.error("FALHA:", err.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

main();
