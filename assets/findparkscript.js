var NPSAPIKey = "4YnR8c2olMSt9dduqp0usId2Vcraoya48fL64NG4";

var mapAPIKey = "AuAUY4TlYbtPjllHt7cGntW5IMr_yCO4d9S-tKitFhKxHdprRwNZYtFufhBMdmkb";

        




$("#search-btn").on("click", function(event) {

    event.preventDefault();
        

    var statePicked = $("#state-input").val().trim();

    var npsURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + statePicked + "&limit=5" + "&api_key=" + NPSAPIKey;

    $.ajax({
        url: npsURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        

        $("#stateBtns").empty();    

    
        for (var i = 0; i < 5; i++) {
    
          
          var button = $("<button>");
          
          button.addClass("createBtn");

          button.addClass("pure-button");
         
          button.attr("data-name", response.data[i].parkCode);
          
          button.text(response.data[i].name);
         
          $("#stateBtns").append(button);
        }



    });

});


function displayParkInfo() {

    var stateParkCode = $(this).attr("data-name");

    var parkCodeURL = "https://developer.nps.gov/api/v1/parks?parkCode=" + stateParkCode + "&api_key=" + NPSAPIKey;


    $.ajax({
        url: parkCodeURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        $(".parkInfo").empty();

        var parkName = response.data[0].fullName;

        var nameP = $("<h3>").text(parkName);

        nameP.addClass("parkName");

        $(".parkInfo").append(nameP);

        var parkAddress = response.data[0].addresses[1].line1;

        var addressPOne = $("<p>").text(parkAddress);

        addressPOne.addClass("address");

        $(".parkInfo").append(addressPOne);

        var parkCity = response.data[0].addresses[1].city;

        var parkState = response.data[0].addresses[1].stateCode;

        var parkZip = response.data[0].addresses[1].postalCode;

        var addressPTwo = $("<p>").text(parkCity + ", " + parkState + " " + parkZip);

        addressPTwo.addClass("address");

        $(".parkInfo").append(addressPTwo);

        var parkEmail = response.data[0].contacts.emailAddresses[0].emailAddress;

        var emailP = $("<p>").text("Email: " + parkEmail);

        $(".parkInfo").append(emailP);

        var parkPhone = response.data[0].contacts.phoneNumbers[0].phoneNumber;

        var phoneP = $("<p>").text("Phone: " + parkPhone);

        $(".parkInfo").append(phoneP);



        

    });



}


$(document).on("click", ".createBtn", displayParkInfo);