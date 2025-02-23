# React Frontend for SPA App

This is the frontend for a Multi Page Application (SPA) built with **React**, **TypeScript**, and **Bootstrap**. It displays orders and products in a user-friendly interface.

## Features

- **Orders Management**: View orders with details.
- **Products Management**: View products. Also filter product by their specification and type.
- **TypeScript**: Strongly typed codebase for better maintainability and fewer runtime errors.
- **Real-Time Updates**: Fetch and display data from a backend API.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript for better code quality.
- **Bootstrap**: A CSS framework for responsive and modern UI components.
- **React Router**: For handling client-side routing.
- **Render**: Hosting for the frontend and backend.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. Download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is installed with Node.js. Alternatively, you can use **Yarn**.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/LadeMor/orders-products.git
   cd orders-products


2. **Install dependencies**:
   ```bash
   npm install  

3. **Set up environment variables**:
    ```plaintext
    In utils folder in constants file change API_URL on backend
    REACT_APP_API_URL=https://orders-products-server.onrender.com

4. **Run the development server**:
    ```bash
    npm start

5. **Open the app**:
    ```plaintext
    http://localhost:3000

**Available Scripts**:

    npm start: Runs the app in development mode.

    npm build: Builds the app for production to the build folder.

    npm test: Launches the test runner.

    npm eject: Ejects the app from Create React App (use with caution).

**Deployment**:
```plaintext
    The app is deployed on Render as a static site. To deploy:

    Push your code to a GitHub repository.

    Connect the repository to Render.

    Set the build command to npm run build.

    Set the publish directory to build.





