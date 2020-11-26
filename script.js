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

import { availabilityFormValidation, personalDataFormValidation, paymentFormValidation } from "./modules/bookingSteps";

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
    // setUpBoat();
    document.querySelector(".step2").classList.add("show");
    document.querySelector(".step3").classList.add("show");
    document.querySelector(".step4").classList.add("show");
    document.querySelector(".step1").classList.remove("show");
    /* ------------ form & elements ----------- */
    const form1 = document.querySelector(".availability");
    window.form1 = form1;
    const elements1 = form1.elements;
    window.elements1 = elements1;
    /* --------- delete default validation ------- */
    form1.setAttribute("novalidate", true);
    /* ------------ custom validation ------------ */
    document.querySelector(".next").addEventListener("click", (e) => {
        e.preventDefault();
        // 1. select all inputs
        const formElements1 = form1.querySelectorAll("input, select");
        /* ------------ availability form ------------ */
        if (form1.checkValidity()) {
            // loop through form elements and check if are valid or not
            formElements1.forEach((el) => {
                if (el.checkValidity()) { 
                    el.classList.add("valid");
                }
                goToStepTwo();
            });
        } else {
            formElements1.forEach((el) => {
                if (!el.checkValidity()) {
                    el.classList.add("invalid");
                    availabilityFormValidation(elements1);
                    } else {
                        el.classList.remove("invalid");
                    }
                })
            }
    })  
}

function goToStepTwo() {
    // setUpBoat();
    document.querySelector(".step1").classList.add("show");
    document.querySelector(".step3").classList.add("show");
    document.querySelector(".step4").classList.add("show");
    document.querySelector(".step2").classList.remove("show");
    document.querySelector(".previous").addEventListener("click", function(){
        formValidation();
    })

    document.querySelector(".next").addEventListener("click", (e) => { 
        e.preventDefault();

    const form2 = document.querySelector(".personalData");
    window.form2 = form2;
    const elements2 = form2.elements;
    window.elements2 = elements2;
    const formElements2 = form2.querySelectorAll("input, select");
    /* ------------ personal data form ------------ */
    if (form2.checkValidity()) {
        formElements2.forEach((el) => {
            if (el.checkValidity()) { 
                el.classList.add("valid");
            }
            goToStepThree();
        });
    } else {
        formElements2.forEach((el) => {
            if (!el.checkValidity()) {
                el.classList.add("invalid");
                personalDataFormValidation(elements2);
            } else {
                el.classList.remove("invalid");
            }
        })
    }
})
}

function goToStepThree(){
    document.querySelector(".step1").classList.add("show");
    document.querySelector(".step2").classList.add("show");
    document.querySelector(".step4").classList.add("show");
    document.querySelector(".step3").classList.remove("show");
    document.querySelector(".previous").addEventListener("click", function(){
        goToStepTwo();
    })

    const form3 = document.querySelector(".orderOverview");
    window.form3 = form3;
    const elements3 = form3.elements;
    window.elements3 = elements3;

    document.querySelector(".next").addEventListener("click", (e) => {
        e.preventDefault(); 
        const formElements3 = form3.querySelectorAll("input, select");
        /* ------------ order overview ------------ */
        const step3Checkbox = document.querySelector("input[id='terms']");
        if (form3.checkValidity()) {
            formElements3.forEach((el) => {
                if (el.checkValidity() && step3Checkbox.checked == true) { 
                    el.classList.add("valid");
                    goToPayment();
                }
            });
        }
    })
}

function goToPayment(){
    document.querySelector(".step1").classList.add("show");
    document.querySelector(".step2").classList.add("show");
    document.querySelector(".step3").classList.add("show");
    document.querySelector(".step4").classList.remove("show");
    document.querySelector(".previous").addEventListener("click", function(){
        goToStepThree();
    })
    
    const form4 = document.querySelector(".payment");
    window.form4 = form4;
    const elements4 = form4.elements;
    window.elements4 = elements4;

    document.querySelector(".next").addEventListener("click", (e) => {
        e.preventDefault();
        const formElements4 = form4.querySelectorAll("input, select");
                /* ------------ payment form ------------ */
                if (form4.checkValidity()) {
                    // loop through form elements and check if are valid or not
                    formElements4.forEach((el) => {
                        if (el.checkValidity()) { 
                            el.classList.add("valid");
                            goToReceipt();
                        }
                    });
                } else {
                    formElements4.forEach((el) => {
                        if (!el.checkValidity()) {
                            el.classList.add("invalid");
                            paymentFormValidation(elements4);
                        } else {
                            el.classList.remove("invalid");
                        }
                    })
                 }
    })

}

