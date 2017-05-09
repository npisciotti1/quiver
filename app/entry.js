'use strict';

require('./scss/main.scss');

const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const path = require('path');

const uiRouter = require('angular-ui-router');
const ngFileUpload = require('ng-file-upload');
const uiBootstrap = require('angular-ui-bootstrap');
const ngPaginate = require('angular-utils-pagination');
const ngMaterial = require('angular-material');
const ngAria = require('angular-aria');
const ngMdIcons = require('angular-material-icons');

const quiver = angular.module('quiver', [uiRouter, ngFileUpload, uiBootstrap, ngPaginate]);

let context = require.context('./config/', true, /\.js$/);
context.keys().forEach( key => {
  quiver.config(context(key));
});

context = require.context('./component/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  quiver.component(name, module);
});

context = require.context('./service/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  quiver.service(name, module);
});

context = require.context('./view/', true, /\.js$/);
context.keys().forEach( key => {
  let name = pascalcase(path.basename(key, '.js'));
  let module = context(key);
  quiver.controller(name, module);
});

context = require.context('./filter/', true, /\.js$/);
context.keys().forEach( key => {
  let name = camelcase(path.basename(key, '.js'));
  let module = context(key);
  quiver.filter(name, module);
});
