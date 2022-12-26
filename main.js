// HTML elements
let elList = document.querySelector('.cotet')
let elTemplate = document.querySelector('#template').content
let num = document.querySelector('.num')
let elForm = document.querySelector('.form')
let elSelect = document.querySelector('select')
let elYear = document.querySelector('.year')
let elNamSearch = document.querySelector('.name')
let elRating = document.querySelector('.rating')
let elHighLow = document.querySelector('.high-low')
let elArray = document.querySelector('.alert')
let elArrayContent = document.querySelector('.strong')

// Render Movies
let slicedFilms = movies.slice(10, 1000)

let renderFilm = slicedFilms.map(someThing =>{
    return{
        title: someThing.Title.toString(),
        imageLink : `https://i.ytimg.com/vi/${someThing.ytid}/mqdefault.jpg`,
        categories : someThing.Categories,
        year : someThing.movie_year,
        rating : someThing.imdb_rating,
        ytLink : `https://www.youtube.com/watch?v=${someThing.ytid}`
    }
})

function renderFilms(filmsArray) {
 
    elList.innerHTML = null
    
    let elFragment = document.createDocumentFragment()

    let nmadur = filmsArray.forEach(film => {
        
        let templateDiv = elTemplate.cloneNode(true);

        templateDiv.querySelector(".image").src = film.imageLink;
        templateDiv.querySelector(".title").textContent = film.title;
        templateDiv.querySelector(".text3").textContent = film.categories.split('|').join(' ');
        templateDiv.querySelector('.text').textContent = film.year
        templateDiv.querySelector('.text2').textContent = film.rating
        templateDiv.querySelector('#btn').href = film.ytLink
        elFragment.appendChild(templateDiv)
    });
    elList.appendChild(elFragment)

    num.textContent = filmsArray.length
    if (filmsArray.length === 0) {
        elArray.classList.add('alert-danger')
        elArrayContent.textContent = 'Movies is not defined'
    }
    else{
        elArray.classList.remove('alert-danger')
        elArrayContent.textContent = 'Use the form on the left to search for a movie'
    }
}
renderFilms(renderFilm)

// Render Genres
function renderGenres(item) {
    
    let genresArray = []

    item.forEach(some =>{
        let normalizedGanres = some.categories.split('|')

        normalizedGanres.forEach(any =>{
            if (!genresArray.includes(any)) {
                genresArray.push(any)
            }
        })
    })
    genresArray.sort()

    let elFragmentOption = document.createDocumentFragment()
    genresArray.forEach(genres =>{

        let elOption = document.createElement('option')
        elOption.value = genres
        elOption.textContent = genres
        elFragmentOption.appendChild(elOption)
    })
    elSelect.appendChild(elFragmentOption)
}
renderGenres(renderFilm)

let searchMovies = function (moviesTitle, moviesRating, moviesCategories) {
    
    return renderFilm.filter(item => {
        let matchCategories = moviesCategories === 'All' || item.categories.includes(moviesCategories)

        return item.title.match(moviesTitle) && item.rating >= moviesRating && matchCategories
    })

}
console.log(searchMovies('Forever', 6, 'Drama'));

elForm.addEventListener('input', function(evt){
    evt.preventDefault()

    let selectValue = elSelect.value
    let searchValue = elYear.value.trim()
    let ratingValue = elRating.value.trim()
    let highlowValue = elHighLow.value

    let pattern = new RegExp(searchValue, 'gi')
    let result = searchMovies(pattern, ratingValue, selectValue)

    if (highlowValue === 'high') {
        result.sort((b, a) => a.rating - b.rating)
    }
    if (highlowValue === 'low') {
        result.sort((a, b) => a.rating - b.rating)
        
    }
    renderFilms(result)
})
