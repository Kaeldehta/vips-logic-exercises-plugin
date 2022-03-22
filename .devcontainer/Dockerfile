FROM php:7.4.28-apache-bullseye

WORKDIR /usr/local

RUN apt-get update

RUN apt-get install -y git unzip wget libzip-dev

RUN docker-php-ext-install gettext

RUN docker-php-ext-install pdo_mysql

RUN docker-php-ext-install zip

RUN wget https://sourceforge.net/projects/studip/files/Stud.IP/4.6/studip-4.6.3.zip

RUN unzip studip-4.6.3.zip

RUN mv 4.6.3 studip

RUN chmod 777 studip/public/plugins_packages

WORKDIR /usr/local/studip/config

RUN cp config.inc.php.dist config.inc.php

RUN cp studip-httpd.conf.dist /etc/apache2/conf-enabled/studip-httpd.conf

RUN sed -ie '1s/^.//' /etc/apache2/conf-enabled/studip-httpd.conf

RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash