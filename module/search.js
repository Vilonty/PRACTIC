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
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          h1, h2, h3 {
            color: #2c3e50;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
          .product {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .product:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }
          .product h2 {
            margin-top: 0;
            color: #3498db;
          }
          .images {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 15px 0;
          }
          .images img {
            max-width: 100px;
            max-height: 100px;
            object-fit: cover;
            border-radius: 4px;
            border: 1px solid #eee;
          }
          @media (max-width: 768px) {
            body {
              padding: 10px;
            }
            .images img {
              max-width: 80px;
              max-height: 80px;
            }
          }
        </style>
      </head>
      <body>
        <h2>Найдено по запросу: ${title}</h2>`;

      data.products.forEach(product => {
        html += `
        <a href="/product/${product.id}">
          <div class="product">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <div class="images">
              ${product.images.map(img => `<img src="${img}" alt="${product.title}">`).join('')}
            </div>
          </div>
        </a>`;
      });

      html += `</body></html>`;
      return html;
    });
}

module.exports = getSearch;