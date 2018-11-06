FROM debian:9.5

MAINTAINER Antoine WEBER <pro@weberantoine.fr>

# Add the OpenMediaVault repository
COPY openmediavault.list /etc/apt/sources.list.d/

ENV DEBIAN_FRONTEND noninteractive
ENV APT_LISTCHANGES_FRONTEND none
ENV LANG C
ENV HOSTNAME openmediavault.plugin.test

# Fix resolvconf issues with Docker
RUN echo "resolvconf resolvconf/linkify-resolvconf boolean false" | debconf-set-selections

# Install OpenMediaVault packages and dependencies
RUN apt-get update -y; apt-get --yes --allow-unauthenticated install openmediavault-keyring vim
RUN apt-get update -y; apt-get --yes --auto-remove --show-upgraded \
	--allow-downgrades --allow-change-held-packages \
	--no-install-recommends \
	--option Dpkg::Options::="--force-confdef" \
	--option DPkg::Options::="--force-confold" \
	install postfix openmediavault


RUN /usr/share/openmediavault/scripts/helper-functions
RUN xmlstarlet ed -L -u "/config/system/network/dns/hostname" -v "${HOSTNAME}" /etc/openmediavault/config.xml

RUN omv-initsystem $(find /usr/share/openmediavault/initsystem ! -name '*rootfs' ! -name '*sysctl' -type f -printf "%f\n" | sort |  xargs)

# Initialize the system and database.
#RUN omv-initsystem

# Rebuild configurations.
RUN omv-mkconf interfaces
RUN omv-mkconf issue

# We need to make sure rrdcached uses /data for it's data
COPY rrdcached /etc/default

# Add our startup script last because we don't want changes
# to it to require a full container rebuild
COPY omv-startup.sh /usr/sbin/omv-startup
RUN chmod +x /usr/sbin/omv-startup

EXPOSE 80 443

ENTRYPOINT /usr/sbin/omv-startup
