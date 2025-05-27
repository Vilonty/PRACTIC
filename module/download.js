
const express = require('express');
const axios = require('axios');

function downloadsImages(app) {
    app.get('/download-kiwi', (req, res) => {
        const imageUrl = 'https://cdn.dummyjson.com/product-images/groceries/kiwi/1.webp';
        
        // Устанавливаем заголовки для скачивания
        res.setHeader('Content-Disposition', 'attachment; filename="kiwi_image.webp"');
        
        // Перенаправляем на прямую ссылку изображения
        res.redirect(302, imageUrl);
    });
}

module.exports = downloadsImages;