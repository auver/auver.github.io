import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '600'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '498'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'b3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '8c3'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'c83'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', 'da9'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'f07'),
    exact: true
  },
  {
    path: '/archive',
    component: ComponentCreator('/archive', '460'),
    exact: true
  },
  {
    path: '/babel-plugin',
    component: ComponentCreator('/babel-plugin', 'e1c'),
    exact: true
  },
  {
    path: '/css-mask',
    component: ComponentCreator('/css-mask', 'b5b'),
    exact: true
  },
  {
    path: '/electron-apps-automatically-update',
    component: ComponentCreator('/electron-apps-automatically-update', 'e88'),
    exact: true
  },
  {
    path: '/react-hooks-best-practices',
    component: ComponentCreator('/react-hooks-best-practices', '44b'),
    exact: true
  },
  {
    path: '/rxjs-ipc',
    component: ComponentCreator('/rxjs-ipc', '22b'),
    exact: true
  },
  {
    path: '/rxjs-on-the-netease-cloud-music-desktop',
    component: ComponentCreator('/rxjs-on-the-netease-cloud-music-desktop', '9f0'),
    exact: true
  },
  {
    path: '/sourcemap',
    component: ComponentCreator('/sourcemap', '6fa'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '6c8'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
