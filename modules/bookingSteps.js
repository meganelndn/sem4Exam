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
                // invalidFormError(el);
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
    // console.log(el)

    // el.addEventListener("change", () => {  
    if (el.classList.contains("invalid")){
        // el.classList.add("valid");
        // console.log("is invalid!")
        // el.classList.remove("invalid");
        el.nextElementSibling.classList.add("displayError");
    } else {
        // el.classList.remove("valid");
        // el.classList.add("invalid");
        el.nextElementSibling.classList.remove("displayError");
        // console.log("is valid!")
    }
//  })
}
