window.addEventListener("DOMContentLoaded", init);

function init() {
    fetchData();
    setUpBooking();
}

function fetchData(){
    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/contact_page/")
    .then(res => res.json())
    .then(showContact);

    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/landing_page/")
    .then(res => res.json())
    .then(showLandingPage);

    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/trips")
    .then(res => res.json())
    .then(showTrips);

    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/tours")
    .then(res => res.json())
    .then(showTours);

    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/gallery_page/")
    .then(res => res.json())
    .then(showGalleryPage);

    if (window.location.pathname.includes("faq")) {
        fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/faq/")
        .then(res => res.json())
        .then(showFAQPage);
    }
}

function setUpBooking(){
    /* ------------ set up book now window ----------- */
    document.getElementById("bookBtn").addEventListener("click", function(){
        let bookOverlay = document.getElementById("bookingOverlay");
        bookOverlay.classList.toggle("showOverlay");
    });  

    let tourInput = document.querySelector("select[name='tour']");
    tourInput.addEventListener("change", e => {
        if (e.target.value === "landmarks") {
            document.querySelector(".landmarks").classList.remove("show");
            document.querySelector(".hidden-gems").classList.add("show");
            document.querySelector(".diana").classList.add("show");
        } else if (e.target.value === "hidden-gems") {
            document.querySelector(".hidden-gems").classList.remove("show");
            document.querySelector(".landmarks").classList.add("show");
            document.querySelector(".diana").classList.add("diana");
        } else {
            document.querySelector(".diana").classList.remove("show");
            document.querySelector(".hidden-gems").classList.add("show");
            document.querySelector(".landmarks").classList.add("show");
        }
    })

    formValidation();
}

