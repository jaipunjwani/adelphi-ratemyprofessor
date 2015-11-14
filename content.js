function getNames(){
    var tds = document.getElementsByTagName('td');
    var names = [];
    for (var i=5; i<tds.length; i+= 10) {
        var name = tds[i].getElementsByTagName('a')[0].innerHTML;
        if( names.indexOf(name) == -1) {
            names.push(name);
            getURL(name);
        }
    }
}

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
        //console.log(response);
        var lis = document.createElement( 'html' );
        lis.innerHTML = response;

        lis = lis.getElementsByClassName('listing PROFESSOR');
        //console.log(lis);

        for( var i = 0; i < lis.length; i++){
            var rmp_name = lis[i].getElementsByClassName('main')[0].innerText.toUpperCase();
            //console.log("RMP NAME IS: " + rmp_name);
            //console.log("NAME PASSED TO FUNCTION WAS: " + name);
            //console.log("RESULT OF INDEX_OF WAS: " + rmp_name.indexOf(name));
            if( rmp_name.indexOf(name) > -1 ) {
                getRating( name, lis[i].getElementsByTagName('a')[0].getAttribute('href') );
            }else{
                alert("there was an error loading the URL");
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

        ratings.overall = $(response).find('div.grade').first().text();
        ratings.helpfulness = $(response).find('div.rating:eq(0)').text();
        ratings.clarity = $(response).find('div.rating:eq(1)').text();
        ratings.easiness = $(response).find('div.rating:eq(2)').text();

        appendRating(name, ratings);

    });
}

/*
 * Append Ratings to CLASS System
 *
 */
function appendRating(name, professorRatings){

    $(document).find('tr').each(function() {

        var professorCell = $(this).find('td').eq(5).text();
        if(professorCell.indexOf(name) > -1){
            $(this).find('td').eq(5).append(
                '<br/>Overall: '+ professorRatings.overall +
                    '\nHelpfulness: '+ professorRatings.helpfulness +
                    '\nClarity: '+ professorRatings.clarity +
                    '\nEasiness: '+ professorRatings.easiness);
        } else{
            console.log(professorCell.indexOf(name));
        }
    });
}

getNames();
