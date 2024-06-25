# Neteoc

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.2.

## Getting Started for Developers

This section guides new developers through setting up the necessary tools for working on this project. Follow these steps to ensure your development environment is ready.

### Installing NVM (Node Version Manager)

NVM allows you to manage multiple installations of Node.js. It's essential for ensuring you're using the version of Node.js that's compatible with this project.

1. To install NVM, follow the instructions on the [NVM GitHub page](https://github.com/nvm-sh/nvm#installing-and-updating).
2. Once installed, close and reopen your terminal to start using NVM.

### Setting Up Node.js with NVM

After installing NVM, you need to install and use the Node.js version required by this project.

1. This command will read the .nvmrc file in the project directory and install the specified Node.js version:

    ```sh
    nvm install
    ```

1. To switch to the project's Node.js version, navigate to the project directory and run:

    ```sh
    nvm use
    ```

### Installing the Angular CLI

The Angular CLI is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications.

**Install the Angular CLI globally using npm:**

```sh
npm install -g @angular/cli
```

### Installing the Firebase CLI

The Firebase CLI provides a variety of tools for managing, viewing, and deploying to Firebase projects.

**Install the Firebase CLI globally using npm:**

```sh
npm install -g firebase-tools
```

## Developing

Watch this video: 

<iframe width="560" height="315" src="https://www.youtube.com/embed/xAT0lHYhHMY?si=IPleWN1wn2P7qdOz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

### Deploying with the Firebase CLI

#### Hosting

**To deploy your hosting content (the built Angular application):**

1. Build your Angular project with production settings:

    ```sh
    ng build --configuration=production
    ```

1. Deploy to Firebase Hosting:

    ```shell
    firebase deploy --only hosting
    ```

#### Functions

**To deploy Cloud Functions:**

1. Ensure you're in the functions directory:

```sh
cd functions
```

1. Deploy your functions to Firebase:

```sh
firebase deploy --only functions
```

#### Firestore Rules

To deploy Firestore security rules and indexes:

Deploy your Firestore rules and indexes (from the root of the project):

```sh
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

Follow these steps to set up your development environment. If you encounter any issues, refer to the documentation of each tool or ask for help from the project maintainers.
