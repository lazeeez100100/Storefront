# Storefront Backend

## Table of Contents

- [Storefront Backend](#storefront-backend)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [instructions (how to use)](#instructions-how-to-use)
  - [** .env Set up**](#-env-set-up)
  - [DB schema](#db-schema)
  - [Project Owner](#project-owner)
  - [Languages](#languages)
  - [Functions](#functions)
  - [Thanks For](#thanks-for)
  - [Dependencies used](#dependencies-used)
  - [devDependencies used](#devdependencies-used)
  - [Note](#note)
  - [Resources](#resources)
  - [Version Number](#version-number)

## Description
 store backend code containing this list that returns data to front .
 - create user
 - create products
 - create orders
 - show all users
 - show all products
 - show all orders for one users
 - show one product
 - show one user
 - show activated orders
 - delete user
 - delete product
 - delete all orders for one users
 - update user
  
## instructions (how to use)
- make database with name store_dev and user postgres
- make database with name store_test and user postgres
- setup dotenv file with configuration
- database port = 5432
- database server = localhost
- you can edit dot env file as you like and type your database password
- start app test by this command
  - `npm run test `
- build database 
  - `npx db-migrate up`
- start app and connect to database using this command
  - `npm run watch `
- reset database 
  - `npx db-migrate reset`
- after watch script run go to postman and test application
- use end points to interact with application
- you want to throw params in the link if get method used .else if bass data to body if (post , Auth or patch) method used  in application database table.
- you can see below the end point you want to use 

## ** .env Set up**
- for dev i used database(POSTGRES_DB = store_dev)
- for test i used database(POSTGRES_DB_TEST = store_test)
  - POSTGRES_HOST = 127.0.0.1
  - POSTGRES_DB = store_dev
  - POSTGRES_DB_TEST = store_test
  - DB_HOST = localhost
  - POSTGRES_PORT = 5432
  - POSTGRES_USER = postgres
  - POSTGRES_PASSWORD = 123456Aa
  - POSTGRES_HOST = 127.0.0.1
  - TOKEN_SECRET = my-secret
  - SALT_ROUNDS = 10
  - BCRYPT_PASSWORD = my-secret-passwords
  - ENV = dev
  - SERVER_PORT = 3000

- ***end point to work with***
- get method
  -  http://localhost:3000/api/users/
  -  http://localhost:3000/api/users/id
  -  http://localhost:3000/api/products/
  -  http://localhost:3000/api/products/id
  -  http://localhost:3000/api/orderProduct/id  (order_id)
  -  http://localhost:3000/api/orders/id        (user_id)
  -  http://localhost:3000/api/orders/id/(1 or 0)
- post method
  -  http://localhost:3000/api/users
  -  http://localhost:3000/api/products
  -  http://localhost:3000/api/users/auth
  -  http://localhost:3000/api/orders/
  -  http://localhost:3000/api/orderproduct/

- delete method
  -  http://localhost:3000/api/users/id
  -  http://localhost:3000/api/products/id
  -  http://localhost:3000/api/orders/userid
- update method
    -  http://localhost:3000/api/users


user table 

    user_id?: number;
    email: string;
    user_name: string;
    first_name: string;
    last_name: string; 
    password: string;

products table 

    product_id?: number;
    product_name: string;
    price: number;

orders table 

    order_id?: number;
    user_id?: number;
    status : number;

orderProduct table 

    order_product_id?: number;
    order_id?: number;
    product_id?: number;
    quantity: number;



- get method
  -  http://localhost:3000/api/users/
  -  http://localhost:3000/api/users/id
  -  http://localhost:3000/api/products/
  -  http://localhost:3000/api/products/id
  -  http://localhost:3000/api/orders/id       (user_id)
  -  http://localhost:3000/api/orderProduct/id (order_id)
  -  http://localhost:3000/api/orders/id/(1 or 0)
- post method
  -  http://localhost:3000/api/users
  -  http://localhost:3000/api/products
  -  http://localhost:3000/api/users/authenticate
  -  http://localhost:3000/api/orders/
  -  http://localhost:3000/api/orderProduct/

- delete method
  -  http://localhost:3000/api/users/id
  -  http://localhost:3000/api/products/id
  -  http://localhost:3000/api/orders/userid
- update method
    -  http://localhost:3000/api/users

## DB schema 
![dbs](./img/adb.png)

![orders](./img/order.png)

![products](./img/product.png)

![users](./img/user.png)

![orderProduct](./img/orderproduct.png)



## Project Owner
   Ahmed Awni Abdul Tawwab Yousif   
   
## Languages
    - JavaScript
    - typeScript
    - SQL
## Functions 
  - users
     - create
     - index
     - show
     - updateOne
     - deleteOne
  - products  
      -  create
      -  index
      -  show
  - orders
      - create
      - index
      - show
  - orderProduct
      - create
      - index
  
## Thanks For
- MCIT: The Egyptian Ministry of Communications and Information technology
- Udacity: www.udacity.com
- ITIDA: Information Technology Industry Development Agency www.itida.gov.eg.

## Dependencies used
- My own code.
- Udacity  sum code from there.
- express
- jasmine
- jasmine-spec-reporter
- supertest
- watch
- pg
- postgres
- dotenv
## devDependencies used
   - @types/express: 4.17.14
   - @types/jasmine: 4.3.0
   - @types/node: 18.7.18
   - @types/supertest: 2.0.12
   - eslint": 8.23.1
   - eslint-config-prettier: 8.5.0
   - eslint-plugin-prettier: 4.2.1
   - nodemon: 2.0.20
   - prettier: 2.7.1
   - ts-node: 10.9.1
   - typescript: 4.8.3
  

## Note
All code in **ts** , **js** or **md** files from my mind except sum code from DOCs from package it self or from stackoverflow and i edit it to make my need, 
and i can't insure that this code like other one or not. 
so i wish **udacity** accept all off them.
## Resources  
- udacity
- my owen codes
- sum searches on web for solving problems
## Version Number
- ver 0.0.1