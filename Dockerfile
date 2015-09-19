
# use Ubuntu 14 operating system
FROM  ubuntu:14.10

# maintainer
MAINTAINER    Gilles Wittenberg <docker.io@gilleswittenberg.com>

# install npm
# @LINK: https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories
RUN   apt-get install -y curl
RUN   curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
RUN   apt-get install -y nodejs

# install git (needed for forked npm repository)
RUN   apt-get install -y git

# install app
RUN   mkdir -p /var/www
COPY  . /var/www/
RUN   cd /var/www && npm install .

# expose port 7676 used by app
EXPOSE  7676

# start app
CMD   cd /var/www && NODE_ENV=production nodejs --harmony app.js
