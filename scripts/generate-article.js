const fs = require("fs");
const path = require("path");

// 1. Obter a API Key do ambiente
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERRO: A variável de ambiente GEMINI_API_KEY não foi encontrada.");
  console.error("Por favor, configure sua chave com: export GEMINI_API_KEY='sua-chave'");
  process.exit(1);
}

// 2. Definir caminhos das pastas
const dataPath = path.join(__dirname, "../src/data/articles.json");

// 3. Ler artigos existentes para evitar temas repetidos
let articles = [];
try {
  const fileContent = fs.readFileSync(dataPath, "utf-8");
  articles = JSON.parse(fileContent);
} catch (err) {
  console.error("Erro ao ler o arquivo articles.json:", err.message);
  process.exit(1);
}

const existingTopics = articles.map(a => a.title).join(", ");

// 4. Configurar o prompt estruturado de sistema para garantir a originalidade
const prompt = `
Você é um redator técnico e especialista em SEO (Search Engine Optimization) sênior do portal de ferramentas web "CoreTools // Utilities".
Escreva um novo artigo 100% autoral, técnico e de alto valor que será publicado no blog do portal.

REGRAS CRÍTICAS DE CONTEÚDO:
1. O assunto deve girar em torno de desenvolvimento web, performance de sites, compressão de imagens, formatos de compressão de arquivos (como zip, rar, tar, gzip), segurança local de dados (client-side privacy), cookies de consentimento, LGPD ou otimização do Core Web Vitals do Google.
2. Evite repetir os temas dos artigos já existentes: [${existingTopics}].
3. O artigo deve ser longo, detalhado e explicativo (mínimo de 600 palavras).
4. O conteúdo deve ser estruturado e retornado em formato JSON correspondendo exatamente à estrutura descrita abaixo.
5. Em "content", inclua parágrafos longos explicativos. Se desejar quebrar o texto com subtítulos, adicione strings começando com "### ". Se desejar adicionar listas de pontos, use o prefixo "- ".
6. O texto deve ser escrito em Português do Brasil com excelente fluidez e tom profissional. O artigo deve terminar obrigatoriamente com uma seção de Perguntas Frequentes (FAQ) detalhando 2 ou 3 dúvidas comuns em formato de subtítulos "### " seguido de parágrafos.

ESTRUTURA DE SAÍDA JSON ESPERADA:
{
  "slug": "url-amigavel-do-artigo-em-minúsculas-separada-por-hífens",
  "title": "Título do artigo chamativo, profissional e focado em SEO",
  "date": "Data atual por extenso em português (ex: 20 de Julho de 2026)",
  "readingTime": "X min de leitura (calcule com base no tamanho do texto)",
  "category": "Categoria do artigo (ex: Performance, SEO, Segurança, Engenharia)",
  "summary": "Um resumo curto de uma frase que será exibido no card do artigo no blog",
  "content": [
    "Parágrafo introduzindo o problema...",
    "Outro parágrafo detalhando o assunto...",
    "### Primeiro Subtítulo do Artigo",
    "Parágrafo sob o primeiro subtítulo...",
    "- Item de lista importante 1",
    "- Item de lista importante 2",
    "### Perguntas Frequentes (FAQ)",
    "### 1. Pergunta frequente X?",
    "Resposta longa e explicativa...",
    "### 2. Pergunta frequente Y?",
    "Resposta longa e explicativa..."
  ]
}

Retorne APENAS o JSON válido. Não adicione markdown como \`\`\`json no início ou no fim, retorne o JSON cru estruturado.
`;

// 5. Função para chamar a API oficial do Gemini usando fetch nativo do Node.js
async function generateArticle() {
  console.log("Iniciando conexão com a API do Google Gemini...");
  console.log("Analisando artigos existentes para garantir originalidade...");
  
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Erro na API (${response.status}): ${errText}`);
    }

    const data = await response.json();
    let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      throw new Error("A API do Gemini retornou uma estrutura de dados vazia.");
    }

    // Limpar marcações de código markdown (```json ... ```) caso o modelo as tenha retornado
    responseText = responseText.replace(/```json/i, "").replace(/```/g, "").trim();

    // Parsear o novo artigo gerado
    const newArticle = JSON.parse(responseText);
    
    // Validar se o artigo gerado possui os campos corretos
    if (!newArticle.slug || !newArticle.title || !newArticle.content || !Array.isArray(newArticle.content)) {
      throw new Error("O artigo gerado pela IA não atende aos critérios estruturais obrigatórios.");
    }

    // Adicionar no início do array de artigos (artigo mais recente aparece primeiro)
    articles.unshift(newArticle);

    // Salvar de volta em src/data/articles.json
    fs.writeFileSync(dataPath, JSON.stringify(articles, null, 2), "utf-8");

    console.log(`\n==================================================`);
    console.log(`✅ SUCESSO: Novo artigo gerado e adicionado!`);
    console.log(`Título: "${newArticle.title}"`);
    console.log(`Slug: /artigos/${newArticle.slug}`);
    console.log(`Data: ${newArticle.date}`);
    console.log(`Total de blocos gerados: ${newArticle.content.length}`);
    console.log(`==================================================\n`);

  } catch (error) {
    console.error("\n❌ ERRO NO PROCESSO DE GERAÇÃO:");
    console.error(error.message);
    process.exit(1);
  }
}

generateArticle();
