<?php

	session_start();
	require_once '../includes/config.php';

	$avail_hour_id = $_GET['avail_hour_id'];

	$logged_user_id = $_SESSION['logged_user_id'];

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}

	//check if username exists
	$query = "DELETE FROM available_hours
				WHERE user_id = '$logged_user_id' AND available_hours_id = '$avail_hour_id';";
	

	$stmt = $mysqli->stmt_init();

	if ($stmt->prepare($query)) {
		if (!$stmt->execute()){
			print("<p>Error with resgister submission</p>");
		} else {
			$info_result = $stmt->get_result();
		}
	} else {
		print("<p>Error with register submission1</p>");
	}
	mysqli_stmt_close($email_stmt);
	
	mysqli_close($mysqli);





?>