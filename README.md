# Reno Platforms - Notice Board Assignment

A production-ready Notice Board Web Application built with Next.js (Pages Router), Tailwind CSS, Prisma, and TiDB Cloud.

## 1. How to run the project locally

Follow these steps to set up the project on your local machine:

**Prerequisites:**
- Node.js (v18 or higher)
- npm or yarn
- A TiDB Cloud Serverless database

**Steps:**
1. Clone the repository:
   ```bash
   git clone https://github.com/Ashmit8736/NoticeBoard.git
   cd NoticeBoard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add your TiDB connection string:
   ```env
   DATABASE_URL="mysql://<user>:<password>@<host>:4000/test?sslaccept=strict"
   ```
4. Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 2. One thing I would improve with more time

If I had more time, I would implement **User Authentication and Role-Based Access Control (RBAC)**. 
Currently, anyone who accesses the application can create, edit, or delete notices. By integrating a solution like NextAuth.js or Clerk, I would ensure that only authorized administrators or staff members have the permission to manage (create/edit/delete) notices, while regular users would only have "read-only" access to view the dashboard. This would make the application secure and ready for a real-world institutional environment.

## 3. Where and how AI was used

I utilized an AI Coding Assistant as a pair-programming partner throughout the development of this assignment. 
- **Code Generation & Architecture:** Used AI to quickly scaffold the Next.js API routes (CRUD operations), design the Prisma database schema, and set up the initial React component structures.
- **UI/UX Design:** Used AI to help design a premium, modern Glassmorphism UI using Tailwind CSS, including selecting harmonious color gradients, hover effects, and responsive layouts.
- **Debugging & Logic Optimization:** Consulted AI to debug specific issues, such as fixing Prisma sorting logic (ensuring Urgent and newest notices appear at the top), and optimizing the pagination, lazy loading, and search implementation.
- **Best Practices:** Relied on AI suggestions to ensure the code strictly followed Next.js Pages Router conventions and maintained clean, readable code structure with proper error handling.
