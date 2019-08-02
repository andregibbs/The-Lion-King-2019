<?php
// Which form posted?
if (isset($_POST)) {
    var_dump($_POST['type']);
    if ($_POST['formType'] === 'adult') {
        require './adult.php';
    } else {
        require './children.php';
    }
} else {
    return false;
}