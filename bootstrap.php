<?php
$configuration = new Bolt\Configuration\Composer(__DIR__);
$configuration->setPath("files","files");
$configuration->setPath("themebase","theme");
$configuration->getVerifier()->removeCheck('apache');
$configuration->verify();
$app = new Bolt\Application(array('resources'=>$configuration));

$app->initialize();
$app['session.storage.handler'] = null;
print_r($app['session']); exit;
$app->run();