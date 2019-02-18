<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require '../vendor/autoload.php';

// Class to handle form submissions for houseseats
Class House_Seats {

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
            'connection_to_production' => $this->request('connection_to_production'),
            'phonenumber' => $this->request('phonenumber'),
            'email' => $this->request('email'),
            'nameforcollection' => $this->request('nameforcollection'),
            'tickets_amount' => $this->request('tickets_amount'),
            'date' => $this->request('date'),
            'notes' => $this->request('notes')
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
            'name',
            'connection_to_production',
            'phonenumber',
            'email',
            'tickets_amount',
            'date'
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
            $emailTo = 'lionking.houseseats.UK@disney.com';
            $subject = 'The Lion King - House Seats Submission';
            $message = "Name: ". $this->fields['name'] . "\n";
            $message .= "Connection to the production: ". $this->fields['connection_to_production'] . "\n";
            $message .= "Contact telephone number: ". $this->fields['phonenumber'] . "\n";
            $message .= "Email address: ". $this->fields['email'] . "\n";
            $message .= "Name for ticket collection: ". $nameforcollection . "\n";
            $message .= "Number of tickets required: ". $this->fields['tickets_amount'] . "\n";
            $message .= "Date/Time: ". $this->fields['date'] . "\n";
            $message .= "Additional notes: ". $this->fields['notes'] . "\n";

            $mail->setFrom($this->fields['email'], $this->fields['name']);
            $mail->addAddress($emailTo);
            $mail->addBcc('t.roberts@dewynters.com');
            $mail->addReplyTo($this->fields['email'], $this->fields['name']);

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

$House_Seats = new House_Seats();