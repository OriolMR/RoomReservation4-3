# Documentation RoomReservation4-3
#### Contributors:  
Guillermo Jaume, Harpreet Kaur, Joana Lin, Oriol Martinez

## Introduction

This project is about a web app that allows workers of a company to book meeting rooms at a given date and time.

It has two elements: a web API that interfaces with a Microsoft SQL Server database to manage both the room and reservation information and user authentication, and a front-end that runs on the browser.

The web API is written in C#, using an entity/controller model based on Asp.NET Core and EntityFramework Core.
For authentication and authorisation, Asp.NET Core Identity was used, together with the Asp.NET Core JwtBearer namespace. Successful authentication sends a JWT token to the user, which is then included in requests to the API as an authorisation header.

The front-end app is written in Angular (framework) and TypeScript.

## Project structure

#### Database contexts

The app works with microservices, which has five independent database contexts:
- the **UsersContext** class, which is used for user and role management and extends the **UsersUser** identity context class.
- **LocationsContext** class, is used for CRUD operations on meeting room data and extends the default DbContext class. This context contains a DbSet object for each of the entities it manages: **Countries, Cities, Offices and Rooms**.
- **ReservasContext** class, is used for CRUD operations on Reservations and extends the default DbContext class. This context contains a DbSet object for each of the entities it manages: **Reservations**.
- **Email**, is used for sending emails operations.
- **LockedDatesContext** class, is used for setting unavaliable dates for calendar and extends the default DbContext class.


## Meeting room API structure

Each database has it's own schema of the corresponding elements:

- **Locations microservice:**
    - **Country** */Entities/Country.cs*  
	This class represents the countries the meeting rooms are in.  
	*Schema*  
		- Id: int, autoincrement  
		- Name: string  
	- **City** */Entities/City.cs*  
	This class represents the cities the meeting rooms are in.  
	*Schema*  
		- Id: int, autoincrement  
		- Name: string  
		- CountryId: int  
		This field is a reference to the **Country** entity.  
	- **Office** */Entities/Office.cs*  
	This class represents the offices the meeting rooms are in.  
	*Schema*  
		- Id: int, autoincrement
		- Name: string
		- CityId: int  
		This field is a reference to the **City** entity.  
	- **Room** */Entities/Room.cs*  
	This class represents the meeting rooms.  
	*Schema*  
		- Id: int, autoincrement
		- Name: string
		- OfficeId: int  
		This field is a reference to the **Office** entity.  

- **Reservations microservice:**
    - **Reservation** */Entities/Reservation.cs*  
	This class represents the reservations of the meeting rooms.  
	*Schema*  
		- Id: int, autoincrement
		- Date: DateTime
		- StartTime: DateTime
		- EndTime: DateTime
		- RoomId: int  
		This field is a reference to the **Room** entity.  
		- UserId: int  
		This field is a reference to the **IdentityUser** class.  
        
- **Users microservice:**
    - **User** 
    This class has it's default tables from Microsoft Identity.
	*Main Schema*  
		- Id: int, autoincrement
		- UserName: string
		- Email: string
		- Password: string
		- PhoneNumber: string  
		It also have more tables related with User Identity.

## Controllers
Those are classes that specify the HTTP methods of the web API and their exposed endpoints. 
 
- **CountryController** *Controllers/CountryController.cs*  
	This class contains CRUD operations on the **Countries** DbSet.  
	*Methods*  
    - **Get**  
        All of the following methods require authorisation, with no particular user role.
        - **GetAllCountries**  
            - Route:  
                *api/Country/GetAllCountries*  
            - Parameters:  
                none  
            - Request body:  
                none  
            - Return value:  
                a **List\<Country\>** of all rows in the **Countries** DbSet.  
            - Response code:  
                200  
        - **GetCountryById**  
            - Route:  
                *api/Country/GetCountryById?id=0*  
            - Parameters:  
                id: int  
            - Request body:  
                none  
            - Return value:  
                the **Country** that matches the specified id.  
            - Response code:  
                200  
    - **Post**  
    All of the following methods require authorisation with the Admin **UserRole**.  
        - **CreateCountry**  
            - Route:  
                *api/Country/CreateCountry*  
            - Parameters:  
                none  
            - Request body:  
                an instance of the **Country** entity to be created, in JSON format.  
            - Return value:  
                the URL of the Get request that would fetch the newly created country, and the created **Country** as requested to the method.  
            - Response code:  
                201
    - **Put**  
    All of the following methods require authorisation with the Admin **UserRole**.  
        - **UpdateCountry**  
            - Route:  
                *api/Country/UpdateCountry*  
            - Parameters:  
                none  
            - Request body:  
                an instance of the **Country** entity to be updated, in JSON format.  
            - Return value:  
                none  
            - Response code:  
                204
    - **Delete**  
    All of the following methods require authorisation with the Admin **UserRole**.  
        - **DeleteCountry**  
            - Route:  
                *api/Country/DeleteCountry*  
            - Parameters:  
                none  
            - Request body:  
                an instance of the **Country** entity to be deleted, in JSON format.  
            - Return value:  
                none.  
            - Response code:  
                204 *(success)*  
                404 *(country not found)*  
