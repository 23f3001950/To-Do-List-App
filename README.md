# To-Do-List-App 

A full-stack task management application built with **MERN stack** (MongoDB, Express.js, React, Node.js) for personal productivity. Perfect portfolio project demonstrating CRUD operations, authentication, responsive design, and production deployment.

## ✨ **Features**
- ✅ **Task CRUD Operations** - Create, Read, Update, Delete tasks
- 📅 **Due Dates & Priorities** - High/Medium/Low priority levels
- 🏷️ **Categories** - Urgent, Daily, Work tasks
- 🔍 **Search & Filter** - Find tasks by status, category, priority
- 📊 **Dashboard Views** - Daily/Weekly task overview
- 🎨 **Responsive Design** - Mobile-first with Tailwind CSS
- 🔐 **JWT Authentication** - Secure login system
- 🚀 **Production Ready** - Deployed on **Netlify + Railway + MongoDB Atlas**

## 🏗️ **Tech Stack**
Frontend: React 18 + React Router + Axios + Tailwind CSS + Context API
Backend: Node.js + Express.js + Mongoose
Database: MongoDB Atlas
Deployment: Netlify (Frontend) + Railway (Backend)
Dev Tools: VSCode + GitHub + Postman + MongoDB Compass


## 🔗 **Frontend .env**
REACT_APP_API_URL=http://localhost:5000/api/v1


## 📂 **Project Structure**
todolist-mern/
├── backend/
│ ├── src/
│ │ ├── controllers/ # API logic
│ │ ├── models/ # Mongoose schemas
│ │ ├── routes/ # Express routes
│ │ └── middleware/ # Auth & validation
│ ├── app.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable UI
│ │ ├── pages/ # Page components
│ │ ├── context/ # React Context
│ │ └── services/ # API calls
│ └── package.json
└── README.md


## 🛠️ **Development Workflow**
1. **Backend First**: Design MongoDB schemas → Build APIs → Test with Postman
2. **Frontend**: Connect React components to APIs using Axios
3. **State Management**: Use Context API for tasks & auth
4. **Styling**: Tailwind CSS utility classes
5. **Deploy**: Netlify (frontend), Railway (backend), MongoDB Atlas (DB)

## 🚀 **Deployment**
```bash
# Backend (Railway.app)
1. Push backend to GitHub
2. Connect Railway → Deploy from GitHub repo
3. Add MongoDB Atlas connection string as variable

# Frontend (Netlify)
1. Push frontend to GitHub
2. Drag-drop `frontend/build` OR connect GitHub repo
3. Build command: `npm run build`
4. Add env: REACT_APP_API_URL = your-railway-backend-url

# Database
1. MongoDB Atlas → Create free cluster
2. Add IP whitelist: 0.0.0.0/0
3. Get connection string → Add to Railway variables
Live Demo: https://todolist-app.netlify.app

🎯 Learning Outcomes
Full MERN stack development (MongoDB, Express, React, Node)

REST API design & JWT authentication

MongoDB schema design with Mongoose

React hooks & Context API state management

Tailwind CSS for rapid UI development

Production deployment pipeline

Environment variable management

📈 Future Enhancements
Categories & Tags system

Push notifications (Web Push API)

PWA offline support

Task sharing links

Calendar integration

Export to PDF/Markdown

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

