# Furnix – eCommerce Website

Furnix is a sleek, responsive, and minimalistic e-commerce frontend built with **React.js** and **Tailwind CSS**. It offers a smooth user experience with wishlist and cart functionalities, popup signup, and responsive mobile navigation. Designed with clean UI/UX and deployed via Netlify, this project highlights component-based architecture, Redux state management, and custom hooks.

## Tech Stack

### Frontend
- **React.js** – Component-based architecture for fast UI rendering
- **Tailwind CSS** – Utility-first CSS framework for styling
- **React Router DOM** – For client-side routing and navigation
- **React Icons** – Icon library for UI elements

### State Management
- **Redux Toolkit** – Efficient global state management
- **React-Redux** – To connect Redux with React components

### Functionality
- **Custom Context & Hooks** – For Wishlist and Cart logic  
- **Responsive Design** – Mobile-first, fully responsive UI  
- **Popup/Modal System** – Built using conditional rendering and Redux  
- **Form Handling** – Basic forms with client-side validation  
- **Product Filtering** – Users can filter and view products by category  

### Deployment & Tools
- **Netlify** – Deployment
- **Git & GitHub** – Version control

**Backend Integration (soon)** for:
  - User authentication
  - Storing wishlist/cart items
  - Order processing

flowchart TD
    A[Visitor / Unauthenticated] -->|Signup| B[POST /api/auth/signup]
    A -->|Login| C[POST /api/auth/login + JWT]
    
    B --> D[Users Collection (MongoDB)]
    C --> D
    
    D --> E[Authenticated Dashboard]
    
    E --> F[Normal User]
    E --> G[Admin]
    E --> H[AI Integration]
    
    F --> I[Product Listing] --> J[GET /api/products] --> K[Products Collection]
    F --> L[Product Details] --> M[GET /api/products/:id]
    F --> N[Cart Management] --> O[POST/PATCH/DELETE /api/cart] --> P[Cart Collection]
    F --> Q[Checkout / Orders] --> R[POST /api/orders] --> S[Orders Collection]
    F --> T[View Order History] --> U[GET /api/orders/:userId]
    
    G --> V[Admin Dashboard]
    V --> W[Manage Products] --> X[CRUD /api/products] --> K
    V --> Y[View All Orders] --> S
    V --> Z[Manage Users] --> D
    
    H --> AA[User sends prompt] --> AB[POST /api/ai/chat] --> AC[OpenAI / HuggingFace]
    AC --> AD[AI Response displayed in Frontend]
    
    K -->|Stored| DB[MongoDB]
    P -->|Stored| DB
    S -->|Stored| DB
    D -->|Stored| DB
    
    E --> AE[Frontend: React + Tailwind]
    AE -->|Connected| Backend[Node.js + Express]
    Backend --> DB


>> Ongoing...
