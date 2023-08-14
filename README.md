## OMDB Browser Project - Movie Data Retrieval using Next.js and TypeScript

Welcome to the OMDB Browser project! This project is built using Next.js and TypeScript to fetch and showcase movie data from the OMDB API. This guide will walk you through the project setup and usage.

## Project Overview

The OMDB Browser project leverages the power of Next.js and TypeScript to create a web application that interacts with the OMDB API. Users can search for movies and view detailed information about their favorite films.

## Prerequisites

Before you begin, ensure you have the following:

1. OMDB API Key: Obtain a free API key from the OMDB API website. You'll need this key to access movie data.

2. Node.js: Make sure Node.js is installed on your computer. You can download it from the official Node.js website.

## Setup Instructions

Follow these steps to set up the project:

1. Clone the Repository: Clone this repository to your local machine using the following command:
   git clone <repository-url>

2. Install Dependencies: Navigate to the project directory in your terminal and install the required dependencies:
   npm install

3. API Key Configuration: Create a file named .env in the project root directory. Inside the .env file, add your OMDB API key:
   OMDB_API_KEY=your_api_key_here
   Replace your_api_key_here with your actual OMDB API key.

## Running the Project

To run the project, follow these steps:

Start the Development Server: In your terminal, run the following command:
npm run dev
Access the Application: Open your web browser and go to http://localhost:3000 to access the OMDB Browser application.

## Using the Application

Once the application is running, you can use it to search for movie information:
Search: Enter the title of a movie in the search bar and click the "Search" button.
Results: The application will display relevant details about the movie, including its title, release year, plot, and more.

## Conclusion

Congratulations! You've successfully set up the OMDB Browser project. Feel free to explore the code, make enhancements, and use it as a foundation for building more complex applications that interact with APIs and display data. If you have any questions or need assistance, refer to the provided documentation or reach out to the project maintainers. Happy coding!
