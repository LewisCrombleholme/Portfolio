
// Ripple Click Effect.
const button = document.querySelectorAll(".ripple__effect");
button.forEach(btn => {
    btn.addEventListener("click", function(e) {
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let rippples = document.createElement("span");
        rippples.classList.add("ripple");
        rippples.style.left = x + "px";
        rippples.style.top = y + "px";
        this.appendChild(rippples);

        setTimeout(() => {
            rippples.remove()
        }, 1000);
    })
});

// TypeWriter Effect
const typedTextSpan = document.querySelector(".typed__text"); 
const cursor = document.querySelector(".typewriter__cursor");

const textArray = ["Developer.", "Freelancer.", "Hobbyist."];
const typingDelay = 200;
const erasingDelay = 100; 
const newTextDelay = 2000; 

let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursor.classList.contains("typing")) {
            cursor.classList.add("typing");
        } 
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursor.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
  }
  
  function erase() {
      if (charIndex > 0) {
        if(!cursor.classList.contains("typing")) {
            cursor.classList.add("typing");
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursor.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex>=textArray.length) textArrayIndex=0;
        setTimeout(type, typingDelay + 1000);
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }  
 });


// Experience Carousel.
var itemClassName = "experience__info";
items = document.getElementsByClassName(".experience__info");
totalItems = items.length;
slide = 0;
moving = true;

function setInitialClasses() {
    items[totalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
}

function setEventListeners() {
    var next = document.getElementsByClassName("experience__prev");
    var prev = document.getElementsByClassName("experience__next");

    next.addEventListener('click', moveNext);
    prev.addEventListener('click', movePrev);
}

// Next navigation handler
function moveNext() {
    // Check if moving.
    if(!moving) {

        // If it's the last slide, reset to 0, else +1.
        if(slide === (totalItems - 1)) {
            slide = 0;
        }
        else {
            slide++;
        }

        // Move Carousel to update slide
        moveCarouselTo(slide);
    }
}

// Prev navigation handler
function movePrev() {
    // Check if moving.
    if(!moving) {

        // If it's the last slide, reset to 0, else +1.
        if(slide === (totalItems - 1)) {
            slide = 0;
        }
        else {
            slide--;
        }

        // Move Carousel to update slide
        moveCarouselTo(slide);
    }
}

// Disable Interaction
function disableInteraction() {
    // set moving to true.
    moving = true;

    // Timeout
    setTimeout (function() {
        moving = false;
    }, 500);
}

// Moves Carousel
function moveCarouselTo(slide) {
    // Check if moving 
    if(!moving) {

        // disable interaction
        disableInteraction();

        // Update the "old" adjacent slides with "new" ones
        var newPrevious = slide - 1,
            newNext = slide + 1,
            oldPrevious = slide - 2,
            oldNext = slide + 2;

        // test if carousel have more than three items.
        if((totalItems - 1) > 3) {
             // Checks and updates if the new slides are out of bounds
            if (newPrevious <= 0) {
                oldPrevious = (totalItems - 1);
            } else if (newNext >= (totalItems - 1)){
                oldNext = 0;
            }
                // Checks and updates if slide is at the beginning/end
            if (slide === 0) {
                newPrevious = (totalItems - 1);
                oldPrevious = (totalItems - 2);
                oldNext = (slide + 1);
            } else if (slide === (totalItems -1)) {
                newPrevious = (slide - 1);
                newNext = 0;
                oldNext = 1;
            }
            // Now we've worked out where we are and where we're going, 
            // by adding/removing classes we'll trigger the transitions.
            // Reset old next/prev elements to default classes
            items[oldPrevious].className = itemClassName;
            items[oldNext].className = itemClassName;
            // Add new classes
            items[newPrevious].className = itemClassName + " prev";
            items[slide].className = itemClassName + " active";
            items[newNext].className = itemClassName + " next";
        }
    }
}

function initCarousel() {
    setInitialClasses();
    setEventListeners();
    // Set moving to false so that the carousel becomes interactive
    moving = false;
}

initCarousel();