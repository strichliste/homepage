+++
date = "2018-12-21T00:00:08+02:00"
draft = false
title = "Install strichliste"
[menu]
  [menu.main]
    parent = "Install"
+++

Installing strichliste2 is easy

#### Prerequisites

For strichliste to run, php7.1 is required at least. You should have a webserver running which supports mod_php or php-fpm.

### Installing

1. Go to the Github project to download the [latest release](https://github.com/strichliste/server/releases).
2. Extract the package content to your target directory (e.g. `tar xvfz strichliste.tar.gz -C /var/www/strichliste.yourdomain.tld`)
3. Move the database in `var/` from `app.db.example` to `app.db` if you want to use the default sqlite setup

#### Using a different database (optional)

The [ORM](https://www.doctrine-project.org/projects/doctrine-dbal/en/2.9/reference/platforms.html) used in
Strichliste supports multiple database backends such as:

* MySQL / MariaDB
* Oracle
* Microsoft SQL Server
* PostgreSQL
* SQLite

If you want to use another Database, just adjust the `DATABASE_URL` variable in your `.env` file in your root
directory according to the [Doctrine ORM](https://www.doctrine-project.org/projects/doctrine-dbal/en/2.9/reference/configuration.html#connecting-using-a-url)
recommendations.

Afterwards just run:

```bash
php bin/console doctrine:database:create
php bin/console doctrine:schema:create
```

to create the database and schema 

#### Configuring NGINX

Config examples for nginx can be found here:

* https://github.com/strichliste/server/blob/master/examples/nginx_ssl.conf (with SSL)
* https://github.com/strichliste/server/blob/master/examples/nginx.conf (without SSL)

#### Configuring Apache

* TODO

#### Test your setup

To test if everything works, you can also run `php -S 0.0.0.0:8080` and navigate to `http://127.0.0.1:8080`

### Common Pitfalls

* Check your folder owner/group! Otherwise strichliste can't write to it's sqlite database 