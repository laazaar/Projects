const toTop = document.getElementById('toTop')


window.onscroll = scrollingFunction = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        toTop.removeAttribute('hidden')
    } else {
        toTop.setAttribute('hidden', 'hidden')
    }
}


const accordion = document.querySelectorAll('.accordion-header')

accordion.forEach(acc => {
    acc.addEventListener('click', function() {
        acc.classList.toggle('active-accordion')
        const accBody = acc.nextElementSibling

        if(accBody.style.maxHeight) {
            accBody.style.maxHeight = null
            accBody.style.paddingBlock = '0rem'
        }else {
            accBody.style.maxHeight = accBody.scrollHeight + 'px'
            accBody.style.paddingBlock = '2rem'
        }
    })
}) 


 
const mobileNav = document.getElementById('mala-navigacija')

const navigacija = () => {
    
    if(mobileNav.style.maxHeight) {
        mobileNav.style.maxHeight = null
        mobileNav.style.paddingBlock = '0rem'
    }else {
        mobileNav.style.maxHeight = mobileNav.scrollHeight + 'px'
        mobileNav.style.paddingBlock = '2rem'
    }
}



const carousels = document.querySelectorAll('.services-container, .carousel')

for (carousel of carousels) {
    const slider = carousel;
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active-scroller');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active-scroller');
    });
    slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active-scroller');
    });
    slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX);
    slider.scrollLeft = scrollLeft - walk;
    });
}

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


// const back = document.querySelector('.service-back')
// const forward = document.querySelector('.service-forward')
// const allServices = document.querySelectorAll('.service')

// let curService = 0

// forward.addEventListener("click", function () {
//     curService++;

//     if (curService == allServices.length - 3) {
//         forward.style.opacity = '0.5'
//         allServices.forEach(service => {
//             service.style.transform = `translateX(${-100 * curService}%)`;
//           });
//     } else if (curService >= allServices.length - 2) {
//         return
//     } else {
//         allServices.forEach(service => {
//             service.style.transform = `translateX(${-100 * curService}%)`;
//           });
//     }
// });

// back.addEventListener("click", function () {
    
//     // if (curService == 0) {
//     //     curService = allServices.length - 1
//     // } else {
//     //     curService--;
//     // }

//     if (curService == 0 ) {
//         forward.style.opacity = '0.5'
//         allServices.forEach(service => {
//             service.style.transform = `translateX(${100 * curService}%)`;
//           });
//     } else if (curService == 0) {
//         return
//     } else {
//         allServices.forEach(service => {
//             service.style.transform = `translateX(${100 * curService}%)`;
//           });
//     }

//     console.log(curService)
// });

