import { PRODUCTS } from './mock.js';

document.addEventListener('DOMContentLoaded', function () {
	const selectedProductId = localStorage.getItem('selectedProductId');
	if (selectedProductId) {
		const product = PRODUCTS.find(p => p.id === selectedProductId);
		if (product) {
			displayProductDetails(product);
		}
	}
});

function displayProductDetails(product) {
	// Отображение главного изображения товара
	const mainImage = document.querySelector('.left-container .image');
	mainImage.src = product.img;

	// Отображение тега (например, New или Sale)
	const labelWrapper = document.querySelector('.left-container .label-wrapper');
	if (product.tag === 'new' || product.tag === 'sale') {
		labelWrapper.style.display = 'block';
		labelWrapper.querySelector('.label').textContent = product.tag.toUpperCase();

		// Установка цвета фона в зависимости от тега
		labelWrapper.style.backgroundColor = product.tag === 'new' ? '#417060' : 'var(--color-firebrick-100)';
	} else {
		labelWrapper.style.display = 'none';
	}


	// Отображение вариантов товара
	const variantsContainer = document.querySelector('.right-container .variants');
	variantsContainer.innerHTML = product.items.map(item => `
        <div class="variant">
            <img class="variant-thumbnail" loading="lazy" alt="${item.name}" src="${item.itemImg}" />
            <div class="variant-name">${item.name}</div>
        </div>
    `).join('');

	// Обновление названия товара
	const productTitle = document.querySelector('.right-container .product-title');
	productTitle.textContent = product.name;

	// Обновление цены товара
	const priceValue = document.querySelector('.right-container .price-value');
	const finalPrice = product.tag === 'sale' ? Math.floor(product.price * 0.8) : product.price;
	priceValue.textContent = `${finalPrice} ₽`;

	// Установка правильного состояния кнопки "В корзину"
	const addToCartButton = document.querySelector('.right-container .add-to-cart');
	addToCartButton.addEventListener('click', function () {
		// Логика добавления товара в корзину
	});
}
