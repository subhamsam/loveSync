function calculateLove() {
    // Get names from the input fields
    var yourName = document.getElementById("yourName").value;
    var loverName = document.getElementById("loverName").value;

    // Send the data to the server
    // Update the fetch URL to match your server endpoint
fetch('http://localhost:3000/calculate-love', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ yourName, loverName }),
})

    .then(response => response.json())
    .then(data => {
        // Hide the form
        var formContainer = document.getElementById('loveFormContainer');
        formContainer.classList.add('hidden');

        // Display the result
        var resultContainer = document.getElementById("resultContainer");
        resultContainer.innerHTML = '<h2>Your Love Percentage: ' + data.result+ '%</h2>';

        // Add different text based on the lovePercentage
        if (data.result === 100){
            resultContainer.innerHTML +='<P>You have achieved a perfect match! Cherish the extraordinary love you share. Keep supporting and appreciating each other to maintain this exceptional connection.</P>'
        }else if (data.result >=80 && data.result <= 99) {
            resultContainer.innerHTML += '<p>Congratulations on a strong and deep connection! Continue to prioritize each other, communicate openly, and your relationship will reach even greater heights.</p>';
        } else if (data.result >=50 && data.result <= 80) {
            resultContainer.innerHTML += '<p>Your love has a solid foundation, but there is always room for improvement. Keep nurturing your relationship with kindness, communication, and shared experiences.</p>';
        } else if (data.result >=30 && data.result <= 50) {
            resultContainer.innerHTML += '<p>Your love is budding, and there is room for improvement. Invest time in understanding each other, celebrate your differences, and let your love grow stronger.</p>';
        }else if (data.result >=0 && data.result <= 30) {
            resultContainer.innerHTML += '<p>While the love percentage is low, it is an opportunity for growth. Communicate openly, spend quality time together, and watch your love blossom.</p>';
        }

        // Show the result container
        resultContainer.classList.remove('hidden');
    })
    .catch(error => console.error('Error:', error));
}

