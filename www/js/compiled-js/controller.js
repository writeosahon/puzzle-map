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
     * create the LifeCycle object for managing different app states
     */
    appLifeCycleObservable: new Lifecycle({},
                                    ["puzzle-menu:opened", "puzzle-menu:closed", "puzzle-menu:exit-clicked",
                                    "app:will-exit", "app:no-exit", "app:exited"], {
                                    autoStart: false, autoEmit: false, autoEnd: false}).start(),

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
     * this is the view-model/controller for the Puzzle Menu page
     */
    puzzleMenuPageViewModel: {


        /**
         * event is triggered when page is initialised
         */
        pageInit: function(event){

        },

        /**
         * method is triggered when page is shown
         */
        pageShow: function(){
        },


        /**
         * method is triggered when page is hidden
         */
        pageHide: async function(){
        },

        /**
         * method is triggered when page is destroyed
         */
        pageDestroy: function(){

        },


        /**
         * method is triggered whenever the puzzle menu is opened
         */
        async puzzleMenuOpened(){
            // flag that the puzzle menu has been opened
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:opened");
            // call all the listeners registered for this lifecycle stage
            return new Promise(function(resolve, reject){

                setTimeout(function(){
                    // return the values gotten from the registered listeners as the resolved value of the Promise
                    resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                    emit("puzzle-menu:opened", []));
                }, 0);
            });
        },

        /**
         * method is triggered whenever the puzzle menu is closed
         */
        async puzzleMenuClosed(){
            // flag that the puzzle menu has been closed
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:closed");
            // call all the listeners registered for this lifecycle stage
            return new Promise(function(resolve, reject){

                setTimeout(function(){
                    // return the values gotten from the registered listeners as the resolved value of the Promise
                    resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                    emit("puzzle-menu:closed", []));
                }, 0);
            });
        },

        /**
         * method is used to listener for when the Exit Button on the menu is clicked
         * @returns {Promise<void>}
         */
        async exitButtonClicked(){
            // flag that Exit Button on the puzzle menu has been clicked
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:exit-clicked");

            // call all the listeners registered for this lifecycle stage
            await new Promise(function(resolve, reject){

                setTimeout(function(){
                    // return the values gotten from the registered listeners as the resolved value of the Promise
                    resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                    emit("puzzle-menu:exit-clicked", []));
                }, 0);
            });

            let exitIndex = -1; // holds the exit index gotten from the user's confirmation of exit


            // flag that the app will soon exit if the listeners do not prevent it
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("app:will-exit");

            // call all the listeners registered for this lifecycle stage
            let willExitEvent = await new Promise(function(resolve, reject){
                setTimeout(function(){
                    // lifecycle event object.
                    // listeners can cancel the event that logically follows by setting its cancel property to true
                    let eventObject = {};
                    // define properties for the event object
                    eventObject = Object.defineProperties(eventObject, {
                        "canCancel": {
                            value: true,
                            enumerable: true,
                            configurable: false,
                            writable: false
                        },
                        "isCanceled": {
                            get: function(){
                                return typeof this.cancel === "boolean" ? this.cancel : new Boolean(this.cancel).valueOf();
                            }.bind(eventObject),
                            set: function(cancellation){},
                            enumerable: true,
                            configurable: false
                        },
                        "cancel": {
                            value: false,
                            enumerable: true,
                            configurable: false,
                            writable: true
                        },
                        "warningMessage": {
                            enumerable: true,
                            configurable: false,
                            writable: true
                        }
                    });

                    // emit the lifecycle stage event to the listeners
                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                    emit("app:will-exit", [eventObject]);
                    // resolve this promise with the event object
                    console.log("Event Object ", eventObject);
                    resolve(eventObject);
                }, 0); // end of setTimeout
            });

            console.log("Event Object 2 ", willExitEvent);
            // check if any listener whens to forestall an exit
            if(willExitEvent.isCanceled === true){ // listener wants it canceled
                exitIndex = await ons.notification.confirm('',
                    {title: '<ons-icon icon="md-alert-triangle" style="color: #3f51b5" size="33px"></ons-icon> <span style="color: #3f51b5; display: inline-block; margin-left: 1em;">Warning</span>',
                        messageHTML: `${willExitEvent.warningMessage}<br><br>Do you want to close the app?`,
                        buttonLabels: ['No', 'Yes'], modifier: 'utopiasoftware-alert-dialog'});
            }
            else{ // no listener wants to cancel, so find out directly from user if they want to exit
                exitIndex = await ons.notification.confirm('Do you want to close the app?', {title: 'Exit App',
                    buttonLabels: ['No', 'Yes'], modifier: 'utopiasoftware-alert-dialog'}); // Ask for confirmation
            }

            // check if the user decided to exit the app
            if (exitIndex === 1) { // user want to exit
                // flag that the app has exited
                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("app:exited");
                // notify all listeners that app has exited
                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                emit("app:exited", []);
                navigator.app.exitApp(); // close/exit the app
            }
            else{ // user does not want to exit
                // flag that the app NOT EXITED
                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("app:no-exit");
                // notify all listeners that app NOT EXITED
                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                emit("app:no-exit", []);
            }
        },

        /**
         * method is used to safely toggle the Puzzle Menu open or close
         */
        async tooglePuzzleMenu(){
            // toggle the side-menu i.e. the puzzle menu
            return await $('#side-menu').get(0).toggle();
        }
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
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.preloadComplex('puzzle-levels-background', 'audio/puzzles-select-level-background.mp3',
                        1, 1, 0, resolve, resolve);
                });

                // start playing background tune in a loop
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, resolve);
                });

                await $('#loader-modal').get(0).hide(); // hide loader

                // set that audio use is ready
                utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzleLevelsPageViewModel.isAudioReady = true;
            }

        },

        /**
         * method is triggered when page is shown
         */
        pageShow: async function(){
            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");

            // adjust the window/view-port settings for when the soft keyboard is displayed
            //window.SoftInputMode.set('adjustPan'); // let the window/view-port 'pan' when the soft keyboard is displayed

            // check that audio is ready
            if(utopiasoftware[utopiasoftware_app_namespace].controller.
                puzzleLevelsPageViewModel.isAudioReady === true){
                // add background tune
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.preloadComplex('puzzle-levels-background', 'audio/puzzles-select-level-background.mp3',
                        1, 1, 0, resolve, resolve);
                });

                // play audio
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, resolve);
                });
            }
        },


        /**
         * method is triggered when page is hidden
         */
        pageHide: async function(){
            // adjust the window/view-port settings for when the soft keyboard is displayed
            // window.SoftInputMode.set('adjustResize'); // let the view 'resize' when the soft keyboard is displayed

            // stop playing the background music
            await new Promise(function(resolve, reject){
                window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, resolve);
            });
            // unload playing the background music
            await new Promise(function(resolve, reject){
                window.plugins.NativeAudio.unload('puzzle-levels-background', resolve, resolve);
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
            // toggle the puzzle menu
            await utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.tooglePuzzleMenu();
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
                window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, resolve);
            });
            // unload the background music
            await new Promise(function(resolve, reject){
                window.plugins.NativeAudio.unload('puzzle-levels-background', resolve, resolve);
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

                // listen for when the puzzle menu is opened
                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                on("puzzle-menu:opened", utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzlePageViewModel.puzzleMenuOpenedListener);

                // listen for when the puzzle menu is closed
                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                on("puzzle-menu:closed", utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzlePageViewModel.puzzleMenuClosedListener);

                // listen for when the app desires/wants to exit
                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                on("app:will-exit", utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzlePageViewModel.appWillExitListener);

                // listen for when the app is NO LONGER EXITING
                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                on("app:no-exit", utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzlePageViewModel.appNoExitListener);

                // add puzzle level background tune
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.preloadComplex('puzzle-background', 'audio/puzzle-level-background.mp3',
                        1, 1, 0, resolve, resolve);
                });

                // start playing background tune in a loop
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.loop('puzzle-background', resolve, resolve);
                });

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

                // flag that puzzle has not been completed
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;

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
            // flag that puzzle has been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleCompleted = true;
        },


        /**
         * method is triggered when the device back button is clicked OR a similar action is triggered
         */
        async backButtonClicked(){

            // flag that the puzzle has not been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleCompleted = false;

            // pause puzzle timer
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();

            // toggle the puzzle menu
            utopiasoftware[utopiasoftware_app_namespace].controller.
                puzzleMenuPageViewModel.tooglePuzzleMenu();
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

            // flag that the puzzle has not been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleCompleted = false;
            // pause puzzle timer
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();
            // show the pause-puzzle-modal
            await $('#pause-puzzle-modal').get(0).show();
        },

        async resumePuzzleLevel(){

            // flag that the puzzle has not been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleCompleted = false;
            // hide the pause-puzzle-modal
            await $('#pause-puzzle-modal').get(0).hide();
            // resume puzzle timer
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start();
        },

        /**
         * method is used to listen for when the puzzle menu is opened
         * @returns {Promise<void>}
         */
        async puzzleMenuOpenedListener(){
            // flag that puzzle has NOT been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleCompleted = false;
            // pause puzzle timer
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();
        },

        /**
         * method is used to listen for when the puzzle menu is opened
         * @returns {Promise<void>}
         */
        async puzzleMenuClosedListener(){
            // resume puzzle timer
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start();
        },

        /**
         * method is used to listen for when the app notifies that it wants to exit
         * @param event
         * @returns {Promise<void>}
         */
        async appWillExitListener(event){
            console.log("Event Object 3 ", event);
            // check if event has been canceled
            if(event.isCanceled !== true){ // event has not been canceled
                // check if puzzle has been completed
                if(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                    puzzleCompleted !== true){ // puzzle level has not been completed
                    // pause puzzle timer
                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();
                    // since user has not completed the puzzle, try to prevent app exit using a warning
                    event.cancel = true;
                    // attach the warning message for preventing exit
                    event.warningMessage = "All progress on this puzzle will be lost if you exit now."
                }
            }
        },

        /**
         * method is listener for when the APP WILL NO LONGER BE EXITED
         * @returns {Promise<void>}
         */
        async appNoExitListener(){
            // resume puzzle timer
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start();
        }

    }

};


