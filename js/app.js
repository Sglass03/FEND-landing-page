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

// Use helper function inInViewport -- 
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

    nav_ul.addEventListener('click', function(event) {
        event.preventDefault();

        // Get the delegated event target
        scroll_target = event.target.getAttribute('href');

        // Scroll to target
        // Informed by this discussion: https://stackoverflow.com/questions/13266746/scroll-jump-to-id-without-jquery
        document.querySelector(scroll_target).scrollIntoView({
            behavior: 'smooth'
          });
    });
}

// build the nav
createNavItems(sections);

