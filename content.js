// Hash containing all of the departments at Adelphi
var hashDepartment = {
	'0020':'LIBRARY INFORMATION LITERACY',
	'0083':'HONORS',
	'0101':'AFRICAN, BLK & CARIBB STUDIES',
	'0103':'ANTHROPOLOGY',
	'0104':'ART',
	'0105':'BIOLOGY',
	'0106':'CHEMISTRY',
	'0108':'COMMUNICATIONS',
	'0111':'ART HISTORY',
	'0112':'EARTH SCIENCE',
	'0122':'ENGLISH',
	'0124':'CLASSICS',
	'0125':'ENVIRONMENTAL STUDIES',
	'0127':'ENGLISH AS A SECOND LANGUAGE',
	'0128':'FRENCH',
	'0129':'CHINESE MANDARIN',
	'0130':'GERMAN',
	'0131':'GREEK',
	'0132':'HEBREW',
	'0133':'GENERAL STUDIES A&S',
	'0135':'ARABIC',
	'0136':'HISTORY',
	'0137':'INTERDISCIPLINARY STUDIES',
	'0138':'ITALIAN',
	'0139':'LANGUAGES',
	'0140':'LATIN',
	'0141':'JAPANESE',
	'0142':'LINGUISTICS',
	'0144':'MATHEMATICS',
	'0145':'COMPUTER SCIENCE',
	'0148':'MATH TEACHERS PROGRAM',
	'0154':'PHILOSOPHY',
	'0156':'PHYSICS',
	'0158':'POLITICAL SCIENCE',
	'0160':'PORTUGUESE',
	'0169':'RUSSIAN',
	'0170':'SOCIOLOGY',
	'0172':'SPANISH',
	'0173':'TRANSLATION STUDIES',
	'0187':'INTERNATIONAL STUDIES PROGRAM',
	'0191':'DANCE',
	'0192':'THEATRE-ACTING',
	'0193':'THEATRE-TECH & DESIGN',
	'0195':'MUSIC THEORY',
	'0196':'MUSIC HISTORY',
	'0197':'MUSIC PERFORMANCE GROUPS',
	'0198':'MUSIC PRIVATE INSTRUCTION',
	'0199':'MUSIC EDUCATION',
	'0201':'ACCOUNTING',
	'0202':'BANKING',
	'0203':'ECONOMICS',
	'0204':'BUSINESS ADMINISTRATION',
	'0205':'BUSINESS TECHNOLOGY',
	'0206':'HEALTH SERVICES ADMINISTRATION',
	'0207':'DECISION SCIENCES',
	'0208':'HUMAN RESOURCE MANAGEMENT',
	'0209':'FINANCE',
	'0210':'MANAGEMENT',
	'0211':'BUSINESS LAW',
	'0212':'MARKETING',
	'0213':'BUSINESS FUNDAMENTALS',
	'0214':'INTEGRATIVE EXPERIENCE',
	'0216':'Sport Management',
	'0302':'NURSING',
	'0304':'PUBLIC HEALTH',
	'0306':'NUTRITION',
	'0308':'HEALTHCARE INFORMATICS',
	'0404':'SOCIAL WORK',
	'0501':'PSYCHOLOGY',
	'0502':'GENERAL PSYCHOLOGY',
	'0503':'ADVANCED CLINICAL PSYCHOLOGY',
	'0504':'SCHOOL PSYCHOLOGY',
	'0505':'POSTGRADUATE CERTIFICATE PGM',
	'0506':'POSTDOCTORAL PSYCHOTHERAPY',
	'0507':'MENTAL HEALTH COUNSELING',
	'0508':'POSTGRADUATE PSYCHOANALYTIC',
	'0601':'UC LIBERAL STUDIES',
	'0602':'ADULT BAC LEARNING EXPERIENCE',
	'0606':'UC CRIMINAL JUSTICE',
	'0610':'UC FINE & APPLIED ART',
	'0611':'UC HUMANISTIC STUDIES',
	'0612':'UC NATURAL SCIENCE',
	'0613':'UC SOCIAL SCIENCE',
	'0615':'UC MGMT & COMMUNICATIONS',
	'0616':'Emergency Management',
	'0620':'GENERAL STUDIES ENGLISH',
	'0621':'GENERAL STUDIES HISTORY',
	'0623':'GENERAL STUDIES SOCIAL SCIENCE',
	'0625':'GENERAL STUDIES MATH & SCIENCE',
	'0632':'HEALTH INFORMATION TECHNOLOGY',
	'0635':'NYSUT',
	'0637':'UC INTERDISCIPLINARY STUDIES',
	'0801':'EDUCATION',
	'0802':'EDUCATION - LITERACY',
	'0803':'EDUCATION - ART',
	'0804':'EDUCATION - BILINGUAL ED',
	'0805':'EDUCATION - EDUCATION STUDIES',
	'0806':'EDUCATIONAL LEADERSHIP & TECH',
	'0807':'EDUCATION - ELEMENTARY ED',
	'0809':'EDUCATION - ADOLESCENT ED',
	'0810':'EDUCATION - SPECIAL EDUCATION',
	'0811':'CLA ENGLISH REQUIREMENTS',
	'0812':'EDUCATION - TEACHING FELLOWS',
	'0814':'EDUCATION - EARLY CHILDHOOD',
	'0820':'EDUCATION - EARLY CHILD SPECED',
	'0832':'MUSIC EDUCATION',
	'0834':'HEALTH STUDIES',
	'0835':'EDUCATION - NYSUT',
	'0836':'EDUCATION - STEP',
	'0852':'PHYSICAL EDUCATION',
	'0853':'PHYSICAL EDUCATION - SKILLS',
	'0858':'EDUCATIONAL TECHNOLOGY',
	'0873':'SPEECH-LANGUAGE SCIENCES & DIS',
	'0876':'COMMUNICATION SCIENCES - ARTS',
	'0878':'COMMUNICATION SCI - PATHOLOGY',
	'0879':'COMMUNICATION SCIENCES ',
	'0893':'EDUCATIONAL THEATRE',
	'0913':'COMMUNICATION WRITTEN',
	'0952':'FRESHMAN EXPERIENCE',
	'0960':'LEVERMORE GLOBAL SCHOLARS'
};

