"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by UTOPIA SOFTWARE on 26/7/2018.
 */

// define the model namespace
utopiasoftware[utopiasoftware_app_namespace].model = {

    /**
     * property acts as a flag that indicates that all hybrid plugins and DOM content
     * have been successfully loaded. It relies on the ons.ready() method
     *
     * @type {boolean} flag for if the hybrid plugins and DOM content are ready for execution
     */
    isAppReady: false,

    /**
     * holds the pouchDB database used by the app
     */
    appDatabase: null,

    gameSettings: {
        _id: "gameSettings",
        doctype: "GAME SETTINGS",
        backgroundMusicOn: true,
        soundEffectsOn: true,
        puzzleHintsOn: true
    },

    /**
     * property is used to hold the present state of the user's puzzle game
     */
    _userGameData: {},

    userGameData: new Proxy(utopiasoftware[utopiasoftware_app_namespace].model._userGameData, {
        set: function set(target, prop, value) {
            if (prop === "_update_all_data") {
                // copy all properties of the object for backup
                for (var propertyName in value) {
                    target[propertyName] = value[propertyName];
                }
            } else {
                // copy the single property provided for backup
                target[prop] = value;
            }

            // backup the target i.e. userGameData
            new Promise(function (resolve, reject) {
                cordova.plugin.cloudsettings.save(target, resolve, resolve, true);
            });
            return true; // return true to signal that proxy updating was successful
        },

        get: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(target, prop, proxyObj) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                return _context.abrupt("return", new Promise(function (resolve, reject) {
                                    cordova.plugin.cloudsettings.load(function (backedUpData) {
                                        for (var propertyName in backedUpData) {
                                            target[propertyName] = backedUpData[propertyName];
                                        }
                                        resolve(target[prop]);
                                    }, function () {
                                        resolve(target[prop]);
                                    });
                                }));

                            case 1:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function get(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            }

            return get;
        }()
    })

};

// call the method to startup the app
utopiasoftware[utopiasoftware_app_namespace].controller.startup();

// listen for when the SIDE-MENU is opened
$(document).on("postopen", "#side-menu", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.puzzleMenuOpened);

// listen for when the SIDE-MENU is closed
$(document).on("postclose", "#side-menu", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.puzzleMenuClosed);

// listen for the initialisation of the PUZZLE-MENU page
$(document).on("init", "#puzzle-menu-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.pageInit);

// listen for when the PUZZLE-MENU page is shown
$(document).on("show", "#puzzle-menu-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.pageShow);

// listen for when the PUZZLE-MENU page is hidden
$(document).on("hide", "#puzzle-menu-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.pageHide);

// listen for when the PUZZLE-MENU page is destroyed
$(document).on("destroy", "#puzzle-menu-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.pageDestroy);

// listen for the initialisation of the PUZZLE-LEVELS page
$(document).on("init", "#puzzle-levels-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.pageInit);

// listen for when the PUZZLE-LEVELS page is shown
$(document).on("show", "#puzzle-levels-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.pageShow);

// listen for when the PUZZLE-LEVELS page is hidden
$(document).on("hide", "#puzzle-levels-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.pageHide);

// listen for when the PUZZLE-LEVELS page is destroyed
$(document).on("destroy", "#puzzle-levels-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleLevelsPageViewModel.pageDestroy);

// listen for the initialisation of the PUZZLE page
$(document).on("init", "#puzzle-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.pageInit);

// listen for when the PUZZLE page is shown
$(document).on("show", "#puzzle-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.pageShow);

// listen for when the PUZZLE page is hidden
$(document).on("hide", "#puzzle-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.pageHide);

// listen for when the PUZZLE page is destroyed
$(document).on("destroy", "#puzzle-page", utopiasoftware[utopiasoftware_app_namespace].controller.puzzlePageViewModel.pageDestroy);

//# sourceMappingURL=model-compiled.js.map