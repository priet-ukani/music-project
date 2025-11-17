# Google Custom Search API Setup Guide

## 📋 Complete Step-by-Step Instructions

### Part 1: Get Google API Credentials

#### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click **"Select a project"** at the top → **"New Project"**
4. Enter project name: `musical-map-india` (or any name you prefer)
5. Click **"Create"**
6. Wait for the project to be created (you'll see a notification)

#### Step 2: Enable Custom Search API
1. In the Google Cloud Console, make sure your new project is selected
2. Go to **"APIs & Services"** → **"Library"** (from left sidebar)
3. Search for: `Custom Search API`
4. Click on **"Custom Search API"**
5. Click the **"Enable"** button
6. Wait for it to enable (takes a few seconds)

#### Step 3: Create API Key
1. Go to **"APIs & Services"** → **"Credentials"** (from left sidebar)
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"API key"**
4. Your API key will be created and shown in a popup
5. **COPY THIS KEY** and save it somewhere safe
6. ⚠️ **IMPORTANT**: Click **"Restrict Key"** for security:
   - Under "API restrictions", select "Restrict key"
   - Choose **"Custom Search API"** from the dropdown
   - Click **"Save"**
7. Your API Key should look like: `AIzaSyAbc123def456ghi789jkl012mno345pqr`

#### Step 4: Create Custom Search Engine
1. Go to [Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Click **"Add"** or **"Create a custom search engine"**
3. Fill in the form:
   - **Name**: `Musical Instruments and Artists Search`
   - **What to search**: Select **"Search the entire web"**
   - **Image search**: Turn **ON** (this is crucial!)
   - **SafeSearch**: Turn **ON** (recommended)
4. Click **"Create"**
5. On the next screen, click **"Customize"**
6. In the **"Basics"** tab, find and copy your **"Search engine ID"**
7. Your Search Engine ID looks like: `a1b2c3d4e5f6g7h8i`

### Part 2: Set Up Your Environment

#### Step 1: Install Required Python Library
Open your terminal (WSL) and run:
```bash
pip install requests pillow
```

#### Step 2: Create Configuration File
Create a file named `.env` in the `scripts/` directory with your credentials:
```bash
cd "/mnt/d/Sem 7/MW/NEW/music-project/website/scripts"
nano .env
```

Add this content (replace with YOUR actual keys):
```env
GOOGLE_API_KEY=AIzaSyAbc123def456ghi789jkl012mno345pqr
GOOGLE_SEARCH_ENGINE_ID=a1b2c3d4e5f6g7h8i
```

Press `Ctrl+X`, then `Y`, then `Enter` to save.

#### Step 3: Secure Your .env File
```bash
# Add .env to .gitignore so you don't accidentally commit your API keys
cd "/mnt/d/Sem 7/MW/NEW/music-project/website"
echo "scripts/.env" >> .gitignore
```

### Part 3: Run the Download Script

#### Step 1: Make Script Executable
```bash
cd "/mnt/d/Sem 7/MW/NEW/music-project/website/scripts"
chmod +x download-images-google-api.py
```

#### Step 2: Test with a Small Batch First
```bash
# Download only 5 images to test
python3 download-images-google-api.py --limit 5
```

#### Step 3: Download All Images
```bash
# Download all instruments (will use ~74 API calls)
python3 download-images-google-api.py --type instruments

# Download all artists (will use ~58 API calls)
python3 download-images-google-api.py --type artists

# Or download everything in one go
python3 download-images-google-api.py --type all
```

## 📊 API Quota Information

**Free Tier Limits:**
- **100 queries per day** (free)
- After 100 queries, you need to pay (~$5 per 1000 queries)

**Our Requirements:**
- Instruments: 74 images
- Artists: 58 images
- **Total: 132 images**

**Strategy:**
- Day 1: Download 100 images (use free quota)
- Day 2: Download remaining 32 images
- OR: Enable billing and download all at once

## 🛠️ Troubleshooting

### Error: "API key not valid"
- Double-check you copied the API key correctly
- Make sure you enabled the Custom Search API
- Verify the API key restrictions allow Custom Search API

### Error: "Invalid search engine ID"
- Verify you copied the Search Engine ID correctly
- Make sure Image Search is turned ON in your search engine settings

### Error: "Quota exceeded"
- You've used your 100 free queries for today
- Wait until tomorrow, OR
- Enable billing in Google Cloud Console

### Images are not relevant
- The script tries to add keywords like "indian musical instrument"
- You can manually edit the search queries in the Python script
- For better results, add more specific terms in the `search_terms` dictionary

### Connection errors
- Check your internet connection
- The script will retry failed downloads
- Failed downloads are logged in `download_log.txt`

## 💰 Cost Estimation

**If you enable billing:**
- First 100 queries/day: FREE
- Additional queries: $5 per 1000 queries
- For 132 images (one-time download): ~$0.16
- Very affordable for a one-time setup!

## 🔐 Security Best Practices

1. ✅ **Never commit `.env` file to GitHub**
2. ✅ **Restrict your API key** to only Custom Search API
3. ✅ **Set up billing alerts** in Google Cloud Console
4. ✅ **Delete API key** after you're done downloading (you can create a new one if needed)

## 📝 Next Steps After Setup

1. Run the script to download images
2. Review downloaded images in `public/images/`
3. Replace low-quality images manually if needed
4. Delete the API key from Google Cloud Console for security
5. Keep the `.env` file safe for future use (or delete it)

## 🎯 Quick Command Reference

```bash
# Navigate to scripts directory
cd "/mnt/d/Sem 7/MW/NEW/music-project/website/scripts"

# Install dependencies
pip install requests pillow python-dotenv

# Create .env file
nano .env
# Add your API_KEY and SEARCH_ENGINE_ID, then save

# Test with 5 images
python3 download-images-google-api.py --limit 5

# Download specific category
python3 download-images-google-api.py --type instruments
python3 download-images-google-api.py --type artists

# Download everything
python3 download-images-google-api.py --type all

# Check progress
cat download_log.txt
```

## ✅ Verification Checklist

Before running the script, verify:
- [ ] Google Cloud project created
- [ ] Custom Search API enabled
- [ ] API Key created and restricted
- [ ] Search Engine ID obtained
- [ ] Image search turned ON in search engine
- [ ] `.env` file created with credentials
- [ ] `requests` and `pillow` libraries installed
- [ ] `.env` added to `.gitignore`

---

**Ready to start?** Follow the steps above, and you'll have high-quality images downloaded automatically! 🎵🎸
