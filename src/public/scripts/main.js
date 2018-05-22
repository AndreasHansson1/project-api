// async function main() {
//   let response = await fetch('/todos/1');
//   let { data } = await response.json();
//   console.log(data);
// }

// main();

function newUser() {
  let username = document.getElementById('newUsername').value;
  let password = document.getElementById('newPassword').value;
  let createdAt = new Date();

  let data = {
    'username': username,
    'password': password,
    'createdAt': createdAt
  };

  fetch('/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

function login() {
  let username = document.getElementById('loginUsername').value;
  let password = document.getElementById('loginPassword').value;
  alert(username);

  let data = {
    'username': username,
    'password': password
  };

  fetch('/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

function getAllUsers() {
  fetch('api/users')

    .then(res => res.json())
    .then(users => {
      // Create H2 headertext
      let header = document.createElement('h2');
      let h = document.createTextNode('Users');
      header.appendChild(h);
      document.getElementById('container1').appendChild(header);
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
          document.getElementById('container1').appendChild(p1);
          document.getElementById('container1').appendChild(p2);

        }
      }
    });
}

function getAllEntries() {
  let quantity = document.getElementById('entryQuantity').value;
  fetch('api/entries?limit=' + quantity)

    .then(res => res.json())
    .then(entries => {
      // Create header text
      let header = document.createElement('h2');
      let h = document.createTextNode('Entries');
      header.appendChild(h);
      document.getElementById('container2').appendChild(header);

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
          document.getElementById('container2').appendChild(p1);
          document.getElementById('container2').appendChild(p2);
          document.getElementById('container2').appendChild(p3);
          document.getElementById('container2').appendChild(p4);
          // Create Edit Button
          let entryEditBtn = document.createElement('button');
          entryEditBtn.class = "btn btn-info"; // Set a class name
          entryEditBtn.addEventListener('click', () => { createEditEntryForm(entryID, createdBy); });
          let t = document.createTextNode('Edit'); 
          entryEditBtn.appendChild(t); 
          document.getElementById('container2').appendChild(entryEditBtn);
          // Create Comment Button
          let commentBtn = document.createElement('button');
          commentBtn.class = "btn btn-info"; // Set a class name
          commentBtn.setAttribute("onclick", createCommentForm);
          commentBtn.onclick = createCommentForm; // Calls function to create Comment form
          document.getElementsByClassName("btn btn-info").onclick = createCommentForm;
          let c = document.createTextNode('Comment');
          commentBtn.appendChild(c);
          document.getElementById('container2').appendChild(commentBtn);
          // Create Delete Button
          let entryDeleteBtn = document.createElement('button');
          entryDeleteBtn.class = "btn btn-danger"; // Set a class name
          entryDeleteBtn.id = entries[key].entryID;
          entryDeleteBtn.setAttribute("onclick", deleteEntry);
          entryDeleteBtn.onclick = deleteEntry; // Calls function to delete entry
          document.getElementsByClassName("btn btn-danger").onclick = deleteEntry;
          let b = document.createTextNode('Delete');
          entryDeleteBtn.appendChild(b);
          document.getElementById('container2').appendChild(entryDeleteBtn);
        }
      }
    });
}

function getAllComments() {
  let quantity = document.getElementById('commentQuantity').value;
  fetch('api/comments?limit=' + quantity)
    .then(res => res.json())
    .then(comments => {
      // Create H2 headertext
      let header = document.createElement('h2');
      let h = document.createTextNode('Comments');
      header.appendChild(h);
      document.getElementById('container3').appendChild(header);
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
          document.getElementById('container3').appendChild(p1);
          document.getElementById('container3').appendChild(p2);
          
          // Create Delete Button
          let commentDeleteBtn = document.createElement('button');
          commentDeleteBtn.class = "btn btn-danger"; // Set a class name
          commentDeleteBtn.id = comments[key].commentID;
          commentDeleteBtn.setAttribute("onclick", deleteComment);
          commentDeleteBtn.onclick = deleteComment; // Calls function to delete entry
          document.getElementsByClassName("btn btn-danger").onclick = deleteComment;
          let b = document.createTextNode('Delete');
          commentDeleteBtn.appendChild(b);
          document.getElementById('container3').appendChild(commentDeleteBtn);
        }
    }
  });
}

