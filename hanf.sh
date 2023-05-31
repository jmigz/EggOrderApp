#!/bin/bash

# Create the layout.ejs file
echo "<!DOCTYPE html>
<html>
<head>
  <!-- Add your head content here -->
</head>
<body>
  <% include partials/header.ejs %>

  <%- body %> <!-- This will be replaced with the specific content of each view -->

  <% include partials/footer.ejs %>
</body>
</html>" > views/layout.ejs

# Create the partials directory
mkdir views/partials

# Move the header.ejs and footer.ejs files to the partials directory
mv views/header.ejs views/partials
mv views/footer.ejs views/partials
