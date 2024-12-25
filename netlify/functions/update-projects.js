const { Octokit } = require("@octokit/rest");
require('dotenv').config();

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      body: "Método não permitido" 
    };
  }

  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    const { projeto } = JSON.parse(event.body);

    // Busca o arquivo atual de projetos
    let projetos = [];
    try {
      const { data: fileData } = await octokit.repos.getContent({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        path: 'projetos.json'
      });

      const content = Buffer.from(fileData.content, 'base64').toString();
      projetos = JSON.parse(content);
    } catch (error) {
      // Se o arquivo não existir, começamos com um array vazio
      console.log('Arquivo não encontrado, criando novo');
    }

    // Adiciona o novo projeto
    projetos.push({
      ...projeto,
      id: Date.now(),
      dataCriacao: new Date().toISOString()
    });

    // Atualiza ou cria o arquivo
    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: 'projetos.json',
      message: 'Adiciona novo projeto via Netlify Function',
      content: Buffer.from(JSON.stringify(projetos, null, 2)).toString('base64'),
      sha: fileData?.sha
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Projeto adicionado com sucesso" })
    };
  } catch (error) {
    console.error('Erro:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao salvar projeto" })
    };
  }
}