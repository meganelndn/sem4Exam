window.addEventListener("DOMContentLoaded", init);
import 'regenerator-runtime/runtime'

function init() {
   
    // weatherApp();

    if (window.location.pathname.includes("index")) {
    const urlHome = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/landing_page/";
    fetchData(urlHome, showLandingPage);

    const urlTours = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/tours";
    fetchData(urlTours, showTours);

    const urlTrips = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/trips";
    fetchData(urlTrips, showTrips);

    // const urlGallery = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/gallery_page/";
    // fetchData(urlGallery, showGalleryPage);

    const weatherUrl = "http://api.weatherstack.com/forecast?access_key=bdb591c14b9e4a079623b1a838313888&query=Copenhagen";
    fetchData(weatherUrl, weatherApp)

    const urlContact = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/contact_page/";
    fetchData(urlContact, showContact);
    
    setUpNewsletter();
    setUpBooking();
    setScrollPosition();
    
    } else if (window.location.pathname.includes("faq")) {
    
        const urlFaq = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/faq/";
        fetchData(urlFaq, showFAQPage);
    }

    setUpScrollEffect();
}


/* https://www.dev-tips-and-tricks.com/animate-elements-scrolled-view-vanilla-js */
function setUpScrollEffect(){
    let elements;
    let windowHeight;
  
    elements = document.querySelectorAll('.hidden');
    function start() {
      windowHeight = window.innerHeight;
    //   _addEventHandlers();
    }
    
    function checkPosition() {
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let positionFromTop = elements[i].getBoundingClientRect().top;
            
            if (positionFromTop - windowHeight <= 0) {
                element.classList.add('fade-in-element');
                element.classList.remove('hidden');
            }
        }
    }
    checkPosition();
    start();
  
    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', start);
}

import { checkValidation, closeForm, postSubscription } from "./modules/bookingSteps";
import { fetchData } from "./modules/shared";

import { carouselEffect } from "./modules/imageCarousel";

let completedForm;

function smoothScroll() {
    document.querySelector(".bookBtn").addEventListener("click", e => {
        document.querySelector('#intro').scrollIntoView({ 
            behavior: 'smooth' 
        });
    })
}

function setUpNewsletter() {
    const newsForm = document.querySelector(".newsletterForm");
    newsForm.setAttribute("novalidate", true);
    const newsEl = newsForm.elements;
    const newsFormEl = newsForm.querySelectorAll("input"); 

    document.querySelector("#newsletterBtn").addEventListener("click", function(){
        let newsletterOverlay = document.getElementById("newsletterOverlay");
        newsletterOverlay.classList.toggle("showOverlay");
        newsletterOverlay.classList.toggle("newsletterAnimation");

        document.querySelector(".overlay-content").classList.remove("hideOverlay");

        document.querySelector(".newsletterSubscription").addEventListener("click", function(e){
            e.preventDefault();
            checkValidation(newsForm, newsFormEl, sendNewsletter); 
        })
    });
}

function sendNewsletter(){
    document.querySelector(".overlay-content2").classList.remove("show");
    document.querySelector(".overlay-content").classList.add("hideOverlay");
    document.querySelector("#newsletterBtn").addEventListener("click", function(){
        document.querySelector(".showOverlay").classList.add("newsletterAnimation");
        location.reload(); 
    })
}

function setUpBooking(){
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
    smoothScroll();
}

function setScrollPosition() {
    window.onscroll = function() {myFunction()};

    let header = document.querySelector(".availability");
    // let sticky = header.offsetTop - 600;
    
    let book = document.querySelector("#navBar .bookBtn");
    let sticky = header.offsetTop;
    let navBar = document.querySelector("#navBar");

    function myFunction() {
      if (window.pageYOffset > sticky) {
        // book.classList.add("sticky");
        navBar.classList.add("changeMenu");
        book.classList.add("addStyle");
      } else {
        // book.classList.remove("sticky");
        navBar.classList.remove("changeMenu")
        book.classList.remove("addStyle");
      }
    }
}

function formValidation() {
    const form1 = document.querySelector(".availability");
    const elements1 = form1.elements;
    //form1.setAttribute("novalidate", true);
    const formElements1 = form1.querySelectorAll("input, select");

    formElements1.forEach((e) => {
        e.addEventListener("change", (e) => {
            let objectReview = {
            tour: form1.querySelector("select[id=tour").value,
            passengers: form1.querySelector("select[id=passengers").value,
            time: form1.querySelector("input[id=time").value,
            name: form1.querySelector("input[id=name").value,
            email: form1.querySelector("input[id=email").value,
            phone: form1.querySelector("input[id=phone").value,
            code: form1.querySelector("input[id=campaign-code").value,
            };
            console.log(objectReview)
            completedForm = objectReview;
        }) 
    })
    document.querySelector(".toPayment").addEventListener("click", (e) => {
        e.preventDefault();
        checkValidation(form1, formElements1, goToPayment);
    })  
}

