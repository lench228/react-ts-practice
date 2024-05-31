document.addEventListener("DOMContentLoaded", function () {
	const popupcloseIcon = document.getElementById("popupcloseIcon");
	const registerButton = document.getElementById("registerButton");
	const loginButtonChild = document.getElementById("loginButtonChild");
	const mainLogin = document.getElementById("mainLogin");
	const profileIcon = document.getElementById("profileIcon");
	const scrollAnimElements = document.querySelectorAll("[data-animate-on-scroll]");

	// Обработчик для закрытия попапа
	if (popupcloseIcon) {
		 popupcloseIcon.addEventListener("click", function (e) {
			  let popup = e.currentTarget.closest(".popup-overlay");
			  if (popup) {
					popup.style.display = "none";
			  }
		 });
	}

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
