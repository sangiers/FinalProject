// Function for changing the language of the website
if (!localStorage.getItem("lang")) {
	localStorage.setItem("lang", "ru");
}

window.onload = function () {
	setText();
	setNavbarLang();
	let array = [];
	if (!localStorage.getItem("userLogged")) {
		array = ["nav-profile", "nav-catalog"];
	} else {
		array = ["nav-register", "nav-login"];
	}
	array.forEach(e => {
		let block = document.querySelector(`[data-lang="${e}"]`);
		if (block) {
			block.style.display = "none";
		}
	});
};
let curLang = localStorage.getItem("lang");
function changeLanguage() {
	let langs = document.querySelectorAll(".dropdown-lang a");
	let temp = langs[0].innerHTML;
	curLang = curLang === "en" ? "ru" : "en";

	document.querySelector("html").attributes.lang = curLang;

	langs[0].innerHTML = langs[1].innerHTML;
	langs[1].innerHTML = temp;

	localStorage.setItem("lang", curLang);
	setText();
}

function setText() {
	for (let key in dict[curLang]) {
		let e = document.querySelectorAll(`[data-lang="${key}"]`);

		if (e.length) {
			e.forEach(t => (t.textContent = dict[curLang][key]));
		}
	}
}

function setNavbarLang() {
	let nav = document.getElementById("dropdown-lang");

	if (localStorage.getItem("lang") === "en") {
		nav.innerHTML = `<a
    class="nav-link dropdown-toggle"
    id="dropdown09"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
    ><span class="flag-icon flag-icon-us"> </span> English
  </a>
  <div class="dropdown-menu" aria-labelledby="dropdown09">
    <a class="dropdown-item" href="#ru" onclick="changeLanguage()"
      ><span class="flag-icon flag-icon-ru"> </span> Русский</a
    >
  </div>`;
	} else {
		nav.innerHTML = `<a
    class="nav-link dropdown-toggle"
    id="dropdown09"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
    ><span class="flag-icon flag-icon-ru"> </span> Русский</a
    >
  <div class="dropdown-menu" aria-labelledby="dropdown09">
    <a class="dropdown-item" href="#ru" onclick="changeLanguage()"
      ><span class="flag-icon flag-icon-us"> </span> English
      </a>
  </div>`;
	}
}
