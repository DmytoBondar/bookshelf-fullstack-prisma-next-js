# Book Chronicles - Backend Project

This is the backend project for Book Chronicles, built using TypeScript, Prisma as the ORM, PostgreSQL as the database, Express, Node.js, JWT for authentication, Prettier for code formatting, lint-staged, Husky for pre-commit hooks, Zod for data validation, and cookie-parser.

## Live Link

You can access the live application [here](https://bookshelf-chronicles.vercel.app/).

## Application Routes

### User

- **Sign Up** (POST)
  - Endpoint: `/api/v1/auth/signup`
  - Description: Users can create accounts.

- **Sign In** (POST)
  - Endpoint: `/api/v1/auth/signin`
  - Description: Users (both customers and admins) can sign in and receive an access token and a refresh token.

- **Get User Information** (GET)
  - Endpoint: `/api/v1/auth/`
  - Description: Admins can see a list of all users, while customers can only see their own account information.

- **Get User by ID** (Single GET)
  - Endpoint: `/api/v1/auth/{user-id}`
  - Description: Only Admins can view user accounts by user ID.

- **Update User Data** (PATCH)
  - Endpoint: `/api/v1/auth/{user-id}`
  - Description: Admins can update user data.

- **Delete User Account** (DELETE)
  - Endpoint: `/api/v1/auth/{user-id}`
  - Description: Only Admins can delete user accounts by user ID.

- **Dynamic Route for Users** (GET)
  - Endpoint: `/api/v1/auth/`
  - Description: Admins will see a list of all users, and customers will see only their own account information.

### Category

- **Create Category** (POST)
  - Endpoint: `/api/v1/category/create-category`
  - Description: Only admins or customers can create categories.

- **Get All Categories** (GET)
  - Endpoint: `/api/v1/category/`
  - Description: Admins or customers can retrieve a list of all categories.

- **Get Category by ID** (Single GET)
  - Endpoint: `/api/v1/category/{category-id}`
  - Description: Get a single category by its category ID.

- **Update Category** (PATCH)
  - Endpoint: `/api/v1/category/{category-id}`
  - Description: Only admins can update categories.

- **Delete Category** (DELETE)
  - Endpoint: `/api/v1/category/{category-id}`
  - Description: Only admins can delete categories.

### Books

- **Create Book** (POST)
  - Endpoint: `/api/v1/books/create-book`
  - Description: Only admins can create books.

- **Get All Books** (GET)
  - Endpoint: `/api/v1/books`
  - Description: Retrieve a list of all books.

- **Get Books by Category** (GET)
  - Endpoint: `/api/v1/books/:categoryId/category`
  - Description: Retrieve books by a specific category.

- **Get Book by ID** (GET)
  - Endpoint: `/api/v1/books/:id`
  - Description: Retrieve a book by its ID.

- **Update Book** (PATCH)
  - Endpoint: `/api/v1/books/:id`
  - Description: Only admins can update books.

- **Delete Book** (DELETE)
  - Endpoint: `/api/v1/books/:id`
  - Description: Only admins can delete books.

### Orders

- **Create Order** (POST)
  - Endpoint: `/api/v1/orders/create-order`
  - Description: Only customers can create orders.

- **Get All Orders** (GET)
  - Endpoint: `/api/v1/orders`
  - Description: Admins can see all orders, and customers will see only their own orders.

- **Update Order** (PATCH)
  - Endpoint: `/api/v1/orders/:orderId`
  - Description: Only admins can update orders.

- **Delete Order** (DELETE)
  - Endpoint: `/api/v1/orders/:orderId`
  - Description: Only admins can delete orders.

## Bonus Parts

### Order

- **Get All Orders** (GET)
  - Endpoint: `/api/v1/orders`
  - Description: Admins can see a list of all orders, and customers will see only their own orders.

- **Get All Profiles** (GET)
  - Endpoint: `/api/v1/auth`
  - Description: Admins can see a list of all profiles, and customers will see only their own profile.
