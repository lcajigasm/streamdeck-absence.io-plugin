const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'com.cajigas.absence.sdPlugin/images');

console.log('🎨 Generating PNG icons from SVG...\n');

// Icon configurations
const icons = [
    // Plugin icon (for preferences)
    { name: 'pluginIcon', sizes: [256, 512] },
    // Category icon (for action list)
    { name: 'categoryIcon', sizes: [28, 56] },
    // Key icons (for buttons on StreamDeck)
    { name: 'clockin', sizes: [72, 144] },
    { name: 'clockout', sizes: [72, 144] },
    { name: 'pause', sizes: [72, 144] },
    { name: 'resume', sizes: [72, 144] },
    { name: 'status', sizes: [72, 144] }
];

async function generateIcons() {
    for (const icon of icons) {
        const svgPath = path.join(imagesDir, `${icon.name}.svg`);
        
        if (!fs.existsSync(svgPath)) {
            console.log(`⚠️  ${icon.name}.svg not found, skipping...`);
            continue;
        }
        
        console.log(`📐 Processing ${icon.name}...`);
        
        for (const size of icon.sizes) {
            const isRetina = size > 100 || (icon.name === 'categoryIcon' && size === 56) || (icon.name === 'pluginIcon' && size === 512);
            const outputName = isRetina ? `${icon.name}@2x.png` : `${icon.name}.png`;
            const outputPath = path.join(imagesDir, outputName);
            
            try {
                await sharp(svgPath)
                    .resize(size, size)
                    .png()
                    .toFile(outputPath);
                
                console.log(`  ✅ Created ${outputName} (${size}×${size}px)`);
            } catch (error) {
                console.error(`  ❌ Error creating ${outputName}:`, error.message);
            }
        }
    }
    
    console.log('\n✨ Icon generation complete!');
}

generateIcons().catch(error => {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
});
