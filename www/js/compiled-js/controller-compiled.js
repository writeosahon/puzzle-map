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

        draggableDroppableObject: null,
        dragStartSource: null,
        jqueryDropZone: null,
        dragStartContainer: null,
        moveCounter: 0,
        puzzleTimer: null,
        puzzleAnswerSheetMap: null,

        /**
         * event is triggered when page is initialised
         */
        pageInit: function pageInit(event) {

            //function is used to initialise the page if the app is fully ready for execution
            var loadPageOnAppReady = function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                    var index;
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

                                    // create the Draggable.Droppable object
                                    utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.draggableDroppableObject = new Draggable.Droppable([].concat(_toConsumableArray($('#sample-puzzle-page .puzzle-pieces-container').get())), {
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
                                    }).removePlugin(Draggable.Droppable.Plugin.Focusable).on("drag:start", function (dragStartEvent) {
                                        utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartSource = $(dragStartEvent.source);
                                    }).on("droppable:start", function (droppableStartEvent) {
                                        utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer = $(droppableStartEvent.dropzone);
                                        utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.puzzleStartDropStamp = Date.now();
                                        utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.puzzleDropped = false;

                                        if (!utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.is('.puzzle-pieces-tray')) {
                                            var puzzleSlotValue = utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.attr('data-puzzle-slot');
                                            // remove all animation from the container
                                            $('.puzzle-drop-zone[data-puzzle-slot="' + puzzleSlotValue + '"]', $thisPage).removeClass("animated shake pulse");
                                        }
                                    }).on("droppable:dropped", function (droppableDroppedEvent) {
                                        console.log("DROP ZONE", droppableDroppedEvent.dropzone);

                                        utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.jqueryDropZone = $(droppableDroppedEvent.dropzone);
                                        var puzzleSlotValue = null;

                                        if (utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.jqueryDropZone.is('.puzzle-pieces-tray')) {
                                            utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = true;

                                            utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.puzzleDropped = false;
                                            utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.puzzleDroppedStamp = 0;
                                        } else {
                                            utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.jqueryDropZone.isPuzzlePieceTray = false; // set puzzle tray to false

                                            utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.puzzleDropped = true;
                                            utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.puzzleDroppedStamp = utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.puzzleStartDropStamp;
                                        }
                                    }).on("droppable:stop", function (droppableStopEvent) {

                                        if (utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.puzzleDropped === true && utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.puzzleStartDropStamp === utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartContainer.puzzleDroppedStamp) {

                                            var puzzleSlotValue = $(droppableStopEvent.dropzone).attr('data-puzzle-slot');

                                            if (utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.dragStartSource.attr('data-puzzle-slot') == puzzleSlotValue) {
                                                // add positive animation to container
                                                $('.puzzle-drop-zone[data-puzzle-slot="' + puzzleSlotValue + '"]', $thisPage).addClass("animated pulse");

                                                // update the puzzleAnswerSheet map object to indicate this answer was correct
                                                utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleAnswerSheetMap.set(puzzleSlotValue, true);

                                                // call the method to check the users answer sheet
                                                utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.checkAnswerSheet();
                                            } else {
                                                // add negative animation to container
                                                $('.puzzle-drop-zone[data-puzzle-slot="' + puzzleSlotValue + '"]', $thisPage).addClass("animated shake");

                                                // update the puzzleAnswerSheet map object to indicate this answer was wrong
                                                utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleAnswerSheetMap.set(puzzleSlotValue, false);
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
                                        utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.moveCounter += 1;
                                        // display the new value of the move counter to the user
                                        $('#sample-puzzle-page .puzzle-moves-counter').html(utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.moveCounter);
                                    });

                                    // instantiate the puzzleAnswerSheet
                                    utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleAnswerSheetMap = new Map();
                                    for (index = 0; index < 3; index++) {
                                        utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleAnswerSheetMap.set("" + (index + 1), false);
                                    }

                                    // create the Puzzle Timer object
                                    utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleTimer = new Timer();
                                    utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleTimer.start({ startValues: { secondTenths: 0, seconds: 0, minutes: 0, hours: 0, days: 0 },
                                        precision: 'secondTenths' });
                                    utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleTimer.pause();

                                    // add event listener for when timer value is updated
                                    utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleTimer.addEventListener("secondTenthsUpdated", function (timer) {
                                        $('#sample-puzzle-page .puzzle-timer-counter').html(utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleTimer.getTimeValues().toString(['hours', 'minutes', 'seconds', 'secondTenths']));
                                    });

                                    // add event listener for when timer value is stopped
                                    utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleTimer.addEventListener("stopped", function (timer) {
                                        // displaying prepping message
                                        $('#loader-modal-message').html("Puzzle Completed!");
                                        $('#loader-modal').get(0).show(); // show loader
                                    });

                                    // start the puzzle timer
                                    utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleTimer.reset();
                                    $('#loader-modal').get(0).hide(); // hide loader

                                case 14:
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

                                // pause puzzle timer
                                utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleTimer.pause();

                                ons.notification.confirm('Do you want to close the app?', { title: 'Exit App',
                                    buttonLabels: ['No', 'Yes'], modifier: 'utopiasoftware-alert-dialog' }) // Ask for confirmation
                                .then(function (index) {
                                    if (index === 1) {
                                        // OK button
                                        navigator.app.exitApp(); // Close the app
                                    } else {
                                        // resume the puzzle timer
                                        utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleTimer.start();
                                    }
                                });

                            case 5:
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
        }(),
        checkAnswerSheet: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, entry;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:

                                // update the puzzleAnswerSheet map object to indicate this answer was correct
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context4.prev = 3;
                                _iterator = utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleAnswerSheetMap[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context4.next = 12;
                                    break;
                                }

                                entry = _step.value;

                                if (!(entry[1] === false)) {
                                    _context4.next = 9;
                                    break;
                                }

                                return _context4.abrupt('return');

                            case 9:
                                _iteratorNormalCompletion = true;
                                _context4.next = 5;
                                break;

                            case 12:
                                _context4.next = 18;
                                break;

                            case 14:
                                _context4.prev = 14;
                                _context4.t0 = _context4['catch'](3);
                                _didIteratorError = true;
                                _iteratorError = _context4.t0;

                            case 18:
                                _context4.prev = 18;
                                _context4.prev = 19;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 21:
                                _context4.prev = 21;

                                if (!_didIteratorError) {
                                    _context4.next = 24;
                                    break;
                                }

                                throw _iteratorError;

                            case 24:
                                return _context4.finish(21);

                            case 25:
                                return _context4.finish(18);

                            case 26:
                                // stop the entire to indicate that puzzle has completed
                                utopiasoftware[utopiasoftware_app_namespace].controller.samplePuzzlePageViewModel.puzzleTimer.stop();
                                return _context4.abrupt('return');

                            case 28:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[3, 14, 18, 26], [19,, 21, 25]]);
            }));

            function checkAnswerSheet() {
                return _ref4.apply(this, arguments);
            }

            return checkAnswerSheet;
        }()
    }

};

//# sourceMappingURL=controller-compiled.js.map