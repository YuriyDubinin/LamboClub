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

        const formData = new FormData(form);

        const object = {};

        //converting FormData to JSON
        formData.forEach((value, key) => {
            object[key] = value;
        });

        fetch("http://localhost:3000/requests", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(object),
        })
            .then((data) => data.text())
            .then((data) => {
                console.log(data);
                statusMessage.textContent = message.success;

                setTimeout(() => {
                    statusMessage.remove();
                    showBlock(prevModalDialog);
                }, 3000);
            })
            .catch(() => {
                statusMessage.textContent = message.failure;

                setTimeout(() => {
                    statusMessage.remove();
                    showBlock(prevModalDialog);
                }, 6000);
            })
            .finally(() => {
                form.reset();
            });
    });
}

//execution
postData(form);
