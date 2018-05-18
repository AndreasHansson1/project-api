// async function main() {
//   let response = await fetch('/todos/1');
//   let { data } = await response.json();
//   console.log(data);
// }

// main();

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
  let quantity = document.getElementById('entryQuantity').value;
  fetch('api/entries?limit=' + quantity)

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
          let entryEditBtn = document.createElement('button');
          entryEditBtn.class = "btn"; // Set a class name
          entryEditBtn.setAttribute("onclick", editEntry);
          entryEditBtn.onclick = editEntry; // Calls function to edit entry
          document.getElementsByClassName("btn").onclick = editEntry;
          let t = document.createTextNode('Edit'); 
          entryEditBtn.appendChild(t); 
          document.getElementById('container1').appendChild(entryEditBtn); 
          // Create Delete Button
          let entryDeleteBtn = document.createElement('button');
          entryDeleteBtn.class = "btn1"; // Set a class name
          entryDeleteBtn.id = entries[key].entryID;
          entryDeleteBtn.setAttribute("onclick", deleteEntry);
          entryDeleteBtn.onclick = deleteEntry; // Calls function to delete entry
          document.getElementsByClassName("btn1").onclick = deleteEntry;
          let b = document.createTextNode('Delete');
          entryDeleteBtn.appendChild(b);
          document.getElementById('container1').appendChild(entryDeleteBtn);
        }
      }
    });
}
// getAllEntries();


function getAllComments() {
  let quantity = document.getElementById('commentQuantity').value;
  fetch('api/comments?limit=' + quantity)
    .then(res => res.json())
    .then(comments => {
      // Create H1 headertext
      let header = document.createElement('h1');
      let h = document.createTextNode('Comments');
      header.appendChild(h);
      document.getElementById('container2').appendChild(header);
      for (var key in comments) {
        let content = comments[key].content;
        let createdBy = comments[key].createdBy;
        if (comments.hasOwnProperty(key)) {
          let p1 = document.createElement('p');
          let p2 = document.createElement('p'); 
          let t1 = document.createTextNode('Content: ' + content);
          let t2 = document.createTextNode('Created By: ' + createdBy);
          p1.appendChild(t1);
          p2.appendChild(t2); 
          document.getElementById('container2').appendChild(p1);
          document.getElementById('container2').appendChild(p2);
          
          // Create Delete Button
          let commentDeleteBtn = document.createElement('button');
          commentDeleteBtn.class = "btn2"; // Set a class name
          commentDeleteBtn.setAttribute("onclick", deleteComment);
          commentDeleteBtn.onclick = deleteComment; // Calls function to delete entry
          document.getElementsByClassName("btn2").onclick = deleteComment;
          let b = document.createTextNode('Delete');
          commentDeleteBtn.appendChild(b);
          document.getElementById('container2').appendChild(commentDeleteBtn);
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

function getOneEntry() {
  var ID = document.getElementById('searchEditID').value;
  fetch('api/entries/' + ID)
    .then(res => res.json())
    .then(entries => {
      let p1 = document.createElement('p');
      let p2 = document.createElement('p');
      let p3 = document.createElement('p');
      let t1 = document.createTextNode('Title: ' + entries.title);
      let t2 = document.createTextNode('Content: ' + entries.content);
      let t3 = document.createTextNode('Created By: ' + entries.createdBy);
      p1.appendChild(t1);
      p2.appendChild(t2);
      p3.appendChild(t3);
      document.getElementById('container4').appendChild(p1);
      document.getElementById('container4').appendChild(p2);
      document.getElementById('container4').appendChild(p2);
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
  let ID = this.id;
  fetch('api/entries/' + ID)
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




