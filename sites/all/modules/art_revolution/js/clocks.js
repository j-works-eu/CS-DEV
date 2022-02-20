// (function ($) {
//
//
//
//         function main()
//         {
//             function displayTime() {
//                 var currentTime = new Date();
//                 var hours = currentTime.getHours();
//                 var minutes = currentTime.getMinutes();
//                 var seconds = currentTime.getSeconds();
//                 var meridiem = "AM";
//
//                 if (hours < 12){
//
//                 }
//                 if (hours > 12){
//                     hours = hours - 12;
//                     meridiem = "PM";
//                 }
//                 if (hours === 0 ){
//                     hours = 12;
//                 }
//                 if(hours < 10){
//                     hours = "0" + hours;
//                 }
//                 if(minutes < 10) {
//                     minutes = "0" + minutes;
//                 }
//                 if(seconds < 10){
//                     seconds = "0" + seconds;
//                 }
//
//                 var mor = "GOOD MORNING";
//                 var greet = document.getElementsByClassName("greetings");
//                 greet.innerHTML = mor;
//
//                 // This gets a "handle" to the clock div in our HTML
//                 var clockDiv = document.getElementById('clockva');
//                 // Then we set the text inside the clock div
//                 // to the hours, minutes, and seconds of the current time
//
//                 clockDiv.innerHTML = hours + ":" + minutes + ":" + seconds + " " + meridiem;
//             }
//             // This runs the displayTime function the first time
//             displayTime();
//             setInterval(displayTime, 1000);
//
//             function showDate() {
//
//                 var weekday = new Array(7);
//                 weekday[0] =  "Sunday";
//                 weekday[1] = "Monday";
//                 weekday[2] = "Tuesday";
//                 weekday[3] = "Wednesday";
//                 weekday[4] = "Thursday";
//                 weekday[5] = "Friday";
//                 weekday[6] = "Saturday";
//
//                 var month = new Array();
//                 month[0] = "Jan";
//                 month[1] = "Feb";
//                 month[2] = "Mar";
//                 month[3] = "Apr";
//                 month[4] = "May";
//                 month[5] = "Jun";
//                 month[6] = "Jul";
//                 month[7] = "Aug";
//                 month[8] = "Sept";
//                 month[9] = "Oct";
//                 month[10] = "Nov";
//                 month[11] = "Dec";
//
//                 var todayDate = new Date();
//                 var days = weekday[todayDate.getDay()];
//                 var months = month[todayDate.getMonth()];
//                 var year = todayDate.getFullYear();
//
//                 var dateDiv = document.getElementById('dateva');
//                 dateDiv.innerHTML = days + ", "+ months + " " + year;
//             }
//
//             showDate();
//         }
//
//     window.onload = main ;
//
//
//
// })(jQuery);