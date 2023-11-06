const token = '2042457329462326'
const apiUrl = `https://superheroapi.com/api.php/${token}`

const getHero = async (url) => {
  const response = await fetch(`${apiUrl}/${url}`)
  const data = await response.json()
  return data
}

const randomButton = document.getElementById('randomHeroButton')

const randomHero = async () => {
  const randomNumber = Math.floor(Math.random() * 731)
  const heroData = await getHero(randomNumber)
  heroDetails(heroData)
}

randomButton.onclick = () => randomHero()

const searchButton = document.getElementById('search')

const searchedHero = async () => {
  const heroSearchName = document.getElementById('heroSearch').value
  const searched = `search/${heroSearchName}`
  try { 
    const heroData = await getHero(searched)
    const data = heroData.results[0]
    heroDetails(data)
  } catch {
    heroImage.innerHTML = '<div class="placeholder-wave bg-light bg-opacity-25"></div>'
    heroStats.innerHTML = ''
    placeholder()
    heroName.innerText = "This hero doesn't exist"
  }
  
}

searchButton.onclick = () => searchedHero()

const heroImage = document.getElementById('heroImg')
const heroStats = document.getElementById('heroStats')
const heroName = document.getElementById('heroName')

const heroDetails = (data) => {
  heroImage.innerHTML = `<div class="ratio ratio-16x9"><img src="${data.image.url}"></div>`
  heroStats.innerHTML = allStats(data)
  heroName.innerText = data.name
}

const allStats = (hero) => {
  const stats = Object.keys(hero.powerstats).map(stat => {
    return `<p class="py-2 px-0 col-12 col-sm-6 col-md-4 col-lg-12">${stat}: ${hero.powerstats[stat]}</p>`
  })
  return stats.join('')
}

randomHero()

const placeholder = () => {
  let i = 0
  do {
    heroStats.innerHTML += '<p class="placeholder-wave bg-light placeholder-lg bg-opacity-25 w-75 mx-auto"></p>'
    i++
  } while(i < 6) 
}