# Image Sources Guide

## Finding Free Images for Musical Map of India

### Recommended Sources

#### 1. Wikimedia Commons
**URL**: https://commons.wikimedia.org/

**Search Terms**:
- "Indian musical instruments"
- "Kamaycha" (Rajasthan)
- "Dhol drum India" (Punjab)
- "Ektara Baul" (Bengal)
- "Bihu Assam" (Assam)
- "Chenda Kerala"
- "Veena instrument"
- "Lavani Maharashtra"
- "Santoor Kashmir"
- "Naga tribal music"
- "Manipuri dance pung"

**Filters**: Select "All free media files" to ensure proper licensing

#### 2. Unsplash
**URL**: https://unsplash.com/
- Free to use for commercial and non-commercial purposes
- Search for "Indian music", "Indian instruments", "Indian dance"

#### 3. Pexels
**URL**: https://www.pexels.com/
- Free stock photos and videos
- Search for regional Indian music and instruments

#### 4. Pixabay
**URL**: https://pixabay.com/
- Free images and videos
- Check for "India music" content

#### 5. Government Archives
- **National Portal of India**: https://www.india.gov.in/
- **Ministry of Culture**: https://indiaculture.gov.in/
- State tourism websites often have cultural images

### Specific Image Recommendations

#### Rajasthan
- **Kamaycha**: Search "Kamaycha Manganiyar" on Wikimedia
- **Sarangi**: Abundant images available
- **Performance**: "Rajasthan folk music" or "Manganiyar performance"

#### Punjab
- **Dhol**: Very common, many free images
- **Tumbi**: Search "Tumbi instrument"
- **Bhangra**: "Bhangra dance festival"

#### Bengal
- **Ektara**: "Baul musician ektara"
- **Khamak**: Rarer, try "Bengali folk instruments"
- **Baul**: "Baul singer Bengal"

#### Kerala
- **Chenda**: "Chenda melam" or "Kerala temple music"
- **Panchavadyam**: "Thrissur Pooram" images often feature this
- **Temple**: "Kerala temple festival"

#### Tamil Nadu
- **Veena**: Very common classical instrument
- **Mridangam**: Abundant Carnatic concert images
- **Concert**: "Carnatic music concert"

### Search Strategy

1. **Start Broad**: Begin with general terms like "Indian drum"
2. **Get Specific**: Narrow to "Mridangam South India"
3. **Check License**: Always verify the license allows use
4. **Download High-Res**: Get at least 800x600px for instruments
5. **Credit Properly**: Note photographer/source for attribution

### License Types to Look For

✅ **Good**:
- Public Domain (CC0)
- CC BY (Creative Commons Attribution)
- CC BY-SA (Creative Commons Attribution-ShareAlike)
- Unsplash License
- Pexels License

⚠️ **Check Carefully**:
- CC BY-NC (Non-Commercial - okay for research, not for commercial use)
- CC BY-ND (No Derivatives - can't edit)

❌ **Avoid**:
- All Rights Reserved
- No Clear License
- Watermarked commercial images

### Quick Download Checklist

For each region, download:
1. [ ] 2-3 instrument photos (different instruments)
2. [ ] 1 performance/cultural context photo
3. [ ] 1 regional map (optional - can create stylized versions)

### Creating Placeholder Images

If you can't find specific images:

1. **Use Canva** (free): https://www.canva.com/
   - Create 800x600px designs
   - Add text with instrument name
   - Use India-themed colors and patterns

2. **Use Figma** (free): https://www.figma.com/
   - Design simple instrument illustrations
   - Export as PNG/JPG

3. **SVG Icons**:
   - Create simple SVG representations
   - Use music note icons with region names

### Attribution Template

When you download images, keep a file `image-credits.txt`:

```
rajasthan-kamaycha.jpg
- Source: Wikimedia Commons
- Photographer: [Name]
- URL: [Full URL]
- License: CC BY-SA 4.0
- Date Accessed: [Date]

punjab-dhol.jpg
- Source: Unsplash
- Photographer: [Name]
- URL: [Full URL]
- License: Unsplash License
- Date Accessed: [Date]
```

### Quick Start Commands

```bash
# Create a credits file
cd public/images
touch image-credits.txt

# Download an image (example)
wget -O rajasthan-kamaycha.jpg "https://commons.wikimedia.org/[IMAGE_URL]"

# Or using curl
curl -L -o punjab-dhol.jpg "https://unsplash.com/[IMAGE_URL]"
```

### Optimization

After downloading, optimize images:

```bash
# Install ImageMagick (if not already installed)
# Ubuntu/Debian: sudo apt-get install imagemagick
# macOS: brew install imagemagick

# Optimize images (reduce file size)
for img in *.jpg; do
    convert "$img" -quality 85 -resize 1200x800\> "optimized_$img"
done
```

### Alternative: Generate AI Images

If you can't find suitable images:
- **DALL-E 3** (via ChatGPT Plus)
- **Midjourney** (subscription required)
- **Stable Diffusion** (free, requires setup)

**Prompt Example**:
"A traditional Kamaycha instrument from Rajasthan, India, detailed photograph, museum quality, wooden construction, professional photography"

### Copyright Compliance

For academic/research use:
- ✅ Educational fair use may apply
- ✅ Always provide attribution
- ✅ Document all sources
- ✅ Use CC-licensed or public domain when possible

For public deployment:
- ⚠️ Ensure all licenses permit web distribution
- ⚠️ Provide attribution page on website
- ⚠️ Consider getting explicit permissions for rare images

---

**Note**: This guide is for educational purposes. Always respect copyright and licensing terms.