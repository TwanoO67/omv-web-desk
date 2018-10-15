#!/bin/bash
source /usr/share/openmediavault/scripts/helper-functions && omv_purge_internal_cache
service openmediavault-engined restart
