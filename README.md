# Point and Click SPA template

This template provides a minimal setup for a Vite-based react Single Page Application for running a point-and-click game.

It is based off the standard vite react template.

## Setup

 - create a repo from this template
 - install with `npm i`
 - download your .game.zip file from https://point-and-click-seven.vercel.app/editor
 - copy the 3x JSON files to ./src/game-data
 - copy the images and sounds folder to ./src/public

## Running locally
`npm run dev`

If any of the image or sound assets fail to load, this will be indicated on the loading screen. Check that the name of the file in the "/public" folder corresponds to the asset data in "src/game-data" - if not, rename the file to match (even if this means removing the file extension from the name - the asset should load without it).

## Customising the application

### index.html
You should edit the title and description in the document head to match your game.

You may also want to replace the vite svg as the favicon in the link tag. You could use one of the image assets from your game, or add another image file to /public to link to instead. 

You could consider adding structured data to the head to make your game more discoverable.  
 - https://schema.org/VideoGame
 - https://ogp.me/

### the loading screen
The `LoadingScreen` component can be customised to display any content you want until the users presses the start button. For example, you might include:
 - the title of your game
 - a poster image
 - links to your socials or a donations page
 - the credits/acknowledgments
Acknowledging the Point And Click project and linking back to our site would be appreciated, but is not required.

### custom game runner layouts
The `GameRunner` component in `Game` has a "Layout" prop that allows you to control the how the game UI runs. 

**TO DO - Documentation on how to write your own Layout components**

## Do the assets have to bundled into /public?
This is the simplest option which the template uses by default, but not essential.

The GameRunner needs `getImageAsset` and `getSoundAsset` functions to retrieve assets from the asset Ids defined in your game data, but you write your own functions if you would rather (for example) fetch the assets from a CDN or other external source.

If you look at `src\assets.ts`, you'll see how the default implementation maps the `href` property of the asset object to the relative URL to the corresponding image and sound files in /public. You could instead map to any alternative URL for the image.

## Building for production
`npm run build`
Compiled files will be output to the ./dist folder.
