<?php
	session_start();
?>

<div id="login_form_div">
	<h3>Log In</h3>
    <!-- <span class="lnr lnr-cross-circle exit pointer"></span> -->
    <div id="login_form">
        <span class="login_span">YOUR EMAIL</span><br>
        <input type="text" id="login_email_input"> <br>
        <span class="login_span">PASSWORD</span><br> 
        <input type="password" id="login_password_input"> <br>
        <span class="pointer" id="login_button">Log In</span>
    </div>
    <!-- <span class="pointer" onclick="display_modal('register_form_div')">Not registered yet? Register here!</span> -->
</div>