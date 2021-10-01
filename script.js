import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import * as fbauth from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjnytZlqTpg2OGaPyb9zXJ_0MiXNBbMnI",
  authDomain: "securityrulesapp3.firebaseapp.com",
  databaseURL: "https://securityrulesapp3-default-rtdb.firebaseio.com",
  projectId: "securityrulesapp3",
  storageBucket: "securityrulesapp3.appspot.com",
  messagingSenderId: "884706895740",
  appId: "1:884706895740:web:115cdb9220481b37fea6f9"
};

const app = initializeApp(firebaseConfig);
let db = rtdb.getDatabase(app);
let auth = fbauth.getAuth(app);
let titleRef = rtdb.ref(db, "/");
let userRef = rtdb.child(titleRef,'users');
let userRef2 = rtdb.ref(db, `/users`);

$("#register_admin").on("click", ()=>{
  let email = $("#regemail").val();
  let p1 = $("#regpass1").val();
  let p2 = $("#regpass2").val();
  let username = $("#username").val();
  if (p1 != p2){
    alert("Passwords don't match");
    return;
  }
  fbauth.createUserWithEmailAndPassword(auth, email, p1).then(somedata=>{
    let uid = somedata.user.uid;
    
    let userRoleRef = rtdb.ref(db, `/users/${uid}/roles/admin`);
    rtdb.set(userRoleRef, true);
    
    let userRoleRef2 = rtdb.ref(db, `/users/${uid}/name`);
    rtdb.set(userRoleRef2, username);
    
    let userRoleRef3 = rtdb.ref(db, `/users/${uid}/email`);
    rtdb.set(userRoleRef3, email);
    
    let userRoleRef4 = rtdb.ref(db, `/users/${uid}/uid`);
    rtdb.set(userRoleRef4, uid);
    
    //let userRef = rtdb.child(titleRef,'users');
    /*
    let userRef = rtdb.ref(db, `/users/${uid}`); GOOD
    var user = {
            name: username,
            uid: uid,
            email: email,
            roles:{
              admin:true
            }
        }
        //writeUserData(user);
    rtdb.push(userRef,user);
    */
  
        /*
    let userRef = rtdb.ref(db, "/users");
    userRef.child(uid).push({
      name: username,
            uid: uid,
            email: email,
            roles:{
              admin:true
            }
    });
    */
    
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
});

$("#register_user").on("click", ()=>{
  let email2 = $("#regemail2").val();
  let p12 = $("#regpass12").val();
  let p22 = $("#regpass22").val();
  let username2 = $("#username2").val();
  if (p12 != p22){
    alert("Passwords don't match");
    return;
  }
  fbauth.createUserWithEmailAndPassword(auth, email2, p12).then(somedata=>{
    let uid2 = somedata.user.uid;
    
    let userRoleRef5 = rtdb.ref(db, `/users/${uid2}/roles/user`);
    rtdb.set(userRoleRef5, true);
    
    let userRoleRef6 = rtdb.ref(db, `/users/${uid2}/name`);
    rtdb.set(userRoleRef6, username2);
    
    let userRoleRef7 = rtdb.ref(db, `/users/${uid2}/email`);
    rtdb.set(userRoleRef7, email2);
    
    let userRoleRef8 = rtdb.ref(db, `/users/${uid2}/uid`);
    rtdb.set(userRoleRef8, uid2);
    
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
});

function writeUserData(user) {
    rtdb.database().ref('users/' + user.uid).set(user).catch(error => {
        console.log(error.message)
    });
}


$("#login").on("click", ()=>{
  let email = $("#logemail").val();
  let pwd = $("#logpass").val();
  fbauth.signInWithEmailAndPassword(auth, email, pwd).then(
    somedata=>{
      console.log(somedata);
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});

fbauth.onAuthStateChanged(auth, user => {
      if (!!user){
        $("#login").hide();
        $("#list").show();       
        renderUser(user);
        
        let changeRoleRef = rtdb.ref(db, "/change_role");
        rtdb.onValue(changeRoleRef, ss=>{
        //alert(ss.val());
        $(".changeRole").show();
        $(".changeRole").click(clickHandlerManagRole);
    })
       // rtdb.onValue(userRef, ss=>{
  //alert(ss.val());
  //renderUser(ss.val());
          //alert("111");
//})
        
        
  /*      
        let changeRoleRef = rtdb.ref(db, "/users/change_role");
        console.log("here");
        rtdb.onValue(changeRoleRef, ss=>{
         alert(ss.val());
         //renderUser(user);
    })
  */      
        
      /*  
        let userRef = rtdb.ref(db, "/users");
        rtdb.onValue(userRef, ss=>{
         let users = ss.val();
         alert(uss.val());
         //renderUser(user);
    })
      */  
        
      } else {
        $("#login").show();
        $("#list").html("");
      }
});

let renderUser = function(userObj){
  $("#list").empty();
  //$("#list").html(JSON.stringify(userObj));
  var string1 = `<h1>Welcome `;
  var currentUserUid = JSON.stringify(userObj.uid);
  let currentUserUidOut = currentUserUid.replace(/"/g, '');
  var admin;
  var string2 = `<h2>List of Users:</h2><br>`;
  //var string3 = `<br><br><button type="button" id="logout">Logout</button>`;
     //$("#list").append(`<br><h1>${currentUserUidOut}</hi>`);
  
  let currentUserInfo = rtdb.ref(db, `/users/${currentUserUidOut}`);
        //let changeRoleRef2 = rtdb.ref(db, '/users/${currentUserUid}/');
        rtdb.onValue(currentUserInfo, ss=>{
        //alert(ss.val());
          if(ss.val().roles.admin == true){
            $("#list").append(string1 + ss.val().name +" (Admin)");
            admin = true;
          }
          else{
            $("#list").append(string1 + ss.val().name +" (User)");
            admin = false;
          }
    })
    $("#list").append(`<div><button type="button" id="logout">Logout</button></div>`);
  
  $("#logout").on("click", ()=>{
    fbauth.signOut(auth);
  })
  
  rtdb.onValue(userRef, ss=>{
   let usersObj = ss.val();
   //$("#list").empty();
   //alert ("test");
   //alert(JSON.stringify(ss.val()));
    
  //$("#list").empty();
  //$("#list").html('<h1>Hi</h1>');
  
  //let userRef = rtdb.ref(db, "/users");
  //rtdb.onValue(userRef, ss=>{

let theIds = Object.keys(usersObj);
  theIds.map((anId)=>{
    let userObjj = usersObj[anId];

    if(userObjj.roles.admin == true){
      $("#list").append(`<div class="user">${userObjj.name} (Admin) <button class="changeRole" type="button" id="changeRole" data-id=${anId}>Change Role</button></div>`);
      
      if (admin == false)
      $(".changeRole").hide();
    }
    else{
      $("#list").append(`<div class="user" id=${anId} data-id=${anId}>${userObjj.name} (User) <button class="changeRole" type="button" id="changeRole" data-id=${anId}>Change Role</button></div></div>`);
      
      if (admin == false)
      $(".changeRole").hide();
    }
    /*
    let changeRoleRef = rtdb.ref(db, "/change_role");
        rtdb.onValue(changeRoleRef, ss=>{
        //alert(ss.val());
        $(".changeRole").show();
        $(".changeRole").click(clickHandlerManagRole);
    })
    */
    
    /*
    $("#list").append(
      `<div class="user" data-id=${anId}>${userObjj.name} ${userObjj.roles.}</div>`
    );
    */
 });  
 //})
  
})
  /*
    let changeRoleRef = rtdb.ref(db, "/change_role");
        rtdb.onValue(changeRoleRef, ss=>{
        alert(ss.val());
    })
    */
}


let clickHandlerManagRole = function(evt){
  let clickedElement = evt.currentTarget;
  let idFromDOM = $(clickedElement).attr("data-id");
  //alert (idFromDOM);
  let userRoleRef = rtdb.ref(db, `/users/${idFromDOM}`);
  //let userRoleRef = rtdb.child(userRef2, idFromDOM);
  //alert(userRoleRef.admin);
  
  rtdb.onValue(userRoleRef, (snapshot) => {
  const adminRole = snapshot.val().roles.admin;
    if(adminRole == true){
      rtdb.update(userRoleRef, {"roles":{"user": true, "admin":false}});
      window.location.reload(true);
    }
    else{
      rtdb.update(userRoleRef, {"roles":{"user": false, "admin":true}});
      window.location.reload(true);
    }
}, {
  onlyOnce: true
});
/*
        rtdb.onValue(userRoleRef, ss=>{
        alert(ss.val().name);
  
        if(ss.val().roles.admin == true){
          rtdb.update(userRoleRef, {"roles":{"user": true, "admin":false}});
        }
         else
           rtdb.update(userRoleRef, {"roles":{"user": false, "admin":true}});
  */
  
       //})
}

