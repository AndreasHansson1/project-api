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
      let header = document.createElement('h2');
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

function getAllEntries() {
  let quantity = document.getElementById('entryQuantity').value;
  fetch('api/entries?limit=' + quantity)

    .then(res => res.json())
    .then(entries => {
      let header = document.createElement('h2');
      let h = document.createTextNode('Entries');
      header.appendChild(h);
      document.getElementById('container1').appendChild(header);

      for (var key in entries) {
        
        let title = entries[key].title;
        let content = entries[key].content;
        let createdBy = entries[key].createdBy;
        let entryID = entries[key].entryID;
        if (entries.hasOwnProperty(key)) {
          let p1 = document.createElement('p');
          let p2 = document.createElement('p');
          let p3 = document.createElement('p');
          let p4 = document.createElement('p');
          let t1 = document.createTextNode('Title: ' + title);
          let t2 = document.createTextNode('Content: ' + content);
          let t3 = document.createTextNode('Created By: ' + createdBy);
          let t4 = document.createTextNode('Entry ID: ' + entryID);
          p1.appendChild(t1);
          p2.appendChild(t2);
          p3.appendChild(t3);
          p4.appendChild(t4);
          document.getElementById('container1').appendChild(p1);
          document.getElementById('container1').appendChild(p2);
          document.getElementById('container1').appendChild(p3);
          document.getElementById('container1').appendChild(p4);
          // Create Edit Button
          let entryEditBtn = document.createElement('button');
          entryEditBtn.class = "btn btn-info"; // Set a class name
          entryEditBtn.setAttribute("onclick", editEntry);
          entryEditBtn.onclick = editEntry; // Calls function to edit entry
          document.getElementsByClassName("btn btn-info").onclick = editEntry;
          let t = document.createTextNode('Edit'); 
          entryEditBtn.appendChild(t); 
          document.getElementById('container1').appendChild(entryEditBtn); 
          // Create Delete Button
          let entryDeleteBtn = document.createElement('button');
          entryDeleteBtn.class = "btn btn-danger"; // Set a class name
          entryDeleteBtn.id = entries[key].entryID;
          entryDeleteBtn.setAttribute("onclick", deleteEntry);
          entryDeleteBtn.onclick = deleteEntry; // Calls function to delete entry
          document.getElementsByClassName("btn btn-danger").onclick = deleteEntry;
          let b = document.createTextNode('Delete');
          entryDeleteBtn.appendChild(b);
          document.getElementById('container1').appendChild(entryDeleteBtn);
        }
      }
    });
}

function getAllComments() {
  let quantity = document.getElementById('commentQuantity').value;
  fetch('api/comments?limit=' + quantity)
    .then(res => res.json())
    .then(comments => {
      // Create H1 headertext
      let header = document.createElement('h2');
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
          commentDeleteBtn.class = "btn btn-danger"; // Set a class name
          commentDeleteBtn.id = comments[key].commentID;
          commentDeleteBtn.setAttribute("onclick", deleteComment);
          commentDeleteBtn.onclick = deleteComment; // Calls function to delete entry
          document.getElementsByClassName("btn btn-danger").onclick = deleteComment;
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
  let ID = document.getElementById('searchEntryID').value;
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

      // Create Edit Button
      let entryEditBtn = document.createElement('button');
      entryEditBtn.class = "btn btn-info"; // Set a class name
      entryEditBtn.setAttribute("onclick", editEntry);
      entryEditBtn.onclick = editEntry; // Calls function to edit entry
      document.getElementsByClassName("btn btn-info").onclick = editEntry;
      let t = document.createTextNode('Edit');
      entryEditBtn.appendChild(t);
      document.getElementById('container1').appendChild(entryEditBtn);
      // Create Delete Button
      let entryDeleteBtn = document.createElement('button');
      entryDeleteBtn.class = "btn btn-danger"; // Set a class name
      entryDeleteBtn.id = entries.entryID;
      entryDeleteBtn.setAttribute("onclick", deleteEntry);
      entryDeleteBtn.onclick = deleteEntry; // Calls function to delete entry
      document.getElementsByClassName("btn btn-danger").onclick = deleteEntry;
      let b = document.createTextNode('Delete');
      entryDeleteBtn.appendChild(b);
      document.getElementById('container4').appendChild(entryDeleteBtn);
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
      // Create Delete Button
      let commentDeleteBtn = document.createElement('button');
      commentDeleteBtn.class = "btn btn-danger"; // Set a class name
      commentDeleteBtn.id = comments.commentID;
      commentDeleteBtn.setAttribute("onclick", deleteComment);
      commentDeleteBtn.onclick = deleteComment; // Calls function to delete entry
      document.getElementsByClassName("btn btn-danger").onclick = deleteComment;
      let b = document.createTextNode('Delete');
      commentDeleteBtn.appendChild(b);
      document.getElementById('container4').appendChild(commentDeleteBtn);
    });
}

function deleteEntry(ID) {
  alert('Entry Deleted!');
  ID = this.id;
  return fetch('api/entries/' + ID, {
      method: 'delete'
    })
    .then(res => res.json());
}

function editEntry() {
  var entryID = document.getElementById('entryID').value;
   let title = document.getElementById('editTitle').value;
   let content = document.getElementById('editContent').value;
   fetch('api/entries/' + entryID, {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     body: 'content=Fresh Content&title=My New Shiny Title'
   });
  
}

function deleteComment(ID) {
  alert('Comment Deleted!');
  ID = this.id;
  return fetch('api/comments/' + ID, {
      method: 'delete'
      })
      .then(res => res.json());
}

// function newEntry() {
//   let title = document.getElementById('newTitle').value;
//   let content = document.getElementById('newContent').value;
//   fetch('api/entries', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: title,
//         content: content 
//     })
//   }).then((res) => res.json())
//     .then((data) => alert(data));
//     }


// function newEntry() {
// // let entryID = this.entryID;
// let title = document.getElementById('newTitle').value;
// let content = document.getElementById('newContent').value;
// let createdBy = 3;
// let data = {
//   title: title,
//   content: content,
//   createdBy: createdBy
// };

// fetch('api/entries/', {
//     method: 'POST', 
//     body: JSON.stringify(data),
//     headers: new Headers({
//       'Content-Type': 'application/json'
//     })
//   }).then(res => res.json())
//   .catch(error => alert('Error:', error))
//   .then(response => alert('Success:', response));
// }



function newEntry() {
    let title = document.getElementById('newTitle').value;
    let content = document.getElementById('newContent').value;
    let createdBy = 3;
    let data = {
        'title': title,
        'content': content,
        'createdBy': createdBy
    };
    
    fetch('api/entries', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((res) => res.json())
      .then((data) => alert(data));
  }





