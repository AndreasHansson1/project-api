// async function main() {
//   const response = await fetch('/todos/1');
//   const { data } = await response.json();
//   console.log(data);
// }

// main();



// function main() {
//   fetch('api/users')
//     .then(res => res.json())
//     .then(console.log);
// }

function getAllUsers() {
  fetch('api/users')

    .then(res => res.json())
    .then(users => {
      for (var key in users) {
      let userID = users[key].userID;
      let username = users[key].username; 
        if (users.hasOwnProperty(key)) {
         var output = '';

         output += '<h1>Users ' + '</h1>' +
           '<ul id="list">' +
           '<li>User ID: ' + userID+ '</li>' +
           '<li>Username: ' + username+ '</li>' +
           '</ul><br>';

         document.getElementById('container1').innerHTML = output;
        }
      }
    });
}
getAllUsers();

function getAllEntries() {
  fetch('api/entries')
  
    .then(res => res.json())
    .then(entries => {
      
      for (var key in entries) {
        let title = entries[key].title;
        let content = entries[key].content;
        let createdBy = entries[key].createdBy;
        if (entries.hasOwnProperty(key)) {
          var output = '';

          output += '<h1>Entries ' + '</h1>' +
            '<ul id="list">' +
            '<li>Title: ' + title + '</li>' +
            '<li>Content: ' + content + '</li>' +
            '<li> Created By: ' + createdBy + '</li>' +
            '</ul><br>';

            document.getElementById('container').innerHTML = output;
          
        }
    }
});
}
getAllEntries();

function getAllComments() {
  fetch('api/comments')

    .then(res => res.json())
    .then(comments => {
      console.log(comments);
      for (var key in comments) {
      let content = comments[key].content;
      let createdBy = comments[key].createdBy;
        if (comments.hasOwnProperty(key)) {
          var output = '';

          output += '<h1>Comments ' + '</h1>' +
            '<ul id="list">' +
            '<li>Content: ' + content + '</li>' +
            '<li> Created By: ' + createdBy + '</li>' +
            '</ul><br>';

          document.getElementById('container2').innerHTML = output;
        }
      }
    });
}
getAllComments();