function getOneUser() {
  var ID = document.getElementById('searchUserID').value;
  fetch('api/users/' + ID)
    .then(res => res.json())
    .then(users => {
      // Create H2 headertext
      let header = document.createElement('h2');
      let h = document.createTextNode('User');
      header.appendChild(h);
      document.getElementById('container4').appendChild(header);

      let p1 = document.createElement('p');
      let p2 = document.createElement('p');
      let t1 = document.createTextNode('Username: ' + users.username);
      let t2 = document.createTextNode('User ID: ' + users.userID);
      p1.appendChild(t1);
      p2.appendChild(t2);
      document.getElementById('container4').appendChild(p1);
      document.getElementById('container4').appendChild(p2);
    });
}

function getOneEntry() {
  let ID = document.getElementById('searchEntryID').value;
  fetch('api/entries/' + ID)
    .then(res => res.json())
    .then(entries => {
      let title = entries.title;
      let content = entries.content;
      let entryID = entries.entryID;
      let createdBy = entries.createdBy;
      // Create H2 headertext
      let header = document.createElement('h2');
      let h = document.createTextNode('Entry');
      header.appendChild(h);
      document.getElementById('container5').appendChild(header);

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
      document.getElementById('container5').appendChild(p1);
      document.getElementById('container5').appendChild(p2);
      document.getElementById('container5').appendChild(p3);
      document.getElementById('container5').appendChild(p4);

      // Create Edit Button
      let entryEditBtn = document.createElement('button');
      entryEditBtn.class = "btn btn-info"; // Set a class name
      entryEditBtn.addEventListener('click', () => { createEditEntryForm(entryID, createdBy); });
      let t = document.createTextNode('Edit');
      entryEditBtn.appendChild(t);
      document.getElementById('container5').appendChild(entryEditBtn);
      // Create Comment Button
      let commentBtn = document.createElement('button');
      commentBtn.class = "btn btn-info"; // Set a class name
      commentBtn.setAttribute("onclick", createCommentForm);
      commentBtn.onclick = createCommentForm; // Calls function to create Comment form
      document.getElementsByClassName("btn btn-info").onclick = createCommentForm;
      let c = document.createTextNode('Comment');
      commentBtn.appendChild(c);
      document.getElementById('container5').appendChild(commentBtn);
      // Create Delete Button
      let entryDeleteBtn = document.createElement('button');
      entryDeleteBtn.class = "btn btn-danger"; // Set a class name
      entryDeleteBtn.id = entries.entryID;
      entryDeleteBtn.setAttribute("onclick", deleteEntry);
      entryDeleteBtn.onclick = deleteEntry; // Calls function to delete entry
      document.getElementsByClassName("btn btn-danger").onclick = deleteEntry;
      let b = document.createTextNode('Delete');
      entryDeleteBtn.appendChild(b);
      document.getElementById('container5').appendChild(entryDeleteBtn);
    });
}

