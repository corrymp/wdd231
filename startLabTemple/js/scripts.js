import { temples, url } from "../data/temples.js";
-((data) => {
    const mydialog = document.getElementById('mydialog');
    mydialog.children[0].children[1].addEventListener('click', () => mydialog.close());
    data.forEach(x => {
        const photo = document.createElement('img');
        photo.src = `${url}${x.path}`;
        photo.alt = x.name;
        document.getElementById('showHere').appendChild(photo);
        photo.addEventListener('click', () => {
            mydialog.children[0].children[0].innerHTML = x.name;
            mydialog.children[1].innerHTML = `Dedicated ${x.dedicated} by ${x.person} as temple number ${x.number}`;
            mydialog.showModal();
        })
    })
})(temples);