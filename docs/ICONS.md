# Icon Design Guide

This document describes the icon design and generation process for the Absence.io StreamDeck Plugin.

## Icon Specifications

Following [Elgato's official guidelines](https://docs.elgato.com/guidelines/streamdeck/plugins/images-and-layouts):

### Plugin Icon (Preferences)
- **Size**: 256×256px (with 512×512px @2x for Retina)
- **Format**: PNG
- **Design**: Colorful, represents the plugin functionality
- **Location**: `images/pluginIcon.png` and `images/pluginIcon@2x.png`

### Category Icon (Action List)
- **Size**: 28×28px (with 56×56px @2x for Retina)
- **Format**: SVG recommended, PNG supported
- **Design**: Monochromatic, white stroke (#FFFFFF), transparent background
- **Location**: `images/categoryIcon.svg`, `.png`, `@2x.png`

### Action Icons (Action List)
- **Size**: 20×20px (with 40×40px @2x for Retina)
- **Format**: SVG recommended
- **Design**: Monochromatic, white stroke (#FFFFFF), transparent background
- **Note**: Currently using the same icons as key icons

### Key Icons (StreamDeck Buttons)
- **Size**: 72×72px (with 144×144px @2x for Retina)
- **Format**: SVG, PNG, or GIF
- **Design**: Colorful, with gradients and clear symbols
- **Location**: `images/[action-name].svg`, `.png`, `@2x.png`

## Current Icon Design

### Color Scheme

Each action has a thematic color that represents its function:

| Action | Color | Hex | Purpose |
|--------|-------|-----|---------|
| **Clock In** | Green | `#10B981` → `#059669` | Start/Enter (positive action) |
| **Clock Out** | Red | `#EF4444` → `#DC2626` | Stop/Exit (ending action) |
| **Pause** | Orange | `#F59E0B` → `#D97706` | Warning/Temporary stop |
| **Resume** | Green | `#10B981` → `#059669` | Continue (positive action) |
| **Status** | Blue | `#3B82F6` → `#2563EB` | Information/Neutral |
| **Plugin** | Blue-Purple | `#4F46E5` → `#7C3AED` | Brand identity |

### Design Elements

**Common elements across all icons:**
- Circular clock face (40px radius for key icons)
- Clean, modern gradients
- High contrast for visibility
- Consistent stroke widths
- Rounded corners (20px radius for backgrounds)

**Specific symbols:**
- **Clock In**: Arrow pointing inward (entering)
- **Clock Out**: Arrow pointing outward (leaving)
- **Pause**: Two vertical bars
- **Resume**: Play triangle
- **Status**: Information symbol (i)
- **Plugin**: Clock with play overlay

## Icon Generation

### Automatic Generation

The project includes an automatic icon generator that creates PNG files from SVG sources:

```bash
npm run icons
```

This script:
1. Reads all SVG files from `images/` folder
2. Generates PNG versions in required sizes
3. Creates both standard and @2x (Retina) versions
4. Optimizes file sizes

### Manual Generation

If you need to regenerate specific icons:

```bash
node generate-icons.js
```

Or using sharp directly:

```bash
node -e "
const sharp = require('sharp');
sharp('com.cajigas.absence.sdPlugin/images/[name].svg')
  .resize(72, 72)
  .png()
  .toFile('com.cajigas.absence.sdPlugin/images/[name].png');
"
```

## Editing Icons

### Prerequisites

- Vector graphics editor (Figma, Sketch, Inkscape, Adobe Illustrator)
- Node.js and npm installed
- Sharp library (`npm install` already includes it)

### Workflow

1. **Edit SVG**: Modify the SVG file in `com.cajigas.absence.sdPlugin/images/`
2. **Regenerate PNGs**: Run `npm run icons`
3. **Rebuild plugin**: Run `npm run release`
4. **Test**: Install and verify in StreamDeck

### SVG Guidelines

**For Key Icons (buttons):**
- Viewbox: `0 0 144 144` (for 144px icons)
- Use gradients and colors freely
- Ensure good contrast on dark backgrounds
- Test at 72px to ensure clarity

**For Action/Category Icons:**
- Keep designs simple and monochromatic
- Use white (#FFFFFF) for all strokes
- Transparent background
- Avoid fine details (icons are small)

### Design Tips

1. **Test at actual size**: Key icons appear at 72×72px on most devices
2. **High contrast**: Ensure symbols are visible against dark StreamDeck background
3. **Simple shapes**: Avoid complex details that become unclear when scaled
4. **Consistent style**: Maintain visual consistency across all actions
5. **Semantic colors**: Use colors that represent the action's meaning

## File Structure

```
com.cajigas.absence.sdPlugin/images/
├── pluginIcon.svg          # Source vector (256×256)
├── pluginIcon.png          # 256×256px
├── pluginIcon@2x.png       # 512×512px
├── categoryIcon.svg        # Source vector (28×28)
├── categoryIcon.png        # 28×28px
├── categoryIcon@2x.png     # 56×56px
├── clockin.svg             # Source vector (144×144)
├── clockin.png             # 72×72px
├── clockin@2x.png          # 144×144px
├── clockout.svg
├── clockout.png
├── clockout@2x.png
├── pause.svg
├── pause.png
├── pause@2x.png
├── resume.svg
├── resume.png
├── resume@2x.png
├── status.svg
├── status.png
└── status@2x.png
```

## Optimization

All PNG files are automatically optimized by Sharp during generation:
- Compression level optimized for size/quality balance
- Metadata stripped for smaller files
- Progressive encoding disabled for StreamDeck compatibility

## Version History

### v1.0.0 (2026-01-30)
- Initial professional icon set
- Modern gradients and color scheme
- Full SVG + PNG coverage
- Automatic generation script

## Resources

- [Elgato StreamDeck Plugin Guidelines](https://docs.elgato.com/guidelines/streamdeck/plugins/images-and-layouts)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)
- [SVG Specification](https://www.w3.org/TR/SVG2/)

---

[← Back to Development Guide](DEVELOPMENT.md)
