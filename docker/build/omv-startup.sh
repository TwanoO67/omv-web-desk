#!/bin/bash
set -e

#if [ ! -f /data/omv_is_already_init ]; then
    #Init the plugin
    #/bin/sh /var/www/bin/postinst configure

    # Display the login information.
    #cat /etc/issue

    #touch /data/omv_is_already_init
#fi

#SERVICES="motd openmediavault openmediavault-engined rc.local"
SERVICES="php7.0-fpm rrdcached rsyslog sudo anacron ntp cron postfix nginx collectd monit"

for EACH in ${SERVICES}; do
    /etc/init.d/${EACH} start
done
#service php7.0-fpm start
#service openmediavault-engined start
omv-engined -d &

if [ -t 0 ]; then
    /bin/bash
else
    while true; do
        sleep 1000 & wait $!
    done
fi
