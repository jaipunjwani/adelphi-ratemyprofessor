(function getNames(){
    var table = document.querySelector('table');
    var names = [];
    for (var i=0; i<table.rows.length; i++) {
        if (table.rows[i].querySelector('th')){
            continue;
        }
        var name = table.rows[i].cells[5].querySelector('a').innerHTML;
        if( names.indexOf(name) == -1) {
            names.push(name);
            getURL(name);
        }
    }
})();

/**
 *  Performs a search on ratemyprofessor to get the professor's URL
 *  
 */
function getURL(name) {
    var last_name = name.replace(/,.*/, "");
    chrome.runtime.sendMessage({
        method: 'POST',
        action: 'xhttp',
        url: 'http://www.ratemyprofessors.com/search.jsp',
        data : 'queryBy=teacherName&schoolName=adelphi+university&queryoption=HEADER&query=' + last_name + '&facetSearch=true'
    }, function(response){

        var lis = document.createElement( 'html' );
        lis.innerHTML = response;

        lis = lis.querySelectorAll('.listing.PROFESSOR');

        for( var i = 0; i < lis.length; i++){
            var rmp_name = lis[i].querySelector('.main').textContent.toUpperCase();
            if( rmp_name.indexOf(name) > -1 ) {
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


    var table = document.querySelector('table');
    for( var i = 0; i < table.rows.length; i++){
        var professorCell = table.rows[i].cells[5];
       if(professorCell.textContent.indexOf(name) > -1){
           professorCell.insertAdjacentHTML('beforeend', 
                '<br/><br/><a href ="http://www.ratemyprofessors.com' + professorUrl + '" target="_blank">Rate My Professor</a>' +
                    '<br/>Overall: '+ professorRatings.overall.fontcolor(colorize(professorRatings.overall)) +
                    '<br/>Helpfulness: '+ professorRatings.helpfulness.fontcolor(colorize(professorRatings.helpfulness)) +
                    '<br/>Clarity: '+ professorRatings.clarity.fontcolor(colorize(professorRatings.clarity)) +
                   '<br/>Easiness: '+ professorRatings.easiness.fontcolor(colorize(professorRatings.easiness)));
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
