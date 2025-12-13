# Creative Swipe Mobile App

A mobile-first Next.js PWA where brand managers swipe through AI-generated creatives (Tinder-style) to provide feedback that improves the model.

## Features

- 🔐 **Clerk Authentication** - Secure user authentication
- 📱 **Mobile-First Design** - Optimized for touch and mobile devices
- 🎨 **Tinder-Style Swipe** - Smooth gesture-based interactions with Framer Motion
- 🌓 **Light/Dark Mode** - Automatic theme switching with system preference support
- 📶 **PWA Support** - Installable on iOS and Android with offline capabilities
- ⚡ **Optimized Performance** - Image preloading and optimistic UI updates
- 🎉 **Gamification** - Progress tracking and celebration animations

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **State Management**: Redux Toolkit + RTK Query
- **Animations**: Framer Motion
- **PWA**: next-pwa

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Clerk account with API keys

### Installation

1. **Navigate to the mobile app directory:**
   \`\`\`bash
   cd mobile-app
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**

   Create a \`.env.local\` file in the root of the mobile-app directory:

   \`\`\`env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_secret_here

   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/brands

   # Backend API
   NEXT_PUBLIC_CREATIVE_V1_BACKEND_URL=https://staging-creative-v1.nativeads.ai/v1
   \`\`\`

4. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
mobile-app/
├── pages/                  # Next.js pages
│   ├── _app.tsx           # App wrapper with providers
│   ├── _document.tsx      # PWA meta tags
│   ├── index.tsx          # Landing/login page
│   ├── brands.tsx         # Brand selection screen
│   └── swipe/
│       └── [brandId].tsx  # Main swipe interface
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── swipe/            # Swipe-related components
│   ├── brands/           # Brand components
│   ├── ui/               # Reusable UI components
│   └── animations/       # Animation components
├── core/                  # Core logic
│   ├── services/         # API and auth services
│   ├── hooks/            # Custom React hooks
│   └── models/           # TypeScript types
├── store/                 # Redux store
├── styles/                # Global styles
└── public/                # Static assets
    ├── manifest.json      # PWA manifest
    └── icons/             # App icons
\`\`\`

## User Flow

1. **Login** - User signs in with Clerk
2. **Brand Selection** - Choose a brand from the grid
3. **Swipe Interface** - Swipe right to like, left to dislike
4. **Celebration** - Complete all creatives and get rewarded!

## API Endpoints Used

- \`GET /v1/brands\` - Fetch all brands
- \`GET /v1/brands/{brandId}/campaigns\` - Get brand campaigns
- \`GET /v1/campaigns/{campaignId}/creatives\` - Get campaign creatives
- \`POST /v1/creatives/{creativeId}/like\` - Like a creative
- \`POST /v1/creatives/{creativeId}/dislike\` - Dislike a creative

## Development

### Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

### Testing on Mobile

#### iOS (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will install as a PWA

#### Android (Chrome)
1. Open the app in Chrome
2. Tap the menu (3 dots)
3. Select "Install app" or "Add to Home Screen"

## Key Components

### SwipeCard
The main swipeable card component with:
- Drag gestures (left/right)
- Visual feedback (rotation, opacity)
- Color overlays (green for like, red for dislike)
- Creative information display

### SwipeActions
Fallback buttons for accessibility:
- Dislike button (X icon)
- Like button (heart icon)
- Haptic feedback on tap

### BrandCard
Brand selection cards with:
- Brand logo or initial
- Name and industry
- Description

## Features in Detail

### Image Preloading
Automatically preloads the next 3 creatives for instant transitions.

### Haptic Feedback
Vibration patterns for:
- Light: Quick feedback
- Medium: Swipe action
- Heavy: Completion
- Success: Celebration pattern

### Theme Support
- Light mode: Clean, modern design
- Dark mode: Easy on the eyes
- System preference: Automatically matches device theme

### Offline Support
PWA with service worker for:
- Cached images
- Offline functionality
- Install prompt

## Troubleshooting

### API Not Working
- Verify your \`.env.local\` file has correct Clerk keys
- Check that the backend URL is accessible
- Ensure you're signed in with a valid account

### PWA Not Installing
- Make sure you're using HTTPS (or localhost)
- Check browser console for errors
- Verify manifest.json is accessible

### Images Not Loading
- Check Next.js image domains in \`next.config.js\`
- Verify S3 bucket URLs are correct
- Check network tab for 403/404 errors

## Contributing

1. Make changes in a feature branch
2. Test on both desktop and mobile
3. Ensure TypeScript has no errors
4. Submit a pull request

## License

Proprietary - All rights reserved
