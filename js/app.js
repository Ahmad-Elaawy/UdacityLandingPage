/*
 Define Global Variables
*/
const navList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
const fragment = document.createDocumentFragment();


// build the nav

function createNav() {
    for (const section of sections) {
        const name = section.dataset.nav;
        const sectionId = section.id;
        // creating list items
        const item = document.createElement('li');
        // list item content
        item.innerHTML = `<a href="#${sectionId}" class ='menu__link' data-nav ='${sectionId}'>${name}</a>`;
        // Scroll behavior
        item.addEventListener('click', event => {
            event.preventDefault();
            section.scrollIntoView({
                behavior: "smooth"
            })
        })
        fragment.appendChild(item);
    }
    // fragment appending
    navList.appendChild(fragment);
}
window.addEventListener('load', createNav);


// Add class 'active' to section when near top of viewport


// observer callback function
const obsCallback = (entries) => {
    const activeLinks = document.querySelectorAll('a.menu__link');
    // adding active class
    if (entries[0].isIntersecting) {
        entries[0].target.classList.add("your-active-class");
        // active navbar links
        activeLinks.forEach(activeLink => {
            if (activeLink.textContent === entries[0].target.dataset.nav) {
                activeLink.classList.add('activated');
                /*
                                   the "activated" class is a custom css class
                               */
            } else {
                activeLink.classList.remove('activated');
            }
        });
    } else { // removing active class
        entries[0].target.classList.remove("your-active-class");
    }
}

//observer Options
const obsOptions = {
    threshold: 0.6
}

// intersection observer class
const observer = new IntersectionObserver(obsCallback, obsOptions);
// observe when scrolling
window.addEventListener('scroll', () => {
    for (const section of sections) {
        observer.observe(section);
    }
});