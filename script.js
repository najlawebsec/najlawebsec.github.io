  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
 // import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-analytics.js";
import * as rtdb from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import * as fbauth from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCI-0tmHu74MG8a-wrWVOkta7lZMkJ1wSo",
  authDomain: "chatapp2-20a22.firebaseapp.com",
  databaseURL: "https://chatapp2-20a22-default-rtdb.firebaseio.com",
  projectId: "chatapp2-20a22",
  storageBucket: "chatapp2-20a22.appspot.com",
  messagingSenderId: "83859529876",
  appId: "1:83859529876:web:2df85ba2fe7b5c11999481"
};

  //Initialize Firebase
  const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);

let db = rtdb.getDatabase(app);
let auth = fbauth.getAuth(app);
let titleRef = rtdb.ref(db, "/");
let userRef = rtdb.child(titleRef,'users');
let userRef2 = rtdb.ref(db, `/users`);
//let chatsRef = rtdb.child(titleRef,'chats');
let chatsRef = rtdb.ref(db, "/chats");

let currentUserUid;
let currentUserName;
let userObjGlobal;
let admin;
let groupChat = true;
let receiver_id = "none";

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
      const emailRejInput2 = document.getElementById("regemail"); 
      emailRejInput2.value = '';
      const passRejInput2 = document.getElementById("regpass1"); 
      passRejInput2.value = '';
      const passRejInput22 = document.getElementById("regpass2"); 
      passRejInput22.value = '';
      const usernamRejInput2 = document.getElementById("username"); 
      usernamRejInput2.value = '';
    
    $(".chat-num-messages").html("Group Chat");
    var string1 = `<h1>Welcome `;
    $(".chat-with").append(string1 + username +" (Admin)");
    //renderCurrentUser(somedata.user);
    
    let uid = somedata.user.uid;
    currentUserUid = uid;
    currentUserName = username;
    let verifiedEmail = somedata.user.emailVerified;
    
    let userRoleRef = rtdb.ref(db, `/users/${uid}/roles/admin`);
    rtdb.set(userRoleRef, true);
    
    let userRoleRef2 = rtdb.ref(db, `/users/${uid}/name`);
    rtdb.set(userRoleRef2, username);
    
    let userRoleRef3 = rtdb.ref(db, `/users/${uid}/email`);
    rtdb.set(userRoleRef3, email);
    
    let userRoleRef4 = rtdb.ref(db, `/users/${uid}/uid`);
    rtdb.set(userRoleRef4, uid);
    
    let userRoleRef5 = rtdb.ref(db, `/users/${uid}/online`);
    rtdb.set(userRoleRef5, true);
    
    let emailVerified = rtdb.ref(db, `/users/${uid}/emailVerified`);
    rtdb.set(emailVerified, verifiedEmail);
    
    let editedRef = rtdb.ref(db, `/users/${uid}/edited`);
    rtdb.set(editedRef, false);
    
    groupChat = true;
    receiver_id = "group";
    
    $(".changeRole").show();
    $(".changeRole").click(clickHandlerManagRole);
    /*
    let changeRoleRef = rtdb.ref(db, "/change_role");
      rtdb.onValue(changeRoleRef, ss=>{        
        //$(".changeRole").click(clickHandlerManagRole); 
        $(".changeRole").click(clickHandlerManagRole);
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
      const emailRejInput = document.getElementById("regemail2"); 
      emailRejInput.value = '';
      const passRejInput = document.getElementById("regpass12"); 
      passRejInput.value = '';
      const passRejInput2 = document.getElementById("regpass22"); 
      passRejInput2.value = '';
      const usernamRejInput = document.getElementById("username2"); 
      usernamRejInput.value = '';
    $(".chat-num-messages").html("Group Chat");
    var string1 = `<h1>Welcome `;
    $(".chat-with").append(string1 + username2 +" (User)");
    //renderCurrentUser(somedata.user);
    
    let uid2 = somedata.user.uid;
    currentUserUid = uid2;
    currentUserName = username2;
    let verifiedEmail2 = somedata.user.emailVerified;
    
    let userRoleRef5 = rtdb.ref(db, `/users/${uid2}/roles/user`);
    rtdb.set(userRoleRef5, true);
    
    let userRoleRef6 = rtdb.ref(db, `/users/${uid2}/name`);
    rtdb.set(userRoleRef6, username2);
    
    let userRoleRef7 = rtdb.ref(db, `/users/${uid2}/email`);
    rtdb.set(userRoleRef7, email2);
    
    let userRoleRef8 = rtdb.ref(db, `/users/${uid2}/uid`);
    rtdb.set(userRoleRef8, uid2);
    
    let userRoleRef9 = rtdb.ref(db, `/users/${uid2}/online`);
    rtdb.set(userRoleRef9, true);
    
    let emailVerified2 = rtdb.ref(db, `/users/${uid2}/emailVerified`);
    rtdb.set(emailVerified2, verifiedEmail2);
    
    let editedRef2 = rtdb.ref(db, `/users/${uid2}/edited`);
    rtdb.set(editedRef2, false);
    
    groupChat = true;
    receiver_id = "group";
    //alert("after Creat User: " + groupChat);
    
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
});

$("#login").on("click", ()=>{
  let email = $("#logemail").val();
  let pwd = $("#logpass").val();
  
  fbauth.signInWithEmailAndPassword(auth, email, pwd).then(
    somedata=>{
      console.log(somedata);
      const userInput = document.getElementById("logemail"); 
      userInput.value = '';
      const passInput = document.getElementById("logpass"); 
      passInput.value = '';
      
      let uid3 = somedata.user.uid;
      currentUserUid = uid3;
      let onlineRef = rtdb.ref(db, `/users/${uid3}/online`);
      rtdb.set(onlineRef, true);
      
      groupChat = true;
      receiver_id = "group";
      
      $(".chat-num-messages").html("Group Chat");
      //alert(somedata.user);
      //renderCurrentUser(somedata.user);
      
      
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
});

fbauth.onAuthStateChanged(auth, user => {
  //$("#list").empty();
      if (!!user){
        $("#login").hide();
        $("#registerUser").hide();
        $("#registerAdmin").hide();
        document.getElementById("registerAdmin").style.display = "none";
        document.getElementById("registerUser").style.display = "none";       
        document.getElementById("after_login").style.display = "block";
        
        userObjGlobal = user;
        renderLogout(user);
        renderCurrentUser(user);
        renderUser(user);
        renderChats(user);
     
      } else {
        $("#login").show();
        $("#registerUser").hide();
        $("#registerAdmin").hide();
        //$("#registerUser").show();
        //$("#registerAdmin").show();
        document.getElementById("after_login").style.display = "none";
      }
});

let renderLogout = function(userObj){
  
  $(".logOut").html(`<button class="button_log" type="button" id="logout">Logout</button>`);
  $("#logout").on("click", ()=>{
    let onlineRef2 = rtdb.ref(db, `/users/${currentUserUid}/online`);
    rtdb.set(onlineRef2, false);
    $(".list").empty();
    $(".chat-with").empty();
    $(".addListHere").empty();
    $(".groupChat").empty();
    $(".chat-num-messages").html("Group Chat");
    $("#logout").remove();
    document.getElementById("after_login").style.display = "none";
    admin = false;
    groupChat = true;
    
    //$("#list").empty();
    fbauth.signOut(auth);
    //$("#list").empty();
  })
}

let renderCurrentUser = function(userObj){
  $(".chat-with").empty();
  
  let currentUserUid22 = JSON.stringify(userObj.uid);
  let currentUserUidOut2 = currentUserUid22.replace(/"/g, '');
  currentUserUid = currentUserUidOut2;
  var string1 = `<h1>Welcome `;
  
  let currentUserInfo = rtdb.ref(db, `/users/${currentUserUidOut2}`);
   rtdb.onValue(currentUserInfo, ss=>{
          currentUserName = ss.val().name;
          if(ss.val().roles.admin == true){
            $(".chat-with").append(string1 + ss.val().name +" (Admin)");
            admin = true;
          }
          else{
            $(".chat-with").append(string1 + ss.val().name +" (User)");
            admin = false;
          }
     
     if (groupChat == true)
       $(".chat-num-messages").html("Group Chat");
     
    }, {
  onlyOnce: true
}); 
}

let renderUser = function(userObj){
  $(".list").empty();
  //$(".groupChat").empty();
  
  let currentUserUid2 = JSON.stringify(userObj.uid);
  let currentUserUidOut = currentUserUid2.replace(/"/g, '');
  currentUserUid = currentUserUidOut;
  
  rtdb.onValue(userRef, ss=>{
    $(".list").empty();
   let usersObj = ss.val();

let theIds = Object.keys(usersObj);
  theIds.map((anId)=>{
    let userObjj = usersObj[anId];

    if(userObjj.roles.admin == true){
      if(userObjj.online == true){
      
      $(".list").append(`<li class="clearfix">
          <img src="" alt="" />
          <div class="about" data-id-listName1=${anId}>
            <div class="name" data-id-listName=${anId}>${userObjj.name} (Admin)</div>
            <div class="status-online">
              <i class="fa fa-circle online"></i> online
            </div>
            <button class="changeRole" type="button" id="changeRole" data-id-changeBtn=${anId}>Change Role</button>
          </div>
        </li>`);
      }
      else{
        $(".list").append(`<li class="clearfix">
          <img src="" alt="" />
          <div class="about" data-id-listName1=${anId}>
            <div class="name" data-id-listName=${anId}>${userObjj.name} (Admin)</div>
            <div class="status-offline">
              <i class="fa fa-circle offline"></i> offline
            </div>
            <button class="changeRole" type="button" id="changeRole" data-id-changeBtn=${anId}>Change Role</button>
          </div>
        </li>`);
      }
      if (admin == false)
      $(".changeRole").hide();
  }             
    else{
      if(userObjj.online == true){
      $(".list").append(`<li class="clearfix">
          <img src="" alt="" />
          <div class="about" data-id-listName1=${anId}>
            <div class="name" data-id-listName=${anId}>${userObjj.name} (User)</div>
            <div class="status-online">
              <i class="fa fa-circle online"></i> online
            </div>
            <button class="changeRole" type="button" id="changeRole" data-id-changeBtn=${anId}>Change Role</button>
          </div>
        </li>`);
      }
      else
        {
          $(".list").append(`<li class="clearfix">
          <img src="" alt="" />
          <div class="about" data-id-listName1=${anId}>
            <div class="name" data-id-listName=${anId}>${userObjj.name} (User)</div>
            <div class="status-offline">
              <i class="fa fa-circle offline"></i> offline
            </div>
            <button class="changeRole" type="button" id="changeRole" data-id-changeBtn=${anId}>Change Role</button>
          </div>
        </li>`);          
        }
      if (admin == false)
      $(".changeRole").hide();
    }
    
    $(`[data-id-listName=${anId}]`).click(clickHandlerSpecificChat);
    //$(`[data-id-listName1=${anId}]`).click(clickHandlerSpecificChat);
    
   let changeRoleRef = rtdb.ref(db, "/change_role");
      rtdb.onValue(changeRoleRef, ss=>{
        $(".changeRole").show();
        //$(".changeRole").click(clickHandlerManagRole); 
        $(`[data-id-changeBtn=${anId}]`).click(clickHandlerManagRole);
       });
    
 });  
}//, {
  //onlyOnce: true
//}
 );
  
}

let renderChats = function(userObj){
  $("#addListHere").empty();
  
  let currentUserUid3 = JSON.stringify(userObj.uid);
  let currentUserUidOut2 = currentUserUid3.replace(/"/g, '');
  currentUserUid = currentUserUidOut2;
  
  rtdb.onValue(chatsRef, ss=>{
  $("#addListHere").empty();
  
  ss.forEach(function(el){
    let msgKey = JSON.stringify(el.key);
    let msgKeyOut = msgKey.replace(/"/g, '');
    let receiver = JSON.stringify(el.val().receiver);
    let receiverOut = receiver.replace(/"/g, '');
    let msg = JSON.stringify(el.val().msg);
    let msgOut = msg.replace(/"/g, '');
    let msg_ownerId = JSON.stringify(el.val().owner_uid);
    let msg_ownerIdOut = msg_ownerId.replace(/"/g, '');
    let msg_ownerName = JSON.stringify(el.val().owner_name);
    let msg_ownerNameOut = msg_ownerName.replace(/"/g, '');    
    let time = JSON.stringify(el.val().time);
    let timeOut = time.replace(/"/g, '');
    let date = JSON.stringify(el.val().date);
    let dateOut = date.replace(/"/g, '');
    let group_Chat = JSON.stringify(el.val().group_chat);
    let group_ChatOut = group_Chat.replace(/"/g, '');
    let msgEdit = JSON.stringify(el.val().edited);
    let msgEditOut = msgEdit.replace(/"/g, '');
    
    let currentDate = getCurrentDate();
    let timeDate = timeOut + ", " + dateOut;
    if (dateOut == currentDate){
        timeDate = timeOut + ", Today";
      }
    
    if(groupChat == true){
      if(group_ChatOut == "true"){
      if (currentUserUid == msg_ownerIdOut){  
      let userName = msg_ownerNameOut;
      
      let htmlStr1 = '\
<li>\
            <div class="message-data">\
              <span class="message-data-name"><i class="fa fa-circle online"></i>\
';
let htmlStr2 = '\
</span>\
       <span class="message-data-time">\
'
let htmlStr3 = `
</span>\
            </div>
            <div class="message my-message" msg-id=${msgKeyOut}><span id ="txt-msg" class ="txt-msg" txt-msgId=${msgKeyOut}>`;

        let htmlStr4;
        if(msgEditOut == "true")
          htmlStr4 =`</span><span class="edited" txt-edited=${msgKeyOut}>  (edited)</span>`;
        else
          htmlStr4 =`</span><span></span>`;
      
      let htmlStr5= `<button class="button_edit button_edit_myMsg" type="button" id="message" data-id-editBtn=${msgKeyOut}>Edit</button><button class="button_delete button_delete_myMsg" type="button" id="message" data-id-deletBtn=${msgKeyOut}>Delete</button></div></li>`;
  
        
      $("#addListHere").append(htmlStr1 + userName + htmlStr2 + timeDate + htmlStr3 + msgOut + htmlStr4 + htmlStr5);
        
$(`[data-id-editBtn=${msgKeyOut}]`).click(clickHandlerEdit);
$(`[data-id-deletBtn=${msgKeyOut}]`).click(clickHandlerDelete);
    }
    else{  
      let userName2 = msg_ownerNameOut;
    
      var htmlStr5 = '\
<li class="clearfix">\
            <div class="message-data align-right">\
              <span class="message-data-time" >\
';
  var htmlStr6 ='\
</span> &nbsp; &nbsp;\
              <span class="message-data-name" >\
';
  var htmlStr7 =`
</span> <i class="fa fa-circle me"></i>
               </div>
            <div class="message other-message float-right" msg-id=${msgKeyOut}><span id ="txt-msg" class ="txt-msg" txt-msgId=${msgKeyOut}>`;
  
      let htmlStr8;
        if(msgEditOut == "true")
          htmlStr8 =`</span><span class="edited" txt-edited=${msgKeyOut}>  (edited)</span>`;
        else
          htmlStr8 =`</span><span></span>`;   

  var htmlStr9;    
  var isAdmin;
  let isAdminRef = rtdb.ref(db, "/users/" + currentUserUid);
        rtdb.onValue(isAdminRef, ss=>{
        isAdmin = ss.val().roles.admin;
      
      if(isAdmin == true){
        htmlStr9 = `<button class="button_edit button_edit_otherMsg"  type="button" id="message" data-id-editBtn=${msgKeyOut}>Edit</button><button class="button_delete button_delete_otherMsg" type="button" id="message" data-id-deletBtn=${msgKeyOut}>Delete</button></div></li>`;

      }
          else{
            htmlStr9 = `</div></li>`;            
          }
       $("#addListHere").append(htmlStr5 + timeDate + htmlStr6 + userName2+ htmlStr7 + msgOut + htmlStr8 + htmlStr9);

$(`[data-id-editBtn=${msgKeyOut}]`).click(clickHandlerEdit);
$(`[data-id-deletBtn=${msgKeyOut}]`).click(clickHandlerDelete);
        })
    }
      }
    }else
      if ((msg_ownerIdOut == receiver_id && receiverOut == currentUserUid) || (msg_ownerIdOut == currentUserUid && receiverOut == receiver_id)){
        
        if (currentUserUid == msg_ownerIdOut){  
      let userName = msg_ownerNameOut;
      
      let htmlStr1 = '\
<li>\
            <div class="message-data">\
              <span class="message-data-name"><i class="fa fa-circle online"></i>\
';
let htmlStr2 = '\
</span>\
       <span class="message-data-time">\
'
let htmlStr3 = `
</span>\
            </div>
            <div class="message my-message" msg-id=${msgKeyOut}><span id ="txt-msg" class ="txt-msg" txt-msgId=${msgKeyOut}>`;

       let htmlStr4;
        if(msgEditOut == "true")
          htmlStr4 =`</span><span class="edited" txt-edited=${msgKeyOut}>  (edited)</span>`;
        else
          htmlStr4 =`</span><span></span>`;
            
      let htmlStr5= `<button class="button_edit button_edit_myMsg" type="button" id="message" data-id-editBtn=${msgKeyOut}>Edit</button><button class="button_delete button_delete_myMsg" type="button" id="message" data-id-deletBtn=${msgKeyOut}>Delete</button></div></li>`;
      
      $("#addListHere").append(htmlStr1 + userName + htmlStr2 + timeDate + htmlStr3 + msgOut + htmlStr4 + htmlStr5);
     
$(`[data-id-editBtn=${msgKeyOut}]`).click(clickHandlerEdit);
$(`[data-id-deletBtn=${msgKeyOut}]`).click(clickHandlerDelete);
    }
    else{  
      let userName2 = msg_ownerNameOut;
    
            var htmlStr5 = '\
<li class="clearfix">\
            <div class="message-data align-right">\
              <span class="message-data-time" >\
';
  var htmlStr6 ='\
</span> &nbsp; &nbsp;\
              <span class="message-data-name" >\
';
  var htmlStr7 =`
</span> <i class="fa fa-circle me"></i>
               </div>
            <div class="message other-message float-right" msg-id=${msgKeyOut}><span id ="txt-msg" class ="txt-msg" txt-msgId=${msgKeyOut}>`;
  
      let htmlStr8;
        if(msgEditOut == "true")
          htmlStr8 =`</span><span class="edited" txt-edited=${msgKeyOut}>  (edited)</span>`;
        else
          htmlStr8 =`</span><span></span>`;
  
  var htmlStr9;    
  var isAdmin;
  let isAdminRef = rtdb.ref(db, "/users/" + currentUserUid);
        rtdb.onValue(isAdminRef, ss=>{
        isAdmin = ss.val().roles.admin;
      
      if(isAdmin == true){
        htmlStr9 = `<button class="button_edit button_edit_otherMsg"  type="button" id="message" data-id-editBtn=${msgKeyOut}>Edit</button><button class="button_delete button_delete_otherMsg" type="button" id="message" data-id-deletBtn=${msgKeyOut}>Delete</button></div></li>`;
      }
          else{
            htmlStr9 = `</div></li>`;            
          }
       $("#addListHere").append(htmlStr5 + timeDate + htmlStr6 + userName2+ htmlStr7 + msgOut + htmlStr8 + htmlStr9);  
          
$(`[data-id-editBtn=${msgKeyOut}]`).click(clickHandlerEdit);
$(`[data-id-deletBtn=${msgKeyOut}]`).click(clickHandlerDelete);
        })      
    }              
      }
      //if(element is empty) >> No messegs
      
    //}//End if groupChat == false
        
      })
  }
);
}

let clickHandlerManagRole = function(evt){

  let clickedElement = evt.currentTarget;
  let idFromDOM = $(clickedElement).attr("data-id-changeBtn");     
  let userRoleRef = rtdb.ref(db, `/users/${idFromDOM}`);  
  rtdb.onValue(userRoleRef, (snapshot) => {
  const adminRole = snapshot.val().roles.admin;
  const name = snapshot.val().name;
 
    if(adminRole == true){
      rtdb.update(userRoleRef, {"roles":{"user": true, "admin":false}});
      $(`[data-id-listName=${idFromDOM}]`).html(name + " (User)");
    }
    else{
      rtdb.update(userRoleRef, {"roles":{"user": false, "admin":true}});
      $(`[data-id-listName=${idFromDOM}]`).html(name + " (Admin)");
    }
}, {
  onlyOnce: true
});
  
  //renderUser(userObjGlobal);
}

//push and add messegs
var clickHandlerMsg = function(){
  //alert("message is sent");
  var msg_ = $("#message-to-send").val();
  var time = getCurrentTime();
  var date = getCurrentDate();
  var chatmsg = {msg: msg_, owner_uid: currentUserUid, owner_name: currentUserName, time: time, receiver: receiver_id, date: date, edited: false, reactions: "test", group_chat: groupChat};

  //alert(receiver_id);
  /*
  alert(chatmsg.msg);
  alert(chatmsg.time);
  alert(chatmsg.date);
  alert(chatmsg.owner_uid);
  alert(chatmsg.owner_name);
  alert(chatmsg.receiver);
  alert(chatmsg.edited);
  alert(chatmsg.reactions);
  alert(chatmsg.group_chat);
  */
  rtdb.push(chatsRef, chatmsg);
  const msgInput = document.getElementById("message-to-send"); 
  msgInput.value = '';
}

