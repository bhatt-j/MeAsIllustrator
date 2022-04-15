<?php
	$name= $_POST['name'];
	$mobile = $_POST['mobile'];
	$email = $_email['email'];
	$password = $_password['password'];
	// Database connection
	$conn = new mysqli('localhost','root','','measillustrator');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into user(Name,MobileNo,Email,Password) values(?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("sssssi",$name,$mobile,$email,$password);
		$execval = $stmt->execute();
		echo $execval;
		echo "Registration successfully...";
		$stmt->close();
		$conn->close();
	}
?>
