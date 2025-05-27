function getSingleProduct(id) {
  return fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      let html = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <title>${product.title}</title>
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
          .product-detail {
            background: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .product-detail h2 {
            color: #3498db;
          }
          .product-detail p {
            margin: 10px 0;
          }
          .images {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 20px 0;
          }
          .images img {
            max-width: 200px;
            max-height: 200px;
            object-fit: cover;
            border-radius: 4px;
            border: 1px solid #eee;
          }
          .back-button {
            display: inline-block;
            margin-bottom: 20px;
            padding: 10px 15px;
            background-color:#a29bfe;
            color: white;
            border-radius: 4px;
            transition: background-color 0.3s;
          }
          .back-button:hover {
            background-color:#6c5ce7;
          }
          @media (max-width: 768px) {
            body {
              padding: 10px;
            }
            .images img {
              max-width: 150px;
              max-height: 150px;
            }
          }
        </style>
      </head>
      <body>
         <a href="javascript:history.back()" class="back-button">← Назад</a>
        <div class="product-detail">
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <div class="images">
            ${product.images.map(img => `<img src="${img}" alt="${product.title}">`).join('')}
          </div>
          <p>Price: $${product.price}</p>
        </div>
      </body>
      </html>`;
      
      return html;
    });
}

module.exports = getSingleProduct;