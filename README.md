<p align="center"><img src="./src/assets/logo.png" /></p>

<p align="center">
[![npm version](https://img.shields.io/npm/v/hydra-boilerplate.svg?style=flat)](https://www.npmjs.com/package/hydra-boilerplate) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Eluvade/hydra-boilerplate/tree/2.0.1)
</p>

<h1 align="center"> Hydra - Boilerplate Webpack 5 Template Project </h1>

<p align="center">Quick start your project with Webpack 5 + Babel + Typescript + Stylers fully configured</p>

<hr/>

<h3> List of features </h3>

<ul>
  <li>Robust Webpack Configuration File for both production and development environments</li>
  <li>Babel Transpiler</li>
  <li>TypeScript Transpiler</li>
  <li>scss/sass/less Transpilers</li>
  <li>Minimizers, linters, terser, chunking, asset & build optimization</li>
</ul>

<h3> External links -> Documentation and Github repositories </h3>

<a href="https://github.com/webpack/webpack">Link to your *webpacks'* official github & documentation</a>

<a href="https://github.com/babel/babel">Link to your *babels'* official github & documentation</a>

<h3>Installation </h3>

```shell
$ git clone https://github.com/Eluvade/hydra-boilerplate.git
$ cd hydra-boilerplate
$ npm ci
```
<h3>Contributing</h3>
Keeping it simple and lightweight is the number 1 priority. Don't add unnecessary libraries just because you can.

<h3> Usage </h3>

`npm run build` : Compiles **/src** folder and creates **/dist** folder in the projects' root<br />
`npm run start` : Launches `webpack-dev-server` with Hot Module Replacement - http://localhost:8080 by default<br /><br />

Note: **/src** is a mockup folder. You're free to delete and re-write all data inside, but keep the folder structure intact if you don't want to re-configure webpack

In order for Webpack to bundle your image/gif/video/music assets, you need to import/require them in your javascript. URL's in CSS will be resolved automatically.

<h3> Known Issues </h3>
On Linux: If building gives you an Error: "Cannot find module node-sass", try the following:
```shell
$ sudo npm install --save-dev  --unsafe-perm node-sass
```

<h3>Author</h3>
<ul>
  <li>Bunny Eluvade</li>
</ul>

<h3>License</h3>

This project is licensed under the <a href="./LICENSE">MIT</a> License.
