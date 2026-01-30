# Changelog

All notable changes to the Absence.io StreamDeck Plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Nothing yet.

## [1.0.0] - 2026-01-30

### 🎉 Initial Release

First stable release of the Absence.io StreamDeck Plugin with professional icon design.

### ✨ Added

#### Core Features
- **Clock In** action to start time tracking
- **Clock Out** action to end time tracking with duration display
- **Pause** action to temporarily stop tracking
- **Status** action to view current tracking status and elapsed time
- **Test Connection** action to verify API credentials

#### Configuration
- Property Inspector for credential configuration
- Support for User ID and API Key authentication
- Timezone selection (8 major timezones)
- Work type selection (Work, Home Office, Overtime)
- Global settings shared across all actions

#### Technical
- Native Hawk authentication (HMAC-SHA256)
- Direct WebSocket connection to StreamDeck
- Zero external runtime dependencies
- Uses native browser APIs (fetch, Web Crypto)
- Automatic language detection (English/Spanish)

#### Visual Feedback
- Loading indicators (⏳) during API requests
- Success confirmations (✓) after operations
- Error alerts (✗) for failed operations
- Duration display after clock out
- Elapsed time display in status

### 🌍 Internationalization
- Full English (en) support
- Full Spanish (es) support
- Automatic language detection from StreamDeck

### 📚 Documentation
- Comprehensive README with quick start
- Detailed installation guide
- Complete user guide with workflows
- Developer documentation
- API reference documentation
- Contributing guidelines
- This changelog

### 🛠️ Developer Tools
- Build script for plugin compilation
- Icon generation script
- Validation tools
- Development mode with watch

### 🎨 Design
- Professional icon set with modern gradients
- Thematic colors for each action:
  - Clock In: Green (#10B981)
  - Clock Out: Red (#EF4444)
  - Pause: Orange (#F59E0B)
  - Resume: Green (#10B981)
  - Status: Blue (#3B82F6)
  - Plugin: Blue-Purple gradient
- SVG source files + PNG exports (72×72 and 144×144)
- High-resolution Retina support (@2x versions)
- Automatic icon generation script
- Following Elgato's official design guidelines

### 🔒 Security
- Local credential storage
- Credentials never logged
- HTTPS encryption for all API calls
- Secure Hawk authentication

### 📋 Requirements
- StreamDeck 6.9 or higher
- Node.js 20+ (included with StreamDeck)
- macOS 10.15+ or Windows 10+
- absence.io account with API access

---

## Version History Summary

### [1.0.0] - 2026-01-30
- Initial stable release
- Core time tracking functionality
- Multi-language support
- Complete documentation

---

## Upgrade Guide

### From Beta/Development Versions

If you were using a development or beta version:

1. **Backup your credentials** (User ID and API Key)
2. **Remove old version**:
   - Delete all Absence.io actions from StreamDeck
   - Remove plugin folder from:
     - macOS: `~/Library/Application Support/com.elgato.StreamDeck/Plugins/`
     - Windows: `%APPDATA%\Elgato\StreamDeck\Plugins\`
3. **Restart StreamDeck**
4. **Install v1.0.0** from releases page
5. **Reconfigure** with your credentials
6. **Test connection** to verify

---

## Known Issues

None currently. Please report issues on [GitHub](https://github.com/yourusername/absence-streamdeck-plugin/issues).

---

## Future Plans

See [GitHub Issues](https://github.com/yourusername/absence-streamdeck-plugin/issues) for planned features.

Potential future enhancements:
- Multiple API key profiles
- Automatic daily summary
- Weekly/monthly statistics
- Custom action labels
- More timezone options
- Integration with other time tracking tools

---

## Support

For issues, questions, or feature requests:
- **Issues**: [GitHub Issues](https://github.com/yourusername/absence-streamdeck-plugin/issues)
- **Documentation**: [docs/](.)
- **Email**: contact@cajigas.es

---

[← Back to Contributing](CONTRIBUTING.md)
