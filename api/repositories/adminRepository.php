<?php

require("../handlers/databaseHandler.php");
require("../classes/productClass.php");

function adminUpdate($product) {
    
    $db = new Database();
    return $db->runQuery("UPDATE products SET unitInStock = :quantity WHERE ID = :prodID", $product);

}

function adminDelete($product) {
    $db = new Database();
    return $db->runQuery("DELETE FROM products WHERE ID = :ID", $product);
}

function setCategory($input) {

    $db = new Database();
    return $db->runQuery("INSERT INTO productcat (productID, categoryID) VALUES (:productID, :categoryID);", $input);
}

function addProduct($product) {
    
    $db = new Database();
    return $db->runQuery("INSERT INTO products (prodName, prodDescription, categoryID, unitPrice, unitWeight, unitInStock, prodPicture) VALUES (:name, :description, :category, :price, :weight, :qty, :img);", $product);

}

function getListPending() {

    $db = new Database();
    return $db->fetchQuery("SELECT id, name, role FROM user WHERE pendingAdmin = 1;");

}

function getListAdmin() {

    $db = new Database();
    return $db->fetchQuery("SELECT id, name, role FROM user WHERE role = 'admin';");

}

function approveAdmin($id) {
    
    $db = new Database();
    $db->runQuery("UPDATE user SET role = 'admin' WHERE id = :id;", $id);
    return $db->runQuery("UPDATE user SET pendingAdmin = 0 WHERE id = :id;", $id);

}

function denyAdmin($id) {
    
    $db = new Database();
    $db->runQuery("UPDATE user SET role = 'user' WHERE id = :id;", $id);
    return $db->runQuery("UPDATE user SET pendingAdmin = 0 WHERE id = :id;", $id);

}

function getListNewsletter() {

    $db = new Database();
    return $db->fetchQuery("SELECT * FROM newsletter_users;");

}

function submitNewsletter($newsletter) {
    
    $db = new Database();
    return $db->runQuery("INSERT INTO newsletter (ID, titel, text, date) VALUES (NULL, :title, :text, :date );", $newsletter);

}

function getListOrders($status) {

    $status = $status;

    $db= new Database;
    $response = $db->fetchQuery("SELECT * FROM orders WHERE status = $status");
    return $response;

}

function approveOrder($id) {

    $db = new Database();
    return $db->runQuery("UPDATE orders SET status = 2 WHERE ID = :id;", $id);

}
function applyAdmin($id) {
    
    $db = new Database();
    return $db->runQuery("UPDATE user SET pendingAdmin = 1 WHERE id = :id;", $id);
 
}

?>

