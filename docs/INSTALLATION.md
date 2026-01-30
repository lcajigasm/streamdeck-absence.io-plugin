# Installation Guide

This guide will walk you through the installation process for the Absence.io StreamDeck plugin.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [Option 1: Install Pre-built Plugin (Recommended)](#option-1-install-pre-built-plugin-recommended)
  - [Option 2: Install from Source](#option-2-install-from-source)
- [Configuration](#configuration)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing the plugin, ensure you have:

- **StreamDeck Device** (any model)
- **StreamDeck Software** version 6.9 or higher
- **absence.io Account** with API access
- **Operating System**:
  - macOS 10.15 (Catalina) or higher
  - Windows 10 or higher

## Installation Methods

### Option 1: Install Pre-built Plugin (Recommended)

This is the easiest method for most users.

#### Steps:

1. **Download the Plugin**
   - Go to the [releases page](https://github.com/lcajigasm/absence-streamdeck-plugin/releases)
   - Download the latest `com.cajigas.absence.streamDeckPlugin` file

2. **Install the Plugin**
   - Double-click the downloaded `.streamDeckPlugin` file
   - StreamDeck will automatically install the plugin
   - A confirmation dialog will appear

3. **Verify Installation**
   - Open StreamDeck software
   - Look for "Absence.io" category in the actions list
   - You should see 5 actions: Clock In, Clock Out, Pause, Status, Test Connection

### Option 2: Install from Source

For developers who want to modify or contribute to the plugin.

#### Steps:

1. **Clone the Repository**

```bash
git clone <repository-url>
cd absence_plugin
```

2. **Install Build Dependencies**

```bash
npm install
```

Note: The plugin itself has zero runtime dependencies. These are only for build tools.

3. **Build the Plugin**

```bash
npm run build
```

4. **Create Symbolic Link**

**macOS:**
```bash
ln -s "$(pwd)/com.cajigas.absence.sdPlugin" "$HOME/Library/Application Support/com.elgato.StreamDeck/Plugins/"
```

**Windows (Command Prompt as Administrator):**
```cmd
mklink /D "%APPDATA%\Elgato\StreamDeck\Plugins\com.cajigas.absence.sdPlugin" "%cd%\com.cajigas.absence.sdPlugin"
```

5. **Restart StreamDeck**

Close and reopen the StreamDeck application to load the plugin.

## Configuration

After installation, you need to configure your absence.io credentials.

### Getting Your API Credentials

1. **Log in to absence.io**
   - Visit [app.absence.io](https://app.absence.io)
   - Sign in with your account

2. **Navigate to Integrations**
   - Click your profile icon (top-right)
   - Select **"Profile"** or **"Settings"**
   - Go to the **"Integrations"** tab

3. **Generate API Key**
   - Click **"Generate API Key"** or **"Create New Key"**
   - A dialog will appear with two values:
     - **Key Identifier** (this is your User ID)
     - **API Key** (this is your API Key)

4. **Save Your Credentials**
   - ⚠️ **Important**: The API Key is shown only once
   - Copy both values immediately
   - Store them in a secure location (password manager recommended)

### Configure the Plugin

1. **Add an Action to StreamDeck**
   - Drag any Absence.io action to your StreamDeck
   - Example: "Clock In" button

2. **Open Configuration**
   - The configuration panel opens automatically
   - Or click the action and look at the right panel

3. **Enter Credentials**
   - **User ID**: Paste the Key Identifier from absence.io
   - **API Key**: Paste the API Key from absence.io
   - **Timezone**: Select your timezone (default: Europe/Madrid)
   - **Work Type**: Select your work type (default: Work)

4. **Test Connection**
   - Click **"Test Credentials"** button
   - Wait for the test to complete (5-10 seconds)
   - You should see: "✅ Connection successful! Found X entries today"
   - If you see an error, verify your credentials

5. **Save Settings**
   - Click **"Save Settings"** button
   - Settings are saved globally for all Absence.io actions
   - You can close the configuration panel

## Verification

To verify the plugin is working correctly:

1. **Test Connection Action**
   - Add the "Test Connection" action to your StreamDeck
   - Press the button
   - It should show "✓" with the number of entries found

2. **Clock In Test**
   - Add the "Clock In" action
   - Press the button
   - Check absence.io web interface to verify the entry was created

3. **Status Check**
   - Add the "Status" action
   - Press it after clocking in
   - It should display your elapsed time

## Troubleshooting

### Plugin Not Appearing

**Problem**: Absence.io plugin doesn't appear in StreamDeck actions.

**Solutions**:
- Restart StreamDeck completely
- On macOS: `killall "Stream Deck"` then reopen
- On Windows: Task Manager → End "StreamDeck.exe" → Reopen
- Verify plugin folder exists:
  - macOS: `~/Library/Application Support/com.elgato.StreamDeck/Plugins/`
  - Windows: `%APPDATA%\Elgato\StreamDeck\Plugins\`

### Test Connection Fails

**Problem**: "Test Credentials" shows an error.

**Solutions**:
- Verify User ID and API Key are correct
- Check you copied them without extra spaces
- Ensure API Key hasn't been revoked
- Generate a new API Key if needed
- Check internet connection
- Verify absence.io service is online

### Buttons Not Responding

**Problem**: Pressing buttons doesn't do anything.

**Solutions**:
- Open StreamDeck debugger: [http://localhost:23654/](http://localhost:23654/)
- Check browser console for errors
- Verify credentials are saved (click action, check config)
- Restart StreamDeck
- Try "Test Connection" first to verify setup

### Authentication Errors

**Problem**: Getting "401 Unauthorized" or "403 Forbidden" errors.

**Solutions**:
- API Key might be invalid or expired
- Generate a new API Key in absence.io
- Re-enter credentials in plugin configuration
- Click "Test Credentials" to verify

### Network/Timeout Errors

**Problem**: "Network error" or "Request timeout" messages.

**Solutions**:
- Check internet connection
- Verify firewall isn't blocking StreamDeck
- Some corporate networks may block the API
- Try from a different network
- Check absence.io status page for outages

## Enabling Debug Mode

For advanced troubleshooting:

**macOS:**
```bash
defaults write com.elgato.StreamDeck html_remote_debugging_enabled -bool YES
killall "Stream Deck"
```

**Windows:**
1. Open Registry Editor
2. Navigate to: `HKEY_CURRENT_USER\Software\Elgato Systems GmbH\StreamDeck`
3. Create DWORD: `html_remote_debugging_enabled` = `1`
4. Restart StreamDeck

Then open: [http://localhost:23654/](http://localhost:23654/)

## Next Steps

- Read the [User Guide](USER_GUIDE.md) to learn how to use all features
- Check the [API Documentation](API.md) for technical details
- See [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute

## Support

If you continue having issues:

1. Check the [User Guide](USER_GUIDE.md#troubleshooting)
2. Review [GitHub Issues](https://github.com/yourusername/absence-streamdeck-plugin/issues)
3. Create a new issue with:
   - StreamDeck version
   - Operating system
   - Error messages (from debugger)
   - Steps to reproduce

---

[← Back to README](../README.md) | [Next: User Guide →](USER_GUIDE.md)
