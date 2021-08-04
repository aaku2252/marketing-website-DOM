"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

//> scroll scrolling to the element-------------------------------------------------------------------------!!!!!!
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function () {
    //this is a modern way of using the scrolling effect or jump to a section
    //we can use the positions of the elements to  scroll to the desired element using scrollTo()
    section1.scrollIntoView({
        behavior: "smooth",
    });
});

//>events delegation methods ----------------------------------------------------------------------------------!!!!
// 1. add event listener to the common parent element and then use the bubbling to select the element and use the event listner of parent.
// 2. we can use event listner to each element but that would make the code repeat itself for each event listener and therefore there would be performance issues.

document.querySelector(".nav__links").addEventListener("click", (e) => {
    //first we add preventDefault to reload the page each time the link is clicked
    e.preventDefault();
    //here we are making sure that the function runs only when the click is done on the link not on the empty space of the parent.
    if (e.target.classList.contains("nav__link")) {
        // here we are selecting the elements href value beaacuse that will scoll the page to that section and help us selecting that element.
        const id = e.target.getAttribute("href");
        //here  we selected the element using the id and add the smooth scrolling behaviour.
        document.querySelector(id).scrollIntoView({
            behavior: "smooth",
        });
    }
});

//>Switching the tabs--------------------------------------------------------------------------------------!!!!
//first we will check on which the click event is happened and the add the active class to that tab and
//content and remove the remove the active class from earlier tab and content.

const tabs = document.querySelectorAll(".operations__tab");
const contents = document.querySelectorAll(".operations__content");
tabs.forEach(function (tab) {
    tab.addEventListener("click", function (e) {
        //here we select the data attribute value for the tab which is clicked.

        const num = e.target.dataset.tab;

        //removing the active class from earlier active version of the tabs
        tabs.forEach(function (el) {
            el.classList.remove("operations__tab--active");
        });
        //adding the active class to the tab on which mouse is clicked
        document
            .querySelector(`.operations__tab--${num}`)
            .classList.add("operations__tab--active");
        //removing the active class from earlier active version of the content
        contents.forEach(function (el) {
            el.classList.remove("operations__content--active");
        });
        //adding the active class to the content  for  which mouse is clicked on respective tab
        document
            .querySelector(`.operations__content--${num}`)
            .classList.add("operations__content--active");
    });
});

//> menu fade---------------------------------------------------------------------------------------------------!!!!!!
//>providing arguments in event listners
//here we will use a common function to add two event listners and pass different argument using bind method.
const nav = document.querySelector(".nav");
function fadeOut(e) {
    if (e.target.classList.contains("nav__link")) {
        const current = e.target;
        const links = current.closest(".nav").querySelectorAll(".nav__link");
        const logo = current.closest(".nav").querySelector("img");

        links.forEach((el) => {
            if (el != current) {
                el.style.opacity = this;
            }
        });
        logo.style.opacity = this;
    }
}
//adding the event listner to the nav items and passing the fade out function connected with
//bind method to the value we pass

nav.addEventListener("mouseover", fadeOut.bind(0.5));
nav.addEventListener("mouseout", fadeOut.bind(1));

//> making the nav bar sticky after a certain point---------------------------------------------------------!!!!

const header = document.querySelector(".header");
//adding the scroll event to the window scroll
// const topDistance = document
//     .querySelector("#section--1")
//     .getBoundingClientRect().top;

// window.addEventListener("scroll", function () {
// check a certain scrolling position after which we will add the sticky class

//     console.log(topDistance);
//     if (window.scrollY > topDistance) {
//add the sticky class to the nav bar
//         nav.classList.add("sticky");
//     } else {
//         nav.classList.remove("sticky");
//     }
// });

//> Intersection observer Api for higher performance-------------------------------------------------------!!!!!

const obsCallback = function (entries, Observer) {
    //here entries are the each intersection change.
    const [entry] = [...entries];
    if (!entry.isIntersecting) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
};
const height = nav.getBoundingClientRect().height;
const obsOptions = {
    root: null,
    threshold: 0,
    rootMargin: `-${height}px`,
};
const Observer = new IntersectionObserver(obsCallback, obsOptions);
Observer.observe(header);
//> reveal section on ------------------------------------------------------------------------------------!!!
const sections = document.querySelectorAll(".section");

function revealSection(entries, observer) {
    const [entry] = entries;
    //here we are checking if the section is intersecting,if it is intersecting only then we will remove the class.
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.2,
});

sections.forEach((section) => {
    section.classList.add("section--hidden");
    sectionObserver.observe(section);
});

//> lazy loading ------------------------------------------------------------------------------------------!!!
const lazyImages = document.querySelectorAll("img[data-src]");

const revealImage = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", () => {
        entry.target.classList.remove("lazy-img");
    });

    observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(revealImage, {
    root: null,
    threshold: 0,
    // rootMargin: "200px",
});

lazyImages.forEach((image) => {
    imageObserver.observe(image);
});
