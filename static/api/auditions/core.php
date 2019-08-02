<?php
// Which form posted?
if (isset($_POST)) {
    if ($_POST['type'] === 'adult') {
        require './adult.php';
    } else {
        require './children.php';
    }
} else {
    return false;
}