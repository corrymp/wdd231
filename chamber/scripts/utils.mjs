const parseBool = (i) => (i == 'true' || i == 1) ? true : false;

function toggle(clickTarg, clsTarg, cls, ls = null) {
    let storage = parseBool(localStorage.getItem(ls)) || false;
    if (typeof (clickTarg) == 'object') { clickTarg.forEach(i => { ge(i).addEventListener('click', () => { callback() }) }); }
    else { ge(clickTarg).addEventListener('click', () => { callback() }) }
    function callback(pageLoad = false) {
        if (typeof (clsTarg) == 'object') { clsTarg.forEach(i => { ge(i).classList.toggle(cls); }); }
        else { ge(clsTarg).classList.toggle(cls); }
        if (ls) {
            if (!pageLoad) storage = !storage;
            localStorage.setItem(ls, storage);
        }
    }
    if (ls && storage) callback(true);
}

function ge(id, all = false) {
    let el = null
    try {
        el = document.getElementById(id);
        if (el == null) el = (all) ? document.querySelectorAll(`.${id}`) : document.querySelector(`.${id}`);
    }
    catch { el = (all) ? document.querySelectorAll(`${id}`) : document.querySelector(`${id}`) }
    finally { return el }
}

function dialog(
    dialog, //element: the dialog
    openButton, //element:  click this to open
    closeButton, //element: click this to close
    openCallback, //function: opening logic, defalts to .show()
    closeCallback, //function: closing logic, defaults to .close()
    closeOnBackgroundClick = false //bool: closes on backdrop click
) {
    function closeDialog() { if (closeCallback) { closeCallback(); } else { dialog.close(); } }
    function openDialog() { if (openCallback) { openCallback(); } else { dialog.show(); } }
    if(openButton) {openButton.addEventListener('click', openDialog)};
    if(closeButton) {closeButton.addEventListener('click', closeDialog)};
    dialog.addEventListener('close', closeDialog);
    if (closeOnBackgroundClick) { dialog.addEventListener('click', (e) => { if (e.target == dialog) { closeDialog() } }) };
}

async function get(url) { return await (await fetch(url)).json(); }

export { ge, get, parseBool, toggle, dialog }