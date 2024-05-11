const text = document.getElementById("text");
const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");
const logoIcon = document.getElementById("logoIcon");
const favouriteIcon = document.getElementById("favouriteIcon");
const bagIcon = document.getElementById("bagIcon");
const profileIcon = document.getElementById("profileIcon");

if (text) {
	text.addEventListener("click", function (e) {
		window.location.href = "./profile.html";
	});
}

if (text1) {
	text1.addEventListener("click", function (e) {
		window.location.href = "./profile.html";
	});
}

if (text2) {
	text2.addEventListener("click", function (e) {
		window.location.href = "";
	});
}

if (text3) {
	text3.addEventListener("click", function (e) {
		window.location.href = "index.html";
	});
}

if (logoIcon) {
	logoIcon.addEventListener("click", function (e) {
		window.location.href = "index.html";
	});
}

if (favouriteIcon) {
	favouriteIcon.addEventListener("click", function (e) {
		window.location.href = "";
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