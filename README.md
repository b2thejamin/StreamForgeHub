# StreamForgeHub

Site for streamforge where clients can submit their vods

## Overview

Stream Forge is a minimalistic web application where users can submit 1-2 hour stream VODs (Video on Demand) along with their email address. The site owner can access these submissions to create refurbished content for social media.

## Features

- **Video Upload**: Users can upload video files with duration validation (1-2 hours)
- **Email Submission**: Simple email input for contact information
- **Duration Validation**: Automatic video duration checking to ensure VODs are within the 1-2 hour range
- **File Size Validation**: Maximum 10GB file size limit
- **Progress Tracking**: Visual progress bar during upload simulation
- **Minimalistic UI**: Clean, modern design with gradient background
- **Responsive Design**: Works on desktop and mobile devices
- **User Feedback**: Clear success/error messages

## Files

- `index.html` - Main HTML structure
- `styles.css` - Minimalistic CSS styling with gradient theme
- `script.js` - JavaScript for form handling, validation, and upload simulation

## Usage

1. Open `index.html` in a web browser
2. Enter your email address
3. Select a video file (1-2 hours duration)
4. Click "Submit VOD"
5. Wait for the upload to complete

## Implementation Notes

**Current Implementation:**
- The current version uses localStorage to store submission data for demonstration purposes
- The upload progress is simulated using JavaScript
- Video duration is validated using the HTML5 video API

**For Production Use:**
You would need to implement:
- Backend server (Node.js, Python, PHP, etc.) to handle actual file uploads
- Database to store submission information
- Cloud storage (AWS S3, Google Cloud Storage, etc.) for video files
- Email notification system
- Authentication for the site owner to access submissions
- Admin dashboard to view and manage submissions

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- LocalStorage API (for demo purposes)

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 File API
- HTML5 Video API
- ES6 JavaScript
- CSS3 Animations
