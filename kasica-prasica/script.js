import sekcijeData from './data.js'
import {upisRacuna} from './table.js'


if(!localStorage.getItem('sekcijeData')) {
    localStorage.setItem('sekcijeData', JSON.stringify(sekcijeData))
}

const sekcije = JSON.parse(localStorage.getItem('sekcijeData'))

const aside = document.querySelector('aside')
const asideToggler = document.querySelector('aside > i')
asideToggler.onclick = () => {
    aside.classList.toggle('visible')
}

const adder = document.getElementById('add-section')

const dodavanjeForma = document.getElementById('add-section-form')

adder.onclick = () => {
    dodavanjeForma.style.display= 'flex'
}

document.querySelector('#add-section-form form').onsubmit = (e) => {
    e.preventDefault()
    dodavanje()
}


const closeArticle = document.getElementById('close-article')
closeArticle.onclick = () => dodavanjeArtiklaForma.style.display = 'none'

const closeSekcija = document.getElementById('close-section')
closeSekcija.onclick = () => dodavanjeForma.style.display = 'none'



const artikliContainer = document.querySelector('.artikli')
const specificniArtikli = document.getElementById("artikli-specificno")

const dodavanje = () => {
    const ikonicaSekcije = document.getElementById('section-icon')
    const imeSekcije = document.getElementById('section-name')
    const bojaSekcije = document.getElementById('section-color')

    sekcije.push({ikonica: ikonicaSekcije.value, ime: imeSekcije.value, boja: bojaSekcije.value, artikli: []})

    localStorage.setItem('sekcijeData', JSON.stringify(sekcije))

    ikonicaSekcije.value = ''
    imeSekcije.value = ''
    bojaSekcije.value = ''

    dodavanjeForma.style.display = 'none'

    artikliContainer.innerHTML = dodavanjeDOM().join('')
    specificniArtikli.innerHTML = dodavanjeArtikala().join('')

    neZnamSto()
    dodavanjeCSS()
}

const proveraIkonice = (ime) => {
    if(ime.ikonica != ''){
        return `<i class="${ime.ikonica}"></i>`
    } else {
        return ''
    }
}

const dodavanjeDOM = () => {
    return sekcije.map(element => {
        return `
        <div class ="${element.ime.toLowerCase().replace(' ', '-').replace('.','')}">
            ${proveraIkonice(element)}
            <span>${element.ime}</span>
            <i class="fa-solid fa-x remove remove-section"></i>
        </div>`
    })

}

const dodavanjeArtikala = () => {
    return sekcije.map(element => {
        return `
        <div id = "${element.ime.toLowerCase().replace(' ', '-').replace('.','')}">
            ${dodavanjeSvihArtikala(element.artikli).join('')}
        </div>
        `
    })
}

const dodavanjeSvihArtikala = (element) => {
    return element.map(e => {
        return `
            <div>
                <div class = "specificno-ime">${e.ime}</div>
                <div class = "specificno-cena">${e.cena}</div>
                <i class="fa-solid fa-x remove remove-element"></i>
            </div>
        `
    })
}

const removeItems = document.getElementById('remove-items')

removeItems.onclick = () => {
    const removeItemsIcon = document.querySelectorAll('.remove')
    removeItemsIcon.forEach(icon => icon.classList.toggle('visible'))

    const sviArtikliPosebno = document.querySelectorAll('#artikli-specificno > div > div')
    sviArtikliPosebno.forEach(artikl => artikl.classList.toggle('disabled'))

    const sveSekcije = document.querySelectorAll('.artikli > div')
    sveSekcije.forEach(sekcija => sekcija.classList.toggle('disabled'))

    const removeSectionItem = document.querySelectorAll('.remove-section')
    removeSection(removeSectionItem)
    const removeArticleItem = document.querySelectorAll('.remove-element')
    removeArticle(removeArticleItem)

}

const removeSection = (removeSectionItem) => {
    removeSectionItem.forEach(item => {
        item.onclick = () => {
            const imeItema = item.parentElement.querySelector('span').innerText
            sekcije.forEach(sekcija => {
                if(sekcija.ime == imeItema) {
                    const index = sekcije.indexOf(sekcija)
                    sekcije.splice(index, 1)
                    artikliContainer.innerHTML = dodavanjeDOM().join('')
                    specificniArtikli.innerHTML = dodavanjeArtikala().join('')
                    localStorage.setItem('sekcijeData', JSON.stringify(sekcije))

                    dodavanjeCSS()
                    neZnamSto()
                }
            })
        }
    })
}

