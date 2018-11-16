<?php

	session_start();
	require_once '../includes/config.php';

	$appoint_type = $_POST['appoint_type'];

	$logged_user_id = $_SESSION['logged_user_id'];

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}

	//check if username exists
	if ($appoint_type=="request_status") {
		$query = "SELECT *, $logged_user_id AS logged_user_id
				FROM schedules S, users U
				WHERE ((S.user_id_1 = $logged_user_id AND S.user_id_2 = U.user_id) OR (S.user_id_2 = $logged_user_id AND S.user_id_1 = U.user_id))
						AND status = 'pending';";
	}elseif ($appoint_type=="upcoming_schedules") {
		$query = "SELECT *, $logged_user_id AS logged_user_id
				FROM schedules S, users U
				WHERE ((S.user_id_1 = $logged_user_id AND S.user_id_2 = U.user_id) OR (S.user_id_2 = $logged_user_id AND S.user_id_1 = U.user_id))
						AND status = 'upcoming'
						AND `time` >= now();";
	}elseif ($appoint_type=="past_schedules") {
		$query = "SELECT *, $logged_user_id AS logged_user_id
				FROM schedules S, users U
				WHERE ((S.user_id_1 = $logged_user_id AND S.user_id_2 = U.user_id) OR (S.user_id_2 = $logged_user_id AND S.user_id_1 = U.user_id))
						AND `time` < now();";
	}
	

	$result = $mysqli->query($query);
	if (!$result) {
		print($mysqli->error);
	}

	$schedule_results = [];
	while ( $row = $result->fetch_assoc() ) {
		array_push($schedule_results, $row);
	}

	mysqli_close($mysqli);

	echo json_encode($schedule_results);




?>