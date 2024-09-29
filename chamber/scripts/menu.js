const navigation = document.querySelector('#animateme');
const hamButton = document.getElementById('menu');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});