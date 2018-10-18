"use strict";

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

// listen for when the SIDE-MENU is opened
$(document).on("postopen", "#side-menu", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.puzzleMenuOpened);

// listen for when the SIDE-MENU is closed
$(document).on("postclose", "#side-menu", utopiasoftware[utopiasoftware_app_namespace].controller.puzzleMenuPageViewModel.puzzleMenuClosed);

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