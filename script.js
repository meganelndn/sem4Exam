window.addEventListener("DOMContentLoaded", init);
// document.addEventListener("DOMContentLoaded", init);
function init() {
    fetchData();
    setUpNewsletter();
    setUpBooking();
    weatherApp();
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

import { checkValidation, closeForm, postSubscription } from "./modules/bookingSteps";
import { carouselEffect } from "./modules/imageCarousel";
import { weatherCard } from "./modules/weatherCard.js";

let completedForm;

function setUpNewsletter() {
    document.querySelector("#newsletterBtn").addEventListener("click", function(){
        let newsletterOverlay = document.getElementById("newsletterOverlay");
        newsletterOverlay.classList.toggle("showOverlay");
    });
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
    setScrollPosition();
}

function setScrollPosition() {
    window.onscroll = function() {myFunction()};

    var header = document.querySelector(".availability");
    var sticky = header.offsetTop;
    
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
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
    // form2.setAttribute("novalidate", true);
    const formElements2 = form2.querySelectorAll("input, select");
  
    document.querySelector(".toReceipt").addEventListener("click", (e) => {
        e.preventDefault();
        checkValidation(form2, formElements2, ohYes);
    })  
}

function ohYes(){
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
        tripCopy.querySelector("#lemonade_water .summer").textContent = oneTrip.lemonade_water.split(", ")[0];
        tripCopy.querySelector("#lemonade_water .winter").textContent = oneTrip.lemonade_water.split(", ")[1];

        tripCopy.querySelector("#tea_coffee_chocolate .summer").textContent = oneTrip.tea_coffee_chocolate.split(", ")[0];
        tripCopy.querySelector("#tea_coffee_chocolate .winter").textContent = oneTrip.tea_coffee_chocolate.split(", ")[1];
        
        tripCopy.querySelector("#bottle_of_wine .summer").textContent = oneTrip.bottle_of_wine.split(", ")[0];
        tripCopy.querySelector("#bottle_of_wine .winter").textContent = oneTrip.bottle_of_wine.split(", ")[1];

        tripCopy.querySelector("#glass_of_wine .summer").textContent = oneTrip.glass_of_wine.split(", ")[0];
        tripCopy.querySelector("#glass_of_wine .winter").textContent = oneTrip.glass_of_wine.split(", ")[1];

        tripCopy.querySelector("#glass_of_grog .summer").textContent = oneTrip.glass_of_grog.split(", ")[0];
        tripCopy.querySelector("#glass_of_grog .winter").textContent = oneTrip.glass_of_grog.split(", ")[1];

        tripCopy.querySelector("#beer .summer").textContent = oneTrip.beer.split(", ")[0];
        tripCopy.querySelector("#beer .winter").textContent = oneTrip.beer.split(", ")[1];

        //Icon
        const replacementItem = document.querySelectorAll("#summerWinter p");
        replacementItem.forEach((oneResult) => {
            if (oneResult.textContent === "no"){
                let addCross = document.createElement("img");
                oneResult.textContent = "";
                addCross.className = "iconSize";
                addCross.src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/11/crossMark.png";
                oneResult.appendChild(addCross);
            } else if (oneResult.textContent === "yes"){
                let addCheck = document.createElement("img");
                oneResult.textContent = "";
                addCheck.className = "iconSize";
                addCheck.src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/11/—Pngtree—tick-vector-icon_4015270.png";
                oneResult.appendChild(addCheck);
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
    const galleryCopy = galleryTemplate.cloneNode(true);
    
    galleryCopy.querySelector(".i1").src = gallery[0].boat_image.guid;
    galleryCopy.querySelector(".i2").src = gallery[1].boat_image.guid;
    galleryCopy.querySelector(".i3").src = gallery[2].boat_image.guid;
    galleryCopy.querySelector(".i4").src = gallery[3].boat_image.guid;
    galleryCopy.querySelector(".i5").src = gallery[4].boat_image.guid;

    document.querySelector("#gallery").appendChild(galleryCopy);

    /*---------------Image Carousel---------------*/
    carouselEffect();
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
    contactCopy.querySelector(".contactIcon1").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/11/facebook-icon-vector-black-and-white-4.png";
    contactCopy.querySelector(".contactIcon2").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/11/instagram-icon-vector-27.png";
    contactCopy.querySelector(".contactIcon3").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/11/tripadvisor-logotype-1.png";
    // 3. append
    document.querySelector("#bottomNavigation").appendChild(contactCopy);
}

function weatherApp() {
    /* https://codepen.io/tutsplus/pen/gObLaEP  */

    /* SEARCH BY USING A CITY NAME OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE */
    const form = document.querySelector(".top-banner form");
    const input = document.querySelector(".top-banner input");
    const msg = document.querySelector(".top-banner .msg");
    const list = document.querySelector(".ajax-section .cities");
    const apiKey = "4d8fb5b93d4af21d66a2948710284366";

    form.addEventListener("submit", e => {
        e.preventDefault();

        let inputVal = input.value;

        // check if there's already a city
        const listItems = list.querySelectorAll(".ajax-section .city");
        const listItemsArray = Array.from(listItems);

        if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {

        let content = "";
        // athens,gr
        if (inputVal.includes(",")) {
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
        } else {
        // athens
        content = el.querySelector(".city-name span").textContent.toLowerCase();
        }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well`;
      form.reset();
      input.focus();
      return;
    }
  }

  weatherCard(form, input, msg, list, apiKey, inputVal);
  });
}