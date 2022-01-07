$(document).ready(function () {
    $(".header__burger").click(function (event) {
        $(".header__burger,.header__navigation").toggleClass("active");
        $("body").toggleClass("lock");
    });
});

/* forms */
//declaration
const forms = document.querySelectorAll("form");

//responsible to the sending data from form to the server
function postData(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const request = new XMLHttpRequest();
        const formData = new FormData(form);

        request.open("POST", "server.php");
        request.send(formData);

        request.addEventListener("load", () => {
            if (request.status === 200) {
                console.log(request.response);
            } else {
                console.log("error: something is wrong..");
            }
        });
    });
}

//execution
forms.forEach((item) => {
    postData(item);
});
