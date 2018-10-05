'use strict';

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

  /**
   * holds the base url for reaching the application server
   */
  appBaseUrl: 'http://132.148.150.76/edpms',

  /**
   * holds the details of the currently logged in user
   */
  userDetails: null

};

// call the method to startup the app
utopiasoftware[utopiasoftware_app_namespace].controller.startup();

//# sourceMappingURL=model-compiled.js.map