import { toggle, ge, dialog } from "./utils.js";

const disclaimerPopup = ge('disclaimer-popup');
const disclaimerButton = ge('disclaimer-button');
const disclaimerClose = ge('disc-close')

toggle('menu', ['menu', 'nav'], 'open');
dialog(disclaimerPopup, disclaimerButton, disclaimerClose, () => { disclaimerPopup.showModal() }, null, true);
