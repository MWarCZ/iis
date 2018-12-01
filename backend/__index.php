<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>TEST</title>
    </head>
    <body>
       <fieldset>
           <form action='./films.php' method='POST'>
               SELECT_PROJECTION<br>
               SELECT_RESERVATION<br>
                Request type <input type='text' name='request' style="width: 90%"><br>
                JSON data <input type='text' name='data' style="width: 90%"><br>
                <input type='submit' name='run' value='Run'>
            </form>
           <form action='./employees.php' method='POST'>
                EMPLOYEES<br>
                Request type <input type='text' name='request' style="width: 90%"><br>
                JSON data <input type='text' name='data' style="width: 90%"><br>
                <input type='submit' name='run' value='Run'>
            </form>
           <form action='./users.php' method='POST'>
                USERS<br>
                Request type <input type='text' name='request' style="width: 90%"><br>
                JSON data <input type='text' name='data' style="width: 90%"><br>
                <input type='submit' name='run' value='Run'>
            </form>
       </fieldset>
    </body>
</html>
