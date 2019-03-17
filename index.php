<!DOCTYPE html>
<html>
    <head>
        <title>Login Page</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body style="background-color: #3498db">
        <div id="main-wrapper">
            <h2>Login</h2>
            <form class="loginform">
                <label><b>Username:</b></label><br>
                <input type="text" placeholder="Please enter username" class="inputvalues"/><br>
                <label><b>Password:</b></label><br>
                <input type="password" placeholder="Please enter password" class="inputvalues"/><br>
                <input type="button" value="Sign in" id="login_btn"/><br>
                <br>
                <label>Don't have an account?</label><br>
                <!--Both of the register buttons below both work-->
                <!--One way to register-->
                <a href="Register.php"></a><input type="button" value="Create new account" id="register_btn" onchange="register(this)"/>

                <!--Another way to register
                <button onclick="myFunction()" id="register_btn2">Create new account(2)
                    <script>
                        function myFunction(){
                            window.open("Register.html");
                        }
                    </script>
                </button>-->
            </form>
        </div>
    </body>
</html>