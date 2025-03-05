# Marquei - SaaS for Local Clinic Scheduling & Management

```sh
https://marquei.com.br/
```

**Marquei** is a **fully custom-built SaaS** designed for scheduling and managing local clinics. This system was developed entirely from scratch, including the **frontend, backend, and database**. 

🚨 **Note:** This repository is publicly accessible **only so that the CEO of Flatirons can review it**.

## Features

- 🏥 **Clinic Management**: Handle patient records, appointments, and services.
- 📅 **Scheduling System**: Seamless booking experience for patients and staff.
- 🔑 **Secure Authentication**: Role-based access control for admins and users.
- 📊 **Dashboard & Analytics**: Track appointments, revenue, and clinic performance.
- 💻 **Full-Stack Development**: Built with scalable and modern technologies.

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** NestJS, TypeORM, PostgreSQL
- **Database:** PostgreSQL with optimized queries and migrations
- **Authentication:** JWT with Passport.js
- **Hosting & Deployment:** AWS (EC2, RDS, S3, CloudFront)

## Installation & Setup

To run the project locally:

```sh
git clone https://github.com/your-username/marquei.git
cd marquei
npm install
```

Set up the environment variables in a `.env` file:

```
DATABASE_URL=postgres://user:password@localhost:5432/marquei_db
JWT_SECRET=your_jwt_secret
PORT=3000
```

Run the backend:

```sh
npm run start:dev
```

Run the frontend:

```sh
cd client
npm start
```

## Contact

For any inquiries, feel free to reach out.

🚀 **This project is a solo development effort, built from the ground up!**


React Aplication


Foi iniciado a conversao do projeto para VITE 
o arquivo vite.congig.js ja esta devidamente configurado e o arquivo index.html tambem, sendo necessario apenas a conversao de alguns estilos e do script para funcionar.

  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
