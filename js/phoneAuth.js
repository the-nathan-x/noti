var user_status;
var user_name;
function firebaseSignOut()
{
  firebase.auth().signOut().then(function() {
    console.log("Sign Out Successful");
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
  
}

function gatekeeper() //haimdall
{
  document.getElementById("sign-in-button").value = "LOADING...";
  const path = "users/"+phonenumber+"/user_name";
  var databaseeRef = firebase.database().ref(path);
  databaseeRef.on('value', (snapshot) =>{
    const data = snapshot.val();
    user_name = data;
   // window.alert(phonenumber);
    //window.alert(user_name);
  //  sessionStorage.setItem("user_name", user_name);
    if(user_name == null)
    {
     // console.log("Hooray! new user!");
     // newUser();
     window.alert("Account details not found");
     location.replace("login.html");
    }

    else{
      console.log("returning user!");
      returningUser();} 

  });

}

function saveUser()
{

  sessionStorage.setItem("user_namee", document.getElementById("userr_name").value);
    // Creating database
    var databaseRef = firebase.database().ref('auth_users/');
    
    databaseRef.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
     var childKey = childSnapshot.key;
     var childData = childSnapshot.val();
      });
    });


    var data = {
        phone_number: sessionStorage.getItem("phonenumber"),
        user_name: sessionStorage.getItem("user_namee"),
        country_code: sessionStorage.getItem("country_code"),
        status: "exists",
        created_On: Date()
       }
       
       var updates = {};
       updates['/auth_users/' + sessionStorage.getItem("phonenumber")] = data;
       firebase.database().ref().update(updates);
        
        console.log("User saved successfully!");
        sessionStorage.setItem("user_name", sessionStorage.getItem("user_namee"));
        location.replace("index.html");

}

/*
function ubwabwa(){
 // window.alert("okay");
 var status = "kwani ina wakera?";
  sessionStorage.setItem("phonenumber", "+255737342425");
  const path = "auth_users/+255737342425/user_name";
  var databaseeRef = firebase.database().ref(path);
  databaseeRef.on('value', (snapshot) =>{
    const data = snapshot.val();
    status = data;
    window.alert(status);
    if(status == null)
    {
      window.alert("new user!");
    }
    else{window.alert("returning user");}
  });


window.alert("give it time bro!");
}
*/


function newUser()
{

  document.getElementById("placeholder").innerHTML = "<font face=arial>" + "Set a username" + "</font>";
  document.getElementById("sign-in-button").value = "GET STARTED";
  document.getElementById("phone_number_data").innerHTML = "<input type=text id=userr_name>";
}

function setCookie() {
  var capture = sessionStorage.getItem("phonenumber")+"*.*"+sessionStorage.getItem("user_name");
  var d = new Date();
  d.setTime(d.getTime() + (180*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = "noti_info=" + "*.*" + capture + ";" + expires + ";path=/;";
  console.log("cookie set");
}



function returningUser()
{
  const path_password = "users/"+phonenumber+"/password";
  var databaseeRef = firebase.database().ref(path_password);
  databaseeRef.on('value', (snapshot) =>{
  const pass_data = snapshot.val();

     
  const path_use_r = "users/"+phonenumber+"/user_name";
  var databaseeRef = firebase.database().ref(path_use_r);
  databaseeRef.on('value', (snapshot) =>{
  const data = snapshot.val();
  sessionStorage.setItem("user_name", data);
    });
    
    window.alert("Your password is: "+ pass_data);
    setCookie();
    location.replace("documents.html");
});

}