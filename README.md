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

This Angular project uses modern practices to make it scalable and easy to maintain:

* **Modular Nx Monorepo:** I built this project using **Nx** for a highly organized setup. This means:
    * **Feature-Based Organization:** I split the app's logic into clear features (like `auth`, `user-management`, `role-management`). This makes it easier to work on and understand.
    * **Reusable Libraries (`libs/`):** I put common code and UI parts into separate libraries. This lets me write code once and use it everywhere, making the app more consistent and faster to build.

* **NgRx Signal Store for State:** I used **NgRx Signal Store** to manage all the app's data. This gives us a clear and central way to handle data, making sure everything is consistent and works smoothly, all while using Angular Signals for great performance.

* **Clean Code Principles:**
    * **Single Responsibility:** I designed services so each one does just one specific job (e.g., one service handles user API calls, another handles role API calls).
    * **Injection Tokens for URLs:** I provided API base URLs using **Angular Injection Tokens**, like the `API_URL` token. This keeps my libraries independent and reusable, so they're not directly tied to specific environment settings.

* **Generic Components:** I developed **reusable UI components** such as spinners and tables. They're stored in shared libraries, which helps keep the user interface consistent and makes development faster.

---

I hope this project meets your expectations and demonstrates a thoughtful approach to building a scalable and maintainable Angular application.
