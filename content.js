/* 
 * getNames populates an array of names from the adelphi CLASS page
 * It calls getURL for each of these names.
 */
(function getNames() {
  var table = document.querySelectorAll('td');
  var names = [];
  var professorCells = [];

  for (var i=0, tableLen = table.length; i < tableLen; i++) {
    // Populate array of table cells with Professor names in them
    var links = table[i].querySelectorAll('a');
    for (var j = 0, linksLen = links.length; j < linksLen; j++) {
      if (links[j] && links[j].href.match(/.*adelphi\.edu\/faculty\/profiles.*/)) {
        professorCells.push(links[j]);
      }
    }

    // Grab the names from the previously populated professorCells array
    for (var k = 0, professorCellsLen = professorCells.length; k < professorCellsLen; k++) {
      var name = cleanName(professorCells[k].innerHTML);
      if (names.indexOf(name) === -1) {
        names.push(name);
        getURL(name);
      }
    }
  }
})();

/**
 *  Performs a search on ratemyprofessor to get the professor's URL
 *  
 */
function getURL(name) {
  var lastName = getLastName(name);
  chrome.runtime.sendMessage({
    method: 'POST',
    action: 'xhttp',
    url: 'http://www.ratemyprofessors.com/search.jsp',
    data : 'queryBy=teacherName&schoolName=adelphi+university&queryoption=HEADER&query=' + lastName + '&facetSearch=true'
  }, function(response) {

    var lis = document.createElement('html' );
    lis.innerHTML = response;

    lis = lis.querySelectorAll('.listing.PROFESSOR');

    for (var i = 0, lisLen = lis.length; i < lisLen; i++) {
      var rmpName = lis[i].querySelector('.main').textContent.toUpperCase();
      if (rmpName.indexOf(name) > -1 ) {
        getRating(name, lis[i].querySelector('a').getAttribute('href') );
        /* We don't want to grab multiple ratings for the same name.
         * Currently, if two people have the same name it will output both of their
         * Ratings with no way to distinguish between them. This break is a temporary work-around
         * until i can figure out a more elegant solution.
         */
        break; 
      }
    }

  });
}

/*
 * Retrieve rating from a professor's RMP page
 */
function getRating(name, professorUrl) {
  chrome.runtime.sendMessage({
    method: 'GET',
    action: 'xhttp',
    url: 'http://www.ratemyprofessors.com' + professorUrl
  },function(response) {

    var ratings = {
      overall: -1,
      recommended: "",
      difficulty: -1
    };

    var page = document.createElement('html' );
    page.innerHTML = response;

    grades = page.querySelectorAll('.grade');
    ratings.overall = grades[0].textContent;
    ratings.recommended = grades[1].textContent;
    ratings.difficulty = grades[2].textContent;

    appendRating(name, ratings, professorUrl);

  });
}

/*
 * Append Ratings to CLASS System
 *
 */
function appendRating(name, professorRatings, professorUrl) {

  var table = document.querySelectorAll('td');
  var professorCells = [];
  for (var i = 0, tableLen = table.length; i < tableLen; i++) {
    // Populate array of table cells with Professor names in them
    var links = table[i].querySelectorAll('a');

    for (var j = 0, linksLen = links.length; j < linksLen; j++) {
      if (links[j] && links[j].href.match(/.*adelphi\.edu\/faculty\/profiles.*/)) {
        if (professorCells.indexOf(links[j]) === -1) {
          professorCells.push(links[j]);
        }
      }
    }

  }

  for (var k = 0, professorCellsLen = professorCells.length; k < professorCellsLen; k++) {
    var nameInCell = professorCells[k].innerHTML;
    var lastName = getLastName(name);
    if (cleanName(nameInCell) === name ) {

      professorCells[k].insertAdjacentHTML('afterend', 
                                           '<br/><br/><a href ="http://www.ratemyprofessors.com' +
                                           professorUrl + '" target="_blank">Rate My Professor</a>' +
                                           '<br/>Overall: <strong>' +
                                           professorRatings.overall.fontcolor(colorize(professorRatings.overall)) +
                                           '</strong>' + 
                                           '<br/>Recommended: <strong>' +
                                           professorRatings.recommended +
                                           '</strong>' + 
                                           '<br/>Difficulty: <strong>' +
                                           professorRatings.difficulty.fontcolor(colorize(professorRatings.difficulty)) +
                                           '</strong>'
                                          );
    }
  }
}

/* Given an integer rating, return the appropriate color 
 */
function colorize(rating) {
  if (1 <= rating && rating < 2) return '#FF4136'; // Red
  else if (2 <= rating && rating < 3) return '#FF851B'; // Orange
  else if (3 <= rating && rating < 4) return '#FEFF00'; // Yellow
  else if (4 <= rating && rating < 5) return '#2ECC40'; // Light Green
  else return '#009900'; // Dark Green
}

/* Get the department number from CLASS
 * Returns a string containing the department name
 */
function getDepartmentNum(){
  var table = document.querySelectorAll('td');
  
  for (var i=0, tableLen = table.length; i < tableLen; i++) {
    var links = table[i].querySelectorAll('a');
    for (var j = 0, linksLen = links.length; j < linksLen; j++) {
      if (links[j] && links[j].textContent.match(/[0-9]{4}-[0-9]{3}-[0-9]{3}/)) {
        return links[j].textContent.substring(0,4);
      }
    }
  }
}

/* Return department name given department number
 */
function getDepartmentName(deptNum){
  var departments = {};
}


/* Return the last name of a professor
 */
function getLastName(name) {
  return name
    .replace(/,.*/, '');
}

/* Gets rid of any suffixes or other issues in names that I encounter.
 *
 */
function cleanName(name) {
  return name
    .replace(/ JR[\.]?/, '')
    .replace(/,,+/, ',');
}


console.log(getDepartmentNum());
