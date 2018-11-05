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
     * holds the randomisation engine used by Random.Js
     */
    randomisationEngine: Random.engines.browserCrypto,

    /**
     * object is responsible for handling operations on the "game settings" data
     */
    gameSettingsOperations: {

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
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.prev = 1;
                                _context2.next = 4;
                                return utopiasoftware[utopiasoftware_app_namespace].gameSettingsOperations.loadGameSettingsData();

                            case 4:
                                gameSettings._rev = _context2.sent._rev;
                                _context2.next = 9;
                                break;

                            case 7:
                                _context2.prev = 7;
                                _context2.t0 = _context2["catch"](1);

                            case 9:
                                _context2.next = 11;
                                return utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.put(gameSettings);

                            case 11:
                                return _context2.abrupt("return", _context2.sent);

                            case 12:
                                _context2.prev = 12;
                                return _context2.finish(12);

                            case 14:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0,, 12, 14], [1, 7]]);
            }));

            function saveGameSettingsData(_x) {
                return _ref2.apply(this, arguments);
            }

            return saveGameSettingsData;
        }()
    },

    /**
     * object is responsible for handling operations on the userGameData, including
     * backing up and restoring user game data across devices
     */
    userGameDataOperations: {

        /**
         * method is used to check whether or not the app has a backup or not.
         * It resolves to true if there is a backup and false otherwise
         *
         * @returns {Promise<*>}
         */
        backupExists: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                                    cordova.plugin.cloudsettings.exists(function (exists) {
                                        resolve(exists); // resolve the promise with the status of whether backup exist or not
                                    });
                                }));

                            case 1:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function backupExists() {
                return _ref3.apply(this, arguments);
            }

            return backupExists;
        }(),


        /**
         * method is used to load the backed-up user game data.
         * USER MUST CHECK IF A BACKUP EXISTS BEFORE CALLING THIS METHOD.
         *
         * As part of the load process, the loaded data is also automatically saved to
         * the user's app local database
         *
         * @returns {Promise<any>}
         */
        loadBackupData: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var loadedData, _ref5, _rev;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return new Promise(function (resolve, reject) {

                                    cordova.plugin.cloudsettings.load(resolve, reject);
                                });

                            case 2:
                                loadedData = _context4.sent;

                                console.log("LOADED BACKUP", loadedData);

                                // save the loaded data in the device's local database
                                _context4.prev = 4;
                                _context4.next = 7;
                                return utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.get("userGameData");

                            case 7:
                                _ref5 = _context4.sent;
                                _rev = _ref5._rev;
                                _context4.next = 13;
                                break;

                            case 11:
                                _context4.prev = 11;
                                _context4.t0 = _context4["catch"](4);

                            case 13:
                                _context4.prev = 13;
                                _context4.next = 16;
                                return utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.put(Object.assign({ _id: "userGameData", doctype: "USER GAME DATA", _rev: _rev }, loadedData));

                            case 16:
                                _context4.next = 21;
                                break;

                            case 18:
                                _context4.prev = 18;
                                _context4.t1 = _context4["catch"](13);
                                console.log("SAVED USER GAME DATA TO LOCAL DATABASE 1");

                            case 21:
                                return _context4.abrupt("return", loadedData);

                            case 22:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[4, 11], [13, 18]]);
            }));

            function loadBackupData() {
                return _ref4.apply(this, arguments);
            }

            return loadBackupData;
        }(),


        /**
         * method is used to save the user game data to the backup service
         *
         * As part of the load process, the user game data is also automatically saved to the
         * user's app local database
         *
         * @param gameData
         *
         * @returns {Promise<any>}
         */
        saveBackupData: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(gameData) {
                var savedData, _ref7, _rev;

                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return new Promise(function (resolve, reject) {

                                    cordova.plugin.cloudsettings.save(gameData, resolve, reject, true);
                                });

                            case 2:
                                savedData = _context5.sent;


                                console.log("SAVED BACKUP", savedData);
                                // save the loaded data in the device's local database
                                _context5.prev = 4;
                                _context5.next = 7;
                                return utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.get("userGameData");

                            case 7:
                                _ref7 = _context5.sent;
                                _rev = _ref7._rev;
                                _context5.next = 13;
                                break;

                            case 11:
                                _context5.prev = 11;
                                _context5.t0 = _context5["catch"](4);

                            case 13:
                                _context5.prev = 13;
                                _context5.next = 16;
                                return utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.put(Object.assign({ _id: "userGameData", doctype: "USER GAME DATA", _rev: _rev }, savedData));

                            case 16:
                                _context5.next = 21;
                                break;

                            case 18:
                                _context5.prev = 18;
                                _context5.t1 = _context5["catch"](13);
                                console.log("SAVED USER GAME DATA TO LOCAL DATABASE 2");

                            case 21:
                                return _context5.abrupt("return", savedData);

                            case 22:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[4, 11], [13, 18]]);
            }));

            function saveBackupData(_x2) {
                return _ref6.apply(this, arguments);
            }

            return saveBackupData;
        }(),


        /**
         * method is used to sync the local backed-up data with the backup data restored from
         * the cloud while the user is using the app
         *
         * @returns {Promise<void>}
         */
        onRestoreHandler: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var loadedData, cachedData, allCompletedLevelsSet;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                console.log("BACKUP RESTORE CALLED");
                                _context6.prev = 1;
                                _context6.next = 4;
                                return new Promise(function (resolve, reject) {

                                    cordova.plugin.cloudsettings.load(resolve, reject);
                                });

                            case 4:
                                loadedData = _context6.sent;
                                _context6.prev = 5;
                                _context6.next = 8;
                                return utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.get("userGameData");

                            case 8:
                                cachedData = _context6.sent;
                                _context6.next = 13;
                                break;

                            case 11:
                                _context6.prev = 11;
                                _context6.t0 = _context6["catch"](5);

                            case 13:

                                if (cachedData) {
                                    // if cachedData exist
                                    if (cachedData["completed_levels"]) {
                                        // if the cachedData has completed levels
                                        // join the completed levels of the cached data to that of the loadedData
                                        allCompletedLevelsSet = new Set(cachedData["completed_levels"].concat(loadedData["completed_levels"] || []));
                                        // make this the loadedData "completed_levels"

                                        loadedData["completed_levels"] = Array.from(allCompletedLevelsSet);
                                    }
                                    if (cachedData["userDetails"]) {
                                        // if the cachedData has user details
                                        // update the loadedData with the cachedData 'userDetails', if loadedData does not have its own
                                        loadedData["userDetails"] = loadedData["userDetails"] || cachedData["userDetails"];
                                    }
                                    if (cachedData["noAds"] === true || loadedData["noAds"] === true) {
                                        // if the "noAds" is enabled for either
                                        // enable 'noAds' for the loadedData
                                        loadedData["noAds"] = true;
                                    }
                                }

                                // save the loaded data
                                _context6.next = 16;
                                return utopiasoftware[utopiasoftware_app_namespace].userGameDataOperations.saveBackupData(loadedData);

                            case 16:
                                _context6.next = 20;
                                break;

                            case 18:
                                _context6.prev = 18;
                                _context6.t1 = _context6["catch"](1);

                            case 20:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[1, 18], [5, 11]]);
            }));

            function onRestoreHandler() {
                return _ref8.apply(this, arguments);
            }

            return onRestoreHandler;
        }()
    }

});

//# sourceMappingURL=base-compiled.js.map