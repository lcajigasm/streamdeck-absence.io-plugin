# Release Notes - Version 1.0.0

## 🎉 Initial Release

This is the first stable release of the Absence.io StreamDeck Plugin!

## ✨ What's New

### Complete Repository Cleanup
- Removed all test files, temporary scripts, and old documentation
- Renamed main plugin file from `plugin-final-v2.html` to `index.html`
- Updated version to 1.0.0 across all configuration files
- Organized project structure for clarity and maintainability

### Comprehensive Documentation (All in English)
- **README.md** - Overview and quick start guide
- **docs/INSTALLATION.md** - Detailed installation instructions
- **docs/USER_GUIDE.md** - Complete user guide with workflows
- **docs/DEVELOPMENT.md** - Developer documentation
- **docs/API.md** - absence.io API reference
- **docs/CONTRIBUTING.md** - Contributing guidelines
- **docs/CHANGELOG.md** - Version history

### Core Features
- ✅ **Clock In** - Start work time tracking
- ✅ **Clock Out** - End tracking with duration display
- ✅ **Pause** - Temporarily stop tracking
- ✅ **Status** - View current tracking status
- ✅ **Test Connection** - Verify API credentials

### Technical Highlights
- Zero external runtime dependencies
- Native Hawk authentication (HMAC-SHA256)
- Direct WebSocket connection to StreamDeck
- Automatic language detection (English/Spanish)
- Professional build and packaging scripts

## 📦 Installation

Download `com.cajigas.absence.streamDeckPlugin` and double-click to install.

See [docs/INSTALLATION.md](docs/INSTALLATION.md) for detailed instructions.

## 🔧 Configuration

1. Get your API credentials from [absence.io](https://app.absence.io)
   - Profile → Integrations → Generate API Key
2. Add any Absence.io action to StreamDeck
3. Enter your User ID and API Key
4. Test credentials and save

## 📝 Files Changed

### Removed
- All test files (`test-*.js`, `diagnostic-test.js`, etc.)
- Old plugin versions (`plugin.js`, `plugin-*.html`)
- Temporary documentation (`PRUEBA_*.md`, `RESUMEN_*.md`, etc.)
- Utility scripts (`restart-streamdeck.sh`, `update-plugin.sh`, etc.)
- Old `docs/` directory (replaced with new structure)

### Added
- `pack-plugin.js` - Alternative packaging script
- Comprehensive English documentation in `docs/`
- `RELEASE_NOTES.md` (this file)

### Updated
- `manifest.json` - Version 1.0.0.0, CodePath to index.html
- `package.json` - Version 1.0.0, updated scripts and description
- `build.js` - Translated to English, improved validation
- `.gitignore` - Updated to exclude build artifacts
- `README.md` - Complete rewrite with better structure

### Renamed
- `plugin-final-v2.html` → `index.html`

## 🎯 File Structure

```
absence_plugin/
├── com.cajigas.absence.sdPlugin/     # Plugin directory
│   ├── index.html                    # Main plugin code
│   ├── propertyInspector.html        # Configuration UI
│   ├── manifest.json                 # Plugin metadata
│   ├── i18n.js                       # Internationalization
│   ├── en.json / es.json             # Translations
│   ├── package.json                  # Plugin package info
│   └── images/                       # Icons (PNG & SVG)
│
├── docs/                             # Documentation
│   ├── INSTALLATION.md
│   ├── USER_GUIDE.md
│   ├── DEVELOPMENT.md
│   ├── API.md
│   ├── CONTRIBUTING.md
│   └── CHANGELOG.md
│
├── build.js                          # Build script
├── pack-plugin.js                    # Packaging script
├── convert-icons.js                  # Icon conversion
├── package.json                      # Project configuration
├── .gitignore                        # Git ignore rules
├── LICENSE                           # MIT License
├── README.md                         # Project overview
└── RELEASE_NOTES.md                  # This file
```

## 🚀 Usage

1. **Clock In** - Press when starting work
2. **Clock Out** - Press when finishing (shows duration)
3. **Status** - Check current time and if clocked in
4. **Pause** - Take a break (clocks out, use Clock In to resume)
5. **Test Connection** - Verify credentials are working

For detailed usage instructions, see [docs/USER_GUIDE.md](docs/USER_GUIDE.md).

## 🔄 Upgrading from Development Versions

If you were using a development version:

1. Remove all Absence.io actions from StreamDeck
2. Delete the old plugin folder
3. Restart StreamDeck
4. Install version 1.0.0
5. Reconfigure your credentials

## 🐛 Known Issues

None currently. Please report issues on GitHub.

## 📞 Support

- **Documentation**: See [docs/](docs/) folder
- **Issues**: [GitHub Issues](https://github.com/yourusername/absence-streamdeck-plugin/issues)
- **Email**: contact@cajigas.es

## 🙏 Thank You

Thank you for using the Absence.io StreamDeck Plugin!

If you find it useful, please:
- ⭐ Star the repository on GitHub
- 📝 Share feedback and suggestions
- 🐛 Report bugs
- 🤝 Contribute improvements

---

**Version**: 1.0.0  
**Release Date**: January 30, 2026  
**Author**: cajigas.es  
**License**: MIT
