/**
 * The method returns the distance
 * between two points mathematically
 * @param point1 the first point
 * @param point2 the second point
 * @returns the distance between two points
 */
function distance(point1, point2)
{
    var dx = point1.x - point2.x;
    var dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 * The method flips the image
 * @param image the image
 * @param context the context
 * @param flipH true to flip horizontally otherwise false
 * @param flipV true to flip vertically otherwise false
 */
function flip(image, context, flipH, flipV)
{
	var scaleH = flipH ? -1 : 1;		// set horizontal scale to -1 if flip horizontal
	var scaleV = flipV ? -1 : 1;		// set vertical scale to -1 if flip vertical
	var posX = flipH ? width * -1 : 0;	// set x position to -100% if flip horizontal 
	var posY = flipV ? height * -1 : 0;	// set y position to -100% if flip vertical
    
    context.save();											// save the current state
    context.scale(scaleH, scaleV);							// set scale to flip the image
    context.drawImage(image, posX, posY, width, height);	// draw the image
    context.restore();										// restore the last saved state
}