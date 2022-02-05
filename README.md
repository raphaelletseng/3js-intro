# 3js-intro
Check it out at https://raphaelletseng.github.io/3js-space. 

Built following Fireship's youtube tutorial.

A note on texture deployments:
Put images and assets in public/images so they are included in the build.
Refer to assets in the main.js folder with 'images/earth.jpg' and NOT '/images/earth.jpg'

## To deploy:
Add `"homepage": "https://raphaelletseng.github.io/3js-space",` to package.json and run `npm install gh-pages --save-dev`. Then add the line `"deploy": "gh-pages -d dist",`. Once that's done, do the usual `git add -A , git commit -m "message", git push` and then run `npm run deploy`. Your new branch and deployment should soon be visible! 
(I also added a vite.config.js with the base: "/3js-space/" but ¯\_(ツ)_/¯ )