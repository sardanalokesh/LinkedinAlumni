/**********************************************
LINKEDIN ALUMNI DATA FETCHER

author lokesh.sardana

With the help of this script, you can easily fetch the details of your school's alumni which are accessible from your account.

Steps to run this script:

1. Go to Linkedin, search for your school and go to the 'Students and Alumni' tab.
2. Now put whatever filters you want to put on that page, like: where they live, where they work, what they do etc.
3. Notice the URL, you will see something like:
https://www.linkedin.com/edu/alumni?id=13502&facets=G.in:6508&keyword=&dateType=attended&startYear=&endYear=&
4. Copy the values of 'id' and 'facets' parameter and respectively assign them to the SCHOOL_ID and FILTER variables below.
5. Set the total number of records you want to fetch. Better to keep this number not very high. Too many calls to server may temporarily block your account.
6. The 'count' variable is to set number of records to fetch per iteration. However, linkedin doesn't allow you to fetch more than 200 record per transaction. So, do not set it beyond that value.
7. Now you are good to go. Open your browser, login to linkedin and run this script in the console.

***********************************************/

var SCHOOL_ID = "13502"; //linkedin id of the school
var FILTER = "G.in:6508" //filter values
var start = 0; 
var total = 400; //total number of records to be fetched
var count = 200; //total number of records to be fetched per iteration
var output = {};
getData(start, total, output, count);

function extractEmail(alumni, index, start, total, output, count) {
	if (alumni[index]) {
		console.log("checking email for "+alumni[index].fullName);
		var emails = [];
		$.ajax({
			url: alumni[index].publicProfileUrl,
			success: function(result) {
				emails = result.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
				if (!output[alumni[index].distance])
	        		output[alumni[index].distance] = [];
	        	if(emails)
		        	output[alumni[index].distance].push({
		        			name: alumni[index].fullName,
		        			id: alumni[index].memberId,
		        			branch: alumni[index].fos,
		        			batch: alumni[index].gradYear,
		        			emails: emails
		        		});
	        	if (index < alumni.length-1)
	        		setTimeout(extractEmail(alumni, index+1, start, total, output, count), 5000*Math.random());
	        	else {
	        		if (start < total) {
			        	start = start + count;
			        	setTimeout(getData(start, total, output, count),3000*Math.random());
			        } else {
			        	console.log("data fetching complete!");
			        	console.log(output);
			        	for (var i in output) {
			        		for (var j=0; j<output[i].length; j++){
			        			console.log("Name: "+output[i][j].name+";Branch: "+output[i][j].branch+";Batch: "+output[i][j].batch+";Emails: "+output[i][j].emails.join());
			        		}
			        	}
			        }
	        	}
			},
			error: function(error) {
				console.log("ERROR in extracting email from "+url);
			}
		});
	}
}

function getData(start, total, output, count) {
	var processor = "https://www.linkedin.com/edu/alumni-by-school";
	var schoolId = SCHOOL_ID;
	var filter = FILTER;
	var params = {
		    id: schoolId,
		    facets: filter,
		    start: start,
		    count: count
		};
		var url = processor + "?" + $.param(params);
		if (start < total)
			console.log("fetching data..."+(start/total*100).toFixed(2)+"%");
		$.ajax({
		    url: url,
		    success: function(result) {
		        var alumni = result.content.alumniBySchool.people.values;
		        extractEmail(alumni, 0, start, total, output, count);
		    },
		    error: function(error) {
		        alert(JSON.stringify(error));
		    }
		});

}