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

    
    <div class="container">
    <br>
    <h1>New Entry</h1>
      <div class="form-group">
          <input type="text" id="newTitle" placeholder="Title">
          <form action="" id="newContent">
          <textarea name="content" placeholder="Content"></textarea>
          <button type="submit" class="btn btn-success">Add</button>
        </form>
      </div>
    </div>

  
    
    <div id="wrapper">
        <div id="container"></div>
        <div id="container1"></div>
        <div id="container2"></div>
        <div id="container3"></div>
        <div id="container4"></div>
        <div id="container5"></div>
    </div>
<?php endif; ?>
  
  <script src="scripts/main.js"></script>
</body>

</html>