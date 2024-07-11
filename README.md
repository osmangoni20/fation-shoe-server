# This is a express application 

This is an Express application that uses Mongoose for MongoDB interactions and Zod for schema validation. The application includes a product model with fields for variants and inventory.

## Prerequisites

Firstly,  ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (running locally or accessible remotely)

## Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

2. Install dependencies

------ npm install

3. Environment Variables
Create a .env file in the root directory and add your MongoDB connection string:

------ env
 
MONGODB_URI=mongodb://localhost:27017/your-database-name
4.  Running the Application
Start MongoDB
Ensure your MongoDB server is running. If you have MongoDB installed locally, you can start it with:

npm start
The application should now be running on http://localhost:5000.

Endpoints
GET / - Returns a "Hello World!" message.
GET /restart - Restarts the server.
Example Product Schema
5. The product schema includes fields for variants and inventory:

{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "tags": ["string"],
  "variants": [
    {
      "type": "string",
      "value": "string"
    }
  ],
  "inventory": {
    "quantity": "number",
    "inStock": "boolean"
  },
  "isDeleted": "boolean"
}
6. Using Zod for Validation
The application uses Zod for schema validation. Here's an example of how you can use Zod to validate a product object:

const product = {
  id: '123',
  name: 'Sample Product',
  description: 'This is a sample product',
  price: 100,
  category: 'Sample Category',
  tags: ['sample', 'product'],
  variants: [
    {
      type: 'size',
      value: 'large'
    }
  ],
  inventory: {
    quantity: 50,
    inStock: true
  },
  isDeleted: false
};

const result = productSchema.safeParse(product);

if (!result.success) {
  console.error(result.error);
} else {
  console.log('Product is valid:', result.data);
}

8.  Please open an issue or submit a pull request for any bugs or feature requests.