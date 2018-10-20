"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Created by UTOPIA SOFTWARE on 5/10/2018.
 */

/**
 * file provides the "base" framework/utilities required to launch the app.
 * E.g. - File creates the base namespace which the app is built on.
 * - Loads all the ES moddule libraries required etc
 *
 * The author uses the terms 'method' and function interchangeably; likewise the terms 'attribute' and 'property' are
 * also used interchangeably
 **/

// constant that defines the app namespace
var utopiasoftware_app_namespace = 'puzzle';

/**
 * create the namespace and base methods and properties for the app
 * @type {{}}
 */
var utopiasoftware = _defineProperty({}, utopiasoftware_app_namespace, {

    /**
     * object is responsible for handling operations on the "game settings" data
     */
    gameSettings: {

        /**
         * method loads the game settings data from the app database
         * @returns {Promise<void>}
         */
        loadGameSettingsData: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.get("gameSettings");

                            case 3:
                                return _context.abrupt("return", _context.sent);

                            case 4:
                                _context.prev = 4;
                                return _context.finish(4);

                            case 6:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0,, 4, 6]]);
            }));

            function loadGameSettingsData() {
                return _ref.apply(this, arguments);
            }

            return loadGameSettingsData;
        }(),


        /**
         * method is used to save the game settings data to the app database
         * @param gameSettings
         * @returns {Promise<void>}
         */
        saveGameSettingsData: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(gameSettings) {
                var _rev;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                // define the _rev property used in saving the game settings data to the app database
                                _rev = undefined;
                                _context2.prev = 2;
                                _context2.next = 5;
                                return utopiasoftware[utopiasoftware_app_namespace].loadGameSettingsData();

                            case 5:
                                _rev = _context2.sent._rev;
                                _context2.next = 10;
                                break;

                            case 8:
                                _context2.prev = 8;
                                _context2.t0 = _context2["catch"](2);

                            case 10:

                                gameSettings._rev = _rev;
                                _context2.next = 13;
                                return utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.put(gameSettings);

                            case 13:
                                return _context2.abrupt("return", _context2.sent);

                            case 14:
                                _context2.prev = 14;
                                return _context2.finish(14);

                            case 16:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0,, 14, 16], [2, 8]]);
            }));

            function saveGameSettingsData(_x) {
                return _ref2.apply(this, arguments);
            }

            return saveGameSettingsData;
        }()
    }

});

//# sourceMappingURL=base-compiled.js.map