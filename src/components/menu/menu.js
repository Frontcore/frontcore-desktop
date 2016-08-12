'use strict';

const electron = require('electron');
const remote = electron.remote;
const Menu = remote.Menu;

let menu = new Menu();

let template = [{
  label: 'File',
  submenu: [{
    label: 'Exit',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }]
}, {
  label: 'Developers',
  submenu: [{
    label: 'Release Page',
    click: function() {
      electron.shell.openExternal('https://github.com/Frontcore/frontcore-desktop/releases');
    }
  }, {
    label: 'Milestones',
    click: function() {
      electron.shell.openExternal('https://github.com/Frontcore/frontcore-desktop/milestones');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Report Issues',
    click: function() {
      electron.shell.openExternal('https://github.com/Frontcore/frontcore-desktop/issues');
    }
  }, {
    label: 'Send Pull Requests',
    click: function() {
      electron.shell.openExternal('https://github.com/Frontcore/frontcore-desktop/pulls');
    }
  }]
}, {
  label: 'Help',
  submenu: [{
    label: 'Documentation',
    accelerator: 'CmdOrCtrl+Shift+D',
    click: function() {
      electron.shell.openExternal('https://github.com/Frontcore/frontcore-desktop/wiki');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Github Repository',
    click: function() {
      electron.shell.openExternal('https://github.com/Frontcore/frontcore-desktop');
    }
  }, {
    label: 'About Frontcore Desktop',
    click: function() {
      electron.shell.openExternal('http://frontcore-desktop.github.io/frontcore-desktop');
    }
  }]
}];

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
