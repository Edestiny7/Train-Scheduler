$(function() {
    // Configurations for Firebase db
    let config = {
        apiKey: "AIzaSyAtELD4TxZMJEiRFUn5HDHiv11jj2PgJYM",
        authDomain: "fir-project-16bda.firebaseapp.com",
        databaseURL: "https://fir-project-16bda.firebaseio.com",
        projectId: "fir-project-16bda",
        storageBucket: "",
        messagingSenderId: "206555219667",
        appId: "1:206555219667:web:f9ee302dba32672c"
    };

    // Initialize Firebase db
    firebase.initializeApp(config);

    // Create variable to reference the Firebase db
    let database = firebase.database();

    // Capture Button Click
    $("#add-train").on("click", function(event) {

        event.preventDefault();

        // Don't forget to provide initial data to your Firebase db.
        let trainName = $("#name-input").val().trim();
        let trainDestination = $("#destination-input").val().trim();
        let trainFrequency = $("#frequency-input").val().trim();
        let trainTime = $("#time-input").val().trim();

        // Initial Values
        let newTrain = {
            name: trainName,
            destination: trainDestination,
            time: trainTime,
            frequency: trainFrequency
        };
        database.ref().push(newTrain);

        // Log everything that's coming out of snapshot to console
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.time);
        console.log(trainTime);
        console.log(newTrain.frequency);

        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#frequency-input").val("");
    });

    // Create Firebase db event for adding train and a row in the html when user adds entry
    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());

        let trainName = childSnapshot.val().name;
        let trainDestination = childSnapshot.val().destination;
        let trainTime = childSnapshot.val().time;
        let trainFrequency = childSnapshot.val().frequency;

        // Console Log Train Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainTime);
        console.log(trainFrequency);

        // First Time (pushed back 1 year to make sure it comes before current time)
        let firstTimeConverted = moment(trainTime, "X").subtract(1, "years");
        console.log("TRAIN TIME CONVERTED" + moment(firstTimeConverted, "X").format("HH:mm"));

        // Difference between the times
        let diffTime = moment.duration(moment().diff(moment(trainTime, "HH:mm")), 'milliseconds').asMinutes();
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        let timeRemaining = trainFrequency - (Math.floor(diffTime) % trainFrequency);
        console.log("TIME REMAINING: " + timeRemaining);

        // Minutes Until Train
        let minutesUntillTrain = trainFrequency - timeRemaining;
        console.log("MINUTES UNTILL TRAIN: " + minutesUntillTrain);

        // Next Train
        let nextTrain = diffTime > 0 ? moment().add(timeRemaining, 'minutes') : moment(trainTime, "HH:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

        // Create the new row
        let newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(moment(nextTrain, "X").format("HH:mm A")),
            $("<td>").text(minutesUntillTrain)
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
});