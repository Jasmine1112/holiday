<?php
	session_start();
?>

<div id="login_form_div">
    <!-- <span class="lnr lnr-cross-circle exit pointer"></span> -->
    <div id="login_form">
        Email: <input type="text" id="login_email_input"> <br>
        Password: <input type="password" id="login_password_input"> <br>
        <span class="pointer" id="login_button">log in!</span>
    </div>
    <!-- <span class="pointer" onclick="display_modal('register_form_div')">Not registered yet? Register here!</span> -->
</div>