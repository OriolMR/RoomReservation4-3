# Acme Front-End Documentation
### Inetum WildChar - Team 3
#### Contributors:  
Joana Lin Chen, Harpreet Kaur, Cèlia Casanovas, Francisco Jiménez Capel

## Introduction

The ACME project is a web application designed for workers of a company to book meeting rooms at a given date and time.

The web API is written in C#, using an entity/controller model based on Asp.NET Core and EntityFramework Core.

The database is build with SQL Server. Authentication and authorisation, Asp.NET Core Identity was used, together with the Asp.NET Core JwtBearer namespace. Successful authentication sends a JWT token to the user, which is then included in requests to the API as an authorisation header.

The front-end app is written in Angular using HTML, CSS and TypeScript.

## Directory Structure

- `src/`: Contains the front-end source code.
- `images/`: Static images.
- `app/`: Main components and modules of the application.

## Dependencies

The main dependencies of this project are:

- [Angular](https://angular.io/): A framework for building web applications.
- [RxJS](https://rxjs.dev/): A library for reactive programming in JavaScript.
- [Angular Router](https://angular.io/guide/router): For managing routes in the application.
- [Angular HttpClient](https://angular.io/guide/http): For making HTTP requests.
- [Jasmine](https://jasmine.github.io/): A unit testing framework.
- ["dayjs"](https://day.js.org): A JavaScript library that parses, validates, manipulates, and displays dates and times

You can find the complete list of dependencies with their respective versions in the `package.json` file.

## Installation Instructions

To set up the development environment, follow these steps:

1. Clone this repository: `git clone [https://github.com/kaurhar65/proyectoAcme.git]`
2. Navigate to the project directory: `cd proyectoAcme/MainProject/acme-rooms`
3. Install the dependencies: `npm install`
4. Start the application: `ng serve -o`

## Environment Configuration

This project uses environment variables to configure the API and other settings. 

- `production`: Indicates whether the application is in production mode (`true`) or development mode (`false`).
- `apiUrl`: Stores the base URL of the API to which the application makes HTTP requests. Ensure that the URL is correct for your development environment.
- `apControllers`: This object stores the names of the API controllers used in the application. Controller names are used to construct HTTP request URLs.

All the configurations variables are in the `src/enviroments/environment.ts` file.

## Architecture and Design

The application follows an architecture based on Angular modules and components. Here's the general structure:

- `src/app/`
- `components/`: Contains reusable components.
- `modules/`: Main modules of the application.

## Components and Modules

 

### `Header` Component

 