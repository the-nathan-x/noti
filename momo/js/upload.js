function go()
{
    // Creating database
    var databaseRef = firebase.database().ref('tutorials/');
    
    databaseRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
     var childKey = childSnapshot.key;
     var childData = childSnapshot.val();
      });
    });


    var data = {
        title: document.getElementById("title").value,
        level: document.getElementById("study_level").value,
        url: file_url
       }

       var updates = {};
       updates['/tutorials/' + document.getElementById("title").value] = data;
       firebase.database().ref().update(updates);  
       window.alert("Upload Successful");      
}

