import { ge, get, dialog, httpToHttps } from "./utils.js";
const playerList = ge('player-list');
const modal = ge('modal');
const playerView = ge('player-view');
const capeBacking = ge('cape-backing');
const cape = ge('cape');
const capeName = ge('cape-name');
const capeInfo = ge('cape-info');
const username = ge('username');
const uuid = ge('uuid');
const view = ge('view');
const refresh = ge('refresh');
const remove = ge('remove');
const close = ge('close-modal');
const removeCancel = ge('cr-cancel');
const removeConfirm = ge('cr-confirm');
const removeName = ge('cr-name');
const removeModal = ge('confirm-remove');
const refreshAll = ge('refresh-all');
const refreshAllCancel = ge('ra-cancel');
const refreshAllConfirm = ge('ra-confirm');
const refreshAllModal = ge('refresh-all-modal');
const resetAll = ge('reset-all');
const resetCancel = ge('reset-cancel');
const resetConfirm = ge('reset-confirm');
const resetAllModal = ge('reset-modal');
const backup = ge('backup');
const backupClose = ge('backup-close');
const backupLoad = ge('backup-load');
const backupText = ge('backup-text');
const backupModal = ge('backup-modal');
const playerBody = ge('player-body');
const playerJacket = ge('player-jacket');
const playerLegRight = ge('player-leg-right');
const playerPantRight = ge('player-pant-right');
const playerLegLeft = ge('player-leg-left');
const playerPantLeft = ge('player-pant-left');
const playerArmRight = ge('player-arm-right');
const playerSleeveRight = ge('player-sleeve-right');
const playerArmLeft = ge('player-arm-left');
const playerSleeveLeft = ge('player-sleeve-left');
const playerHead = ge('player-head');
const playerHat = ge('player-hat');
const playerModel = [playerBody, playerJacket, playerLegRight, playerPantRight, playerLegLeft, playerPantLeft, playerArmRight, playerSleeveRight, playerArmLeft, playerSleeveLeft, playerHead, playerHat];

