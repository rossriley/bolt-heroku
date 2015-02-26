<?php
$configuration = new Bolt\Configuration\Composer(dirname(__DIR__));
$configuration->setPath("files","files");
$configuration->setPath("themebase","theme");
$configuration->getVerifier()->removeCheck('apache');
$configuration->verify();
$app = new Bolt\Application(array('resources'=>$configuration));

// $app['session.storage.handler'] = $app->share(function ($app) {
//     return new Your\MongoDBSessionHandler();
// });

$app->initialize();
$app->run();