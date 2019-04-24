<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

// Class to handle form submissions for houseseats
Class Education_Workshops {

    private $fields;

    public function __construct()
    {
        // Set fields
        $this->fields = $this->getFields();

        // Check for errors
        $response = $this->validateFields();

        if ($response['errors'] == false) {

            // No errors so send submission to Disney
            $response = $this->sendSubmission();
        }

        $response = json_encode($response);
        echo $response;
    }

    private function getFields()
    {
        $fields = array(
            'nameofschool' => $this->request('nameofschool'),
            'location' => $this->request('location'),
            'postcode' => $this->request('postcode'),
            'fullname' => $this->request('fullname'),
            'positionatschool' => $this->request('positionatschool'),
            'email' => $this->request('email'),
            'phonenumber' => $this->request('phonenumber'),
            'alternativecontactname' => $this->request('alternativecontactname'),
            'alternativecontactnumber' => $this->request('alternativecontactnumber'),
            'numberofstudents' => $this->request('numberofstudents'),
            'yeargroup' => $this->request('yeargroup'),
            'suitablespace' => $this->request('suitablespace'),
            'suitablespacedescription' => $this->request('suitablespacedescription'),
            'moreinformation' => $this->request('moreinformation'),
            'headteacherreviewed' => $this->request('headteacherreviewed')
        );
        return $fields;
    }

    private function validateFields()
    {
        $errors = FALSE;
        $fields = $this->fields;
        $required_fields = $this->requiredFields();

        // Validate required fields
        foreach ($required_fields as $field) {

            $value = $fields[$field];

            // Check fields are not empty
            if ($value === '') {
                $errors[$field] = true;
            }

            // Check if valid email
            if ($field == 'email' && !isset($errors['email'])) {
                if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
                    $errors['email'] = true;
                }
            }
        }

        // Returns false if no errors
        return array(
            'errors' => $errors
        );
    }

    private function requiredFields()
    {
        $required_fields = array(
            'nameofschool',
            'location',
            'postcode',
            'fullname',
            'positionatschool',
            'email',
            'phonenumber',
            'alternativecontactname',
            'alternativecontactnumber',
            'numberofstudents',
            'yeargroup',
            'suitablespacedescription',
            'moreinformation',
            'headteacherreviewed'
        );

        return $required_fields;
    }

    private function sendSubmission() 
    {

        // Set name for collection
        $nameforcollection = $this->fields['name'];
        if ($this->fields['nameforcollection'] !== "") {
            $nameforcollection = $this->fields['nameforcollection'];
        }

        $mail = new PHPMailer(true);  
        try {
            $emailTo = 'theatreeducationuk@disney.co.uk';

            $subject = 'The Lion King - Education Workshops Submission';
            $message = "Name of school: ". $this->fields['nameofschool'] . "\n";
            $message .= "Location: ". $this->fields['location'] . "\n";
            $message .= "Postcode ". $this->fields['postcode'] . "\n";
            $message .= "Fullname: ". $this->fields['fullname'] . "\n";
            $message .= "Phonenumber: ". $this->fields['phonenumber'] . "\n";
            $message .= "Alternative contact name: ". $this->fields['alternativecontactname'] . "\n";
            $message .= "Alternative contact number: ". $this->fields['alternativecontactnumber'] . "\n";
            $message .= "Number of students: ". $this->fields['numberofstudents'] . "\n";
            $message .= "Year group: ". $this->fields['yeargroup'] . "\n";
            $message .= "Suitable space: ". $this->fields['suitablespace'] . "\n";
            $message .= "Suitable space description: ". $this->fields['suitablespacedescription'] . "\n";
            $message .= "More information: ". $this->fields['moreinformation'] . "\n";
            $message .= "Headteacher reviewed: ". $this->fields['headteacherreviewed'] . "\n";

            $mail->setFrom($this->fields['email'], $this->fields['fullname']);
            $mail->addAddress($emailTo);
            $mail->addBcc('t.roberts@dewynters.com');
            $mail->addReplyTo($this->fields['email'], $this->fields['fullname']);

            // Set body
            $mail->Body = $message;
            $mail->Subject = $subject;
            $mail->send();

            // Return success
            return array(
                'success' => true
            );
        } catch (Exception $e) {
            // Mail failed
            return array(
                'success' => false,
                'errors' =>  $mail->ErrorInfo
            ); 
        }
    }

    private function request($field) {
        if (isset($_POST[$field])) {
            if (is_array($_POST[$field])) {
                return isset($_POST[$field]) ? $_POST[$field] : '';
            } else {
                return isset($_POST[$field]) ? trim($_POST[$field]) : '';
            }
        } else {
            return '';
        }
    }

}

$Education_Workshops = new Education_Workshops();