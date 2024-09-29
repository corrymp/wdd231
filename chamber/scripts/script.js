const root = document.documentElement;
const viewToggleButton = document.querySelector('#toggle-view');
const listItems = document.querySelector('#list-items');
let members = null;

async function getMembers() {
    const data = await fetch('data/members.json');
    members = await data.json();
    return members;
}

function buildList(members) {
    listItems.innerHTML = '';
    members.forEach(member => {
        const cardHolder = document.createElement('li');
        cardHolder.classList.add('card-holder', `level-${member.level}`, (member.image) ? 'has-img' : 'no-img');
        const card = document.createElement('div'); card.classList.add('card');
        function img(member) {
            const img = document.createElement('img');
            img.setAttribute('src', member.image);
            img.setAttribute('alt', `image for ${member.name}`);
            img.setAttribute('width', img.naturalWidth);
            img.setAttribute('height', img.naturalHeight);
            return img.outerHTML;
        }
        cardHolder.innerHTML = `
            <div class='card'>
                ${(member.image)
                ? `<div class='card-img'>${img(member)}</div><hr><p class='card-name'>${member.name}</p>`
                : `<p class='card-header'><b>${member.name}</b></p><hr>`}
                <p class='card-addr'>${member.address}</p>
                <p class='card-phone'>${member.phone}</p>
                <p class='card-url'>${member.website}</p>
            </div>`;
        listItems.appendChild(cardHolder);
    });
}

async function build() {
    const members = await getMembers();
    buildList(members.members);
}
build();

viewToggleButton.addEventListener('click', () => {
    listItems.classList.toggle('is-grid');
    viewToggleButton.classList.toggle('grid')
});
