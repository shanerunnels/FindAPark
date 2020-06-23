ar NPSAPIKey = "4YnR8c2olMSt9dduqp0usId2Vcraoya48fL64NG4";

var mapDiv = $("#myMap");

        




u("#search-btn").on("click", function(event) {

    event.preventDefault();
        

    var statePicked = $("#state-input").val().trim();

    var npsURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + statePicked + "&limit=5" + "&api_key=" + NPSAPIKey;

    $.ajax({
        url: npsURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        

        u("#stateBtns").empty();    

    
        for (var i = 0; i < 5; i++) {
    
          
          var button = u("<button>");
          
          u(button).addClass("createBtn");

          u(button).addClass("pure-button");
         
          u(button).attr("data-name", response.data[i].parkCode);
          
          u(button).text(response.data[i].name);
         
          u("#stateBtns").append(button);
        }



    });

});


function displayParkInfo() {

    var stateParkCode = u(this).attr("data-name");

    var parkCodeURL = "https://developer.nps.gov/api/v1/parks?parkCode=" + stateParkCode + "&api_key=" + NPSAPIKey;


    $.ajax({
        url: parkCodeURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        u(".parkInfo").empty();

        u("#parkDescription").empty();

        u("#parkActivities").empty();

        u("#parkHours").empty();

        u(mapDiv).removeClass("hide");


        var parkName = response.data[0].fullName;

        var nameP = u("<h3>").text(parkName);

        u(nameP).addClass("parkName");

        u(".parkInfo").append(nameP);



        var parkAddress = response.data[0].addresses[1].line1;

        var addressPOne = u("<p>").text(parkAddress);

        u(addressPOne).addClass("address");

        u(".parkInfo").append(addressPOne);



        var parkCity = response.data[0].addresses[1].city;

        var parkState = response.data[0].addresses[1].stateCode;

        var parkZip = response.data[0].addresses[1].postalCode;

        var addressPTwo = u("<p>").text(parkCity + ", " + parkState + " " + parkZip);

        u(addressPTwo).addClass("address");

        u(".parkInfo").append(addressPTwo);



        var parkEmail = response.data[0].contacts.emailAddresses[0].emailAddress;

        var emailP = u("<p>").text("Email: " + parkEmail);

        u(".parkInfo").append(emailP);


        

        var parkDescript = response.data[0].description;

        var descriptP = u("<p>").text(parkDescript);

        u("#parkDescription").append(descriptP);

        

        
     
       

        var hoursHeader = u("<h3>").text("Standard Hours");

        u("#parkHours").append(hoursHeader);


        var sundayHours = response.data[0].operatingHours[0].standardHours.sunday;

        var sundayP = u("<p>").text("Sunday: " + sundayHours);

        u(sundayP).addClass("amenities");

        u("#parkHours").append(sundayP);


        var mondayHours = response.data[0].operatingHours[0].standardHours.monday;

        var mondayP = u("<p>").text("Monday: " + mondayHours);

        u(mondayP).addClass("amenities");

        u("#parkHours").append(mondayP);


        var tuesdayHours = response.data[0].operatingHours[0].standardHours.tuesday;
        
        var tuesdayP = u("<p>").text("Tuesday: " + tuesdayHours);

        u(tuesdayP).addClass("amenities");

        u("#parkHours").append(tuesdayP);


        var wednesdayHours = response.data[0].operatingHours[0].standardHours.wednesday;

        var wednesdayP = u("<p>").text("Wednesday: " + wednesdayHours);

        u(wednesdayP).addClass("amenities");

        u("#parkHours").append(wednesdayP);


        var thursdayHours = response.data[0].operatingHours[0].standardHours.thursday;

        var thursdayP = u("<p>").text("Thursday: " + thursdayHours);

        u(thursdayP).addClass("amenities");

        u("#parkHours").append(thursdayP);



        var fridayHours = response.data[0].operatingHours[0].standardHours.friday;

        var fridayP = u("<p>").text("Friday: " + fridayHours);

        u(fridayP).addClass("amenities");

        u("#parkHours").append(fridayP);



        var saturdayHours = response.data[0].operatingHours[0].standardHours.saturday;

        var saturdayP = u("<p>").text("Saturday: " + saturdayHours);

        u(saturdayP).addClass("amenities");

        u("#parkHours").append(saturdayP);



        var parkLat = response.data[0].latitude;

        var parkLon = response.data[0].longitude;

        if (!parkLat && !parkLon){

            u(mapDiv).addClass("hide");
        } else {
            GetMap(parkLat, parkLon, parkName);

        }

        



        var activityHeader = u("<h3>").text("Activities");

        u("#parkActivities").append(activityHeader);

        for (var i = 0; i < 5; i++) {

            var parkActivity = response.data[0].activities[i].name;

            var activityP = u("<p>").text(parkActivity);

            u(activityP).addClass("activities");

            u("#parkActivities").append(activityP);

        }  
        
        
        
       

        var parkPhone = response.data[0].contacts.phoneNumbers[0].phoneNumber;

    

        var phoneP = u("<p>").text("Phone: " + parkPhone);
                

        u(".parkInfo").append(phoneP);

 




    });



}


function GetMap(lat, lon, name)
    {
        var map = new Microsoft.Maps.Map('#myMap');

        var map = new Microsoft.Maps.Map('#myMap', {
        
        center: new Microsoft.Maps.Location(lat, lon),
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: 10
        });

        var center = map.getCenter();

        var pin = new Microsoft.Maps.Pushpin(center, {
            title: name,
            
        });

        //Add the pushpin to the map
        map.entities.push(pin);

    }






u(document).on("click", ".createBtn", displayParkInfo);
