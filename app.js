const firebaseConfig = {
    apiKey: "AIzaSyCqTfopnLxUZrcftGv5bQoTdJZcWmvgTVk",
    authDomain: "todo-app-1ac32.firebaseapp.com",
    databaseURL: "https://todo-app-1ac32-default-rtdb.firebaseio.com",
    projectId: "todo-app-1ac32",
    storageBucket: "todo-app-1ac32.appspot.com",
    messagingSenderId: "236286936324",
    appId: "1:236286936324:web:de3dfe78436ff360eafc51",
    measurementId: "G-M3WLMDM7CS"
  };

  firebase.initializeApp(firebaseConfig);
  
  var list = document.getElementById("list");
  
  firebase
    .database()
    .ref("todos")
    .on("child_added", function (data) {
      var liElement = document.createElement("li");
  
      var liText = document.createTextNode(data.val().todoVal);
  
      liElement.appendChild(liText);
  
      list.appendChild(liElement);
  
      var EditBtnELement = document.createElement("button");
      var EditBtnText = document.createTextNode("Edit");
      EditBtnELement.appendChild(EditBtnText);
  
      var DeleteBtnELement = document.createElement("button");
      var DeleteBtnText = document.createTextNode("Delete");
      DeleteBtnELement.appendChild(DeleteBtnText);
  
      liElement.appendChild(EditBtnELement);
      liElement.appendChild(DeleteBtnELement);
  
      EditBtnELement.setAttribute("class", "Editbtn");
      DeleteBtnELement.style.backgroundColor = "lightcoral";
  
      DeleteBtnELement.setAttribute("onclick", "deleteItem(this)");
      DeleteBtnELement.setAttribute("id", data.val().key);
  
      EditBtnELement.setAttribute("onclick", "editItem(this)");
      EditBtnELement.setAttribute("id", data.val().key);
    });
  
  function addTodo() {
    var input = document.getElementById("inputField");
    var id = Date.now().toString(36);
  
    var todoObj = {
      todoVal: input.value,
      key: id,
    };
  
    firebase
      .database()
      .ref("todos/" + id)
      .set(todoObj);
  
    input.value = "";
  }
  
  function deleteAll() {
    firebase.database().ref("todos").remove();
    list.innerHTML = "";
  }
  
  function deleteItem(e) {
    firebase.database().ref(`todos/${e.id}`).remove();
    e.parentNode.remove();
  }
  
  function editItem(e) {
    var updateValue = prompt(
      "Enter updated value",
      e.parentNode.firstChild.nodeValue
    );
  
    firebase.database().ref(`todos/${e.id}`).set({
      key: e.id,
      todoVal: updateValue,
    });
  
    e.parentNode.firstChild.nodeValue = updateValue;
  }
  