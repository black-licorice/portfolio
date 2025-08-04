# Changelog

## [ff864d1] - 2025-08-01 - Total Refactor

### Added
- **Flask Backend**: New Python Flask application (`portfolio.py`) with routing and project management
  - Flask web framework implementation with template rendering
  - Work class for project organization
  - Dynamic image loading for projects
  - Error handling for 404/500 pages
  
- **Documentation**: Added README.md with project overview

- **Project Assets**: Complete asset structure for portfolio website
  - Project descriptions for cochlear implant and delivery robot projects
  - Image galleries for both projects with detailed documentation
  - Profile photos collection
  - Background images and UI assets

### Architecture Changes
- Migrated from static HTML to Flask-based dynamic web application
- Implemented MVC pattern with template rendering
- Added automated asset discovery and management
- Created structured project organization system

**Stats**: +1,367 lines added across 28 files
**Impact**: Complete transformation from static to dynamic portfolio website