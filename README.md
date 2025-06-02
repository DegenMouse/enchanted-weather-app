# Weather App

A full-stack weather application with a Rust backend (Rocket framework) and a modern React frontend. The application provides current and weekly weather forecasts with a beautiful user interface.

## Features

- Current weather forecast endpoint
- Weekly weather forecast endpoint
- CORS enabled for cross-origin requests
- RESTful API design
- Compare weather data between two locations
- Side-by-side weather comparison view
- Modern, responsive UI built with React and Tailwind CSS
- Real-time weather updates
- Interactive weather comparison interface

## Prerequisites

### Backend
- Rust (latest stable version)
- Cargo (Rust's package manager)

### Frontend
- Node.js (latest LTS version)
- npm or yarn package manager

## Installation

### Backend Setup
1. Clone the repository:
```bash
git clone <your-repository-url>
cd weather-app
```

2. Build the project:
```bash
cargo build
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Running the Application

### Backend
To start the server in development mode:
```bash
cargo run
```
The server will start on `http://127.0.0.1:8000`

### Frontend
To start the frontend development server:
```bash
cd frontend
npm run dev
# or
yarn dev
```
The frontend will be available at `http://localhost:5173`

## API Endpoints

### Current Weather
- **Endpoint**: `GET /current/<location>`
- **Description**: Get current weather for a specific location

### Weekly Forecast
- **Endpoint**: `GET /weekly/<location>`
- **Description**: Get weekly weather forecast for a specific location

### Basic Route
- **Endpoint**: `GET /`
- **Description**: Basic health check endpoint

## CORS Support

The application supports Cross-Origin Resource Sharing (CORS) with the following configuration:
- All origins allowed
- Supported methods: GET, POST, PUT, DELETE
- Credentials allowed

## Project Structure

```
├── src/                    # Backend source code
│   ├── main.rs            # Application entry point and server configuration
│   ├── routes/            # API route handlers
│   ├── services/          # Business logic and services
│   ├── weather/           # Weather-related functionality
│   └── error/             # Error handling
│
└── frontend/              # Frontend application
    ├── src/              # React source code
    ├── public/           # Static assets
    ├── index.html        # Entry HTML file
    ├── vite.config.js    # Vite configuration
    ├── tailwind.config.js # Tailwind CSS configuration
    └── package.json      # Frontend dependencies
```

## Frontend Technologies

- **React**: Modern UI library for building interactive interfaces
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **PostCSS**: CSS transformation tool
- **Node.js**: JavaScript runtime for development

## Development

### Backend Tests
```bash
cargo test
```

### Frontend Development
```bash
cd frontend
npm run dev
# or
yarn dev
```

### Building for Production
```bash
# Build frontend
cd frontend
npm run build
# or
yarn build

# Build backend
cargo build --release
```

## License

[Add your license here]

## Contributing

[Add contribution guidelines here] 