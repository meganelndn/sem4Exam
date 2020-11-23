window.addEventListener("DOMContentLoaded", init);

/* import { gsap } from "gsap"; */

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
    // set up book now window
    document.getElementById("bookBtn").addEventListener("click", function(){
        let bookOverlay = document.getElementById("bookingOverlay");
        bookOverlay.classList.toggle("showOverlay");

        /* document.querySelector(".availability").classList.remove("step1"); */
    });  

    // enable buttons
    var counter = 1, step = "step";

    document.querySelector(".next").addEventListener('click', function () {
        counter++;
        if (counter > 5) {
        counter = 5;
        }

        step = ".step" + counter; 

        document.querySelector(step).classList.remove("show");
    });

    document.querySelector(".previous").addEventListener('click', function () {
        if (counter > 1) {
            
        step = ".step" + counter;

        document.querySelector(step).classList.add("show");
    }

    counter--;
    if (counter < 1) {
        counter = 1;
    }
});

    // activate "previous" btn
    /* var counter = 0; 
    
    document.querySelector(".previous").addEventListener('click', function() {
        switch(++counter) {
            case 1: 
                return +counter;
            case 2: 
            document.querySelector(".availability").classList.remove("step1");
                document.querySelector(".personalData").classList.add("step2");
                console.log("2");
                return +counter;
            case 3:
                document.querySelector(".personalData").classList.remove("step2");
                document.querySelector(".orderOverview").classList.add("step3");
                console.log("3");
                return +counter;
            case 4:
                document.querySelector(".orderOverview").classList.remove("step3");
                document.querySelector(".payment").classList.add("step4");
                console.log("4");
                return +counter;
            case 5:
                document.querySelector(".payment").classList.remove("step4");
                document.querySelector(".receipt").classList.add("step5");
                console.log("5");
                return +counter;
        } 
        counter = 0; 
    }); */

    // activate "next" btn
    /* var counter = 0; 

    document.querySelector(".next").addEventListener('click', function() {

        document.querySelector(".previous").classList.remove("hide");

        switch(++counter) {
            case 1: 
                document.querySelector(".availability").classList.add("step1");
                document.querySelector(".personalData").classList.remove("step2");
                return +counter;
            case 2: 
                document.querySelector(".personalData").classList.add("step2");
                document.querySelector(".orderOverview").classList.remove("step3");
                return +counter;
            case 3:
                document.querySelector(".orderOverview").classList.add("step3");
                document.querySelector(".payment").classList.remove("step4");
                return +counter;
            case 4:
                document.querySelector(".payment").classList.add("step4");
                document.querySelector(".receipt").classList.remove("step5");
                return +counter;
        }
        counter = 0; 
    }); */
}

function showLandingPage(home) {
    // 1. template clone
    const introTemplate = document.querySelector(".introTemplate").content;
    const introCopy = introTemplate.cloneNode(true);

    // 2. text content
    // HERO IMAGE
    introCopy.querySelector(".heroImg").src = home[0].hero_video.guid;
    // BANNER
    introCopy.querySelector(".banner").src = home[0].banner.guid;
    // INTRO TEXT
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
    // SEASON OPENINGS
    contactCopy.querySelector(".contactText").textContent = contact[2].openings;
    // DEPARTURES/ARRIVALS
    contactCopy.querySelector(".contactText2").textContent = contact[1].location; 
    // CONTACT US
    contactCopy.querySelector(".contactTitle3").textContent = contact[3].title.rendered;
    contactCopy.querySelector(".contactLink1").textContent = `E-mail: info@heycaptain.dk`; 
    contactCopy.querySelector(".contactLink2").textContent = `Phone: ${contact[3].contact_phone}`; 
    // FOLLOW US
    contactCopy.querySelector(".contactTitle4").textContent = contact[0].title.rendered;
    // 3. append
    document.querySelector("#bottomNavigation").appendChild(contactCopy);
}
