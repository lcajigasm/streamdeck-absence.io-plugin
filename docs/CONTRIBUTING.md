# Contributing Guide

Thank you for considering contributing to the Absence.io StreamDeck Plugin!

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- Be respectful and considerate
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Publishing others' private information
- Any conduct that could be considered inappropriate

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js 20+** installed
- **StreamDeck** software and hardware
- **Git** for version control
- **Code editor** (VS Code recommended)
- **absence.io account** with API access (for testing)

### Fork and Clone

1. **Fork the repository** on GitHub

2. **Clone your fork**:
```bash
git clone https://github.com/YOUR_USERNAME/absence-streamdeck-plugin.git
cd absence_plugin
```

3. **Add upstream remote**:
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/absence-streamdeck-plugin.git
```

4. **Install dependencies**:
```bash
npm install
```

5. **Set up development environment**:
```bash
npm run build

# macOS
ln -s "$(pwd)/com.cajigas.absence.sdPlugin" "$HOME/Library/Application Support/com.elgato.StreamDeck/Plugins/"

# Windows (as Admin)
mklink /D "%APPDATA%\Elgato\StreamDeck\Plugins\com.cajigas.absence.sdPlugin" "%cd%\com.cajigas.absence.sdPlugin"
```

6. **Restart StreamDeck** to load the plugin

## Development Workflow

### Branch Strategy

- `main` - Stable releases only
- `develop` - Main development branch
- `feature/xyz` - New features
- `fix/xyz` - Bug fixes
- `docs/xyz` - Documentation updates

### Creating a Branch

```bash
# Update your local repository
git checkout develop
git pull upstream develop

# Create a feature branch
git checkout -b feature/my-new-feature

# Or a bugfix branch
git checkout -b fix/issue-123
```

### Making Changes

1. **Make your changes** in your branch

2. **Test thoroughly**:
   - Test all actions (Clock In, Clock Out, etc.)
   - Test error scenarios
   - Test with both valid and invalid credentials
   - Test on macOS and/or Windows if possible

3. **Update documentation** if needed:
   - Update README.md for user-facing changes
   - Update docs/ for technical changes
   - Add examples if adding new features

4. **Lint your code** (if linters are configured):
```bash
npm run lint
```

5. **Build and verify**:
```bash
npm run build
npm run validate
```

### Syncing with Upstream

Keep your fork updated:

```bash
git checkout develop
git fetch upstream
git merge upstream/develop
git push origin develop
```

## Coding Standards

### JavaScript Style

Follow these conventions for consistency:

**General**:
- Use **ES6+ features** (const/let, arrow functions, async/await)
- Use **4 spaces** for indentation
- Use **single quotes** for strings (unless template literals)
- Use **semicolons**
- Maximum line length: **100 characters**

**Naming**:
```javascript
// Classes: PascalCase
class AbsenceAPI { }

// Functions: camelCase
function handleClockIn() { }

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://app.absence.io/api/v2';

// Variables: camelCase
const userId = 'abc123';
```

**Functions**:
```javascript
// Use async/await for asynchronous code
async function fetchData() {
    const result = await api.makeRequest('GET', '/endpoint');
    return result;
}

// Use arrow functions for callbacks
array.map(item => item.value);

// Document complex functions
/**
 * Generates Hawk authentication header
 * @param {string} method - HTTP method
 * @param {string} url - Full URL
 * @param {object} payload - Request body
 * @returns {Promise<string>} Authorization header
 */
async function generateHawkAuth(method, url, payload) {
    // ...
}
```

**Error Handling**:
```javascript
// Always handle errors gracefully
try {
    const result = await riskyOperation();
    return { success: true, data: result };
} catch (error) {
    console.error('[API] Error:', error);
    return { success: false, error: error.message };
}
```

**Console Logging**:
```javascript
// Use prefixed log messages
console.log('[Plugin] Starting operation');
console.log('[API] Making request');
console.error('[Plugin] Error occurred:', error);

