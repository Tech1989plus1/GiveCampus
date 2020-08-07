const ourRequest = new XMLHttpRequest();

ourRequest.open('GET', 'http://localhost:3001/donors');

ourRequest.onload = () => {
  var donorsData = JSON.parse(ourRequest.responseText);
  
};

ourRequest.send();
