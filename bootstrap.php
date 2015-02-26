<?php
$configuration = new Bolt\Configuration\Composer(__DIR__);
$configuration->setPath("files","files");
$configuration->setPath("themebase","theme");
$configuration->getVerifier()->removeCheck('apache');
$configuration->verify();
$app = new Bolt\Application(array('resources'=>$configuration));

// $app['session.storage.handler'] = $app->share(function ($app) {
//    $memcache = new \Memcached();
//    $memcache->addServer();
//     return new Symfony\Component\HttpFoundation\Session\Storage\Handler\MemcachedSessionHandler();
// });

$app->initialize();
$app->run();