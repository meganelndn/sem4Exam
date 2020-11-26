export function availabilityFormValidation(elements1) {
    /* ------------ date ------------ */
    elements1.date.addEventListener("change", () => {                
        if (elements1.date.value != "") {
            elements1.date.classList.add("valid");
            elements1.date.classList.remove("invalid");
        } else {                
            elements1.date.classList.remove("valid");
            elements1.date.classList.add("invalid");
        }
    })
    /* -------------- tour ------------ */
    elements1.tour.addEventListener("change", () => {                
        if (elements1.tour.value != "") {
            elements1.tour.classList.add("valid");
            elements1.tour.classList.remove("invalid");
        } else {                
            elements1.tour.classList.remove("valid");
            elements1.tour.classList.add("invalid");
        }
    })
    /* ------------ passengers ------------ */
    elements1.passengers.addEventListener("change", () => {                
        if (elements1.passengers.value != "") {
            elements1.passengers.classList.add("valid");
            elements1.passengers.classList.remove("invalid");
        } else {                
            elements1.passengers.classList.remove("valid");
            elements1.passengers.classList.add("invalid");
        }
    })
    /* ------------ date & time ------------ */
    elements1.time.addEventListener("change", () => {                
        if (elements1.time.value != "") {
            elements1.time.classList.add("valid");
            elements1.time.classList.remove("invalid");
        } else {                
            elements1.time.classList.remove("valid");
            elements1.time.classList.add("invalid");
        }
    })

}


export function personalDataFormValidation(elements2) {
    /* ------------ date ------------ */
    elements2.name.addEventListener("keyup", () => {                
        if (elements2.name.value != "") {
            elements2.name.classList.add("valid");
            elements2.name.classList.remove("invalid");
        } else {                
            elements2.name.classList.remove("valid");
            elements2.name.classList.add("invalid");
        }
    })
    /* -------------- tour ------------ */
    elements2.email.addEventListener("keyup", () => {                
        if (elements2.email.value != "") {
            elements2.email.classList.add("valid");
            elements2.email.classList.remove("invalid");
        } else {                
            elements2.email.classList.remove("valid");
            elements2.email.classList.add("invalid");
        }
    })
    /* ------------ passengers ------------ */
    elements2.phone.addEventListener("keyup", () => {                
        if (elements2.phone.value != "") {
            elements2.phone.classList.add("valid");
            elements2.phone.classList.remove("invalid");
        } else {                
            elements2.phone.classList.remove("valid");
            elements2.phone.classList.add("invalid");
        }
    })
    /* ------------ date & time ------------ */
    elements2.accommodation.addEventListener("change", () => {                
        if (elements2.accommodation.value != "") {
            elements2.accommodation.classList.add("valid");
            elements2.accommodation.classList.remove("invalid");
        } else {                
            elements2.accommodation.classList.remove("valid");
            elements2.accommodation.classList.add("invalid");
        }
    })
}


export function paymentFormValidation(elements4) {
    /* ----------------- BILLING INFO ---------------- */
        /* ------------ payment name ------------ */
        elements4.paymentName.addEventListener("keyup", () => {                
            if (elements4.paymentName.value != "") {
                elements4.paymentName.classList.add("valid");
                elements4.paymentName.classList.remove("invalid");
            } else {                
                elements4.paymentName.classList.remove("valid");
                elements4.paymentName.classList.add("invalid");
            }
        })
        /* -------------- address ------------ */
        elements4.address.addEventListener("keyup", () => {                
            if (elements4.address.value != "") {
                elements4.address.classList.add("valid");
                elements4.address.classList.remove("invalid");
            } else {                
                elements4.address.classList.remove("valid");
                elements4.address.classList.add("invalid");
            }
        })
        /* ---------------- city ------------- */
        elements4.city.addEventListener("keyup", () => {                
            if (elements4.city.value != "") {
                elements4.city.classList.add("valid");
                elements4.city.classList.remove("invalid");
            } else {                
                elements4.city.classList.remove("valid");
                elements4.city.classList.add("invalid");
            }
        })
        /* --------------- zip code --------------- */
        elements4.zip.addEventListener("keyup", () => {                
            if (elements4.zip.value != "") {
                elements4.zip.classList.add("valid");
                elements4.zip.classList.remove("invalid");
            } else {                
                elements4.zip.classList.remove("valid");
                elements4.zip.classList.add("invalid");
            }
        })
        /* --------------- country --------------- */
        elements4.country.addEventListener("keyup", () => {                
            if (elements4.country.value != "") {
                elements4.country.classList.add("valid");
                elements4.country.classList.remove("invalid");
            } else {                
                elements4.country.classList.remove("valid");
                elements4.country.classList.add("invalid");
            }
        })
    
        /* ---------------- CREDIT CARD INFO -------------- */
        /* ------------ card number ------------ */
        elements4.cardNumber.addEventListener("keyup", () => {                
            if (elements4.cardNumber.value != "") {
                elements4.cardNumber.classList.add("valid");
                elements4.cardNumber.classList.remove("invalid");
            } else {                
                elements4.cardNumber.classList.remove("valid");
                elements4.cardNumber.classList.add("invalid");
            }
        })
        /* -------------- card name ------------ */
        elements4.cardName.addEventListener("keyup", () => {                
            if (elements4.cardName.value != "") {
                elements4.cardName.classList.add("valid");
                elements4.cardName.classList.remove("invalid");
            } else {                
                elements4.cardName.classList.remove("valid");
                elements4.cardName.classList.add("invalid");
            }
        })
        /* ------------ expiry date ------------ */
        elements4.expiryDate.addEventListener("keyup", () => {                
            if (elements4.expiryDate.value != "") {
                elements4.expiryDate.classList.add("valid");
                elements4.expiryDate.classList.remove("invalid");
            } else {                
                elements4.expiryDate.classList.remove("valid");
                elements4.expiryDate.classList.add("invalid");
            }
        })
        /* --------------- CVC --------------- */
        elements4.ccv.addEventListener("keyup", () => {                
            if (elements4.ccv.value != "") {
                elements4.ccv.classList.add("valid");
                elements4.ccv.classList.remove("invalid");
            } else {                
                elements4.ccv.classList.remove("valid");
                elements4.ccv.classList.add("invalid");
            }
        })
    }

    // function nextAndPrevious() {
    //     // enable "next" btn when form is valid
    //     var counter = 1, step = "step";
    //     step = ".step" + counter;
        
    //     if (counter <= 5) {
    //         document.querySelector(step).classList.add("show");
    //     }
    //     console.log("the counter", counter)
    //     counter++;
    //     if (counter > 5) {
    //         counter = 5;
    //     }
    //     console.log("the counter again", counter)
    //     step = ".step" + counter; // step is the class and we are appending counter with step so that it looks like the same class in the given class(like counter 1 means step1)
    
    //     document.querySelector(step).classList.remove("show");
    
    //     // enable "previous" btn when form is valid
    //     document.querySelector(".previous").addEventListener('click', function () {
    
    //     if (counter > 1) {
    //         step = ".step" + counter;
                    
    //         document.querySelector(step).classList.add("show");
    //     }
    //     console.log("the counter again again", counter)
    //     counter--;
                        
    //     if (counter < 1) {
    //         counter = 1;
    //     }
        
    //     step = ".step" + counter;
                    
    //     document.querySelector(step).classList.remove("show");
    //     });
    // }