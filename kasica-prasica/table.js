import dataStolovi from './dataStolovi.js'

if(!localStorage.getItem('dataStolovi')) {
    localStorage.setItem('dataStolovi', JSON.stringify(dataStolovi))
}

const stoloviObject = JSON.parse(localStorage.getItem('dataStolovi'))

stoloviObject.forEach(sto => {
    sto.id = ''
})
localStorage.setItem('dataStolovi', JSON.stringify(stoloviObject))

const glavniDeo = document.getElementById('glavni')
const porudzbina = document.getElementById('nova-porudzbina')
const sviStolovi = document.getElementById('pregled-stolovi')
const izlaz = document.getElementById('izlaz-stolovi')

porudzbina.onclick = () => {
    glavniDeo.setAttribute('hidden', 'hidden')
    sviStolovi.removeAttribute('hidden', 'hidden')
}

izlaz.onclick = () => {
    sviStolovi.setAttribute('hidden', 'hidden')
    glavniDeo.removeAttribute('hidden', 'hidden')
}

const stolovi = document.querySelector('.astali')





const stoloviDonji = document.getElementById('stolovi')

const provera = (brojVecegStola, sviDonjiStolovi) => {
    sviDonjiStolovi.forEach(donjiSto => {
        donjiSto.removeAttribute('id')
        const brojDonjegStola = donjiSto.querySelector('.broj-stola').innerText
        if(brojDonjegStola == brojVecegStola) {
            donjiSto.setAttribute('id', 'manji-selected')
        }
    })
}

const stoloviClick = (astali) => {

    astali.forEach(astal => {
        astal.onclick = () => {
            sviStolovi.setAttribute('hidden', 'hidden')
            glavniDeo.removeAttribute('hidden', 'hidden')

            const targetedSto = astal.querySelector('.ime-stola').innerHTML

            stoloviObject.forEach(sto => {
                sto.id = ''
                if(targetedSto == sto.ime) {
                    sto.id = 'selected-table'
                    sto.class = 'zauzet'
                    console.log(stoloviObject)
                    localStorage.setItem('dataStolovi', JSON.stringify(stoloviObject))
                }
            })

            
            const nazivStola = document.getElementById('naziv-stola')
            const brojStola = astal.querySelector('.ime-stola').innerHTML
    
            nazivStola.innerText = `Sto: ${brojStola}`

            pravljenjeStola()
            stolovi.innerHTML = pravljenjeStola().join('')

    
            pravljenjeMalih()
            stoloviDonji.innerHTML = pravljenjeMalih().join('')

            const sviDonjiStolovi = stoloviDonji.querySelectorAll('.sto')
            provera(brojStola, sviDonjiStolovi)
           
            
            const bitanAstal = document.getElementById('selected-table')
            upisMalaFunkcija(bitanAstal)
            
            const astali = sviStolovi.querySelectorAll('.astali > .sto-posebno')
            

            stoloviClick(astali)
            
    
        }

        pravljenjeMalih()

        
    })

    const sviMaliStolovi = stoloviDonji.querySelectorAll('.sto')
    sviMaliStolovi.forEach(maliSto => {
        maliSto.onclick = () => {
            sviMaliStolovi.forEach(maliStocic => {
                maliStocic.removeAttribute('id')
            })

            maliSto.setAttribute('id', 'manji-selected')

            const imeStola = maliSto.querySelector('.broj-stola').innerHTML
            const nazivLevo = document.getElementById('naziv-stola')
            nazivLevo.innerText = `Sto: ${imeStola}`

            manjaProvera(imeStola)

            const bitanAstal = document.getElementById('selected-table')
            upisMalaFunkcija(bitanAstal)
            
        }
        
    })

}

const pravljenjeStola = () => {
    return stoloviObject.map(sto => {
        return `
        <div class="sto-posebno ${sto.class}" id="${sto.id}">
            <i class="fa-solid fa-square"></i>
            <div class="ime-stola">${sto.ime}</div>
        </div>`
    })

}

const pravljenjeMalih = () => {
    return stoloviObject.map(sto => {
        if(sto.class == 'zauzet') {
            return`<div class="sto">
                        <i class="fa-solid fa-chair"></i>
                        <div class="broj-stola">${sto.ime}</div>
                    </div>`
        } 
    })
}


stolovi.innerHTML = pravljenjeStola().join('')
stoloviDonji.innerHTML = pravljenjeMalih().join('')

const astali = sviStolovi.querySelectorAll('.astali > .sto-posebno')
stoloviClick(astali)

const manjaProvera = (maliSto) => {
    stoloviObject.forEach(sto => {
        sto.id = ''
        if(sto.ime == maliSto){
            sto.id = 'selected-table'
        }

        localStorage.setItem('dataStolovi', JSON.stringify(stoloviObject))


        pravljenjeStola()
        stolovi.innerHTML = pravljenjeStola().join('')

        const astali = sviStolovi.querySelectorAll('.astali > .sto-posebno')
        stoloviClick(astali)
    })
}




