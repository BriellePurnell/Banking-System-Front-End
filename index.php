<?php
    session_start();
    require 'dbconfig/connect.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Login Page</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body style="background-image:url(img/Desert.jpg);
                background-size:cover;">
            <div class="header">
                <img src="img/Group3header.png" width="100%"/>
            </div>
            <center>
            <div class="navbar">
                
                <ul>
                <li><a href="index.php">Home </a></li>
                <li><a href="features.php">Features </a></li>
                <li id="last"><a href="contact.php">Contact Us</a></li>
                </ul>
            </div>
            </center>

            <div id="main-wrapper">
            <center>
            <h2>Login</h2>
            </center>
            <form class="loginform" action="index.php" method="post">
                <label><b>UserID:</b></label><br>
                <input name="userid" type="text" placeholder="Please enter userid" class="inputvalues"/><br>
                <label><b>Password:</b></label><br>
                <input name="password" type="password" placeholder="Please enter password" class="inputvalues"/><br>
                <center>
                <input name="login" type="submit" value="Sign in" id="login_btn"/><br>
                <br>
                <label><b>First Time User?</b></label><br>
                <!--Both of the register buttons below both work-->
                <!--One way to register-->
                <a href="register.php"><input type="button" value="Register" id="register_btn"/></a>                
                </center>
                <!--onchange="register(this)"-->
                <!--Another way to register
                <button onclick="myFunction()" id="register_btn2">Create new account(2)
                    <script>
                        function myFunction(){
                            window.open("Register.html");
                        }
                    </script>
                </button>-->
            </form>

            <?php
            if(isset($_POST['login']))
            {
                echo '<script type="text/javascript"> alert("Invalid credentials") </script>';
                $userid=$_POST['userid'];
                $password=$_POST['password'];

                $query="SELECT * FROM customertb WHERE userid='$userid' AND password='$password'";

                $query_run = mysqli_query($con, $query);
                if(mysqli_num_rows($query_run)>0)
                {
                    // valid
                    $_SESSION['userid']= $userid;

                    header('location:useraccount.php');
                }
                else
                {
                    // invalid
                    echo '<script type="text/javascript"> alert("Invalid credentials") </script>';
                }
            }
             ?>

            </div>
            <?php include 'footer.php' ?>
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

    #login_btn
    {
        background-color:#8e44ad;
        width:300px;
        margin: 0 auto;
        padding:5px;
        color:white;
        text-align:center;
        font-size:18px;
        margin-top:10px;
        border-radius:15px;
    }

    #register_btn
    {
        background-color: #16a085;
        padding:5px;
        text-align:center;
        font-size:18px;
        margin-bottom:20px;
        border-radius:10px;
    }

    .loginform
    {
        width: 430px;
        margin: 0 auto;
    }

    .inputvalues
    {
        width:450px;
        margin: 0 auto;
        padding:5px;
    }
</style>