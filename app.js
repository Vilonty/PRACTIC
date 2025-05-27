const http = require('http');
const fs = require('fs');
const path = require('path');

const { getProductsHTML, getSingleProduct, getSearch, downloadsImages } = require('./module');

const types = {
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.ico': 'image/x-icon',
};

async function onRequest(request, response) {
  try {
    if (request.url === '/') {
      const html = await getProductsHTML();
      response.writeHead(200, { 'Content-Type': 'text/html' });
      return response.end(html);
    }

    if (request.url.startsWith('/product/')) {
      const productId = request.url.split('/')[2];
      console.log(productId);
      const html = await getSingleProduct(productId);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      return response.end(html);
    }

    if (request.url.startsWith('/search?q=')) {
      const title = request.url.split('=')[1];
      console.log(title);
      const html = await getSearch(title);
      response.writeHead(200, { 'Content-Type': 'text/html' });
      return response.end(html);
    }

    if (request.url.startsWith('/download')) {
    try {
        const zipBuffer = await downloadsImages();
        response.writeHead(200, {
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="all_images.zip"',
            'Content-Length': zipBuffer.length
        });
        return response.end(zipBuffer);
    } catch (error) {
        console.error('Ошибка создания архива:', error);
        response.writeHead(500);
        return response.end('Ошибка создания архива');
    }
}

    const filePath = path.join(__dirname, 'public', request.url);
    const extname = path.extname(filePath);
    const contentType = types[extname] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          response.writeHead(404);
          response.end('404 error');
        } else {
          response.writeHead(500);
          response.end('Ошибка со стороны нашей (сервера)');
        }
      } else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content);
      }
    });

  } catch (error) {
    console.error(error);
    response.writeHead(500);
    response.end('Ошибка со стороны нашей (сервера)');

  }
}

const server = http.createServer(onRequest);
server.listen(3000, '0.0.0.0', () => {
  console.log('Сервер запущен на http://localhost:3000');
});