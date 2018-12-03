<?php

	session_start();
	require_once '../includes/config.php';

	$logged_user_id = $_SESSION['logged_user_id'];

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}



	$query = "UPDATE schedules
			SET seen_by_user1 = 'true'
			WHERE user_id_1 = $logged_user_id;";
	

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

	$query = "UPDATE schedules
			SET seen_by_user2 = 'true'
			WHERE user_id_2 = $logged_user_id;";
	

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


	
	mysqli_stmt_close($stmt);




?>