// Шапка
const profileIcon = document.getElementById("profileIcon");
const logoIcon = document.getElementById("logoIcon");
const favouriteIcon = document.getElementById("favouriteIcon");
const bagIcon = document.getElementById("bagIcon");

// Навигация профиля
const profileNavigation = document.getElementById("profileNavigation");
const orderNavigation = document.getElementById("orderNavigation");
const favoritesNavigation = document.getElementById("favoritesNavigation");
const signOutNavigation = document.getElementById("signOut");

// Элементы index.html
const kitchenContainer = document.getElementById("kitchenContainer");
const bathroomContainer = document.getElementById("bathroomContainer");
const bedroomContainer = document.getElementById("bedroomContainer");
const saleButton = document.getElementById("button");

// Навигация основной части сайта
const newNavigation = document.getElementById("newNavigation");
const bathroomNavigation = document.getElementById("bathroomNavigation");
const kitchenNavigation = document.getElementById("kitchenNavigation");
const bedroomNavigation = document.getElementById("bedroomNavigation");

// Подвал

const elementsToNavigate = [
	{ element: bagIcon, url: "./bag.html" }, 
	{ element: profileIcon, url: "./profile.html" },
	{ element: logoIcon, url: "./index.html" },
	{ element: favouriteIcon, url: "./favorites.html" },

	{ element: profileNavigation, url: "./profile.html" },
	{ element: orderNavigation, url: "./order.html" },
	{ element: favoritesNavigation, url: "./favorites.html" },
	{ element: signOutNavigation, url: "./index.html" },

	{ element: kitchenContainer, url: "./catalog.html", category: "Каталог - Кухня" },
	{ element: bathroomContainer, url: "./catalog.html", category: "Каталог - Ванная" },
	{ element: bedroomContainer, url: "./catalog.html", category: "Каталог - Спальня" },
	{ element: saleButton, url: "./catalog.html", category: "Каталог - Скидки" }, 

	{ element: newNavigation, url: "./catalog.html", category: "Каталог - Новинки" },
	{ element: bathroomNavigation, url: "./catalog.html", category: "Каталог - Ванная" },
	{ element: kitchenNavigation, url: "./catalog.html", category: "Каталог - Кухня" },
	{ element: bedroomNavigation, url: "./catalog.html", category: "Каталог - Спальня" },  
];


elementsToNavigate.forEach(({ element, url, category }) => {
	if (element) {
		 element.addEventListener("click", () => {
			  if (category) {
					localStorage.setItem('selectedCategory', category);
			  }
			  navigateTo(url);
		 });
	}
});

function navigateTo(url) {
	window.location.href = url;
}