<?php
$configuration = new Bolt\Configuration\Composer(__DIR__);
$configuration->setPath("files","files");
$configuration->setPath("themebase","theme");
$configuration->getVerifier()->removeCheck('apache');
$configuration->verify();
$app = new Bolt\Application(array('resources'=>$configuration));

$app['session.storage.handler'] = null;

$app->initialize();
$app->run();