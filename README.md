# Access Control Panel

This project is an Angular application demonstrating user and role management with an access control system.

---

## Technical Architecture

This application is built with a focus on modern Angular practices and principles for scalable, large-scale applications:

* **Framework:** **Angular 19** (leveraging the latest features and paradigms).
* **UI Components:** **Angular Material** for a robust and consistent user interface.
* **Monorepo:** Managed within an **Nx Monorepo** for optimized development workflows, code sharing, and maintainability across multiple applications and libraries.
* **State Management:** Utilizes **NgRx Signal Store** for reactive, signal-based state management, providing a performant and simplified approach to global state.
* **Reactivity:** Deeply integrated with **Angular Signals** for fine-grained reactivity and efficient change detection.
* **Control Flow:** Employs the new built-in template control flow syntax (`@if`, `@for`, `@switch`) for enhanced readability and performance.
* **Backend Simulation:** A mock REST API is provided by **JSON Server** for local development.
* **Architecture Principles:** The project adheres to principles of modular design, clear separation of concerns (services, guards, utilities), and comprehensive error handling suitable for enterprise-grade applications.

---

## Prerequisites

* **Node.js**: `v18` or higher
* **npm**: Comes with Node.js
* **Angular CLI**: Install globally via `npm install -g @angular/cli@latest`
* **Nx**: Install globally via `npm install -g nx`
* **json-server**: Install globally via `npm install -g json-server`

---

## Getting Started

### Local Setup and Run

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Rebaiahmed/access-control-panel](https://github.com/Rebaiahmed/access-control-panel)
    cd access-control-panel
    ```

2.  **Install project dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Application (Frontend & Backend):**
    This command will concurrently start the JSON Server backend and the Angular frontend.
    ```bash
    npm start
    ```
    * The backend API will be available at `http://localhost:3000`.
    * The Angular application will launch at `http://localhost:4200`.

---

## Key Design Decisions & Architectural Highlights

This project was developed with scalability, maintainability, and best practices in mind, suitable for a large-scale application:

* **Modular Architecture with Nx:** The application is structured as an **Nx monorepo**, which facilitates a highly modular design. This allows for:
    * **Feature-Based Splitting:** The application logic is organized into distinct features (e.g., `auth`, `user-management`, `role-management`) for better separation of concerns and easier collaboration.
    * **Reusable Libraries (`libs/` folder):** Core functionalities, shared UI components (`libs/shared-ui`), API communication (`libs/api-services`), and state management (`libs/*-store`) are extracted into dedicated libraries. This promotes code reuse across potential multiple applications or future extensions, enhancing consistency and reducing duplication.
    * **Scalability:** Nx's project graph and caching significantly speed up development workflows in larger teams and projects, making it a robust choice if the application needs to grow or manage a backend (e.g., Node.js API) within the same monorepo.

* **Robust State Management:** **NgRx Signal Store** is employed for managing application state. This provides a clear, centralized approach for data sharing and data flow across the application, ensuring consistency and predictability, powered by the performance benefits of Angular Signals.

* **Clean Code & Single Responsibility:**
    * Services are designed with the **Single Responsibility Principle (SRP)**, ensuring each service has a clear, focused purpose (e.g., a dedicated service for user API calls, another for role API calls).
    * **Injection Tokens for URLs:** Environment-specific configurations, particularly API base URLs, are safely provided to libraries using **Angular Injection Tokens**. This crucial design choice maintains the independence and reusability of libraries, preventing direct, tightly coupled imports from specific application environments.

* **Intuitive UI with Reactive Forms:** User input, especially in the user management forms, is handled using **Angular Reactive Forms**. This provides a robust, testable, and scalable approach to form handling, including validation.

* **Generic & Reusable Components:** A dedicated set of generic, reusable UI components (e.g., spinners, generic tables, confirmation dialogs) are housed within shared libraries (`libs/shared-ui` or `libs/core`). This promotes UI consistency and development efficiency.

* **Clean Application Structure:** The application adheres to a clean and logical folder structure, with most core features and reusable elements residing under the `libs/` folder, ensuring the main application (`apps/access-control-panel`) remains lean and focused on orchestrating these capabilities.

---

We hope you find that this project meets your expectations and demonstrates a thoughtful approach to building a scalable and maintainable Angular application.