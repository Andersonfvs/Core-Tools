// Diagnostico 2: localiza deploy-test.txt e index.html em TODAS as pastas
// candidatas para descobrir qual e a pasta REALMENTE servida vs onde o deploy escreve.
const ftp = require("basic-ftp");

async function probe(client, path) {
  try {
    const items = await client.list(path);
    const marker = items.find((f) => f.name === "deploy-test.txt");
    const index = items.find((f) => f.name === "index.html");
    return `EXISTE | deploy-test.txt: ${marker ? "SIM (" + marker.rawModifiedAt + ")" : "nao"} | index.html: ${index ? index.size + "b " + index.rawModifiedAt : "nao"} | itens: ${items.length}`;
  } catch (e) {
    return `nao acessivel (${e.message.split("\n")[0]})`;
  }
}

async function main() {
  const client = new ftp.Client(30000);
  client.ftp.verbose = false;
  try {
    await client.access({
      host: process.env.FTP_SERVER,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      secure: false,
      port: 21,
    });
    console.log(`\n>>> pwd: ${await client.pwd()}\n`);
    const candidatas = [
      "coretools",
      "public_html/coretools",
      "public_html/public_html/coretools",
      "/public_html/public_html/coretools",
      "/public_html/coretools",
      "domains/coretools.fvsynapse.com.br",
      "domains/coretools.fvsynapse.com.br/public_html",
      "domains/coretools.fvsynapse.com.br/public_html/coretools",
    ];
    for (const p of candidatas) {
      console.log(`[${p}] -> ${await probe(client, p)}`);
    }
    console.log("\n>>> FIM");
  } catch (err) {
    console.error("FALHA:", err.message);
    process.exit(1);
  } finally {
    client.close();
  }
}

main();
