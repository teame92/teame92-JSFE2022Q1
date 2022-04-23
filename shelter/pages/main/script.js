const popup = document.querySelector('.popup')
const btnPopup = document.querySelector('.btn-round__popup')
const cards = document.querySelectorAll('.cards__slider')
const burgerBtn = document.querySelector('.burger')
const body = document.querySelector('.body')
const logo = document.querySelector('.header__inner .logo')
const header = document.querySelector('.header')
const headerInner = document.querySelector('.header__inner').cloneNode(true)

cards.forEach((v) => {
    v.addEventListener('click', (e) => {
        e.preventDefault()
        popup.classList.add('popup-open')
    })
})

popup.addEventListener('click', (e) => {
    if (!e.target.closest('.popup__body')) {
        popup.classList.remove('popup-open')
    } else if (e.target.closest('.btn-round__popup')) {
        popup.classList.remove('popup-open')
    }
})

popup.addEventListener('mouseover', (e) => {
    if (!e.target.closest('.popup__body')) {
        btnPopup.classList.add('popup__btn')
    } else {
        btnPopup.classList.remove('popup__btn')
    }
})


// burger

let modalOpen = false
const div = document.createElement('div');
div.classList.add('burger__section')
div.insertAdjacentHTML('afterbegin', `<div class="burger__wrapper"></div>`);
div.firstElementChild.append(headerInner);

function burgerOpen() {
    modalOpen = true
    header.append(div)
    burgerBtn.classList.add('burger__click')
    body.classList.add('scroll')
    logo.classList.add('logo__hidden')
    document.querySelector('.burger__section').classList.add('burger__section-visible')
    setTimeout(() => {
            document.querySelector('.burger__wrapper').classList.add('burger__wrapper-open')
        },
        0
    )
}

function burgerClose() {
    modalOpen = false
    burgerBtn.classList.remove('burger__click')
    body.classList.remove('scroll')
    logo.classList.remove('logo__hidden')
    setTimeout(() => {
            document.querySelector('.burger__section').classList.remove('burger__section-visible')
        },
        0
    )

    document.querySelector('.burger__wrapper').classList.remove('burger__wrapper-open')
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.burger') && !modalOpen) {
        burgerOpen()
    } else if (!e.target.closest('.burger__wrapper') || e.target.closest('.navbar__link')) {
        burgerClose()
    }
})

window.matchMedia('(min-width: 768px)').addListener((e) => {
    if (modalOpen) {
        burgerClose()
    }
})