# Open Source ERP Project

## Introduction

Welcome to our Open Source ERP Project! This project aims to create an ERP system with a minimal footprint, easy deployment, and low cost for end-users. Designed for non-technical users, it features a user-friendly interface and secure authentication, making it an ideal choice for small to medium-sized businesses.

## Setup and contribution

To set up your dev environment you simply need to copy .env.example to .env.development.example or run make prepare if you're on a UNIX based system.
Next, you just need to run docker-compose up.
This should build the frontend and backend in dev/watch mode. The application should rebuild on changes to either section of the project although the frontend will need to be refreshed.
The database will also have migrations applied and will be listening on port 5432.
Make sure that you have disconnected postgres in advance.

You can access swagger at http://localhost:8080/api/v1/swagger/index.html

## Contributing guidelines

We are currently at the very early stages of the project, if you're reading this then contact @DeanRTaylor1 for updates on what to work on.

## Key Features

### User Authentication and Authorization

- Utilizes an external auth provider like OAuth2 for secure login and logout processes.
- Implements Role-Based Access Control (RBAC) to manage user permissions and display options based on auth principles.

### Core Modules

- **Financial Management:** Includes general ledger, accounts payable, accounts receivable, and budgeting.
- **Human Resources (HR) Management:** Manages employee records, payroll, and leave management.
- **Inventory Management:** Handles stock tracking, order management, and supply chain details.

### Features TBD

- **Customer Relationship Management (CRM):** Manages contacts, sales pipeline, and customer interactions.

### Technology Stack

- **Backend:** Written in Go based upon openapi spec.
- **Frontend:** A Single Page Application (SPA) that can be built and served from the server, framework TBD (React, Vue, Svelte or Angular).
- **Containerization:** Should use Docker for consistent deployment and scaling.

### Infrastructure

- A scalable database schema capable of handling various business processes and data relationships.
- RESTful APIs for integration and scalability.

### API Documentation

- **Comprehensive API** documentation with Swagger, providing clarity and ease of use for developers.

### Reporting and Analytics

- Basic reporting for financials, sales, and inventory.
- Dashboards for real-time data visualization.

### UI/UX

- A user-friendly, responsive interface suitable for various devices.

### Documentation and Testing

- Comprehensive documentation for both users and developers.
- Emphasis on testing and quality assurance, including unit and integration tests.

## Deployment and Setup

- Designed for minimal setup effort, suitable for non-technical users.
- Detailed instructions will be provided for deploying using Docker and setting up the system.

## Contributing

Contributions are welcome! Whether you're improving the documentation, adding new features, or reporting issues, your input is valuable to this project.

## Roadmap

The initial release will focus on the MVP with core functionalities. Future updates to include advanced analytics, industry-specific modules, and an expanded plugin system.

Stay tuned for updates as we progress in building an efficient, user-friendly, and cost-effective ERP solution!
