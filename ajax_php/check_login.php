<?php
	
	session_start();
	require_once '../includes/config.php';
	//helper function: check if login
	function login($mysqli, $email, $password){
	
		$query = "SELECT * FROM users WHERE email = ?;";
		
		$stmt = $mysqli->stmt_init();
		if ($stmt->prepare($query)) {
			$stmt->bind_param('s', $email);
			if (!$stmt->execute()){
				print("<p>Error with login submission</p>");
			} else {
				$result = $stmt->get_result();
			}
		} else {
			print("<p>Error with login submission</p>");
		}
		
		if($result && $result->num_rows == 1) {
			$row = $result->fetch_assoc();
			$hash_pass = $row[ 'hash_password' ];
			if( password_verify($password, $hash_pass)){
				return [True,$row];
			} else {
				print("<p>Unsuccesful login submission1</p>");
			}
		}
		return [False,""];
	}

	$email_input = $_POST['email_input'];
	$password_input = $_POST['password_input'];
	// $email_input = $_GET['email_input'];
	// $password_input = $_GET['password_input'];
	//Get the config file

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}

	$login_result = login($mysqli, $email_input,$password_input);
	$valid_login = $login_result[0];
	// $username = $login_result[1]['username'];
	// $user_first_name = $login_result[1]['first_name'];
	// $user_last_name = $login_result[1]['last_name'];
	$user_type = $login_result[1]['user_type'];
	$user_id = $login_result[1]['user_id'];
	// $user_affiliation = $login_result[1]['affiliation'];
	if ($valid_login){
		// $_SESSION['logged_user'] = $username;
		// $_SESSION['logged_user_first_name'] = $user_first_name;
		// $_SESSION['logged_user_last_name'] = $user_last_name;
		$_SESSION['logged_user_id'] = $user_id;
		$_SESSION['logged_user_type'] = $user_type;
		// $_SESSION['logged_user_affiliation'] = $user_affiliation;

	} else {
		print("<p>Unsuccesful login submission2</p>");
	}



?>