
firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                             // User is signed in.
                             document.getElementById("user").style.display = "none";
                             document.getElementById("loggedin").style.display = "block";

            } else {
                             // No user is signed in.
                             document.getElementById("user").style.display = "block";
                             document.getElementById("loggedin").style.display = "none";
            }
});


function login(){

                 var emailAddress = document.getElementById("e_mail").value;
                 var password = document.getElementById("p_word").value;


                 firebase.auth().signInWithEmailAndPassword(emailAddress, password).catch(function(error) {
                  // Handle Errors here.
                       var errorCode = error.code;
                       var errorMessage = error.message;
                      window.alert("Error : " + errorMessage);
                                                  });
}

function exam(){

                                   window.alert('Click OK to start the EXAM.');




}

function logout(){
                                   firebase.auth().signOut();
}

function register(){

                                   var email = document.getElementById("e_mail").value;
                                   var password = document.getElementById("p_word").value;
                                   var firstname = document.getElementById("fname").value;
                                   var lastname = document.getElementById("lname").value;
                                   var country = document.getElementById("country").value;
                                   var address = document.getElementById("address").value;
                                   var contact = document.getElementById("contact").value;



//firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  //var errorCode = error.code;
  //var errorMessage = error.message; window.alert("Error : " + errorMessage);
  // ...
//});
}

function writeUserData() {

                                   var database = firebase.database();
                                   var email = document.getElementById("e_mail").value;
                                   var password = document.getElementById("p_word").value;
                                   var firstname = document.getElementById("fname").value;
                                   var lastname = document.getElementById("lname").value;
                                   var address = document.getElementById("address").value;
                                   var contact = document.getElementById("contact").value;

                                   var data =
                                   {
                                   email: email,
                                   password : password,
                                   firstname: firstname,
                                   lastname: lastname,
                                   address: address,
                                   contact: contact
                                   }
                                   var ref = database.ref('users');
                                   ref.push(data);
                                   console.log(firebase);
                                   window.alert("Welcome, " + lastname + "! Succesfully registered! You can now login your account.");


                                   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                                   // Handle Errors here.
                                   var errorCode = error.code;
                                   var errorMessage = error.message; window.alert("Error : " + errorMessage);
                                   // ...
});
}

function saveMessage(email, password, firstname, lastname){

                                   var newMessageRef  = messagesRef.push();
                                   newMessageRef.set({
                                   email: email,
                                   pass:password,
                                   firstname:firstname,
                                   lastname:lastname
                                   });
}

function getInputVal(id){
                                   return document.getElementById(id).value;
}
