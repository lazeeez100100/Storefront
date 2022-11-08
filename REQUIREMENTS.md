# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]
- deleteOne
- updateOne
- authenticate
  
#### Orders
- create
- index Current Order by user (args: user id)[token required]
- show Completed Orders by user (args: user id)[token required]


### api end point
- get method
  -  http://localhost:3000/api/users/
  -  http://localhost:3000/api/users/id
  -  http://localhost:3000/api/products/
  -  http://localhost:3000/api/products/id
  -  http://localhost:3000/api/orders/id
  -  http://localhost:3000/api/orders/id
  -  http://localhost:3000/api/orders/id/(1 or 0)
- post method
  -  http://localhost:3000/api/users
  -  http://localhost:3000/api/products
  -  http://localhost:3000/api/users/auth
  -  http://localhost:3000/api/orders/

- delete method
  -  http://localhost:3000/api/users/id
  -  http://localhost:3000/api/products/id
  -  http://localhost:3000/api/orders/userid
- update method
    -  http://localhost:3000/api/users


# Data Shapes
#### Product
- product_id
- product_name
- price

#### User
- user_id (uuid)
- email
- first_Name
- last_Name
- password

#### Orders
- id
- user_id
- quantity
- product_id
- status 

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
    product_id?: number;
    quantity: number;