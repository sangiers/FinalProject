const carsUrl =
	"https://my-json-server.typicode.com/sangiers/mockjson/cars";
const jeepsUrl =
	"https://my-json-server.typicode.com/sangiers/mockjson/jeeps";
const bikesUrl =
	"https://my-json-server.typicode.com/sangiers/mockjson/bikes";

const searchBtn = document.getElementById("catalog-search-btn");
const resetBtn = document.getElementById("catalog-search-reset");
const catRow = document.getElementsByClassName("catalog-row")[0];

let catalog = [];
let items = [];

resetBtn.addEventListener("click", () => {
	items = catalog.slice();
	createCatalog();
});

searchBtn.addEventListener("click", () => {
	let query = document.getElementById("catalog-search-input").value;
	if (query) {
		items = catalog.filter(e => {
			let add = false;
			for (let key in e) {
				if (key !== "id" && key !== "imageUrl") {
					if (e[key].toLowerCase().includes(query.toLowerCase())) {
						add = true;
					}
				}
			}
			return add;
		});
	} else {
		items = catalog.slice();
	}
	createCatalog();
});

ajaxRequest = (url, method, data) => {
	return new Promise(function (resolve, reject) {
		let request = new XMLHttpRequest();
		request.responseType = "json";
		request.onreadystatechange = function () {
			if (request.readyState === XMLHttpRequest.DONE) {
				if (request.status === 200) {
					resolve(request.response);
				} else {
					reject(Error(request.status));
				}
			}
		};
		request.onerror = function () {
			reject(Error("Network Error"));
		};
		request.open(method, url, true);
		request.send(data);
	});
};

function createCatalog() {
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
        <div class="catalog-card__btn">
          <button
            class="btn btn-primary catalog-card-btn"
            data-id="${e.id}"
            data-lang="catalog-card-btn"
          ></button>
        </div>
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

let modal = document.getElementById("myModal");

function showModal(id) {
	modal.style.display = "flex";
	let btn = document.getElementById("btn-yes");
	btn.addEventListener("click", () => {
		let item = catalog.find(t => t.id === id);
		addToFav(item);
		closeModal();
	});
}
function closeModal() {
	modal.style.display = "none";
}
function addToFav(item) {
	let ls = localStorage.getItem("user");
	let c = JSON.parse(ls);
	if (!("fav" in c)) {
		c.fav = [item];
	} else {
		let check = c.fav.find(t => t === item);
		if (!check) {
			c.fav.push(item);
		}
	}
	localStorage.setItem("user", JSON.stringify(c));
}

let carsReq = ajaxRequest(carsUrl, "GET")
	.then(res => {
		res.forEach(e => {
			e.model = "Car";
		});
		catalog = catalog.concat(res);
	})
	.catch(e => console.error(e));

let bikesReq = ajaxRequest(bikesUrl, "GET")
	.then(res => {
		res.forEach(e => {
			e.model = "Motorcycle";
		});
		catalog = catalog.concat(res);
	})
	.catch(e => console.error(e));

let jeepsReq = ajaxRequest(jeepsUrl, "GET")
	.then(res => {
		res.forEach(e => {
			e.model = "Jeep";
		});
		catalog = catalog.concat(res);
	})
	.catch(e => console.error(e));

Promise.all([carsReq, bikesReq, jeepsReq]).then(() => {
	items = catalog;
	createCatalog();
});
