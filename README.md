I believe your plan was to migrate this to TS and/or see if you can run both TS/JS at the same time.


Get this working with AngularJS and AngularJS/TS. 
Look at EMA and see how they did it.

Then get this working work with NG. 
Reference EMA.

Create an NG library to be used by AJS/ATS/NG.

Notes:
- All instances of Gulp can be removed since Webpack is being used now.



TODO: 
- Consider building an AJS library.
- Consider moving chunks of AJS to libraries.
- Validate ng-include gets properly templated correctly.
  - output target directory


SPA - look into these as the first candidates to break out of EMA for both NG and AJS/ATS.
- FirmAdmin
- Office Flow



## Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@nx-migrate-angularjs/mylib`.

## Development server

Run `ng serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.



