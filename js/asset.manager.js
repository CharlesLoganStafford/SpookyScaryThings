/** 
 * The AssetManager.js file. This class manages the art and sound assets of the game.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */
function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.music = [];
    this.downloadQueue = [];

    /**
     * The method puts all
     * paths in queue to download
     */
    this.queueDownload = function (path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    }
    
    /**
     * The method indicates if
     * the downloading is complete.
     * 
     * @return True if done, otherwise false.
     */
    this.isDone = function () {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    }
    
    /**
     * The method starts downloading
     * images from the queue.
     */
    this.downloadAll = function (callback) {
        for (var i = 0; i < this.downloadQueue.length; i++) {
            var img = new Image();
            var that = this;

            var path = this.downloadQueue[i];
            console.log(path);

            img.addEventListener("load", function () {
                console.log("Loaded " + this.src);
                that.successCount++;
                if(that.isDone()) callback();
            });

            img.addEventListener("error", function () {
                console.log("Error loading " + this.src);
                that.errorCount++;
                if (that.isDone()) callback();
            });

            img.src = path;
            this.cache[path] = img;
        }
    }
    
    /**
     * The method pulls up the image
     * from client cache for use 
     * after finishing the download
     * @return the sprite (animations)
     */
    this.getAsset = function (path) {
        return this.cache[path];
    }
    
    this.addMusic = function(path) {
	    	var sound = new Audio();
	    	sound.addEventListener("canplay", null);
	    	sound.addEventListener("error", null);
	    	sound.src = path;
	    	this.music[path] = sound;
    }
    
    this.getMusic = function(path) {
    		return this.music[path];
    }
}