var request = new XMLHttpRequest();
var list = [];
var pageList = new Array();
var currentPage = 1;
var numberPerPage = 10;
var numberOfPages = 0;
const listBody = document.getElementById('list');

request.open('GET', /* add API end point here */, true);

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);

  data.results.forEach(product => {
    list.push(product);
  })

  load();
};

request.send();

function getNumberOfPages() {
    return Math.ceil(list.length / numberPerPage);
}

function nextPage() {
    currentPage += 1;
    loadList();
}

function previousPage() {
    currentPage -= 1;
    loadList();
}

function firstPage() {
    currentPage = 1;
    loadList();
}

function lastPage() {
    currentPage = numberOfPages;
    loadList();
}

function loadList() {
    var begin = ((currentPage - 1) * numberPerPage);
    var end = begin + numberPerPage;

    pageList = list.slice(begin, end);
    drawList();
    check();
}

function drawList() {

  document.getElementById("list").innerHTML = "";

  for (r = 0; r < pageList.length; r++) {
    var card = document.createElement('a');
    var image = document.createElement('img');
    var name = document.createElement('h2');
    var itemURI = 'https://www.spoonflower.com/en/fabric/' + pageList[r].slug

    card.setAttribute('class', 'card');
    image.setAttribute('class', 'image');
    name.setAttribute('class', 'name');

    card.setAttribute('href', itemURI);

    image.src = pageList[r].project_image_url;
    image.onerror = function(event){
      console.log('error');
      var imageErrorURI = "assets/image_error.jpg";
      this.src = imageErrorURI;
    };

    name.textContent = pageList[r].name;

    listBody.appendChild(card);
    card.appendChild(image);
    card.appendChild(name);
  }
}

function check() {
    document.getElementById("next").disabled = currentPage == numberOfPages ? true : false;
    document.getElementById("previous").disabled = currentPage == 1 ? true : false;
    document.getElementById("first").disabled = currentPage == 1 ? true : false;
    document.getElementById("last").disabled = currentPage == numberOfPages ? true : false;
}

function load() {
    getNumberOfPages();
    loadList();
    console.log(list);
}