const capes = (url) => {
    switch (url) {
        case ("http://textures.minecraft.net/texture/8f120319222a9f4a104e2f5cb97b2cda93199a2ee9e1585cb8d09d6f687cb761"): return ({ name: 'Mojang Cape (Classic)', info: 'Only given to Mojang employees' });
        case ("http://textures.minecraft.net/texture/5786fe99be377dfb6858859f926c4dbc995751e91cee373468c5fbf4865e7151"): return ({ name: 'Mojang Cape', info: 'Only given to Mojang employees' });
        case ("http://textures.minecraft.net/texture/9e507afc56359978a3eb3e32367042b853cddd0995d17d0da995662913fb00f7"): return ({ name: 'Mojang Studios Cape', info: 'Only given to Mojang employees' });
        case ("http://textures.minecraft.net/texture/953cac8b779fe41383e675ee2b86071a71658f2180f56fbce8aa315ea70e2ed6"): return ({ name: 'MINECON 2011 Cape', info: 'Given to those that attended Minecon 2011' });
        case ("http://textures.minecraft.net/texture/a2e8d97ec79100e90a75d369d1b3ba81273c4f82bc1b737e934eed4a854be1b6"): return ({ name: 'MINECON 2012 Cape', info: 'Given to those that attended Minecon 2012' });
        case ("http://textures.minecraft.net/texture/153b1a0dfcbae953cdeb6f2c2bf6bf79943239b1372780da44bcbb29273131da"): return ({ name: 'MINECON 2013 Cape', info: 'Given to those that attended Minecon 2013' });
        case ("http://textures.minecraft.net/texture/b0cc08840700447322d953a02b965f1d65a13a603bf64b17c803c21446fe1635"): return ({ name: 'MINECON 2015 Cape', info: 'Given to those that attended Minecon 2015' });
        case ("http://textures.minecraft.net/texture/e7dfea16dc83c97df01a12fabbd1216359c0cd0ea42f9999b6e97c584963e980"): return ({ name: 'MINECON 2016 Cape', info: 'Given to those that attended Minecon 2016' });
        case ("http://textures.minecraft.net/texture/70efffaf86fe5bc089608d3cb297d3e276b9eb7a8f9f2fe6659c23a2d8b18edf"): return ({ name: 'Millionth customer cape', info: 'Given to akronman1 for being the 1,000,000th customer of Minecraft' });
        case ("http://textures.minecraft.net/texture/bcfbe84c6542a4a5c213c1cacf8979b5e913dcb4ad783a8b80e3c4a7d5c8bdac"): return ({ name: 'dB cape', info: 'Given to composer dannyBstyle as the creator of Minecraft was a fan' });
        case ("http://textures.minecraft.net/texture/23ec737f18bfe4b547c95935fc297dd767bb84ee55bfd855144d279ac9bfd9fe"): return ({ name: 'Snowman cape', info: 'Given to JulianClark for "kiddnapping" Ray Cokes' });
        case ("http://textures.minecraft.net/texture/ca29f5dd9e94fb1748203b92e36b66fda80750c87ebc18d6eafdb0e28cc1d05f"): return ({ name: 'Translator cape (Japanese)', info: 'Given to Cheapsh0t for helping with the Japanese translation of the game' });
        case ("http://textures.minecraft.net/texture/2e002d5e1758e79ba51d08d92a0f3a95119f2f435ae7704916507b6c565a7da8"): return ({ name: 'Spade cape', info: 'Given to MrMessiah as a "thank you" for remaking the Minecraft lighting engine' });
        case ("http://textures.minecraft.net/texture/d8f8d13a1adf9636a16c31d47f3ecc9bb8d8533108aa5ad2a01b13b1a0c55eac"): return ({ name: 'Prismarine cape', info: 'Given to Drullkus as a "thank you" for not stealing Minecraft assets' });
        case ("http://textures.minecraft.net/texture/5048ea61566353397247d2b7d946034de926b997d5e66c86483dfb1e031aee95"): return ({ name: 'Turtle cape', info: 'Given to billyK_ for the suggestion of adding turtles to Minecraft. Also had by a handful of Mojang employees' });
        case ("http://textures.minecraft.net/texture/1bf91499701404e21bd46b0191d63239a4ef76ebde88d27e4d430ac211df681e"): return ({ name: 'Translator cape', info: 'Randomly given to early translators of the game' });
        case ("http://textures.minecraft.net/texture/2262fb1d24912209490586ecae98aca8500df3eff91f2a07da37ee524e7e3cb6"): return ({ name: 'Chinese Translator cape', info: 'Given to Powup333 for helping with the Chinese translation of the game' });
        case ("http://textures.minecraft.net/texture/3efadf6510961830f9fcc077f19b4daf286d502b5f5aafbd807c7bbffcaca245"): return ({ name: 'Scrolls Champion cape', info: 'Given to those that obtained first place at least 5 times on the Scrolls weekly leaderboard. Also given to certain participants in a Scrolls tournament at MINECON 2015.' });
        case ("http://textures.minecraft.net/texture/ca35c56efe71ed290385f4ab5346a1826b546a54d519e6a3ff01efa01acce81"): return ({ name: 'Cobalt cape', info: 'Given to participants of level making competitions and winners of the Cobalt League tournaments in 2016' });
        case ("http://textures.minecraft.net/texture/ae677f7d98ac70a533713518416df4452fe5700365c09cf45d0d156ea9396551"): return ({ name: 'Mojira Moderator cape', info: 'Given to Mojira bug tracker moderators' });
        case ("http://textures.minecraft.net/texture/17912790ff164b93196f08ba71d0e62129304776d0f347334f8a6eae509f8a56"): return ({ name: 'Realms MapMaker cape', info: 'Given to certain mapmakers in the Java Realms Content Creator Program' });
        case ("http://textures.minecraft.net/texture/2340c0e03dd24a11b15a8b33c2a7e9e32abb2051b2481d0ba7defd635ca7a933"): return ({ name: 'Migrator cape', info: 'Given to anyone that migrated their Mojang account to a Microsoft account. Those that didn\'t migrate had their accounts revoked' });
        case ("http://textures.minecraft.net/texture/afd553b39358a24edfe3b8a9a939fa5fa4faa4d9a9c3d6af8eafb377fa05c2bb"): return ({ name: 'Cherry Blossom cape', info: 'Given to those that participated in the 2023 Mob Vote' });
        case ("http://textures.minecraft.net/texture/f9a76537647989f9a0b6d001e320dac591c359e9e61a31f4ce11c88f207f0ad4"): return ({ name: 'Vanilla cape', info: 'Given to those that owned both Java and Bedrock editions of Minecraft before they were made a single purchase' });
        case ("http://textures.minecraft.net/texture/569b7f2a1d00d26f30efe3f9ab9ac817b1e6d35f4f3cfb0324ef2d328223d350"): return ({ name: 'Follower\'s Cape', info: 'Given to those that met certain requirments on TikTok during the 15th anniversary of the game' });
        case ("http://textures.minecraft.net/texture/cb40a92e32b57fd732a00fc325e7afb00a7ca74936ad50d8e860152e482cfbde"): return ({ name: 'Purple Heart Cape', info: 'Given to those that met certain requirments on Twitch during the 15th anniversary of the game' });
        case ("http://textures.minecraft.net/texture/cd9d82ab17fd92022dbd4a86cde4c382a7540e117fae7b9a2853658505a80625"): return ({ name: '15th Anniversary Cape', info: 'Given to all that chose to claim it during the 15th anniversary of the game' });
        case ("http://textures.minecraft.net/texture/56c35628fe1c4d59dd52561a3d03bfa4e1a76d397c8b9c476c2f77cb6aebb1df"): return ({ name: 'MCC 15th Year Cape', info: 'Given to those that met certain requirments on the MC Championship Mini-games Event Server during the 15th anniversary of the game' });
        case ("http://textures.minecraft.net/texture/dae36211def6a4f8464ceadaac4c88a26d34505a558f9ddea1f11f09c9f9d900"): return ({ name: 'MC Experience Cape', info: 'Given to participants in the in-person event Minecraft Experience: Villager Rescue' });
        default: return ({ name: 'Unknown Cape', info: 'This cape is not in our records. The site may have not yet been updated to include it' })
    }
}

