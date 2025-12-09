# Gemini 3D Demo

This project demonstrates how to integrate Google's Gemini 3 API with a 3D scene built using React Three Fiber and React. It allows users to send text prompts to Gemini 3 and visualize its textual responses within a dynamic 3D environment.

## Features

- Basic 3D scene setup with React Three Fiber.
- Interaction with the Gemini 3 API for text generation.
- Display of Gemini 3 responses within the React application.

## Prerequisites

- Node.js and npm (or yarn) installed.
- A Gemini API key.

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd gemini-3d-demo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API Key:**
   Create a `.env` file in the root of the project and add your Gemini API key:
   ```
   REACT_APP_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   ```
   Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.

## Running the Application

To start the development server, run:

```bash
npm start
```

This will launch the application in your browser. You can then enter prompts in the input field and click 'Ask' to see the response from Gemini 3.

## Project Structure

- `public/`
  - `index.html`: The main HTML file.
- `src/`
  - `App.js`: The main React component for the application.
  - `App.css`: CSS styles for the application.
  - `index.js`: The entry point for the React application.
- `.env`: Environment file for API keys.
- `package.json`: Project dependencies and scripts.
- `.gitignore`: Specifies intentionally untracked files that Git should ignore.
