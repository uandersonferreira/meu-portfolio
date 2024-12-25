let Octokit;

exports.handler = async function(event, context) {
  // Dynamic import of Octokit
  const { Octokit: OctokitClass } = await import("@octokit/rest");
  Octokit = OctokitClass;
  
  require('dotenv').config();

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

    let projetos = [];
    let fileData;
    
    try {
      const response = await octokit.repos.getContent({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        path: 'projetos.json'
      });
      
      fileData = response.data;
      const content = Buffer.from(fileData.content, 'base64').toString();
      projetos = JSON.parse(content);
    } catch (error) {
      console.log('Arquivo não encontrado, criando novo');
    }

    projetos.push({
      ...projeto,
      id: Date.now(),
      dataCriacao: new Date().toISOString()
    });

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
