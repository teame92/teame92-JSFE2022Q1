const popup = document.querySelector('.popup')
const btnPopup = document.querySelector('.btn-round__popup')
const cards = document.querySelectorAll('.card a')

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

const burgerBtn = document.querySelector('.burger')
burgerBtn.addEventListener('click', (e) => {
    burgerBtn.classList.toggle('burger__click')
})