function getSingleProduct(id) {
    return fetch(`https://dummyjson.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      const cssPath = "styles/style.css";
      let html = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <title>Страница ${product.title}</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href=${cssPath}>

      </head>
      <body>
      `;

      html += 
        `
          <div class="product-detail">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <div class="images">
              ${product.images.map(img => `<img src="${img}" alt="${product.title}">`).join('')}
            </div>
            <p>price: $${product.price}</p>
          </div>
          `
        ;
      
      html += `
      </body>
      </html>`
        
      return html;
    })
}

module.exports = getSingleProduct;