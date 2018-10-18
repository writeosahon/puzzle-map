/**
 * Created by UTOPIA SOFTWARE on 26/7/2018.
 */

/**
 * file defines all View-Models, Controllers and Event Listeners used by the app
 *
 * The 'utopiasoftware_app_namespace' namespace variable has being defined in the base js file.
 * The author uses the terms 'method' and function interchangeably; likewise the terms 'attribute' and 'property' are
 * also used interchangeably
 */

// define the controller namespace
utopiasoftware[utopiasoftware_app_namespace].controller = {


    /**
     * method contains the stratup/bootstrap code needed to initiate app logic execution
     */
    startup: function(){

        // initialise the app libraries and plugins
        ons.ready(async function () {
            // set the default handler for the app
            ons.setDefaultDeviceBackButtonListener(function(){
                // does nothing for now!!
            });

            // create the view-reports-additional menu popover
            // await ons.createPopover("view-reports-additional-menu-popover-template");

            // displaying prepping message
            $('#loader-modal-message').html("Loading Puzzle...");
            $('#loader-modal').get(0).show(); // show loader

            if(true){ // there is a previous logged in user
                // load the app main page
                $('ons-splitter').get(0).content.load("app-main-template");
            }
            else{ // there is no previously logged in user
                // load the login page
                $('ons-splitter').get(0).content.load("login-template");
            }

            // START ALL CORDOVA PLUGINS CONFIGURATIONS
            try{
                // lock the orientation of the device to 'PORTRAIT'
                screen.orientation.lock('portrait');
            }
            catch(err){}

            try{
                await new Promise(function(resolve, reject){
                    // Hide system UI and keep it hidden
                    AndroidFullScreen.immersiveMode(resolve, reject);
                });
            }
            catch(err){}

            try { // START ALL THE CORDOVA PLUGINS CONFIGURATION WHICH REQUIRE PROMISE SYNTAX
            }
            catch(err){
                console.log("APP LOADING ERROR", err);
            }
            finally{
                 // set status bar color
                 StatusBar.backgroundColorByHexString("#363E7C");
                 navigator.splashscreen.hide(); // hide the splashscreen
                 utopiasoftware[utopiasoftware_app_namespace].model.isAppReady = true; // flag that app is fully loaded and ready
            }

        }); // end of ons.ready()

    },


    /**
     * this is the view-model/controller for the Puzzle Levels page
     */
    puzzleLevelsPageViewModel: {

        /**
         * property is an object that holds configuration set up for the app
         */
        gameConfigObject: null,

        /**
         * property flags if the audio effects and sounds are ready to be
         */
        isAudioReady: false,

        /**
         * event is triggered when page is initialised
         */
        pageInit: function(event){

            var $thisPage = $(event.target); // get the current page shown

            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");

            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();

            //function is used to initialise the page if the app is fully ready for execution
            async function loadPageOnAppReady(){
                // check to see if onsen is ready and if all app loading has been completed
                if(!ons.isReady() || utopiasoftware[utopiasoftware_app_namespace].model.isAppReady === false){
                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                    return;
                }

                // listen for the back button event
                $('#app-main-navigator').get(0).topPage.onDeviceBackButton =
                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.backButtonClicked;

                // get the app game config from the stored json data
                let serverResponse = await Promise.resolve($.ajax(
                    {
                        url: "game-config.json",
                        type: "get",
                        contentType: false,
                        dataType: "text",
                        timeout: 240000, // wait for 4 minutes before timeout of request
                        processData: false
                    }
                ));

                utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.gameConfigObject =
                    JSON.parse(serverResponse); // convert the response to JSON object

                let puzzleLevelContent = ""; // holds the contents to for the levels

                // create the puzzle levels board/content
                for(let index = 1; index <= utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzleLevelsPageViewModel.gameConfigObject["config"]["total_levels"]; index++){
                    puzzleLevelContent +=
                        `<div class="col-xs-1" style="margin-top: 1em;"></div>
                            <div class="col-xs-3" style="margin-top: 1em;"
                            onclick="utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.
                            loadPuzzleLevel(${index})">
                            <ons-ripple></ons-ripple>
                            <img src="game-puzzle/level-${index}-puzzle-completed.png" style="width: 90%; height: auto;">
                            <span style="display: block; width: 100%; text-align: justify; font-size: 0.9em; color: #F4C724;
                            text-shadow: -1px -1px 2px #000000;">
                            LEVEL 1
                            </span>
                        </div>`;
                }

                $('#puzzle-levels-page #puzzle-levels-container').html(puzzleLevelContent); // append the content to the page

                // add background tune
                try{

                    await new Promise(function(resolve, reject){
                        window.plugins.NativeAudio.preloadComplex('puzzle-levels-background', 'audio/puzzles-select-level-background.mp3',
                            1, 1, 0, resolve, reject);
                    });
                }
                catch(err){
                    console.log(err);
                }

                // start playing background tune in a loop
                try{
                    await new Promise(function(resolve, reject){
                        window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, reject);
                    });
                }
                catch(err){
                    console.log(err);
                }


                await $('#loader-modal').get(0).hide(); // hide loader

                // set that audio use is ready
                utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzleLevelsPageViewModel.isAudioReady = true;
            }

        },

        /**
         * method is triggered when page is shown
         */
        pageShow: function(){
            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");

            // adjust the window/view-port settings for when the soft keyboard is displayed
            //window.SoftInputMode.set('adjustPan'); // let the window/view-port 'pan' when the soft keyboard is displayed

            // check that audio is ready
            if(utopiasoftware[utopiasoftware_app_namespace].controller.
                puzzleLevelsPageViewModel.isAudioReady === true){
                // play audio
                new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, reject);
                });
            }
        },


        /**
         * method is triggered when page is hidden
         */
        pageHide: function(){
            // adjust the window/view-port settings for when the soft keyboard is displayed
            // window.SoftInputMode.set('adjustResize'); // let the view 'resize' when the soft keyboard is displayed

            // stop playing the background music
            new Promise(function(resolve, reject){
                window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, reject);
            });
        },

        /**
         * method is triggered when page is destroyed
         */
        pageDestroy: function(){

        },


        /**
         * method is triggered when the device back button is clicked OR a similar action is triggered
         */
        async backButtonClicked(){

            // toggle the side-menu i.e. the puzzle menu
            await $('#side-menu').get(0).toggle();
        },

        /**
         * method is used to load the puzzle level details
         */
        async loadPuzzleLevel(levelNumber){
            // displaying prepping message
            $('#loader-modal-message').html("Loading Puzzle Level...");
            await $('#loader-modal').get(0).show(); // show loader

            // stop playing the background music
            await new Promise(function(resolve, reject){
                window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, reject);
            });

            // load the puzzle level page with the required page data
            await $('#app-main-navigator').get(0).pushPage("puzzle-page.html", {
                data: {puzzleData: {levelNumber: levelNumber}}});
        }
    },


    /**
     * this is the view-model/controller for the Puzzle page
     */
    puzzlePageViewModel: {

        draggableDroppableObject: null,
        dragStartSource: null,
        jqueryDropZone: null,
        dragStartContainer: null,
        moveCounter: 0,
        puzzleTimer: null,
        puzzleAnswerSheetMap: null,
        puzzleCompleted: false,


        /**
         * event is triggered when page is initialised
         */
        pageInit: function(event){

            var $thisPage = $(event.target); // get the current page shown

            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");

            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();

            //function is used to initialise the page if the app is fully ready for execution
            async function loadPageOnAppReady(){
                // check to see if onsen is ready and if all app loading has been completed
                if(!ons.isReady() || utopiasoftware[utopiasoftware_app_namespace].model.isAppReady === false){
                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                    return;
                }

                // listen for the back button event
                $('#app-main-navigator').get(0).topPage.onDeviceBackButton =
                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.backButtonClicked;

                // add puzzle level background tune
                try{

                    await new Promise(function(resolve, reject){
                        window.plugins.NativeAudio.preloadComplex('puzzle-background', 'audio/puzzle-level-background.mp3',
                            1, 1, 0, resolve, reject);
                    });
                }
                catch(err){
                    console.log(err);
                }

                // start playing background tune in a loop
                try{
                    await new Promise(function(resolve, reject){
                        window.plugins.NativeAudio.loop('puzzle-background', resolve, reject);
                    });
                }
                catch(err){
                    console.log(err);
                }

                // create the Draggable.Droppable object
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject =
                    new Draggable.Droppable([...$('#puzzle-page .puzzle-pieces-container').get()],
                        {
                            draggable: 'img.puzzle-pieces',
                            scrollable: {
                                sensitivity: 30,
                                scrollableElements: [...$('#puzzle-page .puzzle-pieces-carousel').get()]
                            },
                            mirror: {
                                constrainDimensions: false,
                                appendTo: 'body'
                            },
                            dropzone: $('#puzzle-page .puzzle-drop-zone').get()
                        }).
                    removePlugin(Draggable.Plugins.Focusable).
                    on("drag:start", function(dragStartEvent){
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartSource = $(dragStartEvent.source);
                    }).
                    on("droppable:start", function(droppableStartEvent){
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer = $(droppableStartEvent.dropzone);
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp = Date.now();
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.puzzleDropped = false;

                        if(! utopiasoftware[utopiasoftware_app_namespace].controller.
                        puzzlePageViewModel.dragStartContainer.is('.puzzle-pieces-tray')){
                            let puzzleSlotValue = utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.attr('data-puzzle-slot');
                            // remove all animation from the container
                            $(`.puzzle-drop-zone[data-puzzle-slot="${puzzleSlotValue}"]`, $thisPage).
                            removeClass("animated shake pulse");
                        }
                    }).
                    on("droppable:dropped", function(droppableDroppedEvent){
                        console.log("DROP ZONE", droppableDroppedEvent.dropzone);

                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.jqueryDropZone = $(droppableDroppedEvent.dropzone);
                        let puzzleSlotValue = null;

                        if(utopiasoftware[utopiasoftware_app_namespace].controller.
                        puzzlePageViewModel.jqueryDropZone.is('.puzzle-pieces-tray')){
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = true;

                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDropped = false;
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp = 0;
                        }
                        else{
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = false; // set puzzle tray to false

                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDropped = true;
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp =
                                utopiasoftware[utopiasoftware_app_namespace].controller.
                                    puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp;
                        }
                    }).
                    on("droppable:stop", function(droppableStopEvent){

                        if(utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDropped === true &&
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp ===
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp){

                            let puzzleSlotValue = $(droppableStopEvent.dropzone).attr('data-puzzle-slot');


                            if(utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartSource.attr('data-puzzle-slot') == puzzleSlotValue){
                                // add positive animation to container
                                $(`.puzzle-drop-zone[data-puzzle-slot="${puzzleSlotValue}"]`, $thisPage).
                                addClass("animated pulse");

                                // update the puzzleAnswerSheet map object to indicate this answer was correct
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.
                                set(puzzleSlotValue, true);

                                // call the method to check the users answer sheet
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.checkAnswerSheet();
                            }
                            else{
                                // add negative animation to container
                                $(`.puzzle-drop-zone[data-puzzle-slot="${puzzleSlotValue}"]`, $thisPage).
                                addClass("animated shake");

                                // update the puzzleAnswerSheet map object to indicate this answer was wrong
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.
                                set(puzzleSlotValue, false);
                            }
                        }

                        /*if(! $(droppableStopEvent.dropzone).is('.puzzle-pieces-tray')){
                            let puzzleSlotValue = $(droppableStopEvent.dropzone).attr('data-puzzle-slot');


                            if(utopiasoftware[utopiasoftware_app_namespace].controller.
                                samplePuzzlePageViewModel.dragStartSource.attr('data-puzzle-slot') == puzzleSlotValue){
                                // add positive animation to container
                                $(`.puzzle-drop-zone[data-puzzle-slot="${puzzleSlotValue}"]`, $thisPage).
                                addClass("animated pulse");
                            }
                        }*/
                    }).
                    on("droppable:dropped", function(droppableDroppedEvent){
                        console.log("DROP ZONE", droppableDroppedEvent.dropzone);

                        // increase the move counter value by 1
                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter += 1;
                        // display the new value of the move counter to the user
                        $('#puzzle-page .puzzle-moves-counter').
                        html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter);
                    });

                // instantiate the puzzleAnswerSheet js Map
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap =
                    new Map();
                for(let index = 0; index < 3; index++){
                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.
                    set(("" + (index + 1)), false);
                }

                // create the Puzzle Timer object
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer = new Timer();
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.
                start({startValues: {secondTenths: 0, seconds: 0, minutes: 0, hours: 0, days: 0},
                    precision: 'secondTenths'});
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();

                // add event listener for when timer value is updated
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.
                addEventListener("secondTenthsUpdated", function(timer){
                    $('#puzzle-page .puzzle-timer-counter').
                    html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.
                    getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
                });

                // add event listener for when timer value is stopped
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.
                addEventListener("paused", function(timer){

                    // check if puzzle has been completed
                    if(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                        puzzleCompleted !== true){ // puzzle has not been completed, so exit method
                        return;
                    }
                    // update the contents of the level completed modal
                    $('#puzzle-level-complete-modal .level-time').html(
                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.
                        getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths'])
                    );
                    $('#puzzle-level-complete-modal .level-moves').html(
                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter
                    );

                    // show the level completed modal
                    $('#puzzle-level-complete-modal').get(0).show();
                });


                // pause the puzzle level in order to begin. level starts when user hits "Continue" button
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.pausePuzzleLevel();
                $('#loader-modal').get(0).hide(); // hide loader
            }

        },

        /**
         * method is triggered when page is shown
         */
        pageShow: function(){
            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");

            // adjust the window/view-port settings for when the soft keyboard is displayed
            //window.SoftInputMode.set('adjustPan'); // let the window/view-port 'pan' when the soft keyboard is displayed
        },


        /**
         * method is triggered when page is hidden
         */
        pageHide: function(){
            // adjust the window/view-port settings for when the soft keyboard is displayed
            // window.SoftInputMode.set('adjustResize'); // let the view 'resize' when the soft keyboard is displayed
        },

        /**
         * method is triggered when page is destroyed
         */
        pageDestroy: function(){

        },


        /**
         * method is triggered when the device back button is clicked OR a similar action is triggered
         */
        async backButtonClicked(){

            // check if the side menu is open
            if($('ons-splitter').get(0).right.isOpen){ // side menu open, so close it
                $('ons-splitter').get(0).right.close();
                return; // exit the method
            }

            // todo REMOVE THIS NEXT LINE LATER flag that puzzle has NOT been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleCompleted = false;
            // pause puzzle timer
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();

            ons.notification.confirm('Do you want to close the app?', {title: 'Exit App',
                buttonLabels: ['No', 'Yes'], modifier: 'utopiasoftware-alert-dialog'}) // Ask for confirmation
                .then(function(index) {
                    if (index === 1) { // OK button
                        navigator.app.exitApp(); // Close the app
                    }
                    else{
                        // resume the puzzle timer
                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start();
                    }
                });
        },

        /**
         * method is used to check the status of the users puzzle answer sheet.
         * if all puzzle pieces have been place correctly, then the level is completed
         * @returns {Promise<void>}
         */
        async checkAnswerSheet(){

            // update the puzzleAnswerSheet map object to indicate this answer was correct
            for(let entry of utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleAnswerSheetMap){
                if(entry[1] === false){ // an answer is still wrong
                    // flag that puzzle has NOT been completed
                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                        puzzleCompleted = false;
                    return;
                }
            }

            // flag that puzzle has been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleCompleted = true;
            // stop the entire to indicate that puzzle has completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();
            return;
        },


        async pausePuzzleLevel(){

            // pause puzzle timer
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();
            // show the pause-puzzle-modal
            await $('#pause-puzzle-modal').get(0).show();
        },

        async resumePuzzleLevel(){

            // hide the pause-puzzle-modal
            await $('#pause-puzzle-modal').get(0).hide();
            // resume puzzle timer
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start();
        }

    },

};


