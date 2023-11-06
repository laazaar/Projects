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

const projects = document.querySelectorAll('#projects > div')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animation')
        } 
    })
})

projects.forEach((el) => observer.observe(el))

const aboutAnimation= document.querySelectorAll('#About-me .about-animation')

aboutAnimation.forEach((el) => observer.observe(el))

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


const goBack = document.getElementById('go-back')

goBack.onclick = () => {
    history.back()
}