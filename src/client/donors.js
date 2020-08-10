const ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://localhost:3001/donors');
const donorMax = 25000;

ourRequest.onload = () => {
  const donorsData = JSON.parse(ourRequest.responseText);

  const totalDonors = donorsData.length;
  var totalDonated = 0;
  var precentageDonated = 0;

  for (let i = 0; i < totalDonors; i++) {
    totalDonated += donorsData[i].amount;
  }

  precentageDonated = Math.floor((totalDonated / donorMax) * 100);

  document.getElementById('precent').innerHTML = precentageDonated.toString() + '%';
  document.getElementById('donors').innerHTML = totalDonors.toString() + ' Donors';
  document.getElementById('donated').innerHTML = '$' + totalDonated.toString();
};

ourRequest.send();
