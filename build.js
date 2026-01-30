const fs = require('fs');
const path = require('path');

const pluginDir = path.join(__dirname, 'com.cajigas.absence.sdPlugin');
const imagesDir = path.join(pluginDir, 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

console.log('🔨 Building Absence.io Plugin...');
console.log('');

// Check required files
const requiredFiles = [
    'index.html',
    'propertyInspector.html',
    'manifest.json',
    'i18n.js',
    'en.json',
    'es.json',
    'package.json'
];

let allFilesExist = true;

console.log('📋 Checking required files:');
requiredFiles.forEach(file => {
    const filePath = path.join(pluginDir, file);
    if (fs.existsSync(filePath)) {
        console.log(`  ✅ ${file}`);
    } else {
        console.error(`  ❌ ${file} - NOT FOUND`);
        allFilesExist = false;
    }
});

console.log('');

// Check/create icons
const icons = [
    { name: 'pluginIcon', color: '#4CAF50', icon: null },
    { name: 'categoryIcon', color: '#2196F3', icon: null },
    { name: 'clockin', color: '#4CAF50', icon: '▶' },
    { name: 'clockout', color: '#F44336', icon: '■' },
    { name: 'pause', color: '#FF9800', icon: '❚❚' },
    { name: 'resume', color: '#4CAF50', icon: '▶' },
    { name: 'status', color: '#2196F3', icon: 'ℹ' }
];

console.log('🎨 Checking icons:');
let iconsCreated = 0;

icons.forEach(({ name, color, icon }) => {
    const svgPath = path.join(imagesDir, `${name}.svg`);
    
    if (!fs.existsSync(svgPath)) {
        const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="144" height="144" viewBox="0 0 144 144" xmlns="http://www.w3.org/2000/svg">
    <rect width="144" height="144" fill="${color}" rx="20"/>
    ${icon ? `<text x="72" y="95" font-family="Arial" font-size="72" fill="white" text-anchor="middle">${icon}</text>` : ''}
</svg>`;
        
        fs.writeFileSync(svgPath, svgContent);
        console.log(`  ✅ Created ${name}.svg`);
        iconsCreated++;
    } else {
        console.log(`  ✓ ${name}.svg exists`);
    }
});

if (iconsCreated > 0) {
    console.log(`  📝 ${iconsCreated} placeholder icon(s) created`);
}

console.log('');

// Validate manifest
console.log('🔍 Validating manifest.json:');
try {
    const manifestPath = path.join(pluginDir, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    console.log(`  ✓ Name: ${manifest.Name}`);
    console.log(`  ✓ Version: ${manifest.Version}`);
    console.log(`  ✓ UUID: ${manifest.UUID}`);
    console.log(`  ✓ CodePath: ${manifest.CodePath}`);
    console.log(`  ✓ Actions: ${manifest.Actions.length}`);
    
    // Verify CodePath exists
    const codePath = path.join(pluginDir, manifest.CodePath);
    if (fs.existsSync(codePath)) {
        console.log(`  ✓ CodePath file exists: ${manifest.CodePath}`);
    } else {
        console.error(`  ❌ CodePath file NOT FOUND: ${manifest.CodePath}`);
        allFilesExist = false;
    }
} catch (error) {
    console.error(`  ❌ Error reading manifest: ${error.message}`);
    allFilesExist = false;
}

console.log('');

// Create .gitignore if it doesn't exist
const gitignorePath = path.join(__dirname, '.gitignore');
if (!fs.existsSync(gitignorePath)) {
    const gitignoreContent = `node_modules/
*.log
.DS_Store
*.streamDeckPlugin
.env
`;
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log('✅ Created .gitignore');
}

// Summary
console.log('═══════════════════════════════════════════════════');
if (allFilesExist) {
    console.log('✨ BUILD SUCCESSFUL');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Create symbolic link to StreamDeck plugins folder');
    console.log('   macOS:');
    console.log('   ln -s "$(pwd)/com.cajigas.absence.sdPlugin" "$HOME/Library/Application Support/com.elgato.StreamDeck/Plugins/"');
    console.log('');
    console.log('   Windows:');
    console.log('   mklink /D "%APPDATA%\\Elgato\\StreamDeck\\Plugins\\com.cajigas.absence.sdPlugin" "%cd%\\com.cajigas.absence.sdPlugin"');
    console.log('');
    console.log('2. Restart StreamDeck application');
    console.log('3. Look for "Absence.io" in StreamDeck actions');
    console.log('');
    console.log('💡 See docs/INSTALLATION.md for detailed instructions');
} else {
    console.log('❌ BUILD FAILED - Missing required files');
    console.log('');
    console.log('Please ensure all required files are present before building.');
    process.exit(1);
}
console.log('═══════════════════════════════════════════════════');
