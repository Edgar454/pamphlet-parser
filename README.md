# Form Parser: Automating Member Registration

In our church, we love getting to know new people. To keep in touch, we ask them to fill out a form with some basic information.

Traditionally, we would transcribe this information into an Excel sheet — a slow and error-prone process. Worse, if the device storing the data fails, we risk losing valuable and sensitive information.

That's why we built **Form Parser**: a mobile app that fully automates the process — from form submission to secure database storage.

---

## 🏗️ Architecture

Form Parser is composed of three main components:

- **Frontend**: Built using [Expo](https://expo.dev/), it provides a smooth user experience on mobile.
- **Parsing Logic**: Powered by the **Gemini API** and its **VLLM (Vision-Language Large Model)** capabilities, the app extracts structured data from images of filled forms.
- **Database**: Uses **Supabase** to store and manage member data securely.

---

## 📱 Features

The app has four main tabs:

- **Home**: Upload a form, view the parsed result, make adjustments if needed, and save to the database.
- **Recent Entries**: View and edit the most recently added members.
- **Analytics**: Visual dashboards showing total registrations, trends over time, and distribution by location, nationality, etc.
- **About**: Information about the app and its purpose.

---

## 🚀 How to Use

1. Download the APK located in the `executable` folder.
2. Install it on your Android device.
3. Launch the app and start scanning and saving forms instantly!

---

## 🗂️ Project Structure

```
.
├── .env                   # Environment variables (see below)
├── app.json               # Expo app configuration
├── package.json           # Project metadata and dependencies
├── README.md
├── app/                   # App routing and navigation
│   ├── _layout.tsx
│   ├── [id].tsx
│   ├── not-found.tsx
│   └── (tabs)/
│       ├── index.tsx     # Home screen (form parsing)
│       ├── recent.tsx    # Recently registered members
│       ├── analytics.tsx # Charts and statistics
│       └── about.tsx     # App info
├── components/            # UI components split by feature
│   ├── main/              # Form parsing workflow (upload, wait, result)
│   ├── analytics/         # All analytical chart components
│   ├── recent/            # Component for recent registrations
│   └── ui/                # Reusable UI elements (header, animations, etc.)
├── constants/             # Static values like colors
├── context/               # Global state/context
├── utils/                 # Helper modules (API calls, DB, geolocation)
├── executable/            # Contains the compiled APK
├── hooks/                 # Custom React hooks
├── assets/                # Fonts and images
└── node_modules/          # Installed dependencies
```

---

## 🔐 Environment Variables

Create a `.env` file in the root folder with the following keys:

```env
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
EXPO_PUBLIC_RAPID_API_KEY=your_rapidapi_key
```

> ⚠️ These keys are public and bundled with the frontend. Do not use private secrets.

You can access them in code using `process.env.EXPO_PUBLIC_GEMINI_API_KEY`, etc.

---

## 🛠 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Expo app**:
   ```bash
   npm start
   ```
   or
   ```bash
   npx expo start
   ```

3. **Use Expo Go** on your phone or an emulator to test the app.

---

## 👨‍💻 Modifying the Code

- **Form parsing logic**: `components/main/`
- **Routing/navigation**: `app/_layout.tsx`, `app/(tabs)/`
- **Charts & visualizations**: `components/analytics/`
- **Database & geolocation**: `utils/db.js`, `utils/geo.js`

---

## 🎥 Demo

> _(You can add a link to a short demo video or animated GIF showing the app in action.)_