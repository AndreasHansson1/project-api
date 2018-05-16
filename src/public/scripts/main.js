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
      console.log(users);
      for (var key in users) {
        if (users.hasOwnProperty(key)) {
          alert(key + " -> " + users[key].userID + users[key].username);
        }
      }
    });
}
getAllUsers();

function getAllEntries() {
  fetch('api/entries')
  
    .then(res => res.json())
    .then(entries => {
      console.log(entries);
      for (var key in entries) {
        if (entries.hasOwnProperty(key)) {
          alert(key + " -> " + entries[key].title + entries[key].content);
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
        if (comments.hasOwnProperty(key)) {
          alert(key + " -> " + comments[key].createdBy + comments[key].content);
        }
      }
    });
}
getAllComments();