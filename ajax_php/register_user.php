<?php
	require_once '../includes/config.php';

	// $username_input = $_POST['username_input'];
	$first_name_input = $_POST['first_name_input'];
	$last_name_input = $_POST['last_name_input'];
	$email_input = $_POST['email_input'];
	$password_input = $_POST['password_input'];
	$type_input = $_POST['type_input'];

	// $username_input = $_GET['username_input'];
	// $email_input = $_GET['email_input'];
	// $password_input = $_GET['password_input'];
	// $type_input = $_GET['type_input'];

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}

	//check if username exists
	$email_query = "SELECT * FROM users WHERE email = ?;";
		
	$email_stmt = $mysqli->stmt_init();

	if ($email_stmt->prepare($email_query)) {
		$email_stmt->bind_param('s', $username);
		if (!$email_stmt->execute()){
			print("<p>Error with resgister submission</p>");
		} else {
			$email_result = $email_stmt->get_result();
		}
	} else {
		print("<p>Error with register submission1</p>");
	}
	mysqli_stmt_close($email_stmt);
	
	if($email_result && $email_result->num_rows == 0) {
		// print("hi");
		//hash the password
		$hash_password = password_hash($password_input, PASSWORD_DEFAULT);
		$register_query = "INSERT INTO users(username,hash_password,user_type,email,first_name,last_name) VALUES ('$first_name_input $last_name_input','$hash_password','$type_input','$email_input','$first_name_input','$last_name_input');";
			
		$register_stmt = $mysqli->stmt_init();

		if ($register_stmt->prepare($register_query)) {
			if (!$register_stmt->execute()){
				print("<p>Error with resgister submission</p>");
			} else {
				$register_result = $register_stmt->get_result();
			}
		} else {
			print("<p>Error with register submission1</p>");
		}
		// if ($register_stmt->prepare($register_query)) {
		// 	$register_stmt->bind_param('ssss',$username,$hash_pass,$type_input,$email_input);
		// 	if (!$register_stmt->execute()){
		// 		print("<p>Error with resgister submission1</p>");
		// 	} else {
		// 		$register_result = $register_stmt->get_result();
		// 	}
		// } else {
		// 	print("<p>Error with register submission2</p>");
		// }

	}else{	
		print("<p>Email already used!</p>");
	}


	mysqli_close($mysqli);




?>