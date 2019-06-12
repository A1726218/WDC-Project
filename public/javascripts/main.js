const vueinst = new Vue({
    el: "#main",
    data: {
        searchterm: "",
        results: [],
        signin: "Login",
        signintitle: "Register or login",
        signinonclick: redirectLogin,
        login: false,
        response: "",
    },
});

Vue.component("result", {
    props: ["result"],
    // eslint-disable-next-line quotes
    template: '<div class="result">{{result}}</div>',
});

function searchRestaurants() {

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            vueinst.results = JSON.parse(this.response);
        }
    };

    xhttp.open("GET", `/users/search?q=${vueinst.searchterm}&n=8`, true);
    xhttp.send();
}

let i = Math.floor(Math.random() * 7);

function loadBackground() {

    i = (i + 1) % 6;

    const background = document.getElementById("background");

    background.classList.remove("enlarge");
    setTimeout(() => background.classList.add("enlarge"), 100);

    background.style.backgroundImage = `url("../images/background/${i}.jpg")`;
    setTimeout(loadBackground, 10000);
}

function redirectPage(page) {
    window.location.href = `/${page}`;
}

function startup(page) {
    window.history.replaceState("", "", `/${page}`);
    checkLogin();
    loadBackground();
}

function startupAccount() {
    startup("account");
    retrieveDetails();
}

function retrieveDetails() {

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
            document.getElementById("first_name").value = response.first_name;
            document.getElementById("last_name").value = response.last_name;
            document.getElementById("email").value = response.email;
        }
    };

    xhttp.open("GET", "./users/retrieve", true);
    xhttp.send();
}

function redirectLogin() {
    redirectPage("login");
}

function redirectAccount() {
    redirectPage("account");
}

function checkLogin() {

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            vueinst.signin = "Account";
            vueinst.signintitle = `Logged in as ${this.responseText}`;
            vueinst.signinonclick = redirectAccount;
            vueinst.login = true;
        }
    };

    xhttp.open("POST", "./users/checklogin", true);
    xhttp.send();
}

function getRestaurant() {

    const details = new Object();

    const upload_images = document.getElementById("upload_images");
    details["upload_images"] = upload_images.files;

    const fields = ["address", "contact_details", "name_of_restaurant", "description"];

    for (field of fields) {
        const element = document.getElementById(field);
        details[field] = element.value;
        element.value = "";
    }

    const available_seats = document.getElementById("available_seats");
    const available_seats_value = Number(available_seats.value);
    if (available_seats_value > 200) {
        details["available_seats"] = 200;
    } else if (available_seats_value < 0) {
        details["available_seats"] = 0;
    } else {
        details["available_seats"] = available_seats_value;
    }
    available_seats.value = 0;

    const cost = document.querySelectorAll("#cost input");
    cost.forEach(c => {
        if (c.checked) {
            details["cost"] = c.title.length;
        }
    });

    const days_open = document.querySelectorAll("#days_open input");
    days_open.forEach(d => {
        details[d.title] = new Object();
        details[d.title]["isOpen"] = d.checked;
        d.checked = false;
    });

    const opening_time = document.querySelectorAll("#times div input:first-child");
    opening_time.forEach(o => {
        details[o.title.split(" ", 1)[0]]["opening"] = o.value ? o.value : "09:00";
        o.value = "09:00";
    });

    const closing_time = document.querySelectorAll("#times div input:last-child");
    closing_time.forEach(o => {
        details[o.title.split(" ", 1)[0]]["closing"] = o.value ? o.value : "17:00";
        o.value = "17:00";
    });

    return details;
}

function getLogin() {

    const details = new Object();
    const fields = ["login_email", "login_password"];

    for (field of fields) {
        const element = document.getElementById(field);
        details[field] = element.value;
        element.value = "";
    }

    return details;
}

function getDetails() {

    const details = new Object();
    const fields = ["first_name", "last_name", "email", "password"];

    for (field of fields) {
        const element = document.getElementById(field);
        details[field] = element.value;
        element.value = "";
    }

    return details;
}

function register() {

    const details = getDetails();
    getLogin();

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            vueinst.response = this.responseText;
            setTimeout(() => vueinst.response = "", 5000);
            if (!~this.responseText.indexOf("Email")) {
                document.getElementById("email").value = details.email;
            }
            document.getElementById("first_name").value = details.first_name;
            document.getElementById("last_name").value = details.last_name;
            document.getElementById("password").value = details.password;
        }
    };

    xhttp.open("POST", "/users/register", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(details));
}

function login() {

    const xhttp = new XMLHttpRequest();

    getDetails();
    const details = getLogin();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText) {
                vueinst.response = this.responseText;
                setTimeout(() => vueinst.response = "", 5000);
                document.getElementById("login_email").value = details.login_email;
            } else {
                redirectPage("home");
            }
        }
    };

    xhttp.open("POST", "/users/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(details));
}

function logout() {

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            vueinst.login = false;
            redirectPage("login");
        }
    };

    xhttp.open("POST", "/users/logout", true);
    xhttp.send();
}

function createRestaurant() {

    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            redirectPage("home");
        }
    };

    const details = getRestaurant();

    xhttp.open("POST", "/users/create", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(details));
}

function updateAccount() {

    const xhttp = new XMLHttpRequest();
    const details = getDetails();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            vueinst.response = this.responseText;
            setTimeout(() => vueinst.response = "", 5000);
            retrieveDetails();
        }
    };

    xhttp.open("POST", "/users/update", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(details));
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

<script src="https://apis.google.com/js/platform.js" async defer></script>