//Array containing all of the departments on ratemyprofessor
var rmpDepts = [
"ACCOUNTING",
	"AGRICULTURE",
	"ANTHROPOLOGY",
	"ARCHITECTURE",
	"ART HISTORY",
	"BIOLOGY",
	"BUSINESS",
	"CHEMISTRY",
	"CLASSICS",
	"COMMUNICATION",
	"COMPUTER SCIENCE",
	"CRIMINAL JUSTICE",
	"CULINARY ARTS",
	"DESIGN",
	"DISTANCE LEARNING",
	"ECONOMICS",
	"EDUCATION",
	"EMERGENCY MANAGEMENT",
	"ENGINEERING",
	"ENGLISH",
	"ETHNIC STUDIES",
	"FILM",
	"FINANCE",
	"FINE ARTS",
	"GEOGRAPHY",
	"GEOLOGY",
	"GRAPHIC ARTS",
	"HEALTH SCIENCE",
	"HISTORY",
	"HUMANITIES",
	"INFORMATION SCIENCE",
	"INTERNATIONAL STUDIES",
	"JOURNALISM",
	"LANGUAGES",
	"LAW",
	"LITERATURE",
	"MANAGEMENT",
	"MARKETING",
	"MATHEMATICS",
	"MEDICINE",
	"MUSIC",
	"NURSING",
	"NUTRITION & EXERCISE SCI",
	"PHILOSOPHY",
	"PHYSICAL EDUCATION",
	"PHYSICS",
	"POLITICAL SCIENCE",
	"PSYCHOLOGY",
	"RELIGION",
	"SCIENCE",
	"SOCIAL SCIENCE",
	"SOCIAL WORK",
	"SOCIOLOGY",
	"SPEECH PATHOLOGY & AUDIOLOGY",
	"THEATER",
	"WOMEN'S STUDIES",
	"WRITING"
	];


	/* 
	 * getNames populates an array of names from the adelphi CLASS page
	 * It calls getURL for each of these names.
	 */
	(function getNames() {
		var table = document.querySelectorAll('td');
		var names = [];
		var professorCells = [];
		var dept = getDepartment();


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
					getURL(name, dept);
				}
			}
		}
	})();

/**
 *  Performs a search on ratemyprofessor to get the professor's URL
 *  
 */
function getURL(name, dept) {
	var lastName = getLastName(name);

	// If RMP has the department listed, use it in the query
	if(rmpDepts.indexOf(dept) > 0) {
		var queryData = 'queryBy=teacherName&schoolName=adelphi+university&dept=' + dept + '&queryoption=HEADER&query=' + lastName + '&facetSearch=true';
	}
	else {
		var queryData = 'queryBy=teacherName&schoolName=adelphi+university&queryoption=HEADER&query=' + lastName + '&facetSearch=true';
	}

	chrome.runtime.sendMessage({
		method: 'POST',
		action: 'xhttp',
		url: 'http://www.ratemyprofessors.com/search.jsp',
		data : queryData
	}, function(response) {

		var lis = document.createElement('html' );
		lis.innerHTML = response;

		lis = lis.querySelectorAll('.listing.PROFESSOR');

		for (var i = 0, lisLen = lis.length; i < lisLen; i++) {
			var rmpName = lis[i].querySelector('.main').textContent.toUpperCase();
			if (rmpName.indexOf(name) > -1 ) {
				getRating(name, lis[i].querySelector('a').getAttribute('href') );
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

		var page = document.createElement('html' );
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
					'<br/>Helpfulness: <strong>' +
					professorRatings.helpfulness.fontcolor(colorize(professorRatings.helpfulness)) +
					'</strong>' +
					'<br/>Clarity: <strong>' +
					professorRatings.clarity.fontcolor(colorize(professorRatings.clarity)) +
					'</strong>' +
					'<br/>Easiness: <strong>' +
					professorRatings.easiness.fontcolor(colorize(professorRatings.easiness)) +
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
	else if (3 <= rating && rating < 4) return '#FFD300'; // Yellow
	else if (4 <= rating && rating < 5) return '#2ECC40'; // Light Green
	else return '#009900'; // Dark Green
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




/* Return the name of the department. Assumes you are on a course search page on CLASS
 */
function getDepartment() {
	var tmp = document.querySelectorAll('input');
	var dept = '';
	for(var i = 0, tmpLen = tmp.length; i < tmpLen; i++){
		if(tmp[i].name == 'COURSE'){
			dept = tmp[i].value.substring(0,4);
			break;
		}
	}
	return hashDepartment[dept];
}


