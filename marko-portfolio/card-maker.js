const project = document.getElementById('projects')

const projectCards = [
    project1 = {
        link: 'https://www.behance.net/gallery/176110145/FitConnect-Fitness-App',
        slika: 'Project-1.png',
        ime: 'FitConnect',
        stvar: 'Mobile App',
    },

    project2 = {
        link: 'https://www.behance.net/gallery/177941917/TravelEase-Travel-Mobile-App',
        slika: 'Project-2.png',
        ime: 'TravelEase',
        stvar: 'Mobile App',
    },

    project3 = {
        link: 'https://www.behance.net/gallery/181489151/Driomo-Dried-Tomatoes',
        slika: 'Project-3.png',
        ime: 'Driomo',
        stvar: 'Web Design',
    },

    project4 = {
        link: 'https://www.behance.net/gallery/177308515/Elixiria-Cafe',
        slika: 'Project-4.png',
        ime: 'Elixira Cafe',
        stvar: 'Web Design',
    },

    project5 = {
        link: 'https://www.behance.net/gallery/181088823/Driomo-Dried-Tomatoes',
        slika: 'Project-5.png',
        ime: 'Driomo',
        stvar: 'Brand',
    },

    project6 = {
        link: 'https://www.behance.net/gallery/177955491/TravelEase-Brand-Identity',
        slika: 'Project-6.png',
        ime: 'TravelEase',
        stvar: 'Brand',
    }
]


const stilKartice = (projekat) => {
    return `<div>
                <div><a href="${projekat.link}" target="_blank"><img src="Slike/${projekat.slika}" alt="${projekat.ime}"></a></div>
                <div>${projekat.ime}<span> ${projekat.stvar}</span></div>
            </div>`
}

projectCards.forEach(projekat => {
    project.innerHTML += stilKartice(projekat)
})

