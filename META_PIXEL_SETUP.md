# Meta Pixel Setup Guide

## Overview
This guide will help you set up Meta Pixel tracking for your Color My Moments landing page.

## Step 1: Create a Meta Pixel

1. Go to [Meta Business Manager](https://business.facebook.com/)
2. Navigate to **Events Manager** > **Data Sources** > **Pixels**
3. Click **Create a Pixel**
4. Name your pixel (e.g., "Color My Moments Landing Page")
5. Copy your Pixel ID (it will look like: `123456789012345`)

## Step 2: Configure Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Meta Pixel Configuration
VITE_META_PIXEL_ID=your_actual_pixel_id_here

# Analytics Configuration
VITE_ENABLE_META_PIXEL=true
VITE_ENABLE_VERCEL_ANALYTICS=true
```

Replace `your_actual_pixel_id_here` with your actual Meta Pixel ID.

## Step 3: Update HTML (Already Done)

The Meta Pixel base code has already been added to your `index.html` file. You just need to replace `YOUR_PIXEL_ID_HERE` with your actual Pixel ID.

## Step 4: Test Your Setup

1. Start your development server: `npm run dev`
2. Open your browser's developer tools
3. Go to the Network tab
4. Look for requests to `facebook.com` or `fbevents.js`
5. You should see Meta Pixel events being sent

## Step 5: Verify in Meta Business Manager

1. Go back to Meta Business Manager
2. Navigate to **Events Manager** > **Test Events**
3. Enter your website URL
4. Click **Test Event**
5. You should see events appearing in real-time

## Events Being Tracked

The following events are automatically tracked:

### Page Views
- **Event**: `PageView`
- **Triggered**: When the page loads

### Form Interactions
- **Event**: `FormSubmissionAttempt`
- **Triggered**: When user attempts to submit the waitlist form

### Sign-ups
- **Event**: `CompleteRegistration` (Meta Pixel standard)
- **Event**: `Lead` (Meta Pixel standard)
- **Event**: `WaitlistSignupSuccess` (Custom)
- **Triggered**: When user successfully joins the waitlist

### Errors
- **Event**: `FormSubmissionError`
- **Triggered**: When form submission fails

## Custom Events

You can add more custom events by importing the tracking functions:

```typescript
import { trackCustomEvent, trackViewContent } from '../lib/analytics';

// Track a custom event
trackCustomEvent('ButtonClick', {
  button_name: 'Learn More',
  section: 'Hero'
});

// Track content views
trackViewContent('Examples Section', 'Product Showcase');
```

## Troubleshooting

### Pixel Not Loading
- Check that your Pixel ID is correct
- Ensure the `.env` file is in the project root
- Restart your development server after adding environment variables

### Events Not Appearing
- Check browser console for JavaScript errors
- Verify that `VITE_ENABLE_META_PIXEL=true` is set
- Use Meta's Pixel Helper browser extension to debug

### Development vs Production
- In development, events are sent to Meta's test environment
- In production, events are sent to your live pixel
- You can disable Meta Pixel in development by setting `VITE_ENABLE_META_PIXEL=false`

## Privacy Considerations

- The Meta Pixel respects user privacy settings
- Users can opt out of tracking through browser settings
- Consider adding a privacy policy explaining your use of tracking
- Ensure compliance with GDPR, CCPA, and other privacy regulations

## Additional Resources

- [Meta Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel/)
- [Meta Pixel Helper](https://developers.facebook.com/docs/facebook-pixel/implementation/debugging)
- [Meta Business Manager](https://business.facebook.com/) 