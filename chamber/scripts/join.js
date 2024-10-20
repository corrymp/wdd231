import { dialog, ge } from "./utils.mjs";
const levelDetails = {
    'bronze': {
        'name': 'Bronze',
        'level': 'level-1',
        'list': [
            'Complimentary listing in public directory',
            'Free access to member-only events',
            'Membership fee: $400/month'
        ]
    },
    'silver': {
        'name': 'Silver',
        'level': 'level-2',
        'list': [
            'Chance to appear on home page',
            'Free access to monthly leadership training workshop',
            'All Bronze tier benefits',
            'Membership fee: $900/month'
        ]
    },
    'gold': {
        'name': 'Gold',
        'level': 'level-3',
        'list': [
            'Opportunity to MC public events',
            'Discounts on tickets for ticketed events',
            'All Silver and Bronze tier benefits',
            'Membership fee: $2500/month'
        ]
    },
    'np': {
        'name': 'Non-Profit',
        'level': 'level-np',
        'list': [
            'All Silver and Bronze tier benefits',
            'No membership fees',
            'Must provide valid proof of federal non-profit status'
        ]
    }
};
ge('time').value = (new Date()).getTime();
ge('submit').addEventListener('click', () => { ge('form').classList.add('submit') });
ge('.info-button', true).forEach((i) => {
    const tier = `${i.dataset.level}`;
    const data = levelDetails[tier];
    function openCallback() {
        ge('modal-level').textContent = data.name;
        ge('modal-list').innerHTML = '';
        data.list.forEach(j => {
            const k = document.createElement('li');
            k.textContent = j;
            ge('modal-list').appendChild(k);
        });
        ge('modal').showModal();
        ge('modal-border').classList.add(data.level, 'open');
    };
    function closeCallback() {
        ge('modal').close();
        ge('modal-border').classList.remove(data.level, 'open');
    }
    dialog(ge('modal'), i, ge('.close-button', false, ge('modal')), openCallback, closeCallback, true)
})
