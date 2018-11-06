#!/bin/bash
set -e

. /usr/share/openmediavault/scripts/helper-functions

FSPATH="${1}"
FSNAME="${2}"

if [[ -z "${FSPATH}" || -z "${FSNAME}" ]]; then
    echo "Usage: ${0} <fspath> <fsname>"
    exit 1
fi

mkdir -p "${FSPATH}" || true

MNT_ENT_XPATH="/config/system/fstab/mntent"
SHARE_XPATH="/config/system/shares/sharedfolder"

# In this case, we always only want one shared folder, so
# we're going to nuke any others because we're assuming they're
# not what they want.
if [[ "$(omv_config_get_count ${MNT_ENT_XPATH})" -gt 0 ]]; then
    omv_config_delete ${MNT_ENT_XPATH}/*
else
    omv_config_add_element "/config/system/fstab" "mntent"
fi

if [[ "$(omv_config_get_count ${SHARE_XPATH})" -gt 0 ]]; then
    omv_config_delete ${SHARE_XPATH}/*
else
    omv_config_add_element "/config/system/shares" "sharedfolder"
fi

# OMV wants each mount and shared folder to have a universally
# unique identifier, generate some
MNT_ENT_UUID=$(uuid)
SHARE_UUID=$(uuid)

# Create the mount entry for this share
omv_config_add_element ${MNT_ENT_XPATH} uuid ${MNT_ENT_UUID}
omv_config_add_element ${MNT_ENT_XPATH} fsname "${FSNAME}"
omv_config_add_element ${MNT_ENT_XPATH} dir "${FSPATH}"
omv_config_add_element ${MNT_ENT_XPATH} type none
omv_config_add_element ${MNT_ENT_XPATH} opts "rw,relatime,xattr"
omv_config_add_element ${MNT_ENT_XPATH} freq 0
omv_config_add_element ${MNT_ENT_XPATH} passno 0
omv_config_add_element ${MNT_ENT_XPATH} hidden 0

# Create the shared folder
omv_config_add_element ${SHARE_XPATH} uuid ${SHARE_UUID}
omv_config_add_element ${SHARE_XPATH} name "${FSNAME}"
omv_config_add_element ${SHARE_XPATH} comment ""
omv_config_add_element ${SHARE_XPATH} mntentref ${MNT_ENT_UUID}
omv_config_add_element ${SHARE_XPATH} reldirpath "/"
