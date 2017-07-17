<?php

$chunkSize = 1048576;

// Read input
$size = $_GET['size'] ?? 8;

// Disable Compression
@ini_set('zlib.output_compression', 'Off');
@ini_set('output_buffering', 'Off');
@ini_set('output_handler', '');

// Headers
header('HTTP/1.1 200 OK');

// Force download as binary
header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename=random.dat');
header('Content-Transfer-Encoding: binary');
header('Content-Length: ' . $size * $chunkSize);

// Disable cache
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');

// Generate 1M chunks of random data
$data = openssl_random_pseudo_bytes($chunkSize);

// Assemble enough chunks to reach required size
for ($i = 0; $i < intval($size); $i++) {
    echo $data;
    flush();
}