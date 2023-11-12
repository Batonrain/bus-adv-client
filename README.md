

 nano /etc/nginx/sites-available/bus-adv-client - посмотреть настройки приложения на сервере

 server {
    listen 80;
    server_name 94.228.124.48;

    root /projects/AdvertisingBoard/client/bus-adv-client/dist/bus-adv-client;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Настройка журналов ошибок и доступа для диагностики
    access_log /var/log/nginx/bus-adv-client.log;
    error_log /var/log/nginx/bus-adv-client.log;

    # Дополнительные настройки, например, для улучшения производительности или безопасности, можно добавить здесь
}