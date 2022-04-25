const popup = document.querySelector('.popup')
const btnPopup = document.querySelector('.btn-round__popup')
const cards = document.querySelector('.cards__slider')
const body = document.querySelector('.body')
const logo = document.querySelector('.header__inner .logo')
const burgerBtn = document.querySelector('.burger')
const header = document.querySelector('.header')
const headerInner = document.querySelector('.header__inner').cloneNode(true)
const imgPet = document.querySelector('.popup__img')
const nicknamePet = document.querySelector('.popup__title')
const typePet = document.querySelector('.popup__subtitle')
const descriptionPet = document.querySelector('.popup__text')
const listInfoPet = document.querySelectorAll('.popup__list span')



cards.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.closest('.card')) {
        let namePet = ''
        e.target.closest('.card').childNodes.forEach((v) => {
            if (v.className === 'card__title') {
                namePet = v.innerHTML
            }
        })
        const cardPet = pets.filter((v) => {
            if (v.name === namePet) {
                return v
            }
        })[0]
        imgPet.setAttribute('src', cardPet.img)
        imgPet.setAttribute('alt', `pet-${cardPet.name}`)
        nicknamePet.innerHTML = cardPet.name
        typePet.innerHTML = `${cardPet.type} - ${cardPet.breed}`
        descriptionPet.innerHTML = cardPet.description
        listInfoPet.forEach((v, i) => {
            if (i === 0) {
                v.innerHTML = cardPet.age
            } else if (i === 1) {
                v.innerHTML = cardPet.inoculations
            } else if (i === 2) {
                v.innerHTML = cardPet.diseases
            } else if (i === 3) {
                v.innerHTML = cardPet.parasites
            }
        })
        console.log(cardPet)
        popup.classList.add('popup-open')
        body.classList.add('scroll')
    }
})

popup.addEventListener('click', (e) => {
    if (!e.target.closest('.popup__body')) {
        popup.classList.remove('popup-open')
        body.classList.remove('scroll')
    } else if (e.target.closest('.btn-round__popup')) {
        popup.classList.remove('popup-open')
        body.classList.remove('scroll')
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

header.addEventListener('click', (e) => {
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

// slider 


function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let arrCards = []

for (let i = 0; i < 6; i++) {
    arrCards = arrCards.concat(pets)
}
let elementPage
let arrPetCards = []
if (document.body.clientWidth >= 1280) {
    for (let i = 0; i < 6; i++) {
        let fragment = arrCards.slice(i * 8, i * 8 + 8)
        shuffle(fragment)
        arrPetCards = arrPetCards.concat(fragment)
        elementPage = 6
    }
} else if (document.body.clientWidth >= 768) {
    for (let i = 0; i < 8; i++) {
        let fragment = arrCards.slice(i * 6, i * 6 + 6)
        shuffle(fragment)
        arrPetCards = arrPetCards.concat(fragment)
        elementPage = 8
    }
} else {
    for (let i = 0; i < 16; i++) {
        let fragment = arrCards.slice(i * 3, i * 3 + 3)
        shuffle(fragment)
        arrPetCards = arrPetCards.concat(fragment)
        elementPage = 16
    }
}


const sliderContainer = document.querySelector('.cards__slider')

function createCard(el) {
    const li = document.createElement('li')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const a = document.createElement('a')
    li.classList.add('card')
    img.classList.add('img__pet')
    p.classList.add('card__title')
    a.classList.add('btn')
    a.classList.add('btn-white')
    img.setAttribute('src', el.img)
    img.setAttribute('alt', `pet-${el.name}`)
    a.setAttribute('href', '#')
    p.innerHTML = el.name
    a.innerHTML = "Learn more"
    li.append(img)
    li.append(p)
    li.append(a)
    sliderContainer.append(li)
}

arrPetCards.forEach((e) => {
    createCard(e)
})


let slider = tns({
    container: '.cards__slider',
    mode: 'gallery',
    // axis: 'vertical',
    // items: 3,
    // edgePadding: 90,
    // fixedWidth: 270,
    // autoWidth: true,
    // slideBy: 3,
    prevButton: '.btn__prev',
    nextButton: '.btn__next',
    viewportMax: 990,
    nav: false,
    // controls: false,
    // center: true,
    // rewind: true,
    // mouseDrag: true,
    // swipeAngle: true,
    // loop: false,
    // disable: true,
    // preventActionWhenRunning: true,
    responsive: {
        1280: {
            items: 8,
            slideBy: 8,
        },
        768: {
            items: 6,
            slideBy: 6,
        },
        300: {
            items: 3,
            slideBy: 3,
        }
    },
});
const btnLastPage = document.querySelector('.btn__last')
const btnFirstPage = document.querySelector('.btn__first')
const btnNext = document.querySelector('.btn__next')
const btnPrev = document.querySelector('.btn__prev')
const curNumSlide = document.querySelector('.page')
let count = 1

function slideCountNext() {
    count++
    if (count === elementPage) {
        btnLastPage.setAttribute('disabled', 'disabled')
        btnNext.setAttribute('disabled', 'disabled')
    } else {
        btnFirstPage.removeAttribute('disabled', 'disabled')
        btnPrev.removeAttribute('disabled', 'disabled')
    }
    curNumSlide.innerHTML = `${count}`
}

function slideCountPrev() {
    count--
    if (count === 1) {
        btnFirstPage.setAttribute('disabled', 'disabled')
        btnPrev.setAttribute('disabled', 'disabled')
    } else {
        btnLastPage.removeAttribute('disabled', 'disabled')
        btnNext.removeAttribute('disabled', 'disabled')
    }
    curNumSlide.innerHTML = `${count}`
}
curNumSlide.innerHTML = `${count}`
btnNext.addEventListener('click', () => {
    slideCountNext()
})

btnPrev.addEventListener('click', () => {
    slideCountPrev()
})

btnFirstPage.onclick = function() {
    slider.goTo('first');
    count = 1

    btnFirstPage.setAttribute('disabled', 'disabled')
    btnPrev.setAttribute('disabled', 'disabled')

    btnLastPage.removeAttribute('disabled', 'disabled')
    btnNext.removeAttribute('disabled', 'disabled')

    curNumSlide.innerHTML = `${count}`
};
btnLastPage.onclick = function() {
    if (elementPage === 6) {
        slider.goTo(elementPage * 8 - 8);
    } else if (elementPage === 8) {
        slider.goTo(elementPage * 6 - 6)
    } else if (elementPage === 16) {
        slider.goTo(elementPage * 3 - 3)
    }
    count = elementPage

    btnLastPage.setAttribute('disabled', 'disabled')
    btnNext.setAttribute('disabled', 'disabled')

    btnFirstPage.removeAttribute('disabled', 'disabled')
    btnPrev.removeAttribute('disabled', 'disabled')

    curNumSlide.innerHTML = `${count}`
};


console.log(arrPetCards)