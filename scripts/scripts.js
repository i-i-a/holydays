
const buttonMen = document.querySelector('.header__button-gender--men');
const buttonWomen = document.querySelector('.header__button-gender--women');
const cardImage = document.querySelector('.card__image');
const cardText = document.querySelector('.card__text');
const buttonText = document.querySelector('.header__button-change--text');
const buttonImage = document.querySelector('.header__button-change--image')

const state = {
  gender: document.body.classList.contains('women') ? 'women' : 'men'
};



const getRandomForArr = (arr) => {
  const randomNumber = Math.floor(Math.random() * arr.length)
  //console.log('randomNumber: ', randomNumber);

  return arr[randomNumber]
}
const getData = () => fetch('db.json').then(response => response.json())

const changeDOM = () => {
  if (state.photo.includes('black')) {
    cardText.style.color = '#fff'
  } else {
    cardText.style.color = ''
  }

  cardImage.src = `image/${state.photo}`
  cardText.innerHTML = state.text.replaceAll('\n', '<br>')
}


const getDataToCard = () => {
  getData().then(data => {
    state.text = getRandomForArr(data.text[state.gender])
    state.photo = getRandomForArr(data.photo[state.gender])
    //*
    //
    changeDOM()
  })

}
//let gender = 'women';

const changeToMen = () => {
  if (state.gender !== 'men') {
    document.body.classList.add('men');
    document.body.classList.remove('women');
    state.gender = 'men';
    getDataToCard()
  }

}

const changeToWomen = () => {
  if (state.gender !== 'women') {
    document.body.classList.add('women');
    document.body.classList.remove('men');
    state.gender = 'women';
    getDataToCard()
  }
}

const changeText = () => {
  getData().then(data => state.text = getRandomForArr(data.text[state.gender]))
  //cardText.innerHTML = state.text.replaceAll('\n', '<br>')
  //*
  //
  changeDOM()
}

const changeImage = () => {
  // getData().then(data => state.photo = getRandomForArr(data.text[state.gender]))
  // cardImage.src = `image/${state.photo}`

  getData().then(data => {

    state.photo = getRandomForArr(data.photo[state.gender])

    // if (state.photo.includes('black')) {
    //   cardText.style.color = '#fff'
    // } else {
    //   cardText.style.color = ''
    // }


    // cardImage.src = `image/${state.photo}`

    changeDOM()

  })

}



buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', changeToWomen);
buttonText.addEventListener('click', changeText)
buttonImage.addEventListener('click', changeImage)

getDataToCard()

const cardWrapper = document.querySelector('.card__wrapper')

cardWrapper.addEventListener('dblclick', () => {
  const newWindow = window.open(
    '',
    '',
    `width=840, 
    height=520, 
    top=${(screen.height) / 2 - 520 / 2}, 
    left = ${(screen.width) / 2 - 840 / 2}
    `)
  html2canvas(cardWrapper).then(canvas => {
    canvas.style.maxWidth = '100%'
    canvas.style.height = 'auto'

    newWindow.document.body.append(canvas)
  })
})