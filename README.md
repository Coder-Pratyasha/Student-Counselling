# 👩‍🎓 Student Counselling Web Portal

A full-stack web application designed to facilitate seamless counselling session bookings for students. Users can sign up, log in, and book or cancel sessions with counselors. The platform includes real-time payment integration, feedback collection, secure authentication, and role-based dashboards for students, counselors, and admins.

---

## 🛠 Tech Stack

- **Frontend, Admin**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Email Notifications**: Nodemailer
- **Payment Integration**: Razorpay
- **Deployment**:
  - Frontend: Render
  - Backend: Render
  - Admin: Render
  - Database: MongoDB Atlas

---

## 🔐 Features

✅ Student Registration & Login  
✅ Counsellor Registration  
✅ Book, Cancel, and Manage Appointments  
✅ Razorpay Integration for Secure Online Payments  
✅ Automated Email Notifications for Successful Signup, Bookings & Cancellations  
✅ Role-Based Dashboards (Student / Counsellor / Admin)  
✅ Post-Session Feedback Collection  
✅ Real-time Status Updates  
✅ Responsive UI with Tailwind CSS  
✅ Protected Routes with JWT Auth  
✅ RESTful API Communication

---

## ⚙️ How It Works

### 👤 1. User Authentication
- Students sign up via the frontend.
- Counsellors sign in via the admin portal and are registered by the admin.
- JWT tokens are generated upon login to authorize protected routes.
- Role-based access is controlled in the backend middleware.

### 📅 2. Booking a Session
- Students can browse available slots and counselors.
- Razorpay payment is triggered during booking and can pay online or via cash.
- Upon success, booking confirmation is sent via email using Nodemailer.

### 📭 3. Manage Appointments
- Students: View, cancel, or provide feedback for booked sessions.
- Counselors: View upcoming sessions and student details.
- Admin: Approve counselor accounts, monitor session records.

### 💬 4. Feedback & Email Integration
- Students submit post-session feedback via a form.
- Emails are sent for:
  - Successful Signup
  - Booking confirmation
  - Cancellation notice
  

---

## 🚀 Live Demo

🌐 [Live Frontend](https://student-counselling-frontend.onrender.com)  
🌐 [Live Admin](https://student-counselling-admin.onrender.com)   
🌐 [Live Backend](https://student-counselling-backend.onrender.com)  


---

## 🧪 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Coder-Pratyasha/Student-Counselling.git
cd Student-Counselling

```

### 2. Install dependencies
For backend
```bash
cd backend
npm install
```
For frontend
```bash
cd ../frontend
npm install
```
For admin
```bash
cd ../admin
npm install
```
### 3. Run the Application
For backend
```bash
cd backend
npm run dev
```
For frontend
```bash
cd ../frontend
npm run dev
```
For admin
```bash
cd ../admin
npm run dev
```
### 🔐 4. Create `.env` File

Inside the `backend` folder, create a `.env` file and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
CURRENCY=INR
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
```
Inside the `frontend` folder, create a `.env` file and add the following variable:

```env
VITE_BACKEND_URL=your_backend_url
VITE_RAZORPAY_KEY_ID=your-razorpay-key-id
```
Inside the `admin` folder, create a `.env` file and add the following variable:

```env
VITE_BACKEND_URL=your_backend_url
```








