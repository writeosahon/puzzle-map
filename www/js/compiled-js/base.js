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
         * object is responsible for handling operations on the "game settings" data
         */
        gameSettings: {

            /**
             * method loads the game settings data from the app database
             * @returns {Promise<void>}
             */
            async loadGameSettingsData(){

                try{
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
                            (await utopiasoftware[utopiasoftware_app_namespace].gameSettings.loadGameSettingsData())._rev;
                    }
                    catch(err){}

                    return await utopiasoftware[utopiasoftware_app_namespace].model.appDatabase.put(gameSettings);
                }
                finally{
                }
            }
        }

    }
};
