# User Guide

Complete guide to using the Absence.io StreamDeck plugin.

## Table of Contents

- [Overview](#overview)
- [Initial Setup](#initial-setup)
- [Using the Actions](#using-the-actions)
- [Configuration Options](#configuration-options)
- [Daily Workflow](#daily-workflow)
- [Tips & Best Practices](#tips--best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

The Absence.io plugin provides 5 actions to manage your time tracking:

| Action | Icon | Description |
|--------|------|-------------|
| **Clock In** | ▶️ | Start work time tracking |
| **Clock Out** | ⏹️ | End work time tracking |
| **Pause** | ⏸️ | Pause time tracking |
| **Status** | ℹ️ | View current status |
| **Test Connection** | 🧪 | Test API credentials |

## Initial Setup

### 1. Install the Plugin

See [Installation Guide](INSTALLATION.md) for detailed instructions.

### 2. Get API Credentials

1. Go to [app.absence.io](https://app.absence.io)
2. Profile → Integrations → Generate API Key
3. Copy **Key Identifier** (User ID) and **API Key**

### 3. Configure Actions

1. Drag any Absence.io action to your StreamDeck
2. Enter your **User ID** and **API Key**
3. Select your **Timezone**
4. Choose your **Work Type**
5. Click **"Test Credentials"** to verify
6. Click **"Save Settings"**

**Important**: Settings are shared across all Absence.io actions, so you only need to configure once.

## Using the Actions

### Clock In

**Purpose**: Start your workday time tracking.

**How to use**:
1. Press the Clock In button when you start work
2. Button shows "⏳" (loading)
3. Success: Shows "✓ In" for 3 seconds
4. Returns to default state
5. Entry is created in absence.io

**Visual Feedback**:
- ⏳ = Processing
- ✓ In = Successfully clocked in
- ✗ Fail = Error occurred

**Note**: If you're already clocked in, a new entry will be created. Make sure to clock out first if needed.

### Clock Out

**Purpose**: End your work session and see total time worked.

**How to use**:
1. Press the Clock Out button when finishing work
2. Button shows "⏳" (loading)
3. Success: Shows "✓ Out" for 1.5 seconds
4. Then displays total time (e.g., "⏱ 8h 15m")
5. After 5 seconds, returns to default state

**Visual Feedback**:
- ⏳ = Processing
- ✓ Out = Successfully clocked out
- ⏱ Xh Ym = Total time worked
- ✗ Fail = Error or no active entry

**Common Error**: "No active clock-in" means you're not currently clocked in.

### Pause

**Purpose**: Temporarily stop time tracking (e.g., lunch break).

**How to use**:
1. Press Pause button during your work session
2. This clocks you out (ends current timespan)
3. Button shows "⏸ Pause" for 3 seconds
4. To resume, use the Clock In button

**Important**: Pause works by clocking you out. When you resume work, use Clock In to start a new timespan.

**Alternative Workflow**:
- Some users prefer Clock Out for breaks
- Use Pause if you want visual indication it's a break
- Both methods work the same way technically

### Status

**Purpose**: Check if you're clocked in and see elapsed time.

**How to use**:
1. Press Status button anytime
2. If clocked in: Shows elapsed time (e.g., "⏱ 3h 45m")
3. If not clocked in: Shows "Not In"
4. Display lasts 5 seconds (clocked in) or 3 seconds (not clocked in)

**Use Cases**:
- Verify you clocked in when you arrived
- Check how long you've been working
- Confirm you're not clocked in after leaving

### Test Connection

**Purpose**: Verify API credentials are working correctly.

**How to use**:
1. Press Test Connection button
2. Button shows "⏳" (processing)
3. Plugin fetches today's timespans
4. Success: Shows "✓ X" where X is the count
5. Failure: Shows "✗ Fail"
6. Display lasts 5 seconds (success) or 3 seconds (failure)

**When to use**:
- After initial setup to verify credentials
- When changing API keys
- When troubleshooting connection issues
- To check if absence.io service is responding

## Configuration Options

### User ID

- **What it is**: Key Identifier from your absence.io API Key
- **Format**: Usually alphanumeric string (e.g., `abc123def456`)
- **Required**: Yes
- **Where to find**: absence.io → Profile → Integrations → Generate API Key

### API Key

- **What it is**: Secret key for authenticating with absence.io API
- **Format**: Long alphanumeric string
- **Required**: Yes
- **Security**: Stored locally, never displayed in logs
- **Important**: Only shown once when generated, save it securely

### Timezone

- **What it is**: Your local timezone for accurate time tracking
- **Default**: Europe/Madrid
- **Options**:
  - Europe/Madrid (CET)
  - Europe/London (GMT)
  - Europe/Paris (CET)
  - America/New_York (EST)
  - America/Los_Angeles (PST)
  - America/Chicago (CST)
  - Asia/Tokyo (JST)
  - Australia/Sydney (AEDT)

**Why it matters**: Ensures timestamps are accurate in your local time.

### Work Type

- **What it is**: Category of work for the time entry
- **Default**: Work
- **Options**:
  - Work (regular office work)
  - Home Office (remote work)
  - Overtime (extra hours)

**Note**: This determines how the time is categorized in absence.io reports.

## Daily Workflow

### Standard Workday

```
Morning:
1. Arrive at work
2. Press "Clock In" → ✓ In

Lunch Break:
3. Press "Pause" → ⏸ Pause
4. Take your break
5. Return from break
6. Press "Clock In" → ✓ In

End of Day:
7. Press "Clock Out" → ⏱ 8h 30m
8. Leave work
```

### Check Status Anytime

```
1. Press "Status"
2. See elapsed time: ⏱ 4h 15m
3. Continue working
```

### Forgot to Clock In?

```
1. Clock in manually in absence.io web interface
2. Edit the start time to when you actually arrived
3. Or press "Clock In" now (tracks from current time)
```

### Forgot to Clock Out?

```
1. Go to absence.io web interface
2. Find the open timespan
3. Click "Edit" and set the end time
4. Or press "Clock Out" now (will show incorrect duration)
```

## Tips & Best Practices

### 1. Organize Your StreamDeck Layout

**Recommended layout**:
```
┌──────────┬──────────┬──────────┐
│ Clock In │ Status   │ Test     │
├──────────┼──────────┼──────────┤
│ Pause    │ Clock Out│  (other) │
└──────────┴──────────┴──────────┘
```

- Place Clock In in top-left (most used)
- Clock Out nearby for easy access
- Status easily reachable
- Pause near Clock In/Out

### 2. Visual Feedback

- Always wait for confirmation (✓ or ✗)
- Don't press buttons repeatedly if slow
- Check Status if unsure about clock-in status

### 3. Multiple Breaks

For multiple breaks during the day:
- Press Pause for each break
- Press Clock In when resuming
- This creates multiple timespans (normal behavior)
- absence.io will aggregate them automatically

### 4. Verify at End of Day

Before leaving:
1. Press Status to verify you're still clocked in
2. Press Clock Out
3. Wait to see total time displayed
4. Optionally verify in absence.io web interface

### 5. API Key Security

- Never share your API Key
- If compromised, generate a new one immediately
- Update plugin configuration after generating new key

### 6. Sync with Calendar

Consider setting up StreamDeck profiles that change based on time:
- Work profile (8am-6pm): Shows Absence.io actions
- Evening profile (6pm-8am): Hide or show different actions

### 7. Backup Configuration

Your settings are saved locally. If reinstalling:
- You'll need to re-enter credentials
- Save them in a password manager

## Troubleshooting

### Common Issues

#### "Config!" Displayed on Button

**Problem**: No credentials configured or credentials not saved.

**Solution**:
1. Click the action
2. Verify User ID and API Key are entered
3. Click "Save Settings"
4. Try the action again

#### "✗ Fail" After Clock In/Out

**Problem**: API request failed.

**Possible causes**:
- Invalid credentials
- Network connection issue
- absence.io service down

**Solution**:
1. Use "Test Connection" to verify credentials
2. Check internet connection
3. Try again in a few moments
4. Check absence.io status page

#### "Not In" When Expecting Active Status

**Problem**: No active timespan found.

**Solution**:
1. Verify you clocked in (check absence.io web)
2. Clock in if you forgot
3. If you clocked in but got "Not In":
   - There may have been an error
   - Check absence.io web interface
   - Use web interface to create entry if needed

#### Clock Out Shows "No hay fichaje activo"

**Problem**: No active clock-in to close.

**Solution**:
- This is a Spanish error message (will be fixed in future)
- Means: "No active clock-in"
- Simply clock in first, then clock out

#### Time Not Accurate

**Problem**: Displayed time doesn't match expected duration.

**Solution**:
1. Verify timezone is set correctly in configuration
2. Check device system time is accurate
3. Remember: Time starts from when you press Clock In

#### Buttons Slow to Respond

**Problem**: 5-10 second delay after pressing buttons.

**Explanation**: This is normal. The plugin needs to:
1. Authenticate with absence.io API
2. Send request over internet
3. Wait for response
4. Update button display

**Tips**:
- Don't press repeatedly
- Wait for visual feedback
- Use Status to verify if uncertain

### Advanced Troubleshooting

#### Enable Debug Mode

See [Installation Guide - Debug Mode](INSTALLATION.md#enabling-debug-mode).

#### Check Logs

1. Enable debug mode (see above)
2. Open [http://localhost:23654/](http://localhost:23654/)
3. Click on the plugin
4. Open browser console (F12)
5. Look for errors in red

#### Test API Directly

Use the "Test Connection" action to verify the API is working:
- Success = API credentials and connection OK
- Failure = Problem with credentials or network

#### Reinstall Plugin

If all else fails:
1. Remove all Absence.io actions from StreamDeck
2. Restart StreamDeck
3. Reinstall plugin
4. Reconfigure credentials
5. Test with "Test Connection"

## Keyboard Shortcuts

StreamDeck supports assigning keyboard shortcuts to actions:

1. Long-press an action in StreamDeck software
2. Select "Edit" or settings
3. Assign a hotkey
4. Now you can trigger actions with keyboard

Example setup:
- Ctrl+Alt+I = Clock In
- Ctrl+Alt+O = Clock Out
- Ctrl+Alt+S = Status

## Integration with Other Tools

### Using with Elgato Wave Link

Automatically mute/unmute when clocking in/out:

Use Multi-Action to combine:
1. Clock In + Unmute
2. Clock Out + Mute

### Using with Smart Home

Use StreamDeck's System → Website action:

Create webhook URLs that trigger when clocking in/out.

## FAQ

**Q: Can I have different work types for different buttons?**
A: Currently, all actions share the same work type. This is a global setting.

**Q: Does the plugin work offline?**
A: No, it requires internet connection to communicate with absence.io API.

**Q: Can I see my time entries history?**
A: Not in the plugin. Use the absence.io web interface for full history and reports.

**Q: What happens if I press Clock In twice?**
A: It will create a new clock-in entry. The first one may remain open. Avoid pressing twice.

**Q: Can multiple people use the same credentials?**
A: No, API credentials are per user. Each person needs their own absence.io account and API key.

**Q: Is my data secure?**
A: Credentials are stored locally on your machine. All API communication uses HTTPS encryption.

**Q: What if absence.io is down?**
A: The plugin will show errors. Track your time manually and update in absence.io when service returns.

## Next Steps

- Read [API Documentation](API.md) for technical details
- Check [Development Guide](DEVELOPMENT.md) to customize the plugin
- See [Contributing Guide](CONTRIBUTING.md) to help improve the plugin

---

[← Back to Installation](INSTALLATION.md) | [Next: Development Guide →](DEVELOPMENT.md)
