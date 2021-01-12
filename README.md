# Notes app

This is my **first** project created with **Angular CLI** (version 10.0.8).
There's a lot of not-the-best practices but I've learned quite a lot going through this.
After a while I started to understand the beauty of well organised Angular framework and I'm looking forward to creating something big.

## Technologies

In this project I'm using:
- Angular
- Angular Universal (prerender)
- TypeScript
- Firebase
- Bootstrap
- Git

## Setup

To install this project locally clone the repository and use **npm**.<br>
`$ npm install`

To work at **localhost:4200** in watch mode. Add `-o` flag to open automatically in your default browser.<br>
`$ ng serve` 

To build prerender app. The outcome will be located at **/dist/browser** folder.<br>
`$ npm run prerender`

## Backend

In Notes application I'm using friendly **Firebase** backend service created by Google.
There are few simple `put` and `get` requests as well as the authentication module is being used.

## Server

App is prerendered with **Angular Universal** which improves **SEO** a lot. For a server I'm using [Netlify](https://www.netlify.com/) service.

## Layout

Simple and minimalistic layout created with **Bootstrap**. My main focus was to learn Angular so a pack of ready to use styles was a nice help.

### Favicon

![Favicon](https://github.com/rawdanowiczdev/notes-app/blob/master/src/assets/favicon.png) Favicon created by [BomSymbols](https://creativemarket.com/BomSymbols).
