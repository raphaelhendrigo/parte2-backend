const http = require('http');
const url = require('url'); //permite resolver e fazer o parser de uma
const fs = require('fs'); //interação com sistemas de arquivos
const path = require('path'); //lidar com caminho de arquivos, extensões

const hostname = '127.0.0.1';
const port = 5000;

const mimeTypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpg",
    woof: "font/woof"
};

http.createServer((req, res) => {
    let acesso_uri = url.parse(req.url).pathname;

    let caminho_completo_recurso = path.join(process.cwd(), decodeURI(acesso_uri));
    console.log(caminho_completo_recurso);

    let recurso_carregado;
    try {
        recurso_carregado = fs.lstatSync(caminho_completo_recurso)
    } catch (error) {
        res.writeHead(404, {'Content-Type': 'text/plain' });
        res.write('404: Arquivo não encontrado!');
        res.end();
    }

    if (recurso_carregado.isFile()) {
        let mimeType = mimeTypes[console.log(path.extname(caminho_completo_recurso).substring(1))];

        res.writeHead(200, { 'Content-Type': 'mimeType' });
        let fluxo_arquivo = fs.createReadStream(caminho_completo_recurso)
        fluxo_arquivo.pipe(res);
    } else if (recurso_carregado.isDirectory()) {
        res.writeHead(302, { 'Location': 'index.html' });
        res.end();
    } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write("500: Erro interno do servidor");
        res.end();
    }
  

}).listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
})
    
    