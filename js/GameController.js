function Controller(game, manager) {
	this.manager = manager;
	this.game = game;
	this.ctx = null;
	
	/**
	 * The mapping key
	 */
    this.keymap = {};

    /**
     * The reference of 
     * the controller class
     */
    var that = this;

    /**
     * The method hooks the key
     * pressed with the mapping key
     */
    this.keyup = function(event) {
        that.keymap[event.keyCode] = false;
        event.preventDefault();
    }
    
	this.mouseclick = function(event) {	
		var eventX = event.pageX;
		var eventY = event.pageY;
		
		if (event.button === MOUSE_RIGHT_CLICK) {
			if (eventX >= 100 && eventX < 300 && eventY >= 300 && eventY < 300) {
				game.toggleMusic();
			}
		}
	}
}