<?php
namespace Bolt\Demo\Provider;

use Silex\Application;
use Silex\ServiceProviderInterface;
use Symfony\Component\HttpFoundation\Session\Storage\Handler\MemcachedSessionHandler;

class SessionProvider implements ServiceProviderInterface
{
    private $app;

    public function register(Application $app)
    {
        $this->app = $app;
        
        $app['session.storage.handler'] = $app->share(function ($app) {
            $mc = new Memcached();
            $mc->setOption(Memcached::OPT_BINARY_PROTOCOL, TRUE);
            $mc = new Memcached('mc');

            if (!count($mc->getServerList())) {
                $mc->setOption(Memcached::OPT_LIBKETAMA_COMPATIBLE, true);
                $mc->setSaslAuthData( getenv("MEMCACHIER_USERNAME"), getenv("MEMCACHIER_PASSWORD") );    
                $servers = explode(",", getenv("MEMCACHIER_SERVERS"));

                foreach ($servers as $s) {
                    $parts = explode(":", $s);
                    $mc->addServer($parts[0], $parts[1]);
                }    
            }
            return new MemcachedSessionHandler($mc);
        });
        

    }
    
    public function boot(Application $app)
    {
        
    }
    
}