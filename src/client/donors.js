const ourRequest = new XMLHttpRequest();
const URL = 'http://localhost:3001/donors';
const donorMax = 25000;

ourRequest.open('GET', URL);

const init = () => {
  document.getElementById('button-submit').addEventListener('click', send);
}

const thousands_separators = (num) => {
  let num_parts = Number.parseFloat(num).toFixed(2).toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
  }

ourRequest.onload = () => {
  const donorsData = JSON.parse(ourRequest.responseText);

  const totalDonors = donorsData.length;
  var totalDonated = 0;
  var precentageDonated = 0;

  var tableData = '<tr><th>Donor</th> <th>Dollars</th> <th>Type</th></tr>';

  donorsData.sort((a ,b) => b.amount - a.amount);
  
  for (let i = 0; i < totalDonors; i++) {
    totalDonated += Number(donorsData[i].amount);
  }

  for (let i = 0; i < 10; i++) {
    let donor = donorsData[i];
    tableData += `<tr><td>${donor.name}</td> <td>$${donor.amount}</td> <td>${donor.type}</td></tr>`;
  }

  precentageDonated = Math.floor((totalDonated / donorMax) * 100);

  totalDonated = thousands_separators(totalDonated);

  document.getElementById('precent').innerHTML = precentageDonated + '%';
  document.getElementById('donors').innerHTML = totalDonors + ' Donors';
  document.getElementById('barPrecentage').innerHTML = precentageDonated + '%';
  document.getElementById('barPrecentage').style.width = ((precentageDonated > 100) ? 100 : precentageDonated) + '%';
  document.getElementById('donated').innerHTML = '$' + totalDonated;
  document.getElementById('topDonors').innerHTML = tableData;
  document.getElementById('totalDonated').innerHTML = '$' + totalDonated;
};

const send = (event) => {
  event.preventDefault();
  
  const xmlhttp = new XMLHttpRequest();
  const name = document.getElementById('donorName').value;
  const amount = Number(document.getElementById('donorAmount').value).toFixed(2);
  const type = document.getElementById('donorType').value;
  
  const obj = {"name": name, "amount": amount, "type": type};
  
  
  xmlhttp.open('POST', 'http://localhost:3001/donors');
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(obj));
}

donorDonation = () => {
  document.getElementById('makeGift').style.display = 'block';
}

closeModal = () => {
  document.getElementById('makeGift').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', init);

ourRequest.send();