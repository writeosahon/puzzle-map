"use strict";

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
     * create the LifeCycle object for managing different app states
     */
    appLifeCycleObservable: new Lifecycle({}, ["puzzle-menu:opened", "puzzle-menu:closed", "puzzle-menu:exit-clicked", "app:will-exit", "app:no-exit", "app:exited"], {
        autoStart: false, autoEmit: false, autoEnd: false }).start(),

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
                            $('#loader-modal-message').html("Loading Puzzle...");
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
                            _context.t0 = _context["catch"](5);

                        case 12:

                            try {
                                // START ALL THE CORDOVA PLUGINS CONFIGURATION WHICH REQUIRE PROMISE SYNTAX

                                // create the pouchdb app database
                                utopiasoftware[utopiasoftware_app_namespace].model.appDatabase = new PouchDB('mapteazerpuzzle.db', {
                                    adapter: 'cordova-sqlite',
                                    location: 'default',
                                    androidDatabaseImplementation: 2
                                });

                                // load the game settings data stored in the app database
                            } catch (err) {
                                console.log("APP LOADING ERROR", err);
                            } finally {
                                // set status bar color
                                StatusBar.backgroundColorByHexString("#363E7C");
                                navigator.splashscreen.hide(); // hide the splashscreen
                                utopiasoftware[utopiasoftware_app_namespace].model.isAppReady = true; // flag that app is fully loaded and ready
                            }

                        case 13:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[5, 10]]);
        }))); // end of ons.ready()
    },

    /**
     * this is the view-model/controller for the Puzzle Menu page
     */
    puzzleMenuPageViewModel: {

        /**
         * event is triggered when page is initialised
         */
        pageInit: function pageInit(event) {},

        /**
         * method is triggered when page is shown
         */
        pageShow: function pageShow() {},

        /**
         * method is triggered when page is hidden
         */
        pageHide: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function pageHide() {
                return _ref2.apply(this, arguments);
            }

            return pageHide;
        }(),

        /**
         * method is triggered when page is destroyed
         */
        pageDestroy: function pageDestroy() {},

        /**
         * method is triggered whenever the puzzle menu is opened
         */
        puzzleMenuOpened: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                // flag that the puzzle menu has been opened
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:opened");
                                // call all the listeners registered for this lifecycle stage
                                return _context3.abrupt("return", new Promise(function (resolve, reject) {

                                    setTimeout(function () {
                                        // return the values gotten from the registered listeners as the resolved value of the Promise
                                        resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("puzzle-menu:opened", []));
                                    }, 0);
                                }));

                            case 2:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function puzzleMenuOpened() {
                return _ref3.apply(this, arguments);
            }

            return puzzleMenuOpened;
        }(),


        /**
         * method is triggered whenever the puzzle menu is closed
         */
        puzzleMenuClosed: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                // flag that the puzzle menu has been closed
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:closed");
                                // call all the listeners registered for this lifecycle stage
                                return _context4.abrupt("return", new Promise(function (resolve, reject) {

                                    setTimeout(function () {
                                        // return the values gotten from the registered listeners as the resolved value of the Promise
                                        resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("puzzle-menu:closed", []));
                                    }, 0);
                                }));

                            case 2:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function puzzleMenuClosed() {
                return _ref4.apply(this, arguments);
            }

            return puzzleMenuClosed;
        }(),


        /**
         * method is used to listener for when the Exit Button on the menu is clicked
         * @returns {Promise<void>}
         */
        exitButtonClicked: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var exitIndex, willExitEvent;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                // flag that Exit Button on the puzzle menu has been clicked
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:exit-clicked");

                                // call all the listeners registered for this lifecycle stage
                                _context5.next = 3;
                                return new Promise(function (resolve, reject) {

                                    setTimeout(function () {
                                        // return the values gotten from the registered listeners as the resolved value of the Promise
                                        resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("puzzle-menu:exit-clicked", []));
                                    }, 0);
                                });

                            case 3:
                                exitIndex = -1; // holds the exit index gotten from the user's confirmation of exit


                                // flag that the app will soon exit if the listeners do not prevent it

                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("app:will-exit");

                                // call all the listeners registered for this lifecycle stage
                                _context5.next = 7;
                                return new Promise(function (resolve, reject) {
                                    setTimeout(function () {
                                        // lifecycle event object.
                                        // listeners can cancel the event that logically follows by setting its cancel property to true
                                        var eventObject = {};
                                        // define properties for the event object
                                        eventObject = Object.defineProperties(eventObject, {
                                            "canCancel": {
                                                value: true,
                                                enumerable: true,
                                                configurable: false,
                                                writable: false
                                            },
                                            "isCanceled": {
                                                get: function () {
                                                    return typeof this.cancel === "boolean" ? this.cancel : new Boolean(this.cancel).valueOf();
                                                }.bind(eventObject),
                                                set: function set(cancellation) {},
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
                                        utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("app:will-exit", [eventObject]);
                                        // resolve this promise with the event object
                                        resolve(eventObject);
                                    }, 0); // end of setTimeout
                                });

                            case 7:
                                willExitEvent = _context5.sent;

                                if (!(willExitEvent.isCanceled === true)) {
                                    _context5.next = 14;
                                    break;
                                }

                                _context5.next = 11;
                                return ons.notification.confirm('', { title: '<ons-icon icon="md-alert-triangle" style="color: #3f51b5" size="33px"></ons-icon> <span style="color: #3f51b5; display: inline-block; margin-left: 1em;">Warning</span>',
                                    messageHTML: willExitEvent.warningMessage + "<br><br>Do you want to close the app?",
                                    buttonLabels: ['No', 'Yes'], modifier: 'utopiasoftware-alert-dialog' });

                            case 11:
                                exitIndex = _context5.sent;
                                _context5.next = 17;
                                break;

                            case 14:
                                _context5.next = 16;
                                return ons.notification.confirm('Do you want to close the app?', { title: 'Exit App',
                                    buttonLabels: ['No', 'Yes'], modifier: 'utopiasoftware-alert-dialog' });

                            case 16:
                                exitIndex = _context5.sent;

                            case 17:

                                // check if the user decided to exit the app
                                if (exitIndex === 1) {
                                    // user want to exit
                                    // flag that the app has exited
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("app:exited");
                                    // notify all listeners that app has exited
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("app:exited", []);
                                    navigator.app.exitApp(); // close/exit the app
                                } else {
                                    // user does not want to exit
                                    // flag that the app NOT EXITED
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("app:no-exit");
                                    // notify all listeners that app NOT EXITED
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("app:no-exit", []);
                                }

                            case 18:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function exitButtonClicked() {
                return _ref5.apply(this, arguments);
            }

            return exitButtonClicked;
        }(),


        /**
         * method is used to safely toggle the Puzzle Menu open or close
         */
        tooglePuzzleMenu: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return $('#side-menu').get(0).toggle();

                            case 2:
                                return _context6.abrupt("return", _context6.sent);

                            case 3:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function tooglePuzzleMenu() {
                return _ref6.apply(this, arguments);
            }

            return tooglePuzzleMenu;
        }()
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
        pageInit: function pageInit(event) {

            //function is used to initialise the page if the app is fully ready for execution
            var loadPageOnAppReady = function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                    var serverResponse, puzzleLevelContent, index;
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while (1) {
                            switch (_context7.prev = _context7.next) {
                                case 0:
                                    if (!(!ons.isReady() || utopiasoftware[utopiasoftware_app_namespace].model.isAppReady === false)) {
                                        _context7.next = 3;
                                        break;
                                    }

                                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                                    return _context7.abrupt("return");

                                case 3:

                                    // listen for the back button event
                                    $('#app-main-navigator').get(0).topPage.onDeviceBackButton = utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.backButtonClicked;

                                    // get the app game config from the stored json data
                                    _context7.next = 6;
                                    return Promise.resolve($.ajax({
                                        url: "game-config.json",
                                        type: "get",
                                        contentType: false,
                                        dataType: "text",
                                        timeout: 240000, // wait for 4 minutes before timeout of request
                                        processData: false
                                    }));

                                case 6:
                                    serverResponse = _context7.sent;


                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.gameConfigObject = JSON.parse(serverResponse); // convert the response to JSON object

                                    puzzleLevelContent = ""; // holds the contents to for the levels

                                    // create the puzzle levels board/content

                                    for (index = 1; index <= utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.gameConfigObject["config"]["total_levels"]; index++) {
                                        puzzleLevelContent += "<div class=\"col-xs-1\" style=\"margin-top: 1em;\"></div>\n                            <div class=\"col-xs-3\" style=\"margin-top: 1em;\"\n                            onclick=\"utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.\n                            loadPuzzleLevel(" + index + ")\">\n                            <ons-ripple></ons-ripple>\n                            <img src=\"game-puzzle/level-" + index + "-puzzle-completed.png\" style=\"width: 90%; height: auto;\">\n                            <span style=\"display: block; width: 100%; text-align: justify; font-size: 0.9em; color: #F4C724;\n                            text-shadow: -1px -1px 2px #000000;\">\n                            LEVEL 1\n                            </span>\n                        </div>";
                                    }

                                    $('#puzzle-levels-page #puzzle-levels-container').html(puzzleLevelContent); // append the content to the page


                                    // add background tune
                                    _context7.next = 13;
                                    return new Promise(function (resolve, reject) {
                                        window.plugins.NativeAudio.preloadComplex('puzzle-levels-background', 'audio/puzzles-select-level-background.mp3', 1, 1, 0, resolve, resolve);
                                    });

                                case 13:
                                    _context7.next = 15;
                                    return new Promise(function (resolve, reject) {
                                        window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, resolve);
                                    });

                                case 15:
                                    _context7.next = 17;
                                    return $('#loader-modal').get(0).hide();

                                case 17:
                                    // hide loader

                                    // set that audio use is ready
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.isAudioReady = true;

                                case 18:
                                case "end":
                                    return _context7.stop();
                            }
                        }
                    }, _callee7, this);
                }));

                return function loadPageOnAppReady() {
                    return _ref7.apply(this, arguments);
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
        pageShow: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                // disable the swipeable feature for the app splitter
                                $('ons-splitter-side').removeAttr("swipeable");

                                // adjust the window/view-port settings for when the soft keyboard is displayed
                                //window.SoftInputMode.set('adjustPan'); // let the window/view-port 'pan' when the soft keyboard is displayed

                                // check that audio is ready

                                if (!(utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.isAudioReady === true)) {
                                    _context8.next = 6;
                                    break;
                                }

                                _context8.next = 4;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.preloadComplex('puzzle-levels-background', 'audio/puzzles-select-level-background.mp3', 1, 1, 0, resolve, resolve);
                                });

                            case 4:
                                _context8.next = 6;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, resolve);
                                });

                            case 6:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function pageShow() {
                return _ref8.apply(this, arguments);
            }

            return pageShow;
        }(),

        /**
         * method is triggered when page is hidden
         */
        pageHide: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.next = 2;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, resolve);
                                });

                            case 2:
                                _context9.next = 4;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.unload('puzzle-levels-background', resolve, resolve);
                                });

                            case 4:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function pageHide() {
                return _ref9.apply(this, arguments);
            }

            return pageHide;
        }(),

        /**
         * method is triggered when page is destroyed
         */
        pageDestroy: function pageDestroy() {},

        /**
         * method is triggered when the device back button is clicked OR a similar action is triggered
         */
        backButtonClicked: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.tooglePuzzleMenu();

                            case 2:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function backButtonClicked() {
                return _ref10.apply(this, arguments);
            }

            return backButtonClicked;
        }(),


        /**
         * method is used to load the puzzle level details
         */
        loadPuzzleLevel: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(levelNumber) {
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                // displaying prepping message
                                $('#loader-modal-message').html("Loading Puzzle Level...");
                                _context11.next = 3;
                                return $('#loader-modal').get(0).show();

                            case 3:
                                _context11.next = 5;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, resolve);
                                });

                            case 5:
                                _context11.next = 7;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.unload('puzzle-levels-background', resolve, resolve);
                                });

                            case 7:
                                _context11.next = 9;
                                return $('#app-main-navigator').get(0).pushPage("puzzle-page.html", {
                                    data: { puzzleData: { levelNumber: levelNumber } } });

                            case 9:
                            case "end":
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function loadPuzzleLevel(_x) {
                return _ref11.apply(this, arguments);
            }

            return loadPuzzleLevel;
        }()
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
        pageInit: function pageInit(event) {

            //function is used to initialise the page if the app is fully ready for execution
            var loadPageOnAppReady = function () {
                var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                    var index;
                    return regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while (1) {
                            switch (_context12.prev = _context12.next) {
                                case 0:
                                    if (!(!ons.isReady() || utopiasoftware[utopiasoftware_app_namespace].model.isAppReady === false)) {
                                        _context12.next = 3;
                                        break;
                                    }

                                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                                    return _context12.abrupt("return");

                                case 3:

                                    // listen for the back button event
                                    $('#app-main-navigator').get(0).topPage.onDeviceBackButton = utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.backButtonClicked;

                                    // listen for when the puzzle menu is opened
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.on("puzzle-menu:opened", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleMenuOpenedListener);

                                    // listen for when the puzzle menu is closed
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.on("puzzle-menu:closed", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleMenuClosedListener);

                                    // listen for when the app desires/wants to exit
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.on("app:will-exit", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.appWillExitListener);

                                    // listen for when the app is NO LONGER EXITING
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.on("app:no-exit", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.appNoExitListener);

                                    // add puzzle level background tune
                                    _context12.next = 10;
                                    return new Promise(function (resolve, reject) {
                                        window.plugins.NativeAudio.preloadComplex('puzzle-background', 'audio/puzzle-level-background.mp3', 1, 1, 0, resolve, resolve);
                                    });

                                case 10:
                                    _context12.next = 12;
                                    return new Promise(function (resolve, reject) {
                                        window.plugins.NativeAudio.loop('puzzle-background', resolve, resolve);
                                    });

                                case 12:

                                    // create the Draggable.Droppable object
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject = new Draggable.Droppable([].concat(_toConsumableArray($('#puzzle-page .puzzle-pieces-container').get())), {
                                        draggable: 'img.puzzle-pieces',
                                        scrollable: {
                                            sensitivity: 30,
                                            scrollableElements: [].concat(_toConsumableArray($('#puzzle-page .puzzle-pieces-carousel').get()))
                                        },
                                        mirror: {
                                            constrainDimensions: false,
                                            appendTo: 'body'
                                        },
                                        dropzone: $('#puzzle-page .puzzle-drop-zone').get()
                                    }).removePlugin(Draggable.Plugins.Focusable).on("drag:start", function (dragStartEvent) {
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartSource = $(dragStartEvent.source);
                                    }).on("droppable:start", function (droppableStartEvent) {
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer = $(droppableStartEvent.dropzone);
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp = Date.now();
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDropped = false;

                                        if (!utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.is('.puzzle-pieces-tray')) {
                                            var puzzleSlotValue = utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.attr('data-puzzle-slot');
                                            // remove all animation from the container
                                            $(".puzzle-drop-zone[data-puzzle-slot=\"" + puzzleSlotValue + "\"]", $thisPage).removeClass("animated shake pulse");
                                        }
                                    }).on("droppable:dropped", function (droppableDroppedEvent) {
                                        console.log("DROP ZONE", droppableDroppedEvent.dropzone);

                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.jqueryDropZone = $(droppableDroppedEvent.dropzone);
                                        var puzzleSlotValue = null;

                                        if (utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.jqueryDropZone.is('.puzzle-pieces-tray')) {
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = true;

                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDropped = false;
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp = 0;
                                        } else {
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = false; // set puzzle tray to false

                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDropped = true;
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp = utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp;
                                        }
                                    }).on("droppable:stop", function (droppableStopEvent) {

                                        if (utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDropped === true && utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp === utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp) {

                                            var puzzleSlotValue = $(droppableStopEvent.dropzone).attr('data-puzzle-slot');

                                            if (utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartSource.attr('data-puzzle-slot') == puzzleSlotValue) {
                                                // add positive animation to container
                                                $(".puzzle-drop-zone[data-puzzle-slot=\"" + puzzleSlotValue + "\"]", $thisPage).addClass("animated pulse");

                                                // update the puzzleAnswerSheet map object to indicate this answer was correct
                                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.set(puzzleSlotValue, true);

                                                // call the method to check the users answer sheet
                                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.checkAnswerSheet();
                                            } else {
                                                // add negative animation to container
                                                $(".puzzle-drop-zone[data-puzzle-slot=\"" + puzzleSlotValue + "\"]", $thisPage).addClass("animated shake");

                                                // update the puzzleAnswerSheet map object to indicate this answer was wrong
                                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.set(puzzleSlotValue, false);
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
                                    }).on("droppable:dropped", function (droppableDroppedEvent) {
                                        console.log("DROP ZONE", droppableDroppedEvent.dropzone);

                                        // increase the move counter value by 1
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter += 1;
                                        // display the new value of the move counter to the user
                                        $('#puzzle-page .puzzle-moves-counter').html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter);
                                    });

                                    // instantiate the puzzleAnswerSheet js Map
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap = new Map();
                                    for (index = 0; index < 3; index++) {
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.set("" + (index + 1), false);
                                    }

                                    // create the Puzzle Timer object
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer = new Timer();
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start({ startValues: { secondTenths: 0, seconds: 0, minutes: 0, hours: 0, days: 0 },
                                        precision: 'secondTenths' });
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();

                                    // add event listener for when timer value is updated
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.addEventListener("secondTenthsUpdated", function (timer) {
                                        $('#puzzle-page .puzzle-timer-counter').html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
                                    });

                                    // add event listener for when timer value is stopped
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.addEventListener("paused", function (timer) {

                                        // check if puzzle has been completed
                                        if (utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted !== true) {
                                            // puzzle has not been completed, so exit method
                                            return;
                                        }
                                        // update the contents of the level completed modal
                                        $('#puzzle-level-complete-modal .level-time').html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
                                        $('#puzzle-level-complete-modal .level-moves').html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter);

                                        // show the level completed modal
                                        $('#puzzle-level-complete-modal').get(0).show();
                                    });

                                    // flag that puzzle has not been completed
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;

                                    // pause the puzzle level in order to begin. level starts when user hits "Continue" button
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.pausePuzzleLevel();
                                    $('#loader-modal').get(0).hide(); // hide loader

                                case 23:
                                case "end":
                                    return _context12.stop();
                            }
                        }
                    }, _callee12, this);
                }));

                return function loadPageOnAppReady() {
                    return _ref12.apply(this, arguments);
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
        pageDestroy: function pageDestroy() {
            // flag that puzzle has been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = true;
        },

        /**
         * method is triggered when the device back button is clicked OR a similar action is triggered
         */
        backButtonClicked: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:

                                // flag that the puzzle has not been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;

                                // pause puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();

                                // toggle the puzzle menu
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.tooglePuzzleMenu();

                            case 3:
                            case "end":
                                return _context13.stop();
                        }
                    }
                }, _callee13, this);
            }));

            function backButtonClicked() {
                return _ref13.apply(this, arguments);
            }

            return backButtonClicked;
        }(),


        /**
         * method is used to check the status of the users puzzle answer sheet.
         * if all puzzle pieces have been place correctly, then the level is completed
         * @returns {Promise<void>}
         */
        checkAnswerSheet: function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry;

                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:

                                // update the puzzleAnswerSheet map object to indicate this answer was correct
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context14.prev = 3;
                                _iterator = utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context14.next = 13;
                                    break;
                                }

                                entry = _step.value;

                                if (!(entry[1] === false)) {
                                    _context14.next = 10;
                                    break;
                                }

                                // an answer is still wrong
                                // flag that puzzle has NOT been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
                                return _context14.abrupt("return");

                            case 10:
                                _iteratorNormalCompletion = true;
                                _context14.next = 5;
                                break;

                            case 13:
                                _context14.next = 19;
                                break;

                            case 15:
                                _context14.prev = 15;
                                _context14.t0 = _context14["catch"](3);
                                _didIteratorError = true;
                                _iteratorError = _context14.t0;

                            case 19:
                                _context14.prev = 19;
                                _context14.prev = 20;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 22:
                                _context14.prev = 22;

                                if (!_didIteratorError) {
                                    _context14.next = 25;
                                    break;
                                }

                                throw _iteratorError;

                            case 25:
                                return _context14.finish(22);

                            case 26:
                                return _context14.finish(19);

                            case 27:

                                // flag that puzzle has been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = true;
                                // stop the entire to indicate that puzzle has completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();
                                return _context14.abrupt("return");

                            case 30:
                            case "end":
                                return _context14.stop();
                        }
                    }
                }, _callee14, this, [[3, 15, 19, 27], [20,, 22, 26]]);
            }));

            function checkAnswerSheet() {
                return _ref14.apply(this, arguments);
            }

            return checkAnswerSheet;
        }(),
        pausePuzzleLevel: function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:

                                // flag that the puzzle has not been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
                                // pause puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();
                                // show the pause-puzzle-modal
                                _context15.next = 4;
                                return $('#pause-puzzle-modal').get(0).show();

                            case 4:
                            case "end":
                                return _context15.stop();
                        }
                    }
                }, _callee15, this);
            }));

            function pausePuzzleLevel() {
                return _ref15.apply(this, arguments);
            }

            return pausePuzzleLevel;
        }(),
        resumePuzzleLevel: function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:

                                // flag that the puzzle has not been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
                                // hide the pause-puzzle-modal
                                _context16.next = 3;
                                return $('#pause-puzzle-modal').get(0).hide();

                            case 3:
                                // resume puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start();

                            case 4:
                            case "end":
                                return _context16.stop();
                        }
                    }
                }, _callee16, this);
            }));

            function resumePuzzleLevel() {
                return _ref16.apply(this, arguments);
            }

            return resumePuzzleLevel;
        }(),


        /**
         * method is used to listen for when the puzzle menu is opened
         * @returns {Promise<void>}
         */
        puzzleMenuOpenedListener: function () {
            var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
                return regeneratorRuntime.wrap(function _callee17$(_context17) {
                    while (1) {
                        switch (_context17.prev = _context17.next) {
                            case 0:
                                // flag that puzzle has NOT been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
                                // pause puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();

                            case 2:
                            case "end":
                                return _context17.stop();
                        }
                    }
                }, _callee17, this);
            }));

            function puzzleMenuOpenedListener() {
                return _ref17.apply(this, arguments);
            }

            return puzzleMenuOpenedListener;
        }(),


        /**
         * method is used to listen for when the puzzle menu is opened
         * @returns {Promise<void>}
         */
        puzzleMenuClosedListener: function () {
            var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
                return regeneratorRuntime.wrap(function _callee18$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:
                                // resume puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start();

                            case 1:
                            case "end":
                                return _context18.stop();
                        }
                    }
                }, _callee18, this);
            }));

            function puzzleMenuClosedListener() {
                return _ref18.apply(this, arguments);
            }

            return puzzleMenuClosedListener;
        }(),


        /**
         * method is used to listen for when the app notifies that it wants to exit
         * @param eventArgs
         * @returns {Promise<void>}
         */
        appWillExitListener: function () {
            var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(eventArgs) {
                var event;
                return regeneratorRuntime.wrap(function _callee19$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                event = eventArgs[0]; // get the event object from eventArgs array
                                // check if event has been canceled

                                if (event.isCanceled !== true) {
                                    // event has not been canceled
                                    // check if puzzle has been completed
                                    if (utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted !== true) {
                                        // puzzle level has not been completed

                                        // since user has not completed the puzzle, try to prevent app exit using a warning
                                        event.cancel = true;
                                        // attach the warning message for preventing exit
                                        event.warningMessage = "All progress on this puzzle will be lost if you exit now.";
                                    }
                                }

                            case 2:
                            case "end":
                                return _context19.stop();
                        }
                    }
                }, _callee19, this);
            }));

            function appWillExitListener(_x2) {
                return _ref19.apply(this, arguments);
            }

            return appWillExitListener;
        }(),


        /**
         * method is listener for when the APP WILL NO LONGER BE EXITED
         * @returns {Promise<void>}
         */
        appNoExitListener: function () {
            var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
                return regeneratorRuntime.wrap(function _callee20$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:
                            case "end":
                                return _context20.stop();
                        }
                    }
                }, _callee20, this);
            }));

            function appNoExitListener() {
                return _ref20.apply(this, arguments);
            }

            return appNoExitListener;
        }()
    }

};

//# sourceMappingURL=controller-compiled.js.map