/*
    *  UI 
    *  Purpose: Modular object that allows to easy modify parameters of UI components
    */
/*
var UI = {};

UI.button = function(){
	return {
		selected: false,
		direction: "horizontal",
		offset: {x: 20, y: 0},
		buttonBox: {x: 0, y: 0, width: 100, height: 40, fillStyle: {selected: "#2D3129", unselected: "#2D3129"}},
		text: {value: "", font: "30px Arial Narrow", fillStyle: {selected: "#69FB8F", unselected: "#69FB8F"}}
	};
},

UI.background = {
	draw: function(){
		Artist.draw("background", {color: "#2D3129"});
	}	
},

UI.header = {
	buttons: [
		{
			name: "STAT",
			response: function(){},
			buttonParameters: UI.button()
		}, 
		{
			name: "SKILLS",
			response: function(){alert("Woohoo!");},
			buttonParameters: UI.button()
		},
		{
			name: "PROJ",
			response: function(){},
			buttonParameters: UI.button()
		},
		{
			name: "CONT",
			response: function(){},
			buttonParameters: UI.button()
		},
		{
			name: "RADIO",
			response: function(){},
			buttonParameters: UI.button()
		}
	],
	
	draw: function(){
		Artist.draw("header-line", null);
		for (var buttonIndex = 0; buttonIndex < this.buttons.length; buttonIndex++){
			var centeredPosition = ApplicationRunner.canvas.width/2 - this.buttons.length*(this.buttons[0].buttonParameters.buttonBox.width + this.buttons[0].buttonParameters.offset.x)/2;
			this.buttons[buttonIndex].buttonParameters.buttonBox.x = centeredPosition + buttonIndex*this.buttons[buttonIndex].buttonParameters.buttonBox.width + this.buttons[buttonIndex].buttonParameters.offset.x*buttonIndex;
			this.buttons[buttonIndex].buttonParameters.buttonBox.y = 0;
			this.buttons[buttonIndex].buttonParameters.text.value = this.buttons[buttonIndex].name;
			Artist.draw("header-button", this.buttons[buttonIndex].buttonParameters);
		}
		
	}	
};

UI.stats = {
	items: [
		{
			name: "Strength",
			response: null,
			buttonParameters: UI.button()
		},
		{
			name: "Perception",
			response: null,
			buttonParameters: UI.button()
		},
		{
			name: "Endurance",
			response: null,
			buttonParameters: UI.button()
		},
		{
			name: "Charisma",
			response: null,
			buttonParameters: UI.button()
		},
		{
			name: "Agility",
			response: null,
			buttonParameters: UI.button()
		},
		{
			name: "Luck",
			response: null,
			buttonParameters: UI.button()
		}
	],
	
	draw: function(){
		this.items[0].buttonParameters.selected = true;
		for (var itemIndex = 0; itemIndex < this.items.length; itemIndex++){
			this.items[itemIndex].buttonParameters.buttonBox.width = 400;
			var centeredPosition = ApplicationRunner.canvas.width/2 - UI.stats.items[0].buttonParameters.buttonBox.width;
			this.items[itemIndex].buttonParameters.buttonBox.x = centeredPosition;
			this.items[itemIndex].buttonParameters.buttonBox.y = UI.header.buttons[0].buttonParameters.buttonBox.height*2 + itemIndex*this.items[itemIndex].buttonParameters.buttonBox.height + this.items[itemIndex].buttonParameters.offset.y*itemIndex;
			
			this.items[itemIndex].buttonParameters.buttonBox.fillStyle.selected = "#69FB8F";
			this.items[itemIndex].buttonParameters.text.value = this.items[itemIndex].name;
			this.items[itemIndex].buttonParameters.text.fillStyle.selected = "#2D3129";
			this.items[itemIndex].buttonParameters.value = "50";
			Artist.draw("item-button", this.items[itemIndex].buttonParameters);
		}
	}
};
*/
/*
*  ARTIST 
*  Purpose: Responsible for drawing the UI components
*/
function Artist(context, applicationRunnerContext){
    return {
        context: context,
        globalStyle: {
            background: {
                color: '#2D3129'
            },
            header: {
                lineWidth: applicationRunnerContext.canvas.width
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
                    size: '30px',
                    font: 'Arial Narrow'
                },
                position: {x: 0, y: 0},
                size: {width: 200, height: 80},
                offset: 10
            },
            listMenuButton: {
                text: {
                    size: '20px',
                    font: 'Arial Narrow'
                },
            },
            content: {
                size: '18px',
                font: 'Arial Narrow'
            }
        },
        initialize: function(){
          this.context.lineWidth = 2;
        },
        wrapText: function(text, x, y, maxWidth, lineHeight) {
            this.context.font = this.globalStyle.content.size + " " + this.globalStyle.content.font;
            var words = text.split(' ');
            var line = '';
        
            for(var n = 0; n < words.length; n++) {
              var testLine = line + words[n] + ' ';
              var metrics = this.context.measureText(testLine);
              var testWidth = metrics.width;
              if (testWidth > maxWidth && n > 0) {
                this.context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
              }
              else {
                line = testLine;
              }
            }
            this.context.fillText(line, x, y);
        },
        draw: function(type, name, index, selected){
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
        		case "header-button":
        		    var x = this.globalStyle.headerButton.position.x;
        		    var y = this.globalStyle.headerButton.position.y;
        		    var width = this.globalStyle.headerButton.size.width;
        		    var height = this.globalStyle.headerButton.size.height;
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
        				this.context.moveTo(x + width*index, y + height);
        				this.context.lineTo(x + width*index + width, y + height/2);
        				this.context.stroke();
        			}
        			// Text
        			this.context.fillStyle = this.globalStyle.button.text.color.selected;
        			this.context.font = this.globalStyle.headerButton.text.size + " " + this.globalStyle.headerButton.text.font;
        			this.context.fillText(name, x + width*index + 5, y + 30);
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
        		case "header-line":
        			this.context.beginPath();
        			this.context.strokeStyle = "#69FB8F";
        			this.context.moveTo(0,39);
        			this.context.lineTo(this.globalStyle.header.lineWidth, 39);
        			this.context.stroke();
        			break;
        	}
        }
    };
}