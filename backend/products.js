const fs = require('fs');
const mongoose = require('mongoose');
const {GridFSBucket} = require('mongodb');
const ProductModel = require('./models/product-model'); // Убедитесь, что путь к вашей модели правильный

require("dotenv").config();
const importImages = async () => {
    try {
        // Подключение к базе данных
        await mongoose.connect(process.env.DB_URL);
        const bucket = new GridFSBucket(mongoose.connection.db);

        // Чтение данных из JSON-файла
        const data = JSON.parse(fs.readFileSync('./products/products.json', 'utf-8'));

        for (const item of data) {
            console.log(item);
            const imagePath = item.imagePath;

            // Проверка, существует ли файл
            if (!fs.existsSync(imagePath)) {
                console.error(`Файл не найден: ${imagePath}`);
                continue; // Пропускаем итерацию, если файл не найден
            }

            console.log(`Начинается загрузка файла: ${imagePath}`);

            // Сохранение изображения в GridFS
            const readStream = fs.createReadStream(imagePath);
            const uploadStream = bucket.openUploadStream(imagePath.split('/').pop());
            console.log(uploadStream)
            // Прокидывание потока
            const uploadPromise = new Promise((resolve, reject) => {
                readStream.pipe(uploadStream);

                // Обработка события завершения загрузки
                uploadStream.on('finish', async () => {
                    console.log(`Файл ${item.name} успешно загружен.`);

                    // Создание записи в MongoDB
                    const newImage = new ProductModel({
                        ...item,
                        imageId: uploadStream.id // Идентификатор загруженного изображения
                    });

                    try {
                        await newImage.save(); // Используем save вместо create
                        console.log(`Загружено: ${item.name}`);
                        resolve(); // Успешное завершение
                    } catch (saveError) {
                        console.error(`Ошибка сохранения изображения ${item.name}:`, saveError);
                        reject(saveError); // Завершение с ошибкой
                    }
                });

                uploadStream.on('error', (error) => {
                    console.error(`Ошибка загрузки ${item.name}:`, error);
                    reject(error); // Завершение с ошибкой
                });
            });


            await new Promise((resolve, reject) => {
                readStream.on('end', resolve);
                readStream.on('error', reject);
            });
        }
    } catch (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } finally {
        // Закрытие подключения после завершения загрузки всех изображений
        setTimeout(() => {
            mongoose.connection.close();
        }, 1000);
    }
};
importImages();
