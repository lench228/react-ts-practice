const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const ProductsController = require("../controllers/products-controller");
const router = new Router();

const {body} = require("express-validator");


router.post(
    "/registration",
    body("email").isEmail,
    body("password").isLength({min: 3, max: 32}),
    userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);
router.get("/products", ProductsController.getAll);


const {ObjectId} = require('mongodb');

router.get('/images/:id', async (req, res) => {
    try {
        const fileId = req.params.id; // Получаем ID из параметров
        const downloadStream = req.app.locals.bucket.openDownloadStream(new ObjectId(fileId)); // Преобразуем в ObjectId

        downloadStream.on('error', (error) => {
            console.error('Ошибка загрузки изображения:', error);
            return res.status(404).send('Изображение не найдено');
        });

        res.set('Content-Type', 'image/webp');
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).send('Ошибка сервера');
    }
});


module.exports = router;



