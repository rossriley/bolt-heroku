<?php
$configuration = new Bolt\Configuration\Composer(__DIR__);
$configuration->setPath("files","files");
$configuration->setPath("themebase","theme");
$configuration->getVerifier()->removeCheck('apache');
$configuration->verify();
$app = new Bolt\Application(array('resources'=>$configuration));

$mc = new Memcached('mc');
$mc->setOption(Memcached::OPT_BINARY_PROTOCOL, TRUE);
$mc->setSaslAuthData( getenv("MEMCACHIER_USERNAME"), getenv("MEMCACHIER_PASSWORD") );

$servers = explode(",", getenv("MEMCACHIER_SERVERS"));
foreach ($servers as $s) {
    $parts = explode(":", $s);
    $mc->addServer($parts[0], $parts[1]);
}


$app['session.storage.handler'] = new MemcachedSessionHandler($mc);
$app->initialize();
$app->run();