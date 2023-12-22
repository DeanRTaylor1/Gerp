# Open Source ERP Project

## Introduction

Welcome to our Open Source ERP Project! This project aims to create an ERP system with a minimal footprint, easy deployment, and low cost for end-users. Designed for non-technical users, it features a user-friendly interface and secure authentication, making it an ideal choice for small to medium-sized businesses.

## Setup and contribution

### Pre-requisites:

    - Docker
    - Go (see go version in .env.example)
    - make
    - npm + yarn

### Project setup

- To set up your dev environment you simply need to run make prepare.
- Ensure Docker is running and run make run-dev
- This should build the frontend and backend in dev/watch mode. The application should rebuild on changes to either section of the project although the frontend will not auto refresh.
- The database will also have migrations applied and will be listening on port 5432.

### Troubleshooting:

- Make sure that you have launched docker desktop.
- Ensure that you don't have postgres running locally.

# Docs

You can access swagger at http://localhost:8080/api/v1/swagger/index.html

## Contributing guidelines

- Due to the nature of this project being for non-technical users we are taking a schema first approach by defining an [open-api](https://swagger.io/specification/) spec. This is generating an axios client based on the schema for the frontend. Please do not edit the axios directory, you should have all the types and api routes necessary.

- The same stands for backend, all of our request and response DTOS should be defined in the api yaml file and not edited. If you need to create a new api route, you must define it in the api schema and ensure you run make gen-tools and the related commands to generate the frontend and backend code.

- For databases we are again using a schema based approach and using [SQLC](https://sqlc.dev/) for codegen. You can read more about how it works or follow the examples in the DB folder, you simply write your migrations and queries and run make sqlc to generate the code.

### Frontend

- Our frontend uses react and axios with tailwind.

### Backend

- Backend is Go, Gin, postgres.

## Key Features

### User Authentication and Authorization

- Implements Role-Based Access Control (RBAC) to manage user permissions and display options based on auth principles.

### Core Modules

- **Financial Management:** Includes general ledger, accounts payable, accounts receivable, and budgeting.
- **Human Resources (HR) Management:** Manages employee records, payroll, and leave management.
- **Inventory Management:** Handles stock tracking, order management, and supply chain details.

### Features TBD

- **Customer Relationship Management (CRM):** Manages contacts, sales pipeline, and customer interactions.

### Infrastructure

- A scalable database schema capable of handling various business processes and data relationships.
- RESTful APIs for integration and scalability.
- Documentation via swagger, very important
- Nginx for routing
- Terraform for IaC
- Ansible for configuration

### Reporting and Analytics

- Basic reporting for financials, sales, and inventory.
- Dashboards for real-time data visualization.

### Documentation and Testing

- Comprehensive documentation for both users and developers.
- Emphasis on testing and quality assurance, including unit and integration tests.

## Roadmap

The initial release will focus on the MVP with core functionalities. Future updates to include advanced analytics, industry-specific modules, and an expanded plugin system.

Stay tuned for updates as we progress in building an efficient, user-friendly, and cost-effective ERP solution!
