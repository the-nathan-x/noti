var user_name;
var new_user = false; //the wrong password alert kept showing up to new users! this was to help get rid of it
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
  document.getElementById("phoneNumber").value = phonenumber;
  const path = "users/"+phonenumber+"/user_name";
  var databaseeRef = firebase.database().ref(path);
  databaseeRef.on('value', (snapshot) =>{
    const data = snapshot.val();
    user_name = data;
   // window.alert(user_name);
    if(user_name == null)
    {
      console.log("Hooray! new user!");
      new_user = true;
      newUser();
    }

    else{
      sessionStorage.setItem("user_name", user_name);
      console.log("returning user!");
      returningUser();} 

  });

}

function saveUser()
{
   // window.alert("tupo hapa");
    // Creating database
    var databaseRef = firebase.database().ref('users/');
    
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
        password: sessionStorage.getItem("new_password"),
        status: "exists",
        created_On: Date()
       }
       
       var updates = {};
       updates['/users/' + sessionStorage.getItem("phonenumber")] = data;
       firebase.database().ref().update(updates);
        
        console.log("User saved successfully!");
        setCookie();
        //window.alert("User saved");
       if(sessionStorage.getItem("history") == null)
       {
        location.replace("documents.html");
       }
       else{location.replace(sessionStorage.getItem("history"));}


}



function newUser()
{

  document.getElementById("placeholder").innerHTML = "<font face=arial>" + "Set Password" + "</font>";
  document.getElementById("sign-in-button").value = "CONTINUE";
  document.getElementById("phone_number_data").innerHTML = "<input type=password id=password>";
  state = "password";
}

function setUsername(){
    document.getElementById("placeholder").innerHTML = "<font face=arial>" + "Set a Username" + "</font>";
    document.getElementById("sign-in-button").value = "GET STARTED";
    document.getElementById("phone_number_data").innerHTML = "<input type=text id=user_namee required>";
    state = "username";

}


function returningUser()
{
    document.getElementById("placeholder").innerHTML = "<font face=arial>" + "Confirm Password" + "</font>";
    document.getElementById("sign-in-button").value = "CONTINUE";
    document.getElementById("phone_number_data").innerHTML = "<input type=password id=password>";
    state = "confirm";      
}


function confirmPassword()
{

    const path_password = "users/"+phonenumber+"/password";
    var databaseeRef = firebase.database().ref(path_password);
    databaseeRef.on('value', (snapshot) =>{
      const data = snapshot.val();

      if(sessionStorage.getItem('password') == data)
      {    setCookie();
          ConfirmedReturningUser();
      }
  
      else{
          window.alert("Wrong Password!");      
      }
  
  
    });
  
  


   
}


function ConfirmedReturningUser()
{
   // window.alert("returning User");
    if(sessionStorage.getItem("history") == null)
    {
     location.replace("documents.html");
    }
    else{location.replace(sessionStorage.getItem("history"));}
    

}


function setCookie() {
  var capture = sessionStorage.getItem("phonenumber")+"*.*"+sessionStorage.getItem("user_name");
  var d = new Date();
  d.setTime(d.getTime() + (180*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = "noti_info=" + "*.*" + capture + ";" + expires + ";path=/;";
  console.log("cookie set");
}

function funcSignUp()
{

  //session stores
  var remove_zero = parseInt(document.getElementById("phoneNumber").value) + 0;
  phonenumber = "+" + document.getElementById("countryCode").value + remove_zero;
  sessionStorage.setItem("phonenumber", phonenumber);
  sessionStorage.setItem("country_code", document.getElementById("countryCode").value);


  sessionStorage.setItem("user_name", document.getElementById('user_namee').value);

  sessionStorage.setItem("new_password", document.getElementById('password').value);



var show_alert = true;

  document.getElementById("phoneNumber").value = phonenumber;
  const path = "users/"+phonenumber+"/user_name";
  var databaseeRef = firebase.database().ref(path);
  databaseeRef.on('value', (snapshot) =>{
    const data = snapshot.val();
  //  window.alert(data);
    if(data == null)
    {
      console.log("Hooray! new user!");
      show_alert = false;
      saveUser();
    }
    //else statement wasn't working

      if(show_alert)
      {
        //  sessionStorage.setItem("user_name", user_name);
      console.log("returning user!");
      window.alert("Phone number exists! Try to login"); 
      location.reload();

      }
  });


  

}

function funcLogIn()
{
  //session stores
  var remove_zero = parseInt(document.getElementById("phonenumber").value) + 0;
  phonenumber = "+" + document.getElementById("countryCode").value + remove_zero;
  sessionStorage.setItem("phonenumber", phonenumber);
  sessionStorage.setItem("country_code", document.getElementById("countryCode").value);


  sessionStorage.setItem("user_name", document.getElementById('user_namee').value);

  sessionStorage.setItem("password", document.getElementById('password_login').value);
  

  document.getElementById("phonenumber").value = phonenumber;
  const path = "users/"+phonenumber+"/user_name";
  var databaseeRef = firebase.database().ref(path);
  databaseeRef.on('value', (snapshot) =>{
    const data = snapshot.val();
    user_name = data;
   //window.alert(user_name);
    if(user_name == null)
    {
      console.log("Hooray! new user!");
      window.alert("Account not found! create a new account");
      location.reload();
    }

    else{

      const path_name = "users/"+phonenumber+"/user_name";
      var databaseeRef = firebase.database().ref(path_name);
      databaseeRef.on('value', (snapshot) =>{
      const data = snapshot.val();
      sessionStorage.setItem("user_name", user_name);
    });
    
      console.log("returning user!");
      const path_password = "users/"+phonenumber+"/password";
      var databaseeRef = firebase.database().ref(path_password);
      databaseeRef.on('value', (snapshot) =>{
      const data = snapshot.val();
     //   window.alert(data);
      //  window.alert(sessionStorage.getItem('password'));
      if(sessionStorage.getItem('password') == data)
      {   
      const path_use_r = "users/"+phonenumber+"/user_name";
      var databaseeRef = firebase.database().ref(path_use_r);
      databaseeRef.on('value', (snapshot) =>{
      const data = snapshot.val();
      sessionStorage.setItem("user_name", data);
        });

        setCookie();
        ConfirmedReturningUser();

      }
  
      else{
        
          window.alert("Wrong Password!");
        
      }
  
  
    });
    
    
    } 

  });


}