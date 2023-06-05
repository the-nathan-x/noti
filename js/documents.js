function makeid(l)
{
var text = "";
var char_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
for(var i=0; i < l; i++ )
{  
text = text + char_list.charAt(Math.floor(Math.random() * char_list.length));
}

text =  "noti-" + text;
return text;

}

function go()
{
    
    var docId = makeid(9);


    // Creating database
    var databaseRef = firebase.database().ref('notis/');
    
    databaseRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
     var childKey = childSnapshot.key;
     var childData = childSnapshot.val();
      });
    });


    var data = {
        id: docId,
        text: "Thank you for using Noti! Click on Whatsapp button to share with friends!"
       }
       
       var updates = {};
       updates['/notis/' + docId] = data;
       firebase.database().ref().update(updates);
       
       sessionStorage.setItem("ownership", "owner"); //this will help me remember that the particular user is the creator of this doc
      // alert('okay');
       sessionStorage.setItem("title", docId);
}

function saveTitle(){
  var updates = {};
  updates['/notis/' + docId + '/title'] = sessionStorage.getItem("title");
  firebase.database().ref().update(updates);
}