<?php

if(isset($_GET['view'])){
    include_once 'paginaaaa/'.$_GET['view'].'.php';
    die();
}
header("Location: paginaaaa/paginaprincipal.html");