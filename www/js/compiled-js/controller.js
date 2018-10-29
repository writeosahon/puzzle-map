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
                                     "puzzle-menu:background-music-clicked", "puzzle-menu:sound-effects-clicked",
                                     "puzzle-menu:puzzle-hints-clicked",

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

                // create the pouchdb app database
                utopiasoftware[utopiasoftware_app_namespace].model.appDatabase = new PouchDB('mapteazerpuzzle.db', {
                    adapter: 'cordova-sqlite',
                    location: 'default',
                    androidDatabaseImplementation: 2
                });

                // load the game settings data stored in the app database
                try{
                    utopiasoftware[utopiasoftware_app_namespace].model.gameSettings =
                        await utopiasoftware[utopiasoftware_app_namespace].gameSettingsOperations.loadGameSettingsData();
                }
                catch(err2){}
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

            var $thisPage = $(event.target); // get the current page shown

            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();

            //function is used to initialise the page if the app is fully ready for execution
            async function loadPageOnAppReady() {
                // check to see if onsen is ready and if all app loading has been completed
                if (!ons.isReady() || utopiasoftware[utopiasoftware_app_namespace].model.isAppReady === false) {
                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                    return;
                }

                // show page process loader
                $('#puzzle-menu-page .process-loader').css("display", "block");
                // update the Puzzle Menu Settings using the game settings saved by the user
                $('#puzzle-menu-page #puzzle-menu-background-music-switch').get(0).checked =
                    utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn;
                $('#puzzle-menu-page #puzzle-menu-sound-effects-switch').get(0).checked =
                    utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.soundEffectsOn;
                $('#puzzle-menu-page #puzzle-menu-puzzle-hints-switch').get(0).checked =
                    utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.puzzleHintsOn;

                // hide page process loader
                $('#puzzle-menu-page .process-loader').css("display", "none");
            }

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
         * method is used to listen for when the Exit Button on the menu is clicked
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
                    resolve(eventObject);
                }, 0); // end of setTimeout
            });

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
         * method is used to listen for when the Background Music switch is clicked
         * @returns {Promise<void>}
         */
        async backgroundMusicSwitchClicked(){

            // get the current state/status of the background music switch
            var switchOn =  $('#puzzle-menu-page #puzzle-menu-background-music-switch').get(0).checked;
            // update the transient and persistent game settings data with the current state of the switch
            utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn = switchOn;

            utopiasoftware[utopiasoftware_app_namespace].gameSettingsOperations.
            saveGameSettingsData(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings);

            // flag that Background Music Switch on the puzzle menu has been clicked
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
            goto("puzzle-menu:background-music-clicked");

            // call all the listeners registered for this lifecycle stage
            return new Promise(function(resolve, reject){

                    setTimeout(function(){
                        // return the values gotten from the registered listeners as the resolved value of the Promise
                        resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                        emit("puzzle-menu:background-music-clicked", [{switchOn}]));
                    }, 0);
            });

        },

        /**
         * method is used to listen for when the Sound Effects switch is clicked
         * @returns {Promise<void>}
         */
        async soundEffectsSwitchClicked(){

            // get the current state/status of the Sound Effects switch
            var switchOn =  $('#puzzle-menu-page #puzzle-menu-sound-effects-switch').get(0).checked;
            // update the transient and persistent game settings data with the current state of the switch
            utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.soundEffectsOn = switchOn;

            utopiasoftware[utopiasoftware_app_namespace].gameSettingsOperations.
            saveGameSettingsData(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings);

            // flag that Sound Effects Switch on the puzzle menu has been clicked
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
            goto("puzzle-menu:sound-effects-clicked");

            // call all the listeners registered for this lifecycle stage
            return new Promise(function(resolve, reject){

                setTimeout(function(){
                    // return the values gotten from the registered listeners as the resolved value of the Promise
                    resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                    emit("puzzle-menu:sound-effects-clicked", [{switchOn}]));
                }, 0);
            });

        },

        /**
         * method is used to listen for when the Puzzle Hints switch is clicked
         * @returns {Promise<void>}
         */
        async puzzleHintsSwitchClicked(){

            // get the current state/status of the Puzzle Hints switch
            var switchOn =  $('#puzzle-menu-page #puzzle-menu-puzzle-hints-switch').get(0).checked;
            // update the transient and persistent game settings data with the current state of the switch
            utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.puzzleHintsOn = switchOn;

            utopiasoftware[utopiasoftware_app_namespace].gameSettingsOperations.
            saveGameSettingsData(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings);

            // flag that Puzzle Hints Switch on the puzzle menu has been clicked
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
            goto("puzzle-menu:puzzle-hints-clicked");

            // call all the listeners registered for this lifecycle stage
            return new Promise(function(resolve, reject){

                setTimeout(function(){
                    // return the values gotten from the registered listeners as the resolved value of the Promise
                    resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
                    emit("puzzle-menu:puzzle-hints-clicked", [{switchOn}]));
                }, 0);
            });

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
                            LEVEL ${index}
                            </span>
                        </div>`;
                }

                $('#puzzle-levels-page #puzzle-levels-container').html(puzzleLevelContent); // append the content to the page


                // check if background music has been enabled
                if(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true){ // background music is on
                    // add background tune
                    await new Promise(function(resolve, reject){
                        window.plugins.NativeAudio.preloadComplex('puzzle-levels-background', 'audio/puzzles-select-level-background.mp3',
                            1, 1, 0, resolve, resolve);
                    });

                    // start playing background tune in a loop
                    await new Promise(function(resolve, reject){
                        window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, resolve);
                    });
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
        pageShow: async function(){
            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");

            // adjust the window/view-port settings for when the soft keyboard is displayed
            //window.SoftInputMode.set('adjustPan'); // let the window/view-port 'pan' when the soft keyboard is displayed

            // listen for when the background music switch on the puzzle menu is clicked
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
            on("puzzle-menu:background-music-clicked", utopiasoftware[utopiasoftware_app_namespace].controller.
                puzzleLevelsPageViewModel.backgroundMusicSwitchClickedListener);

            // check that audio is ready
            if(utopiasoftware[utopiasoftware_app_namespace].controller.
                puzzleLevelsPageViewModel.isAudioReady === true){
                if(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true){ // background music is on
                    // add background tune
                    await new Promise(function(resolve, reject){
                        window.plugins.NativeAudio.preloadComplex('puzzle-levels-background',
                            'audio/puzzles-select-level-background.mp3',
                            1, 1, 0, resolve, resolve);
                    });

                    // start playing background tune in a loop
                    await new Promise(function(resolve, reject){
                        window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, resolve);
                    });
                }
            }
        },


        /**
         * method is triggered when page is hidden
         */
        pageHide: async function(){
            // adjust the window/view-port settings for when the soft keyboard is displayed
            // window.SoftInputMode.set('adjustResize'); // let the view 'resize' when the soft keyboard is displayed

            // remove listener for when the background music switch on the puzzle menu is clicked
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
            off("puzzle-menu:background-music-clicked", utopiasoftware[utopiasoftware_app_namespace].controller.
                puzzleLevelsPageViewModel.backgroundMusicSwitchClickedListener);

            if(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true) { // background music is on
                // stop playing the background music
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, resolve);
                });
                // unload playing the background music
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.unload('puzzle-levels-background', resolve, resolve);
                });
            }

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

            // check if background music is enabled
            if(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true) { // background music is on
                // stop playing the background music
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, resolve);
                });
                // unload the background music
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.unload('puzzle-levels-background', resolve, resolve);
                });
            }

            // load the puzzle level page with the required page data
            await $('#app-main-navigator').get(0).pushPage("puzzle-page.html", {
                data: {puzzleData: {levelNumber: levelNumber}}});
        },

        /**
         * method id used to listen got
         * @param eventArgs
         * @returns {Promise<void>}
         */
        async backgroundMusicSwitchClickedListener(eventArgs){

            var event = eventArgs[0]; // get the event object from eventArgs array

            // check if background sound is being turned on or off
            if(event.switchOn === true){ // background music is being turned on
                // add background tune
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.preloadComplex('puzzle-levels-background',
                        'audio/puzzles-select-level-background.mp3',
                        1, 1, 0, resolve, resolve);
                });

                // start playing background tune in a loop
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, resolve);
                });
            }
            else{ // background music is being turned off
                // stop playing the background music
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, resolve);
                });
                // unload the background music
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.unload('puzzle-levels-background', resolve, resolve);
                });
            }


        },
    },


    /**
     * this is the view-model/controller for the Puzzle page
     */
    puzzlePageViewModel: {

        /**
         * property is the Draggable-Droppable object used for the puzzle
         */
        draggableDroppableObject: null,

        /**
         * property is used to hold the element that is being dragged
         */
        dragStartSource: null,

        /**
         * properety is used to hold the dropzone container for the
         * element that was being dragged
         */
        jqueryDropZone: null,

        /**
         * property is used to hold the container for the element that is being dragged
         */
        dragStartContainer: null,

        /**
         * property is used to keep track of the total number of moves used to
         * complete a puzzle
         */
        moveCounter: 0,

        /**
         * property holds the level number for the current puzzle level being played
         */
        levelNumber: 0,

        /**
         * property holds the single-side dimension for a
         * puzzle piece in the puzzle display area
         */
        puzzlePieceDimension: 0,

        /**
         * property holds an instance of EasyTimer which is the timer used to track
         * how long it takes the user to complete a puzzle
         */
        puzzleTimer: null,

        /**
         * property holds a Map object that is used to keep track of the
         * user's puzzle answer sheet i.e. if the user has completed the puzzle
         */
        puzzleAnswerSheetMap: null,

        /**
         * property holds a Map object that is used to keep track of
         * all image assets used by this puzzle
         */
        puzzleImageAssetsMap: null,

        /**
         * property is a flag that indicates if the user has completed the level.
         * A value of true means the user has completed the level or a value of
         * false means the level has not been completed
         */
        puzzleCompleted: false,

        /**
         * property is used to hold the Confetti JS object used for
         * the Puzzle-Level-Completed modal
         */
        puzzleCompletedConfetti: null,

        /**
         * property holds the file path for the puzzle completed snapshot
         */
        puzzleSnapshotFilePath: null,


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

                // set the level number of the puzzle to be loaded
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber =
                    window.parseInt($('#app-main-navigator').get(0).topPage.data.puzzleData.levelNumber);
                // flag that puzzle has not been completed
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
                // set the puzzle move counter to zero
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter = 0;

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

                // check if background music is enabled
                if(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true) { // background music is on
                    // add puzzle background tune
                    await new Promise(function(resolve, reject){
                        window.plugins.NativeAudio.preloadComplex('puzzle-background', 'audio/puzzle-level-background.mp3',
                            1, 1, 0, resolve, resolve);
                    });

                    // start playing background tune in a loop
                    await new Promise(function(resolve, reject){
                        window.plugins.NativeAudio.loop('puzzle-background', resolve, resolve);
                    });
                }

                // instantiate the puzzleAnswerSheet js Map
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap =
                    new Map();
                // use a for loop to set all the answers in the puzzleAnswerSheet to false
                for(let index = 0; index < utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzleLevelsPageViewModel.gameConfigObject["levels"]
                    ["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]
                    ["total_puzzle_pieces"]; index++){

                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.
                    set(("" + (index + 1)), false);
                }

                // instantiate the puzzle image assets js Map
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap =
                    new Map();
                // set the puzzle-completed image assets
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                set("puzzle-completed", new Image());
                if(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                get("puzzle-completed").decoding){
                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                    get("puzzle-completed").decoding = 'async';
                }

                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                get("puzzle-completed").src =
                    `game-puzzle/level-${utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber}-puzzle-completed.png`;

                // set the arrays used for loading all required puzzle 'blank' and 'answer' pieces
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                set("puzzle-block-pieces", []).set("puzzle-answer-pieces", []);
                // initialise the puzzle 'block' & 'answer' pieces arrays with their image assets
                for(let index = 0; index < utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzleLevelsPageViewModel.gameConfigObject["levels"]
                    ["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]
                    ["total_puzzle_pieces"]; index++){

                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                    get("puzzle-block-pieces")[index] = new Image();
                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                    get("puzzle-answer-pieces")[index] = new Image();

                    if(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                    get("puzzle-completed").decoding){
                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                        get("puzzle-block-pieces")[index].decoding = 'async';
                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                        get("puzzle-answer-pieces")[index].decoding = 'async';
                    }

                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                    get("puzzle-block-pieces")[index].src =
                        `game-puzzle/level-${utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber}-block-${index + 1}-puzzle.png`;
                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                    get("puzzle-answer-pieces")[index].src =
                        `game-puzzle/level-${utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber}-block-${index + 1}-answer.png`;
                    // identify the puzzle slot value for each 'answer' puzzle piece
                    // the puzzle slot value helps to identify if the puzzle piece has been placed in the right place
                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                    get("puzzle-answer-pieces")[index].puzzleSlotValue = index + 1;
                }

                // randomise the created 'answer' puzzle pieces so they don't arrive in puzzle in correct order/sequence
                Random.shuffle(utopiasoftware[utopiasoftware_app_namespace].randomisationEngine,
                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                    get("puzzle-answer-pieces"));

                // calculate the dimensions of the puzzle display area on the user's device
                let puzzleDisplayHeight = Math.floor($('#puzzle-page #puzzle-page-puzzle-display-area').height());
                let puzzleDisplayWidth = Math.floor($('#puzzle-page #puzzle-page-puzzle-display-area').width());
                // get a variable to hold the puzzle piece single dimension. Since ALL puzzle pieces are square, dimensions are equal
                let puzzlePieceDimension = 0;

                // check if the puzzle display Height is larger than or equal to the display width
                if(puzzleDisplayHeight >= puzzleDisplayWidth){ // height is >= width
                    // get the space difference between the height and width and use to set appropriate padding for the puzzle content
                    $('#puzzle-page #puzzle-page-puzzle-display-area').css({
                        "padding-top": Math.floor((puzzleDisplayHeight - puzzleDisplayWidth) / 2) + "px",
                        "padding-bottom": Math.floor((puzzleDisplayHeight - puzzleDisplayWidth) / 2) + "px"
                    });
                    // get the dimension for the puzzle pieces
                    puzzlePieceDimension = Math.floor(puzzleDisplayWidth / Math.sqrt(utopiasoftware[utopiasoftware_app_namespace].controller.
                        puzzleLevelsPageViewModel.gameConfigObject["levels"]
                        ["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]
                        ["total_puzzle_pieces"]));
                }
                else{ // height is < width
                    // get the space difference between the width and height and use to set appropriate padding for the puzzle content
                    $('#puzzle-page #puzzle-page-puzzle-display-area').css({
                        "padding-left": Math.floor((puzzleDisplayWidth - puzzleDisplayHeight) / 2) + "px",
                        "padding-right": Math.floor((puzzleDisplayWidth - puzzleDisplayHeight) / 2) + "px"
                    });
                    // get the dimension for the puzzle pieces
                    puzzlePieceDimension = Math.floor(puzzleDisplayHeight / Math.sqrt(utopiasoftware[utopiasoftware_app_namespace].controller.
                        puzzleLevelsPageViewModel.gameConfigObject["levels"]
                        ["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]
                        ["total_puzzle_pieces"]));
                }

                // set the calculated puzzle piece dimension to the appropriate view-model property
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                    puzzlePieceDimension = puzzlePieceDimension;

                // append the 'blank' puzzle pieces to the puzzle display content
                for(let puzzlePiecesCounter = 0, rowCounter = 0,
                        totalRows = Math.sqrt(utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzleLevelsPageViewModel.gameConfigObject["levels"]
                    ["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]
                    ["total_puzzle_pieces"]); rowCounter < totalRows; rowCounter++){ // for loop to generate puzzle display rows

                    let puzzleRowContent = '<div style="display: block; margin:0; padding: 0; width: 100%; white-space: nowrap">';

                    // for loop to generate puzzle display columns
                    for(let columnCounter = 0, totalColumns = totalRows; columnCounter < totalColumns; columnCounter++){
                        let puzzleColumnContent =
                            `<span class="puzzle-pieces-container puzzle-drop-zone"
                                style="display: inline-block; margin: 0; padding: 0; width: ${puzzlePieceDimension}px;"
                                data-puzzle-slot="${puzzlePiecesCounter + 1}">
                            <img src="${utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.
                            get("puzzle-block-pieces")[puzzlePiecesCounter].src}" class="puzzle-piece-holder" style="width: 100%; height: auto;">
                        </span>`;

                        // add the column content to the row content
                        puzzleRowContent += puzzleColumnContent;
                        // increase the puzzle pieces counter by 1
                        puzzlePiecesCounter += 1;
                    } // end of column generator for-loop

                    // complete the row content
                    puzzleRowContent += '</div>';
                    // append the generate row content to the puzzle-display-area
                    $('#puzzle-page #puzzle-page-puzzle-display-area').append(puzzleRowContent);

                } // end of row generator for-loop


                // insert three 'answer' puzzle pieces into two puzzle trays
                for(let index = 0; index < 3; index++){
                    // get the puzzle 'answer' piece to be added
                    let puzzleAnswerPiece = utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzlePageViewModel.puzzleImageAssetsMap.
                    get("puzzle-answer-pieces").pop();

                    // add the puzzle 'answer' piece to the tray
                    $('#puzzle-page .puzzle-pieces-tray').eq(index).
                    html(`<img src="${puzzleAnswerPiece.src}" class="puzzle-pieces" style="height: 100%; width: auto" 
                         data-puzzle-slot="${puzzleAnswerPiece.puzzleSlotValue}">`);

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
                            dropzone: '#puzzle-page .puzzle-drop-zone'
                        }).
                    removePlugin(Draggable.Plugins.Focusable);

                /**
                 * function uses the "drag:start" event to track which
                 * exact puzzle piece is being moved.
                 */
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.
                on("drag:start", function(dragStartEvent){
                    utopiasoftware[utopiasoftware_app_namespace].controller.
                        puzzlePageViewModel.dragStartSource = $(dragStartEvent.source);
                });

                /**
                 * function uses the "droppable:start" event to track when a puzzle piece has started to get dropped.
                 * The method is used to check the puzzle movements of puzzle pieces
                 */
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.
                    on("droppable:start", function(droppableStartEvent){
                        // get the initial container the element/puzzle piece being dropped originates from
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer = $(droppableStartEvent.dropzone);

                        // mark the exact time the drop-start commenced
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp = Date.now();
                        // flag that the puzzle piece has NOT been dropped yet
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.puzzleDropped = false;

                        // check that the initial container for the puzzle piece is NOT a 'puzzle-pieces-tray'
                        if(! utopiasoftware[utopiasoftware_app_namespace].controller.
                        puzzlePageViewModel.dragStartContainer.is('.puzzle-pieces-tray')){ // initial container is NOT a 'puzzle-pieces-tray'
                            // get the puzzle slot value attached to the puzzle piece container.
                            // the value represents the position of the correct puzzle piece needed to complete the puzzle
                            let puzzleSlotValue = utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.attr('data-puzzle-slot');

                            // remove all puzzle hint animations from the container
                            $(`.puzzle-drop-zone[data-puzzle-slot="${puzzleSlotValue}"]`, $thisPage).
                            removeClass("animated shake pulse");
                        }
                        else{ // initial container is a 'puzzle-pieces' tray
                             // get the puzzle-tray-slot value attached to the puzzle-pieces-tray
                            // the value identifies which puzzle tray is being accessed
                            let puzzleTraySlotValue = utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.attr('data-puzzle-tray-slot');

                            // remove all puzzle animations from the tray container
                            $(`.puzzle-drop-zone.puzzle-pieces-tray[data-puzzle-tray-slot="${puzzleTraySlotValue}"]`, $thisPage).
                            removeClass("animated flash");
                        }
                    });

                /**
                 * function uses the "droppable:dropped" event to track when a puzzle piece has been dropped.
                 * The method is used to check the puzzle movements of puzzle pieces
                 */
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.
                    on("droppable:dropped", function(droppableDroppedEvent){

                        // get the container which the element/puzzle piece is being dropped into
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.jqueryDropZone = $(droppableDroppedEvent.dropzone);

                        // check if the puzzle piece is being dropped in a puzzle-pieces-tray
                        if(utopiasoftware[utopiasoftware_app_namespace].controller.
                        puzzlePageViewModel.jqueryDropZone.is('.puzzle-pieces-tray')){ // the puzzle-piece is being dropped in a puzzle-pieces-tray
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = true; // flag that the puzzle-piece was dropped in a puzzle-pieces-tray
                            // flag the a valid puzzle movement drop has NOT taken place. Because the puzzle piece was moved to a tray
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDropped = false;
                            // set the puzzle dropped time stamp to zero, since a valid puzzle move did NOT take place
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp = 0;
                        }
                        else{
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = false; // flag that the puzzle-piece was NOT dropped in a puzzle-pieces-tray

                            // flag the a valid puzzle movement drop has taken place
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDropped = true;
                            // set the time the puzzle-piece was dropped to the same drop-start time.
                            // THIS LOGIC IS VERY IMPORTANT TO ENABLING THE COMPLETION OF A VALID PUZZLE MOVEMENT TRACKING
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp =
                                utopiasoftware[utopiasoftware_app_namespace].controller.
                                    puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp;
                        }
                    });

                /**
                 * function uses the "droppable:stop" event to track when a puzzle piece has finished been dropped.
                 * The method is used to check the puzzle movements of puzzle pieces
                 */
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.
                    on("droppable:stop", function(droppableStopEvent){

                        // check if this is the completion of a valid puzzle movement
                        // This is done by check that the movement was flagged as a puzzleDropped action and
                        // that the puzzle 'start-drop' and puzzle 'dropped' time stamps are exactly the same value
                        if(utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDropped === true &&
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp ===
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp){ // this is the completion of a valid puzzle movement

                            // get the puzzle slot value attached to the container where the puzzle piece was finally dropped
                            let puzzleSlotValue = $(droppableStopEvent.dropzone).attr('data-puzzle-slot');

                            // check if the puzzle slot value attached to the puzzle piece AND
                            // the puzzle slot value gotten from the puzzle final drop container are equal
                            if(utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartSource.attr('data-puzzle-slot') == puzzleSlotValue){ // the puzzle slot values are equal
                                // since the values match, this is the correct puzzle piece movement

                                // check if user wants puzzle-hints
                                if(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.puzzleHintsOn === true){
                                    // add positive animation to container
                                    $(`.puzzle-drop-zone[data-puzzle-slot="${puzzleSlotValue}"]`, $thisPage).
                                    addClass("animated pulse");
                                }

                                // update the puzzleAnswerSheet map object to indicate this answer was correct
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.
                                set(puzzleSlotValue, true);

                                // call the method to check the users answer sheet. Call in a separate event queue
                                window.
                                setTimeout(utopiasoftware[utopiasoftware_app_namespace].controller.
                                    puzzlePageViewModel.checkAnswerSheet, 0);
                            }
                            else{
                                // check if user wants puzzle-hints
                                if(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.puzzleHintsOn === true){
                                    // add negative animation to container
                                    $(`.puzzle-drop-zone[data-puzzle-slot="${puzzleSlotValue}"]`, $thisPage).
                                    addClass("animated shake");
                                }

                                // update the puzzleAnswerSheet map object to indicate this answer was wrong
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.
                                set(puzzleSlotValue, false);
                            }
                        }

                        else{ // this is NOT a valid puzzle movement
                            // check if the container where the puzzle piece started moving from is not a puzzle-pieces tray and
                            // the container where the the puzzle piece ended up is a puzzle-pieces tray
                            if((! utopiasoftware[utopiasoftware_app_namespace].controller.
                                puzzlePageViewModel.dragStartContainer.is('.puzzle-pieces-tray')) &&
                                $(droppableStopEvent.dropzone).is('.puzzle-pieces-tray')){
                                // since the user moved a puzzle piece from the puzzle display area back to the puzzle-pieces tray,
                                // then, update the puzzleAnswerSheet map object to indicate this answer was wrong
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.
                                    set(utopiasoftware[utopiasoftware_app_namespace].controller.
                                    puzzlePageViewModel.dragStartContainer.attr('data-puzzle-slot'), false);
                            }
                        }


                    });

                /**
                 * function uses the "droppable:stop" event to track whether it should request the
                 * addition of a new puzzle-piece to the puzzle-pieces tray
                 */
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.
                on("droppable:stop", function(droppableStopEvent){

                    // check if this is the completion of a valid puzzle movement
                    // This is done by check that the movement was flagged as a puzzleDropped action and
                    // that the puzzle 'start-drop' and puzzle 'dropped' time stamps are exactly the same value
                    if(utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.puzzleDropped === true &&
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp ===
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp) { // this is the completion of a valid puzzle movement

                        // check if the dragStartContainer is a puzzle-pieces tray
                        if(utopiasoftware[utopiasoftware_app_namespace].controller.
                            puzzlePageViewModel.dragStartContainer.is('.puzzle-pieces-tray')){ // this is a puzzle-pieces tray

                            // work in a separate event queue
                            window.setTimeout(function(){
                                // find a puzzle-pieces tray that is NOT occupied AND NOT the spare 3rd slot
                                let emptyPuzzlePieceTray = $('#puzzle-page .puzzle-pieces-tray').get().
                                find(function(arrayElem){
                                    // check if puzzle tray is occupied
                                    if($(arrayElem).children('.puzzle-pieces').length === 0){ // not occupied
                                        return true; // return this element
                                    }
                                }); // end of Array.find()

                                // check if an empty puzzle-pieces tray that fits the criteria was found
                                if(emptyPuzzlePieceTray) { // an empty puzzle-pieces tray which fits the criteria was found
                                    // add a new puzzle piece to the tray
                                    utopiasoftware[utopiasoftware_app_namespace].controller.
                                        puzzlePageViewModel.addPuzzlePiece($(emptyPuzzlePieceTray).attr("data-puzzle-tray-slot"));
                                }
                            }, 0); // end of window.setTimeout()

                        }
                    }
                });

                /**
                 * function uses the "droppable:stop" event to track the
                 * total number of puzzle moves the user makes, whether valid or invalid.
                 */
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.
                    on("droppable:stop", function(droppableStopEvent){

                        // increase the move counter value by 1
                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter += 1;
                        // display the new value of the move counter to the user
                        $('#puzzle-page .puzzle-moves-counter').
                        html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter);
                    });

                // append the style for the Draggable mirror element to the page
                $('#puzzle-page').
                append(`
                <style>
                    .draggable-mirror {
                        width: ${utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                        puzzlePieceDimension}px !important;
                        height: auto !important;
                    }
                </style>`);

                // update the contents of the pause-puzzle modal
                $('#pause-puzzle-modal .level-name').
                html(utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzleLevelsPageViewModel.gameConfigObject["levels"]
                    ["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]
                    ["level_name"]);

                $('#pause-puzzle-modal .level-number').
                html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber);

                $('#pause-puzzle-modal .puzzle-image-container').
                html(`<img src="game-puzzle/level-${utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber}-puzzle-completed.png" alt="Puzzle Map" style="width: 100%; height: auto">`);

                // update the contents of the level-complete modal
                $('#puzzle-level-complete-modal .puzzle-image-container').
                html(`<img src="game-puzzle/level-${utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber}-puzzle-completed.png" alt="Puzzle Map" style="width: 100%; height: auto">`);

                // create the Puzzle Timer object
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer = new Timer();
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.
                start({startValues: {secondTenths: 0, seconds: 0, minutes: 0, hours: 0, days: 0},
                    precision: 'secondTenths'});
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();

                // add event listener for when timer value is updated
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.
                addEventListener("secondTenthsUpdated", function(timer){
                    // update the timer counter display on the puzzle
                    $('#puzzle-page .puzzle-timer-counter').
                    html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.
                    getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
                });

                // add event listener for when timer value is paused
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.
                addEventListener("paused", utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzlePageViewModel.puzzleTimerPausedListener);

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

            // listen for when the background music switch on the puzzle menu is clicked
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
            on("puzzle-menu:background-music-clicked", utopiasoftware[utopiasoftware_app_namespace].controller.
                puzzlePageViewModel.backgroundMusicSwitchClickedListener);

            // keep the device awake through the duration of the puzzle
            window.plugins.insomnia.keepAwake();
        },


        /**
         * method is triggered when page is hidden
         */
        pageHide: function(){
            // adjust the window/view-port settings for when the soft keyboard is displayed
            // window.SoftInputMode.set('adjustResize'); // let the view 'resize' when the soft keyboard is displayed

            // remove listener for when the background music switch on the puzzle menu is clicked
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.
            off("puzzle-menu:background-music-clicked", utopiasoftware[utopiasoftware_app_namespace].controller.
                puzzlePageViewModel.backgroundMusicSwitchClickedListener);

            // the device can sleep at anytime
            window.plugins.insomnia.allowSleepAgain();
        },

        /**
         * method is triggered when page is destroyed
         */
        pageDestroy: async function(){

            // check if background music is enabled
            if(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true) { // background music is on
                // stop playing the background music
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.stop('puzzle-background', resolve, resolve);
                });
                // unload the background music
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.unload('puzzle-background', resolve, resolve);
                });
            }

            // destroy Draggable.Droppable object
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.destroy();
            // destroy the dragged elements references & all dragged elements containers references
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartSource = null;
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.jqueryDropZone = null;
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer = null;
            // destroy the puzzle timer object
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.stop();
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer = null;
            // destroy the answer sheet map object
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.clear();
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap = null;
            // destroy the puzzle image asserts map object
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.clear();
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap = null;
            // destroy the Puzzle-Level-Completed Confetti
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompletedConfetti.stop();
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompletedConfetti = null;
            // destroy the puzzle snapshot file path
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleSnapshotFilePath = null;
            // set the puzzle move counter to zero
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter = 0;
            // set the puzzle level number to zero
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber = 0;
            // set the puzzle piece dimension to zero
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzlePieceDimension = 0;
            // flag that puzzle has NOT been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleCompleted = false;
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
         * method is used to listen for when the puzzle timer is paused
         *
         * @param timer
         * @returns {Promise<void>}
         */
        async puzzleTimerPausedListener(timer){

            // check if puzzle has been completed
            if(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleCompleted !== true){ // puzzle has not been completed, so exit method
                return;
            }

            // IF CODE GET TO THIS POINT, THEN PUZZLE HAS BEEN COMPLETED
            // update the contents of the level completed modal
            $('#puzzle-level-complete-modal .level-time').html(
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.
                getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths'])
            );
            $('#puzzle-level-complete-modal .level-moves').html(
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter
            );
            $('#puzzle-level-complete-modal .level-name').html(
                utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzleLevelsPageViewModel.gameConfigObject["levels"]
                    ["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]
                    ["level_name"]
            );
            $('#puzzle-level-complete-modal .level-number').html(
                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber
            );

            // show the level completed modal
            await $('#puzzle-level-complete-modal').get(0).show();
            // create and start the Puzzle-Level-Completed Confetti
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompletedConfetti =
                window.generatePuzzleConfetti('puzzle-level-complete-confetti-canvas');
        },

        /**
         * method is used to check the status of the users puzzle answer sheet.
         * if all puzzle pieces have been place correctly, then the level is completed
         * @returns {Promise<void>}
         */
        async checkAnswerSheet(){

            console.log("CHECK ANSWER ENTRY STARTED");

            // update the puzzleAnswerSheet map object to indicate this answer was correct
            for(let entry of utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleAnswerSheetMap){
                console.log("CHECK ANSWER ENTRY", entry);
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

        /**
         * method is used to add another 'answer' puzzle piece to the puzzle-pieces tray.
         * This method is used AFTER the first 2 puzzle pieces have already been inserted.
         * If there are no more puzzle pieces to add, this method does nothing
         *
         * @param puzzleTraySlot the puzzle-pieces tray slot value belonging to the
         * puxxle-pieces tray where the new puzzle-piece will be added
         *
         * @returns {Promise<void>}
         */
        async addPuzzlePiece(puzzleTraySlot){

            // check if there are still puzzle pieces to add
            if(utopiasoftware[utopiasoftware_app_namespace].controller.
            puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-answer-pieces").length === 0){ // no more puzzle pieces
                return; // exit method
            }

            // get the puzzle-pieces tray where the puzzle piece is to be added
            let puzzlePiecesTray = $(`#puzzle-page .puzzle-pieces-tray[data-puzzle-tray-slot="${puzzleTraySlot}"]`).eq(0);

            // get the puzzle 'answer' piece to be added
            let puzzleAnswerPiece = utopiasoftware[utopiasoftware_app_namespace].controller.
            puzzlePageViewModel.puzzleImageAssetsMap.
            get("puzzle-answer-pieces").pop();

            // remove the retrieved puzzle-pieces tray form the collection of draggable containers
            utopiasoftware[utopiasoftware_app_namespace].controller.
                puzzlePageViewModel.draggableDroppableObject.removeContainer(puzzlePiecesTray.get(0));

            // add the puzzle 'answer' piece to the tray
            puzzlePiecesTray.html(`<img src="${puzzleAnswerPiece.src}" class="puzzle-pieces" style="height: 100%; width: auto" 
                         data-puzzle-slot="${puzzleAnswerPiece.puzzleSlotValue}">`);

            // re-add the retrieved puzzle-pieces tray form the collection of draggable containers
            utopiasoftware[utopiasoftware_app_namespace].controller.
            puzzlePageViewModel.draggableDroppableObject.addContainer(puzzlePiecesTray.get(0));

            // add the puzzle animation fo a new puzzle piece inclusion
            puzzlePiecesTray.addClass("animated flash");
            return;
        },

        /**
         * pauses the puzzle level. Suspends the puzzle timer and
         * displays the pause-puzzle modal
         *
         * @returns {Promise<void>}
         */
        async pausePuzzleLevel(){

            // flag that the puzzle has not been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                puzzleCompleted = false;
            // pause puzzle timer
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();
            // show the pause-puzzle-modal
            await $('#pause-puzzle-modal').get(0).show();
        },

        /**
         * resumes the puzzle level. Resumes the puzzle timer and
         * hides the pause-puzzle modal
         *
         * @returns {Promise<void>}
         */
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
         * @param eventArgs
         * @returns {Promise<void>}
         */
        async appWillExitListener(eventArgs){
            var event = eventArgs[0]; // get the event object from eventArgs array
            // check if event has been canceled
            if(event.isCanceled !== true){ // event has not been canceled
                // check if puzzle has been completed
                if(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.
                    puzzleCompleted !== true){ // puzzle level has not been completed

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
            // do nothing for now
        },

        /**
         * method id used to listen for when the background music switch on the puzzle menu is clicked
         * @param eventArgs
         * @returns {Promise<void>}
         */
        async backgroundMusicSwitchClickedListener(eventArgs){

            var event = eventArgs[0]; // get the event object from eventArgs array

            // check if background sound is being turned on or off
            if(event.switchOn === true){ // background music is being turned on
                // add puzzle background tune
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.preloadComplex('puzzle-background', 'audio/puzzle-level-background.mp3',
                        1, 1, 0, resolve, resolve);
                });

                // start playing background tune in a loop
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.loop('puzzle-background', resolve, resolve);
                });
            }
            else{ // background music is being turned off
                // stop playing the background music
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.stop('puzzle-background', resolve, resolve);
                });
                // unload the background music
                await new Promise(function(resolve, reject){
                    window.plugins.NativeAudio.unload('puzzle-background', resolve, resolve);
                });
            }


        },

        /**
         * method is triggered when the Snapshot button on the Puzzle-Level-Complete modal is clicked
         */
        async snapshotButtonClicked(){

            // take the screenshot
            try{
                // hide the footer buttons on the modal before taking snapshot
                $('#puzzle-level-complete-modal .puzzle-modal-footer').css("visibility", "hidden");

                // get the file path for the successfully taken snapshot
                utopiasoftware[utopiasoftware_app_namespace].controller.
                    puzzlePageViewModel.puzzleSnapshotFilePathawait =
                    await new Promise(function(resolve, reject){
                    navigator.screenshot.save(function(error,res){
                        if(error){ // there is an error
                            reject(error); // reject with the error
                        }
                        else{ // no error
                            console.log("PHOTO PATH", res.filePath);
                            resolve(res.filePath); // resolve with the photo file path
                        }
                    },'jpg', 80, `MapTEAZER-Level- ${utopiasoftware[utopiasoftware_app_namespace].controller.
                        puzzlePageViewModel.levelNumber}${Date.now()}`);
                });
            }
            catch(err){
                // inform the user that snapshot could not be taken
                window.plugins.toast.showWithOptions({
                    message: "Error! Snapshot not taken",
                    duration: 4000,
                    position: "top",
                    styling: {
                        opacity: 1,
                        backgroundColor: '#ff0000', //red
                        textColor: '#FFFFFF',
                        textSize: 14
                    }
                }, function(toastEvent){
                    if(toastEvent && toastEvent.event == "touch"){ // user tapped the toast, so hide toast immediately
                        window.plugins.toast.hide();
                    }
                });
            }
            finally{
                // show the footer buttons on the modal before taking snapshot
                $('#puzzle-level-complete-modal .puzzle-modal-footer').css("visibility", "visible");
            }
        },

        /**
         * method is triggered when the Continue button on the Puzzle-Level-Complete modal is clicked
         */
        async continueButtonClicked(){

            // go back all the way to the Puzzle-Levels page i.e. the app's main page
            $('#app-main-navigator').get(0).popPage({times: $('#app-main-navigator').get(0).pages.length - 1});
        }
    }

};


