# Pet's Paradise

Pet's Paradise is a full-stack pet adoption platform that helps prospective pet parents discover recently approved pets, submit adoption requests, and lets administrators manage adoption pipelines end-to-end. The project includes a React-based client application and an Express/MongoDB backend API.

## Features

- Browse recently approved pets on the public landing page and open their adoption forms in an accessible modal experience.
- Filter pets by type, express interest via a guided adoption application, and track time-since-update details for each pet.
- Admin portal to review new pet postings, approve requests, and monitor adoption history.
- Image uploads for pets, secure admin authentication with JWT, and e-mail notifications for adoption submissions.

## Tech Stack

**Frontend**
- React 18 with React Router and Redux Thunk
- Styling with CSS modules and responsive layouts
- Axios for API calls and Slick Carousel for featured pets

**Backend**
- Express.js and MongoDB (via Mongoose)
- Multer for image uploads, Nodemailer for e-mail notifications
- JWT-based authentication and cookie parsing middleware

## Project Structure

```bash
Pet-s-Paradise-main/
├── client/               # React frontend (create-react-app)
│   ├── public/
│   └── src/
│       ├── Components/   # UI components (Home, Services, Admin, etc.)
│       ├── index.js
│       └── db.js         # Shared API base URL
├── server/               # Express API
│   ├── Controller/
│   ├── Model/
│   ├── Routes/
│   ├── utils/
│   └── server.js
└── package-lock.json     # Root lock file for combined install (optional)
```

## Prerequisites

- Node.js 18+ (includes npm)
- MongoDB Atlas cluster or self-hosted MongoDB instance

## Environment Variables

Create a `.env` file inside the `server/` directory with the following keys:

```bash
MONGO_URI=<your-mongodb-connection-string>
PORT=4000                    # optional, defaults to 4000
CLIENT_ORIGIN=http://localhost:3000

# Optional: auto-create an admin account on first boot
ADMIN_DEFAULT_USERNAME=<preferred-username>
ADMIN_DEFAULT_PASSWORD=<strong-password>

# Optional: Nodemailer SMTP settings for adoption e-mail notifications
SMTP_HOST=<smtp-host>
SMTP_PORT=<smtp-port>
SMTP_USER=<smtp-username>
SMTP_PASS=<smtp-password>
```

Frontend optional variable (create `client/.env` if needed):

```bash
REACT_APP_API_URL=http://localhost:4000
```

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Shiva210Jyoti/PetPlatformProject.git
   cd PetPlatformProject
   ```

2. **Install backend dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../client
   npm install
   ```

## Running the App Locally

Open two terminals (or use background processes).

### Backend

```bash
cd server
npm start
```

The API will listen on `http://localhost:4000` (configurable via `PORT`).

### Frontend

```bash
cd client
npm start
```

The React development server will run on `http://localhost:3000` and proxy API requests to the backend when `REACT_APP_API_URL` is set.

## Building for Production

```bash
cd client
npm run build
```

The `server/server.js` file serves the built client bundle from `client/build` when running in production mode.

## API Overview

- `GET /approvedPets` – fetches all pets with status `Approved` (used by the home carousel and pet listing).
- `GET /requests` – returns pending pet postings (admin only).
- `GET /adoptedPets` – returns adopted pet records.
- `POST /services` – submit a new pet for approval (supports image upload via Multer).
- `PUT /approving/:id` – approve a pet request (admin only).
- `POST /form/save` – submit an adoption form for a specific pet.

Routes under `/admin` use JWT authentication managed by cookies (see `server/middleware/authMiddleware.js`).

## Admin Access

If `ADMIN_DEFAULT_USERNAME` and `ADMIN_DEFAULT_PASSWORD` are provided, a default admin user is created automatically during server startup. Otherwise, create an admin record manually in MongoDB via the `AdminModel` schema.

## Common Scripts

- `npm start` (client) – run React dev server
- `npm run build` (client) – build optimized static assets
- `npm start` (server) – start Express server

## Deployment

**⚠️ Important:** This is a full-stack application that requires a Node.js server. GitHub Pages cannot deploy this application as it only supports static sites.

### Recommended Platforms

1. **Render (Free Tier Available)**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Create a new Web Service
   - Use the `render.yaml` configuration file included in this repo
   - Set environment variables in the Render dashboard (MONGO_URI, CLIENT_ORIGIN, etc.)

2. **Railway**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway will auto-detect Node.js and deploy
   - Add environment variables in the Railway dashboard

3. **Vercel (Frontend + Serverless)**
   - Frontend can deploy to Vercel
   - Backend APIs can use Vercel Serverless Functions
   - Requires some code restructuring

4. **Heroku**
   - Go to [heroku.com](https://heroku.com)
   - Create a new app and connect your GitHub repo
   - Add environment variables in Heroku dashboard
   - Note: Heroku no longer has a free tier

### Deployment Steps (Render Example)

1. Push your code to GitHub (already done ✅)
2. Sign up/login at [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Select your repository and branch
6. Render will auto-detect the `render.yaml` file
7. Set environment variables:
   - `MONGO_URI` - Your MongoDB Atlas connection string
   - `CLIENT_ORIGIN` - Your Render app URL (e.g., `https://your-app.onrender.com`)
   - `ADMIN_DEFAULT_USERNAME` - Admin username
   - `ADMIN_DEFAULT_PASSWORD` - Admin password
   - (Optional) SMTP settings for email notifications
8. Click "Create Web Service"
9. Wait for deployment to complete (build may take 5-10 minutes)

### MongoDB Atlas Setup

If you haven't already:
1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Add your Render app IP to MongoDB Atlas Network Access whitelist (or use 0.0.0.0/0 for all IPs)

## Contributing

1. Fork the repository and create a feature branch.
2. Commit your changes with descriptive messages.
3. Open a pull request describing the updates and testing performed.

## Contact

- Email: [jyotishiva2104@gmail.com](mailto:jyotishiva2104@gmail.com)
- Phone: 8627026538
- LinkedIn: [linkedin.com/in/shiva-jyoti-23013328b](https://www.linkedin.com/in/shiva-jyoti-23013328b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
- GitHub: [github.com/Shiva210Jyoti](https://github.com/Shiva210Jyoti)

Feel free to reach out for collaboration, feature ideas, or feedback!



