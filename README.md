# reactit

Create and manage React application in seconds.

## Features
Basic useful feature list:

 * Create and run application with single commands.
 * Supports multiple development environments. 
 * Create **simple** react application working on webpack and webpack-dev-server.
 * Create **express** react application working on general express server.
 * Create **Isomorphic** react application working on general express server supporting **Server-Side Rendering**.
 * Supports latest **ES6** javascript.
 * Supports **SASS** to create sassy stylesheets.
 * Supports **hot loading** using webpack-dev-server.
 * Latest version of react and webpack dependencies.
 * Offline first development.

## Installation
You can easily install reactit using npm.

```
$ npm install -g reactit
```

## Usage

Create new react application using **new** command.
```
$ reactit new <app_name>
```
Above command will create a new project folder <app_name> in current working directory and install all the required modules for you.

If you want create application in current working directory itself you can simply use the following command.
```
$ reactit new
```

### There are multiple options available for creating new application. ###

1. By default, the above command will create a simple react application working on webpack-dev-server. You can also use the **--simple** option to create the same.

```
$ reactit new --simple <app_name>
```
2. You may also create an application the work on general express server on which you can get the basic functions of an express server using **--express** option.

```
$ reactit new --express <app_name>
```
3. You may also create an application the work on general express server with **Isomorphic Javascript** on which you can get the basic functions of an express server with the support for **Server-Side Rendering** using **--express-iso** option.

```
$ reactit new --express-iso <app_name>
```
Now you can go to the application directory to start the application.

```
$ cd <app_name>
```
And start the application using **start** command

```
$ reactit start
```
Enable **hot loading** using **--hot** argument. (Express applications,by default, work with hot reloading and cannot work without it.)
```
$ reactit start --hot
```
#### More options coming very soon ####
## License ##
ISC
```
ISC
Copyright (c) 2017, Tanmay Bhatt

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

Source: http://opensource.org/licenses/ISC
```
