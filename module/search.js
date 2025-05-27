function getSearch(title) {
    return fetch(`https://dummyjson.com/products/search?q=${title}`)
    .then(res => res.json())
    .then(data => {

      let html = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
          <title>Запрос ${title}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/styles/style.css">

        </head>
        <body>
        

      `;

      data.products.forEach(product => {
      html += `
      Найдено по запросу: ${title}
      <a href=/product/${product.id}>
        <div class="product">
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <div class="images">
            ${product.images.map(img => `<img src="${img}" alt="${product.title}">`).join('')}
          </div>
        </div>
      </a>

      `;
      });

      html += `
      </body>
      </html>`
      
      return html;

    })
}

module.exports = getSearch;