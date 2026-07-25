<?php
header('Content-Type: application/json');

$movieDir = '/home/u306448955/domains/swapnilsahoo.com/public_html/wp-content/themes/swapnil-sahoo-theme/material assests/Watchlist/movies/';
$baseUrl = 'https://swapnilsahoo.com/wp-content/themes/swapnil-sahoo-theme/material%20assests/Watchlist/movies/';

$movies = array();

if (is_dir($movieDir)) {
    $files = scandir($movieDir);
    $movieFiles = array();
    
    foreach ($files as $file) {
        if ($file != "." && $file != "..") {
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
                $movieFiles[] = $file;
            }
        }
    }
    
    usort($movieFiles, function($a, $b) {
        $numA = (int)substr($a, 0, strpos($a, '_'));
        $numB = (int)substr($b, 0, strpos($b, '_'));
        return $numA - $numB;
    });
    
    foreach ($movieFiles as $file) {
        $title = preg_replace('/^\d+_/', '', pathinfo($file, PATHINFO_FILENAME));
        $movies[] = array(
            'title' => $title,
            'image' => $baseUrl . rawurlencode($file)
        );
    }
}

echo json_encode($movies);
?>