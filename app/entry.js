'use strict';

require('./scss/main.scss');

const angular = require('angular');
const camelcase = require('camelcase');
const pascalcase = require('pascalcase');
const path = require('path');
const uiRouter = require('angular-ui-router');

const quiver = angular.module('quiver', [uiRouter]);

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
