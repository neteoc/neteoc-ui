// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCenIxwTSAkUZaPlTsDKYpMN-uBjsxiFvY',
    authDomain: 'gsdf-8dc44.firebaseapp.com',
    databaseURL: 'https://gsdf-8dc44.firebaseio.com',
    projectId: 'gsdf-8dc44',
    storageBucket: 'gs://gsdf-8dc44.appspot.com/',
    messagingSenderId: '909502452748'
  }
};