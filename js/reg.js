const regBtn = document.getElementById("regbtn");
const logBtn = document.getElementById("logbtn");

if (regBtn) {
	regBtn.addEventListener("click", e => {
		e.preventDefault();
		let name = document.getElementsByName("name")[0].value;
		let login = document.getElementsByName("login")[0].value;
		let password = document.getElementsByName("password")[0].value;
		let user = {};

		let successBox = document.getElementsByClassName("alert-success")[0];
		let dangerBox = document.getElementsByClassName("alert-danger")[0];

		if (name && login && password) {
			user = {
				name: name,
				login: login,
				password: password,
			};
			successBox.style.display = "block";
			dangerBox.style.display = "none";
			localStorage.setItem("user", JSON.stringify(user));
			setTimeout(() => {
				location.href = "login.html";
			}, 1000);
		} else {
			dangerBox.style.display = "block";
		}
	});
}

if (logBtn) {
	logBtn.addEventListener("click", e => {
		let login = document.getElementsByName("login")[0].value;
		let password = document.getElementsByName("password")[0].value;
		let user = {};

		let successBox = document.getElementsByClassName("alert-success")[0];
		let dangerBox = document.getElementsByClassName("alert-danger")[0];

		if (login && password) {
			user = {
				login: login,
				password: password,
			};

			let userExists = localStorage.getItem("user");

			console.log(JSON.parse(userExists));
			if (!userExists) {
				dangerBox.style.display = "block";
			} else {
				let info = JSON.parse(userExists);
				if (user.login === info.login && user.password === info.password) {
					successBox.style.display = "block";
					dangerBox.style.display = "none";
					localStorage.setItem("userLogged", userExists);
					setTimeout(() => {
						location.href = "index.html";
					}, 1000);
				} else {
					dangerBox.style.display = "block";
				}
			}
		} else {
			dangerBox.style.display = "block";
		}
	});
}