var clickHandlerEdit = function(evt){

  let clickedElement = evt.currentTarget;
  let idFromDOM = $(clickedElement).attr("data-id-editBtn");
  let txtMsg = $(`[txt-msgId=${idFromDOM}]`).text();
  $(`[txt-msgId=${idFromDOM}]`).empty();
  $(`[txt-edited=${idFromDOM}]`).empty();
  $(`[data-id-editBtn=${idFromDOM}]`).empty();
  
  $(`[msg-id=${idFromDOM}]`).append(`
    <input type="text" 
      data-edit=${idFromDOM}
      class="msgedit" 
      placeholder="Edit Your message"/>
    <button class="button_sendEdit" data-done=${idFromDOM}>Send Edit</button>`);
    
  $(`[data-edit=${idFromDOM}]`).val(txtMsg); 
  $(`[data-done=${idFromDOM}]`).on("click", (evt)=>{
    let editedMsg = $(`[data-edit=${idFromDOM}]`).val();
    sendEdit(idFromDOM, editedMsg, currentUserUid);
    $(`[data-edit=${idFromDOM}]`).remove();
    $(`[data-done=${idFromDOM}]`).remove();
  });
}

let sendEdit = function(msgid, msgup, userid){
  //console.log(msgid, msgup, userid);  
  //let msgRef = rtdb.child(chatsRef, msgid);
  let msgRef = rtdb.ref(db, `/chats/${msgid}`);
  let newDate = getCurrentTime();
  let newTime = getCurrentDate();
    
  rtdb.update(msgRef, {"edited": true, "msg": msgup, "date": newDate, "time": newTime}); 
}