let cache = JSON.parse(localStorage.getItem('cache')) || {};
let selectedPlayer = JSON.parse(localStorage.getItem('selectedPlayer'));

const show = window.location.href.split('?')[1];
if (show) {
    selectedPlayer = cache[`${show.split('=')[1]}`];
    localStorage.setItem('selectedPlayer', JSON.stringify(selectedPlayer));
    populateModal(cache[`${show.split('=')[1]}`]);
    window.history.replaceState(null, null, window.location.href.split('?')[0]);
}

function buildList() {
    if (cache) {
        playerList.innerHTML = '';
        for (const [_, player] of Object.entries(cache)) {
            const skin = httpToHttps(player.skin_texture);
            const card = document.createElement('li');
            card.tabIndex = 0;
            card.classList.add(player.username);
            const head = document.createElement('div');
            head.style.backgroundImage = `url(${skin})`;
            head.classList.add('card-face-inner');
            const hat = document.createElement('div');
            hat.style.backgroundImage = `url(${skin})`;
            hat.classList.add('card-face-outer');
            hat.title = 'view details';
            hat.ariaDetails = `representation of the face of ${player.username}\'s Minecraft skin`;
            card.innerHTML = `<figure class='player-card'>${head.outerHTML}${hat.outerHTML}<figcaption>${player.username}</figcaption></figure>`;
            card.addEventListener('click', () => {
                selectedPlayer = player;
                localStorage.setItem('selectedPlayer', JSON.stringify(selectedPlayer));
                populateModal();
            })
            playerList.appendChild(card);
        }
    }
}

function populateModal() {
    const skin = JSON.parse(atob(selectedPlayer.properties[0].value)).textures;
    playerView.classList.toggle('slim', (skin.SKIN.metadata != null) ? true : false);
    playerModel.forEach(i => { i.style.backgroundImage = `url(${httpToHttps(skin.SKIN.url)})`; });

    if (skin.CAPE) {
        const capeData = capes(skin.CAPE.url);
        capeBacking.style.display = 'grid';
        cape.style.backgroundImage = `url(${httpToHttps(skin.CAPE.url)})`;
        capeName.textContent = capeData.name;
        capeInfo.textContent = capeData.info;
    } else { capeBacking.style.display = 'none'; }

    username.textContent = selectedPlayer.username;
    uuid.textContent = selectedPlayer.id;

    view.addEventListener('click', () => { window.location.href = `./view?show=${selectedPlayer.id}`; })

    refresh.addEventListener('click', async () => {
        let data = null;
        try { data = await get(`https://playerdb.co/api/player/minecraft/${selectedPlayer.id}`) } catch (e) { console.log(e) }
        data = await data.data.player;
        cache[`${data.id}`] = await data;
        localStorage.setItem('cache', JSON.stringify(cache));
        populateModal();
    })

    remove.addEventListener('click', (e) => {
        const remove = () => {
            ge(selectedPlayer.username).outerHTML = '';
            delete cache[selectedPlayer.id];
            localStorage.setItem('cache', JSON.stringify(cache));
            cache = JSON.parse(localStorage.getItem('cache'));
            selectedPlayer = null;
            localStorage.setItem('selectedPlayer', JSON.stringify(selectedPlayer));
            removeModal.close();
            modal.close();
        }
        if (e.shiftKey) { remove(); return; }
        removeCancel.addEventListener('click', () => { removeModal.close(); })
        removeConfirm.addEventListener('click', remove)
        removeName.textContent = selectedPlayer.username;
        removeModal.showModal();
    })

    dialog(modal, null, close, null, null, true);
    modal.showModal();
}

