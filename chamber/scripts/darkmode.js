const parseBool = (i) => (i == 'true' || i == 1) ? true : false;
const darkmodeButton = document.getElementById('darkmode')

let dm = parseBool(localStorage.getItem('darkmode')) || false;

darkmodeButton.addEventListener('click', () => { toggleDarkmode(); });

function toggleDarkmode(load = false) {
    document.documentElement.classList.toggle('darkmode');
    if (!load) dm = !dm;
    localStorage.setItem('darkmode', dm);
}

if (dm) toggleDarkmode(true);