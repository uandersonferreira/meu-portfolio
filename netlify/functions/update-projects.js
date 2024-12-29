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
      // Obtém o conteúdo atual do arquivo projetos.json
      const response = await octokit.repos.getContent({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        path: 'projetos.json'
      });
      
      fileData = response.data;
      const content = Buffer.from(fileData.content, 'base64').toString();
      projetos = JSON.parse(content);

      // Cria uma cópia de segurança do arquivo atual
      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        path: 'projetos-backup.json', // Caminho do arquivo de backup
        message: 'Backup do arquivo projetos.json antes de atualização',
        content: fileData.content, // Usa o conteúdo atual do arquivo como está
        sha: undefined // Não é necessário SHA para criar um novo arquivo ou sobrescrever
      });

    } catch (error) {
      console.log('Arquivo não encontrado, criando novo');
    }

    // Adiciona o novo projeto na lista
    projetos.push({
      ...projeto,
      id: Date.now(),
      dataCriacao: new Date().toISOString()
    });

    // Atualiza o arquivo projetos.json com o novo conteúdo
    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: 'projetos.json',
      message: 'Adiciona novo projeto via Netlify Function',
      content: Buffer.from(JSON.stringify(projetos, null, 2)).toString('base64'),
      sha: fileData?.sha // Atualiza o arquivo usando a SHA atual
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
};
