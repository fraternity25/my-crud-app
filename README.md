# Next.js CRUD App

This is a full-stack CRUD application built with [Next.js](https://nextjs.org) and  bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app). It's using the Page Router, JavaScript, and Tailwind CSS. Currently uses JSON files for data storage with a structure that can easily be migrated to PostgreSQL.

> ⚠️ This is the template version using JSON files (on the `main` branch).
>    For the complete PostgreSQL version, switch to the [`postgresql` branch](https://github.com/fraternity25/Next-crud-template/tree/postgresql).

## Features

- ✅ Create, Read, Update, Delete (CRUD) operations for users
- ✅ Responsive design with Tailwind CSS
- ✅ Form validation and error handling
- ✅ JSON file-based data storage
- ✅ API routes for backend functionality
- ✅ Clean and modern UI

## Project Structure

```
├── components/
│   └── UserForm.js          # Reusable form component
├── data/
│   └── users.json           # JSON data storage (auto-generated)
├── lib/
│   └── dataService.js       # Data access layer
├── pages/
│   ├── api/
│   │   ├── users.js         # API routes for users collection
│   │   └── users/[id].js    # API routes for individual users
│   ├── users/
│   │   ├── new.js           # Create user page
│   │   ├── [id].js          # View user page
│   │   └── [id]/edit.js     # Edit user page
│   ├── _app.js              # App component
│   └── index.js             # Home page (users list)
├── styles/
│   └── globals.css          # Global styles with Tailwind
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or create the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## API Endpoints

### Users Collection (`/api/users`)
- `GET` - Retrieve all users
- `POST` - Create a new user

### Individual User (`/api/users/[id]`)
- `GET` - Retrieve a specific user
- `PUT` - Update a specific user
- `DELETE` - Delete a specific user

## Data Storage

Currently uses JSON files in the `data/` directory:
- `users.json` - Stores user data with fields: id, name, email, createdAt, updatedAt

## Migration to PostgreSQL

The current architecture is designed for easy migration to PostgreSQL. To migrate:

1. **Install PostgreSQL dependencies:**
   ```bash
   npm install pg
   ```

2. **Update the DataService class** (`lib/dataService.js`) to use PostgreSQL queries instead of JSON file operations

3. **Create database schema:**
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Set up environment variables** for database connection

The API routes and frontend components won't need any changes since they already use the abstracted DataService.

## Development

### Adding New Fields

To add new fields to the user model:

1. Update the `DataService` methods in `lib/dataService.js`
2. Update the `UserForm` component in `components/UserForm.js`
3. Update the API validation in `pages/api/users.js` and `pages/api/users/[id].js`
4. Update the display components as needed

### Styling

The app uses Tailwind CSS for styling. All styles are utility-based and responsive. Key design elements:

- Clean, modern interface
- Responsive tables and forms
- Consistent spacing and typography
- Accessible color contrast
- Hover and focus states

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React](https://reactjs.org/) - JavaScript library for building user interfaces

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## License

This project is open source and available under the [MIT License](LICENSE).

