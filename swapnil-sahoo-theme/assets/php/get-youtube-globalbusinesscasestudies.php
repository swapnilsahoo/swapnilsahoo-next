<?php
header('Content-Type: application/json');

$youtubeVideos = array(
    'https://youtu.be/h5IteCKxNj4?si=5F2qmxGIKA6P33f_',
    'https://youtu.be/1tRTWwZ5DIc',
    'https://youtu.be/elfCDnMx3Ug?si=Ujwi0EBwqX8Q9pAe',
    'https://youtu.be/JZqa2wQdORo?si=9aKG9SlXL2YjuBNs',
    'https://youtu.be/EbafKwhPt0c',
    'https://youtu.be/LNmhEp0kj5Q',
    'https://youtu.be/nxhblFFBXYE',
    'https://youtu.be/aQYcwmRxnbE',
    'https://youtu.be/W4iHnvaNj_8',
    'https://youtu.be/-KK8SuvwoRQ',
    'https://youtu.be/a32RLgqNfGs',
    'https://youtu.be/-6jjhk-ZRQo',
    'https://youtu.be/o-gGiyY9s9w',
    'https://youtu.be/X2f9IiflXaQ',
    'https://youtu.be/nlRh9lxZE_o',
    'https://youtu.be/ULhoofZmZmg',
    'https://youtu.be/ON-vFJbq1Vc',
    'https://youtu.be/6Yh1f2nat9o',
    'https://youtu.be/hbhOWiiSoOQ',
    'https://youtu.be/0wVAPXswE6E',
    'https://youtu.be/VV9ofSn3LzE',
    'https://youtu.be/6DEOW9ZQ2BI',
    'https://youtu.be/M9L72ssQAmU',
    'https://youtu.be/wwWYtEQZvoU',
    'https://youtu.be/G_LdttkVQmI',
    'https://youtu.be/FoQR9rLpRy8',
    'https://youtu.be/wVXAFlueS9Y'
);


$videos = array();

foreach ($youtubeVideos as $url) {
    if (preg_match('/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/', $url, $matches)) {
        $videoId = $matches[1];
        
        $apiUrl = "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=" . $videoId . "&format=json";
        $response = @file_get_contents($apiUrl);
        
        if ($response) {
            $data = json_decode($response, true);
            if ($data && isset($data['title'])) {
                $videos[] = array(
                    'title' => $data['title'],
                    'image' => "https://img.youtube.com/vi/{$videoId}/maxresdefault.jpg",
                    'url' => "https://www.youtube.com/watch?v=" . $videoId
                );
            }
        }
    }
}

echo json_encode($videos);
?>