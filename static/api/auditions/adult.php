<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

// Class to handle form submissions for auditions
Class Auditions {

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
            'name' => $this->request('name'),
            'dob' => $this->request('dob'),
            'email' => $this->request('email'),
            'phonenumber' => $this->request('phonenumber'),
            'address' => $this->request('address'),
            'postcode' => $this->request('postcode'),
            'file1' => $this->request('file1'),
            'file2' => $this->request('file2'),
            'experience' => $this->request('experience'),
            'hear' => $this->request('hear'),
            'formTour' => $this->request('formTour')
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

            if ( ($field == 'file1' && !isset($errors['file1'])) || ($field == 'file2' && !isset($errors['file2'])) ) {
                
                $allowed_file_types = $field == 'file1' ? ['image/png', 'image/gif', 'image/jpg', 'image/jpeg', 'image/pjpeg'] : ['application/msword', 'application/pdf'];

                if ($fields[$field]['size'] > 2097152) {
                    $errors[$field] = 'Exceeds the maximum size of 2mb';
                } else if (!in_array($fields[$field]['type'], $allowed_file_types)) {
                    $errors[$field]  = "This file type is not allowed";
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
            'name',
            'dob',
            'email',
            'phonenumber',
            'address',
            'postcode',
            'file1',
            'file2',
            'hear'
        );

        return $required_fields;
    }

    private function sendSubmission() 
    {

        $message = "";

        // Set name for collection
        $nameforcollection = $this->fields['name'];
        if ($this->fields['nameforcollection'] !== "") {
            $nameforcollection = $this->fields['nameforcollection'];
        }

        $tour = $this->fields['formType'] === 'tour' ? 'Yes' : 'No (London)';

        if ($tour === 'tour') {
            $emailTo = "office@jillgreencasting.org";
        } else {
            $emailTo = "enquiries@pippaailioncasting.co.uk";
        }

        $mail = new PHPMailer(true);  
        try {
            $subject = 'The Lion King - Adult Auditions Submission';
            $message .= "Tour submission: " . $tour . "\n";
            $message .= "Name: ". $this->fields['name'] . "\n";
            $message .= "DOB: ". $this->fields['dob'] . "\n";
            $message .= "Height: ". $this->fields['height'] . "\n";
            $message .= "Parent email: ". $this->fields['email'] . "\n";
            $message .= "Parent Telephone number: ". $this->fields['phonenumber'] . "\n";
            $message .= "Address: ". $this->fields['address'] . "\n";
            $message .= "Postcode: ". $this->fields['postcode'] . "\n";
            $message .= "Previous performance experience or training: ". $this->fields['experience'] . "\n";
            $message .= "How did you hear about these auditions?: ". $this->fields['hear'] . "\n";

            $mail->setFrom($this->fields['email'], $this->fields['name']);
            $mail->addAddress($emailTo);
            $mail->addBcc('t.roberts@dewynters.com');
            $mail->addReplyTo($this->fields['email'], $this->fields['name']);

            // $mail->addBCC('bcc@example.com');

            // Add files
            $mail->addAttachment($this->fields['file1']['tmp_name'], $this->fields['file1']['name']); 
            $mail->addAttachment($this->fields['file2']['tmp_name'], $this->fields['file2']['name']); 

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

            if (isset($_FILES[$field])) {
                return $_FILES[$field];
            }

            return '';
        }
    }

}

$Auditions = new Auditions();