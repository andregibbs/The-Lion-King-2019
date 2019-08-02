<?php
// Which form posted?
if (isset($_POST)) {
<<<<<<< HEAD
    if ($_POST['formType'] === 'adult') {
=======
    if ($_POST['type'] === 'adult') {
>>>>>>> c5c494c0b2e832fe5762c5d3d0304a3479c580ef
        require './adult.php';
    } else {
        require './children.php';
    }
} else {
    return false;
}