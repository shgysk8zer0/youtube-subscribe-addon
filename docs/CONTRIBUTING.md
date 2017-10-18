# Contributing to the project
**Table of Contents**
- [General](#general)
- [Requirements](#requirements)
- [Installation](#installing)
- [Forks](#forking)
- [JavaScript Contributions](#javascript)
- [CSS Contributions](#css)
- [Icons](#icons)
- [Git Submodules used](#git-submodules)
- [NPM Modules / Dev dependencies](#dev-dependencies)

- - -

## General
Write access to the GitHub repository is restricted, so make a fork and clone that.
All work should be done on its own branch, named according to the issue number
(*e.g. `42` or `bug/23`*). When you are finished with your work, push your feature
branch to your fork, preserving branch name (*not to master*), and create a pull request.

**Always pull from `upstream master` prior to sending pull-requests.**

## Requirements
- [Git](https://www.git-scm.com/download/)
- [jekyll](https://jekyllrb.com/)

## Installing
- `git clone git://github.com/shgysk8zer0/shgysk8zer0.github.io.git`
- `npm install`
- `jekyll serve`

## Forking
Feel free to fork this repository and make it your own, but know the limitations
of forking Jekyll sites. Expect merge conflicts if you want to pull from upstream.

Most of the content is stored in [`_data/`](../_data)

## JavaScript
Due to Content-Security-Policy, use of `eval` and inline scripts are **prohibited**.
Further, this project uses ECMAScript 2015  [modules](http://exploringjs.com/es6/ch_modules.html),
so be sure to familiarize yourself with the syntax.

All JavaScript **MUST** pass Eslint according to the rules defined in [`.eslintrc`](../.eslintrc).

Since this project minifies and packages all JavaScript using rollup.js, with
the exception of `index.js`, all script **MUST NOT** execute any code, but only
import/export functions, classes, etc.

![JavaScript sample](https://i.imgur.com/Ac0fKZu.png)

## CSS
Like in the above, one of the goals of this project is to keep things working
natively, which means standardized CSS and JavaScript. Although the features may
be new, `import` and `export` in JavaScript, and `@import` and `--var-name: value`
are official standards. In the case of CSS, browser support does exist, and so
this project will use `@import` and CSS variables in favor of SASS or LESS.

All CSS **MUST** pass Stylelint according to the rules defined in [`.stylelintrc`.](../.stylelintrc)

![CSS sample](https://i.imgur.com/j4sC5qv.png)

## Icons
Wherever possible, all icons are to be created in SVG and minified. PNGs may then
be created in whatever size is appropriate. Also, all commonly used icons are to
be added to `img/icons.svg` so that they may be used using `<symbol>` and `<use xlink:href/>`.

## NPM
Several useful modules are included for Node users, which is strongly recommended
for all development. Simply run `npm install` after download to install all Node
modules and Git submodules. There are also several NPM scripts configured in [`package.json`](../package.json),
which may be run using `npm run $script`.
- `build:css` which transpiles and minifies CSS
- `build:js` which transpiles and minifies JavaScript
- `build:icons` which creates SVG sprites from [`img/icons.csv`](../img/icons.csv)
- `build:all` which runs all of the above
- `update` which updates Git submodules recursively, installing any new ones
- `browser:*` To install the add-on in a stable, beta, or nightly build of Firefox
(**MUST BE INSTALLED**)
- `test` which runs any configured tests (*lints CSS & JS*)
development environment

NPM also has a `postinstall` script which will automatically install and update

## Git submodules

## Dev dependencies
- [PostCSS](http://postcss.org/)
- [cssnext](http://cssnext.io/)
- [Babel](https://babeljs.io/)
- [rollup.js](https://rollupjs.org/)
- [ESLint](http://eslint.org/)
- [stylelint](https://stylelint.io/)
- [svg-sprite-generator](https://github.com/frexy/svg-sprite-generator)
- [web-ext](https://www.npmjs.com/package/web-ext)