const removeArticle = (removeArticleItem) => {
    removeArticleItem.forEach(item => {
        item.onclick = () => {
            const imeItema = item.parentElement.querySelector('.specificno-ime').innerText
            sekcije.forEach(sekcija => {
                sekcija.artikli.forEach(artikl => {
                    if(artikl.ime == imeItema){
                        const idTranslate = document.querySelector('#artikli-specificno > .visible').getAttribute('id')
                        const classTranslate = document.querySelector('.artikli > .selected').getAttribute('class').split(' ')[0]

                        const index = sekcija.artikli.indexOf(artikl)
                        sekcija.artikli.splice(index, 1)

                        artikliContainer.innerHTML = dodavanjeDOM().join('')
                        specificniArtikli.innerHTML = dodavanjeArtikala().join('')

                        localStorage.setItem('sekcijeData', JSON.stringify(sekcije))


                        document.getElementById(idTranslate).classList.add('visible')
                        document.querySelector(`.artikli > .${classTranslate}`).classList.add('selected')
                        dodavanjeCSS()
                        neZnamSto()
                        upisRacuna()
                    }
                })
            })
        }
    })
}




artikliContainer.innerHTML = dodavanjeDOM().join('')
specificniArtikli.innerHTML = dodavanjeArtikala().join('')

const dodavanjeCSS = () => {
    const artikli = document.querySelectorAll(".artikli > div")
    const specificniArtikliSvi = document.querySelectorAll("#artikli-specificno > div")
    
    for(let i = 0; i < artikli.length; i++){
        artikli[i].style.setProperty('--article-accent', sekcije[i].boja)
        specificniArtikliSvi[i].style.setProperty('--article-accent', sekcije[i].boja)
    }
}

dodavanjeCSS()

const neZnamSto = () => {
    const artikli = document.querySelectorAll(".artikli > div")
    const specificniArtikliSvi = document.querySelectorAll("#artikli-specificno > div")

    
    artikli.forEach(artikl => {
        artikl.onclick = () => {
            artikli.forEach(item => {
                item.classList.remove('selected')
            })
            
            const imeArtikla = artikl.getAttribute('class').split(' ')[0]
            artikl.classList.add('selected')
            
            const specificniArtikliVisible = specificniArtikli.querySelector("#" + imeArtikla)
            specificniArtikliSvi.forEach(item => item.classList.remove('visible'))
            specificniArtikliVisible.classList.add('visible')

            addArtiklSkrivac()
            upisRacuna()
        }
    })
}

neZnamSto()



const addArtikl = document.getElementById('add-article')

const dodavanjeArtiklaForma = document.getElementById('add-article-form')

document.querySelector('#add-article-form form').onsubmit = (e) => {
    e.preventDefault()
    dodavanjeArtiklaSekcija()
}

const addArtiklSkrivac = () => {
    const proveraSelektovanog = document.querySelector('.selected')
    if(proveraSelektovanog == null) {
        addArtikl.style.display = 'none'
    } else {
        addArtikl.style.display = 'block'
    }
}

addArtiklSkrivac()

addArtikl.onclick = () => {
    dodavanjeArtiklaForma.style.display = "flex"
}

const dodavanjeArtiklaSekcija = () => {
    const potrebnaSekcija = artikliContainer.querySelector('.selected > span').innerText
    sekcije.forEach(element => {
        if(potrebnaSekcija == element.ime) {
            dodavanjeArtiklaJednog(element)
            specificniArtikli.innerHTML = dodavanjeArtikala().join('')
            dodavanjeCSS()
            neZnamSto()
            upisRacuna()
            localStorage.setItem('sekcijeData', JSON.stringify(sekcije))

            const specificniArtikliVisible = specificniArtikli.querySelector("#" + potrebnaSekcija.toLowerCase().replace(' ', '-').replace('.',''))
            specificniArtikliVisible.classList.add('visible')
        }
        
        dodavanjeArtiklaForma.style.display = 'none'
    })
}

const dodavanjeArtiklaJednog = (element) => {
    const imeArtiklaDodavanje = document.getElementById('artikl-ime')
    const cenaArtiklaDodavanje = document.getElementById('artikl-cena')
    element.artikli.push({ime: imeArtiklaDodavanje.value, cena: cenaArtiklaDodavanje.value})

    imeArtiklaDodavanje.value = ''
    cenaArtiklaDodavanje.value = ''
}





