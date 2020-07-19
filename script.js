const cardWrapper = document.querySelector('.card-wrapper')
const btnAdd = document.querySelector('.add-book')
const btnSubmit = document.querySelector('btn-submit')
const popup = document.querySelector('.popup')
const form = document.querySelector('form')
const btnClose = document.querySelector('.btn-close')
const trashIcon = document.querySelector('.trashIcon')
const containerWrapper = document.querySelector('container')
const cardIcon = document.querySelector('.card-icon')

let myLibrary = []

const togglePopup = () => popup.classList.toggle('none')

function Book(title, year, author, read) {
  this.title = title
  this.year = year
  this.author = author
  this.read = read
}

const render = ({ title, year, author, read }) => {
  let message
  if (read) {
    message = 'Read'
  } else {
    message = 'Not read yet.'
  }

  return `
  <div class="card">
      <img class="card-img" src="https://picsum.photos/200/300" alt="">
      <div class="card-about">
        <h2 class="title">${title}</h2>
        <h3 class="release-year">${year}</h3>
        <h2 class="author">${author}</h2>
      </div>
      <div class="card-bottom">
        <small>${message}</small>
        <img class="card-icon" src="icon/bookIcon.png" alt="">
      </div>
      <img src="icon/trashcan.png" class="trashIcon" alt="" srcset="">
  </div>
  `
}

const addBookToLibrary = (bookList, book) => bookList.push(book)

const showCards = () => {
  cardWrapper.innerHTML = ''
  myLibrary.forEach((currBook) => {
    cardWrapper.innerHTML += render(currBook)
  })
}

btnClose.addEventListener('click', (e) => {
  e.preventDefault()
  togglePopup()
})

btnAdd.addEventListener('click', (e) => {
  e.preventDefault()
  togglePopup()
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = form.title.value
  const year = form.releaseYear.value
  const author = form.author.value
  let read;
  if (form.radioRead.value === 'true') {
    read = true
  } else {
    read = false;
  }

  addBookToLibrary(myLibrary, new Book(title, year, author, read))
  showCards()
  form.reset()
})

cardWrapper.addEventListener('click', (e) => {
  e.preventDefault()
  if (e.target.classList.contains('trashIcon')) {
    myLibrary = [...myLibrary].filter((curr) => {
      let title = e.target.parentElement.querySelector('.title').textContent
      let author = e.target.parentElement.querySelector('.author').textContent
      let year = e.target.parentElement.querySelector('.release-year')
        .textContent
      // console.log(`${curr.title} !== ${title} && ${curr.author} !== ${author}`)

      if (curr.title === title && curr.author === author) {
        return false
      }
      return true
    })

    showCards()
  }
  if (e.target.classList.contains('card-icon')) {
    let title = e.target.parentElement.parentElement.querySelector('.title')
      .textContent
    let author = e.target.parentElement.parentElement.querySelector('.author')
      .textContent

    let obj = [...myLibrary].find(
      ({ title: currTitle, author: currAuthor }) => {
        return currTitle === title && currAuthor === author
      }
    )
    let index = [...myLibrary].indexOf(obj);

    if (myLibrary[index].read) {
      myLibrary[index].read = false;
    } else {
      myLibrary[index].read = true;
    }
    showCards()
  }
})