// Avoid logging sensitive data
console.log('[API] User ID:', userId); // OK
console.log('[API] API Key:', apiKey); // NO! Security risk
```

### HTML/CSS Style

**HTML**:
- Use semantic HTML5 elements
- Indent with 4 spaces
- Always close tags
- Use double quotes for attributes

**CSS**:
- Use class selectors over ID selectors
- Follow BEM naming convention if adding new styles
- Keep specificity low
- Group related properties

### File Organization

```
com.cajigas.absence.sdPlugin/
├── manifest.json           # Plugin metadata (JSON format)
├── index.html              # Main plugin (HTML + inline JS)
├── propertyInspector.html  # Config UI (HTML + inline JS)
├── i18n.js                 # Internationalization (separate JS)
├── *.json                  # Translation files (JSON)
└── images/                 # Icons (PNG, SVG)
```

Keep code organized within files:
1. Constants and configuration
2. Classes
3. Utility functions
4. Event handlers
5. API functions

## Commit Guidelines

### Commit Message Format

Use conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, no logic change)
- `refactor` - Code restructuring (no functional change)
- `perf` - Performance improvement
- `test` - Adding tests
- `chore` - Build process, dependencies

**Examples**:

```
feat(clockin): add support for custom work types

Allow users to select different work types (work, homeoffice, overtime)
when clocking in. Work type is saved in settings.

Closes #42
```

```
fix(api): handle network timeout errors

Add timeout handling to API requests to prevent plugin hanging
when absence.io is slow or unreachable.

Fixes #38
```

```
docs(readme): update installation instructions

Add Windows-specific installation steps and troubleshooting
section for common issues.
```

### Writing Good Commits

**DO**:
- Write clear, descriptive messages
- Use present tense ("add feature" not "added feature")
- Reference issue numbers
- Keep first line under 72 characters
- Explain *why* not just *what*

**DON'T**:
- Write vague messages ("fix bug", "update code")
- Commit unrelated changes together
- Commit broken code
- Commit secrets or credentials

## Pull Request Process

### Before Submitting

Checklist:

- [ ] Code follows the style guidelines
- [ ] All tests pass (manual testing)
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] Branch is up-to-date with develop
- [ ] No console errors in StreamDeck debugger

### Creating a Pull Request

1. **Push your branch**:
```bash
git push origin feature/my-new-feature
```

2. **Open PR on GitHub**:
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select base: `develop` ← compare: `feature/my-new-feature`
   - Fill out the PR template

3. **PR Description Template**:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
Describe the tests you ran:
- [ ] Tested Clock In
- [ ] Tested Clock Out
- [ ] Tested with invalid credentials
- [ ] Tested on macOS / Windows

## Screenshots (if applicable)
Add screenshots to demonstrate changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested on actual StreamDeck hardware

## Related Issues
Closes #123
Related to #456
```

### Review Process

1. **Automated checks** (if configured):
   - Build succeeds
   - Linting passes

2. **Code review** by maintainers:
   - Code quality
   - Functionality
   - Documentation
   - Tests

3. **Requested changes**:
   - Address feedback
   - Push new commits to same branch
   - Request re-review

4. **Approval and merge**:
   - Maintainer approves
   - PR merged to develop
   - Branch deleted

### After Merge

- Update your fork:
```bash
git checkout develop
git pull upstream develop
git push origin develop
```

- Delete your feature branch:
```bash
git branch -d feature/my-new-feature
git push origin --delete feature/my-new-feature
```

## Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check documentation** for known issues
3. **Test with latest version**
4. **Gather information**:
   - StreamDeck version
   - Plugin version
   - Operating system
   - Error messages (from debugger)

### Creating a Bug Report

Use the bug report template:

```markdown
**Describe the bug**
Clear description of what the bug is

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- StreamDeck Version: [e.g., 6.9.0]
- Plugin Version: [e.g., 1.0.0]
- OS: [e.g., macOS 14.2]

**Additional context**
Any other relevant information

**Console Logs**
```
Paste relevant console logs from StreamDeck debugger
```
```

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested

## Feature Requests

### Creating a Feature Request

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
How you envision the feature working

**Describe alternatives considered**
Other solutions you've thought about

**Additional context**
Mockups, examples, related features

**Willingness to contribute**
- [ ] I'm willing to implement this feature
- [ ] I need help implementing this
- [ ] I'm just suggesting it for someone else to implement
```

## Questions?

- **Documentation**: Check [docs/](.) first
- **Discussions**: Use GitHub Discussions for questions
- **Issues**: For bugs and feature requests only
- **Email**: [contact@cajigas.es](mailto:contact@cajigas.es)

## Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Mentioned in release notes
- Added to contributors list (if significant contribution)

Thank you for contributing! 🎉

---

[← Back to API](API.md) | [Next: Changelog →](CHANGELOG.md)
