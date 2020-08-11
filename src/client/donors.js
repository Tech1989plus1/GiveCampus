const ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://localhost:3001/donors');
const donorMax = 25000;

ourRequest.onload = () => {
  const donorsData = JSON.parse(ourRequest.responseText);

  const totalDonors = donorsData.length;
  var totalDonated = 0;
  var precentageDonated = 0;

  var tableData = '<tr><th>Donor</th> <th>Dollars</th> <th>Type</th></tr>';

  donorsData.sort((a ,b) => b.amount - a.amount);

  for (let i = 0; i < totalDonors; i++) {
    totalDonated += donorsData[i].amount;
  }

  for (let i = 0; i < 10; i++) {
    let donor = donorsData[i];
    tableData += `<tr><td>${donor.name}</td> <td>${donor.amount}</td> <td>${donor.type}</td></tr>`;
  }

  precentageDonated = Math.floor((totalDonated / donorMax) * 100);

  document.getElementById('precent').innerHTML = precentageDonated.toString() + '%';
  document.getElementById('donors').innerHTML = totalDonors.toString() + ' Donors';
  document.getElementById('barPrecentage').innerHTML = precentageDonated.toString() + '%';
  document.getElementById('barPrecentage').style.width = precentageDonated.toString() + '%';
  document.getElementById('donated').innerHTML = '$' + totalDonated.toString();
  document.getElementById('topDonors').innerHTML = tableData;
};

ourRequest.send();
