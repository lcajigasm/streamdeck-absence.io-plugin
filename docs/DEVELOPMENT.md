# Development Guide

Developer documentation for the Absence.io StreamDeck plugin.

## Table of Contents

- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Building the Plugin](#building-the-plugin)
- [Debugging](#debugging)
- [Code Overview](#code-overview)
- [Testing](#testing)
- [Publishing](#publishing)

## Architecture

### Overview

The plugin uses a **standalone HTML/JavaScript architecture** with zero external runtime dependencies.

```
┌─────────────────────────────────────────────┐
│           StreamDeck Application            │
│  (Electron-based, provides Node.js runtime) │
└────────────────┬────────────────────────────┘
                 │ WebSocket (ws://127.0.0.1)
                 │
┌────────────────▼────────────────────────────┐
│             Plugin (index.html)             │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  AbsenceAPI Class                   │  │
│  │  - Hawk Authentication (HMAC-SHA256)│  │
│  │  - Timezone handling                │  │
│  │  - HTTP requests via fetch          │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  WebSocket Handler                  │  │
│  │  - Connect to StreamDeck            │  │
│  │  - Handle events (keyDown, etc.)    │  │
│  │  - Send commands (setTitle, etc.)   │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  Action Handlers                    │  │
│  │  - handleClockIn()                  │  │
│  │  - handleClockOut()                 │  │
│  │  - handleStatus()                   │  │
│  │  - handlePause()                    │  │
│  │  - handleTestConnection()           │  │
│  └─────────────────────────────────────┘  │
└────────────────┬────────────────────────────┘
                 │ HTTPS (fetch)
                 │
┌────────────────▼────────────────────────────┐
│         absence.io API (v2)                 │
│         https://app.absence.io/api/v2       │
└─────────────────────────────────────────────┘
```

### Key Technologies

- **JavaScript (ES6+)**: Modern JavaScript with async/await
- **WebSocket API**: Direct WebSocket connection (no SDK)
- **Fetch API**: Native HTTP requests
- **Web Crypto API**: HMAC-SHA256 for authentication
- **HTML5**: Plugin entry point

### Design Decisions

**Why HTML instead of Node.js plugin?**
- Simpler architecture
- No external dependencies (ws, node-fetch, etc.)
- Better compatibility with StreamDeck's environment
- Easier to debug (browser DevTools)

**Why no StreamDeck SDK?**
- Direct WebSocket provides more control
- Reduces complexity
- No dependency management issues
- Better understanding of the protocol

## Project Structure

```
absence_plugin/
├── com.cajigas.absence.sdPlugin/    # Plugin directory (deployed)
│   ├── manifest.json                # Plugin metadata & configuration
│   ├── index.html                   # Main plugin code (entry point)
│   ├── propertyInspector.html       # Configuration UI
│   ├── i18n.js                      # Internationalization system
│   ├── en.json                      # English translations
│   ├── es.json                      # Spanish translations
│   ├── package.json                 # Plugin package info
│   └── images/                      # Icons (PNG & SVG)
│       ├── pluginIcon.*
│       ├── categoryIcon.*
│       ├── clockin.*
│       ├── clockout.*
│       ├── pause.*
│       ├── resume.*
│       └── status.*
│
├── docs/                            # Documentation
│   ├── INSTALLATION.md
│   ├── USER_GUIDE.md
│   ├── DEVELOPMENT.md (this file)
│   ├── API.md
│   ├── CONTRIBUTING.md
│   └── CHANGELOG.md
│
├── build.js                         # Build script
├── convert-icons.js                 # Icon conversion utility
├── package.json                     # Project configuration
├── package-lock.json
├── .env.example                     # Example environment variables
├── .gitignore
├── LICENSE
└── README.md
```

### Important Files

- **manifest.json**: Defines actions, icons, permissions
- **index.html**: Main plugin logic (loaded by StreamDeck)
- **propertyInspector.html**: Configuration interface (right panel in StreamDeck)
- **i18n.js**: Internationalization for property inspector
- **build.js**: Creates icon assets and validates structure

## Development Setup

### Prerequisites

- Node.js 20+ (for build tools only)
- StreamDeck software
- Git
- Code editor (VS Code recommended)

### Initial Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd absence_plugin
```

2. **Install development dependencies**

```bash
npm install
```

This installs:
- `@elgato/cli`: StreamDeck CLI tools
- `sharp`: Image processing for icons

3. **Build the plugin**

```bash
npm run build
```

4. **Create symlink**

**macOS:**
```bash
ln -s "$(pwd)/com.cajigas.absence.sdPlugin" "$HOME/Library/Application Support/com.elgato.StreamDeck/Plugins/"
```

**Windows (as Administrator):**
```cmd
mklink /D "%APPDATA%\Elgato\StreamDeck\Plugins\com.cajigas.absence.sdPlugin" "%cd%\com.cajigas.absence.sdPlugin"
```

5. **Restart StreamDeck**

```bash
# macOS
killall "Stream Deck"

# Windows
taskkill /IM "StreamDeck.exe" /F
```

Then reopen StreamDeck application.

### Development Workflow

#### Watch Mode (Auto-rebuild)

```bash
npm run dev
```

This watches for file changes and rebuilds automatically.

**Note**: You still need to restart StreamDeck to see changes.

#### Quick Restart Script (macOS)

Create a script `dev-restart.sh`:

```bash
#!/bin/bash
killall "Stream Deck"
sleep 2
open -a "Stream Deck"
```

Make it executable:
```bash
chmod +x dev-restart.sh
```

Use it after making changes:
```bash
./dev-restart.sh
```

## Building the Plugin

### Build Commands

```bash
# Build plugin (icons + validation)
npm run build

# Watch mode (auto-rebuild on changes)
npm run dev

# Validate manifest
npm run validate

# Create .streamDeckPlugin file
npm run pack

# Complete release (validate + pack)
npm run release
```

### Build Script (build.js)

The build script:
1. Checks for required files
2. Generates placeholder SVG icons if missing
3. Validates directory structure
4. Creates .gitignore if needed

### Icon Generation

Icons are stored in `com.cajigas.absence.sdPlugin/images/`:

- **Format**: PNG (72x72 and 144x144) and SVG
- **Naming**:
  - `name.svg` - Vector source
  - `name.png` - 72x72px (standard resolution)
  - `name@2x.png` - 144x144px (retina resolution)

**Generate new icons:**

```bash
node convert-icons.js
```

**Requirements**:
- Source SVGs must exist
- Uses `sharp` library for conversion
- Outputs PNG at correct sizes

## Debugging

### Enable Remote Debugging

**macOS:**
```bash
defaults write com.elgato.StreamDeck html_remote_debugging_enabled -bool YES
killall "Stream Deck"
```

**Windows:**
1. Open Registry Editor
2. Go to: `HKEY_CURRENT_USER\Software\Elgato Systems GmbH\StreamDeck`
3. Create DWORD: `html_remote_debugging_enabled` = `1`
4. Restart StreamDeck

### Access Debugger

Open browser: [http://localhost:23654/](http://localhost:23654/)

Select the plugin from the list to open DevTools.

### Console Logging

The plugin uses extensive console logging:

```javascript
console.log('[Plugin] Message');     // Info
console.error('[Plugin] Error');     // Errors
console.log('[API] Request sent');   // API calls
```

Log prefixes:
- `[Plugin]` - Main plugin events
- `[API]` - API requests/responses
- `[PI]` - Property Inspector events

### Common Debug Tasks

**Check WebSocket connection:**
```javascript
// In browser console
websocket.readyState
// 0 = CONNECTING, 1 = OPEN, 2 = CLOSING, 3 = CLOSED
```

**Test API call manually:**
```javascript
// In browser console
const api = new AbsenceAPI('userId', 'apiKey', 'Europe/Madrid');
const result = await api.getTodayTimespans();
console.log(result);
```

**Inspect settings:**
```javascript
// In browser console
console.log(globalSettings);
console.log(contextSettings);
```

## Code Overview

### Main Plugin (index.html)

Structure:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Absence.io Plugin</title>
</head>
<body>
    <script>
        // AbsenceAPI Class (lines 18-219)
        // Utility Functions (lines 224-240)
        // WebSocket Connection (lines 245-315)
        // Event Handlers (lines 320-557)
        // StreamDeck API Functions (lines 562-589)
    </script>
</body>
</html>
```

### AbsenceAPI Class

Core API client for absence.io.

**Key Methods:**

```javascript
class AbsenceAPI {
    constructor(userId, apiKey, timezone)
    
    // Authentication
    async generateHawkAuth(method, url, payload)
    
    // HTTP Requests
    async makeRequest(method, endpoint, payload)
    
    // Time Tracking
    async clockIn(type)
    async clockOut()
    async getActiveTimespan()
    async getStatus()
    async getTodayTimespans()
    
    // Utilities
    getTimezoneOffset()
    getCurrentTime()
}
```

**Hawk Authentication:**

Uses HMAC-SHA256 to sign requests:
1. Generate timestamp and nonce
2. Hash payload (if present)
3. Create normalized string
4. HMAC-SHA256 with API key
5. Build Authorization header

### WebSocket Protocol

**Connection:**
```javascript
function connectElgatoStreamDeckSocket(inPort, inPluginUUID, inRegisterEvent, inInfo) {
    websocket = new WebSocket(`ws://127.0.0.1:${inPort}`);
    
    websocket.onopen = () => {
        // Register plugin
        websocket.send(JSON.stringify({
            event: inRegisterEvent,
            uuid: inPluginUUID
        }));
        
        // Request settings
        websocket.send(JSON.stringify({
            event: 'getGlobalSettings',
            context: inPluginUUID
        }));
    };
}
```

**Event Handling:**
```javascript
websocket.onmessage = async (evt) => {
    const jsonObj = JSON.parse(evt.data);
    
    switch(jsonObj.event) {
        case 'willAppear':
        case 'didReceiveSettings':
            // Store settings
            break;
        case 'keyDown':
            // Handle button press
            await handleKeyDown(action, context, payload);
            break;
    }
};
```

**Sending Commands:**
```javascript
// Set button title
websocket.send(JSON.stringify({
    event: 'setTitle',
    context: context,
    payload: { title: '✓ In', target: 0 }
}));

// Show success animation
websocket.send(JSON.stringify({
    event: 'showOk',
    context: context
}));

// Show error animation
websocket.send(JSON.stringify({
    event: 'showAlert',
    context: context
}));
```

### Property Inspector (propertyInspector.html)

Configuration UI that appears in the right panel.

**Key Functions:**

```javascript
// Called by StreamDeck on load
function connectElgatoStreamDeckSocket(inPort, inUUID, inRegisterEvent, inInfo, inActionInfo)

// Request current settings
function requestSettings()
function requestGlobalSettings()

// Update UI with settings
function updateUI(settings)

// Save settings
function saveSettings()

// Test API credentials
async function testCredentials()
```

**Communication with Plugin:**

```javascript
// Property Inspector → Plugin
websocket.send(JSON.stringify({
    event: 'sendToPlugin',
    context: context,
    action: action,
    payload: {
        action: 'testCredentials',
        userId: userId,
        apiKey: apiKey
    }
}));

// Plugin → Property Inspector
// (must be implemented in main plugin if needed)
```

### Internationalization (i18n.js)

Minimal i18n system for property inspector.

**Structure:**
```javascript
const i18n = {
    en: { /* English translations */ },
    es: { /* Spanish translations */ }
};

function getLanguage() {
    // Detect from StreamDeck or browser
}

function translate(key) {
    const lang = getLanguage();
    return i18n[lang][key] || key;
}
```

**Translation Files:**
- `en.json`: English
- `es.json`: Spanish

Currently these are not fully integrated (property inspector uses hardcoded English).

## Testing

### Manual Testing Checklist

1. **Installation**
   - [ ] Plugin appears in StreamDeck
   - [ ] All 5 actions are available
   - [ ] Icons display correctly

2. **Configuration**
   - [ ] Property inspector opens
   - [ ] Can enter credentials
   - [ ] Test button works
   - [ ] Save button works
   - [ ] Settings persist after restart

3. **Clock In**
   - [ ] Button responds
   - [ ] Shows loading state
   - [ ] Shows success confirmation
   - [ ] Entry appears in absence.io
   - [ ] Timestamp is accurate

4. **Clock Out**
   - [ ] Button responds
   - [ ] Shows loading state
   - [ ] Shows success + duration
   - [ ] Entry closes in absence.io
   - [ ] Duration is accurate

5. **Status**
   - [ ] Shows current time when clocked in
   - [ ] Shows "Not In" when not clocked in
   - [ ] Time updates are reasonably accurate

6. **Pause**
   - [ ] Clocks out successfully
   - [ ] Shows pause indication

7. **Test Connection**
   - [ ] Works with valid credentials
   - [ ] Fails with invalid credentials
   - [ ] Shows entry count

8. **Error Handling**
   - [ ] Shows alert for missing credentials
   - [ ] Shows alert for network errors
   - [ ] Shows alert for API errors

### Automated Testing

Currently no automated tests. Future improvements:

```javascript
// Example test structure (not implemented)
describe('AbsenceAPI', () => {
    it('should generate valid Hawk auth', async () => {
        const api = new AbsenceAPI('user', 'key', 'Europe/Madrid');
        const auth = await api.generateHawkAuth('GET', 'https://example.com');
        expect(auth).toMatch(/^Hawk id=/);
    });
});
```

## Publishing

### Version Numbering

Follow Semantic Versioning (semver):

- **Major.Minor.Patch** (e.g., 1.0.0)
- **Major**: Breaking changes
- **Minor**: New features (backwards compatible)
- **Patch**: Bug fixes

Update in 3 places:
1. `package.json`: `"version": "1.0.0"`
2. `com.cajigas.absence.sdPlugin/manifest.json`: `"Version": "1.0.0.0"`
3. `com.cajigas.absence.sdPlugin/package.json`: `"version": "1.0.0"`

### Release Process

1. **Update version numbers**
2. **Update CHANGELOG.md**
3. **Test thoroughly**
4. **Build release package**

```bash
npm run release
```

This creates: `com.cajigas.absence.streamDeckPlugin`

5. **Create GitHub Release**

```bash
git tag v1.0.0
git push origin v1.0.0
```

Upload the `.streamDeckPlugin` file to the release.

6. **Update documentation**
   - Update README with new version
   - Note any breaking changes

### Distribution

**Methods:**
1. **GitHub Releases** (recommended)
   - Upload `.streamDeckPlugin` file
   - Users download and double-click

2. **Elgato Marketplace** (future)
   - Submit to official plugin store
   - Requires approval process

3. **Direct Download**
   - Host `.streamDeckPlugin` on your server
   - Provide download link

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guidelines
- Pull request process
- Issue reporting
- Feature requests

## Resources

### Official Documentation

- [StreamDeck SDK](https://docs.elgato.com/sdk/)
- [Plugin Manifest Reference](https://docs.elgato.com/sdk/plugins/manifest)
- [absence.io API](https://api.absence.io/)

### Community Resources

- [StreamDeck Forums](https://discord.gg/elgato)
- [StreamDeck Reddit](https://reddit.com/r/elgato)

### Related Projects

- [streamdeck-typescript-template](https://github.com/elgatosf/streamdeck-typescript-template)
- [streamdeck-javascript-template](https://github.com/elgatosf/streamdeck-javascript-template)

---

[← Back to User Guide](USER_GUIDE.md) | [Next: API Reference →](API.md)
