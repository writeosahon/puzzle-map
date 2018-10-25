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
    appLifeCycleObservable: new Lifecycle({}, ["puzzle-menu:opened", "puzzle-menu:closed", "puzzle-menu:exit-clicked", "puzzle-menu:background-music-clicked", "puzzle-menu:sound-effects-clicked", "puzzle-menu:puzzle-hints-clicked", "app:will-exit", "app:no-exit", "app:exited"], {
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
                            _context.prev = 12;
                            // START ALL THE CORDOVA PLUGINS CONFIGURATION WHICH REQUIRE PROMISE SYNTAX

                            // create the pouchdb app database
                            utopiasoftware[utopiasoftware_app_namespace].model.appDatabase = new PouchDB('mapteazerpuzzle.db', {
                                adapter: 'cordova-sqlite',
                                location: 'default',
                                androidDatabaseImplementation: 2
                            });

                            // load the game settings data stored in the app database
                            _context.prev = 14;
                            _context.next = 17;
                            return utopiasoftware[utopiasoftware_app_namespace].gameSettingsOperations.loadGameSettingsData();

                        case 17:
                            utopiasoftware[utopiasoftware_app_namespace].model.gameSettings = _context.sent;
                            _context.next = 22;
                            break;

                        case 20:
                            _context.prev = 20;
                            _context.t1 = _context["catch"](14);

                        case 22:
                            _context.next = 27;
                            break;

                        case 24:
                            _context.prev = 24;
                            _context.t2 = _context["catch"](12);

                            console.log("APP LOADING ERROR", _context.t2);

                        case 27:
                            _context.prev = 27;

                            // set status bar color
                            StatusBar.backgroundColorByHexString("#363E7C");
                            navigator.splashscreen.hide(); // hide the splashscreen
                            utopiasoftware[utopiasoftware_app_namespace].model.isAppReady = true; // flag that app is fully loaded and ready
                            return _context.finish(27);

                        case 32:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this, [[5, 10], [12, 24, 27, 32], [14, 20]]);
        }))); // end of ons.ready()
    },

    /**
     * this is the view-model/controller for the Puzzle Menu page
     */
    puzzleMenuPageViewModel: {

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
                                    return _context2.abrupt("return");

                                case 3:

                                    // show page process loader
                                    $('#puzzle-menu-page .process-loader').css("display", "block");
                                    // update the Puzzle Menu Settings using the game settings saved by the user
                                    $('#puzzle-menu-page #puzzle-menu-background-music-switch').get(0).checked = utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn;
                                    $('#puzzle-menu-page #puzzle-menu-sound-effects-switch').get(0).checked = utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.soundEffectsOn;
                                    $('#puzzle-menu-page #puzzle-menu-puzzle-hints-switch').get(0).checked = utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.puzzleHintsOn;

                                    // hide page process loader
                                    $('#puzzle-menu-page .process-loader').css("display", "none");

                                case 8:
                                case "end":
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

            // call the function used to initialise the app page if the app is fully loaded
            loadPageOnAppReady();
        },

        /**
         * method is triggered when page is shown
         */
        pageShow: function pageShow() {},

        /**
         * method is triggered when page is hidden
         */
        pageHide: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function pageHide() {
                return _ref3.apply(this, arguments);
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
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                // flag that the puzzle menu has been opened
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:opened");
                                // call all the listeners registered for this lifecycle stage
                                return _context4.abrupt("return", new Promise(function (resolve, reject) {

                                    setTimeout(function () {
                                        // return the values gotten from the registered listeners as the resolved value of the Promise
                                        resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("puzzle-menu:opened", []));
                                    }, 0);
                                }));

                            case 2:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function puzzleMenuOpened() {
                return _ref4.apply(this, arguments);
            }

            return puzzleMenuOpened;
        }(),


        /**
         * method is triggered whenever the puzzle menu is closed
         */
        puzzleMenuClosed: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                // flag that the puzzle menu has been closed
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:closed");
                                // call all the listeners registered for this lifecycle stage
                                return _context5.abrupt("return", new Promise(function (resolve, reject) {

                                    setTimeout(function () {
                                        // return the values gotten from the registered listeners as the resolved value of the Promise
                                        resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("puzzle-menu:closed", []));
                                    }, 0);
                                }));

                            case 2:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function puzzleMenuClosed() {
                return _ref5.apply(this, arguments);
            }

            return puzzleMenuClosed;
        }(),


        /**
         * method is used to listen for when the Exit Button on the menu is clicked
         * @returns {Promise<void>}
         */
        exitButtonClicked: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var exitIndex, willExitEvent;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                // flag that Exit Button on the puzzle menu has been clicked
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:exit-clicked");

                                // call all the listeners registered for this lifecycle stage
                                _context6.next = 3;
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
                                _context6.next = 7;
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
                                willExitEvent = _context6.sent;

                                if (!(willExitEvent.isCanceled === true)) {
                                    _context6.next = 14;
                                    break;
                                }

                                _context6.next = 11;
                                return ons.notification.confirm('', { title: '<ons-icon icon="md-alert-triangle" style="color: #3f51b5" size="33px"></ons-icon> <span style="color: #3f51b5; display: inline-block; margin-left: 1em;">Warning</span>',
                                    messageHTML: willExitEvent.warningMessage + "<br><br>Do you want to close the app?",
                                    buttonLabels: ['No', 'Yes'], modifier: 'utopiasoftware-alert-dialog' });

                            case 11:
                                exitIndex = _context6.sent;
                                _context6.next = 17;
                                break;

                            case 14:
                                _context6.next = 16;
                                return ons.notification.confirm('Do you want to close the app?', { title: 'Exit App',
                                    buttonLabels: ['No', 'Yes'], modifier: 'utopiasoftware-alert-dialog' });

                            case 16:
                                exitIndex = _context6.sent;

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
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function exitButtonClicked() {
                return _ref6.apply(this, arguments);
            }

            return exitButtonClicked;
        }(),


        /**
         * method is used to listen for when the Background Music switch is clicked
         * @returns {Promise<void>}
         */
        backgroundMusicSwitchClicked: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var switchOn;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:

                                // get the current state/status of the background music switch
                                switchOn = $('#puzzle-menu-page #puzzle-menu-background-music-switch').get(0).checked;
                                // update the transient and persistent game settings data with the current state of the switch

                                utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn = switchOn;

                                utopiasoftware[utopiasoftware_app_namespace].gameSettingsOperations.saveGameSettingsData(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings);

                                // flag that Background Music Switch on the puzzle menu has been clicked
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:background-music-clicked");

                                // call all the listeners registered for this lifecycle stage
                                return _context7.abrupt("return", new Promise(function (resolve, reject) {

                                    setTimeout(function () {
                                        // return the values gotten from the registered listeners as the resolved value of the Promise
                                        resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("puzzle-menu:background-music-clicked", [{ switchOn: switchOn }]));
                                    }, 0);
                                }));

                            case 5:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function backgroundMusicSwitchClicked() {
                return _ref7.apply(this, arguments);
            }

            return backgroundMusicSwitchClicked;
        }(),


        /**
         * method is used to listen for when the Sound Effects switch is clicked
         * @returns {Promise<void>}
         */
        soundEffectsSwitchClicked: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var switchOn;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:

                                // get the current state/status of the Sound Effects switch
                                switchOn = $('#puzzle-menu-page #puzzle-menu-sound-effects-switch').get(0).checked;
                                // update the transient and persistent game settings data with the current state of the switch

                                utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.soundEffectsOn = switchOn;

                                utopiasoftware[utopiasoftware_app_namespace].gameSettingsOperations.saveGameSettingsData(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings);

                                // flag that Sound Effects Switch on the puzzle menu has been clicked
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:sound-effects-clicked");

                                // call all the listeners registered for this lifecycle stage
                                return _context8.abrupt("return", new Promise(function (resolve, reject) {

                                    setTimeout(function () {
                                        // return the values gotten from the registered listeners as the resolved value of the Promise
                                        resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("puzzle-menu:sound-effects-clicked", [{ switchOn: switchOn }]));
                                    }, 0);
                                }));

                            case 5:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function soundEffectsSwitchClicked() {
                return _ref8.apply(this, arguments);
            }

            return soundEffectsSwitchClicked;
        }(),


        /**
         * method is used to listen for when the Puzzle Hints switch is clicked
         * @returns {Promise<void>}
         */
        puzzleHintsSwitchClicked: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
                var switchOn;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:

                                // get the current state/status of the Puzzle Hints switch
                                switchOn = $('#puzzle-menu-page #puzzle-menu-puzzle-hints-switch').get(0).checked;
                                // update the transient and persistent game settings data with the current state of the switch

                                utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.puzzleHintsOn = switchOn;

                                utopiasoftware[utopiasoftware_app_namespace].gameSettingsOperations.saveGameSettingsData(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings);

                                // flag that Puzzle Hints Switch on the puzzle menu has been clicked
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.goto("puzzle-menu:puzzle-hints-clicked");

                                // call all the listeners registered for this lifecycle stage
                                return _context9.abrupt("return", new Promise(function (resolve, reject) {

                                    setTimeout(function () {
                                        // return the values gotten from the registered listeners as the resolved value of the Promise
                                        resolve(utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.emit("puzzle-menu:puzzle-hints-clicked", [{ switchOn: switchOn }]));
                                    }, 0);
                                }));

                            case 5:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function puzzleHintsSwitchClicked() {
                return _ref9.apply(this, arguments);
            }

            return puzzleHintsSwitchClicked;
        }(),


        /**
         * method is used to safely toggle the Puzzle Menu open or close
         */
        tooglePuzzleMenu: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.next = 2;
                                return $('#side-menu').get(0).toggle();

                            case 2:
                                return _context10.abrupt("return", _context10.sent);

                            case 3:
                            case "end":
                                return _context10.stop();
                        }
                    }
                }, _callee10, this);
            }));

            function tooglePuzzleMenu() {
                return _ref10.apply(this, arguments);
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
                var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
                    var serverResponse, puzzleLevelContent, index;
                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    if (!(!ons.isReady() || utopiasoftware[utopiasoftware_app_namespace].model.isAppReady === false)) {
                                        _context11.next = 3;
                                        break;
                                    }

                                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                                    return _context11.abrupt("return");

                                case 3:

                                    // listen for the back button event
                                    $('#app-main-navigator').get(0).topPage.onDeviceBackButton = utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.backButtonClicked;

                                    // get the app game config from the stored json data
                                    _context11.next = 6;
                                    return Promise.resolve($.ajax({
                                        url: "game-config.json",
                                        type: "get",
                                        contentType: false,
                                        dataType: "text",
                                        timeout: 240000, // wait for 4 minutes before timeout of request
                                        processData: false
                                    }));

                                case 6:
                                    serverResponse = _context11.sent;


                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.gameConfigObject = JSON.parse(serverResponse); // convert the response to JSON object

                                    puzzleLevelContent = ""; // holds the contents to for the levels

                                    // create the puzzle levels board/content

                                    for (index = 1; index <= utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.gameConfigObject["config"]["total_levels"]; index++) {
                                        puzzleLevelContent += "<div class=\"col-xs-1\" style=\"margin-top: 1em;\"></div>\n                            <div class=\"col-xs-3\" style=\"margin-top: 1em;\"\n                            onclick=\"utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.\n                            loadPuzzleLevel(" + index + ")\">\n                            <ons-ripple></ons-ripple>\n                            <img src=\"game-puzzle/level-" + index + "-puzzle-completed.png\" style=\"width: 90%; height: auto;\">\n                            <span style=\"display: block; width: 100%; text-align: justify; font-size: 0.9em; color: #F4C724;\n                            text-shadow: -1px -1px 2px #000000;\">\n                            LEVEL " + index + "\n                            </span>\n                        </div>";
                                    }

                                    $('#puzzle-levels-page #puzzle-levels-container').html(puzzleLevelContent); // append the content to the page


                                    // check if background music has been enabled

                                    if (!(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true)) {
                                        _context11.next = 16;
                                        break;
                                    }

                                    _context11.next = 14;
                                    return new Promise(function (resolve, reject) {
                                        window.plugins.NativeAudio.preloadComplex('puzzle-levels-background', 'audio/puzzles-select-level-background.mp3', 1, 1, 0, resolve, resolve);
                                    });

                                case 14:
                                    _context11.next = 16;
                                    return new Promise(function (resolve, reject) {
                                        window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, resolve);
                                    });

                                case 16:
                                    _context11.next = 18;
                                    return $('#loader-modal').get(0).hide();

                                case 18:
                                    // hide loader

                                    // set that audio use is ready
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.isAudioReady = true;

                                case 19:
                                case "end":
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, this);
                }));

                return function loadPageOnAppReady() {
                    return _ref11.apply(this, arguments);
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
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                    while (1) {
                        switch (_context12.prev = _context12.next) {
                            case 0:
                                // disable the swipeable feature for the app splitter
                                $('ons-splitter-side').removeAttr("swipeable");

                                // adjust the window/view-port settings for when the soft keyboard is displayed
                                //window.SoftInputMode.set('adjustPan'); // let the window/view-port 'pan' when the soft keyboard is displayed

                                // listen for when the background music switch on the puzzle menu is clicked
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.on("puzzle-menu:background-music-clicked", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.backgroundMusicSwitchClickedListener);

                                // check that audio is ready

                                if (!(utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.isAudioReady === true)) {
                                    _context12.next = 8;
                                    break;
                                }

                                if (!(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true)) {
                                    _context12.next = 8;
                                    break;
                                }

                                _context12.next = 6;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.preloadComplex('puzzle-levels-background', 'audio/puzzles-select-level-background.mp3', 1, 1, 0, resolve, resolve);
                                });

                            case 6:
                                _context12.next = 8;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, resolve);
                                });

                            case 8:
                            case "end":
                                return _context12.stop();
                        }
                    }
                }, _callee12, this);
            }));

            function pageShow() {
                return _ref12.apply(this, arguments);
            }

            return pageShow;
        }(),

        /**
         * method is triggered when page is hidden
         */
        pageHide: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
                return regeneratorRuntime.wrap(function _callee13$(_context13) {
                    while (1) {
                        switch (_context13.prev = _context13.next) {
                            case 0:
                                // adjust the window/view-port settings for when the soft keyboard is displayed
                                // window.SoftInputMode.set('adjustResize'); // let the view 'resize' when the soft keyboard is displayed

                                // remove listener for when the background music switch on the puzzle menu is clicked
                                utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.off("puzzle-menu:background-music-clicked", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.backgroundMusicSwitchClickedListener);

                                if (!(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true)) {
                                    _context13.next = 6;
                                    break;
                                }

                                _context13.next = 4;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, resolve);
                                });

                            case 4:
                                _context13.next = 6;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.unload('puzzle-levels-background', resolve, resolve);
                                });

                            case 6:
                            case "end":
                                return _context13.stop();
                        }
                    }
                }, _callee13, this);
            }));

            function pageHide() {
                return _ref13.apply(this, arguments);
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
            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                _context14.next = 2;
                                return utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.tooglePuzzleMenu();

                            case 2:
                            case "end":
                                return _context14.stop();
                        }
                    }
                }, _callee14, this);
            }));

            function backButtonClicked() {
                return _ref14.apply(this, arguments);
            }

            return backButtonClicked;
        }(),


        /**
         * method is used to load the puzzle level details
         */
        loadPuzzleLevel: function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(levelNumber) {
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                // displaying prepping message
                                $('#loader-modal-message').html("Loading Puzzle Level...");
                                _context15.next = 3;
                                return $('#loader-modal').get(0).show();

                            case 3:
                                if (!(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true)) {
                                    _context15.next = 8;
                                    break;
                                }

                                _context15.next = 6;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, resolve);
                                });

                            case 6:
                                _context15.next = 8;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.unload('puzzle-levels-background', resolve, resolve);
                                });

                            case 8:
                                _context15.next = 10;
                                return $('#app-main-navigator').get(0).pushPage("puzzle-page.html", {
                                    data: { puzzleData: { levelNumber: levelNumber } } });

                            case 10:
                            case "end":
                                return _context15.stop();
                        }
                    }
                }, _callee15, this);
            }));

            function loadPuzzleLevel(_x) {
                return _ref15.apply(this, arguments);
            }

            return loadPuzzleLevel;
        }(),


        /**
         * method id used to listen got
         * @param eventArgs
         * @returns {Promise<void>}
         */
        backgroundMusicSwitchClickedListener: function () {
            var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(eventArgs) {
                var event;
                return regeneratorRuntime.wrap(function _callee16$(_context16) {
                    while (1) {
                        switch (_context16.prev = _context16.next) {
                            case 0:
                                event = eventArgs[0]; // get the event object from eventArgs array

                                // check if background sound is being turned on or off

                                if (!(event.switchOn === true)) {
                                    _context16.next = 8;
                                    break;
                                }

                                _context16.next = 4;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.preloadComplex('puzzle-levels-background', 'audio/puzzles-select-level-background.mp3', 1, 1, 0, resolve, resolve);
                                });

                            case 4:
                                _context16.next = 6;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.loop('puzzle-levels-background', resolve, resolve);
                                });

                            case 6:
                                _context16.next = 12;
                                break;

                            case 8:
                                _context16.next = 10;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.stop('puzzle-levels-background', resolve, resolve);
                                });

                            case 10:
                                _context16.next = 12;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.unload('puzzle-levels-background', resolve, resolve);
                                });

                            case 12:
                            case "end":
                                return _context16.stop();
                        }
                    }
                }, _callee16, this);
            }));

            function backgroundMusicSwitchClickedListener(_x2) {
                return _ref16.apply(this, arguments);
            }

            return backgroundMusicSwitchClickedListener;
        }()
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
         * event is triggered when page is initialised
         */
        pageInit: function pageInit(event) {

            //function is used to initialise the page if the app is fully ready for execution
            var loadPageOnAppReady = function () {
                var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17() {
                    var index, _index, puzzleDisplayHeight, puzzleDisplayWidth, puzzlePieceDimension, puzzlePiecesCounter, rowCounter, totalRows, puzzleRowContent, columnCounter, totalColumns, puzzleColumnContent, _index2, puzzleAnswerPiece;

                    return regeneratorRuntime.wrap(function _callee17$(_context17) {
                        while (1) {
                            switch (_context17.prev = _context17.next) {
                                case 0:
                                    if (!(!ons.isReady() || utopiasoftware[utopiasoftware_app_namespace].model.isAppReady === false)) {
                                        _context17.next = 3;
                                        break;
                                    }

                                    setTimeout(loadPageOnAppReady, 500); // call this function again after half a second
                                    return _context17.abrupt("return");

                                case 3:

                                    // listen for the back button event
                                    $('#app-main-navigator').get(0).topPage.onDeviceBackButton = utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.backButtonClicked;

                                    // set the level number of the puzzle to be loaded
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber = window.parseInt($('#app-main-navigator').get(0).topPage.data.puzzleData.levelNumber);
                                    // flag that puzzle has not been completed
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
                                    // set the puzzle move counter to zero
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter = 0;

                                    // listen for when the puzzle menu is opened
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.on("puzzle-menu:opened", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleMenuOpenedListener);

                                    // listen for when the puzzle menu is closed
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.on("puzzle-menu:closed", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleMenuClosedListener);

                                    // listen for when the app desires/wants to exit
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.on("app:will-exit", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.appWillExitListener);

                                    // listen for when the app is NO LONGER EXITING
                                    utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.on("app:no-exit", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.appNoExitListener);

                                    // check if background music is enabled

                                    if (!(utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.backgroundMusicOn === true)) {
                                        _context17.next = 16;
                                        break;
                                    }

                                    _context17.next = 14;
                                    return new Promise(function (resolve, reject) {
                                        window.plugins.NativeAudio.preloadComplex('puzzle-background', 'audio/puzzle-level-background.mp3', 1, 1, 0, resolve, resolve);
                                    });

                                case 14:
                                    _context17.next = 16;
                                    return new Promise(function (resolve, reject) {
                                        window.plugins.NativeAudio.loop('puzzle-background', resolve, resolve);
                                    });

                                case 16:

                                    // instantiate the puzzleAnswerSheet js Map
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap = new Map();
                                    // use a for loop to set all the answers in the puzzleAnswerSheet to false
                                    for (index = 0; index < utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.gameConfigObject["levels"]["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]["total_puzzle_pieces"]; index++) {

                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.set("" + (index + 1), false);
                                    }

                                    // instantiate the puzzle image assets js Map
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap = new Map();
                                    // set the puzzle-completed image assets
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.set("puzzle-completed", new Image());
                                    if (utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-completed").decoding) {
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-completed").decoding = 'async';
                                    }

                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-completed").src = "game-puzzle/level-" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber + "-puzzle-completed.png";

                                    // set the arrays used for loading all required puzzle 'blank' and 'answer' pieces
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.set("puzzle-block-pieces", []).set("puzzle-answer-pieces", []);
                                    // initialise the puzzle 'block' & 'answer' pieces arrays with their image assets
                                    for (_index = 0; _index < utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.gameConfigObject["levels"]["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]["total_puzzle_pieces"]; _index++) {

                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-block-pieces")[_index] = new Image();
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-answer-pieces")[_index] = new Image();

                                        if (utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-completed").decoding) {
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-block-pieces")[_index].decoding = 'async';
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-answer-pieces")[_index].decoding = 'async';
                                        }

                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-block-pieces")[_index].src = "game-puzzle/level-" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber + "-block-" + (_index + 1) + "-puzzle.png";
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-answer-pieces")[_index].src = "game-puzzle/level-" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber + "-block-" + (_index + 1) + "-answer.png";
                                        // identify the puzzle slot value for each 'answer' puzzle piece
                                        // the puzzle slot value helps to identify if the puzzle piece has been placed in the right place
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-answer-pieces")[_index].puzzleSlotValue = _index + 1;
                                    }

                                    // randomise the created 'answer' puzzle pieces so they don't arrive in puzzle in correct order/sequence
                                    Random.shuffle(utopiasoftware[utopiasoftware_app_namespace].randomisationEngine, utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-answer-pieces"));

                                    // calculate the dimensions of the puzzle display area on the user's device
                                    puzzleDisplayHeight = Math.floor($('#puzzle-page #puzzle-page-puzzle-display-area').height());
                                    puzzleDisplayWidth = Math.floor($('#puzzle-page #puzzle-page-puzzle-display-area').width());
                                    // get a variable to hold the puzzle piece single dimension. Since ALL puzzle pieces are square, dimensions are equal

                                    puzzlePieceDimension = 0;

                                    // check if the puzzle display Height is larger than or equal to the display width

                                    if (puzzleDisplayHeight >= puzzleDisplayWidth) {
                                        // height is >= width
                                        // get the space difference between the height and width and use to set appropriate padding for the puzzle content
                                        $('#puzzle-page #puzzle-page-puzzle-display-area').css({
                                            "padding-top": Math.floor((puzzleDisplayHeight - puzzleDisplayWidth) / 2) + "px",
                                            "padding-bottom": Math.floor((puzzleDisplayHeight - puzzleDisplayWidth) / 2) + "px"
                                        });
                                        // get the dimension for the puzzle pieces
                                        puzzlePieceDimension = Math.floor(puzzleDisplayWidth / Math.sqrt(utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.gameConfigObject["levels"]["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]["total_puzzle_pieces"]));
                                    } else {
                                        // height is < width
                                        // get the space difference between the width and height and use to set appropriate padding for the puzzle content
                                        $('#puzzle-page #puzzle-page-puzzle-display-area').css({
                                            "padding-left": Math.floor((puzzleDisplayWidth - puzzleDisplayHeight) / 2) + "px",
                                            "padding-right": Math.floor((puzzleDisplayWidth - puzzleDisplayHeight) / 2) + "px"
                                        });
                                        // get the dimension for the puzzle pieces
                                        puzzlePieceDimension = Math.floor(puzzleDisplayHeight / Math.sqrt(utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.gameConfigObject["levels"]["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]["total_puzzle_pieces"]));
                                    }

                                    // append the 'blank' puzzle pieces to the puzzle display content
                                    for (puzzlePiecesCounter = 0, rowCounter = 0, totalRows = Math.sqrt(utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.gameConfigObject["levels"]["" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber]["total_puzzle_pieces"]); rowCounter < totalRows; rowCounter++) {
                                        // for loop to generate puzzle display rows

                                        puzzleRowContent = '<div style="display: block; margin:0; padding: 0; width: 100%; white-space: nowrap">';

                                        // for loop to generate puzzle display columns

                                        for (columnCounter = 0, totalColumns = totalRows; columnCounter < totalColumns; columnCounter++) {
                                            puzzleColumnContent = "<span class=\"puzzle-pieces-container puzzle-drop-zone\"\n                                style=\"display: inline-block; margin: 0; padding: 0; width: " + puzzlePieceDimension + "px;\"\n                                data-puzzle-slot=\"" + (puzzlePiecesCounter + 1) + "\">\n                            <img src=\"" + utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-block-pieces")[puzzlePiecesCounter].src + "\" class=\"puzzle-piece-holder\" style=\"width: 100%; height: auto;\">\n                        </span>";

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


                                    // insert two 'answer' puzzle pieces into two puzzle trays
                                    for (_index2 = 0; _index2 < 2; _index2++) {
                                        puzzleAnswerPiece = utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleImageAssetsMap.get("puzzle-answer-pieces").pop();


                                        $('#puzzle-page .puzzle-pieces-tray').eq(_index2).html("<img src=\"" + puzzleAnswerPiece.src + "\" class=\"puzzle-pieces\" style=\"height: 100%; width: auto\" \n                         data-puzzle-slot=\"" + puzzleAnswerPiece.puzzleSlotValue + "\">");
                                    }

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
                                        dropzone: '#puzzle-page .puzzle-drop-zone'
                                    }).removePlugin(Draggable.Plugins.Focusable);

                                    /**
                                     * function uses the "drag:start" event to track which
                                     * exact puzzle piece is being moved.
                                     */
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.on("drag:start", function (dragStartEvent) {
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartSource = $(dragStartEvent.source);
                                    });

                                    /**
                                     * function uses the "droppable:start" event to track when a puzzle piece has started to get dropped.
                                     * The method is used to check the puzzle movements of puzzle pieces
                                     */
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.on("droppable:start", function (droppableStartEvent) {
                                        // get the initial container the element/puzzle piece being dropped originates from
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer = $(droppableStartEvent.dropzone);

                                        // mark the exact time the drop-start commenced
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp = Date.now();
                                        // flag that the puzzle piece has NOT been dropped yet
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDropped = false;

                                        // check that the initial container for the puzzle piece is NOT a 'puzzle-pieces-tray'
                                        if (!utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.is('.puzzle-pieces-tray')) {
                                            // initial container is NOT a 'puzzle-pieces-tray'
                                            // get the puzzle slot value attached to the puzzle piece container.
                                            // the value represents the position of the correct puzzle piece needed to complete the puzzle
                                            var puzzleSlotValue = utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.attr('data-puzzle-slot');

                                            // remove all puzzle hint animations from the container
                                            $(".puzzle-drop-zone[data-puzzle-slot=\"" + puzzleSlotValue + "\"]", $thisPage).removeClass("animated shake pulse");
                                        }
                                    });

                                    /**
                                     * function uses the "droppable:dropped" event to track when a puzzle piece has been dropped.
                                     * The method is used to check the puzzle movements of puzzle pieces
                                     */
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.on("droppable:dropped", function (droppableDroppedEvent) {

                                        // get the container which the element/puzzle piece is being dropped into
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.jqueryDropZone = $(droppableDroppedEvent.dropzone);

                                        // check if the puzzle piece is being dropped in a puzzle-pieces-tray
                                        if (utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.jqueryDropZone.is('.puzzle-pieces-tray')) {
                                            // the puzzle-piece is being dropped in a puzzle-pieces-tray
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = true; // flag that the puzzle-piece was dropped in a puzzle-pieces-tray
                                            // flag the a valid puzzle movement drop has NOT taken place. Because the puzzle piece was moved to a tray
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDropped = false;
                                            // set the puzzle dropped time stamp to zero, since a valid puzzle move did NOT take place
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp = 0;
                                        } else {
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = false; // flag that the puzzle-piece was NOT dropped in a puzzle-pieces-tray

                                            // flag the a valid puzzle movement drop has taken place
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDropped = true;
                                            // set the time the puzzle-piece was dropped to the same drop-start time.
                                            // THIS LOGIC IS VERY IMPORTANT TO ENABLING THE COMPLETION OF A VALID PUZZLE MOVEMENT TRACKING
                                            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp = utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp;
                                        }
                                    });

                                    /**
                                     * function uses the "droppable:stop" event to track when a puzzle piece has finished been dropped.
                                     * The method is used to check the puzzle movements of puzzle pieces
                                     */
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.on("droppable:stop", function (droppableStopEvent) {

                                        // check if this is the completion of a valid puzzle movement
                                        // This is done by check that the movement was flagged as a puzzleDropped action and
                                        // that the puzzle start-drop and puzzle dropped time stamps are exactly the same value
                                        if (utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDropped === true && utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleStartDropStamp === utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartContainer.puzzleDroppedStamp) {
                                            // this is the completion of a valid puzzle movement

                                            // get the puzzle slot value attached to the container where the puzzle piece was finally dropped
                                            var puzzleSlotValue = $(droppableStopEvent.dropzone).attr('data-puzzle-slot');

                                            // check if the puzzle slot value attached to the puzzle piece AND
                                            // the puzzle slot value gotten from the puzzle final drop container are equal
                                            if (utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.dragStartSource.attr('data-puzzle-slot') == puzzleSlotValue) {
                                                // the puzzle slot values are equal
                                                // since the values match, this is the correct puzzle piece movement

                                                // check if user wants puzzle-hints
                                                if (utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.puzzleHintsOn === true) {
                                                    // add positive animation to container
                                                    $(".puzzle-drop-zone[data-puzzle-slot=\"" + puzzleSlotValue + "\"]", $thisPage).addClass("animated pulse");
                                                }

                                                // update the puzzleAnswerSheet map object to indicate this answer was correct
                                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap.set(puzzleSlotValue, true);

                                                // call the method to check the users answer sheet
                                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.checkAnswerSheet();
                                            } else {
                                                // check if user wants puzzle-hints
                                                if (utopiasoftware[utopiasoftware_app_namespace].model.gameSettings.puzzleHintsOn === true) {
                                                    // add negative animation to container
                                                    $(".puzzle-drop-zone[data-puzzle-slot=\"" + puzzleSlotValue + "\"]", $thisPage).addClass("animated shake");
                                                }

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
                                    });

                                    /**
                                     * function uses the "droppable:stop" event to track the
                                     * total number of puzzle moves the user makes, whether valid or invalid.
                                     */
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.draggableDroppableObject.on("droppable:stop", function (droppableStopEvent) {

                                        // increase the move counter value by 1
                                        utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter += 1;
                                        // display the new value of the move counter to the user
                                        $('#puzzle-page .puzzle-moves-counter').html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter);
                                    });

                                    // create the Puzzle Timer object
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer = new Timer();
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start({ startValues: { secondTenths: 0, seconds: 0, minutes: 0, hours: 0, days: 0 },
                                        precision: 'secondTenths' });
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();

                                    // add event listener for when timer value is updated
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.addEventListener("secondTenthsUpdated", function (timer) {
                                        // update the timer counter display on the puzzle
                                        $('#puzzle-page .puzzle-timer-counter').html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
                                    });

                                    // add event listener for when timer value is paused
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.addEventListener("paused", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimerPausedListener);

                                    // pause the puzzle level in order to begin. level starts when user hits "Continue" button
                                    utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.pausePuzzleLevel();
                                    $('#loader-modal').get(0).hide(); // hide loader

                                case 44:
                                case "end":
                                    return _context17.stop();
                            }
                        }
                    }, _callee17, this);
                }));

                return function loadPageOnAppReady() {
                    return _ref17.apply(this, arguments);
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

            // listen for when the background music switch on the puzzle menu is clicked
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.on("puzzle-menu:background-music-clicked", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.backgroundMusicSwitchClickedListener);
        },

        /**
         * method is triggered when page is hidden
         */
        pageHide: function pageHide() {
            // adjust the window/view-port settings for when the soft keyboard is displayed
            // window.SoftInputMode.set('adjustResize'); // let the view 'resize' when the soft keyboard is displayed

            // remove listener for when the background music switch on the puzzle menu is clicked
            utopiasoftware[utopiasoftware_app_namespace].controller.appLifeCycleObservable.off("puzzle-menu:background-music-clicked", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.backgroundMusicSwitchClickedListener);
        },

        /**
         * method is triggered when page is destroyed
         */
        pageDestroy: function pageDestroy() {
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
            // set the puzzle move counter to zero
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter = 0;
            // set the puzzle level number to zero
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.levelNumber = 0;
            // flag that puzzle has NOT been completed
            utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
        },

        /**
         * method is triggered when the device back button is clicked OR a similar action is triggered
         */
        backButtonClicked: function () {
            var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
                return regeneratorRuntime.wrap(function _callee18$(_context18) {
                    while (1) {
                        switch (_context18.prev = _context18.next) {
                            case 0:

                                // flag that the puzzle has not been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;

                                // pause puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();

                                // toggle the puzzle menu
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.tooglePuzzleMenu();

                            case 3:
                            case "end":
                                return _context18.stop();
                        }
                    }
                }, _callee18, this);
            }));

            function backButtonClicked() {
                return _ref18.apply(this, arguments);
            }

            return backButtonClicked;
        }(),


        /**
         * method is used to listen for when the puzzle timer is paused
         *
         * @param timer
         * @returns {Promise<void>}
         */
        puzzleTimerPausedListener: function () {
            var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(timer) {
                return regeneratorRuntime.wrap(function _callee19$(_context19) {
                    while (1) {
                        switch (_context19.prev = _context19.next) {
                            case 0:
                                if (!(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted !== true)) {
                                    _context19.next = 2;
                                    break;
                                }

                                return _context19.abrupt("return");

                            case 2:

                                // update the contents of the level completed modal
                                $('#puzzle-level-complete-modal .level-time').html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
                                $('#puzzle-level-complete-modal .level-moves').html(utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.moveCounter);

                                // show the level completed modal
                                $('#puzzle-level-complete-modal').get(0).show();

                            case 5:
                            case "end":
                                return _context19.stop();
                        }
                    }
                }, _callee19, this);
            }));

            function puzzleTimerPausedListener(_x3) {
                return _ref19.apply(this, arguments);
            }

            return puzzleTimerPausedListener;
        }(),


        /**
         * method is used to check the status of the users puzzle answer sheet.
         * if all puzzle pieces have been place correctly, then the level is completed
         * @returns {Promise<void>}
         */
        checkAnswerSheet: function () {
            var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry;

                return regeneratorRuntime.wrap(function _callee20$(_context20) {
                    while (1) {
                        switch (_context20.prev = _context20.next) {
                            case 0:

                                // update the puzzleAnswerSheet map object to indicate this answer was correct
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context20.prev = 3;
                                _iterator = utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleAnswerSheetMap[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context20.next = 13;
                                    break;
                                }

                                entry = _step.value;

                                if (!(entry[1] === false)) {
                                    _context20.next = 10;
                                    break;
                                }

                                // an answer is still wrong
                                // flag that puzzle has NOT been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
                                return _context20.abrupt("return");

                            case 10:
                                _iteratorNormalCompletion = true;
                                _context20.next = 5;
                                break;

                            case 13:
                                _context20.next = 19;
                                break;

                            case 15:
                                _context20.prev = 15;
                                _context20.t0 = _context20["catch"](3);
                                _didIteratorError = true;
                                _iteratorError = _context20.t0;

                            case 19:
                                _context20.prev = 19;
                                _context20.prev = 20;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 22:
                                _context20.prev = 22;

                                if (!_didIteratorError) {
                                    _context20.next = 25;
                                    break;
                                }

                                throw _iteratorError;

                            case 25:
                                return _context20.finish(22);

                            case 26:
                                return _context20.finish(19);

                            case 27:

                                // flag that puzzle has been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = true;
                                // stop the entire to indicate that puzzle has completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();
                                return _context20.abrupt("return");

                            case 30:
                            case "end":
                                return _context20.stop();
                        }
                    }
                }, _callee20, this, [[3, 15, 19, 27], [20,, 22, 26]]);
            }));

            function checkAnswerSheet() {
                return _ref20.apply(this, arguments);
            }

            return checkAnswerSheet;
        }(),
        pausePuzzleLevel: function () {
            var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21() {
                return regeneratorRuntime.wrap(function _callee21$(_context21) {
                    while (1) {
                        switch (_context21.prev = _context21.next) {
                            case 0:

                                // flag that the puzzle has not been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
                                // pause puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();
                                // show the pause-puzzle-modal
                                _context21.next = 4;
                                return $('#pause-puzzle-modal').get(0).show();

                            case 4:
                            case "end":
                                return _context21.stop();
                        }
                    }
                }, _callee21, this);
            }));

            function pausePuzzleLevel() {
                return _ref21.apply(this, arguments);
            }

            return pausePuzzleLevel;
        }(),
        resumePuzzleLevel: function () {
            var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22() {
                return regeneratorRuntime.wrap(function _callee22$(_context22) {
                    while (1) {
                        switch (_context22.prev = _context22.next) {
                            case 0:

                                // flag that the puzzle has not been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
                                // hide the pause-puzzle-modal
                                _context22.next = 3;
                                return $('#pause-puzzle-modal').get(0).hide();

                            case 3:
                                // resume puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start();

                            case 4:
                            case "end":
                                return _context22.stop();
                        }
                    }
                }, _callee22, this);
            }));

            function resumePuzzleLevel() {
                return _ref22.apply(this, arguments);
            }

            return resumePuzzleLevel;
        }(),


        /**
         * method is used to listen for when the puzzle menu is opened
         * @returns {Promise<void>}
         */
        puzzleMenuOpenedListener: function () {
            var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23() {
                return regeneratorRuntime.wrap(function _callee23$(_context23) {
                    while (1) {
                        switch (_context23.prev = _context23.next) {
                            case 0:
                                // flag that puzzle has NOT been completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleCompleted = false;
                                // pause puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.pause();

                            case 2:
                            case "end":
                                return _context23.stop();
                        }
                    }
                }, _callee23, this);
            }));

            function puzzleMenuOpenedListener() {
                return _ref23.apply(this, arguments);
            }

            return puzzleMenuOpenedListener;
        }(),


        /**
         * method is used to listen for when the puzzle menu is opened
         * @returns {Promise<void>}
         */
        puzzleMenuClosedListener: function () {
            var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee24() {
                return regeneratorRuntime.wrap(function _callee24$(_context24) {
                    while (1) {
                        switch (_context24.prev = _context24.next) {
                            case 0:
                                // resume puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.puzzleTimer.start();

                            case 1:
                            case "end":
                                return _context24.stop();
                        }
                    }
                }, _callee24, this);
            }));

            function puzzleMenuClosedListener() {
                return _ref24.apply(this, arguments);
            }

            return puzzleMenuClosedListener;
        }(),


        /**
         * method is used to listen for when the app notifies that it wants to exit
         * @param eventArgs
         * @returns {Promise<void>}
         */
        appWillExitListener: function () {
            var _ref25 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee25(eventArgs) {
                var event;
                return regeneratorRuntime.wrap(function _callee25$(_context25) {
                    while (1) {
                        switch (_context25.prev = _context25.next) {
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
                                return _context25.stop();
                        }
                    }
                }, _callee25, this);
            }));

            function appWillExitListener(_x4) {
                return _ref25.apply(this, arguments);
            }

            return appWillExitListener;
        }(),


        /**
         * method is listener for when the APP WILL NO LONGER BE EXITED
         * @returns {Promise<void>}
         */
        appNoExitListener: function () {
            var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee26() {
                return regeneratorRuntime.wrap(function _callee26$(_context26) {
                    while (1) {
                        switch (_context26.prev = _context26.next) {
                            case 0:
                            case "end":
                                return _context26.stop();
                        }
                    }
                }, _callee26, this);
            }));

            function appNoExitListener() {
                return _ref26.apply(this, arguments);
            }

            return appNoExitListener;
        }(),


        /**
         * method id used to listen for when the background music switch on the puzzle menu is clicked
         * @param eventArgs
         * @returns {Promise<void>}
         */
        backgroundMusicSwitchClickedListener: function () {
            var _ref27 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee27(eventArgs) {
                var event;
                return regeneratorRuntime.wrap(function _callee27$(_context27) {
                    while (1) {
                        switch (_context27.prev = _context27.next) {
                            case 0:
                                event = eventArgs[0]; // get the event object from eventArgs array

                                // check if background sound is being turned on or off

                                if (!(event.switchOn === true)) {
                                    _context27.next = 8;
                                    break;
                                }

                                _context27.next = 4;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.preloadComplex('puzzle-background', 'audio/puzzle-level-background.mp3', 1, 1, 0, resolve, resolve);
                                });

                            case 4:
                                _context27.next = 6;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.loop('puzzle-background', resolve, resolve);
                                });

                            case 6:
                                _context27.next = 12;
                                break;

                            case 8:
                                _context27.next = 10;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.stop('puzzle-background', resolve, resolve);
                                });

                            case 10:
                                _context27.next = 12;
                                return new Promise(function (resolve, reject) {
                                    window.plugins.NativeAudio.unload('puzzle-background', resolve, resolve);
                                });

                            case 12:
                            case "end":
                                return _context27.stop();
                        }
                    }
                }, _callee27, this);
            }));

            function backgroundMusicSwitchClickedListener(_x5) {
                return _ref27.apply(this, arguments);
            }

            return backgroundMusicSwitchClickedListener;
        }()
    }

};

//# sourceMappingURL=controller-compiled.js.map