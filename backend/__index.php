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
           <form action='./reservations.php' method='POST'>
                reservations<br>
                RESERVE, CANCEL, CANCEL_ALL, PAY, PICK, SELECT, SELECT_ALL, SELECT_USER <br>
                Request type <input type='text' name='request' style="width: 90%"><br>
                JSON data <input type='text' name='data' style="width: 90%"><br>
                <input type='submit' name='run' value='Run'>
            </form>
           <form action='./projections.php' method='POST'>
                projections<br>
                INSERT, UPDATE, DELETE, SELECT, SELECT_ALL<br>
                Request type <input type='text' name='request' style="width: 90%"><br>
                JSON data <input type='text' name='data' style="width: 90%"><br>
                <input type='submit' name='run' value='Run'>
            </form>
           <br><br><br>
           
            <form action='./employees.php' method='POST'>
                employees<br>
                Request type <input type='text' name='request' style="width: 90%"><br>
                JSON data <input type='text' name='data' style="width: 90%"><br>
                <input type='submit' name='run' value='Run'>
            </form>
       </fieldset>
    </body>
</html>
