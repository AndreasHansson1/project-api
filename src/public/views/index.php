<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href=https://stackpath.bootstrapcdn.com/bootswatch/4.1.0/cerulean/bootstrap.min.css>
  <title>Frontend</title>
</head>
<body>
<?php if (isset($_SESSION["loggedIn"])): ?>
<div class="container">
    <br>
    <h2>Sign Up</h2>
    <form action="" method="POST">
        <div class="form-group">
            <label for="username">Username</label>
            <input class="form-control" type="text" name="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" name="password">
        </div>
            <input type="submit" name="submit" value="Register" class="btn btn-primary">
    </form>
    <br><br>

    <h2>Login</h2>
    <form action="" method="POST">
        <div class="form-group">
            <label for="username">Username</label>
            <input class="form-control" type="text" name="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" name="password">
        </div>
            <input type="submit" name="submit" value="Login" class="btn btn-success">
    </form>
</div>
    <?php else : ?>

  <h1>Project API</h1>
    <!-- <div class="formContainer">
        <div class="form-group">
          <form action="" method="post">
          <h2>New Entry</h2>
            <input type="text" class="form-control" id="newTitle" placeholder="Title">
            <textarea name="content" class="form-control" id="newContent" placeholder="Content"></textarea>
            <button type="submit" onclick="newEntry()" class="btn btn-success">Add</button>
          </div>
        </form>
    </div>
    <div class="formContainer">
        <div class="form-group">
          <form action="" method="post">
          <h2>Edit Entry</h2>
            <input type="text" class="form-control" id="entryID" placeholder="EntryID">
            <input type="text" class="form-control" id="editTitle" placeholder="Title">
            <textarea name="content" class="form-control" id="editContent" placeholder="Content"></textarea>
            <button type="submit" onclick="editEntry()" class="btn btn-success">Edit</button>
          </div>
        </form>
    </div>
    <div class="formContainer">
        <div class="form-group">
          <form action="" method="post">
          <h2>Comment</h2>
            <input type="text" class="form-control" id="entryID" placeholder="Entry ID">
            <textarea name="content" class="form-control" id="editContent" placeholder="Content"></textarea>
            <button type="submit" onclick="newComment()" class="btn btn-success">Comment</button>
          </div>
        </form>
    </div> -->
<div id="newEntryContainer"></div> 
<form name ="getUsers" id="getUsers" action="#">
<input type="button" name="submit" value="New Entry" class="btn btn-primary"
      onclick="createNewEntryForm();" />
</form>



<div class="container">
  <form name ="getUsers" id="getUsers" action="#">
      <input type="button" name="submit" value="Get All Users" class="btn btn-primary btn-sm"
      onclick="getAllUsers();" />
  </form>

  <form name ="getEntries" id="getEntries" action="#">
      Get Entries: <input type="text" name="name" id="entryQuantity" placeholder=" Quantity" />
      <input type="button" name="submit" value="Get Entries" class="btn btn-primary btn-sm"
      onclick="getAllEntries();" />
  </form>

  <form name ="getCommants" id="getComments" action="#">
      Get Comments: <input type="text" name="name" id="commentQuantity" placeholder=" Quantity" />
      <input type="button" name="submit" value="Get Comments" class="btn btn-primary btn-sm"
      onclick="getAllComments();" />
  </form>

  <form name ="searchUser" id="searchUser" action="#">
      Single User: <input type="text" name="name" id="searchUserID" placeholder=" ID" />
      <input type="button" name="submit" value="Get User" class="btn btn-primary btn-sm"
      onclick="getOneUser();" />
  </form>

  <form name ="searchEntry" id="searchEntry" action="#">
      Single Entry: <input type="text" name="name" id="searchEntryID" placeholder=" ID" />
      <input type="button" name="submit" value="Get Entry" class="btn btn-primary btn-sm"
      onclick="getOneEntry();" />
  </form>

  <form name ="searchComment" id="searchComment" action="#">
      Single Comment: <input type="text" name="name" id="searchCommentID" placeholder=" ID" />
      <input type="button" name="submit" value="Get Comment" class="btn btn-primary btn-sm"
      onclick="getOneComment();" />
  </form>
</div>
<div class="wrapper">
    <div id="container"></div>
    <div id="container1"></div>
    <div id="container2"></div>
    <div id="container3"></div>
    <div id="container4"></div>
    <div id="container5"></div>
    <div id="container6"></div>
    <div id="container7"></div>
    <div id="container8"></div>
  </div>
<?php endif; ?>
  
  <script src="scripts/main.js"></script>
</body>

</html>