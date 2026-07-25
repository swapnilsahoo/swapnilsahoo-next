<?php
header('Content-Type: application/json');

$seriesDir = __DIR__ . '/assets/images/Watchlist/Series/';
$baseUrl = 'https://swapnilsahoo.com/wp-content/themes/swapnil-sahoo-theme/material%20assests/Watchlist/Series/';

$series = array();

if (is_dir($seriesDir)) {
    $files = scandir($seriesDir);
    $seriesFiles = array();
    
    foreach ($files as $file) {
        if ($file != "." && $file != "..") {
            $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            if (in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
                $seriesFiles[] = $file;
            }
        }
    }
    
    // Sort by the number at the beginning
    usort($seriesFiles, function($a, $b) {
        $numA = (int)substr($a, 0, strpos($a, '_'));
        $numB = (int)substr($b, 0, strpos($b, '_'));
        return $numA - $numB;
    });
    
    foreach ($seriesFiles as $file) {
        $title = preg_replace('/^\d+_/', '', pathinfo($file, PATHINFO_FILENAME));
        $series[] = array(
            'title' => $title,
            'image' => $baseUrl . $file
        );
    }
}

echo json_encode($series);
?>