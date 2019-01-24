<?php
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
            'age' => $this->request('age'),
            'height' => $this->request('height'),
            'email' => $this->request('email'),
            'phonenumber' => $this->request('phonenumber'),
            'address' => $this->request('address'),
            'postcode' => $this->request('postcode'),
            'experience' => $this->request('experience'),
            'hear' => $this->request('hear')
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
            'dob',
            'age',
            'height',
            'email',
            'phonenumber',
            'address',
            'postcode',
            'hear'
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

        $to = 's.richards@dewynters.com';
        $subject = 'The Lion King - Audotions Submission';

        $message = "Name: ". $this->fields['name'] . "\n";
        $message .= "DOB: ". $this->fields['dob'] . "\n";
        $message .= "Age: ". $this->fields['age'] . "\n";
        $message .= "Height: ". $this->fields['height'] . "\n";
        $message .= "Parent email: ". $this->fields['email'] . "\n";
        $message .= "Parent Telephone number: ". $this->fields['phonenumber'] . "\n";
        $message .= "Address: ". $this->fields['address'] . "\n";
        $message .= "Postcode: ". $this->fields['postcode'] . "\n";
        $message .= "Previous performance experience or training: ". $this->fields['experience'] . "\n";
        $message .= "How did you hear about these auditions?: ". $this->fields['hear'] . "\n";

        $headers = 'From: '. $this->fields['email'] . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

        // Send mail
        if (mail($to, $subject, $message, $headers)) {
            // Return success
            return array(
                'success' => true
            );
        } 

        // Mail failed
        return array(
            'success' => false
        ); 

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

$Auditions = new Auditions();