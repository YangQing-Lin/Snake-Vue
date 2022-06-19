#! /bin/bash


# find ../dist/js/ -type f -path "*.js" | xargs sed -i 's:::g'
find ../dist/js/ -type f -path "*.js" | xargs sed -i 's:(function(){var e={:const myfunc = (function(myappid, AcWingOS){var e={:g'
find ../dist/js/ -type f -path "*.js" | xargs sed -i 's:"AcWingOS":AcWingOS:g'
find ../dist/js/ -type f -path "*.js" | xargs sed -i 's:.mount("#app"):.mount(myappid):g'
find ../dist/js/ -type f -path "*.js" | xargs sed -i 's:()})();:()});:g'
echo "
export class Game {
    constructor(id, AcWingOS) {
        myfunc('#' + id, AcWingOS);
        // test
    }
}
" >> ../dist/js/*.js

rsync -avzu --progress \
/mnt/d/Project/AcWing/snake-vue/dist/js/app.*.js \
snake:snake/game/static/js/dist/game-v-1.0.js

rsync -avzu --progress \
/mnt/d/Project/AcWing/snake-vue/dist/js/app.*.js.map \
snake:snake/game/static/js/dist/

rsync -avzu --progress \
/mnt/d/Project/AcWing/snake-vue/dist/css/app.*.css \
snake:snake/game/static/css/game.css
