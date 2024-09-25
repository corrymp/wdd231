const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json'
const cards = document.querySelector('#cards')

let data = null;
let prophets = null

async function getProphetData() {
    const response = await fetch(url);
    data = await response.json();
    //console.table(data)
    prophets = data.prophets
    displayProphets(data.prophets)
    loadFilters(prophets)
}
getProphetData()

const displayProphets = (prophets) => {
    cards.innerHTML = '';
    prophets.forEach(prophet => {
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const dob = document.createElement('p');
        const birthplace = document.createElement('p');
        const served = document.createElement('span');
        const portrait = document.createElement('img');
        const order = `${prophet.order}${getNumSuffix(`${prophet.order}`)}`
        const living = (prophet.death) ? true : false;

        fullName.innerHTML = `${prophet.name} ${prophet.lastname}`;
        dob.innerHTML = `Date of Birth: ${prophet.birthdate}`
        birthplace.innerHTML = `Place of Birth: ${prophet.birthplace}`

        served.innerHTML = `${(living)?`${order}`:'Current'} Latter-day President`

        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${fullName.textContent} - ${order} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(birthplace);
        card.appendChild(portrait);
        card.appendChild(served)
        cards.appendChild(card);
    });
}

function getNumSuffix(num) {
    num = `${num}`;
    num = num[num.length - 1];
    return (num < 3 && num != 0) ? (num >= 2) ? (num == 3) ? 'rd' : 'nd' : 'st' : 'th';
}

function loadFilters(prophets) {
    const addFilter = (id, filter) => document.getElementById(id).addEventListener('click', () => { displayProphets(filter) })
    const prophetFilter = (i, j) => i.filter(k => j(k))
    const yearsLived = (i) => {
        const j = new Date;
        const birthYear = i.birthdate.split(' ')[2]
        const deathYear = ((i.death) != null) ? i.death.split(' ')[2] : j.getFullYear()
        return deathYear - birthYear
    }
    addFilter('all', prophets)
    addFilter('utah', prophetFilter(prophets, i => i.birthplace == 'Utah'));
    addFilter('not-utah', prophetFilter(prophets, i => i.birthplace != 'Utah'));
    addFilter('years', prophetFilter(prophets, i => yearsLived(i) >= 95));
    addFilter('children', prophetFilter(prophets, i => i.numofchildren >= 10));
    addFilter('served', prophetFilter(prophets, i => i.length >= 15));
}