- **CityController** *Controllers/CityController.cs*  
	This class contains CRUD operations on the **Cities** DbSet.  
	*Methods*  
    - **Get**  
    All of the following methods require authorisation, with no particular user role.
        - **GetAllCities**
            - Route:  
                *api/City/GetAllCities*				
            - Parameters:  
                none
            - Request body:  
                none
            - Return value:  
                a **List\<City\>** of all rows in the **Cities** DbSet.
            - Response code:  
                200
        - **GetCityById**
            - Route:  
                *api/City/GetCityById?id=0*
            - Parameters:  
                id \: int
            - Request body:  
                none
            - Return value:  
                the **City** that matches the specified id.
            - Response code:  
                200
        - **GetCitiesByCountryId**
            - Route:  
                *api/City/GetCitiesByCountryId?id=0*
            - Parameters:  
                id: int
            - Request body:  
                none
            - Return value:  
                the **City** whose **Country** matches the specified id.
            - Response code:  
                200
    - **Post**  
    All of the following methods require authorisation with the Admin **UserRole**.  
        - **CreateCity**
            - Route:  
                *api/City/CreateCity*
            - Parameters:  
                none
            - Request body:  
                an instance of the **City** entity to be created, in JSON format.
            - Return value:  
                the URL of the Get request that would fetch the newly created city, and the created **City** as requested to the method.
            - Response code:  
                201
    - **Put**  
    All of the following methods require authorisation with the Admin **UserRole**.
        - **UpdateCity**
            - Route:  
                *api/City/UpdateCity*
            - Parameters:  
                none
            - Request body:  
                an instance of the **City** entity to be updated, in JSON format.
            - Return value:  
                none
            - Response code:  
                204
    - **Delete**  
    All of the following methods require authorisation with the Admin **UserRole**.
        - **DeleteCity**
            - Route:  
                *api/City/DeleteCity*
            - Parameters:  
                none
            - Request body:  
                an instance of the **City** entity to be deleted, in JSON format.
            - Return value:  
                none.
            - Response code:  
                204 *(success)*  
                404 *(city not found)*
	- **OfficeController** *Controllers/OfficeController.cs*  
	This class contains CRUD operations on the **Offices** DbSet.  
	*Methods*  
		- **Get**  
		All of the following methods require authorisation, with no particular user role.
			- **GetAllOffices**
				- Route:  
					*api/Office/GetAllOffices*
				- Parameters:  
					none
				- Request body:  
					none
				- Return value:  
					a **List\<Office\>** of all rows in the **Offices** DbSet.
				- Response code:  
					200
			- **GetOfficeById**
				- Route:  
					*api/Office/GetOfficeById?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					the **Office** that matches the specified id.
				- Response code:  
					200
			- **GetOfficesByCityId**
				- Route:  
					*api/Office/GetOfficesByCityId?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					a **List\<Office\>** of all rows in the **Offices** DbSet whose **City** matches the specified id.
				- Response code:  
					200
			- **GetOfficesByCountryId**
				- Route:  
					*api/Office/GetOfficesByCountryId?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					a **List\<Office\>** of all rows in the **Offices** DbSet whose **Country** matches the specified id.
				- Response code:  
					200
		- **Post**  
		All of the following methods require authorisation with the Admin **UserRole**.
			- **CreateOffice**
				- Route:  
					*api/Office/CreateOffice*
				- Parameters:  
					none
				- Request body:  
					an instance of the **Office** entity to be created, in JSON format.
				- Return value:  
					the URL of the Get request that would fetch the newly created office, and the created **Office** as requested to the method.
				- Response code:  
					201
		- **Put**  
		All of the following methods require authorisation with the Admin **UserRole**.  
			- **UpdateOffice**
				- Route:  
					*api/Office/UpdateOffice*
				- Parameters:  
					none
				- Request body:  
					an instance of the **Office** entity to be updated, in JSON format.
				- Return value:  
					none
				- Response code:  
					204
		- **Delete**  
		All of the following methods require authorisation with the Admin **UserRole**.
			- **DeleteOffice**
				- Route:  
					*api/Office/DeleteOffice*
				- Parameters:  
					none
				- Request body:  
					an instance of the **Office** entity to be deleted, in JSON format.
				- Return value:  
					none.
				- Response code:  
					204 *(success)*  
					404 *(office not found)*
    
    - # Revisar from here para abajo
    -
    -
	- **RoomController** *Controllers/RoomController.cs*  
	This class contains CRUD operations on the **Room** DbSet.  
	*Methods*
		- **Get**  
		All of the following methods require authorisation, with no particular user role.
			- **GetAllRooms**
				- Route:  
					*api/Room/GetAllRooms*
				- Parameters:  
					none
				- Request body:  
					none
				- Return value:  
					a **List\<Room\>** of all rows in the **Rooms** DbSet.
				- Response code:  
					200
			- **GetRoomById**
				- Route:  
					*api/Room/GetRoomById?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					the **Room** that matches the specified id.
				- Response code:  
					200
			- **GetRoomsByOfficeId**
				- Route:  
					*api/Room/GetRoomsByOfficeId?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					a **List\<Room\>** of all rows in the **Rooms** DbSet whose **Office** matches the specified id.
				- Response code:  
					200
			- **GetRoomsByCityId**
				- Route:  
					*api/Room/GetRoomsByCityId?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					a **List\<Room\>** of all rows in the **Rooms** DbSet whose **City** matches the specified id.
				- Response code:  
					200
			- **GetRoomsByCountryId**
				- Route:  
					*api/Room/GetRoomsByCountryId?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					a **List\<Room\>** of all rows in the **Rooms** DbSet whose **Country** matches the specified id.
				- Response code:  
					200
		- **Post**  
		All of the following methods require authorisation with the Admin **UserRole**.
			- **CreateRoom**
				- Route:  
					*api/Room/CreateRoom*
				- Parameters:  
					none
				- Request body:  
					an instance of the **Room** entity to be created, in JSON format.
				- Return value:  
					the URL of the Get request that would fetch the newly created room, and the created **Room** as requested to the method.
				- Response code:  
					201
		- **Put**  
		All of the following methods require authorisation with the Admin **UserRole**.
			- **UpdateRoom**
				- Route:  
					*api/Room/UpdateRoom*
				- Parameters:  
					none
				- Request body:  
					an instance of the **Room** entity to be updated, in JSON format.
				- Return value:  
					none
				- Response code:  
					204
		- **Delete**  
		All of the following methods require authorisation with the Admin **UserRole**.
			- **DeleteRoom**
				- Route:  
					*api/Room/DeleteRoom*
				- Parameters:  
					none
				- Request body:  
					an instance of the **Room** entity to be deleted, in JSON format.
				- Return value:  
					none.
				- Response code:  
					204 *(success)*  
					404 *(room not found)*
	- **ReservationController** *Controllers/ReservationController.cs*  
	This class contains CRUD operations on the **Reservations** DbSet.  
	All of the following methods require authorisation, with no particular user role. The Admin **UserRole** is not used for this controller.  
	*Methods*  
		- **Get**
			- **GetAllReservations**
				- Route:  
					*api/Country/GetAllReservations*
				- Parameters:  
					none
				- Request body:  
					none
				- Return value:  
					a **List\<Reservation\>** of all rows in the **Reservations** DbSet.
				- Response code:  
					200
			- **GetReservationById**
				- Route:  
					*api/Reservation/GetReservationById?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					the **Reservation** that matches the specified id.
				- Response code:  
					200
			- **GetReservationsByRoomId**
				- Route:  
					*api/Room/GetRoomById?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					a **List\<Reservation\>** of all rows in the **Reservations** DbSet whose **Room** matches the specified id.
				- Response code:  
					200
			- **GetReservationsByOfficeId**
				- Route:  
					*api/Room/GetReservationsByOfficeId?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					a **List\<Reservation\>** of all rows in the **Reservations** DbSet whose **Office** matches the specified id.
				- Response code:  
					200
			- **GetRerservationsByCityId**
				- Route:  
					*api/Room/GetReservationsByCityId?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					a **List\<Reservation\>** of all rows in the **Reservations** DbSet whose **City** matches the specified id.
				- Response code:  
					200
			- **GetReservationsByCountryId**
				- Route:  
					*api/Room/GetReservationsByCountryId?id=0*
				- Parameters:  
					id: int
				- Request body:  
					none
				- Return value:  
					a **List\<Reservation\>** of all rows in the **Reservations** DbSet whose **Country** matches the specified id.
				- Response code:  
					200
		- **Post**
			- **CreateReservation**
				- Route:  
					*api/Reservation/CreateReservation*
				- Parameters:  
					none
				- Request body:  
					an instance of the **Reservation** entity to be created, in JSON format.
				- Return value:  
					the URL of the Get request that would fetch the newly created reservation, and the created **Reservation** as requested to the method.
				- Response code:  
					201
		- **Put**
			- **UpdateReservation**
				- Route:  
					*api/Reservation/UpdateReservation*
				- Parameters:  
					none
				- Request body:  
					an instance of the **Reservation** entity to be updated, in JSON format.
				- Return value:  
					none
				- Response code:  
					204
		- **Delete**
			- **DeleteReservation**
				- Route:  
					*api/Reservation/DeleteReservation*
				- Parameters:  
					none
				- Request body:  
					an instance of the **Reservation** entity to be deleted, in JSON format.
				- Return value:  
					none.
				- Response code:  
					204 *(success)*  
					404 *(reservation not found)*

