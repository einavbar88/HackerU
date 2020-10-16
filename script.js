const htmlPage = document.querySelector('html')
const navMenusBtns = document.getElementsByClassName('nav-menu')
const dropdowns = document.getElementsByClassName('dropdown')
const mobileNavIcon = document.getElementById('nav-icon')
const fadeInAnimationItems = document.querySelectorAll('.fade')
const slideInAnimationItems = document.querySelectorAll('.slide')
const mobileNavIconLines = document.querySelectorAll('.icon')
const exitBackdropWelcomeCircle = document.querySelector('.x')

////exit welcome screen
exitBackdropWelcomeCircle.addEventListener('click', ()=>{
    document.querySelector('.backdrop').style.display = 'none'
})

////slide animation
window.addEventListener('load', initializeSlide)
window.addEventListener('scroll', initializeSlide)


////fade animation event listener
for (let i = 0; i < fadeInAnimationItems.length; i++) {
    applyFadeAnimations(fadeInAnimationItems[i])
    window.addEventListener('scroll', () => {
        applyFadeAnimations(fadeInAnimationItems[i])
    })
}
////remove drop down event listener
for (let i = 0; i < navMenusBtns.length; i++) {
    navMenusBtns[i].addEventListener('click', () => {
        showDropdown(dropdowns[i])
        htmlPage.addEventListener('click', removeDropdown, true)
    })
}
////contact checkbox check/uncheck
document.getElementById('contact-policy-checkbox-label').addEventListener('click', () => {
    document.getElementById('contact-policy-checkbox').checked = !document.getElementById('contact-policy-checkbox').checked
})
///mobile nav open/close
mobileNavIcon.addEventListener('click', () => {
    let list = document.getElementById('nav-bar-items')
    if (list.style.display === 'block') {
        list.style.display = 'none'
        for (let i = 0; i < 3; i++) {
            mobileNavIconLines[i].classList.add('animation-nav-icon-flipback' + (i + 1))
            mobileNavIconLines[i].classList.remove('animation-nav-icon-flip' + (i + 1))
        }
    }
    else if (list.style.display === 'flex')
        return
    else {
        list.style.display = 'block'
        for (let i = 0; i < 3; i++) {
            mobileNavIconLines[i].classList.add('animation-nav-icon-flip' + (i + 1))
            mobileNavIconLines[i].classList.remove('animation-nav-icon-flipback' + (i + 1))
        }
    }
})

function removeDropdown() {
    for (let dropdown of dropdowns)
        dropdown.style.display = 'none'
    htmlPage.removeEventListener('click', removeDropdown, true)
}
function showDropdown(dropdown) {
    let screenSize = window.getComputedStyle(htmlPage).getPropertyValue('width')
    screenSize = screenSize.slice(0, screenSize.length - 2)
    if (Number(screenSize) > 1060)
        dropdown.style.display = 'flex'
    else
        dropdown.style.display = 'block'
}

function isElemInView(elem) {
    const vh = (window.innerHeight || document.documentElement.clientHeight)
    let position = elem.getBoundingClientRect()
    if (position.top <= vh)
        if (position.bottom - 75 > 0)
            return true
    return false
}

function applyFadeAnimations(item) {
    if (item != null && isElemInView(item)) {
        item.classList.add('animation-fade-in')
        item.classList.remove('fade')
    }
}

function initializeSlide() {
    if (isElemInView(slideInAnimationItems[0]))
        slide(0)
}

function slide(i) {
    if (i === 4)
        return
    slideInAnimationItems[i].classList.add('animation-slide-in')
    slideInAnimationItems[i].addEventListener('animationend', () => {
        slideInAnimationItems[i].classList.remove('slide')
        slide(i + 1)
    })
}

