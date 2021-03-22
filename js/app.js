
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

// Switch Active
$(document).ready(function() {
    scrollActiveLinkControl()
    activeLinkControl()
});

// Switch Active on Click NavBar.
function activeLinkControl() {
    $('.nav__links .nav__item a').click(function() {
        // Removes active class from nav-item.
        $('.nav__links .nav__item').removeClass('active')
        // Add active class to clicked item.
        $(this).closest('.nav__item').addClass('active')
    });
}

// Switch Active on Scroll NavBar.
function scrollActiveLinkControl() {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if(pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLi.forEach( li => {
            li.classList.remove('active');

            if(li.classList.contains(current)) {
                li.classList.add('active');
            }
        })
    });
};




