Ermintrude
==========

Ermintrude is a Prototype([prototypejs.org](http://prototypejs.org)) + Scriptaculous([http://script.aculo.us](http://script.aculo.us)) based carousel script.  It started out as a port of Fred LeBlanc’s 
excellent Roundabout for jQuery ([http://fredhq.com/projects/roundabout/](http://fredhq.com/projects/roundabout/)) to Scriptaculous 
but I'm going to be looking to extend it in the future to build on what the original provides.  I'll also be adding a version for Scripty2 when that gets a bit 
closer to release status.

Usage
-----

You'll need to include the Prototype and Scriptaculous libraries first.  The repository includes the latest versions of both but will work with Prototype 1.6.1+ and Scriptaculous 1.8.3+.

    <script type="text/javascript" src="path/to/prototype.js"></script>
    <script type="text/javascript" src="path/to/scriptaculous.js"></script>
    
Then you'll need to include the ermintrude files.  You can either include the basic file

    <script type="text/javascript" src="path/to/ermintrude.js"></script>
    
or the full file which includes the extra shapes

    <script type="text/javascript" src="path/to/ermintrude.full.js"></script>
    
Optionally you can include the extra shapes seperately (not sure why you would but hey, it's your party)

    <script type="text/javascript" src="path/to/ermintrude.shapes.js"></script>

Then it's just a case of creating your carousel.  The usual html layout for a carousel is this:

     <ul id="roundabout">
        <li>Apples</li>
        <li>Pears</li>
        <li>Raspberries</li>
        <li>Mango</li>
        <li>Blackberries</li>
     </ul>
     
but you can use other dom elements like divs

     <div id="roundabout">
        <div>Apples</div>
        <div>Pears</div>
        <div>Raspberries</div>
        <div>Mango</div>
        <div>Blackberries</div>
    </div>

Then create your new Ermintrude instance

    var ermintrude = new Ermintrude(element[,options]);
    
Where element is the id of the container, so 'roundabout' in the examples given.  Options is an optional element that will specify customisation variables.  The full range of options is detailed below.

The main options you will want to customise are (defaults are in square brackets):

- shape - `'lazySusan'` - specifies the carousel shape to use
- duration - `600` - sets the time the animation takes
- btnNext - `null` - specifies a next button to use to control the navigation,
- btnPrev - `null` - specifies a previous button to use to control the navigation
- easing - `'sinoidal'` - defines the easing type to use for the animation. Uses the Scriptaculous (Transition Types)[]
- clickToFocus - `true` - sets whether clicking the object will cause it to move into focus.
- childSelector - `'li'` - defines the type of dom element to be turned into a carousel element.  Changed this when using a different semantic layout such as divs.
- classes
    * activeClass - `'roundabout-in-focus'` - class assigned to the currently focused element.
    * itemClass - `'roundabout-moveable-item'` - class assigned to all elements.
    * holderClass - `'roundabout-holder'` - the class assigned to the containing element.
- reflect - `'false'` - reverses the order of the elements.
- startingChild - `null` - sets the element to be the first focused element. If set to null will focus the first element in the list.
        
The following options will enable you to alter the shape of the carousel

- bearing - `0.0`
- tilt - `0.0`
- minZ - `100`
- maxZ - `400`
- minOpacity - `0.40`
- maxOpacity - `1.00`
- minScale - `0.40`
- maxScale - `1.00`
- focusBearing - `0.0`

Shapes
------

The following are all the possible shapes you can use:

- lazySusan (default)
- waterWheel
- figure8
- square
- conveyorBeltLeft
- conveyorBeltRight
- diagonalRingLeft
- diagonalRingRight
- rollerCoaster
- tearDrop
- theJuggler
- goodbyeCruelWorld

Demos
-----

For a full range of demos go to (http://oinutter.co.uk/ermintrude/examples/)[http://oinutter.co.uk/ermintrude/examples/]. 
                    