function formValidation() {
    /* ------------ form & elements ----------- */
    const form1 = document.querySelector(".availability");
    window.form1 = form1;
    const elements1 = form1.elements;
    window.elements1 = elements1;

    /* const form2 = document.querySelector(".personalData");
    window.form2 = form2;
    const elements2 = form2.elements;
    window.elements2 = elements2;

    const form4 = document.querySelector(".payment");
    window.form4 = form4;
    const elements4 = form4.elements;
    window.elements4 = elements4; */

    /* --------- delete default validation ------- */
    form1.setAttribute("novalidate", true);

    /* ------------ custom validation ------------ */
    document.querySelector(".next").addEventListener("click", (e) => {
        e.preventDefault();

        // 1. select all inputs
        const formElements1 = form1.querySelectorAll("input, select");
        /* const formElements2 = form2.querySelectorAll("input, select");
        const formElements4 = form4.querySelectorAll("input, select"); */

        /* ------------ availability form ------------ */
        if (form1.checkValidity()) {
            console.log("form is valid");
            
            // loop through form elements and check if are valid or not
            formElements1.forEach((el) => {
                if (el.checkValidity()) { 
                    el.classList.add("valid");
                }

                nextAndPrevious();
            });
        } else {
            formElements1.forEach((el) => {
                
                if (!el.checkValidity()) {
                    console.log("form is invalid");

                    el.classList.add("invalid");

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

                    } else {
                        el.classList.remove("invalid");
                    }
                })
            }

        /* ------------ personal data form ------------ */
        // if (form2.checkValidity()) {
        //     console.log("form is valid");
            
        //     // loop through form elements and check if are valid or not
        //     formElements2.forEach((el) => {
        //         if (el.checkValidity()) { 
        //             el.classList.add("valid");
        //         }

        //         /* nextAndPrevious(); */
        //     });
        // } else {
        //     formElements2.forEach((el) => {
                
        //         if (!el.checkValidity()) {
        //             console.log("form is invalid");

        //             el.classList.add("invalid");

        //             /* ------------ date ------------ */
        //             elements2.name.addEventListener("keyup", () => {                
        //                 if (elements2.name.value != "") {
        //                     elements2.name.classList.add("valid");
        //                     elements2.name.classList.remove("invalid");
        //                 } else {                
        //                     elements2.name.classList.remove("valid");
        //                     elements2.name.classList.add("invalid");
        //                 }
        //             })
        //             /* -------------- tour ------------ */
        //             elements2.email.addEventListener("keyup", () => {                
        //                 if (elements2.email.value != "") {
        //                     elements2.email.classList.add("valid");
        //                     elements2.email.classList.remove("invalid");
        //                 } else {                
        //                     elements2.email.classList.remove("valid");
        //                     elements2.email.classList.add("invalid");
        //                 }
        //             })
        //             /* ------------ passengers ------------ */
        //             elements2.phone.addEventListener("keyup", () => {                
        //                 if (elements2.phone.value != "") {
        //                     elements2.phone.classList.add("valid");
        //                     elements2.phone.classList.remove("invalid");
        //                 } else {                
        //                     elements2.phone.classList.remove("valid");
        //                     elements2.phone.classList.add("invalid");
        //                 }
        //             })
        //             /* ------------ date & time ------------ */
        //             elements2.accommodation.addEventListener("change", () => {                
        //                 if (elements2.accommodation.value != "") {
        //                     elements2.accommodation.classList.add("valid");
        //                     elements2.accommodation.classList.remove("invalid");
        //                 } else {                
        //                     elements2.accommodation.classList.remove("valid");
        //                     elements2.accommodation.classList.add("invalid");
        //                 }
        //             })
        //         } else {
        //             el.classList.remove("invalid");
        //         }
        //     })
        // }

        /* ------------ order overview ------------ */
        // if (form3.checkValidity()) {
        //     console.log("form is valid");

        //     // loop through form elements and check if are valid or not
        //     formElements3.forEach((el) => {
        //         if (el.checkValidity()) { 
        //             el.classList.add("valid");
        //         }

        //         /* nextAndPrevious(); */
        //     });
        // } else {
        //     formElements3.forEach((el) => {
                
        //         if (!el.checkValidity()) {
        //             console.log("form is invalid");

        //             el.classList.add("invalid");

        //             /* ------------ date ------------ */
        //             elements3.terms.addEventListener("change", () => {                
        //                 if (elements3.terms.value != "") {
        //                     elements3.terms.classList.add("valid");
        //                     elements3.terms.classList.remove("invalid");
        //                 } else {                
        //                     elements3.terms.classList.remove("valid");
        //                     elements3.terms.classList.add("invalid");
        //                 }
        //             })
        //         } else {
        //             el.classList.remove("invalid");
        //         }
        //     })
        // }

        /* ------------ payment form ------------ */
        // if (form4.checkValidity()) {
        //     console.log("form is valid");
            
        //     // loop through form elements and check if are valid or not
        //     formElements4.forEach((el) => {
        //         if (el.checkValidity()) { 
        //             el.classList.add("valid");
        //         }

        //        /*  nextAndPrevious(); */
        //     });
        // } else {
            
        //     formElements4.forEach((el) => {
                
        //         if (!el.checkValidity()) {
        //             console.log("form is invalid");

        //             el.classList.add("invalid");

        //             /* ------------ date ------------ */
        //             elements4.cardNumber.addEventListener("keyup", () => {                
        //                 if (elements4.cardNumber.value != "") {
        //                     elements4.cardNumber.classList.add("valid");
        //                     elements4.cardNumber.classList.remove("invalid");
        //                 } else {                
        //                     elements4.cardNumber.classList.remove("valid");
        //                     elements4.cardNumber.classList.add("invalid");
        //                 }
        //             })
        //             /* -------------- tour ------------ */
        //             elements4.cardName.addEventListener("keyup", () => {                
        //                 if (elements4.cardName.value != "") {
        //                     elements4.cardName.classList.add("valid");
        //                     elements4.cardName.classList.remove("invalid");
        //                 } else {                
        //                     elements4.cardName.classList.remove("valid");
        //                     elements4.cardName.classList.add("invalid");
        //                 }
        //             })
        //             /* ------------ passengers ------------ */
        //             elements4.expiryDate.addEventListener("keyup", () => {                
        //                 if (elements4.expiryDate.value != "") {
        //                     elements4.expiryDate.classList.add("valid");
        //                     elements4.expiryDate.classList.remove("invalid");
        //                 } else {                
        //                     elements4.expiryDate.classList.remove("valid");
        //                     elements4.expiryDate.classList.add("invalid");
        //                 }
        //             })
        //             /* ------------ date & time ------------ */
        //             elements4.ccv.addEventListener("keyup", () => {                
        //                 if (elements4.ccv.value != "") {
        //                     elements4.ccv.classList.add("valid");
        //                     elements4.ccv.classList.remove("invalid");
        //                 } else {                
        //                     elements4.ccv.classList.remove("valid");
        //                     elements4.ccv.classList.add("invalid");
        //                 }
        //             })
        //         } else {
        //             el.classList.remove("invalid");
        //         }
        //     })
        //  }
    })  
}

function nextAndPrevious() {
    // enable "next" btn when form is valid
    var counter = 1, step = "step";
    step = ".step" + counter;
    
    if (counter <= 5) {
        document.querySelector(step).classList.add("show");
    }
    
    counter++;
    if (counter > 5) {
        counter = 5;
    }
    
    step = ".step" + counter; // step is the class and we are appending counter with step so that it looks like the same class in the given class(like counter 1 means step1)

    document.querySelector(step).classList.remove("show");

    // enable "previous" btn when form is valid
    document.querySelector(".previous").addEventListener('click', function () {

    if (counter > 1) {
        step = ".step" + counter;
                
        document.querySelector(step).classList.add("show");
    }
    
    counter--;
                    
    if (counter < 1) {
        counter = 1;
    }
    
    step = ".step" + counter;
                
    document.querySelector(step).classList.remove("show");
    });
}

