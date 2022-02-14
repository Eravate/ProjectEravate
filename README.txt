Read the documentation before proceding
But if you can't be bothered, here's a TL;DR.

"Most PHP files within the PHP folder need to have a connection to the Database, 
the one included within the app is an example localhost connection, 
remember to adjust every PHP file with the correct Database information.

For database, copy the code included in eravatecreation.sql and run that query 
inside your database. By default, it comes with basic data that you can use, 
though, you are not forced to, it is not essential (It is important to note you 
need at least one star system to be able to access the main page).

Additionally, the files forgotPassword.php & process.php come with a basic 
implementation of PHPMailer, make sure to adjust it to your own needs as well, 
especially the mail Username and mail Password variables, 
which are set to “SECRET” by default."