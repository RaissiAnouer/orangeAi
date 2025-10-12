FROM php:8.4

# Install composer
RUN wget https://raw.githubusercontent.com/composer/getcomposer.org/1b137f8bf6db3e79a38a5bc45324414a6b1f9df2/web/installer -O - -q | php -- --quiet
RUN mv composer.phar /usr/local/bin/composer

# Set working directory
WORKDIR /app

# Copy composer files
COPY composer.json composer.lock /app/

# Install dependencies
RUN composer install --no-dev --no-interaction --optimize-autoloader

# Copy application code
COPY . /app

# Expose port
EXPOSE 8181

# Start Laravel server
CMD php artisan serve --host=0.0.0.0 --port=8181