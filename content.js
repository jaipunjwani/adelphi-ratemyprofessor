var names = [];

function getNames(){
				// Loop through the Professors column to grab their names
				// TODO: Find a better way to iterate over HTML columns
				var tds = document.getElementsByTagName('td');
				for (var i=5; i<tds.length; i+= 10) {
								var name = tds[i].getElementsByTagName('a')[0].innerHTML;
								names.push(name);
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
								data : 'queryBy=teacherName&schoolName=adelphi+university&queryoption=HEADER&query=' + last_name
				}, function (response) {

								console.log(response);
				});
}






getNames();
console.log(names);

for(name in names)
				getURL(name);
