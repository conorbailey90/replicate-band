// import {dates} from './dates.js';
import { getApiRef } from './api.js';
const mobileNav = document.querySelector('.mobile__nav');
const menuOpen = document.querySelector('.menu__open');
const menuClose = document.querySelector('.menu__close');
const mobileMenuLinks = [...document.querySelectorAll('.mobile__link')]

menuClose.addEventListener('click', () => {
    mobileNav.classList.remove('active');
})

menuOpen.addEventListener('click', () => {
    mobileNav.classList.add('active');
})

mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    })
})

getApiRef()
