//firebase stuff

const andika = document.getElementById("sehemu");
//getting the doc Id parameter from the url
const docId = window.location.search;
var id = docId.replace('?id=',"");

//to make sure what was happening in sAFARI DOESNT HAPPEN AGAIN addition of &=1 or &=2
id = id.slice(0, 14);

//creating path that looks like this users/VOV7pu4oeskr3j0/text

const path = "notis/" +id + "/text";
//window.alert(path);

const dbRefObject = firebase.database().ref(path);

 
//Updating from database
dbRefObject.on('value', snap => andika.value = (snap.val()));


//This would help me update to database
var databaseRef = firebase.database().ref('notis/');
    
  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var childKey = childSnapshot.key;
   var childData = childSnapshot.val();
    });
  });

//This would help me update to database
var databaseRef = firebase.database().ref('notis/');
    
  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var childKey = childSnapshot.key;
   var childData = childSnapshot.val();
    });
  });

//checking for offline and online status
var connection_alert_shown = false;
var active_state = true; 
function online(){
  andika.disabled = false;
  if(!active_state)
  {
    tinymce.activeEditor.mode.set("design");
    active_state = true;
  }
  connection_alert_shown = false;
  document.getElementById("online").innerHTML = "online";
}

function offline(){
  andika.disabled = true;
  if(connection_alert_shown)
  {
    window.alert("Oops we are having trouble with the connection!");
    connection_alert_shown = true;
  }
  document.getElementById("online").innerHTML = "You are offline"; 
  tinymce.activeEditor.mode.set("readonly");
  active_state = false;
  // location.reload();
}


function checkforstatus(){
  if(logger)
  {
    document.getElementById("cookie_implant").innerHTML = "";
  }
  if(navigator.onLine){
    online();
   } else {
    offline();
   }
   
}

setInterval(function(){ checkforstatus(); }, 1000);

function go(){
    //updating to firebase database
 var mpya = tinyMCE.get("sehemu").getContent();
   if (mpya != "")
  {
   var updates = {};
   updates['/notis/' + id + '/text'] = mpya;
   firebase.database().ref().update(updates); 
   document.getElementById("onyesha").innerHTML = "<i>"+"All changes saved"+"</i>";
   }
  
}

setInterval(function(){ go(); }, 100);


function saveOwnership()
  {
    
    var databaseeReff = firebase.database().ref('/ownership/' + sessionStorage.getItem("phonenumber") + id);
    databaseeReff.on('value', (snapshot) =>{
    owner_fetched = snapshot.val();

   // window.alert(owner_fetched);
    if(owner_fetched == null)
   {
   var updates = {};
   
   var data = {
    title: document.getElementById("title").value,
    id: id,
   }
   

   const dbRefObject_titlee = firebase.database().ref("notis/" +id + "/title");
     dbRefObject_titlee.on('value', (snapshot) =>{
       title = snapshot.val();
       updates['/ownership/' + sessionStorage.getItem("phonenumber") +"/"+ id] = data;
       firebase.database().ref().update(updates); 
       console.log("Ownership saved successfully");
     });

   }

   else{console.log("Might be returning owner!")};

  });

  }