function goToPayment() {
    closeForm();
    const paymentModal = document.querySelector("#payment-modal-background");
    paymentModal.classList.add("showModal");
    document.querySelector(".paymentForm").classList.remove("show");

    const form2 = document.querySelector(".paymentForm");
    const elements2 = form2.elements;
    form2.setAttribute("novalidate", true);
    const formElements2 = form2.querySelectorAll("input, select");
  
    document.querySelector(".toReceipt").addEventListener("click", (e) => {
        e.preventDefault();
        checkValidation(form2, formElements2, paymentCompleted);
    })  
}

function paymentCompleted(){
    document.querySelector(".receipt").classList.remove("show");
    document.querySelector(".paymentForm").classList.add("show");
    //post
    postSubscription(completedForm);
    //close
    document.querySelector(".payment-modal-close").addEventListener("click", function(){
        location.reload();
    });
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

    /* ------------ covid info ----------- */
    buildCovidInfo(home[0].corona_text);
    // 3. append
    document.querySelector("#intro").appendChild(introCopy);

    setUpScrollEffect()
}

function buildCovidInfo(covid){
    document.querySelector(".coronaText").textContent = covid;
    const covidText = document.querySelector(".coronaText");
     
    document.querySelector(".corona-guidelines").addEventListener("click", function(){
        if (covidText.style.display === "block") {
            covidText.style.display = "none";
            } else {
                covidText.style.display = "block";
            }
    })
}

