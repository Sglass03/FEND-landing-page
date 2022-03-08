/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

// Get all sections
const sections = document.getElementsByClassName('section');

// Use helper function inInViewport to see if element is in viewport
// Used from https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add event listener to see if section is in viewport
document.addEventListener('scroll', function () {
    for (section of sections) {
        el = document.getElementById(section.id);
        nav_el = document.getElementById(section.id + '__nav');

        // console.log(isInViewport(el));
        if (isInViewport(el)) {
          console.log(el.id + " active")
            el.classList.add("active-class");
            nav_el.classList.add('active');
        }

        if (!isInViewport(el)) {
            el.classList.remove("active-class");
            nav_el.classList.remove("active");
        }
    }
});


// Function to create the nav items
// Uses the global sections variable
function createNavItems(sections) {
    
    const nav_ul = document.querySelector('#navbar__list');

    for (section of sections) {

        // Create a and li elements
        const item = document.createElement('li');
        const link = document.createElement('a');

        // Add attributes to elements
        link.innerHTML = section.dataset.nav;
        link.classList.add('menu__link');
        link.setAttribute("href", "#" + section.id);
        link.setAttribute("id", section.id + "__nav");

        // Add elements to the DOM
        item.append(link);
        nav_ul.appendChild(item);
    }

    // Add event listener to add scrolling behavior
    nav_ul.addEventListener('click', function(event) {
        event.preventDefault();

        // Check to make sure the click isn't for the icon
        if (event.target.className != 'fa fa-bars' & event.target.getAttribute('href') != "") {
            // Get the delegated event target
            scroll_target = event.target.getAttribute('href');

            // Scroll to target
            // Informed by this discussion: https://stackoverflow.com/questions/13266746/scroll-jump-to-id-without-jquery
            document.querySelector(scroll_target).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// build the nav
createNavItems(sections);

// Create responsive nav
// Code influenced by https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
function myFunction() {
    let x = document.getElementById("navbar__list");
    if (x.className === "") {
      x.className += "responsive";
    } else {
      x.className = "";
    }
  }

  /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
  // From https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  el = document.getElementById("navbar__list");

  if (prevScrollpos >= currentScrollPos) {
    el.classList.remove('hide');
  } else {
    el.classList.add('hide');
  }
  prevScrollpos = currentScrollPos;
}
