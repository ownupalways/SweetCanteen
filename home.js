// Animating modalBox
const textInsideCloseBtn = document.querySelector('.textInsideCloseBtn')
let landingTextPage = document.querySelector('.landing-page-text')
let textInside = document.querySelector('.textInside')


window.onload = () => {
    landingTextPage.style.scale = '1'
    textInside.style.left = '0'
}


textInsideCloseBtn.addEventListener('click', () => {
    textInside.style.left = '-100%' 
    textInside.style.transitionDelay = '0ms'
        landingTextPage.style.transitionDelay = '300ms'
        landingTextPage.style.scale = '0'
})
