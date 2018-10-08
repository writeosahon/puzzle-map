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
            $('#loader-modal-message').html("Loading App...");
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
     * this is the view-model/controller for the Sample Puzzle page
     */
    samplePuzzlePageViewModel: {

        dragStartSource: null,
        jqueryDropZone: null,
        dragStartContainer: null,


        /**
         * event is triggered when page is initialised
         */
        pageInit: function(event){

            var $thisPage = $(event.target); // get the current page shown
            var dragStartSource = null;
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
                    utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.backButtonClicked;

                //todo
                new Draggable.Droppable([...$('#sample-puzzle-page .puzzle-pieces-container').get()], {
                    draggable: 'img.puzzle-pieces',
                    scrollable: {
                        sensitivity: 30,
                        scrollableElements: [...$('#sample-puzzle-page .puzzle-pieces-carousel').get()]
                    },
                    mirror: {
                        constrainDimensions: false,
                        appendTo: 'body'
                    },
                    dropzone: $('#sample-puzzle-page .puzzle-drop-zone').get()
                }).
                on("drag:start", function(dragStartEvent){
                    utopiasoftware[utopiasoftware_app_namespace].controller.
                        samplePuzzlePageViewModel.dragStartSource = $(dragStartEvent.source);
                }).
                on("droppable:start", function(droppableStartEvent){
                    utopiasoftware[utopiasoftware_app_namespace].controller.
                        samplePuzzlePageViewModel.dragStartContainer = $(droppableStartEvent.dropzone);
                    utopiasoftware[utopiasoftware_app_namespace].controller.
                        samplePuzzlePageViewModel.dragStartContainer.puzzleStartDropStamp = Date.now();
                    utopiasoftware[utopiasoftware_app_namespace].controller.
                        samplePuzzlePageViewModel.dragStartContainer.puzzleDropped = false;

                    if(! utopiasoftware[utopiasoftware_app_namespace].controller.
                        samplePuzzlePageViewModel.dragStartContainer.is('.puzzle-pieces-tray')){
                        let puzzleSlotValue = utopiasoftware[utopiasoftware_app_namespace].controller.
                            samplePuzzlePageViewModel.dragStartContainer.attr('data-puzzle-slot');
                        // remove all animation from the container
                        $(`.puzzle-drop-zone[data-puzzle-slot="${puzzleSlotValue}"]`, $thisPage).
                        removeClass("animated shake pulse");
                    }
                }).
                on("droppable:dropped", function(droppableDroppedEvent){
                    console.log("DROP ZONE", droppableDroppedEvent.dropzone);

                    utopiasoftware[utopiasoftware_app_namespace].controller.
                        samplePuzzlePageViewModel.jqueryDropZone = $(droppableDroppedEvent.dropzone);
                    let puzzleSlotValue = null;

                    if(utopiasoftware[utopiasoftware_app_namespace].controller.
                    samplePuzzlePageViewModel.jqueryDropZone.is('.puzzle-pieces-tray')){
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            samplePuzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = true;

                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            samplePuzzlePageViewModel.dragStartContainer.puzzleDropped = false;
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            samplePuzzlePageViewModel.dragStartContainer.puzzleDroppedStamp = 0;
                    }
                    else{
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            samplePuzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = false; // set puzzle tray to false

                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            samplePuzzlePageViewModel.dragStartContainer.puzzleDropped = true;
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            samplePuzzlePageViewModel.dragStartContainer.puzzleDroppedStamp =
                            utopiasoftware[utopiasoftware_app_namespace].controller.
                                samplePuzzlePageViewModel.dragStartContainer.puzzleStartDropStamp;
                    }



                }).
                on("droppable:stop", function(droppableStopEvent){

                    if(utopiasoftware[utopiasoftware_app_namespace].controller.
                        samplePuzzlePageViewModel.dragStartContainer.puzzleDropped === true &&
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            samplePuzzlePageViewModel.dragStartContainer.puzzleStartDropStamp ===
                        utopiasoftware[utopiasoftware_app_namespace].controller.
                            samplePuzzlePageViewModel.dragStartContainer.puzzleDroppedStamp){

                        let puzzleSlotValue = $(droppableStopEvent.dropzone).attr('data-puzzle-slot');


                        if(utopiasoftware[utopiasoftware_app_namespace].controller.
                        samplePuzzlePageViewModel.dragStartSource.attr('data-puzzle-slot') == puzzleSlotValue){
                            // add positive animation to container
                            $(`.puzzle-drop-zone[data-puzzle-slot="${puzzleSlotValue}"]`, $thisPage).
                            addClass("animated pulse");
                        }
                        else{
                            // add negative animation to container
                            $(`.puzzle-drop-zone[data-puzzle-slot="${puzzleSlotValue}"]`, $thisPage).
                            addClass("animated shake");
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
                });


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

            ons.notification.confirm('Do you want to close the app?', {title: 'Exit App',
                buttonLabels: ['No', 'Yes'], modifier: 'utopiasoftware-alert-dialog'}) // Ask for confirmation
                .then(function(index) {
                    if (index === 1) { // OK button
                        navigator.app.exitApp(); // Close the app
                    }
                });
        }

    }

};


