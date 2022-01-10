$(document).ready(function () {
    $(".header__burger").click(function (event) {
        $(".header__burger,.header__navigation").toggleClass("active");
        $("body").toggleClass("lock");
    });
});

/* form */
//declaration
const form = document.querySelector("form");
const formBlock = document.querySelector(".footer__item");
const prevModalDialog = document.querySelector(".footer__item");

//used to stand for progress status
const message = {
    loading: "loading..",
    success: "success, we will contact you shortly!",
    failure: `something is wrong, your request has not been processed, try later..`,
};

function showBlock(block) {
    block.classList.remove("hide");
    block.classList.add("show", "fade");
}

function hideBlock(block) {
    block.classList.remove("show", "fade");
    block.classList.add("hide");
}

//responsible to the sending data from form to the server
function postData(form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        hideBlock(prevModalDialog);

        //message block
        const statusMessage = document.createElement("div");
        statusMessage.textContent = message.loading;
        statusMessage.classList.add("form-feedback-modal");
        form.append(statusMessage);
        showBlock(statusMessage);

        const request = new XMLHttpRequest();
        const formData = new FormData(form);

        request.open("POST", "server.php");
        request.setRequestHeader("Content-type", "application/json");

        const object = {};

        formData.forEach((value, key) => {
            object[key] = value;
        });

        const json = JSON.stringify(object);

        request.send(json);

        request.addEventListener("load", () => {
            if (request.status === 200) {
                console.log(request.response);
                statusMessage.textContent = message.success;
                form.reset();

                setTimeout(() => {
                    statusMessage.remove();
                    showBlock(prevModalDialog);
                }, 3000);
            } else {
                statusMessage.textContent = message.failure;

                setTimeout(() => {
                    form.reset();
                    statusMessage.remove();
                    showBlock(prevModalDialog);
                }, 6000);
            }
        });
    });
}

//execution
postData(form);
