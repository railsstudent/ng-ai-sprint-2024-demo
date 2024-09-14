# NgAiSprint2024Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Change CORS policy of the GS Bucket

Create a json file to configure the CORS policy of the public bucket. Then, this Angular application can load the model from the Google Clousd Storage. 

```json
[
    {
      "origin": ["http://localhost:4200"],
      "responseHeader": ["Content-Type"],
      "method": ["GET", "HEAD", "PUT", "POST"],
      "maxAgeSeconds": 3600
    }
]
```

Update the CORS Policy

```bash
cd ~/google-cloud-sdk 
gcloud storage buckets update gs://<bucket name> --cors-file=cors.json
```

Remove the CORS Policy

```bash
gcloud storage buckets update gs://<bucket name> --clear-cors
```


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
