function getGreeting()
{
    var greeting = "Hello "+sessionStorage.getItem("user_name")+ "! Thank you for your feedback."
    document.getElementById("greeting").innerHTML = greeting;
}

setInterval(function(){ saveRating(); }, 100);

function saveRating()
{
   // window.alert("tupo hapa");
    // Creating database
    var databaseRef = firebase.database().ref('ratings/');
    
    databaseRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
     var childKey = childSnapshot.key;
     var childData = childSnapshot.val();
      });
    });

    var data = {
        phone_number: sessionStorage.getItem("phonenumber"),
        user_name: sessionStorage.getItem("user_name"),
        country_code: sessionStorage.getItem("country_code"),
        rate: document.getElementById("rate").value,
        recommend: document.getElementById("recommend").value,
        comment: document.getElementById("comment").value,
        Rated_On: Date()
       }
           
       var updates = {};
       updates['/ratings/' + sessionStorage.getItem("phonenumber")] = data;
       firebase.database().ref().update(updates);
           }

  function submitClicked()
  {
    window.alert("Thank you for your feedback");
    location.replace("index.html");
  }