<?php
$configuration = new Bolt\Configuration\Composer(__DIR__);
$configuration->setPath("files","files");
$configuration->setPath("themebase","theme");
$configuration->getVerifier()->removeCheck('apache');
$configuration->verify();
$app = new Bolt\Application(array('resources'=>$configuration));

$app['session.storage.handler'] = $app->share(function ($app) {
    
    // parse config
    $servers = explode(",", getenv("MEMCACHIER_SERVERS"));
    for ($i = 0; $i < count($servers); $i++) {
      $servers[$i] = explode(":", $servers[$i]);
    }
    
    $m = new Memcached("memcached_pool");
    $m->setOption(Memcached::OPT_BINARY_PROTOCOL, TRUE);
    $m->setOption(Memcached::OPT_CONNECT_TIMEOUT, 2000);
    $m->setOption(Memcached::OPT_POLL_TIMEOUT, 2000);
    $m->setOption(Memcached::OPT_RETRY_TIMEOUT, 2);
    $m->setSaslAuthData(getenv("MEMCACHIER_USERNAME"), getenv("MEMCACHIER_PASSWORD"));

    if (!$m->getServerList()) {
      // We use a consistent connection to memcached, so only add in the servers
      // first time through otherwise we end up duplicating our connections to the
      // server.
      $m->addServers($servers);
    }
    
    return new Symfony\Component\HttpFoundation\Session\Storage\Handler\MemcachedSessionHandler($m);
});

$app->initialize();
$app->run();