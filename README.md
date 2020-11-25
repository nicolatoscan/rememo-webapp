[![Netlify Status](https://api.netlify.com/api/v1/badges/7a5e41ee-fd64-4bef-9763-2099a7f22df6/deploy-status)](https://app.netlify.com/sites/affectionate-poitras-963187/deploys)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/nicolatoscan/rememo-webapp/blob/master/LICENSE)
![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
# Rememo WebApp
Project: Rememo<br>
Group ID: #13<br>
Alessio Gandelli - [alessiogandelli](https://github.com/alessiogandelli)<br>
Mattia Salvador - [MattiaSalvador201506](https://github.com/MattiaSalvador201506)<br>
Nicola Toscan - [nicolatoscan](https://github.com/nicolatoscan)<br>
Taras Rashkevych - [TarasRashkevych99](https://github.com/TarasRashkevych99)

## Overview
This project consist's of a [vue.js](https://vuejs.org/) Web Application written in Typescript.

## API
The api used bu this web application are being developed at https://github.com/nicolatoscan/rememo-api <br>
You can find there a README and wiki on how it's being developed.

## Live demo
A live demo is avaiable at https://rememo.nicolatoscan.dev/

## How to demo on your machine
Make sure you have installed [Node.js](https://nodejs.org/en/).<br>
This project was developed with Node v15 and tested on Ubuntu and Windows.

Clone the repository on your machine.
```bash
git clone https://github.com/nicolatoscan/rememo-api.git
```

Inside the `rememo-webapp` folder install the necessary dependencies
```bash
npm install
```

Create a file called `.env` using the `.env.example` template file where you can define the API endpoint.<br>
```
VUE_APP_API_HOST=<your-api-endpoint>
```
You can use a public avaiable endpoint at https://rememo-api.herokuapp.com/<br>
Or you can compile and run it on you machine followig the istruction at https://github.com/nicolatoscan/rememo-api


Now you can ompiles and hot-reloads for development
```
npm run serve
```

Or ccompiles and minifies for production
```
npm run build
```
