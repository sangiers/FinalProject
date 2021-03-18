const items = JSON.parse(localStorage.getItem("user")).fav;
const catRow = document.getElementsByClassName("catalog-row")[0];

function createFavs() {
	new Promise((resolve, reject) => {
		catRow.innerHTML = "";
		items.forEach(e => {
			const div = document.createElement("div");
			div.className = "catalog-card col-12 col-sm-6 col-md-4";
			div.innerHTML = `
      <div class="catalog-card__inner">
      <img
        src="${e.imageUrl}"
        alt="${e.name}"
        class="catalog-card__img"
      />
      <div class="catalog-card__caption">
        <h3 class="catalog-card__title">${e.name}</h3>
        <p class="catalog-card__model">
          <span data-lang="catalog-card-model"></span>: <span>${e.model}</span>
        </p>
        <p class="catalog-card__price">
          <span data-lang="catalog-card-price"></span>: <span>${e.price}</span>$
        </p>
      </div>
      </div>`;
			catRow.appendChild(div);
		});
		resolve();
	}).then(() => {
		setText();
		let btns = document.getElementsByClassName("catalog-card-btn");
		Array.from(btns).forEach(b => {
			b.addEventListener("click", () => {
				showModal(b.dataset.id);
			});
		});
	});
}

function createTable() {
	let table = document.getElementById("list-group");
	let info = JSON.parse(localStorage.getItem("user"));
	table.innerHTML =
		'<li class="list-group-item active" data-lang="profile-details"></li>';
	for (let key in info) {
		if (key !== "fav") {
			let li = document.createElement("li");
			li.className = "list-group-item";
			li.innerHTML = `<strong>${key}:</strong> <span>${info[key]}</span>`;
			table.appendChild(li);
		}
	}
}

let profileBtn = document.getElementById("profile-btn");

profileBtn.addEventListener("click", () => {
	let cat = document.getElementById("input-cat").value;
	let desc = document.getElementById("input-desc").value;
	if (cat && desc) {
		let user = JSON.parse(localStorage.getItem("user"));
		user[cat] = desc;
		localStorage.setItem("user", JSON.stringify(user));
		createTable();
		document.getElementById("input-cat").value = "";
		document.getElementById("input-desc").value = "";
	} else {
		let html = document.querySelector("html");
		if (html.lang == "en") {
			alert("Category and description must not be empty!");
		} else {
			alert("Категория и описание не должны быть пустыми");
		}
	}
});

let logoutBtn = document.getElementById("profile-logout");
logoutBtn.addEventListener("click", () => {
	localStorage.removeItem("userLogged");
	location.href = "login.html";
});

createFavs();
createTable();
