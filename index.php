<?php

if (isset($_GET['view'])) {
    $view = preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['view']);
    $viewFile = __DIR__ . '/pages/' . $view . '.php';
    if (file_exists($viewFile)) {
        include_once $viewFile;
        exit;
    }

    $legacyFile = __DIR__ . '/paginaaaa/' . $view . '.php';
    if (file_exists($legacyFile)) {
        include_once $legacyFile;
        exit;
    }
}

header('Location: /proyecto.html/pages/paginaprincipal.html');
exit;