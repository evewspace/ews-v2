include apt

user { 'vagrant': ensure => 'present' }

Exec { path => '/usr/bin:/bin' }

package { ['build-essential', 'python-dev', 'mongodb','nginx',
  'curl', 'git', 'redis-server' ]:
    ensure => 'installed',
    require => Exec['apt_update']
}

exec { 'nvm-fetch':
  command => '/usr/bin/curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.28.0/install.sh | /bin/bash; echo "source ~/.nvm/nvm.sh" >> /home/vagrant/.bash_profile',
  user => 'vagrant',
  require => Package['git']
}

exec { 'nvm-install-binary':
  user => 'vagrant',
  command => 'bash --login -c "source /home/vagrant/.nvm/nvm.sh; nvm install stable; nvm use stable"',
  require => Exec['nvm-fetch']
}

file { 'nvm-sh':
  path => '/home/vagrant/.nvm/',
  recurse => true,
  ensure => present,
  owner => 'vagrant',
  group => 'vagrant',
  require => Exec['nvm-fetch']
}

file { 'nginx-config':
  path => '/etc/nginx/nginx.conf',
  ensure => present,
  owner => 'root',
  source => '/vagrant/puppet/files/nginx.conf',
  require => Package['nginx']
}

file { 'eve-wspace-nginx':
  path => '/etc/nginx/sites-available/eve-wspace.conf',
  ensure => present,
  owner => 'root',
  source => '/vagrant/puppet/files/eve-wspace.conf',
  require => Package['nginx']
}

file { 'eve-wspace-nginx-enabled':
  path => '/etc/nginx/sites-enabled/eve-wspace.conf',
  ensure => link,
  owner => 'root',
  target => '/etc/nginx/sites-available/eve-wspace.conf',
  require => [ File['eve-wspace-nginx'], Package['nginx'] ]
}

file { 'eve-wspace-logs':
  path => '/vagrant/logs/',
  ensure => directory
}

service { 'mongodb':
  ensure => true,
  enable => true,
  require => Package['mongodb']
}

service { 'nginx':
  ensure => true,
  enable => true,
  require => Package['nginx']
}

service { 'redis-server':
  ensure => true,
  enable => true,
  require => Package['redis-server']
}

exec { 'npm-install-deps':
  path => '/vagrant',
  command => '/usr/bin/env npm install --dev --no-optional',
  user => 'vagrant',
  require => [
    File['nvm-sh'],
    Exec['nvm-install-binary']
  ]
}
