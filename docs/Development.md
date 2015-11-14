# Eve-Wspace Development

## Branches

Eve-Wspace uses [git-flow](https://danielkummer.github.io/git-flow-cheatsheet/) for tracking branches. Please follow the git-flow method when creating new features or submitting bug fixes. [Squash](http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html) commits as appropriate.

## Development

Development of Eve-Wspace can be performed by cloning the repository onto your system and hacking on top as desired.

For ease of development across differing systems, a [Vagrantfile](../Vagrantfile) is located in the root of the repository. Puppet is used to configure the Vagrant development box.

### Vagrant box requirements
To develop using the vagrant box, your host system must have installed:
* Ruby
* Vagrant
* A Virtual Machine program, ex: [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* [Puppet](https://puppetlabs.com/)
* [Librarian-puppet](https://github.com/rodjek/librarian-puppet)

Before begining development, read through the [Vagrantfile](../Vagrantfile) to ensure you will not be colliding with any other ports on your system.

### Vagrant box development
```bash

# Clone the main repo
clone git@github.com:evewspace/eve-wspace-v2.git

# Change directory in the wspace repo
cd ./eve-wspace-v2/

# Create and provision the development box
vagrant up --provision

# SSH into the vagrant box
vagrant ssh

# Begin breaking things
```

## Project Layout
Eve-Wspace utilizes the following directory structure:
```bash
eve-wspace-v2
|-- app // The eve-wspace-v2 frontend
|   |-- assets
|   |   |-- fonts // Any fonts which are not loaded via a CDN
|   |   |-- img // Any images which are not loaded via a CDN
|   |-- partials // Jade templates used by the frontend
|   |   |-- _mixins.jade // Jade mixins used throughout the site
|   |-- modules // Frontend modules
|   |-- styles // Frontend SCSS files
|   |   |-- eve-wspace // SCSS files for the frontend application
|   |   |-- vendors // Vendor SCSS files
|   |   |-- app.scss // Entry for frontend SCSS
|   |   |-- vendors.scss // Entry for vendor SCSS
|   |-- app.js // Entry for the frontend application
|-- bin // Executables
|   |-- ews // Management/Development executable
|-- config // Application configuration
|   |-- econsystem.json // default pm2 ecosystem
|-- docs // Application Documentation
|-- lib // The eve-wsapce-v2 backend
|   |-- config // Configuration files
|   |-- controllers // Resource controllers
|   |-- db // CCP SDE
|   |-- models // ODM models
|   |-- plugins // Server plugins
|   |-- views // Jade views to be rendered by the server
|   |-- index.js // Entry for the server
|   |-- token // Private RSA token for encryption
|   |-- token.pub // Public RSA token for encryption
|   |-- utils.js // Server utility class
|-- public // The public directory. Public files are generated at build time.
|   |-- css // All css files
|   |-- fonts // All font files
|   |-- img // All image files
|   |-- js // All javascript files
|-- puppet // Files for puppet
|-- tasks // Gulp tasks
|-- test // Karma test files
|-- .editorconfig // EditorConfig file
|-- AUTHORS.md // Authors file
|-- Gulpfile.js // Gulpjs entry file
|-- LICENSE.md // Apache2 license file
|-- NOTICES.md // Copyright notices from third parties
|-- Procfile // Example Heroku procfile
|-- README.md // Main application readme
|-- Vagrantfile // Development vagrant file
|-- server.js // Server entry when not loading the module into a parent application.
```