function getOneComment() {
    let ID = document.getElementById('searchCommentID').value;
    fetch('api/comments/' + ID)
    .then(res => res.json())
    .then(comments => {
      // Create H2 headertext
      let header = document.createElement('h2');
      let h = document.createTextNode('Comment');
      header.appendChild(h);
      document.getElementById('container6').appendChild(header);
      let p1 = document.createElement('p');
      let p2 = document.createElement('p');
      let t1 = document.createTextNode('Content: ' + comments.content);
      let t2 = document.createTextNode('Created By: ' + comments.createdBy);
      p1.appendChild(t1);
      p2.appendChild(t2);
      document.getElementById('container6').appendChild(p1);
      document.getElementById('container6').appendChild(p2);
      // Create Delete Button
      let commentDeleteBtn = document.createElement('button');
      commentDeleteBtn.class = "btn btn-danger"; // Set a class name
      commentDeleteBtn.id = comments.commentID;
      commentDeleteBtn.setAttribute("onclick", deleteComment);
      commentDeleteBtn.onclick = deleteComment; // Calls function to delete entry
      document.getElementsByClassName("btn btn-danger").onclick = deleteComment;
      let b = document.createTextNode('Delete');
      commentDeleteBtn.appendChild(b);
      document.getElementById('container6').appendChild(commentDeleteBtn);
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

function editEntry(entryID) {
    let title = document.getElementById('editTitle').value;
    let content = document.getElementById('editContent').value;

     let data = {
       'title': title,
       'content': content
     };

   fetch("api/entries/" + entryID, {
     method: "PATCH",
     headers: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     body: serialize(data)
   })
     .then(res => res.json())
     .then(obj => {
       alert(JSON.stringify(obj));
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

function newEntry() {
    let title = document.getElementById('newTitle').value;
    let content = document.getElementById('newContent').value;
    let createdBy = 3; //Will be the inlogged userID later i guess?
    let createdAt = new Date();
    
    let data = {
        'title': title,
        'content': content,
        'createdBy': createdBy,
        'createdAt': createdAt
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
      .then(data);
  }

  function createNewEntryForm() {
    // Create H2 headertext
    let header = document.createElement('h2');
    let h = document.createTextNode('New Entry');
    header.appendChild(h);
    document.getElementById('newEntryContainer').appendChild(header);
    // Create form
    let f = document.createElement("form");
    f.setAttribute('method', "post");
    f.setAttribute('action', "");
    f.setAttribute('class', "form-group");
    // Create input field
    let i = document.createElement("input");
    i.setAttribute('type', "text");
    i.setAttribute('name', "title");
    i.setAttribute('placeholder', "Title");
    i.setAttribute('class', "form-control");
    i.setAttribute('id', "newTitle");
    // Create textarea
    let ii = document.createElement("textarea"); 
    ii.setAttribute('type', "text");
    ii.setAttribute('name', "content");
    ii.setAttribute('placeholder', "Content");
    ii.setAttribute('class', "form-control");
    ii.setAttribute('id', "newContent");
    // Create submit button
    let s = document.createElement("input"); 
    s.setAttribute('type', "submit");
    s.setAttribute('value', "Submit");
    s.setAttribute('class', "btn btn-success");
    s.setAttribute('onclick', "newEntry()");

    f.appendChild(i);
    f.appendChild(ii);
    f.appendChild(s);

    document.getElementById("newEntryContainer").appendChild(f);
  }

  function createEditEntryForm(entryID) {
   // Create H2 headertext
   let header = document.createElement('h2');
   let h = document.createTextNode('Edit Entry');
   header.appendChild(h);
   document.getElementById('editEntryContainer').appendChild(header);
   // Create form
   let f = document.createElement("form");
   f.setAttribute('method', "patch");
   f.setAttribute('action', "");
   f.setAttribute('class', "form-group");
   // Create input field
   let i = document.createElement("input");
   i.setAttribute('type', "text");
   i.setAttribute('name', "title");
   i.setAttribute('placeholder', "Title");
   i.setAttribute('class', "form-control");
   i.setAttribute('id', "editTitle");
   // Create textarea
   let ii = document.createElement("textarea");
   ii.setAttribute('type', "text");
   ii.setAttribute('name', "content");
   ii.setAttribute('placeholder', "Content");
   ii.setAttribute('class', "form-control");
   ii.setAttribute('id', "editContent");
   // Create submit button
   let s = document.createElement("input");
   s.setAttribute('type', "submit");
   s.setAttribute('value', "Submit");
   s.setAttribute('class', "btn btn-success");
  //  s.setAttribute('onclick', "editEntry(entryID)");
   s.addEventListener('click', () => { editEntry(entryID); });

   f.appendChild(i);
   f.appendChild(ii);
   f.appendChild(s);

   document.getElementById("editEntryContainer").appendChild(f);
   }

   function createCommentForm() {
     // Create H2 headertext
     let header = document.createElement('h2');
     let h = document.createTextNode('Comment');
     header.appendChild(h);
     document.getElementById('newCommentContainer').appendChild(header);
     // Create form
     let f = document.createElement("form");
     f.setAttribute('method', "post");
     f.setAttribute('action', "");
     f.setAttribute('class', "form-group");
     // Create textarea
     let i = document.createElement("textarea");
     i.setAttribute('type', "text");
     i.setAttribute('name', "content");
     i.setAttribute('placeholder', "Content");
     i.setAttribute('class', "form-control");
     i.setAttribute('id', "newContent");
     // Create submit button
     let s = document.createElement("input");
     s.setAttribute('type', "submit");
     s.setAttribute('value', "Submit");
     s.setAttribute('class', "btn btn-success");
     s.setAttribute('onclick', "newComment()");

     f.appendChild(i);
     f.appendChild(s);

     document.getElementById("newCommentContainer").appendChild(f);
   }

   function newComment() {
     alert('Hi from comment Function!');
   }
   // Validation function so you cant leave empty fields in form. Not working yet
   function validateForm() {
     if(document.getElementsByClassName("form-control").value.length == 0)
{
    alert("No empty fields");
}
   }


 function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}





