#!/usr/bin/env bash

apt-get update
apt-get install -y build-essential 
apt-get install -y git
apt-get install -y libssl-dev
apt-get install -y curl
apt-get install -y phantomjs
gem install compass


su vagrant -l -c "wget https://raw.githubusercontent.com/creationix/nvm/v0.8.0/install.sh"
su vagrant -l -c "bash /home/vagrant/install.sh"
su vagrant -l -c "rm /home/vagrant/install.sh"
su vagrant -l -c "source /home/vagrant/.profile"
su vagrant -l -c "nvm install 0.10"
su vagrant -l -c "nvm alias default 0.10"
su vagrant -l -c "nvm use default"

su vagrant -l -c "npm install yo grunt-cli -g"
su vagrant -l -c "git config --global url.'https://'.insteadOf git://"

echo "cd /vagrant" >> /home/vagrant/.profile

git config --global url."https://".insteadOf git://
su vagrant -l -c "mkdir /home/vagrant/node_modules"
su vagrant -l -c "ln -s /home/vagrant/node_modules /vagrant/node_modules"