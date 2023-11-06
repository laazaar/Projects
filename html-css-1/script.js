const navigation = document.getElementById('navigation')
const slika = document.getElementById('nav-logo')
const toTop = document.getElementById('toTop')


window.onscroll = scrollingFunction = () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        navigation.classList.add('scrolling');
        slika.src = 'slike/logo-all-dark.png'
        toTop.removeAttribute('hidden')
    } else {
        navigation.classList.remove('scrolling')
        slika.src = 'slike/logo.png'
        toTop.setAttribute('hidden', '')
    }
}

const mala = document.getElementById('mala-navigacija')
const malaSlider = document.querySelector('#mala-navigacija .slider')
const malaBlack = document.querySelector('#mala-navigacija .black')

const malaHidden = () => {
    mala.setAttribute('hidden', '')
}

const malaShow = () => {
    malaSlider.style.transform = 'translateX(0)'
    malaBlack.style.opacity = '0.6'
}

const malaNavigacija = () => {
    mala.removeAttribute('hidden', '')
    setTimeout(malaShow, 0)
}

const closeNav = () => {
    malaBlack.style.opacity = '0'
    malaSlider.style.transform = 'translateX(-100%)'
    setTimeout(malaHidden, 400)
}



const aboutNav = document.getElementById('about-nav')
const tabList = aboutNav.querySelector('ul')
const tabButton = tabList.querySelectorAll('li')
const tabOpis = aboutNav.querySelectorAll('.opis')

tabList.addEventListener('click', (clicked) => {
    clicked.preventDefault()
})

tabButton.forEach((tab, index) => {
    if (index === 0) {
        tab.classList.add('active')
    } else {
        tabOpis[index].setAttribute('hidden', '')
    }
})

tabButton.forEach((tab) => {
    tab.onclick = () => {
        tabButton.forEach((tab) => tab.classList.remove('active'))
        tab.classList.add('active')

        tabOpis.forEach((opis) => {
            opis.setAttribute('hidden', '')
        })

        const activeTab = tab.querySelector('a')
        const activeTabId = activeTab.getAttribute('href')
        const activeOpis = aboutNav.querySelector(activeTabId)

        activeOpis.removeAttribute('hidden')
        
    }
})

const anchors = document.querySelectorAll('a[href^="#"]')

anchors.forEach(anchor => {
    anchor.onclick = (e) => {
        e.preventDefault()
        const toSection = anchor.getAttribute('href')
        if(toSection == '#') {
            window.scrollTo({top: 0})
        }
        const section = document.querySelector(toSection)
        section.scrollIntoView()

    }
})

// const home = document.getElementById('HomeLink')
// home.classList.add('in-frame')

// window.addEventListener('scroll', (event) => {

//     const sections = document.querySelectorAll("main > div");
    
//     sections.forEach((section) => {
//         // console.log(section)
//         const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
//             const { top, left, bottom, right } = el.getBoundingClientRect();
//             const { innerHeight, innerWidth } = window;
//             return partiallyVisible
//               ? ((top > 0 && top < innerHeight) ||
//                   (bottom > 0 && bottom < innerHeight)) &&
//                   ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
//               : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
//           };

//         const allAnchor = navigation.querySelectorAll('a')

//         if (elementIsVisibleInViewport(section, true)) {
//             const itemHref = section.getAttribute('id')
//             const hrefValue = `[href = "#${itemHref}"]` 
//             const navId = navigation.querySelector(hrefValue)
            
//             allAnchor.forEach(anchor => anchor.classList.remove('in-frame'))
//             navId.classList.add('in-frame')
//             // ne znam zasto, ovo mora ovde da stoji da bi radilo kako treba
//             const nevidljiv = navigation.querySelectorAll('.in-frame')
//             nevidljiv.classList.remove('in-frame')
//         } else {
//             const prvi = navigation.querySelector('[href = "#About"]')
//             prvi.classList.remove('in-frame')
            
//         }
//         // ako dodam else onda sve puca i nece da radi

//     });
// });


document.addEventListener('DOMContentLoaded', function(){
    const home = document.getElementById('homeNav')
    home.classList.add('in-frame')
    // ovo je zbog strukture html-a, jer ti je prva sekcija u stvari drugi element u navigaciji 
    // ako se promeni struktura, treba promeniti i ovo, narocito n+2 deo
    const menuLinks = document.querySelectorAll("#navigation ul li:nth-child(n+2)");
    const sections = document.querySelectorAll("main > div");

    const makeActive = (link) => menuLinks[link].classList.add("in-frame");
    const removeActive = (link) => menuLinks[link].classList.remove("in-frame");
    const removeAllActive = () => [...Array(sections.length).keys()].forEach((link) => removeActive(link));

    // da se dobije active klasa 200px pre nego sto se stigne do sekcije,
    // vrati na 0 ili obrisi ako ti ne treba
    const sectionMargin = 100;
    let currentActive = 0;

    window.addEventListener("scroll", () => {
        
        const current = sections.length - [...sections].reverse().findIndex((section) => window.scrollY >= section.offsetTop - sectionMargin ) - 1
        current !== currentActive ? (removeAllActive(), currentActive = current, makeActive(currentActive), home.classList.remove('in-frame')) : null;
    });
}, false);