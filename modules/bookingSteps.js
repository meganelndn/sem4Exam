export function checkValidation(form, formElements, nextStep) {

    if (form.checkValidity()) {
        formElements.forEach((el) => {
        // loop through form elements and check if are valid or not
            if (el.checkValidity()) { 
                el.classList.add("valid");
            }
        });
        nextStep();
    } else {
        formElements.forEach((el) => {
            if (!el.checkValidity()) {
                el.classList.add("invalid");
                // personalDataFormValidation(elements1);
                invalidFormError(el);
                el.addEventListener("change", function(){
                    el.classList.remove("invalid");
                    invalidFormError(el);

                });
            } else {
                    el.classList.remove("invalid");
            }
        })
    }
}

// export function addClassToAll() {
//     let allForms = document.querySelectorAll('form');
//     for (let i = 0; i < allForms.length; i++) {
//     allForms[i].classList.add('show');
//     }
// }

export function closeForm() {
    document.querySelector(".payment-modal-close").addEventListener("click", function(){
        const paymentModal = document.querySelector("#payment-modal-background");
        paymentModal.classList.remove("showModal");
    });
}

export function invalidFormError(el) {
    if (el.parentNode.nextElementSibling == null) {
    } else if (el.classList.contains("invalid")) {
        el.parentNode.nextElementSibling.classList.add("displayError");
    } else {
        el.parentNode.nextElementSibling.classList.remove("displayError");
    }
}

//--------------------------------- post -----------------------------------------//

export function postSubscription(formInfo) {
    const postData = JSON.stringify(formInfo);
    fetch("https://frontend2020-db3c.restdb.io/rest/hey-captain", {
            method: "post",
            body: JSON.stringify(formInfo),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-apikey": "5e95774d436377171a0c233c",
                "cache-control": "no-cache",
            },
            body: postData,
        })
        .then((res) => res.json())
        // .then((data) => {location.replace("asset.html")});
        .then(console.log("it posted"));
}