function showLandingPage(home) {
    // 1. template clone
    const introTemplate = document.querySelector(".introTemplate").content;
    const introCopy = introTemplate.cloneNode(true);

    // 2. text content
    /* ------------ hero image ----------- */
    introCopy.querySelector(".heroImg").src = home[0].hero_video.guid;
    /* -------------- banner ------------- */
    introCopy.querySelector(".banner").src = home[0].banner.guid;
    /* ------------ intro text ----------- */
    introCopy.querySelector(".introTitle").textContent = home[0].introduction_title;
    introCopy.querySelector(".introText").textContent = home[0].social_sailing_in_copenhagen;

    // 3. append
    document.querySelector("#intro").appendChild(introCopy);
}

function showTrips(trips) {
    // 1. template clone
    const tripTemplate = document.querySelector(".tripTemplate").content;
    const tripArea = document.querySelector("#tripArea");
    
    trips.forEach((oneTrip) => {
        const tripCopy = tripTemplate.cloneNode(true);

        tripCopy.querySelector(".tripTitle").textContent = oneTrip.title.rendered;
        tripCopy.querySelector(".tripImg").src = oneTrip.trip_image.guid;
        tripCopy.querySelector(".duration").textContent = oneTrip.duration;
        tripCopy.querySelector(".tripText").textContent = oneTrip.description;
        //3. append
        tripArea.appendChild(tripCopy);
    })
}

function showTours(tours) {
    // 1. template clone
    const tourTemplate = document.querySelector(".tourTemplate").content;
    const tourArea = document.querySelector("#tourArea");
    
    tours.forEach((oneTour) => {
        console.log("one tour:", oneTour)
        const tourCopy = tourTemplate.cloneNode(true);

        tourCopy.querySelector(".tourImg").src = oneTour.tour_image.guid;
        tourCopy.querySelector(".tourTitle").textContent = oneTour.title.rendered;
        tourCopy.querySelector(".tourText").textContent = oneTour.description;

        tourArea.appendChild(tourCopy);
    })
}

function showGalleryPage(gallery) {
    // 1. template clone
    const galleryTemplate = document.querySelector(".galleryTemplate").content;
    const galleryArea = document.querySelector("#galleryArea");
    
    gallery.forEach((oneImg) => {
        const galleryCopy = galleryTemplate.cloneNode(true);
        galleryCopy.querySelector(".galleryImg").src = oneImg.boat_image.guid;
        galleryArea.appendChild(galleryCopy);
    })
}

function showFAQPage(faq) {
    // 1. template clone
    const faqTemplate = document.querySelector(".faqTemplate").content;
    const faqArea = document.querySelector("#faqList");
    
    // 2. text content => loop through array
    faq.forEach((oneFAQ) => {
        const cloneFAQ = faqTemplate.cloneNode(true);

        cloneFAQ.querySelector(".faqQuestion").textContent = oneFAQ.question;
        cloneFAQ.querySelector(".faqAnswer").textContent = oneFAQ.answer;

        //3. append
        faqArea.appendChild(cloneFAQ);

    })
    accordion();
    expandOptions();
}

function accordion(){
    let accordion = document.querySelectorAll(".faqQuestion");
    let counter;
    for (counter = 0; counter < accordion.length; counter++) {
        accordion[counter].addEventListener("click", function() {
        this.classList.toggle("accordionActive");
        let getAnswer = this.nextElementSibling;
            if (getAnswer.style.display === "block") {
            getAnswer.style.display = "none";
            } else {
            getAnswer.style.display = "block";
            }
        });
    }
}

function expandOptions(){
document.querySelector("#expandFaq").addEventListener("click", function() {
let getAnswer = document.querySelectorAll(".faqAnswer");
    getAnswer.forEach((oneAnswer) => {
        if (oneAnswer.style.display === "block") {
        oneAnswer.style.display = "none";
        } else {
        oneAnswer.style.display = "block";
        }
    })
});
}

function showContact(contact) {
    // 1. template clone
    const templateC = document.querySelector(".contactTemplate").content;
    const contactCopy = templateC.cloneNode(true);
    // 2. text content
    /* ------------ season openings ----------- */
    contactCopy.querySelector(".contactTitle").textContent = contact[2].title.rendered;
    contactCopy.querySelector(".contactText").textContent = contact[2].openings;
    /* ---------- departures/arrivals ---------- */
    contactCopy.querySelector(".contactTitle2").textContent = contact[1].title.rendered; 
    contactCopy.querySelector(".contactText2").textContent = contact[1].location; 
    /* -------------- contact us --------------- */
    contactCopy.querySelector(".contactTitle3").textContent = contact[3].title.rendered;
    contactCopy.querySelector(".contactLink1").textContent = `E-mail: info@heycaptain.dk`; 
    contactCopy.querySelector(".contactLink2").textContent = `Phone: ${contact[3].contact_phone}`; 
    /* --------------- follow us --------------- */
    contactCopy.querySelector(".contactTitle4").textContent = contact[0].title.rendered;
    // 3. append
    document.querySelector("#bottomNavigation").appendChild(contactCopy);
}
