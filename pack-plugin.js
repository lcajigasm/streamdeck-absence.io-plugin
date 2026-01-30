const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pluginDir = 'com.cajigas.absence.sdPlugin';
const outputName = 'com.cajigas.absence.streamDeckPlugin';

console.log('📦 Packing Absence.io Plugin...');
console.log('');

// Verify plugin directory exists
if (!fs.existsSync(pluginDir)) {
    console.error('❌ Plugin directory not found:', pluginDir);
    process.exit(1);
}

// Remove old package if exists
if (fs.existsSync(outputName)) {
    console.log('🗑️  Removing old package...');
    fs.unlinkSync(outputName);
}

try {
    // Create zip file (StreamDeck plugins are just renamed zip files)
    console.log('📦 Creating package...');
    
    // IMPORTANT: StreamDeck expects the plugin folder to be INSIDE the ZIP
    // Structure should be: plugin.streamDeckPlugin/PluginName.sdPlugin/files
    // NOT: plugin.streamDeckPlugin/files
    execSync(`zip -r "${outputName}" "${pluginDir}" -x "*.DS_Store" -x "__MACOSX/*" -x "*node_modules/*" -x "*.log"`, {
        stdio: 'inherit'
    });
    
    console.log('');
    console.log('═══════════════════════════════════════════════════');
    console.log('✅ PACKAGE CREATED SUCCESSFULLY');
    console.log('');
    console.log(`📁 Output: ${outputName}`);
    
    // Get file size
    const stats = fs.statSync(outputName);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 Size: ${fileSizeInKB} KB`);
    
    console.log('');
    console.log('📝 Installation:');
    console.log('1. Double-click the .streamDeckPlugin file');
    console.log('2. StreamDeck will install automatically');
    console.log('3. Configure your credentials in the property inspector');
    console.log('');
    console.log('💡 See docs/INSTALLATION.md for detailed instructions');
    console.log('═══════════════════════════════════════════════════');
    
} catch (error) {
    console.error('');
    console.error('❌ PACKAGING FAILED');
    console.error(error.message);
    process.exit(1);
}
