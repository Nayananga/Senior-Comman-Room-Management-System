<?php

/**
 * User Class for account creation and login pupose
 */
class User
{

    private $con;

    function __construct()
    {
        include_once("../database/db.php");
        $db = new Database();
        $this->con = $db->connect();
    }

    //User is already registered or not
    private function usernameExists($username)
    {
        $pre_stmt = $this->con->prepare("SELECT id FROM user WHERE username = ? ");
        $pre_stmt->bind_param("s", $username);
        $pre_stmt->execute() or die($this->con->error);
        $result = $pre_stmt->get_result();
        if ($result->num_rows > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    private function emailExists($email)
    {
        $pre_stmt = $this->con->prepare("SELECT id FROM user WHERE email = ? ");
        $pre_stmt->bind_param("s", $email);
        $pre_stmt->execute() or die($this->con->error);
        $result = $pre_stmt->get_result();
        if ($result->num_rows > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    private function employeeidExists($employeeid)
    {
        $pre_stmt = $this->con->prepare("SELECT id FROM user WHERE employeeid = ? ");
        $pre_stmt->bind_param("s", $employeeid);
        $pre_stmt->execute() or die($this->con->error);
        $result = $pre_stmt->get_result();
        if ($result->num_rows > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    public function createUserAccount($title, $firstname, $lastname, $employeeid, $email, $contactno, $password, $usertype, $status)
    {
        //To protect your application from sql attack you can user
        //prepares statment
        $username = $title . '.' . $firstname . ' ' . $lastname;
        if ($this->usernameExists($username)) {
            return "USERNAME_ALREADY_EXISTS";
        } else if ($this->emailExists($email)) {
            return "EMAIL_ALREADY_EXISTS";
        } else if ($this->employeeidExists($employeeid)) {
            return "EMPLOYEEID_ALREADY_EXISTS";
        } else {
            $pass_hash = password_hash($password, PASSWORD_BCRYPT, ["cost" => 8]);
            $reg_date = date("Y-m-d");
            $last_log = date("Y-m-d h:m:s");
            $notes = "";
            $pre_stmt = $this->con->prepare("INSERT INTO `user`(`username`,`employeeid`, `email`, `contactno`,`password`, `usertype`, `register_date`, `last_login`, `status`,`notes`)
			 VALUES (?,?,?,?,?,?,?,?,?,?)");
            $pre_stmt->bind_param("ssssssssss", $username, $employeeid, $email, $contactno, $pass_hash, $usertype, $reg_date, $last_log, $status, $notes);
            $result = $pre_stmt->execute() or die($this->con->error);
            if ($result) {
                return $this->con->insert_id;
            } else {
                return "SOME_ERROR";
            }
        }

    }

    public function updateUserAccount($id, $username, $employeeid, $email, $contactno, $password, $usertype, $notes, $status, $date)
    {
        //To protect your application from sql attack you can user
        //prepares statment
        if ($this->usernameExists($username)) {
            return "USERNAME_ALREADY_EXISTS";
        } else if ($this->emailExists($email)) {
            return "EMAIL_ALREADY_EXISTS";
        } else if ($this->employeeidExists($employeeid)) {
            return "EMPLOYEEID_ALREADY_EXISTS";
        } else {
            $pass_hash = password_hash($password, PASSWORD_BCRYPT, ["cost" => 8]);
            $sql = "UPDATE user SET username=?, employeeid=?, email=?, contactno=?, password=?, usertype=?, register_date=?, status=?, notes=? WHERE user.id=?";

            $stmt = $this->con->prepare($sql);

            // This assumes the date and account_id parameters are integers `d` and the rest are strings `s`
            // So that's 5 consecutive string params and then 4 integer params

            $stmt->bind_param('sssssdddd', $username, $employeeid, $email, $contactno, $pass_hash, $usertype, $date, $status, $notes, $id);
            $result = $stmt->execute() or die($this->con->error);
            if ($result) {
                return "UPDATED";
            } else {
                return "SOME_ERROR";
            }
        }

    }

    public function userLogin($email, $password)
    {
        $pre_stmt = $this->con->prepare("SELECT id,username,password,usertype,last_login FROM user WHERE email = ?");
        $pre_stmt->bind_param("s", $email);
        $pre_stmt->execute() or die($this->con->error);
        $result = $pre_stmt->get_result();

        if ($result->num_rows < 1) {
            return "NOT_REGISTERD";
        } else {
            $row = $result->fetch_assoc();
            if (password_verify($password, $row["password"])) {
                $_SESSION["userid"] = $row["id"];
                $_SESSION["username"] = $row["username"];
                $_SESSION["last_login"] = $row["last_login"];
                $_SESSION["usertype"] = $row["usertype"];

                //Here we are updating user last login time when he is performing login
                $last_login = date("Y-m-d h:m:s");
                $pre_stmt = $this->con->prepare("UPDATE user SET last_login = ? WHERE email = ?");
                $pre_stmt->bind_param("ss", $last_login, $email);
                $result = $pre_stmt->execute() or die($this->con->error);
                if ($result) {
                    return 1;
                } else {
                    return 0;
                }

            } else {
                return "PASSWORD_NOT_MATCHED";
            }
        }
    }

}

//$user = new User();
//echo $user->createUserAccount("Test","rizwan1@gmail.com","1234567890","Admin");

//echo $user->userLogin("rizwan1@gmail.com","1234567890");

//echo $_SESSION["username"];
