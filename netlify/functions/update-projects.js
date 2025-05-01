// update-projects.js
const { Octokit } = require("@octokit/rest");

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

    if (!projeto) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Dados do projeto não fornecidos" })
      };
    }

    let projetos = [];
    let fileData;
    
    try {
      // Tenta obter o conteúdo atual
      const response = await octokit.repos.getContent({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        path: 'projetos.json',
        ref: 'main' // ou o branch correto
      });
      
      fileData = response.data;
      const content = Buffer.from(fileData.content, 'base64').toString('utf8');
      projetos = JSON.parse(content);

      // Cria backup
      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        path: 'projetos-backup.json',
        message: 'Backup do arquivo projetos.json',
        content: fileData.content,
        branch: 'main'
      });

    } catch (error) {
      if (error.status !== 404) { // Se não for erro "não encontrado"
        throw error;
      }
      console.log('Arquivo não encontrado, criando novo');
    }

    // Adiciona novo projeto
    projetos.push({
      ...projeto,
      id: Date.now(),
      dataCriacao: new Date().toISOString()
    });

    // Atualiza arquivo principal
    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: 'projetos.json',
      message: 'Adiciona novo projeto via Netlify Function',
      content: Buffer.from(JSON.stringify(projetos, null, 2)).toString('base64'),
      sha: fileData?.sha,
      branch: 'main'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Projeto adicionado com sucesso" })
    };
  } catch (error) {
    console.error('Erro detalhado [UPDATE-PROJECTS]:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Erro ao salvar projeto [UPDATE-PROJECTS]",
        details: error.message 
      })
    };
  }
};