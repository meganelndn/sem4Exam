window.addEventListener("DOMContentLoaded", init);
import 'regenerator-runtime/runtime'

function init() {
   
    // show for both pages
    const urlContact = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/contact_page/";
    fetchData(urlContact, showContact);

    if (window.location.pathname.includes("index")) {
    const urlHome = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/landing_page/";
    fetchData(urlHome, showLandingPage);

    const urlTours = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/tours";
    fetchData(urlTours, showTours);

    const urlTrips = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/trips";
    fetchData(urlTrips, showTrips);

    const weatherUrl = "http://api.weatherstack.com/forecast?access_key=bdb591c14b9e4a079623b1a838313888&query=Copenhagen";
    fetchData(weatherUrl, weatherApp)

  
    
    setUpNewsletter();
    setUpBooking();
    setScrollPosition();
    
    } else if (window.location.pathname.includes("faq")) {
    
        const urlFaq = "http://pbstyle.dk/wpinstall/wordpress/wp-json/wp/v2/faq/";
        fetchData(urlFaq, showFAQPage);
        setUpScrollEffect();

    }

    setUpScrollEffect();
}

let tripSelected;

/* https://www.dev-tips-and-tricks.com/animate-elements-scrolled-view-vanilla-js */
function setUpScrollEffect(){
    let elements;
    let windowHeight;
  
    elements = document.querySelectorAll('.hidden');
    function start() {
      windowHeight = window.innerHeight;
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
import { fetchData, postNewsletter } from "./modules/shared";

let completedForm;
let newsletterEmail;

function smoothScroll() {
    document.querySelector(".bookBtn", ".bookTrip").addEventListener("click", e => {
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

    newsFormEl.forEach((e) => {
        e.addEventListener("change", (e) => {
            let objectNews = {
            email: document.querySelector("input[id=newsletterMail").value,
            };
            newsletterEmail = objectNews;
        }) 
    })

    document.querySelector(".newsletterSubscription").addEventListener("click", function(e){
    e.preventDefault();
    checkValidation(newsForm, newsFormEl, sendNewsletter); 
    });
}

function sendNewsletter(){
    postNewsletter(newsletterEmail)
    document.querySelector(".overlay-content2").classList.remove("show");
    document.querySelector(".overlay-content").classList.add("hideOverlay");
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
    
    let book = document.querySelector("#navBar .bookBtn");
    let sticky = header.offsetTop;
    let navBar = document.querySelector("#topNavigation");

    function myFunction() {
      if (window.pageYOffset > sticky) {
        navBar.classList.add("changeMenu");
        book.classList.add("addStyle");
      } else {
        navBar.classList.remove("changeMenu")
        book.classList.remove("addStyle");
      }
    }
}

function formValidation() {
    const form1 = document.querySelector(".availability");
    const elements1 = form1.elements;
    const formElements1 = form1.querySelectorAll("input, select");
    form1.querySelector("#time").min = new Date().toISOString().substring(0, 16);

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
    const checkMobile = window.matchMedia('screen and (max-width: 575px)');
  
      if(checkMobile.matches) {
          //TODO: add an img here, since there will be no video.
          //console.log('MOBILE');
      } else {
          //console.log("big")
          introCopy.querySelector(".video-container").src = home[0].hero_video.guid;
      }

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
    document.querySelector(".coronaText").innerText = covid;
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
        // autoFill save Book btn info
        tripCopy.querySelector(".bookTrip").addEventListener("click", function(){
            if (!tripSelected) {
                tripSelected = oneTrip.trip_name;
                autoFill(tripSelected);
            } else {
                tripSelected = oneTrip.trip_name;
                autoFill(tripSelected);
            }
        })
        function autoFill(tripSelected){
            if (tripSelected.includes("The Landmarks")) {
                document.querySelector('#intro').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                document.querySelector("select[id=tour").selectedIndex = 1;
            } else if (tripSelected.includes("Hidden Gems")) {
                document.querySelector('#intro').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                document.querySelector("select[id=tour").selectedIndex = 2;
            } else if (tripSelected.includes("The Diana")) {
                document.querySelector('#intro').scrollIntoView({ 
                    behavior: 'smooth' 
                });
                document.querySelector("select[id=tour").selectedIndex = 3;
            }
        }

        tripCopy.querySelector(".tripTitle").textContent = oneTrip.title.rendered;
        tripCopy.querySelector(".tripImg").src = oneTrip.trip_image.guid;
        tripCopy.querySelector(".duration").textContent = oneTrip.duration;
        tripCopy.querySelector(".tripText").textContent = oneTrip.description;
        
        //price
        tripCopy.querySelector(".public span").textContent = oneTrip.public_tour_price;
        tripCopy.querySelector(".private span").textContent = oneTrip.private_tour_price;
        //modal content
        tripCopy.querySelector(".readMoreTrip").addEventListener("click", function(){
            const readMoreModal = document.querySelector("#trip-modal-background");
            readMoreModal.classList.add("showModal"); 
            //Prevent Body scroll
            document.body.style.overflow = "hidden";
            document.body.style.height = "100%"; 
            readMoreModal.querySelector(".oneTripTitle").textContent = oneTrip.title.rendered;
            readMoreModal.querySelector(".fullDescription").innerText = oneTrip.full_description;
            
            readMoreModal.querySelector(".summerMenu").textContent = oneTrip.summer_menu;
            readMoreModal.querySelector(".winterMenu").textContent = oneTrip.winter_menu;
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
            document.body.style.overflow = "auto"; 
            document.body.style.height = "auto"; 
        });

        //3. append
        tripArea.appendChild(tripCopy);
    })
}

function showTours() {
    const privateTourText = document.querySelector(".privateTourText");
    const publicTourText = document.querySelector(".publicTourText");
    
    document.querySelector(".privateTourTitle").addEventListener("click", function() {
        if (privateTourText.style.display === "block") {
            privateTourText.style.display = "none";

            document.querySelector("#boatSvg").classList.add("show");
            document.querySelector("#boatSvg").classList.add("boatAnimation"); 
            document.querySelector("#singleTripArea:nth-of-type(5n)").classList.remove("flashAnimation"); 
            document.querySelector("#singleTripArea:nth-of-type(3n)").classList.remove("flashAnimation");
        } else {
            privateTourText.style.display = "block";
                  
            document.querySelector("#boatSvg").classList.remove("show");
            document.querySelector("#boatSvg").classList.add("boatAnimation"); 
            document.querySelector("#singleTripArea:nth-of-type(5n)").classList.add("flashAnimation"); 
            document.querySelector("#singleTripArea:nth-of-type(3n)").classList.add("flashAnimation");    
        }
    })
    document.querySelector(".publicTourTitle").addEventListener("click", function() {
        if (publicTourText.style.display === "block") {
            publicTourText.style.display = "none";

            document.querySelector("#boatSvg2").classList.add("show");
            document.querySelector("#boatSvg2").classList.add("boatAnimation"); 
            document.querySelector("#singleTripArea:nth-of-type(5n)").classList.remove("flashAnimation"); 
            document.querySelector("#singleTripArea:nth-of-type(3n)").classList.remove("flashAnimation");
            document.querySelector("#singleTripArea:first-of-type").classList.remove("flashAnimation");
        } else {
            publicTourText.style.display = "block";
                  
            document.querySelector("#boatSvg2").classList.remove("show");
            document.querySelector("#boatSvg2").classList.add("boatAnimation"); 
            document.querySelector("#singleTripArea:nth-of-type(5n)").classList.add("flashAnimation"); 
            document.querySelector("#singleTripArea:nth-of-type(3n)").classList.add("flashAnimation");  
            document.querySelector("#singleTripArea:first-of-type").classList.add("flashAnimation");  
        }
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
        cloneFAQ.querySelector(".questionBox img").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/arrow-down-1.png";
        cloneFAQ.querySelector(".faqAnswer").textContent = oneFAQ.answer;

        //3. append
        faqArea.appendChild(cloneFAQ);
    })
    accordion();
    expandOptions(icon);
}

function accordion(){
    let accordion = document.querySelectorAll(".questionBox");
    let icon = document.querySelector(".questionBox img");
    let counter;
    for (counter = 0; counter < accordion.length; counter++) {
        accordion[counter].addEventListener("click", function() {
        this.classList.toggle("accordionActive");
        let getAnswer = this.nextElementSibling;
            if (getAnswer.style.display === "block") {
            getAnswer.style.display = "none";
            icon.src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/arrow-down-1.png"
            } else {
            getAnswer.style.display = "block";
            icon.src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/arrow-up-1.png"
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
    contactCopy.querySelector(".contactText").innerText = contact[2].openings;
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

function weatherApp(weather) {
    // 1. template clone
    const template = document.querySelector("#weather template").content;
    const weatherArea = document.querySelector("#weatherArea");

    const copy = template.cloneNode(true);
    
   copy.querySelector(".location").textContent = weather.request.query;
   copy.querySelector(".dateTime .dt").textContent = weather.location.localtime;
   copy.querySelector(".degrees span").textContent = weather.current.temperature;
   copy.querySelector(".status").textContent = weather.current.weather_descriptions[0];
   copy.querySelector(".feelsLike .feeling span").textContent = "Feels like: " + weather.current.feelslike;

   copy.querySelector(".weatherResult").textContent = "";
   copy.querySelector(".weatherIcon").src = "";
   if (weather.current.weather_descriptions[0].includes("Mist", "Foggy")) {
        copy.querySelector(".weatherResult").textContent = "See Copenhagen through the lens of a Dane today!";
        copy.querySelector(".weatherIcon").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/foggy.png";
    } else if (weather.current.weather_descriptions[0].includes("Cloudy", "cloudy", "Overcast")) {
        copy.querySelector(".weatherResult").textContent = "The good old boring Danish sky...";
        copy.querySelector(".weatherIcon").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/cloudy.png";
    } else if (weather.current.weather_descriptions[0].includes("Light", "Drizzle", "Rain")) {
        copy.querySelector(".weatherResult").textContent = "Light rain on the horizon today!";
        copy.querySelector(".weatherIcon").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/rainy.png";
    } else if (weather.current.weather_descriptions[0].includes("Sun", "Sunny")) {
        copy.querySelector(".weatherResult").textContent = "Enjoy the sun while it lasts!";
        copy.querySelector(".weatherIcon").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/sunny-cloudy.png";
    } else if (weather.current.weather_descriptions[0].includes("Wind", "Windy")) { 
        copy.querySelector(".weatherResult").textContent = "Careful, looks like today will be windy!";
        copy.querySelector(".weatherIcon").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/windy.png";
    } else if (weather.current.weather_descriptions[0].includes("Thunder", "Stormy")) {
        copy.querySelector(".weatherResult").textContent = "There is a storm on the horizon...";
        copy.querySelector(".weatherIcon").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/stormy.png";
    } else if (weather.current.weather_descriptions[0].includes("Heavy")) {
        copy.querySelector(".weatherResult").textContent = "Watch out, you wouldn't want to get wet today!";
        copy.querySelector(".weatherIcon").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/heavy-rain.png";
    } else {
        copy.querySelector(".weatherResult").textContent = "See Copenhagen through the lens of a Dane today!";
        copy.querySelector(".weatherIcon").src = "http://pbstyle.dk/wpinstall/wordpress/wp-content/uploads/2020/12/cloudy.png";
    }

   weatherArea.appendChild(copy)
}