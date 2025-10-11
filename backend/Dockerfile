FROM php:8.4.11-apache

WORKDIR /var/www/html

# Install system dependencies and PHP extensions required by Laravel
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Enable Apache mod_rewrite (needed for Laravel routing)
RUN a2enmod rewrite

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- \
    && mv composer.phar /usr/local/bin/composer

# Copy composer files
COPY composer.json composer.lock ./

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader

# Copy all source files
COPY . .

# Set permissions for storage and cache folders
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
