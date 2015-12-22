	/*
    *  APPLIACTION RUNNER
    *  Purpose: Create Application and Refresh it Every Frame
    */
    
	var ApplicationRunner = {};
	
	ApplicationRunner.canvasContext = null;
	ApplicationRunner.canvas = null;
	ApplicationRunner.selectedButton = null;
	ApplicationRunner.selectedListMenuButton = null;
	
	ApplicationRunner.initializeCanvas = function(canvasIdTag, canvasDimensions){
		var canvas = document.getElementById(canvasIdTag);
		canvas.width = canvasDimensions.x; //document.width is obsolete
	    canvas.height = canvasDimensions.y; //document.height is obsolete
		var context = canvas.getContext("2d");
		this.canvasContext = context;
		this.ThreeDCanvas = document.getElementById("3DCanvas");
		this.ThreeDCanvasContext = document.getElementById("3DCanvas").getContext("webgl");
		
		this.canvas = canvas;
	};
	
	ApplicationRunner.runAnimationLoop = function(callback){
		callback();
		setTimeout(function(){
			ApplicationRunner.runAnimationLoop(callback);
		}, 1000/60);
	};
	
	ApplicationRunner.initializeControls = function(){
	    this.selectedButton = UI.head; // first button from the header menu
	    this.selectedListMenuButton = UI.head.listHead; // first button from the list menu
	    $("body").keypress(function(ev){
	    	console.log(ev.keyCode);
    		if (ev.keyCode == 97 || ev.keyCode == 65){ // A
    		    ApplicationRunner.selectedButton = ApplicationRunner.selectedButton.selectPrev();
    		    ApplicationRunner.selectedListMenuButton = ApplicationRunner.selectedButton.listHead;
    		}
    		else if (ev.keyCode == 100 || ev.keyCode == 68){ // D
    			ApplicationRunner.selectedButton = ApplicationRunner.selectedButton.selectNext();
    			ApplicationRunner.selectedListMenuButton = ApplicationRunner.selectedButton.listHead;
    		}
    		else if (ev.keyCode == 119 || ev.keyCode == 87) { // W
    		    ApplicationRunner.selectedListMenuButton = ApplicationRunner.selectedListMenuButton.selectPrev(ApplicationRunner.selectedButton.listTail);
    		}
    		else if (ev.keyCode == 115 || ev.keyCode == 83) { // S
    		    ApplicationRunner.selectedListMenuButton = ApplicationRunner.selectedListMenuButton.selectNext(ApplicationRunner.selectedButton.listHead);
    		}
    	});
	};