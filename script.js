window.addEventListener("DOMContentLoaded", init);

import { gsap } from "gsap";

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

    fetch("http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/faq/")
    .then(res => res.json())
    .then(showFAQPage);
}

function setUpBooking(){
    // set up book now window
    document.getElementById("bookBtn").addEventListener("click", function(){
        let bookOverlay = document.getElementById("bookingOverlay");
        bookOverlay.classList.toggle("showOverlay");
    });  
}

function showLandingPage(home) {
    console.log(home)
    // 1. template clone
    const introTemplate = document.querySelector(".introTemplate").content;
    const introCopy = introTemplate.cloneNode(true);

    // 2. text content
    // HERO IMAGE
    const heroImg = introCopy.querySelector(".heroImg");
    heroImg.src = home[0].hero_video.guid;
    // BANNER
    const banner = introCopy.querySelector(".banner");
    banner.src = home[0].banner.guid;
    // INTRO TEXT
    const title = introCopy.querySelector(".introTitle");
    title.textContent = home[0].social_sailing_in_copenhagen;

    // 3. append
    document.querySelector("#intro").appendChild(introCopy);
}

function showTrips(trips) {
    console.log(trips)
    // 1. template clone
    const tripTemplate = document.querySelector(".tripTemplate").content;
    const tripCopy = tripTemplate.cloneNode(true);

    // 2. text content
    // THE LANDMARKS
    const tripT = tripCopy.querySelector(".tripTitle1");
    tripT.textContent = trips[2].title.rendered;
    const dur = tripCopy.querySelector(".duration1");
    dur.textContent = trips[2].duration;
    const tripImg = tripCopy.querySelector(".tripImg1");
    tripImg.src = trips[2].trip_image.guid;
    const tripDesc = tripCopy.querySelector(".tripText1");
    tripDesc.textContent = trips[2].description;
    // HIDDEN GEMS
    const tripT2 = tripCopy.querySelector(".tripTitle2");
    tripT2.textContent = trips[1].title.rendered;
    const dur2 = tripCopy.querySelector(".duration2");
    dur2.textContent = trips[1].duration;
    const tripImg2 = tripCopy.querySelector(".tripImg2");
    tripImg2.src = trips[1].trip_image.guid;
    const tripDesc2 = tripCopy.querySelector(".tripText2");
    tripDesc2.textContent = trips[1].description;
    // THE DIANA
    const tripT3 = tripCopy.querySelector(".tripTitle3");
    tripT3.textContent = trips[0].title.rendered;
    const dur3 = tripCopy.querySelector(".duration3");
    dur3.textContent = trips[0].duration;
    const tripImg3 = tripCopy.querySelector(".tripImg3");
    tripImg3.src = trips[0].trip_image.guid;
    const tripDesc3 = tripCopy.querySelector(".tripText3");
    tripDesc3.textContent = trips[0].description;

    // 3. append
    document.querySelector("#trips").appendChild(tripCopy);
}

function showTours(tours) {
    console.log(tours)
    // 1. template clone
    const tourTemplate = document.querySelector(".tourTemplate").content;
    const tourCopy = tourTemplate.cloneNode(true);

    // 2. text content
    // PUBLIC TOUR
    const tourImg = tourCopy.querySelector(".tourImg1");
    tourImg.src = tours[1].tour_image.guid;
    const tourT = tourCopy.querySelector(".tourTitle1");
    tourT.textContent = tours[1].title.rendered;
    const tourDesc = tourCopy.querySelector(".tourText1");
    tourDesc.textContent = tours[1].description;
    // PRIVATE TOUR
    const tourImg2 = tourCopy.querySelector(".tourImg2");
    tourImg2.src = tours[0].tour_image.guid;
    const tourT2 = tourCopy.querySelector(".tourTitle2");
    tourT2.textContent = tours[0].title.rendered;
    const tourDesc2 = tourCopy.querySelector(".tourText2");
    tourDesc2.textContent = tours[0].description;

    // 3. append
    document.querySelector("#tours").appendChild(tourCopy);
}

function showGalleryPage(gallery) {
    console.log(gallery)
    // 1. template clone
    const galleryTemplate = document.querySelector(".galleryTemplate").content;
    const galleryCopy = galleryTemplate.cloneNode(true);

    // 2. text content
    const galleryImg = galleryCopy.querySelector(".galleryImg1");
    galleryImg.src = gallery[0].boat_image.guid;
    const galleryImg2 = galleryCopy.querySelector(".galleryImg2");
    galleryImg2.src = gallery[1].boat_image.guid;
    const galleryImg3 = galleryCopy.querySelector(".galleryImg3");
    galleryImg3.src = gallery[2].boat_image.guid;

    // 3. append
    document.querySelector("#gallery").appendChild(galleryCopy);
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
    //console.log(contact)
    // 1. template clone
    const templateC = document.querySelector(".contactTemplate").content;
    const contactCopy = templateC.cloneNode(true);

    // 2. text content
    // SEASON OPENINGS
    const descC = contactCopy.querySelector(".contactText");
    descC.textContent = contact[2].openings;
    // DEPARTURES/ARRIVALS
    const descC2 = contactCopy.querySelector(".contactText2");
    descC2.textContent = contact[1].location; 
    // CONTACT US
    const contactTitle3 = contactCopy.querySelector(".contactTitle3");
    contactTitle3.textContent = contact[3].title.rendered;
    const mail = contactCopy.querySelector(".contactLink1");
    mail.textContent = `E-mail: info@heycaptain.dk`; 
    const phone = contactCopy.querySelector(".contactLink2");
    phone.textContent = `Phone: ${contact[3].contact_phone}`; 
    // FOLLOW US
    const contactTitle4 = contactCopy.querySelector(".contactTitle4");
    contactTitle4.textContent = contact[0].title.rendered;

    // 3. append
    document.querySelector("#bottomNavigation").appendChild(contactCopy);
}
