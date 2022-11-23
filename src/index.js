console.log('%c HI', 'color: firebrick')


//const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

const dogImageContainer = document.getElementById('dogImageContainer')
const dogBreedsContainer = document.getElementById('dogBreeds')

fetch("https://dog.ceo/api/breeds/image/random/4")
.then(resp => resp.json())
.then(el => addDogImg(el))


function addDogImg(el){
    el.message.forEach(el => {
        let newImg = document.createElement('img')
        newImg.src = el
        dogImageContainer.appendChild(newImg)
    }) 
}

let breeds = {}

fetch('https://dog.ceo/api/breeds/list/all')
.then(resp => resp.json())
.then(el =>{
    breeds = Object.keys(el.message)
    updateBreedList(breeds)
    addEventListenerToDropDown()
})

function updateBreedList(breeds){
    let ul = document.querySelector('#dogBreeds')
    removeDogNames(ul)
    breeds.forEach(breed => addDogName(breed))
}

function addDogName(el){
        let newLi = document.createElement('li')
        newLi.classList.add('dog')
        newLi.textContent = el
        dogBreedsContainer.appendChild(newLi)

    addEventListenerToDog()
}

function addEventListenerToDog(){
    document.querySelectorAll('.dog').forEach(el => {
        el.addEventListener('click', changeColor)
    })
}

function changeColor(event){
    if(event.target.style.color === 'red'){
        event.target.style.color = 'black'
    }else{
        event.target.style.color = 'red'
    }
}

const dropDown = document.getElementById('breed-dropdown')

function addEventListenerToDropDown(el){
    dropDown.addEventListener('change', (event) => {
        filterByLetter(event.target.value)
    })
}

function removeDogNames(el){
    let child = el.lastElementChild
    while (child) {
        el.removeChild(child)
        child = el.lastElementChild
    }
}

function filterByLetter(letter){
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)))
}

 