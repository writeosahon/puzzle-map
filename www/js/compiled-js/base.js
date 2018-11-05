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
const utopiasoftware_app_namespace = 'puzzle';

/**
 * create the namespace and base methods and properties for the app
 * @type {{}}
 */
const utopiasoftware = {
    [utopiasoftware_app_namespace]: {

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
            async loadGameSettingsData(){

                try{
                    // get the game settings data
                    return await utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.get("gameSettings");
                }
                finally{
                }
            },


            /**
             * method is used to save the game settings data to the app database
             * @param gameSettings
             * @returns {Promise<void>}
             */
            async saveGameSettingsData(gameSettings){

                try{
                    try{
                        // get the last _rev property that was used to save the game settings data
                        gameSettings._rev =
                            (await utopiasoftware[utopiasoftware_app_namespace].gameSettingsOperations.loadGameSettingsData())._rev;
                    }
                    catch(err){}

                    // return the game settings data
                    return await utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.put(gameSettings);
                }
                finally{
                }
            }
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
            async backupExists(){
                // check if backup exists
                return new Promise(function(resolve, reject){
                    cordova.plugin.cloudsettings.exists(function(exists){
                        resolve(exists); // resolve the promise with the status of whether backup exist or not
                    });
                });
            },

            /**
             * method is used to load the backed-up user game data.
             * USER MUST CHECK IF A BACKUP EXISTS BEFORE CALLING THIS METHOD.
             *
             * As part of the load process, the loaded data is also automatically saved to
             * the user's app local database
             *
             * @returns {Promise<any>}
             */
            async loadBackupData(){

                // get the backed-up data
                let loadedData = await new Promise(function(resolve, reject){

                    cordova.plugin.cloudsettings.load(resolve, reject);
                });
                console.log("LOADED BACKUP", loadedData);

                // save the loaded data in the device's local database
                try{
                    // get the _rev property of the last saved (on local database) user game data
                    var {_rev} = await utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.get("userGameData");
                }
                catch(err){}

                try{
                    await utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.
                    put(Object.assign({_id: "userGameData", doctype: "USER GAME DATA", _rev}, loadedData));
                }
                catch(err){console.log("SAVED USER GAME DATA TO LOCAL DATABASE 1")}

                return loadedData;
            },

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
            async saveBackupData(gameData){

                // save the game data
                let savedData = await new Promise(function(resolve, reject){

                    cordova.plugin.cloudsettings.save(gameData, resolve, reject, true);
                });

                console.log("SAVED BACKUP", savedData);
                // save the loaded data in the device's local database
                try{
                    // get the _rev property of the last saved (on local database) user game data
                    var {_rev} = await utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.get("userGameData");
                }
                catch(err){}

                try{
                    await utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.
                    put(Object.assign({_id: "userGameData", doctype: "USER GAME DATA", _rev}, savedData));
                }
                catch(err){console.log("SAVED USER GAME DATA TO LOCAL DATABASE 2")}

                return savedData;
            },

            /**
             * method is used to sync the local backed-up data with the backup data restored from
             * the cloud while the user is using the app
             *
             * @returns {Promise<void>}
             */
            async onRestoreHandler(){
                console.log("BACKUP RESTORE CALLED");
                try{
                    // load the backed-up data
                    let loadedData = await new Promise(function(resolve, reject){

                        cordova.plugin.cloudsettings.load(resolve, reject);
                    });

                    // get the cached user game data
                    try{
                        // get the last saved (on local database) user game data
                        var cachedData = await utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.get("userGameData");
                    }
                    catch(err2){}

                    if(cachedData){ // if cachedData exist
                        if(cachedData["completed_levels"]){ // if the cachedData has completed levels
                            // join the completed levels of the cached data to that of the loadedData
                            var allCompletedLevelsSet =
                                new Set(cachedData["completed_levels"].concat(loadedData["completed_levels"] || []));
                            // make this the loadedData "completed_levels"
                            loadedData["completed_levels"] = Array.from(allCompletedLevelsSet);
                        }
                        if(cachedData["userDetails"]){ // if the cachedData has user details
                            // update the loadedData with the cachedData 'userDetails', if loadedData does not have its own
                            loadedData["userDetails"] = loadedData["userDetails"] || cachedData["userDetails"];
                        }
                        if(cachedData["noAds"] === true || loadedData["noAds"] === true){ // if the "noAds" is enabled for either
                            // enable 'noAds' for the loadedData
                            loadedData["noAds"] = true;
                        }
                    }

                    // save the loaded data
                    await utopiasoftware[utopiasoftware_app_namespace].userGameDataOperations.saveBackupData(loadedData);
                }
                catch(err){}
            }
        }

    }
};