- **Database**  
	The database tables were created from the **Entities** using EntityFramework Core migrations. That means their schema and names are identical to those of the aforementioned **Entities**.

###### Meeting room API authorisation

Authorisation is achieved by attaching an **Authorization header** to the HTTP requests, containing the **Bearer keyword**, which indicates that the Token Bearer authentication scheme is being used, followed by the **JWT token** that was obtained on login.

Example:  

	{
		"Authorization": "Bearer ABCDEFGHIJKLMNOPQRSTUVWXYZ.1234567890.QWERTYUIOP"  
	}
	
###### User management and authentication API structure

The user management and authentication API works with the following elements:  
	
- **Models**  
	Those are classes that represent the input fields of register and login forms.  
	
	- **IdentityUser** *Microsoft.AspNetCore.Identity package dependency*  
	This class represents the default user model and is **purely for internal use**.   
	- **IdentityRole** *Microsoft.AspNetCore.Identity package dependency*  
	This class represents the default user role and is **purely for internal use**.  
	- **RegisterModel** */Models/RegisterModel.cs*  
	This class represents the fields of the register form.  
	*Schema*  
	All fields are required.  
		- UserName: string  
			This property represents the UserName property of the default **IdentityUser** class.
		- Password: string  
			For security reasons, this property is not stored in the database. Rather, the **IdentityUser** class contains a PasswordHash property that contains an automatically generated hash of the password, created using the **HMAC-SHA512** algorithm and an iteration count of 210,000, in accordance to OWASP recommendations.  
			In order for the registration request to be successful, the password must contain:  
			- At least one non alphanumeric character.
			- At least one digit.
			- At least one uppercase letter.
			- At least one lowercase letter.
			- At least 6 characters.
		- Email: string  
			This property represents the Email property of the default **IdentityUser** class.
		- Phone: string  
			This property represents the PhoneNumber property of the default **IdentityUser** class.
	- **LoginModel** */Models/LoginModel.cs*  
	This class represents the fields of the register form.  
	*Schema*  
	All fields are required.  
		- UserName: string
		- Password: string
	- **UserRoles** */Models/UserRoles.cs*  
	This class contains the names of the possible instances of the default **IdentityRole** class that the app uses.  
	*Schema*  
		- Admin: string  
			Value is set to "Admin", and is immutable.
		- User: string  
			Value is set "User", and is immutable.

