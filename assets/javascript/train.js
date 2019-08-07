$(function() {
    // Initialize Firebase
    let config = {
        apiKey: "AIzaSyAtELD4TxZMJEiRFUn5HDHiv11jj2PgJYM",
        authDomain: "fir-project-16bda.firebaseapp.com",
        databaseURL: "https://fir-project-16bda.firebaseio.com",
        projectId: "fir-project-16bda",
        storageBucket: "",
        messagingSenderId: "206555219667",
        appId: "1:206555219667:web:f9ee302dba32672c"
    };


    firebase.initializeApp(config);

    // Create a variable to reference the database
    let database = firebase.database();
    // Capture Button Click
    $("#add-train").on("click", function(event) {
        // Don't refresh the ptime!
        event.preventDefault();

        // YOUR TASK!!!
        // Code in the logic for storing and retrieving the most recent user.
        // Don't forget to provide initial data to your Firebase database.
        let trainName = $("#name-input").val().trim();
        let trainDestination = $("#destination-input").val().trim();
        let trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
        let trainFrequency = $("#frequency-input").val().trim();

        // Initial Values
        let newTrain = {
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency
        };
        database.ref().push(newTrain);

        // Log everything that's coming out of snapshot
        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(newTrain.frequency);

        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");
    });


    // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        let trainName = childSnapshot.val().name;
        let trainDestination = childSnapshot.val().destination;
        let trainTime = childSnapshot.val().time;
        let trainFrequency = childSnapshot.val().frequency;
        // Train Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime); // *** Depends on First Train Time & Frequency
        console.log(trainFrequency);
        // Format the train time
        let TrainFormat = moment.unix(trainTime).format("hh:mm A");


        // *** Minutes Away = diff between now and next Arrival
        let trainMinutes = moment().diff(moment(trainTime, "X"), "minutes");
        console.log(trainMinutes);

        // Create the new row
        let newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(TrainFormat),
            $("<td>").text(trainMinutes)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});