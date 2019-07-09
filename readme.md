# Deploy Bolt on Heroku

## Instructions

- Create Bolt app using [`composer create-project`](https://docs.bolt.cm/3.6/installation/composer-create-project/install-composer)
- Create your project on Heroku, and add Heroku PostGres extension. Take note of the `DATABASE_URL`.
- [Install](https://getcomposer.org/doc/03-cli.md#require) `heroku/heroku-buildpack-php` to `require-dev`, or add `"heroku/heroku-buildpack-php": "*"` to `require-dev` section, then `composer update`
- Edit [/app/config/config.yml](/app/config/config.yml) using `DATABASE_URL`. You might have to hard-code the DATASBE_URL components.
- Create [Procfile](/Procfile) containing `web: vendor/bin/heroku-php-apache2 public/`

## Deploying with Nginx

Using Nginx is also possible, by copying [/nginx.conf](/nginx.conf) to your project, and set Procfile to `web: vendor/bin/heroku-php-nginx -C nginx.conf public/`

## Adding extensions to Bolt CMS

It appears that, when adding extensions, it does not load properly on Heroku, unless you add

```
        "compile": [
            "cd extensions && composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction"
        ]
```

to script section of `composer.json`.
