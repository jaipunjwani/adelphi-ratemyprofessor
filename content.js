(function getNames(){
    var tds = document.querySelectorAll('td');
    var names = [];
    // Professor's name is in the 6th position of the table
    for (var i=5; i<tds.length; i+= 10) {
        var name = tds[i].querySelector('a').textContent;
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

    // If I get rid of this jquery I can drop the dependency
    $(document).find('tr').each(function() {
        var professorCell = $(this).find('td').eq(5).text();
        if(professorCell.indexOf(name) > -1){
            $(this).find('td').eq(5).append(
                '<br/><br/><a href ="http://www.ratemyprofessors.com' + professorUrl + '" target="_blank">Rate My Professor</a>' +
                    '<br/>Overall: '+ professorRatings.overall +
                    '<br/>Helpfulness: '+ professorRatings.helpfulness +
                    '<br/>Clarity: '+ professorRatings.clarity +
                    '<br\>Easiness: '+ professorRatings.easiness);
        }
    });
}
