var map;

function initMap() {

map = new google.maps.Map(document.getElementById('map'), {
center: {lat: -34.397, lng: 150.644},
zoom: 8
});
}

function imageClick(url) {
    window.location = url;
}

function submitBooking(){
	var guests = document.getElementById("numberGuests").value;
	if (guests < 1 || guests > 30){
	alert('Invalid amount of guests, must be greater than 0');
	}
	var time = document.getElementById("startTime").value;
	if (time < "09:30" || time > "21:00"){
	//alert("Invalid time input, check open times");
	}
	var currentDate = newDate();
    /*var day = currentDate.getDate();
    var month = currentDate.getMonth()+1; //January is 0
    var year = currentDate.getFullYear();
    if(day<10){
    	day='0'+day
    } 
    if(month<10){
       month='0'+month
    }
     currentDate = year+'-'+month+'-'+day;
	document.getElementById("selectedDate").setAttribute("min",currentDate);*/
	//var bookingDate = document.getElementById("selectedDate").value;
	//if(!bookingDate){
	//alert("hello");
//}
}