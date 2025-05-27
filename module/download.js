const axios = require('axios');
const archiver = require('archiver');

async function downloadsImages() {
    return new Promise(async (resolve, reject) => {
        try {

            const response = await axios.get('https://dummyjson.com/products');
            const products = response.data.products;
            

            const archive = archiver('zip', { zlib: { level: 9 } });
            let chunks = [];
            
            archive.on('data', (chunk) => chunks.push(chunk));
            archive.on('end', () => {
                const result = Buffer.concat(chunks);
                resolve(result);
            });
            

            for (const product of products) {
                for (const [index, imageUrl] of product.images.entries()) {
                    try {
                        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                        const filename = `${product.title.replace(/[^a-z0-9]/gi, '_')}_${index}.webp`;
                        archive.append(Buffer.from(imageResponse.data), { name: filename });
                    } catch (error) {
                        console.error(`Ошибка загрузки ${imageUrl}:`, error);
                    }
                }
            }
            
            archive.finalize();
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = downloadsImages;