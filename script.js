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

//> scroll scrolling to the element
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function () {
    //this is a modern way of using the scrolling effect or jump to a section
    //we can use the positions of the elements to  scroll to the desired element using scrollTo()
    section1.scrollIntoView({
        behavior: "smooth",
    });
});

//>events delegation methods
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

//>Switching the tabs
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
