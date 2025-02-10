# Searcher

Available at:
https://asarnacki.github.io/searcher/

**Searcher** is a Vue.js application designed for job searching and data filtering. Built as a learning project, it demonstrates key web development concepts such as HTTP GET requests to fetch job listings from a JSONBin.io database, state management with Pinia, and a local Node.js backend for testing.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Technologies](#technologies)
- [API Integration](#api-integration)
- [Testing](#testing)

## Overview
Searcher is a job search application that allows users to retrieve and filter job listings. Built with Vue.js and Vite, it fetches job data via HTTP GET requests from a JSONBin.io database. This documentation is intended for both developers exploring the codebase and HR professionals looking to understand the project's functionality.

## Features
- **Job Searching:** Browse job listings effortlessly.
- **Data Filtering:** Filter job results based on specific criteria.
- **HTTP GET Requests:** Retrieve job data from JSONBin.io.
- **Local Backend:** A Node.js backend for local development and testing.
- **Unit Testing:** Ensures code reliability with tests run using Vitest.

## Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/asarnacki/searcher.git
   cd searcher
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```

## Usage
- **Start Development Server:**
   ```bash
   npm run dev
   ```
- **Build for Production:**
   ```bash
   npm run build
   ```
- **Start Local Backend:**
   ```bash
   npm run backend
   ```
- **Run Unit Tests:**
   ```bash
   npm run test:unit
   ```

## Scripts
- **dev:** Launches the Vite development server.
- **build:** Bundles the application for production.
- **test:unit:** Runs unit tests with Vitest.
- **lint:** Lints and auto-fixes code.
- **backend:** Starts the local Node.js backend server.

## Technologies
- **Vue.js:** The main framework for building the user interface.
- **Vite:** A fast development server and build tool.
- **Pinia:** State management.
- **Vue Router:** For application routing.
- **Axios:** HTTP client for API requests.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
- **FontAwesome:** Icon library.
- **Vitest:** Testing framework.

## API Integration
This project uses HTTP GET requests to fetch job listings from a JSONBin.io database, enabling:
- **Data Retrieval:** Dynamic fetching of job data.
- **Client-Side Filtering:** Filtering results directly in the app.

## Testing
Unit tests are implemented using Vitest along with libraries such as @testing-library/vue to ensure code quality and reliability.
