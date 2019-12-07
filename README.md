<p align="center"><img src="./src/images/logo.png" /></p>

<h1 align="center"> Hydra - Boilerplate Template Project </h1>

<p align="center">Quick start your project with Webpack + Babel + SASS fully configured</p>

<hr/>

<h3> List of features </h3>

<ul>
  <li>Robust Webpack Configuration File</li>
  <li>Babel Loader</li>
  <li>js/jx/css/scss/sass Transpilers</li>
  <li>Production Build Script</li>
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
`npm run watch` : Compile **/src** and start watching for changes; working directory<br />
`npm run start` : Launches `webpack-dev-server` with Hot Module Replacement - http://localhost:8080 by default<br /><br />

Note: **/src** is a mockup folder. You're free to delete and re-write all data inside, but keep the folder structure intact if you don't want to re-configure webpack

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
