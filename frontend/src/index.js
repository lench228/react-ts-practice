const popupcloseIcon = document.getElementById("popupcloseIcon");
const kitchenContainer = document.getElementById("kitchenContainer");
const bathroomContainer = document.getElementById("bathroomContainer");
const kitchenNavigationImage = document.getElementById("kitchenNavigationImage");
const bedroomContainer = document.getElementById("bedroomContainer");
const button = document.getElementById("button");
const logoIcon = document.getElementById("logoIcon");
const favouriteIcon = document.getElementById("favouriteIcon");
const bagIcon = document.getElementById("bagIcon");
const backicon = document.getElementById("backicon");
const scrollAnimElements = document.querySelectorAll("[data-animate-on-scroll]");
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

if (text) {
	text.addEventListener("click", function (e) {
		window.location.href = "./profile.html";
	});
}

if (kitchenNavigationImage) {
	kitchenNavigationImage.addEventListener("click", function (e) {
		window.location.href = "./catalog.html";
	});
}

if (kitchenContainer) {
	kitchenContainer.addEventListener("click", function (e) {
		window.location.href = "./catalog.html";
	});
}

if (bathroomContainer) {
	bathroomContainer.addEventListener("click", function (e) {
		window.location.href = "./catalog.html";
	});
}

if (bedroomContainer) {
	bedroomContainer.addEventListener("click", function (e) {
		window.location.href = "./catalog.html";
	});
}

if (button) {
	button.addEventListener("click", function (e) {
		window.location.href = "./catalog.html";
	});
}

if (text) {
	text.addEventListener("click", function (e) {
		window.location.href = "./catalog.html";
	});
}

if (text1) {
	text1.addEventListener("click", function (e) {
		window.location.href = "./catalog.html";
	});
}

if (text2) {
	text2.addEventListener("click", function (e) {
		window.location.href = "./catalog.html";
	});
}

if (text3) {
	text3.addEventListener("click", function (e) {
		window.location.href = "./catalog.html";
	});
}

if (logoIcon) {
	logoIcon.addEventListener("click", function (e) {
		window.location.href = "";
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

if (backicon) {
	backicon.addEventListener("click", function () {
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

const observer = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (entry.isIntersecting || entry.intersectionRatio > 0) {
				const targetElement = entry.target;
				targetElement.classList.add("animate");
				observer.unobserve(targetElement);
			}
		}
	},
	{
		threshold: 0.15,
	}
);

for (let i = 0; i < scrollAnimElements.length; i++) {
	observer.observe(scrollAnimElements[i]);
}