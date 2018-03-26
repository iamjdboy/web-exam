
firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                             // User is signed in.
                             document.getElementById("user").style.display = "none";
                             document.getElementById("loggedin").style.display = "block";

                             var user = firebase.auth().currentUser;

                             if(user != null){
                                  var email_id = user.email;
                                  document.getElementById("user_").innerHTML = " "+email_id;
                             }
            }
             else {
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

function logout(){
                                   window.alert("Logged out successfully!");
                                   firebase.auth().signOut();

}

function writeUserData(){

                                   var database = firebase.database();
                                   var email = document.getElementById("e_mail").value;
                                   var password = document.getElementById("p_word").value;
                                   var passwordd = document.getElementById("p_wordd").value;
                                   var firstname = document.getElementById("fname").value;
                                   var lastname = document.getElementById("lname").value;
                                   var address = document.getElementById("address").value;
                                   var contact = document.getElementById("contact").value;
                                   var score = document.getElementById("score").value;


                                   if(email == "" || password == "" || firstname == "" || lastname == "" || address == "" || contact == ""){
                                   window.alert("Please fill up all required informations");
                                   }
                                   else if(password.length<6){
                                        alert("Password must be atleast 6 characters")
                                   }
                                   else if(password != passwordd){
                                        window.alert("Password does not match");
                                   }
                                   else if(password == passwordd){
                                        var data =
                                        {
                                        email: email,
                                        password: password,
                                        firstname: firstname,
                                        lastname: lastname,
                                        address: address,
                                        contact: contact,
                                        score: score
                                        }



                                        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                                        // Handle Errors here.
                                        var errorCode = error.code;
                                        var errorMessage = error.message;
                                         window.alert("Error : " + errorMessage);

                                        // ...
                                        });


                                        database.ref("users").orderByChild("email").equalTo(email).once('value', function(snapshot) {
                                          var exists = (snapshot.val() !== null);

                                          // exist = true|false

                                          console.dir(snapshot.val());
                                          if(exists){
                                            alert("email address is not available");
                                        }
                                        else {
                                             database.ref("users").push(data);
                                             window.alert("Welcome "+firstname+" "+lastname+". You can now login your account");
                                        }
                                        });




                                   }
}

function exam(){
          window.alert(" Click OK to start the Exam!");
}

function results(){
     var database = firebase.database();
     var correct = 0;

     /*     console.log("correct answer:"+questions[i].answer+", user answer: input[name=q"+(1+i)+ $("input[name=q"+(1+i)+"]:checked").val());   */
     for(let i=0; i < questions.length; i++){
       if(questions[i].answer == $("input[name="+"q"+(1+i)+"]:checked").val()) correct++;

     }


     document.getElementById("quiz").style.visibility = "hidden";
     document.getElementById("right").style.visibility = "hidden";
     document.getElementById("left").style.visibility = "hidden";
     document.getElementById("s").style.visibility = "visible";
     document.getElementById("nc").innerHTML = "You got "+ correct + " correct answers";
          if (correct <= (questions.length/2)){
               document.getElementById("rank").innerHTML = "You've Failed to pass the Exam.";
          }
          else{
               document.getElementById("rank").innerHTML = "You've Passed the exam.";
          }

     var userEmail = firebase.auth().currentUser.email;
     database.ref("users").orderByChild("email").equalTo(userEmail).once('child_added', function(snapshot) {
       console.dir(snapshot.val());
       snapshot.ref.update({
            score:correct
       })
     });




      }

function submit(){

     var database = firebase.database();
     var email = document.getElementById("text1").value;
     var email2 = document.getElementById("text2").value;

     if(email == "" || email2 == ""){
          window.alert("Please input your valid email address");
     }
     else if(email != email2){
          window.alert("Email does not match");
     }
     else if(email == email2){
          var data =
          {
          email: email
          }
          console.log(data);
          var ref = database.ref('fpass');
          ref.push(data);
          window.alert("Success!");
     }
}