function showTrips(trips) {
    // 1. template clones
    const tripTemplate = document.querySelector(".tripTemplate").content;
    const tripArea = document.querySelector("#tripArea");

    trips.forEach((oneTrip) => {
        const tripCopy = tripTemplate.cloneNode(true);

        tripCopy.querySelector(".tripTitle").textContent = oneTrip.title.rendered;
        tripCopy.querySelector(".tripImg").src = oneTrip.trip_image.guid;
        tripCopy.querySelector(".duration").textContent = oneTrip.duration;
        tripCopy.querySelector(".tripText").textContent = oneTrip.description;

        tripCopy.querySelector(".summerMenu").textContent = oneTrip.summer_menu;
        tripCopy.querySelector(".winterMenu").textContent = oneTrip.winter_menu;
        
        //price
        tripCopy.querySelector(".public span").textContent = oneTrip.public_tour_price;
        tripCopy.querySelector(".private span").textContent = oneTrip.private_tour_price;
        //modal content
        tripCopy.querySelector(".readMoreTrip").addEventListener("click", function(){

            /* document.querySelector('body').classList.add('modal-active');  */

            const readMoreModal = document.querySelector("#trip-modal-background");
            readMoreModal.classList.add("showModal"); 
            //Prevent Body scroll
            document.body.style.overflow = "hidden";
            document.body.style.height = "100%"; 
            readMoreModal.querySelector(".fullDescription").innerText = oneTrip.full_description;
            // Gallery timeline
            readMoreModal.querySelector("#timelineGallery").innerHTML = oneTrip.content.rendered;
            //Animate line as you scroll 
            const line = readMoreModal.querySelector("#c");
            let length = line.getTotalLength();
            line.style.strokeDasharray = length;
            line.style.strokeDashoffset = length;
            readMoreModal.addEventListener("scroll", function(){
                let scroll = readMoreModal.scrollTop / readMoreModal.scrollHeight;
                let draw = length * scroll;
                line.style.strokeDashoffset = length - draw;
            });
        });
        tripCopy.querySelector(".trip-modal-close").addEventListener("click", function(){
            const readMoreModal = document.querySelector("#trip-modal-background");
            readMoreModal.classList.remove("showModal");
            //Allow body scroll
            document.body.style.overflow = "auto"; // ADD THIS LINE
            document.body.style.height = "auto"; 
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

        tourCopy.querySelector(".tourTitle").textContent = oneTour.title.rendered;
        const tourText = tourCopy.querySelector(".tourText");
        tourText.textContent = oneTour.description;

        //Expand single tour
        tourCopy.querySelector(".tourTitle").addEventListener("click", function(){
            if (tourText.style.display === "block") {
                tourText.style.display = "none";
                document.querySelector("#boatSvg").classList.add("show");

                /* if (document.querySelector(".tourTitle:first-of-type").checked = false) {
                    document.querySelector("#singleTripArea:nth-of-type(5n)").classList.remove("flashAnimation"); 
                    document.querySelector("#singleTripArea:nth-of-type(3n)").classList.remove("flashAnimation");
                } else if (document.querySelector(".tourTitle:last-of-type").checked = false) {
                    document.querySelector("#boatSvg2").classList.remove("show");
                    document.querySelector("#boatSvg2").classList.add("boatAnimation"); 
                    document.querySelector("#singleTripArea:first-of-type").classList.add("flashAnimation"); 
                } */

                document.querySelector("#boatSvg").classList.remove("boatAnimation"); 
                document.querySelector("#singleTripArea:nth-of-type(5n)").classList.remove("flashAnimation"); 
                document.querySelector("#singleTripArea:nth-of-type(3n)").classList.remove("flashAnimation");
                } else {
                tourText.style.display = "block";

                /* oneTour.addEventListener("click", function(){
                    if (document.querySelector(".tourTitle:first-of-type").checked == true) {
                        document.querySelector("#boatSvg").classList.remove("show");
                        document.querySelector("#boatSvg").classList.add("boatAnimation"); 
                        document.querySelector("#singleTripArea:nth-of-type(5n)").classList.add("flashAnimation"); 
                        document.querySelector("#singleTripArea:nth-of-type(3n)").classList.add("flashAnimation"); 
                    } else if (document.querySelector(".tourTitle:last-of-type").checked == true) {
                        document.querySelector("#boatSvg2").classList.remove("show");
                        document.querySelector("#boatSvg2").classList.add("boatAnimation"); 
                        document.querySelector("#singleTripArea:first-of-type").classList.add("flashAnimation"); 
                    }  
                }); */
                  
                document.querySelector("#boatSvg").classList.remove("show");
                document.querySelector("#boatSvg").classList.add("boatAnimation"); 
                document.querySelector("#singleTripArea:nth-of-type(5n)").classList.add("flashAnimation"); 
                document.querySelector("#singleTripArea:nth-of-type(3n)").classList.add("flashAnimation");  
                }
        })
        tourArea.appendChild(tourCopy);
    })
}

// function showGalleryPage(gallery) {
//     var elem = document.querySelector('.js-flickity');
//     var flkty = new Flickity( elem, {
//         // options
//         cellAlign: 'left',
//         contain: true
//     });
//     //   for an individual element
//     var flkty = new Flickity( '.js-flickity', {
//         // options
//     }); 

//     // 1. template clone
//     const galleryTemplate = document.querySelector(".galleryTemplate").content;
//     const galleryCopy = galleryTemplate.cloneNode(true);
    
//     galleryCopy.querySelector(".i1").src = gallery[0].boat_image.guid;
//     galleryCopy.querySelector(".i2").src = gallery[1].boat_image.guid;
//     galleryCopy.querySelector(".i3").src = gallery[2].boat_image.guid;
//     galleryCopy.querySelector(".i4").src = gallery[3].boat_image.guid;
//     galleryCopy.querySelector(".i5").src = gallery[4].boat_image.guid;

//     document.querySelector("#gallery").appendChild(galleryCopy);
//     /*---------------Image Carousel---------------*/
//     /* carouselEffect(); */
// }

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
    contactCopy.querySelector(".contactIcon1").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/11/facebook-icon-vector-black-and-white-4.png";
    contactCopy.querySelector(".contactIcon2").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/11/instagram-icon-vector-27.png";
    contactCopy.querySelector(".contactIcon3").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/11/tripadvisor-logotype-1.png";
    /* --------------- featured in --------------- */
    contactCopy.querySelector(".times").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/The_Times_logo_wrodmark.png";
    contactCopy.querySelector(".conde").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/conde-1.png";
    // 3. append
    document.querySelector("#bottomNavigation").appendChild(contactCopy);
}

function weatherApp(weather) {
    // 1. template clone
    const template = document.querySelector("#weather template").content;
    const weatherArea = document.querySelector("#weatherArea");

    const copy = template.cloneNode(true);
    
   copy.querySelector(".location").textContent = weather.request.query;
   copy.querySelector(".dateTime .dt").textContent = weather.location.localtime;
   copy.querySelector(".wind .speed span").textContent = weather.current.wind_speed;
   copy.querySelector(".temperature .main span").textContent = weather.current.temperature;
   copy.querySelector(".temperature .status").textContent = weather.current.weather_descriptions[0];
   copy.querySelector(".feelsLike .feeling span").textContent = "Feels like: " + weather.current.feelslike;
   copy.querySelector(".humid .humidity span").textContent = "Humidity: " + weather.current.humidity;
   /* copy.querySelector(".temperature .min span").textContent = weather.forecast.mintemp;
   copy.querySelector(".temperature .max span").textContent = weather.forecast.main.maxtemp; 
   // it can be more than one:
   /* weather.weather.forEach((item) => {
           copy.querySelector(".detail .status").textContent = item.description;
   }); */

   // output text
   document.querySelector("#weatherResult p").textContent = "";
   document.querySelector(".weatherIcon").src = "";
   if (weather.current.weather_descriptions[0] === "Light Rain, Mist") {
       document.querySelector("#weatherResult p").textContent = "Experience Copenhagen through the lens of a Dane today!";
       document.querySelector(".weatherIcon").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/cloudy.png";
   } 

   weatherArea.appendChild(copy)
}