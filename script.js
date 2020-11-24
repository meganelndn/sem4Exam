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
    const elements = form1.elements;
    window.elements = elements;

    /* --------- delete default validation ------- */
    form1.setAttribute("novalidate", true);

    /* ------------ custom validation ------------ */
    document.querySelector(".next").addEventListener("click", (e) => {
        e.preventDefault();

        // 1. select all inputs
        const formElements = form1.querySelectorAll("input, select");

        if (form1.checkValidity()) {
            console.log("form is valid");
            
            // loop through form elements and check if are valid or not
            formElements.forEach((el) => {
                if (el.checkValidity()) { 
                    el.classList.add("valid");
                }

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

                    if (counter > 1) { // we don't want to remove the first step, it will always be shown
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
            });
        } else {
            formElements.forEach((el) => {
                
                if (!el.checkValidity()) {
                    console.log("form is invalid");

                    el.classList.add("invalid");

                    /* ------------ tour ------------ */
                    elements.tour.addEventListener("change", () => {                
                        if (elements.tour.value != "") {
                            elements.tour.classList.add("valid");
                            elements.tour.classList.remove("invalid");
                        } else {                
                            elements.tour.classList.remove("valid");
                            elements.tour.classList.add("invalid");
                        }
                    })
                    /* ------------ passengers ------------ */
                    elements.passengers.addEventListener("change", () => {                
                        if (elements.passengers.value != "") {
                            elements.passengers.classList.add("valid");
                            elements.passengers.classList.remove("invalid");
                        } else {                
                            elements.passengers.classList.remove("valid");
                            elements.passengers.classList.add("invalid");
                        }
                    })

                    } else {
                        el.classList.remove("invalid");
                    }
                })
            }
        })
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
    introCopy.querySelector(".introTitle").textContent = home[0].social_sailing_in_copenhagen;

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
    contactCopy.querySelector(".contactText").textContent = contact[2].openings;
    /* ---------- departures/arrivals ---------- */
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
