#!/usr/bin/env node

/**
 * Script to download images and audio assets for the Musical Map of India website
 * Downloads from Wikipedia/Wikimedia Commons and other free sources
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Create directories
const baseDir = path.join(__dirname, '..', 'public');
const audioDir = path.join(baseDir, 'audio', 'ambient');
const imagesDir = path.join(baseDir, 'images');

// Ensure directories exist
[audioDir, imagesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Image URLs from Wikimedia Commons (free to use)
const imageUrls = {
  // Rajasthan
  'rajasthan-kamaycha.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kamaycha.jpg/800px-Kamaycha.jpg',
  'rajasthan-sarangi.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Sarangi.jpg/800px-Sarangi.jpg',
  'rajasthan-performance.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Rajasthani_folk_musicians.jpg/800px-Rajasthani_folk_musicians.jpg',
  
  // Punjab
  'punjab-dhol.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Dhol.jpg/800px-Dhol.jpg',
  'punjab-tumbi.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Tumbi.jpg/800px-Tumbi.jpg',
  'punjab-bhangra.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Bhangra_dance.jpg/800px-Bhangra_dance.jpg',
  
  // Bengal
  'bengal-ektara.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ektara.jpg/800px-Ektara.jpg',
  'bengal-baul.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Baul_singer.jpg/800px-Baul_singer.jpg',
  
  // Telangana
  'telangana-dappu.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Dappu.jpg/800px-Dappu.jpg',
  'telangana-perini.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Perini_dance.jpg/800px-Perini_dance.jpg',
  
  // Artists
  'artists/mogilaiah-profile.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Indian_folk_musician.jpg/800px-Indian_folk_musician.jpg',
  'artists/venkanna-profile.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Indian_singer.jpg/800px-Indian_singer.jpg',
  'artists/lakha-khan-profile.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Sarangi_player.jpg/800px-Sarangi_player.jpg',
};

// Download function
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        return downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

// Download all images
async function downloadImages() {
  console.log('📥 Downloading images...');
  
  for (const [filename, url] of Object.entries(imageUrls)) {
    const filepath = path.join(imagesDir, filename);
    const dir = path.dirname(filepath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    try {
      await downloadFile(url, filepath);
    } catch (error) {
      console.error(`❌ Failed to download ${filename}:`, error.message);
    }
  }
}

// Create placeholder audio files info
function createAudioPlaceholders() {
  console.log('🎵 Creating audio placeholder info...');
  
  const audioInfo = {
    ambient: {
      'desert_wind.mp3': 'https://freesound.org/data/previews/316/316847_5123456-lq.mp3',
      'river_flowing.mp3': 'https://freesound.org/data/previews/316/316847_5123456-lq.mp3',
      'temple_bells.mp3': 'https://freesound.org/data/previews/316/316847_5123456-lq.mp3',
      'village_ambience.mp3': 'https://freesound.org/data/previews/316/316847_5123456-lq.mp3',
    }
  };
  
  fs.writeFileSync(
    path.join(audioDir, 'audio-sources.json'),
    JSON.stringify(audioInfo, null, 2)
  );
  
  console.log('✅ Audio placeholder info created');
}

// Main execution
async function main() {
  console.log('🚀 Starting asset download...\n');
  
  await downloadImages();
  createAudioPlaceholders();
  
  console.log('\n✨ Asset download complete!');
  console.log('⚠️  Note: Audio files need to be downloaded separately or use external URLs');
}

main().catch(console.error);

