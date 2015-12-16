var json = [
    {
        "STATS": [
            {
                "Problem Solving": {
                    rating: "80/100",
                    imageId: "problem-solving",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "Communication": {
                    rating: "75/100",
                    imageId: "communication",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "Swiftness": {
                    rating: "90/100",
                    imageId: "swiftness",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "Curiosity": {
                    rating: "80/100",
                    imageId: "problem-solving",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "Knowledge": {
                    rating: "80/100",
                    imageId: "problem-solving",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "Personality": {
                    rating: "80/100",
                    imageId: "problem-solving",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            }
        ]
    },
    {
        "SKILLS": [
            {
                "HTML5": {
                    imageId: "html5",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "JavaScript": {
                    imageId: "javascript",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "jQuery": {
                    imageId: "jquery",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "NodeJS": {
                    imageId: "nodejs",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "CSS": {
                    imageId: "css",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "MongoDB": {
                    imageId: "mongodb",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            }
        ]
    },
    {
        "PROJECTS": [
            {
                "Shmetterling": {
                    imageId: "shmetterling",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "FeedMeWell": {
                    imageId: "feedmewell",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "Pictures of You": {
                    imageId: "pictures-of-you",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "CashTagCU": {
                    imageId: "cashtagcu",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "iGem 2014": {
                    imageId: "igem",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            }
        ]
    },
    {
        "CONTACT": {
            imageId: "contact",
            text: "Thank You for Visiting my Page!",
            email: "kirill.novik.csci@gmail.com",
            cell: "(720) 378-1745",
            github: "kino6052"
        }
    }
]

	/*
    *  UI 
    *  Purpose: Modular object that allows to easy modify parameters of UI components
    */
    var UI = {
        head: null, // head is helpful when you go in the tail direction and reach tail, selected item will be restarted at the head
        tail: null  // tail is helpful when you go in the head direction and reach head, selected item will be restarted at the tail
    };
    
    
    /*
     * Creates Linked List of Interconnected Buttons
     */
    UI.createGraphFromJSON = function(){ // TODO: Look into making this code more modular and readable
        var headerKey, listMenuKey;
        $.each(json, function(value){
            headerKey = getKey(json[value]);
            if (UI.head == null) {
                // null <- [ head | tail ] -> null
                UI.head = UI.tail = HeaderButton(headerKey, null, null);
                $.each(json[value][UI.head.name], function(listMenuIndex){
                    listMenuKey = getKey(json[value][headerKey][listMenuIndex]);
                    if (UI.head.listHead == null){
                        // [ HeaderButton ] -> [ List Head ]
                        // null <- [ List Head | List Tail ] -> null
                        UI.tail.listHead = UI.tail.listTail = ListMenuButton(listMenuKey, null, null);
                    }
                    else {
                        // null <- [ List Head | List Tail ] <- [ ListMenuButton ] -> null
                        var newListMenuButton = ListMenuButton(listMenuKey, UI.tail.listTail, null);
                        // null <- [ List Head | List Tail ] <-> [ ListMenuButton ] -> null
                        UI.tail.listTail.nextButton = newListMenuButton;
                        // null <- [ List Head ] <-> [ ListMenuButton | List Tail ] -> null
                        UI.tail.listTail = newListMenuButton;
                    }
                    console.log(UI.tail.listTail);
                });
            }
            else {
                // null <- [ head | tail ] <- [ newHeaderButton ] -> null
                var newHeaderButton = HeaderButton(Object.keys(json[value])[0], UI.tail, null);
                // null <- [ head | tail ] <-> [ newHeaderButton ] -> null
                UI.tail.nextButton = newHeaderButton;
                // null <- [ head ] <-> [ newHeaderButton | tail ] -> null
                UI.tail = newHeaderButton;
                $.each(json[value][UI.tail.name], function(listMenuIndex){
                    if (headerKey == "CONTACT") return; // CONTACT has non-formal structure, should be handled separtely
                    listMenuKey = getKey(json[value][headerKey][listMenuIndex]);
                    if (UI.tail.listHead == null){
                        // [ HeaderButton ] -> [ List Head ]
                        // null <- [ List Head | List Tail ] -> null
                        UI.tail.listHead = UI.tail.listTail = ListMenuButton(listMenuKey, null, null);
                    }
                    else {
                        // null <- [ List Head | List Tail ] <- [ ListMenuButton ] -> null
                        var newListMenuButton = ListMenuButton(listMenuKey, UI.tail.listTail, null);
                        // null <- [ List Head | List Tail ] <-> [ ListMenuButton ] -> null
                        UI.tail.listTail.nextButton = newListMenuButton;
                        // null <- [ List Head ] <-> [ ListMenuButton | List Tail ] -> null
                        UI.tail.listTail = newListMenuButton;
                    }
                    console.log(UI.tail.listTail);
                });
            }
        });
    };
    
    /*
     * Header Button
     */
    function HeaderButton(name, prev, next){
        return {
            name: name,
            prevButton: prev,
            nextButton: next,
            listHead: null, // head is helpful when you go in the tail direction and reach tail, selected item will be restarted at the head
            listTail: null, // tail is helpful when you go in the head direction and reach head, selected item will be restarted at the tail
            draw: function(){
                
            },
            selectNext: function(){
                var selectedButton;
                this.nextButton == null?selectedButton=UI.head:selectedButton=this.nextButton;
    			alert(selectedButton.name);
    			return selectedButton;
            },
            selectPrev: function(){
                var selectedButton;
                this.prevButton == null?selectedButton=UI.tail:selectedButton=this.prevButton;
    			alert(selectedButton.name);
    			return selectedButton;
            }
        };
    }
    
    /*
     * List Menu Button
     */
    function ListMenuButton(name, prev, next){
        return {
            name: name,
            prevButton: prev,
            nextButton: next,
            draw: function(){
                
            },
            selectNext: function(head){
                var selectedButton;
                this.nextButton == null?selectedButton=head:selectedButton=this.nextButton;
    			alert(selectedButton.name);
    			return selectedButton;
            },
            selectPrev: function(tail){
                var selectedButton;
                this.prevButton == null?selectedButton=tail:selectedButton=this.prevButton;
    			alert(selectedButton.name);
    			return selectedButton;
            }
        };
    }
    
    /*
     * Helper Functions
     */
    function getKey(object){
        return Object.keys(object)[0];
    }
    
    UI.createGraphFromJSON();