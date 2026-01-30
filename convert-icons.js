const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'com.cajigas.absence.sdPlugin', 'images');

const svgFiles = [
    'pluginIcon.svg',
    'categoryIcon.svg',
    'clockin.svg',
    'clockout.svg',
    'pause.svg',
    'resume.svg',
    'status.svg'
];

console.log('🎨 Convirtiendo iconos SVG a PNG...\n');

async function convertSvgToPng(svgFile) {
    const svgPath = path.join(imagesDir, svgFile);
    const pngFile = svgFile.replace('.svg', '.png');
    const pngPath = path.join(imagesDir, pngFile);
    const png2xPath = path.join(imagesDir, pngFile.replace('.png', '@2x.png'));
    
    try {
        // Convertir a PNG normal (144x144)
        await sharp(svgPath)
            .resize(144, 144)
            .png()
            .toFile(pngPath);
        
        console.log(`✅ ${svgFile} → ${pngFile}`);
        
        // Convertir a PNG @2x (288x288 para Retina)
        await sharp(svgPath)
            .resize(288, 288)
            .png()
            .toFile(png2xPath);
        
        console.log(`✅ ${svgFile} → ${pngFile.replace('.png', '@2x.png')}`);
        
    } catch (error) {
        console.error(`❌ Error convirtiendo ${svgFile}:`, error.message);
    }
}

async function convertAll() {
    for (const svgFile of svgFiles) {
        await convertSvgToPng(svgFile);
    }
    console.log('\n✨ Conversión completada');
}

convertAll();
