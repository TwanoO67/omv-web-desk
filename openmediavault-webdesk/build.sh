#!/bin/bash

#sudo apt-get install build-essential devscripts debhelper
rm ../openmediavault-webdesk_*
debuild -us -uc
