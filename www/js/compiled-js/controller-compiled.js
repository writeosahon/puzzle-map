'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    startup: function startup() {

        // initialise the app libraries and plugins
        ons.ready(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            // set the default handler for the app
                            ons.setDefaultDeviceBackButtonListener(function () {
                                // does nothing for now!!
                            });

                            // create the view-reports-additional menu popover
                            // await ons.createPopover("view-reports-additional-menu-popover-template");

                            // displaying prepping message
                            $('#loader-modal-message').html("Loading App...");
                            $('#loader-modal').get(0).show(); // show loader

                            if (true) {
                                // there is a previous logged in user
                                // load the app main page
                                $('ons-splitter').get(0).content.load("app-main-template");
                            } else {
                                // there is no previously logged in user
                                // load the login page
                                $('ons-splitter').get(0).content.load("login-template");
                            }

                            // START ALL CORDOVA PLUGINS CONFIGURATIONS
                            try {
                                // lock the orientation of the device to 'PORTRAIT'
                                screen.orientation.lock('portrait');
                            } catch (err) {}

                            _context.prev = 5;
                            _context.next = 8;
                            return new Promise(function (resolve, reject) {
                                // Hide system UI and keep it hidden
                                AndroidFullScreen.immersiveMode(resolve, reject);
                            });

                        case 8:
                            _context.next = 12;
                            break;

                        case 10:
                            _context.prev = 10;
                            _context.t0 = _context['catch'](5);

                        case 12:

                            try {// START ALL THE CORDOVA PLUGINS CONFIGURATION WHICH REQUIRE PROMISE SYNTAX
                            } catch (err) {
                                console.log("APP LOADING ERROR", err);
                            } finally {
                                // set status bar color
                                StatusBar.backgroundColorByHexString("#363E7C");
                                navigator.splashscreen.hide(); // hide the splashscreen
                                utopiasoftware[utopiasoftware_app_namespace].model.isAppReady = true; // flag that app is fully loaded and ready
                            }

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[5, 10]]);
        }))); // end of ons.ready()
    },

    /**
     * this is the view-model/controller for the Sample Puzzle page
     */
    samplePuzzlePageViewModel: {

        /**
         * event is triggered when page is initialised
         */
        pageInit: function pageInit(event) {

            //function is used to initialise the page if the app is fully ready for execution
            var loadPageOnAppReady = function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    if (!(!ons.isReady() || utopiasoftware[utopiasoftware_app_namespace].model.isAppReady === false)) {
                                        _context2.next = 3;
                                        break;
                                    }

                                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                                    return _context2.abrupt('return');

                                case 3:

                                    // listen for the back button event
                                    $('#app-main-navigator').get(0).topPage.onDeviceBackButton = utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.backButtonClicked;

                                    //todo
                                    new Draggable.Droppable([].concat(_toConsumableArray($('#sample-puzzle-page .puzzle-pieces-container').get())), {
                                        draggable: 'img.puzzle-pieces',
                                        scrollable: {
                                            sensitivity: 30,
                                            scrollableElements: [].concat(_toConsumableArray($('#sample-puzzle-page .puzzle-pieces-carousel').get()))
                                        },
                                        mirror: {
                                            constrainDimensions: false,
                                            appendTo: 'body'
                                        },
                                        dropzone: $('#sample-puzzle-page .puzzle-drop-zone').get()
                                    }).on("drag:start", function (dragStartEvent) {
                                        $(dragStartEvent.source).removeClass("animated shake tada");
                                        console.log("SOURCE", dragStartEvent.source);
                                    }).on("droppable:start", function (droppableStartEvent) {
                                        console.log("DROP START", droppableStartEvent.dropzone);
                                    }).on("droppable:stop", function (droppableStartEvent) {
                                        console.log("DROP STOP", droppableStartEvent.dropzone);
                                    }).on("droppable:dropped", function (droppableDroppedEvent) {
                                        $('.puzzle-pieces', droppableDroppedEvent.dropzone).addClass("animated tada");
                                        console.log("DROP ZONE", droppableDroppedEvent.dropzone);
                                    });

                                    $('#loader-modal').get(0).hide(); // hide loader

                                case 6:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, this);
                }));

                return function loadPageOnAppReady() {
                    return _ref2.apply(this, arguments);
                };
            }();

            var $thisPage = $(event.target); // get the current page shown
            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");

            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();
        },

        /**
         * method is triggered when page is shown
         */
        pageShow: function pageShow() {
            // disable the swipeable feature for the app splitter
            $('ons-splitter-side').removeAttr("swipeable");

            // adjust the window/view-port settings for when the soft keyboard is displayed
            //window.SoftInputMode.set('adjustPan'); // let the window/view-port 'pan' when the soft keyboard is displayed
        },

        /**
         * method is triggered when page is hidden
         */
        pageHide: function pageHide() {
            // adjust the window/view-port settings for when the soft keyboard is displayed
            // window.SoftInputMode.set('adjustResize'); // let the view 'resize' when the soft keyboard is displayed
        },

        /**
         * method is triggered when page is destroyed
         */
        pageDestroy: function pageDestroy() {},

        /**
         * method is triggered when the device back button is clicked OR a similar action is triggered
         */
        backButtonClicked: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!$('ons-splitter').get(0).right.isOpen) {
                                    _context3.next = 3;
                                    break;
                                }

                                // side menu open, so close it
                                $('ons-splitter').get(0).right.close();
                                return _context3.abrupt('return');

                            case 3:

                                ons.notification.confirm('Do you want to close the app?', { title: 'Exit App',
                                    buttonLabels: ['No', 'Yes'], modifier: 'utopiasoftware-alert-dialog' }) // Ask for confirmation
                                .then(function (index) {
                                    if (index === 1) {
                                        // OK button
                                        navigator.app.exitApp(); // Close the app
                                    }
                                });

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function backButtonClicked() {
                return _ref3.apply(this, arguments);
            }

            return backButtonClicked;
        }()
    }

};

//# sourceMappingURL=controller-compiled.js.map