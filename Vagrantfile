# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "puppetlabs/ubuntu-14.04-64-puppet"

  config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.network "forwarded_port", guest: 3000, host: 9001

  config.vm.provision "puppet" do |puppet|
    puppet.environment_path = "puppet/environments"
    puppet.environment = "development"
    puppet.module_path = "puppet/modules"
  end

end