const sabiranje = () => {
    const zbirSvih = document.getElementById('zbir') 
    const ceneArtikala = document.querySelectorAll('#racun-cene .cena-artikla')
    
    let zbir = 0
    ceneArtikala.forEach(artikl => {
        zbir += Number(artikl.innerHTML)
    })

    zbirSvih.innerHTML = zbir
}

const upisRacuna = () => {
    const sviArtikliPosebno = document.querySelectorAll('#artikli-specificno > div > div')

    sviArtikliPosebno.forEach(artikl => {
        artikl.onclick = () => {
            if(artikl.classList.contains('disabled')) {
                return
            }
            const bitanAstal = document.getElementById('selected-table')

            const imeArtikla = artikl.querySelector('.specificno-ime').innerText
            const cenaArtikla = artikl.querySelector('.specificno-cena').innerText
            
            upisObjekat(bitanAstal, imeArtikla, cenaArtikla)

        }
    })
}

upisRacuna()

const upisObjekat = (bitanAstal, imeArtikla, cenaArtikla) => {
    if(!bitanAstal){
        return
    }
    const stoZaUpis = bitanAstal.querySelector('.ime-stola').innerText
    stoloviObject.forEach(sto => {
        if(sto.ime == stoZaUpis){
            console.log(sto.racun)
            if(sto.racun.length == 0) {
                console.log('lala');
                sto.racun.push({ime: imeArtikla, cena: cenaArtikla, kolicina: 1})
                localStorage.setItem('dataStolovi', JSON.stringify(stoloviObject))
                return

            } else {
                if(articleChecker(sto, imeArtikla).includes(true)) {
                    sto.racun.forEach(artikl => {
                        if(artikl.ime == imeArtikla){
                            artikl.kolicina ++
                        }
                    })
                } else {
                    sto.racun.push({ime: imeArtikla, cena: cenaArtikla, kolicina: 1})

                }

            } 


            localStorage.setItem('dataStolovi', JSON.stringify(stoloviObject))
        }

        upisMalaFunkcija(bitanAstal)
    })
}

const articleChecker = (sto, imeArtikla) => {
    return sto.racun.map(item => {
        if(item.ime.includes(imeArtikla)) {
            return true
        } else {
            return false
        }
    })
}

const upisMalaFunkcija = (bitanAstal) => {
    if(!bitanAstal){
        return
    }
    const stoProvera = bitanAstal.querySelector('.ime-stola').innerText
    stoloviObject.forEach(sto => {
        if(sto.ime == stoProvera){
            const racunCene = document.getElementById('racun-cene')
            const zaUpis = sto.racun.map(artikl => {
                return `<div class="artikl-cena">
                    <div class="ime-artikla">${artikl.ime}</div>
                    <div class="kolicina-artikla">x${artikl.kolicina}</div>
                        <div class="cena-artikla">${mnozenje(artikl)}</div>
                        <div class="delete-item"><i class="fa-solid fa-x"></i></div>
                    </div>`
            })
            racunCene.innerHTML = zaUpis.join('')
            sabiranje()
            deleteListItem()
        }
    })
}

const mnozenje = (artikl) => {
    return artikl.kolicina * artikl.cena
}

const deleteTable = document.getElementById('delete-table')

deleteTable.onclick = () => {
    stoloviObject.forEach(sto => {
        if(sto.id == 'selected-table') {
            sto.id = ''
            sto.class = ''
            sto.racun = []

            const racunCene = document.getElementById('racun-cene')
            racunCene.innerHTML = ''

            
            pravljenjeStola()
            stolovi.innerHTML = pravljenjeStola().join('')
            
            pravljenjeMalih()
            stoloviDonji.innerHTML = pravljenjeMalih().join('')
            
            const astali = sviStolovi.querySelectorAll('.astali > .sto-posebno')
            stoloviClick(astali)
            sabiranje()
        
            const nazivStola = document.getElementById('naziv-stola')
            nazivStola.innerText = 'Ime Stola'

            localStorage.setItem('dataStolovi', JSON.stringify(stoloviObject))

        }
    })

}

const deleteListItem = () => {
    const racun = document.querySelectorAll('#racun-cene > .artikl-cena')

    racun.forEach(item => {
        const deleteItem = item.querySelector('.delete-item')
        deleteItem.onclick = () => {
            const itemZabrisanje = item.querySelector('.ime-artikla').innerText
            console.log('lalal');
            stoloviObject.forEach(item => {
                item.racun.forEach(artikl => {
                    if(artikl.ime == itemZabrisanje) {
                        if(artikl.kolicina > 1) {
                            artikl.kolicina --
                        } else {
                            const index = item.racun.indexOf(artikl)
                            item.racun.splice(index, 1)
                        }

                        const bitanAstal = document.getElementById('selected-table')
                        upisMalaFunkcija(bitanAstal)

                        localStorage.setItem('dataStolovi', JSON.stringify(stoloviObject))
                    }
                })
            })

        }
    })
}

export {upisRacuna}