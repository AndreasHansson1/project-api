// async function main() {
//   let response = await fetch('/todos/1');
//   let { data } = await response.json();
//   console.log(data);
// }

// main();

// function getAllUsers() {
//   fetch('api/users')

//     .then(res => res.json())
//     .then(users => {
//       for (var key in users) {
//       let userID = users[key].userID;
//       let username = users[key].username; 
//         if (users.hasOwnProperty(key)) {
//          var output = '';

//          output += '<h1>Users ' + '</h1>' +
//            '<ul id="list">' +
//            '<li><strong>User ID:</strong> ' + userID + '</li>' +
//            '<li><strong>Username:</strong> ' + username + '</li>' +
//            '</ul><br>';

//          document.getElementById('container1').innerHTML = output;
//         }
//       }
//     });
// }
// getAllUsers();

function getAllUsers() {
  fetch('api/users')

    .then(res => res.json())
    .then(users => {
      // Create H1 headertext
      let header = document.createElement('h1');
      let h = document.createTextNode('Users');
      header.appendChild(h);
      document.getElementById('container').appendChild(header);
      for (var key in users) {
        let username = users[key].username;
        let userID = users[key].userID;
        if (users.hasOwnProperty(key)) {
          let p1 = document.createElement('p');
          let p2 = document.createElement('p'); 
          let t1 = document.createTextNode('Username: ' + username);
          let t2 = document.createTextNode('User ID: ' + userID);
          p1.appendChild(t1);
          p2.appendChild(t2); 
          document.getElementById('container').appendChild(p1);
          document.getElementById('container').appendChild(p2);

        }
      }
    });
}
// getAllUsers();

function getAllEntries() {
  fetch('api/entries')

    .then(res => res.json())
    .then(entries => {
      let header = document.createElement('h1');
      let h = document.createTextNode('Entries');
      header.appendChild(h);
      document.getElementById('container1').appendChild(header);
      for (var key in entries) {
        let title = entries[key].title;
        let content = entries[key].content;
        let createdBy = entries[key].createdBy;
        if (entries.hasOwnProperty(key)) {
          let p1 = document.createElement('p');
          let p2 = document.createElement('p');
          let p3 = document.createElement('p'); 
          let t1 = document.createTextNode('Title: ' + title);
          let t2 = document.createTextNode('Content: ' + content);
          let t3 = document.createTextNode('Created By: ' + createdBy);
          p1.appendChild(t1);
          p2.appendChild(t2);
          p3.appendChild(t3); 
          document.getElementById('container1').appendChild(p1);
          document.getElementById('container1').appendChild(p2);
          document.getElementById('container1').appendChild(p3);
          // Create Edit Button
          let btn = document.createElement('button');
          btn.class = "btn"; // Set a class name
          btn.setAttribute("onclick", editEntry);
          btn.onclick = editEntry; // Calls function to edit entry
          document.getElementsByClassName("btn").onclick = editEntry;
          let t = document.createTextNode('Edit'); 
          btn.appendChild(t); 
          document.getElementById('container1').appendChild(btn); 
          // Create Delete Button
          let btn1 = document.createElement('button');
          btn1.class = "btn1"; // Set a class name
          btn1.setAttribute("onclick", deleteEntry);
          btn1.onclick = deleteEntry; // Calls function to delete entry
          document.getElementsByClassName("btn1").onclick = deleteEntry;
          let b = document.createTextNode('Delete');
          btn1.appendChild(b);
          document.getElementById('container1').appendChild(btn1);
        }
      }
    });
}
// getAllEntries();


function getAllComments() {
  fetch('api/comments')
    .then(res => res.json())
    .then(entries => {
      // Create H1 headertext
      let header = document.createElement('h1');
      let h = document.createTextNode('Comments');
      header.appendChild(h);
      document.getElementById('container2').appendChild(header);
      for (var key in entries) {
        let content = entries[key].content;
        let createdBy = entries[key].createdBy;
        if (entries.hasOwnProperty(key)) {
          let p1 = document.createElement('p');
          let p2 = document.createElement('p'); 
          let t1 = document.createTextNode('Content: ' + content);
          let t2 = document.createTextNode('Created By: ' + createdBy);
          p1.appendChild(t1);
          p2.appendChild(t2); 
          document.getElementById('container2').appendChild(p1);
          document.getElementById('container2').appendChild(p2);
          // Create Edit Button
          let btn = document.createElement('button');
          let t = document.createTextNode('Edit'); 
          btn.appendChild(t); 
          document.getElementById('container2').appendChild(btn);
          // Create Delete Button
          let btn2 = document.createElement('button');
          btn2.class = "btn2"; // Set a class name
          btn2.setAttribute("onclick", deleteComment);
          btn2.onclick = deleteComment; // Calls function to delete entry
          document.getElementsByClassName("btn1").onclick = deleteComment;
          let b = document.createTextNode('Delete');
          btn2.appendChild(b);
          document.getElementById('container2').appendChild(btn2);
        }
    }
  });
}
// getAllComments();

function getOneUser() {
  var ID = document.getElementById('searchUserID').value;
  fetch('api/users/' + ID)
    .then(res => res.json())
    .then(users => {
          let p1 = document.createElement('p');
          let p2 = document.createElement('p');
          let t1 = document.createTextNode('Username: ' + users.username);
          let t2 = document.createTextNode('User ID: ' + users.userID);
          p1.appendChild(t1);
          p2.appendChild(t2);
          document.getElementById('container3').appendChild(p1);
          document.getElementById('container3').appendChild(p2);
    });
}

function getOneComment() {
  var ID = document.getElementById('searchCommentID').value;
  fetch('api/comments/' + ID)
    .then(res => res.json())
    .then(comments => {
      let p1 = document.createElement('p');
      let p2 = document.createElement('p');
      let t1 = document.createTextNode('Content: ' + comments.content);
      let t2 = document.createTextNode('Created By: ' + comments.createdBy);
      p1.appendChild(t1);
      p2.appendChild(t2);
      document.getElementById('container4').appendChild(p1);
      document.getElementById('container4').appendChild(p2);
    });
}

function deleteEntry() {
  let ID = this.entryID;
  alert(ID);
  fetch('api/entries/')
    .then(res => res.json())
    .then(

    );
}

function editEntry() {
  alert('Yes!');
}

function deleteComment() {
  alert('deleted comment!');
}




