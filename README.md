# SpaceX

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Approach

First I created a repo, and added angular universal through an angular schematic. Then I added set up all the routes which would be required in the application. Following that, I created a new service which deals with the API calls to the SpaceX API. I also incorporated a loading spinner, to notify the user that some async operation was in progress. Then I went ahead and played around with media queries to develop the responsive nature as per the UX. Then I went ahead, parsed the route parameters and developed the entire filter logic.
Once my app was building successfully locally, I created a new app on heroku, deployed my branch to github, connected my heroku account to setup automatic deployment, and voila!

# Lighthouse Metrics

![image](https://user-images.githubusercontent.com/66873556/99579766-9f8d3780-2a04-11eb-9379-3d3b1f4ebacf.png)

