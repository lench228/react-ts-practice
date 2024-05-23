document.addEventListener("DOMContentLoaded", function () {
	// Инициализация переменных
	const popupcloseIcon = document.getElementById("popupcloseIcon");
	const kitchenContainer = document.getElementById("kitchenContainer");
	const bathroomContainer = document.getElementById("bathroomContainer");
	const bedroomContainer = document.getElementById("bedroomContainer");
	const kitchenNavigationImage = document.getElementById("kitchenNavigationImage");
	const registerButton = document.getElementById("registerButton");
	const loginButtonChild = document.getElementById("loginButtonChild");
	const mainLogin = document.getElementById("mainLogin");
	const profileIcon = document.getElementById("profileIcon");
	const logoIcon = document.getElementById("logoIcon");
	const favouriteIcon = document.getElementById("favouriteIcon");
	const bagIcon = document.getElementById("bagIcon");
	const scrollAnimElements = document.querySelectorAll("[data-animate-on-scroll]");
	const texts = [document.getElementById("text"), document.getElementById("text1"), document.getElementById("text2"), document.getElementById("text3")];
	const button = document.getElementById("button");

	// Функция для перехода на другую страницу
	function navigateTo(url) {
		 window.location.href = url;
	}

	// Обработчик для закрытия попапа
	if (popupcloseIcon) {
		 popupcloseIcon.addEventListener("click", function (e) {
			  let popup = e.currentTarget.closest(".popup-overlay");
			  if (popup) {
					popup.style.display = "none";
			  }
		 });
	}

	// Обработчики для текстов, контейнеров и кнопки
	const elementsToNavigate = [
		 { element: kitchenContainer, url: "./catalog.html" },
		 { element: bathroomContainer, url: "./catalog.html" },
		 { element: bedroomContainer, url: "./catalog.html" },
		 { element: kitchenNavigationImage, url: "./catalog.html" },
		 { element: button, url: "./catalog.html" },
		 { element: logoIcon, url: "./index.html" },
		 { element: favouriteIcon, url: "./favorites.html" },
		 { element: bagIcon, url: "./bag.html" }, // Предполагаемый URL для корзины
		 ...texts.map(text => ({ element: text, url: "./catalog.html" })),
	];

	elementsToNavigate.forEach(({ element, url }) => {
		 if (element) {
			  element.addEventListener("click", () => navigateTo(url));
		 }
	});

	// Обработчик для переключения между "Вход" и "Регистрация"
	if (registerButton && mainLogin && loginButtonChild) {
		 registerButton.addEventListener("click", function () {
			  const isLogin = mainLogin.textContent === "Вход";
			  mainLogin.textContent = isLogin ? "Регистрация" : "Вход";
			  registerButton.textContent = isLogin ? "Вход" : "Регистрация";
			  loginButtonChild.textContent = isLogin ? "Зарегистрироваться" : "Войти";
		 });
	}

	// Обработчик для иконки профиля
	if (profileIcon) {
		 profileIcon.addEventListener("click", function () {
			  const popup = document.getElementById("popup");
			  if (popup) {
					const popupStyle = popup.style;
					popupStyle.display = "flex";
					popupStyle.zIndex = 100;
					popupStyle.backgroundColor = "rgba(113, 113, 113, 0.8)";
					popupStyle.alignItems = "center";
					popupStyle.justifyContent = "center";

					const onClick = (e) => {
						 if (e.target === popup && popup.hasAttribute("closable")) {
							  popupStyle.display = "none";
						 }
					};
					popup.setAttribute("closable", "");
					popup.addEventListener("click", onClick);
			  }
		 });
	}

	// Анимация на скролл
	const observer = new IntersectionObserver(
		 (entries) => {
			  entries.forEach(entry => {
					if (entry.isIntersecting) {
						 entry.target.classList.add("animate");
						 observer.unobserve(entry.target);
					}
			  });
		 },
		 { threshold: 0.15 }
	);

	scrollAnimElements.forEach(element => observer.observe(element));
});
