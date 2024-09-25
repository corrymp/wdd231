const navigation = document.querySelector('#animateme');
const hamButton = document.getElementById('menu');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});
// same code from WDD 131; if it ain't broke, don't fix it