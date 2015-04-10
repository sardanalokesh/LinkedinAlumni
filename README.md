#Linkedin Alumni Data Fetcher

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
