const fs = require("fs");
const path = require("path");

// 1. Obter a chave de API do Gemini das variáveis de ambiente
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ ERRO: A variável de ambiente GEMINI_API_KEY não foi encontrada.");
  console.error("Defina a chave executando: export GEMINI_API_KEY='sua_chave_aqui' ou adicionando nos Secrets do GitHub.");
  process.exit(1);
}

// 2. Caminho do arquivo JSON que armazena os artigos do blog
const dataPath = path.join(__dirname, "../src/data/articles.json");

// 3. Ler artigos existentes para evitar que o Gemini repita os assuntos
let articles = [];
try {
  const data = fs.readFileSync(dataPath, "utf-8");
  articles = JSON.parse(data);
} catch (error) {
  console.log("Aviso: articles.json não encontrado ou inválido. Iniciando nova fila de artigos.");
  articles = [];
}

const existingTopics = articles.map(a => a.title).join(", ");

// 4. Configurar o prompt estruturado de sistema para garantir a originalidade e profundidade
const prompt = `
Você é um redator técnico e especialista em SEO (Search Engine Optimization) sênior do portal de ferramentas web "CoreTools // Utilities".
Escreva um novo artigo 100% autoral, técnico e de alto valor que será publicado no blog do portal.

REGRAS CRÍTICAS DE CONTEÚDO:
1. O assunto deve girar em torno de desenvolvimento web, performance de sites, compressão de imagens, formatos de compressão de arquivos (como zip, rar, tar, gzip), segurança local de dados (client-side privacy), cookies de consentimento, LGPD ou otimização do Core Web Vitals do Google.
2. Evite repetir os temas dos artigos já existentes: [${existingTopics}].
3. O artigo deve ser extremamente longo, detalhado e explicativo (mínimo absoluto de 900 a 1100 palavras). Escreva parágrafos explicativos densos e completos para atingir o tamanho exigido.
4. O conteúdo deve ser estruturado e retornado em formato JSON correspondendo exatamente à estrutura descrita abaixo.
5. Em "content", inclua parágrafos longos explicativos. Se desejar quebrar o texto com subtítulos, adicione strings começando com "### ". Se desejar adicionar listas de pontos, use o prefixo "- ".
6. O texto deve ser escrito em Português do Brasil com excelente fluidez e tom profissional. O artigo deve terminar obrigatoriamente com uma seção de Perguntas Frequentes (FAQ) detalhando 2 ou 3 dúvidas comuns em formato de subtítulos "### " seguido de parágrafos.

ESTRUTURA DE SAÍDA JSON ESPERADA:
{
  "slug": "url-amigavel-do-artigo-em-minúsculas-separada-por-hífens",
  "title": "Título do artigo chamativo, profissional e focado em SEO",
  "readingTime": "X min de leitura (calcule com base no tamanho do texto, cerca de 1 min a cada 130 palavras)",
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

// Lista de autores fictícios com alto padrão E-E-A-T
const authors = [
  {
    name: "Anderson Ventura",
    role: "Especialista em Performance Web",
    bio: "Engenheiro de software e analista de SEO técnico, focado no desenvolvimento de ferramentas client-side eficientes."
  },
  {
    name: "Juliana Mendes",
    role: "Arquiteta de Soluções & Privacidade",
    bio: "Especialista em segurança da informação, privacidade de dados corporativos e arquiteturas serverless locais."
  },
  {
    name: "Marcos Ribeiro",
    role: "Consultor de Performance Core Web Vitals",
    bio: "Especialista em SEO e otimização de velocidade de carregamento de páginas móveis."
  }
];

// 5. Função para chamar a API oficial do Gemini com tratamento de tamanho e retentativas
async function generateArticle() {
  console.log("Iniciando conexão com a API do Google Gemini...");
  console.log("Analisando artigos existentes para garantir originalidade...");
  
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  let attempts = 3;
  let newArticle = null;

  while (attempts > 0) {
    try {
      console.log(`-> Solicitando geração do artigo técnico (Tentativas restantes: ${attempts})...`);
      
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
      newArticle = JSON.parse(responseText);
      
      // Validar se o artigo gerado possui os campos corretos
      if (!newArticle.slug || !newArticle.title || !newArticle.content || !Array.isArray(newArticle.content)) {
        throw new Error("O artigo gerado pela IA não atende aos critérios estruturais obrigatórios.");
      }

      // Validar contagem de palavras do artigo (Google AdSense exige densidade e conteúdo denso)
      const allText = newArticle.title + " " + newArticle.summary + " " + newArticle.content.join(" ");
      const wordCount = allText.split(/\s+/).filter(Boolean).length;
      console.log(`-> Artigo gerado com sucesso. Contagem de palavras estimada: ${wordCount}`);

      if (wordCount < 850) {
        throw new Error(`O artigo gerado possui apenas ${wordCount} palavras. O mínimo para SEO aceito pelo robô é 850 palavras.`);
      }

      // Se passou por todas as validações, saímos do loop
      break;

    } catch (error) {
      attempts--;
      console.warn(`⚠️ Aviso: Falha na geração nesta tentativa: ${error.message}`);
      if (attempts === 0) {
        console.error("\n❌ ERRO: Esgotadas todas as 3 tentativas de geração de artigo em conformidade com as regras.");
        process.exit(1);
      }
    }
  }

  // Preencher os dados de E-E-A-T no artigo
  const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
  newArticle.author = randomAuthor;

  // Formatar as datas do dia atual
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const month = months[today.getMonth()];
  const year = today.getFullYear();

  newArticle.date = `${day} de ${month} de ${year}`;
  newArticle.dateISO = today.toISOString().split("T")[0];

  // Resolver colisão de slug (se o slug gerado já existir, adicionamos um sufixo numérico)
  const slugExists = articles.some(a => a.slug === newArticle.slug);
  if (slugExists) {
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    newArticle.slug = `${newArticle.slug}-${randomSuffix}`;
    console.log(`-> Colisão de slug detectada. Novo slug gerado: ${newArticle.slug}`);
  }

  // Adicionar no início do array de artigos (artigo mais recente aparece primeiro)
  articles.unshift(newArticle);

  // Salvar de volta em src/data/articles.json
  fs.writeFileSync(dataPath, JSON.stringify(articles, null, 2), "utf-8");

  console.log(`\n==================================================`);
  console.log(`✅ SUCESSO: Novo artigo gerado com alta autoridade E-E-A-T!`);
  console.log(`Título: "${newArticle.title}"`);
  console.log(`Autor: ${newArticle.author.name} (${newArticle.author.role})`);
  console.log(`Slug: /artigos/${newArticle.slug}`);
  console.log(`Data: ${newArticle.date} (${newArticle.dateISO})`);
  console.log(`Total de blocos gerados: ${newArticle.content.length}`);
  console.log(`==================================================\n`);
}

generateArticle();
