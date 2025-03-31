# 🖋️ Simple Sign

Simple Sign is a web-based application built with Next.js, Prisma, and React that lets users upload, send, receive, and view signed documents. It includes full user authentication via NextAuth and provides a fast and modern UI for managing documents.

🌍 **Production URL**: [https://mdxco-simple-sign.vercel.app](https://mdxco-simple-sign.vercel.app)

---

## ✅ TODOs

### 🔧 Features
- Delete sent files
- Interface for signature
- Notifications at dashboard
- I18n

### 🧹 Technical Debts
- Add Storybook for UI components
- Add unit tests
- Add integration tests with Cypress
- Document functions using JSDoc
- Refactor logic into Context API
- Improve folder structure
- Enhance error handling

---

## 🚀 Features
- User Authentication (NextAuth.js)
- Upload PDFs for signing
- Send and receive signed documents
- View uploaded and received files
- Sign documents by toggle
- Built-in API routes
- React Query + Zod + React Hook Form

---

## 🧱 Tech Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Components**: [HeroUI](https://www.heroui.com/)
- **UI & Styling**: Tailwind CSS, Framer Motion
- **PDF Handling**: react-pdf
- **Form Handling**: React Hook Form + Zod
- **API**: Built-in Next.js API routes
- **Language**: Typescript

---

## 🛠️ Local Development

### 1. Clone the Repo
```bash
git clone https://github.com/mendexco/simple-sign.git
cd simple-sign
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root, following the scheme of .env.example.
Some variables need to be created outside, like the OAuth ones.

### 4. 🐳 Docker Setup
This step is necessary for local postgresdb setup.
```bash
docker compose -up -d
```

### 5. Prisma Setup
```bash
bunx prisma migrate dev --name init
```

### 6. Start Dev Server
```bash
bun dev
```

---

## 🧪 Scripts
| Command         | Description                                |
|-----------------|--------------------------------------------|
| `bun dev`       | Start dev server with Turbopack            |
| `bun build`    | Build the project + generate Prisma client |
| `bun start`    | Start production server                    |
| `bun lint`     | Run lint checks                            |
| `bun lintfix`  | Fix lint issues automatically              |
| `bun db:deploy` | Push DB schema using Prisma to environment |

---

## 📁 File Structure Highlights
- `/app` – Next.js App Router pages
- `/actions` – API routes (upload, listing, e.g.)
- `/components` – Reusable components
- `/lib` – Helper functions and configurations
- `/prisma` – Prisma schema & migrations

---

## 📦 Deployment
This app is automatically deployed to Vercel:
> **Live URL**: [https://mdxco-simple-sign.vercel.app](https://mdxco-simple-sign.vercel.app)

---

## ⚠️ Main Challenges

- Handling PDF exhibition in a user-friendly way
- Ensuring robust session/auth flows with NextAuth across routes
- Organizing shared logic across pages and components effectively
- Setting up HeroUI (took too long to discover it was Tailwind version)
- Learning and using the app folder instead of pages folder

---

Made with by V. Mendes

