/*
*  ARTIST 
*  Purpose: Responsible for drawing the UI components
*/
function Artist(context, applicationRunnerContext){
    return {
        context: context,
        globalStyle: {
            background: {
                color: '#2D3129',
                width: window.innerWidth
            },
            header: {
                lineWidth: applicationRunnerContext.canvas.width
            },
            text: {
            	color: "#69FB8F",
            	fontSize: 20,
                font: 'Arial Narrow',
                position: {
                	x: window.innerWidth/2 + 20,
                	y: 430
                },
                size: {
                	width: window.innerWidth/4,
                	lineHeight: 20
                }
            },
            image: {
            	
                position: {
                	x: window.innerWidth/2 + 20,
                	y: 80
                },
                size: {
                	width: window.innerWidth/4,
                	height: window.innerWidth/4
                }
            },
            button: {
                color: {
                    selected: '#2D3129',
                    unselected: '#2D3129'
                },
                
                text: {
                    color: {
                        selected: '#69FB8F',
                        unselected: '#69FB8F'
                    }
                }
            },
            headerButton: {
                text: {
                    size: 30,
                    font: 'Arial Narrow',
                    
                },
                position: {x: 0, y: 0},
                size: {width: 200, height: 50},
                offset: 10
            },
            listMenuButton: {
                text: {
                    size: 20,
                    font: 'Arial Narrow',
                    color: {
                        selected: '#2D3129',
                        unselected: '#69FB8F'
                    }
                },
                position: {x: window.innerWidth/4 - 20, y: 80},
                size: {width: window.innerWidth/4, height: 40},
                offset: 10,
                color: {
                    selected: '#69FB8F',
                    unselected: '#2D3129'
                }
            },
            content: {
                size: 18,
                font: 'Arial Narrow'
            }
        },
        
        wrapText: function(text, x, y, maxWidth, lineHeight) {
            this.context.font = this.responsiveHelper(this.globalStyle.text.fontSize) + "px " + this.globalStyle.content.font;
            var words = text.split(' ');
            var line = '';
        
            for(var n = 0; n < words.length; n++) {
              var testLine = line + words[n] + ' ';
              var metrics = this.context.measureText(testLine);
              var testWidth = metrics.width;
              if (testWidth > maxWidth && n > 0) {
                this.context.fillText(line, x, y);
                line = words[n] + ' ';
                y += this.responsiveHelper(20);
              }
              else {
                line = testLine;
              }
            }
            this.context.fillText(line, x, y);
        },
        responsiveHelper: function(size){
        	return size;//Math.floor(size * window.innerWidth/screen.width);
        },
        center: function(width, length){
        	return this.responsiveHelper(this.globalStyle.background.width)/2 - width*length/2; 
        },
        draw: function(type, name, index, selected){
        	//console.log("draw!");
        	switch(type){
        		case "background":
        			this.context.beginPath();
        			this.context.fillStyle = this.globalStyle.background.color;
        			this.context.rect(0, 0, document.body.clientWidth, document.body.clientHeight);
        			this.context.fill();
        			break;
        		case "header":
        		    var currentButton = UI.head;
        		    var localIndex = 0;
        		    this.draw('header-line');
        		    while(currentButton != null){
        		        this.draw("header-button", currentButton.name, localIndex, applicationRunnerContext.selectedButton.name==currentButton.name?true:false);
        		        currentButton = currentButton.nextButton; // careful about endless loops
        		        localIndex++;
        		    }
        		 	break;
        		case "list-menu":
        			var currentButton = applicationRunnerContext.selectedButton.listHead;
        			var localIndex = 0;
        			while(currentButton != null){
        				this.draw("list-menu-button", currentButton.name, localIndex, applicationRunnerContext.selectedListMenuButton.name==currentButton.name?true:false);
        				currentButton = currentButton.nextButton;
        				localIndex++;
        			}
        			break;
        		case "content":
        			var currentButton = applicationRunnerContext.selectedListMenuButton;
        			if(!!currentButton && !!currentButton.text) this.draw("text", currentButton.text);
        			if(!!currentButton && !!currentButton.imageId && !!document.getElementById(currentButton.imageId)) this.draw("image", currentButton.imageId);
        			break;
        		case "image":
        			var width = this.responsiveHelper(this.globalStyle.image.size.width);
        			var height = this.responsiveHelper(this.globalStyle.image.size.height);
        			var x = this.responsiveHelper(this.globalStyle.image.position.x);
        			var y = this.responsiveHelper(this.globalStyle.image.position.y);
        			var image = document.getElementById(name);
        			this.context.drawImage(image, x, y, width, height);
        			break;
        		case "text":
        			
        			var maxWidth = this.responsiveHelper(this.globalStyle.text.size.width);
        			var lineHeight = this.responsiveHelper(this.globalStyle.text.size.lineHeight);
        			var x = this.responsiveHelper(this.globalStyle.text.position.x);
        			var y = this.responsiveHelper(this.globalStyle.text.position.y);
        			this.context.fillStyle = this.globalStyle.text.color;
        			this.context.font = Math.floor(this.globalStyle.text.fontSize * window.innerWidth/1024) + "px " + this.globalStyle.text.font;
        			this.wrapText(name, x, y, maxWidth, lineHeight);
        			break;
        		case "header-button":
        		    var width = this.responsiveHelper(this.globalStyle.headerButton.size.width);
        		    var height = this.responsiveHelper(this.globalStyle.headerButton.size.height);
        		    var x = this.center(UI.head.getLength(), width); // centered position should not be normalized
        		    var y = this.responsiveHelper(this.globalStyle.headerButton.position.y);
        			if (selected == true){
        	    		// Start Drawing Button Box
        	    		this.context.beginPath();
        				this.context.fillStyle = this.globalStyle.button.color.selected;
        				this.context.rect(x + width*index, y, width, height);
        				this.context.fill();
        				// Selected Notches
        				this.context.beginPath();
        				this.context.moveTo(x + width*index, y + height);
        				this.context.lineTo(x + width*index, y + height/2);
        				this.context.stroke();
        				this.context.beginPath();
        				this.context.moveTo(x + width*index + width, y + height);
        				this.context.lineTo(x + width*index + width, y + height/2);
        				this.context.stroke();
        			}
        			// Text
        			this.context.fillStyle = this.globalStyle.button.text.color.selected;
        			var fontSize = this.responsiveHelper(this.globalStyle.headerButton.text.size);
        			this.context.font = fontSize<15?15:fontSize + "px " + this.globalStyle.headerButton.text.font;
        			var offset = width/2 - this.context.measureText(name).width/2;
        			this.context.fillText(name, offset + x + width*index + this.responsiveHelper(5), y + this.responsiveHelper(35));
        			break;
        		case "list-menu-button":
        		    
        		    var width = this.responsiveHelper(this.globalStyle.listMenuButton.size.width);
        		    var height = this.responsiveHelper(this.globalStyle.listMenuButton.size.height);
        		    var x = this.responsiveHelper(this.globalStyle.listMenuButton.position.x);
        		    var y = this.responsiveHelper(this.globalStyle.listMenuButton.position.y);
        		    this.context.fillStyle = this.globalStyle.listMenuButton.text.color.unselected;
        			if (selected == true){
        	    		// Start Drawing Button Box
        	    		this.context.beginPath();
        				this.context.fillStyle = this.globalStyle.listMenuButton.color.selected;
        				this.context.rect(x, y + height*index, width, height);
        				this.context.fill();
        				this.context.fillStyle = this.globalStyle.listMenuButton.text.color.selected;
        			}
        			// Text
        			var fontSize = this.responsiveHelper(this.globalStyle.listMenuButton.text.size);
        			this.context.font = fontSize<12?12:fontSize + "px " + this.globalStyle.listMenuButton.text.font;
        			this.context.fillText(name, x + this.responsiveHelper(5), y + height*index  + this.responsiveHelper(30));
        			break;
        		case "item-button":
        		    /*
        			this.context.fillStyle = parameters.text.fillStyle.unselected;
        			
        			if (parameters.selected == true){
        	    		// Start Drawing Button Box
        	    		this.context.beginPath();
        				this.context.fillStyle = parameters.buttonBox.fillStyle.selected;
        				this.context.rect(parameters.buttonBox.x , parameters.buttonBox.y, parameters.buttonBox.width, parameters.buttonBox.height);
        				this.context.fill();
        				this.context.fillStyle = parameters.text.fillStyle.selected;
        			}
        			// Text
        			this.context.font = parameters.text.font;
        			this.context.fillText(parameters.text.value, parameters.buttonBox.x + 5, parameters.buttonBox.y + 30);
        			this.context.fillText(parameters.value, parameters.buttonBox.x + parameters.buttonBox.width - 50 , parameters.buttonBox.y + 30);
        			break;	
        		    */
        		    break;
        		case "header-line":
                    this.context.lineWidth = 2;
        		    var height = this.responsiveHelper(this.globalStyle.headerButton.size.height);
        			this.context.beginPath();
        			this.context.strokeStyle = "#69FB8F";
        			this.context.moveTo(0, height-1);
        			this.context.lineTo(window.innerWidth, height-1);
        			this.context.stroke();
        			break;
        	}
        }
    };
}