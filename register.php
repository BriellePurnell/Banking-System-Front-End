<?php
    require 'dbconfig/connect.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Registration Page</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body style="background-image:url(img/Desert.jpg);
                background-size:cover;">
            <div class="header">
                <img src="img/Group3header.png" height="100%" width="100%"/>
            </div>
            <div id="main-wrapper">
            <center>
                <h2>Registration Form<h2>
            </center>
            <form action="register.php" method="post">
                <label><b>UserID:</b></label><br>
                <input name="userid" type="text" placeholder="Please enter userid" class="inputvalues" required/><br>
                <label> Password: </label><br>
                <input name="password" type="password" class="inputvalues" placeholder="Your password" required><br>
                <label> Confirm Password: </label><br>
                <input name="cpassword" type="password" class="inputvalues" placeholder="Confirm password" required><br>
                <label><b>Full Name:</b></label><br>
                <input name="name" type="text" placeholder="Please enter your full name" class="inputvalues" required/><br>
                <label><b>Gender:</b></label>
                <input name="gender" type="radio"  value="M" checked required/> Male
                <input name="gender" type="radio"  value="F" required/> Female <br>
                <label><b>Phone # (XXX-XXX-XXXX):</b></label><br>
                <input name="mobile" type="text" placeholder="Please enter phone number" class="inputvalues" required/><br>
                <label><b>Email:</b></label><br>
                <input name="email" type="text" placeholder="Please enter email" class="inputvalues" required/><br>
                <input name="signup_btn" type="submit" id="signup_btn" value="Sign Up"><br>
                <a href="index.php"><input type="button" id="back_btn" value="Back">
            </form>

            <?php
                if(isset($_POST['signup_btn']))
                {
                    //echo '<script type="text/javascript"> alert("Sign up button clicked") </script>';

                    $userid=$_POST['userid'];
                    $password=$_POST['password'];
                    $cpassword=$_POST['cpassword'];

                    $name=$_POST['name'];
                    $gender=$_POST['gender'];

                    date_default_timezone_set("America/Los_Angeles");
                    $date = date("Y-m-d");

                    $mobile=$_POST['mobile'];
                    $email=$_POST['email'];

                    if($password == $cpassword)
                    {
                        $query="SELECT * FROM customertb WHERE userid='$userid'";
                        $query_run=mysqli_query($con,$query);
                        if(mysqli_num_rows($query_run)>0)
                        {
                            echo '<script type="text/javascript"> alert("User already exists... try another username") </script>';
                        }
                        else
                        {
                            $query="INSERT INTO customertb VALUES('','$userid','$password','$name','$gender','','$date','$mobile','$email')";
                            $query_run=mysqli_query($con,$query);
                            if($query_run)
                            {
                                echo '<script type="text/javascript"> alert("User registered... Go to login page to login") </script>';
                            }
                            else
                            {
                                echo '<script type="text/javascript"> alert("Error!") </script>';
                            }
                        }
                    }
                    else
                    {
                        echo '<script type="text/javascript"> alert("Password and confirm password does not match!") </script>';
                    }
                }
            ?>

            </div> 
    </body>
</html>

<style type='text/css'>
    #main-wrapper
    {
        width:500px;
        margin: 0 auto;
        background:#e74c3c;
        padding:5px;
        border-radius:10px;
        border: 2px solid #16a085;
    }

    #signup_btn{
        background-color: aqua;
        padding: 5px;
        color:white;
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-top: 10px;
        border-radius: 10px;
    }

    #back_btn{
        background-color:red;
        padding: 5px;
        color:white;
        width: 30%;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-top: 10px;
        border-radius: 10px;
    }

    .inputvalues
    {
        width:450px;
        margin: 0 auto;
        padding:5px;
        margin-top:2px;
    }
</style>