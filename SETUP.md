# 🚀 Quick Setup Guide

Follow these steps to get the Creative Swipe mobile app running:

## Step 1: Set Up Clerk API Keys

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application (or create a new one)
3. Navigate to **API Keys** section
4. Copy your keys:
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)

## Step 2: Create Environment File

In the `mobile-app` directory, create a file named `.env.local`:

\`\`\`bash
cd mobile-app
touch .env.local
\`\`\`

Add the following content (replace with your actual keys):

\`\`\`env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/brands

# Backend API
NEXT_PUBLIC_CREATIVE_V1_BACKEND_URL=https://staging-creative-v1.nativeads.ai/v1
\`\`\`

## Step 3: Install Dependencies

\`\`\`bash
npm install
\`\`\`

## Step 4: Run the App

\`\`\`bash
npm run dev
\`\`\`

The app will be available at [http://localhost:3000](http://localhost:3000)

## Step 5: Test the App

1. **Sign In**: Use your Clerk credentials to sign in
2. **Select Brand**: Choose a brand from the grid
3. **Swipe**: Try swiping right (like) and left (dislike)
4. **Test Buttons**: Try the fallback buttons at the bottom
5. **Theme Toggle**: Click the theme icon in the header to switch modes

## Testing on Mobile Device

### Option 1: Local Network
1. Find your computer's local IP address:
   - Mac: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - Windows: `ipconfig | findstr IPv4`
2. Update `next.config.js` to allow external access
3. On your phone, navigate to `http://<your-ip>:3000`

### Option 2: Deploy to Vercel
1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy and visit on mobile device

## Troubleshooting

### "Token provider not initialized"
- Make sure you've signed in through Clerk
- Check browser console for auth errors

### "Failed to load brands"
- Verify backend URL is correct
- Check that you're authenticated
- Inspect Network tab for API errors

### Images not loading
- Verify S3 domains in `next.config.js`
- Check image URLs in browser Network tab

### PWA not installing
- Use HTTPS or localhost
- Check manifest.json is accessible
- Look for errors in browser console

## Next Steps

1. ✅ Configure your Clerk API keys
2. ✅ Run the app locally
3. ✅ Test swipe functionality
4. ✅ Test on mobile device
5. ✅ Deploy to production (Vercel recommended)

## Production Deployment

When deploying to production:

1. Update environment variables to use production keys
2. Update backend URL if different
3. Test PWA installation on real devices
4. Monitor performance and errors

---

Need help? Check the main [README.md](./README.md) for detailed documentation.
