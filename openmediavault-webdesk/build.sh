#!/bin/bash

#sudo apt-get install build-essential devscripts debhelper
rm ../openmediavault-webdesk_*
rm ./etc/webdesk/webdesk_config.js
rm ./etc/webdesk/webdesk_setup_log
debuild -us -uc
