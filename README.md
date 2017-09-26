# Webpack Toolbelt

This is a work-in-progress replacement for my gulp scaffold. The aim is to see if I can replace gulp entirely and run everything I need via Webpack.

### Commands

There are currently three commands you can run:

1. `npm run dev` - This compiles unminified code to a `dist` directory.
2. `npm run production` - This compiles minified code to a `dist` directory.
3. `npm run start` - This serves the code in a dev server and uses hot reloading. No code gets compiled as it's all done in memory. Once you are ready to compile use `dev` or `production`.

### SCSS

At the moment I compile all my sass from the `src/scss` folder into a css file within the `dist` directory. I also import (via npm) susy, breakpoint and modularscale.

### To-do

- Add autoprefixr
- Configure minification tasks properly
- Cleanup unused plugins