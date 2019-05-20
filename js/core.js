AOS.init();

var firebaseConfig = {
    apiKey: 'AIzaSyDl4_smwyde-6IywBQcVAaCVp9A6da9mhg',
    authDomain: 'mywebsite-2aba3.firebaseapp.com',
    databaseURL: 'https://mywebsite-2aba3.firebaseio.com',
    projectId: 'mywebsite-2aba3',
    storageBucket: 'mywebsite-2aba3.appspot.com',
    messagingSenderId: '1037189690167',
    appId: '1:1037189690167:web:a9b9beedb78d9944'
};

firebase.initializeApp(firebaseConfig);

M.AutoInit();

anime
    .timeline({ loop: true })
    .add({
        targets: '.ml5 .line',
        opacity: [0.5, 1],
        scaleX: [0, 1],
        easing: 'easeInOutExpo',
        duration: 700
    })
    .add({
        targets: '.ml5 .line',
        duration: 600,
        easing: 'easeOutExpo',
        translateY: function(e, i, l) {
            var offset = -0.625 + 0.625 * 2 * i;
            return offset + 'em';
        }
    })
    .add({
        targets: '.ml5 .letters-left',
        opacity: [0, 1],
        translateX: ['0.5em', 0],
        easing: 'easeOutExpo',
        duration: 600,
        offset: '-=300'
    })
    .add({
        targets: '.ml5 .letters-right',
        opacity: [0, 1],
        translateX: ['-0.5em', 0],
        easing: 'easeOutExpo',
        duration: 600,
        offset: '-=600'
    })
    .add({
        targets: '.ml5',
        opacity: 0,
        duration: 1000000000,
        easing: 'easeOutExpo',
        delay: 1000
    });

$('#submit-contact').click(() => {
    const email = document.getElementById('inputEmail').value;
    const name = document.getElementById('inputName').value;
    const address = document.getElementById('inputAddress').value;
    const address2 = document.getElementById('inputAddress2').value;
    const city = document.getElementById('inputCity').value;
    const state = document.getElementById('inputState').value;
    const zip = document.getElementById('inputZip').value;
    const message = document.getElementById('inputMessage').value;

    const data = {
        Email: email,
        Name: name,
        Address: address,
        Address2: address2,
        City: city,
        State: state,
        Zip: zip,
        Message: message,
        ContactAllowed: true,
        ContactDate: new Date()
    };

    console.log(data);
    const sendEmail = firebase.functions().httpsCallable('sendContactEmail');
    sendEmail({ data });
});