- **Controllers**  
	Those are classes that specify the HTTP methods of the authentication API and their exposed endpoints.  
	
	- **AuthenticationController** */Controllers/AuthenticationController.cs*  
	This class contains HTTP request methods for authentication operations.  
	*Methods*  
		- **GetToken**  
		This is a private utility method for **internal use**. It takes a **List\<Claim\>** object containing authentication claims and returns a newly generated **JWT token** in the form of a **JwtSecurityToken** object.
		- **Post**
			- **Register**  
			This method creates an user with no special **UserRole**.  
				- Route:  
					*api/Authentication/Register*
				- Parameters:  
					none
				- Request body:  
					An instance of the **RegisterModel** class, in JSON format.
				- Return value:  
					none
				- Response code:  
					200 *(success)*  
					500 *(failure)*  
			- **RegisterAdmin**  
			This method creates an user with the Admin **UserRole**.  
				- Route:  
					*api/Authentication/RegisterAdmin*
				- Parameters:  
					none
				- Request body:  
					An instance of the **RegisterModel** class, in JSON format.
				- Return value:  
					none
				- Response code:  
					200 *(success)*  
					500 *(failure)*  
			- **Login**  
				- Route:  
					*api/Authentication/Login*
				- Parameters:  
					none
				- Request body:  
					An instance of the **LoginModel** class, in JSON format.
				- Return value:  
					A **JWT token** in JSON format.
				- Response code:  
					200 *(success)*  
					401 *(unauthorised)*  
