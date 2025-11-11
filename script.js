// DOM Elements
const uploadForm = document.getElementById('uploadForm');
const emailInput = document.getElementById('email');
const videoInput = document.getElementById('video');
const fileNameSpan = document.getElementById('fileName');
const fileInfoP = document.getElementById('fileInfo');
const submitBtn = document.getElementById('submitBtn');
const progressContainer = document.getElementById('progressContainer');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const messageDiv = document.getElementById('message');

// Constants
const MIN_DURATION = 3600; // 1 hour in seconds
const MAX_DURATION = 7200; // 2 hours in seconds
const MAX_FILE_SIZE = 10 * 1024 * 1024 * 1024; // 10GB max file size

// File input change handler
videoInput.addEventListener('change', async function(e) {
    const file = e.target.files[0];
    
    if (!file) {
        fileNameSpan.textContent = 'Choose video file...';
        fileInfoP.textContent = '';
        return;
    }

    fileNameSpan.textContent = file.name;
    fileInfoP.textContent = 'Validating video...';
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        showMessage('File size too large. Maximum size is 10GB.', 'error');
        videoInput.value = '';
        fileNameSpan.textContent = 'Choose video file...';
        fileInfoP.textContent = '';
        return;
    }

    // Get video duration
    try {
        const duration = await getVideoDuration(file);
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        
        const durationText = `${hours}h ${minutes}m ${seconds}s`;
        const sizeText = formatFileSize(file.size);
        
        fileInfoP.textContent = `Duration: ${durationText} | Size: ${sizeText}`;
        
        // Validate duration
        if (duration < MIN_DURATION) {
            showMessage('Video must be at least 1 hour long.', 'error');
            videoInput.value = '';
            fileNameSpan.textContent = 'Choose video file...';
            fileInfoP.textContent = '';
            return;
        }
        
        if (duration > MAX_DURATION) {
            showMessage('Video must not exceed 2 hours in length.', 'error');
            videoInput.value = '';
            fileNameSpan.textContent = 'Choose video file...';
            fileInfoP.textContent = '';
            return;
        }
        
        hideMessage();
    } catch (error) {
        console.error('Error reading video:', error);
        fileInfoP.textContent = `Size: ${formatFileSize(file.size)} (Duration check failed)`;
        showMessage('Could not validate video duration. Please ensure you are uploading a valid video file.', 'error');
    }
});

// Form submit handler
uploadForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const file = videoInput.files[0];
    
    if (!email || !file) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    // Validate email
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Disable form during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';
    hideMessage();
    
    // Show progress
    progressContainer.style.display = 'block';
    
    try {
        // Simulate upload progress
        await simulateUpload(file, email);
        
        // Show success message
        showMessage('Your VOD has been submitted successfully! We\'ll send the refurbished content to your email soon.', 'success');
        
        // Reset form
        uploadForm.reset();
        fileNameSpan.textContent = 'Choose video file...';
        fileInfoP.textContent = '';
        
    } catch (error) {
        console.error('Upload error:', error);
        showMessage('An error occurred during submission. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit VOD';
        progressContainer.style.display = 'none';
        progressFill.style.width = '0%';
    }
});

// Helper Functions

/**
 * Get the duration of a video file
 */
function getVideoDuration(file) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'metadata';
        
        video.onloadedmetadata = function() {
            window.URL.revokeObjectURL(video.src);
            resolve(video.duration);
        };
        
        video.onerror = function() {
            reject(new Error('Failed to load video metadata'));
        };
        
        video.src = URL.createObjectURL(file);
    });
}

/**
 * Format file size in human-readable format
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show message to user
 */
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
}

/**
 * Hide message
 */
function hideMessage() {
    messageDiv.className = 'message';
    messageDiv.style.display = 'none';
}

/**
 * Simulate upload progress
 * In a real implementation, this would connect to a backend server
 */
function simulateUpload(file, email) {
    return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                progressFill.style.width = '100%';
                progressText.textContent = 'Upload complete!';
                
                // Store submission data in localStorage for demonstration
                saveSubmission(file.name, email, file.size);
                
                setTimeout(resolve, 500);
            } else {
                progressFill.style.width = progress + '%';
                progressText.textContent = `Uploading... ${Math.round(progress)}%`;
            }
        }, 200);
    });
}

/**
 * Save submission data to localStorage
 * In a real implementation, this would be sent to a backend server
 */
function saveSubmission(fileName, email, fileSize) {
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    
    submissions.push({
        fileName,
        email,
        fileSize,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem('submissions', JSON.stringify(submissions));
    console.log('Submission saved:', { fileName, email, fileSize });
}
