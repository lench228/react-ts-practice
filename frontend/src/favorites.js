import { USERS, PRODUCTS } from './mock.js';

document.addEventListener('DOMContentLoaded', function () {
  let currentUser = USERS[0];
  const savedFavorites = localStorage.getItem('userFavorites');

  if (savedFavorites) {
    currentUser.favorites = JSON.parse(savedFavorites);
  }

  PRODUCTS.forEach(product => {
    product.isFavorite = currentUser.favorites.includes(product.id);
  });

  const favouriteList = document.getElementById('favourite-list');
  const favoriteProducts = PRODUCTS.filter(product => product.isFavorite);
  favouriteList.innerHTML = favoriteProducts.map(createProductItem).join('');
  const heartButtons = document.querySelectorAll('.heart-button');

  heartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const heartIcon = this.querySelector('.heart-icon');
      const productId = this.closest('.item').dataset.productId;
      const product = PRODUCTS.find(p => p.id === productId);
      product.isFavorite = !product.isFavorite;

      if (product.isFavorite) {
        currentUser.favorites.push(product.id);
        heartIcon.src = '/frontend/public/img/svg/fill-heart.svg';
      } else {
        currentUser.favorites = currentUser.favorites.filter(favId => favId !== product.id);
        heartIcon.src = '/frontend/public/img/svg/empty-heart.svg';
      }
      localStorage.setItem('userFavorites', JSON.stringify(currentUser.favorites));
      localStorage.setItem('products', JSON.stringify(PRODUCTS));
    });
  });
  const itemImages = document.querySelectorAll('.item-img');
	itemImages.forEach(img => {
		img.addEventListener('click', function () {
			const productId = this.closest('.item').dataset.productId;
			localStorage.setItem('selectedProductId', productId);
			navigateTo('./product-card.html');
		});
	});
});

function createProductItem(product) {
  const discountedPrice = product.tag === 'sale' ? Math.floor(product.price * 0.8) : null;
  const originalPriceStyle = (product.tag === '' || product.tag === 'new') ? 'color: var(--color-black);' : 'text-decoration: line-through; color: var(--color1);';

  return `
    <div class="item" data-product-id="${product.id}">
      <div class="image-wrapper">
        <img class="item-img" src="${product.img}" alt="${product.name}" />
        ${product.tag ? `<div class="tag ${product.tag === 'new' ? 'new' : 'discount'}">${product.tag}</div>` : ''}
        <button class="heart-button">
          <img src="${product.isFavorite ? '/frontend/public/img/svg/fill-heart.svg' : '/frontend/public/img/svg/empty-heart.svg'}" alt="Heart Icon" class="heart-icon">
        </button>
      </div>
      <div class="item-details">
        <div class="price">
          <span class="discounted-price" style="${originalPriceStyle}">${product.price} ₽</span>
          ${discountedPrice ? `<span class="discounted-price">${discountedPrice} ₽</span>` : ''}
        </div>
        <div class="item-name">${product.name}</div>
      </div>
    </div>
  `;
}

document.getElementById('favourite-list').innerHTML = PRODUCTS.map(createProductItem).join('');
