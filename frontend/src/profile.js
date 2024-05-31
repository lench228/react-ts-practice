const popupcloseIcon = document.getElementById("popupcloseIcon");
const resetPasswordButton = document.getElementById("resetPasswordButton");

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