function setUpBoat(){
    console.log(document.querySelectorAll(".overlay-content form"))
    const allForms = document.querySelectorAll(".overlay-content form");
    allForms.forEach((oneItem) => {
        if(!oneItem.classList.contains("show")){
            // console.log("this one has class")
            //here give a colour for the corresponding h6
            // document.querySelector(".bookingSteps h6:nth-of-type(3)").classList.remove("makeBold");
            // document.querySelector(".bookingSteps h6:nth-of-type(4)").classList.add("makeBold");

        }
    })
}

function goToReceipt(){
    document.querySelector(".step4").classList.add("show");
    document.querySelector(".step5").classList.remove("show");
    document.querySelector(".overlay-content .previous").classList.add("displayNone");
    document.querySelector(".overlay-content .next").classList.add("displayNone");
}

function showLandingPage(home) {
    // 1. template clone
    const introTemplate = document.querySelector(".introTemplate").content;
    const introCopy = introTemplate.cloneNode(true);
    // 2. text content
    /* ------------ hero image ----------- */
    introCopy.querySelector(".video-container").src = home[0].hero_video.guid;
    /* -------------- banner ------------- */
    introCopy.querySelector(".banner").src = home[0].banner.guid;
    /* ------------ intro text ----------- */
    introCopy.querySelector(".introTitle").textContent = home[0].introduction_title;
    introCopy.querySelector(".introText").textContent = home[0].social_sailing_in_copenhagen;

    buildCovidInfo(home[0].corona_text);
    // 3. append
    document.querySelector("#intro").appendChild(introCopy);
}

function buildCovidInfo(covid){
    document.querySelector(".coronaText").textContent = covid;
    document.querySelector("#corona").addEventListener("click", function(){
        const covidModal = document.querySelector("#corona-modal-background");
        covidModal.classList.add("showModal");
    });
    document.querySelector(".corona-modal-close").addEventListener("click", function(){
        const covidModal = document.querySelector("#corona-modal-background");
        covidModal.classList.remove("showModal");
    });
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
        //table
        tripCopy.querySelector("#bottle_of_wine .summer").textContent = oneTrip.bottle_of_wine.split(", ")[0];
        tripCopy.querySelector("#bottle_of_wine .winter").textContent = oneTrip.bottle_of_wine.split(", ")[1];

        tripCopy.querySelector("#glass_of_wine .summer").textContent = oneTrip.glass_of_wine.split(", ")[0];
        tripCopy.querySelector("#glass_of_wine .winter").textContent = oneTrip.glass_of_wine.split(", ")[1];

        tripCopy.querySelector("#beer .summer").textContent = oneTrip.beer.split(", ")[0];
        tripCopy.querySelector("#beer .winter").textContent = oneTrip.beer.split(", ")[1];

        //Icon
        const replacementItem = document.querySelectorAll("#summerWinter p");
        replacementItem.forEach((oneResult) => {
            if (oneResult.textContent === "no"){
                let addIcon = document.createElement("img");
                oneResult.textContent= "";
                addIcon.className = "iconSize";
                addIcon.src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/11/crossMark.png";
                oneResult.appendChild(addIcon)
            }
        })
        //price
        tripCopy.querySelector(".publicPrice").textContent = oneTrip.public_tour_price;
        tripCopy.querySelector(".privatePrice").textContent = oneTrip.private_tour_price;
        //modal content
        tripCopy.querySelector(".readMoreTrip").addEventListener("click", function(){
            const readMoreModal = document.querySelector("#trip-modal-background");
            readMoreModal.classList.add("showModal"); 
            readMoreModal.querySelector(".fullDescription").textContent = oneTrip.full_description;
        });
        tripCopy.querySelector(".trip-modal-close").addEventListener("click", function(){
            const readMoreModal = document.querySelector("#trip-modal-background");
            readMoreModal.classList.remove("showModal");
        });
        //3. append
        tripArea.appendChild(tripCopy);
    })
}

function showTours(tours) {
    // 1. template clone
    const tourTemplate = document.querySelector(".tourTemplate").content;
    const tourArea = document.querySelector("#tourArea");
    
    tours.forEach((oneTour) => {
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


