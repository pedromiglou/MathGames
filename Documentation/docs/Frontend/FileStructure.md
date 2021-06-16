# Frontend File Structure

This section documents the general file structure of the fronted application. This structure should be followed closely when developing code to prevent confusion amongst developers and improve maintainability.

## Pages

Inside the **Pages** directory are located the "main" application components. These components are treated as the different sections of the application itself. e.g. when a user accesses the Podium page, they will be rendering the Podium component (which may or may not contain other smaller sized components).  
Every page should have a specific directory which contains at least 2 files, the PageName.js file, and the PageName.css stylesheet. Some sections may contain more files, e.g. the admin statistics directory contains the several statistics components.

## Components

The **Components** directory is used to store react components. These components should be placed inside directories holding similar components, e.g. The Menu directory contains the Navbar and Sidemenu components, which make up the app's menu.

## Services

The **Services** directory holds all the needed services. These services contain the methods used to make requests to the API and other relevant methods regarding the handling of data received from the API.

## Store

The **Store** directory contains files regarding objects stored in the Redux store.

## Data

In the **Data** directory there is a list of files with relevant data to be used by the application's components. Lists and dictionaries with relevant information should be stored in a file in this directory, so they can be accessed when needed, file names should explicitely state what information the file holds.

## Assets

The application's images as well as game assets are stored in the **Public** folder. This folder contains the avatar's textures, the game's assets (images and sounds) and other icons/ images that appear on the app.
