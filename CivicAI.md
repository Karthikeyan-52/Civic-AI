# CivicAI

## AI-Powered Smart Civic Complaint & Service Platform

CivicAI helps citizens report civic problems such as potholes, overflowing garbage, broken streetlights, water leaks, blocked drains, and damaged public infrastructure.

The platform turns a simple report into structured civic intelligence by identifying the issue, estimating urgency, recommending a department, and helping administrators track the complaint through resolution.

> CivicAI's priority scores are AI-assisted recommendations for city teams. They are not official government or emergency classifications.

## Demo

The application includes a complete hackathon-friendly demo experience:

1. Citizen opens CivicAI.
2. Citizen signs in using the Citizen demo.
3. Citizen describes a civic issue.
4. Citizen adds an image by uploading a file or taking a live photo.
5. Citizen can add a voice description using browser speech recognition.
6. Citizen captures their current location.
7. CivicAI analyzes and prioritizes the complaint.
8. Citizen reviews and confirms the AI-assisted result.
9. The complaint receives a unique complaint ID.
10. The citizen tracks the complaint status.
11. An administrator reviews, assigns, updates, and analyzes complaints.

## Main Features

### Citizen experience

- Landing page explaining the CivicAI mission
- Citizen demo sign-in
- Citizen dashboard with complaint statistics
- Multi-step complaint reporting form
- Text-based issue description
- Browser voice input using the Web Speech API
- Image upload from the device
- Live camera photo capture using `getUserMedia`
- Mobile-friendly rear-camera preference
- Browser geolocation support
- AI-assisted complaint analysis
- Category, severity, priority, and department recommendation
- Complaint confirmation and unique complaint ID
- Complaint history and filtering
- Complaint detail page with status timeline
- Possible duplicate complaint warning
- Resolution feedback flow
- Profile and privacy settings

### Admin experience

- Admin demo sign-in
- Operations dashboard
- Complaint priority queue
- Complaint search and filtering
- Status management
- Department assignment and override
- Internal admin notes
- Civic map with complaint markers
- Civic hotspot view
- Department workload visualization
- Complaint analytics
- AI-generated civic insights view

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Wouter routing
- Lucide React icons
- Vitest
- Web Speech API
- Browser Geolocation API
- Browser MediaDevices API for live camera capture
- Local browser storage for hackathon demo persistence

The current demo uses the CivicAI WebDev full-stack scaffold and is intentionally designed to run without external AI or database credentials.

## Requirements

- Node.js 18 or newer
- npm
- VS Code or another code editor
- A modern browser such as Chrome, Edge, or Firefox

The project was originally scaffolded with pnpm, but npm can be used if pnpm is blocked by an organization security policy.

## Local Setup

### 1. Open the project

Open the project folder in VS Code.

```powershell
cd "C:\path\to\civicai"
```

### 2. Install dependencies

Using npm:

```powershell
npm install
```

If you are using pnpm instead:

```powershell
pnpm install
```

If npm reports a lockfile conflict and you are using npm exclusively, remove the pnpm lockfile first:

```powershell
Remove-Item pnpm-lock.yaml
npm install
```

### 3. Start the development server

```powershell
npm run dev
```

Open the local URL shown in the terminal. It is usually:

```text
http://localhost:3000
```

## Camera and Browser Permissions

Live photo capture requires a secure browser context. It works on:

- `http://localhost`
- An HTTPS deployment

It may not work when opening the application directly as a local file with a `file://` URL.

When prompted by the browser:

1. Allow camera access.
2. Click **Take a live photo**.
3. Review the live preview.
4. Click **Capture photo**.

If camera access is unavailable, the regular file upload control remains available.

## Available Commands

```bash
# Start the development server
npm run dev

# Type-check the project
npm run check

# Run tests
npm test

# Build the frontend and server bundle
npm run build

# Start the production build
npm start
```

If using pnpm, replace `npm run` with `pnpm` where appropriate:

```bash
pnpm dev
pnpm check
pnpm test
pnpm build
pnpm start
```

## Demo Accounts

The application provides demo sign-in buttons instead of requiring account setup.

### Citizen demo

- Name: Aarav Mehta
- Email: `aarav@example.com`
- Use this to report and track civic complaints.

### Admin demo

- Name: Ananya Desai
- Email: `admin@civicai.city`
- Use this to manage complaints and view analytics.

The demo data is saved in the browser's local storage, so it persists between refreshes in the same browser profile.

## Fallback AI Classification

CivicAI includes a deterministic fallback classifier so the demo continues working without Gemini, YOLO, or other external AI services.

Example keyword routing:

| Example keywords | Category | Department |
|---|---|---|
| pothole, road, crack | Road Damage | Road Maintenance |
| garbage, waste, trash, bin | Garbage/Waste | Waste Management |
| streetlight, lamp, dark | Streetlight | Electrical / Streetlight |
| water, leak, pipe | Water Leakage | Water Supply |
| drain, flood, water pool | Drainage | Drainage |
| sign, traffic | Traffic Sign/Damage | Traffic Management |
| Other issues | Other | General Civic Services |

The classifier also calculates an AI-assisted priority score and maps the score to a severity level.

## Project Structure

```text
civicai/
├── client/
│   ├── src/
│   │   ├── App.tsx              # Main routes and UI components
│   │   ├── index.css            # CivicAI design system and responsive styles
│   │   ├── lib/
│   │   │   └── civic.ts         # Fallback complaint classifier
│   │   ├── components/           # Reusable UI components
│   │   └── pages/                # Scaffold page components
│   └── index.html
├── server/
│   ├── _core/                   # WebDev server infrastructure
│   ├── routers.ts               # Server router entry point
│   ├── db.ts                    # Database helpers
│   ├── auth.logout.test.ts      # Authentication test
│   └── civic.classifier.test.ts # Fallback classifier tests
├── drizzle/                     # Database schema and migrations
├── shared/                      # Shared application types and constants
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── .env.example
└── README.md
```

## Testing

Run the test suite with:

```bash
npm test
```

The tests currently cover:

- Authentication logout behavior
- Pothole classification and road department routing
- Voice-text classification
- Unknown issue fallback behavior

Run type checking with:

```bash
npm run check
```

## Environment Variables

The current demo does not require external API keys to run. If integrations are added later, keep secrets in a local `.env` file and never commit that file to GitHub.

Use `.env.example` as a safe template:

```env
GEMINI_API_KEY=
MONGODB_URI=
JWT_SECRET=
DATABASE_URL=
```

Never commit:

```text
.env
.env.local
.env.production
```

## GitHub Setup

Create a GitHub repository, then run:

```powershell
git init
git add .
git commit -m "Initial CivicAI hackathon project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/civicai.git
git push -u origin main
```

For future changes:

```powershell
git add .
git commit -m "Add live camera complaint capture"
git push
```

Before committing, check the staged files:

```powershell
git status
git diff --cached --name-only
```

Make sure no API keys, passwords, `.env` files, private images, or user data are included.

## Future Improvements

- Connect complaints to MongoDB or another production database
- Add Gemini structured analysis through a secure backend route
- Integrate a trained YOLO model for image-based issue detection
- Store complaint images in object storage
- Add real authentication and role-based access control
- Add real OpenStreetMap/Leaflet maps with geocoding
- Send email or push notifications for status changes
- Add multilingual voice and text reporting
- Add department SLA tracking and audit logs

## License

This project was created as an educational college hackathon project. Add a license appropriate for your team before publishing it as an open-source project.
