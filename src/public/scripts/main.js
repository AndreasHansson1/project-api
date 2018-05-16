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

function getEntries() {
  fetch('api/entries')
  
    .then(res => res.json())
    .then(entries => {
      console.log(entries);
      for (var key in entries) {
        if (entries.hasOwnProperty(key)) {
          alert(key + " -> " + entries[key].title);
        }
    }
});
}

getEntries();