var clickHandlerDelete = function(evt){

  let clickedElement = evt.currentTarget;
  let idFromDOM = $(clickedElement).attr("data-id-deletBtn");
  rtdb.remove(rtdb.ref(db, "/chats/" + idFromDOM));
}

var clickHandlerSpecificChat = function(evt){
  //alert("now inside clickHandlerSpecificChat")
  //$(".groupChat").hide();
  let clickedElement = evt.currentTarget;
  let idFromDOM = $(clickedElement).attr("data-id-listName");
  
  groupChat = false;
  receiver_id = idFromDOM;
  let receiver_name;
  //alert(receiver_id);
  
  let receiverRef = rtdb.ref(db, "/users/" + receiver_id);
        rtdb.onValue(receiverRef, ss=>{
        receiver_name = ss.val().name;
          
        $(".chat-num-messages").html("Chat with " + receiver_name);
     $(".chat-num-messages").append('<div id="groupChat" class="groupChat">Go to the Group Chat</div>');

          $(".groupChat").click(clickHandlerGroupChat);         
        })
  //alert(receiver_id);
  renderChats(userObjGlobal); 
}

var clickHandlerGroupChat = function(evt){
  
  groupChat = true;
  receiver_id = "none";
  $(".chat-num-messages").html("Group Chat");
  $(".groupChat").hide();
  
  renderChats(userObjGlobal); 
}

var getCurrentTime = function(){
  return new Date().toLocaleTimeString().
              replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    }

var getCurrentDate = function(){
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDate();
  return month + "/" + day + "/" + year;
}

const sendBtn = document.getElementById("sendMsgBtn");
sendBtn.addEventListener("click", clickHandlerMsg);

$(".button_edit").click(clickHandlerEdit);
$(".button_delete").click(clickHandlerDelete);

$(".creatAccount").on("click", ()=>{
  //alert("Register User");
  $("#login").hide();
  $("#registerUser").show();
})

$(".backLogin").on("click", ()=>{
  //alert("Register User");
  $("#login").show();
  $("#registerUser").hide();
  $("#registerAdmin").hide();
})

$(".creatAdmin").on("click", ()=>{
  $("#login").hide();
  $("#registerAdmin").show();
})
