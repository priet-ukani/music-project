# 🚀 Quick Start Guide - Google Image Downloader

## What You Need to Do (5 Main Steps)

### ✅ Step 1: Get Google Cloud API Key (5 minutes)
1. Go to: https://console.cloud.google.com/
2. Create new project: "musical-map-india"
3. Enable "Custom Search API"
4. Create API Key (copy it!)
5. Restrict key to "Custom Search API" only

### ✅ Step 2: Create Search Engine (3 minutes)
1. Go to: https://programmablesearchengine.google.com/
2. Create new search engine
3. Set to "Search entire web"
4. Turn ON "Image search"
5. Copy the "Search engine ID"

### ✅ Step 3: Install Python Libraries (1 minute)
```bash
pip install requests pillow python-dotenv
```

### ✅ Step 4: Create .env File (2 minutes)
```bash
cd "/mnt/d/Sem 7/MW/NEW/music-project/website/scripts"
cp .env.example .env
nano .env
```

Add your credentials:
```
GOOGLE_API_KEY=AIzaSy... (paste your key)
GOOGLE_SEARCH_ENGINE_ID=a1b2c3... (paste your ID)
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### ✅ Step 5: Run the Script (10 minutes)
```bash
cd "/mnt/d/Sem 7/MW/NEW/music-project/website/scripts"

# Test with 5 images first
python3 download-images-google-api.py --limit 5

# If test works, download everything
python3 download-images-google-api.py --type all
```

---

## 📊 Important Numbers

- **Free quota**: 100 images per day
- **You need**: 132 images total (74 instruments + 58 artists)
- **Strategy**: 
  - Day 1: Download 100 images (free)
  - Day 2: Download remaining 32 images (free)
  - OR: Enable billing (~$0.16 total to download all at once)

---

## 🆘 If Something Goes Wrong

### "API key not valid"
```bash
# Check your .env file
cat .env
# Make sure API key is correct and API is enabled
```

### "Quota exceeded"
You've used 100 free queries today. Options:
1. Wait until tomorrow
2. Enable billing (costs pennies)

### "Module not found"
```bash
pip install requests pillow python-dotenv
```

---

## 🎯 Commands You'll Use

```bash
# Check quota estimate without downloading
python3 download-images-google-api.py --estimate

# Test with 3 images
python3 download-images-google-api.py --limit 3

# Download only instruments
python3 download-images-google-api.py --type instruments

# Download only artists
python3 download-images-google-api.py --type artists

# Download everything
python3 download-images-google-api.py --type all

# Check progress
tail -f download_log.txt
```

---

## 📍 Where Are Your Files?

```
website/scripts/
├── GOOGLE_API_SETUP_GUIDE.md          ← Detailed guide
├── QUICK_START.md                     ← This file
├── .env.example                       ← Template (copy to .env)
├── .env                               ← YOUR CREDENTIALS (don't commit!)
├── download-images-google-api.py      ← The script
└── download_log.txt                   ← Download progress log

website/public/images/
├── instruments/                       ← 74 instrument images
├── artists/                          ← 58 artist images
└── IMAGE_INVENTORY.md                ← Complete image list
```

---

## ✅ Final Checklist

Before running the script:

- [ ] Created Google Cloud project
- [ ] Enabled Custom Search API
- [ ] Got API Key
- [ ] Got Search Engine ID
- [ ] Turned ON Image Search
- [ ] Installed Python libraries
- [ ] Created .env file with credentials
- [ ] .env is in .gitignore (security)
- [ ] Tested with --limit 5

**Ready?** Run: `python3 download-images-google-api.py --type all`

---

## 💡 Pro Tips

1. **Start small**: Use `--limit 5` to test everything works
2. **Check quality**: Review first few downloaded images
3. **Monitor quota**: Run with `--estimate` first
4. **Be patient**: Script pauses 1 second between downloads
5. **Keep .env safe**: Never commit it to GitHub!
6. **Delete key later**: After downloading, delete API key from Google Cloud Console

---

## 🎉 After Success

1. Check `public/images/instruments/` - should have real photos now
2. Check `public/images/artists/` - should have real photos now
3. Reload your website - images should display!
4. Review and manually replace any low-quality images
5. Delete API key from Google Cloud Console (for security)

---

**Need help?** See `GOOGLE_API_SETUP_GUIDE.md` for detailed instructions with screenshots references.
