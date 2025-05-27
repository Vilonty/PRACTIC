function getProductsHTML() {
  return fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
      let html = `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <title>Каталог товаров</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          :root {
            --primary-color: #6c5ce7;
            --secondary-color: #a29bfe;
            --accent-color: #fd79a8;
            --dark-color: #2d3436;
            --light-color: #f5f6fa;
            --success-color: #00b894;
            --text-color: #2d3436;
            --text-light: #636e72;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
          }
          
          h1, h2, h3 {
            color: var(--dark-color);
            font-weight: 600;
          }
          
          a {
            text-decoration: none;
            color: inherit;
          }
          
          .action-buttons {
            display: flex;
            gap: 15px;
            margin-bottom: 30px;
            align-items: center;
          }
          
          form {
            flex-grow: 1;
            display: flex;
            gap: 15px;
          }
          
          input[type="text"] {
            padding: 12px 15px;
            border: 2px solid var(--secondary-color);
            border-radius: 8px;
            flex-grow: 1;
            font-size: 16px;
            transition: all 0.3s ease;
          }
          
          input[type="text"]:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
          }
          
          button {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          
          .search-btn {
            background-color: var(--primary-color);
            color: white;
          }
          
          .search-btn:hover {
            background-color: #5649d1;
            transform: translateY(-2px);
          }
          
          .download-all-btn {
            background-color: var(--success-color);
            color: white;
          }
          
          .download-all-btn:hover {
            background-color: #00a884;
            transform: translateY(-2px);
          }
          
          .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 30px;
          }
          
          .product-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            border: 1px solid rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          
          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
            border-color: var(--secondary-color);
          }
          
          .product-title {
            margin: 0 0 10px 0;
            color: var(--primary-color);
            font-size: 1.2rem;
            font-weight: 600;
          }
          
          .product-description {
            color: var(--text-light);
            margin-bottom: 15px;
            font-size: 0.9rem;
            flex-grow: 1;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .product-price {
            font-weight: bold;
            color: var(--success-color);
            margin-bottom: 10px;
            font-size: 1.1rem;
          }
          
          .product-rating {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            color: var(--text-light);
            font-size: 0.9rem;
          }
          
          .product-images {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-top: auto;
          }
          
          .product-images img {
            width: 100%;
            height: 80px;
            object-fit: cover;
            border-radius: 6px;
            border: 1px solid #eee;
            transition: transform 0.3s ease;
          }
          
          .product-images img:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          
          .product-brand {
            font-size: 0.8rem;
            color: var(--text-light);
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .product-stock {
            font-size: 0.9rem;
            color: var(--text-light);
            margin-left: auto;
          }
          
          .product-discount {
            background-color: var(--accent-color);
            color: white;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            margin-left: 10px;
          }
          
          @media (max-width: 768px) {
            body {
              padding: 15px;
            }
            
            .action-buttons {
              flex-direction: column;
            }
            
            form {
              flex-direction: column;
              width: 100%;
            }
            
            button {
              width: 100%;
            }
            
            .products-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
      <div class="action-buttons">
        <form action="/search" method="get">
          <input type="text" name="q" placeholder="Искать по названию, описанию или ID">
          <button type="submit" class="search-btn">Найти</button>
        </form>
        <button class="download-all-btn" onclick="downloadAllImages()">
          Скачать все картинки
        </button>
      </div>
      <div class="products-grid">`;

      data.products.forEach(product => {
        const discountPercentage = product.discountPercentage ? 
          `<span class="product-discount">-${Math.round(product.discountPercentage)}%</span>` : '';
        
        html += `
        <a href="/product/${product.id}">
          <div class="product-card">
            <span class="product-brand">${product.brand}</span>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
              $${product.price}
              ${discountPercentage}
            </div>
            <div class="product-rating">
              ★ ${product.rating.toFixed(1)}
              <span class="product-stock">${product.stock} в наличии</span>
            </div>
            <div class="product-images">
              ${product.images.slice(0, 3).map(img => `<img src="${img}" alt="${product.title}">`).join('')}
            </div>
          </div>
        </a>`;
      });

      html += `
      </div>
      <script>
        async function downloadAllImages() {
          try {
            const response = await fetch('/download-all');
            if (response.ok) {
              alert('Все картинки начали загружаться!');
            } else {
              alert('Ошибка при загрузке картинок');
            }
          } catch (error) {
            alert('Ошибка: ' + error.message);
          }
        }
      </script>
      </body>
      </html>`;
      
      return html;
    });
}

module.exports = getProductsHTML;