- **Database**  
The database tables were created from the default Asp.NET Core Identity model using EntityFramework Core migrations.
Those tables are handled by calls from the controller to Asp.Net Core Identity methods, and **should not be accessed directly**.  
The database contains the following tables:  
	- AspNetRoles  
	This table stores all possible user roles.  
	*Schema*  
		- Id: nvarchar, PK  
		- Name: nvarchar  
		- NormalizedName: nvarchar  
		- ConcurrencyStamp: nvarchar  
	- AspNetRoleClaims
		This table maps roles to claims in an N-to-M relationship.
	- AspNetUsers  
	This table stores the registered users.  
	*Schema*  
		- Id: nvarchar, PK  
		- UserName: nvarchar  
		- NormalizedUserName: nvarchar  
		- Email: nvarchar  
		- NormalizedEmail: nvarchar  
		- EmailConfirmed: bit  
		- PasswordHash: nvarchar  
		- SecurityStamp: nvarchar  
		- ConcurrencyStamp: nvarchar  
		- PhoneNumber: nvarchar  
		- PhoneNumberConfirmed: bit  
		- TwoFactorEnabled: bit  
		- LockoutEnd: nvarchar  
		- LockoutEnabled: bit  
		- AccessFailedCount: int  
	- AspNetUserRoles  
		This table maps users to roles in an N-to-M relationship.
	- AspNetUserClaims  
		This table maps users to claims in an N-to-M relationship.
	- AspNetUserTokens  
		This table stores tokens and maps them to users, and is unused in the current implementation of the app, as the authorisation tokens are simply stored in memory.
	- AspNetUserLogins  
		This table maps users to external login providers, and is unused in the current implementation of the app.


# FRONT-END: ANGULAR (FRAMEWORK)

## Dependencies
- ### Software dependencies and libraries used
	#### Angular Framework  
	This project is based on the Angular framework for the development of web applications. Make sure you have the supported version of Angular CLI installed for efficient project management.
	- Angular Cli: https://angular.io/cli  
	- **@angular/animations:** Version 16.1.0  
    - **@angular/common:** Version 16.1.0  
    - **@angular/compiler:** Version 16.1.0  
    - **@angular/core:** Version 16.1.0 
    - **@angular/forms:** Version 16.1.0  
    - **@angular/platform-browser:** Version 16.1.0  
    - **@angular/platform-browser-dynamic:** Version 16.1.0  
    - **@angular/router:** Version 16.1.0  
    - **@easepick/bundle:** Version 1.2.1
    - **@sweetalert2/ngx-sweetalert2:** Version 12.2.0 
	#### Herramientas de Desarrollo
	In addition to the Angular-specific libraries, this project makes use of the following development tools.

    - **bootstrap":** Version 5.3.1  
    - **dayjs":** Version 1.11.9  
    - **fuzzysearch-ts":** Version 1.0.3  
    - **ng2-search-filter":** Version 0.5.1  
    - **node":** Version 20.6.0  
    - **rxjs":** Version 7.8.0  
    - **sweetalert2":** Version 11.6.13  
    - **tslib":** Version 2.3.0  
    - **zone.js":** Version 0.13.  

	Make sure you have these dependencies installed before starting development or running the application. For more details about each library or tool, please refer to their respective official documentations.

##  Front-End Structure
- ### Explanation of how the source code is organized.
	The folders are organized in an intuitive way and so that it is easy for developers to find the files they are looking for.
	The first folder we have inside src/app is /admin, where the different components that we use for the administrator panel are located. Next we have the datepicker component. Next, we will see the models folder where the different models of the entities used are saved. Furthermore, we have two .ts files (locked-date.ts and user.ts). Continuing with the components, we will find two more, the nav-menu and the nav-var. Later, in the services folder we will have the services that we use to make the connection with the backend, authentication-service and reservation-service.

	View-all: Todas las rooms separadas por paises. (nombre sala, ciudad, pais y capacidad)

- ### Files and folders description 