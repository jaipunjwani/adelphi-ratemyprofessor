var names = [];

function getNames(){
  // Loop through the Professors column to grab their names
  // TODO: Find a better way to iterate over HTML columns
  var tds = document.getElementsByTagName('td');
  for (var i=5; i<tds.length; i+= 10) {
    if(typeof tds[i].getElementsByTagName('a') != 'undefined'){
      var name = tds[i].getElementsByTagName('a')[0].textContent.toUpperCase();
      names.push(name);
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
  }, function (response) {

    //console.log(response);
    var lis = document.createElement( 'html' );
    lis.innerHTML = response;

    lis = lis.getElementsByClassName('listing PROFESSOR');
    //console.log(lis);

    for( var i = 0; i < lis.length; i++){
      var rmp_name = lis[i].getElementsByClassName('main')[0].innerText.toUpperCase();
      //console.log(rmp_name);
      //console.log(name);
      //console.log(rmp_name.indexOf(name));
      if( rmp_name.indexOf(name) > -1 ) {
        console.log(lis[i].getElementsByTagName('a')[0].getAttribute('href'));
      }
    }


  });
}






getNames();
console.log(names);

for(var i = 0; i < names.length; i++){
  getURL(names[i]);
}
