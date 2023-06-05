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

    document.getElementById("name").value = docId;
    //document.getElementById("name").disabled = true;


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
        text: "Start writing here..."
       }
       
       var updates = {};
       updates['/notis/' + docId] = data;
       firebase.database().ref().update(updates);
       
       sessionStorage.setItem("ownership", "owner"); //this will help me remember that the particular user is the creator of this doc
      // alert('okay');
       sessionStorage.setItem("title", document.getElementById("title"));
}

function saveTitle(){
  var updates = {};
  updates['/notis/' + docId + '/title'] = document.getElementById("title").value;
  firebase.database().ref().update(updates);
}