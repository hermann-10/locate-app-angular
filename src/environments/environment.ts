// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
  apiKey: "AIzaSyDyMDD8uhwvk_49iLAW0TLYWU2UwLqdFTs",
  authDomain: "park-art.firebaseapp.com",
  projectId: "park-art",
  storageBucket: "park-art.appspot.com",
  messagingSenderId: "770349140627",
  appId: "1:770349140627:web:3d465089a79c39a4cf5b66",
  measurementId: "G-C2C3ZG3ZDQ"
}
};



// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
