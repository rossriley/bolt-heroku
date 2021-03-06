<?php
$configuration = new Bolt\Configuration\Composer(__DIR__);
$configuration->setPath("files","public/files");
$configuration->setPath("themebase","public/theme");
$configuration->getVerifier()->removeCheck('apache');
$configuration->verify();
$app = new Bolt\Application(array('resources'=>$configuration));

$app->register(new Bolt\Demo\Provider\SessionProvider());
$app->initialize();

return $app;