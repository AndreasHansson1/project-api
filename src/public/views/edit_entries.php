<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href=https://stackpath.bootstrapcdn.com/bootswatch/4.1.0/cerulean/bootstrap.min.css>
  <title>Edit Entries</title>
</head>

<body>
<?php if (isset($_SESSION["loggedIn"])): ?>


<table>
  <thead>
    <tr>
      <th>#</th>
      <th>Entry ID</th>
      <th>Title</th>
      <th>Content</th>
      <th>Created By</th>
      <th>Created At</th>
    </tr>
  </thead>
  <tbody>
  <?php foreach ($result as $row) : ?>
    <tr>
      <td><?php echo escape($row["entryID"]); ?></td>
      <td><?php echo escape($row["title"]); ?></td>
      <td><?php echo escape($row["content"]); ?></td>
      <td><?php echo escape($row["createdBy"]); ?></td>
      <td><?php echo escape($row["createdAt"]); ?></td>
  </tr>
  <?php endforeach; ?>
  </tbody>
</table>

<a href="index.php">Back to home</a>

 
<?php endif; ?>
  
  <script src="scripts/main.js"></script>
</body>

</html>