async function firstLoad() {
    const defaultList = [
        'a07937f0-7b84-460d-a235-efc5e7afdecd', // Celemimphar
        'e43f8920-25d8-4651-8b21-3ffc24ec2de1', // TheLovingJevil
        '6153c791-cb46-4111-b6d1-043f6511ea61', // kfuzz
        'ffc08744-a954-43f0-b100-8a9f4a9a777a', // awobbuffet
        '0493f05e-6eac-4101-9463-42fcb0aebbed', // madzvie
        '47feceb8-91ab-43e0-9d33-38aeecae7675', // MidnightStar64
        'd4f39329-cd68-47e5-96f3-e32496fc7501', // CloverPetal
        'b6697e16-e9af-47d5-896b-13e8bfaf8438', // Koniri
        '89bf1135-83ab-4b4d-9d65-18eb000083a4', // Treypex
        'e9a7b513-d364-4718-924a-64337ee92239', // Solev
        '12dbe7a1-ce47-4f4b-beb8-5fb08781c8cf', // LegoFriend
        'aba34626-90e3-498f-b70c-8314e0bb4277', // KaNukei
        'b1f2f9d2-1ad0-4cd0-86a0-0c72f02349fd', // Applewood_
        '6ccf7342-e8cb-472a-942c-1265c4b10bb6', // Jawunleashed
        'f208eae0-3d65-4bb6-98ff-5ac88bfca8e2', // LegacyAN
        '537d34e1-1efc-492a-8873-f774394e5044', // MinisterBismarck
        '17ee384a-e326-4113-81d7-3236757dab6c', // Boyjedi
        '28d048bd-0fc5-4283-ade3-f9b3e7676cd4', // ish13c
        'b876ec32-e396-476b-a115-8438d83c67d4', // Technoblade
        '93b459be-ce4f-4700-b457-c1aa91b3b687', // Etho
    ];
    for (let i = 0; i < defaultList.length; i++) {
        let data = null;
        try { data = await get(`https://playerdb.co/api/player/minecraft/${defaultList[i]}`) } catch (e) { console.log(e) }
        data = await data.data.player;
        cache[`${data.id}`] = await data;
        localStorage.setItem('cache', JSON.stringify(await cache));
    }
    localStorage.setItem('firstLoad', JSON.stringify(true));
    buildList();
}

refreshAll.addEventListener('click', () => {
    refreshAllCancel.addEventListener('click', () => { refreshAllModal.close(); })
    refreshAllConfirm.addEventListener('click', async () => {
        for (const [uuid, player] of Object.entries(cache)) {
            let data = null;
            try { data = await get(`https://playerdb.co/api/player/minecraft/${player.id}`) } catch (e) { console.log(e) }
            data = await data.data.player;
            cache[`${data.id}`] = await data;
        }
        localStorage.setItem('cache', JSON.stringify(cache));
        buildList();
        refreshAllModal.close();
    })
    refreshAllModal.showModal();
})

resetAll.addEventListener('click', () => {
    resetCancel.addEventListener('click', () => { resetAllModal.close(); })
    resetConfirm.addEventListener('click', async () => {
        cache = {};
        localStorage.setItem('cache', JSON.stringify(cache));
        playerList.innerHTML = '';
        buildList();
        resetAllModal.close();
    })
    resetAllModal.showModal();
})

backup.addEventListener('click', () => {
    backupClose.addEventListener('click', () => { backupModal.close(); })
    backupLoad.addEventListener('click', async () => {
        if (backupText.value) {
            try {
                cache = JSON.parse(atob(backupText.value));
                localStorage.setItem('cache', JSON.stringify(cache));
                buildList();
                backupModal.close();
            }
            catch { alert('There was an issue loading your backup. Please double check that it was pasted correctly.'); }
        }
    })
    backupText.value = btoa(JSON.stringify(cache));
    backupText.select();
    backupModal.showModal();
})

if (!JSON.parse(localStorage.getItem('firstLoad'))) { firstLoad(); } else { buildList(); }

/* 
const footer = document.querySelector('footer');
let footerHeight = footer.getBoundingClientRect().height;
let docWidth = document.body.clientWidth;
const panel = document.getElementById('list-controls');
let panelOffset = document.body.clientHeight - panel.getBoundingClientRect().bottom;
window.addEventListener('resize', () => {
    const fh = footer.getBoundingClientRect().height;
    const po = document.body.clientHeight - panel.getBoundingClientRect().bottom;
    if (fh != footerHeight || po != panelOffset) {
        const dw = document.body.clientWidth;
        console.log(`${(fh != footerHeight) ? (po!=panelOffset) ?'Footer height and panel offset changed' :'Footer height changed' : (po!=panelOffset) ?'Panel offset changed' :'Neither footer height nor panel offset changed'}\nOld Width: ${docWidth}\nNew Width: ${dw}\nOld fHeight: ${footerHeight}\nNew fHeight: ${fh}\nOld pOffset: ${panelOffset}\nNew pOffset: ${po}`);
        footerHeight = fh; docWidth = dw; panelOffset = po;
    }
})
 */
