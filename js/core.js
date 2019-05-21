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
var db = firebase.firestore();

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

/* CHARTS */
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June (projected)'],
        datasets: [
            {
                label: '# of Sales',
                data: [6, 11, 21, 38, 50, 72],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }
});

const chartTwo = document.getElementById('myOtherChart');
const myOtherChart = new Chart(chartTwo, {
    data: {
        datasets: [
            {
                data: [425, 71, 113],
                backgroundColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)']
            }
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ['Sold', 'Unsold', 'In Process']
    },
    type: 'pie',
    options: {}
});

$(document).ready(function() {
    $('#message, #state').characterCounter();
});

/* CONTACT */
$('#submit-contact').click(() => {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const addr = document.getElementById('addr').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const message = document.getElementById('message').value;
    const allow = document.getElementById('allow').value;

    if (!email || !name || !addr || !city || !state || !zip || !message) {
        console.log('There was an issue... one of the fields entered was invalid.');
        M.toast({ html: 'There was an issue submitting your message.' });
        return;
    }

    console.log('Submitting contact to firebase...');

    const data = {
        Email: email,
        Name: name,
        Address: addr,
        City: city,
        State: state,
        Zip: zip,
        Message: message,
        ContactAllowed: allow,
        ContactDate: new Date()
    };

    db.collection('contacts')
        .add(data)
        .then(docRef => {
            console.log('Written doc: ', docRef.id);
        })
        .catch(error => {
            console.log('Error writing document: ' + error);
        }).then(() => {
            var toastHTML = '<span>Message Sent!</span>';
            M.toast({html: toastHTML});
        });
});
