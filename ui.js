var json = [
    {
        "STATS": [
            {
                "Problem Solving": {
                    rating: "80/100",
                    imageId: "problem-solving",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box. This canvas based website proved to be problematic, but careful examination of technologies and breaking problems into subproblems made it possible."
                }
            },
            {
                "Communication": {
                    rating: "75/100",
                    imageId: "communication",
                    text: "Great written and verbal communication skills. Empathic listener and persuasive speaker. Excellecnt presentation skills."
                }
            },
            {
                "Swiftness": {
                    rating: "90/100",
                    imageId: "swiftness",
                    text: "I rapidly grasp new concepts and ideas and acquire new skills. In order to build this website, I had to learn both 2d and webgl contexts for HTML5 canvas. "
                }
            },
            {
                "Curiosity": {
                    rating: "80/100",
                    imageId: "curriosity",
                    text: "I am very curious about new technologies and like to get my hands on them."
                }
            },
            {
                "Knowledge": {
                    rating: "80/100",
                    imageId: "knowledge",
                    text: "I am knowledgable about computers and programming. I understand computers as systems and able to work with fundamentals."
                }
            },
            {
                "Personality": {
                    rating: "80/100",
                    imageId: "personality",
                    text: "I am a very loyal, respectful and responsible individual. I value the team I am working in as much as getting things done."
                }
            }
        ]
    },
    {
        "SKILLS": [
            {
                "HTML5": {
                    imageId: "3DCanvas",
                    text: "I have significant experience bootstrapping HTML5 websites and making robust cross-browser experiences."
                }
            },
            {
                "JavaScript": {
                    imageId: "3DCanvas",
                    text: "The Web is speaking JavaScript and so do I. I love JavaScript for what it is and I learned how to avoid the 'not so well' designed features of the language."
                }
            },
            {
                "jQuery": {
                    imageId: "3DCanvas",
                    text: "As a higher level framework for front-end, I choose jQuery. It has limiteless capability and it feels like JavaScript gravy."
                }
            },
            {
                "NodeJS": {
                    imageId: "3DCanvas",
                    text: "I like having NodeJS on the backend. It is a great backend runtime environment, and it is non blocking for users which makes it stand out."
                }
            },
            {
                "CSS": {
                    imageId: "3DCanvas",
                    text: "Strong problem solving skills. Not afraid tackling new problems and think outside the box."
                }
            },
            {
                "MongoDB": {
                    imageId: "3DCanvas",
                    text: "I can't imaging working on the backend without mongo. Mongo and Node.js are unseparable for me.  "
                }
            }
        ]
    },
    {
        "PROJECTS": [
            {
                "Shmetterling": {
                    imageId: "shmetterling",
                    text: "Shmetterling is a web application I wrote on the 2015 local hack day. It's purpose is to create music-video 'radio' stations and free you of the need to create playlists on youtube. It uses Spotify and YouTube API."
                }
            },
            {
                "FeedMeWell": {
                    imageId: "feedmewell",
                    text: "FeedMeWell is an app that aims to order you food from local restaurants based on the calorie demands you have."
                }
            },
            {
                "Pictures of You": {
                    imageId: "pictures-of-you",
                    text: "Pictures of You was my final project for the computer graphics class. While creating this project I got to examine webgl from the very bottom up to post-processing."
                }
            },
            {
                "CashTagCU": {
                    imageId: "cashtagcu",
                    text: "CashtagCU was my first official Three.js project, in which I use CSS3D renderer to display tiles with Twits onto 3d space."
                }
            },
            {
                "iGem 2014": {
                    imageId: "igem",
                    text: "iGem 2014 was a website designed for the synthetic biology competition. It was tailored such that it can be displayed in a wiki format for easy modification."
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
        var headerKey, listMenuKey, listMenuObject;
        // HEADER MENU
        $.each(json, function(value){
            headerKey = getKey(json[value]);
            if (UI.head == null) {
                // null <- [ head | tail ] -> null
                UI.head = UI.tail = HeaderButton(headerKey, null, null);
                // LIST MENU
                $.each(json[value][UI.head.name], function(listMenuIndex){
                    listMenuObject = json[value][headerKey][listMenuIndex];
                    listMenuKey = getKey(json[value][headerKey][listMenuIndex]);
                    if (UI.head.listHead == null){
                        // [ HeaderButton ] -> [ List Head ]
                        // null <- [ List Head | List Tail ] -> null
                        UI.tail.listHead = UI.tail.listTail = ListMenuButton(listMenuKey, null, null);
                        // Set content
                        UI.tail.listHead.text = listMenuObject[listMenuKey].text;
                        UI.tail.listHead.imageId = listMenuObject[listMenuKey].imageId;
                    }
                    else {
                        // null <- [ List Head | List Tail ] <- [ ListMenuButton ] -> null
                        var newListMenuButton = ListMenuButton(listMenuKey, UI.tail.listTail, null);
                        // null <- [ List Head | List Tail ] <-> [ ListMenuButton ] -> null
                        UI.tail.listTail.nextButton = newListMenuButton;
                        // null <- [ List Head ] <-> [ ListMenuButton | List Tail ] -> null
                        UI.tail.listTail = newListMenuButton;
                        // Set content
                        newListMenuButton.text = listMenuObject[listMenuKey].text;
                        newListMenuButton.imageId = listMenuObject[listMenuKey].imageId;
                    }
                    //console.log(UI.tail.listTail);
                });
            }
            else {
                // null <- [ head | tail ] <- [ newHeaderButton ] -> null
                var newHeaderButton = HeaderButton(Object.keys(json[value])[0], UI.tail, null);
                // null <- [ head | tail ] <-> [ newHeaderButton ] -> null
                UI.tail.nextButton = newHeaderButton;
                // null <- [ head ] <-> [ newHeaderButton | tail ] -> null
                UI.tail = newHeaderButton;
                // LIST MENU
                $.each(json[value][UI.tail.name], function(listMenuIndex){
                    if (headerKey == "CONTACT") return; // CONTACT has non-formal structure, should be handled separtely
                    listMenuObject = json[value][headerKey][listMenuIndex];
                    listMenuKey = getKey(json[value][headerKey][listMenuIndex]);
                    if (UI.tail.listHead == null){
                        // [ HeaderButton ] -> [ List Head ]
                        // null <- [ List Head | List Tail ] -> null
                        UI.tail.listHead = UI.tail.listTail = ListMenuButton(listMenuKey, null, null);
                        // Set content
                        UI.tail.listHead.text = listMenuObject[listMenuKey].text;
                        UI.tail.listHead.imageId = listMenuObject[listMenuKey].imageId;
                    }
                    else {
                        // null <- [ List Head | List Tail ] <- [ ListMenuButton ] -> null
                        var newListMenuButton = ListMenuButton(listMenuKey, UI.tail.listTail, null);
                        // null <- [ List Head | List Tail ] <-> [ ListMenuButton ] -> null
                        UI.tail.listTail.nextButton = newListMenuButton;
                        // null <- [ List Head ] <-> [ ListMenuButton | List Tail ] -> null
                        UI.tail.listTail = newListMenuButton;
                        // Set content
                        newListMenuButton.text = listMenuObject[listMenuKey].text;
                        newListMenuButton.imageId = listMenuObject[listMenuKey].imageId;
                    }
                    //console.log(UI.tail.listTail);
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
            getLength: function(){
              var counter = 0;
              var currentButton = this;
              while (currentButton != null){
                  currentButton = currentButton.nextButton;
                  counter++;
              }
              return counter;
            },
            selectNext: function(){
                var selectedButton;
                this.nextButton == null?selectedButton=UI.head:selectedButton=this.nextButton;
    			
    			return selectedButton;
            },
            selectPrev: function(){
                var selectedButton;
                this.prevButton == null?selectedButton=UI.tail:selectedButton=this.prevButton;
    			
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
            text: "",
            imageId: "",
            draw: function(){
                
            },
            selectNext: function(head){
                var selectedButton;
                this.nextButton == null?selectedButton=head:selectedButton=this.nextButton;
    			return selectedButton;
            },
            selectPrev: function(tail){
                var selectedButton;
                this.prevButton == null?selectedButton=tail:selectedButton=this.prevButton;
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