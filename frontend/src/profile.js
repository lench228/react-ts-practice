const popupcloseIcon = document.getElementById("popupcloseIcon");
const resetPasswordButton = document.getElementById("resetPasswordButton");
const logoIcon = document.getElementById("logoIcon");
const favouriteIcon = document.getElementById("favouriteIcon");
const bagIcon = document.getElementById("bagIcon");
const profileIcon = document.getElementById("profileIcon");
const text = document.getElementById("text");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");

if (popupcloseIcon) {
	popupcloseIcon.addEventListener("click", function (e) {
		let popup = e.currentTarget.parentNode;
		function isOverlay(node) {
			return !!(
				node &&
				node.classList &&
				node.classList.contains("popup-overlay")
			);
		}
		while (popup && !isOverlay(popup)) {
			popup = popup.parentNode;
		}
		if (isOverlay(popup)) {
			popup.style.display = "none";
		}
	});
}

if (resetPasswordButton) {
	resetPasswordButton.addEventListener("click", function () {
		const popup = document.getElementById("popup");
		if (!popup) return;
		const popupStyle = popup.style;
		if (popupStyle) {
			popupStyle.display = "flex";
			popupStyle.zIndex = 100;
			popupStyle.backgroundColor = "rgba(113, 113, 113, 0.8)";
			popupStyle.alignItems = "center";
			popupStyle.justifyContent = "center";
		}
		popup.setAttribute("closable", "");

		const onClick =
			popup.onClick ||
			function (e) {
				if (e.target === popup && popup.hasAttribute("closable")) {
					popupStyle.display = "none";
				}
			};
		popup.addEventListener("click", onClick);
	});
}

if (text) {
	text.addEventListener("click", function (e) {
		window.location.href = "./profile.html";
	});
}

if (text1) {
	text1.addEventListener("click", function (e) {
		window.location.href = "";
	});
}

if (text2) {
	text2.addEventListener("click", function (e) {
		window.location.href = "./favorites.html";
	});
}

if (text3) {
	text3.addEventListener("click", function (e) {
		window.location.href = "./index.html";
	});
}

if (logoIcon) {
	logoIcon.addEventListener("click", function (e) {
		window.location.href = "./index.html";
	});
}

if (favouriteIcon) {
	favouriteIcon.addEventListener("click", function (e) {
		window.location.href = "./favorites.html";
	});
}

if (bagIcon) {
	bagIcon.addEventListener("click", function (e) {
		window.location.href = "";
	});
}

if (profileIcon) {
	profileIcon.addEventListener("click", function (e) {
		window.location.href = "./profile.html";
	});
}