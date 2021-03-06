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
		//this.ThreeDCanvas = document.getElementById("3DCanvas");
		//this.ThreeDCanvasContext = document.getElementById("3DCanvas").getContext("webgl");
		
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
    		if (ev.keyCode == 13){
    			alert("test");
    		}
    		else if (ev.keyCode == 113){
    		    ApplicationRunner.selectedButton = ApplicationRunner.selectedButton.selectPrev();
    		    ApplicationRunner.selectedListMenuButton = ApplicationRunner.selectedButton.listHead;
    		    ApplicationRunner.canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    		}
    		else if (ev.keyCode == 119){
    			ApplicationRunner.selectedButton = ApplicationRunner.selectedButton.selectNext();
    			ApplicationRunner.selectedListMenuButton = ApplicationRunner.selectedButton.listHead;
    			ApplicationRunner.canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    		}
    		else if (ev.keyCode == 97) {
    		    ApplicationRunner.selectedListMenuButton = ApplicationRunner.selectedListMenuButton.selectPrev(ApplicationRunner.selectedButton.listTail);
    		    ApplicationRunner.canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    		}
    		else if (ev.keyCode == 115) {
    		    ApplicationRunner.selectedListMenuButton = ApplicationRunner.selectedListMenuButton.selectNext(ApplicationRunner.selectedButton.listHead);
    		    ApplicationRunner.canvasContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
    		}
    	});
	};