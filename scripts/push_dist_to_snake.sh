#! /bin/bash


rsync -avzu --progress \
/mnt/d/Project/AcWing/snake-vue/dist/js/app.*.js \
snake:snake/game/static/js/dist/game.js

rsync -avzu --progress \
/mnt/d/Project/AcWing/snake-vue/dist/css/app.*.css \
snake:snake/game/static/css/game.css
