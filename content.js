(function getNames(){
    var table = document.querySelectorAll('td');
    var names = [];
    var professorCells = [];
    for (var i=0; i<table.length; i++) {

        // Populate array of table cells with Professor names in them
        var links = table[i].querySelectorAll('a');
        for( var j = 0; j < links.length; j++){
            if( links[j] && links[j].href.match(/.*adelphi\.edu\/faculty\/profiles.*/)){
                professorCells.push(links[j]);
            }
        }

        // Grab the names from the previously populated professorCells array
        for( var k = 0; k < professorCells.length; k++){
            var name = professorCells[k].innerHTML;
            name = cleanName(name);
            if( names.indexOf(name) == -1) {
                names.push(name);
                getURL(name);
            }
        }
    }
    console.log(names);
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
    }, function(response){

        var lis = document.createElement( 'html' );
        lis.innerHTML = response;

        lis = lis.querySelectorAll('.listing.PROFESSOR');

        for( var i = 0; i < lis.length; i++){
            var rmpName = lis[i].querySelector('.main').textContent.toUpperCase();
            if( rmpName.indexOf(name) > -1 ) {
                getRating( name, lis[i].querySelector('a').getAttribute('href') );
                // We don't want to grab multiple ratings for the same name.
                // Currently, if two people have the same name it will output both of their
                // Ratings with no way to distinguish between them. This break is a temporary work-around
                // until i can figure out a more elegant solution.
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
            helpfulness: -1,
            clarity: -1,
            easiness: -1
        };

        var page = document.createElement( 'html' );
        page.innerHTML = response;

        ratings.overall = page.querySelector('.grade').textContent;
        ratings.helpfulness = page.querySelectorAll('.rating')[0].textContent;
        ratings.clarity = page.querySelectorAll('.rating')[1].textContent;
        ratings.easiness = page.querySelectorAll('.rating')[2].textContent;

        appendRating(name, ratings, professorUrl);

    });
}

/*
 * Append Ratings to CLASS System
 *
 */
function appendRating(name, professorRatings, professorUrl){

    var table = document.querySelectorAll('td');
    var professorCells = [];
    for( var i = 0; i < table.length; i++){
        // Populate array of table cells with Professor names in them
        var links = table[i].querySelectorAll('a');
        for( var j = 0; j < links.length; j++){
            if( links[j] && links[j].href.match(/.*adelphi\.edu\/faculty\/profiles.*/)){
                if( professorCells.indexOf(links[j]) == -1){
                    professorCells.push(links[j]);
                }
            }
        }

    }

    for( var k = 0; k < professorCells.length; k++){
        var nameInCell = professorCells[k].innerHTML;
        var lastName = getLastName(name);
        if( cleanName(nameInCell) === name ) {

            professorCells[k].insertAdjacentHTML('afterend', 
                                                 '<br/><br/><a href ="http://www.ratemyprofessors.com' +
                                                 professorUrl + '" target="_blank">Rate My Professor</a>' +
                                                 '<br/>Overall: ' +
                                                 professorRatings.overall.fontcolor(colorize(professorRatings.overall)) +
                                                 '<br/>Helpfulness: ' +
                                                 professorRatings.helpfulness.fontcolor(colorize(professorRatings.helpfulness)) +
                                                 '<br/>Clarity: '+
                                                 professorRatings.clarity.fontcolor(colorize(professorRatings.clarity)) +
                                                 '<br/>Easiness: '+
                                                 professorRatings.easiness.fontcolor(colorize(professorRatings.easiness)));
        }
    }
}

/* Given an integer rating, return the appropriate color 
 * 1 <= rating < 2 : Red
 * 2 <= rating < 3 : Orange
 * 3 <= rating < 4 : Yellow
 * 4 <= rating < 5 : light Green
 * 5 : Dark green
 */
function colorize(rating) {
    if( 1 <= rating && rating < 2){
        return "#FF4136";
    }
    else if( 2 <= rating && rating < 3){
        return "#FF851B";
    }
    else if( 3 <= rating && rating < 4){
        return "#FFDC00";
    }
    else if( 4 <= rating && rating < 5){
        return "#2ECC40";
    }
    else {
        return "green";
    }
}


/* Return the last name of a professor
 */
function getLastName(name){
    return name.replace(/,.*/, "");
}

/* Gets rid of any suffixes or other issues in names that I encounter.
 *
 */
function cleanName(name){
    return name.replace(/ JR[\.]?/, "")
        .replace(/,,+/, ",");
}
