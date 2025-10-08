# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [unreleased]

### Added

- Added an .editorconfig
- Added documentation for `yarn dev` (#75)

### Changed

- Preserve ‘mastodon-settings’ in localStorage (#66)
- Redesigned the login page (#76)
- Changed icons to the Phosphor iconset (#77)

### Fixed

- Updated caniuse-lite browserlist (#82)

## [0.5.0] - 2025-07-14

### Added

- Added a logout button to the sidebar (#48)

### Fixed

- Fixed an incorrect port number in the documentation (#58)
- Fixed an issue where the media description character limit wasn’t read from the instance settings (#62, #63)

## [0.4.0] - 2025-05-14

### Added

- Added a step to JS linting (#35)
- Added CONTRIBUTING.md (#36)

### Fixed

- Fixed an issue where the trailing space on a instance URL wasn’t removed (#38)
- Fixed an issue where the “Automatically unfold content-warnings” setting wouldn’t unfold content-warnings (#46)

## [0.3.0] - 2025-04-03

### Added

- Added instructions for testing locally (#12)
- Added a `yarn dev` command for easier development (#16)
- Added a nicer login page design (#19)

### Fixed

- Fixed an issue where local only statuses weren’t local only (#13)
- Fixed an issue where `blurhash` would lose proportion (#17)

### Removed

- Removed hardcoded limit for media (#11)

## [0.2.0] - 2024-12-27

### Added

- Added theme selector to app settings
- App settings are now stored locally for persistence (#2)

### Changed

- Media attachment cap is now read from instance settings
- Changed spoiler/content-warning box to always be visible (#1)
- Moved `use_blurhash` to app settings (#5)

### Fixed

- Fixed an issue where a spoiler would not be set
- Fixed an issue where a “Can’t verify CSRF token authenticity” error message would appear (#2)
- Fixed an issue where the logo / workmark wouldn’t appear (#4)

### Removed

- Removed unused development environment files (#3)

## [0.1.0] - 2025-12-19

Initial release

unreleased: https://codeberg.org/superseriousbusiness/masto-fe-standalone/compare/110c8fb8ccb1363f649d3eb30ca822f415145e6a...HEAD
0.5.0: https://codeberg.org/superseriousbusiness/masto-fe-standalone/compare/f61625f4bde83e37847818d637a0b0811f381b86...110c8fb8ccb1363f649d3eb30ca822f415145e6a
0.4.0: https://codeberg.org/superseriousbusiness/masto-fe-standalone/compare/370a666d27638530fbf51007d1defc2f883a0b62...f61625f4bde83e37847818d637a0b0811f381b86
0.3.0: https://codeberg.org/superseriousbusiness/masto-fe-standalone/compare/3481816b99ec9fb44e08cf0a5499ee3e2b78cc1c...370a666d27638530fbf51007d1defc2f883a0b62
0.2.0: https://codeberg.org/superseriousbusiness/masto-fe-standalone/compare/c541d569cf6b2f4746f12339d6e7111334f2fa17...3481816b99ec9fb44e08cf0a5499ee3e2b78cc1c
0.1.0: https://codeberg.org/superseriousbusiness/masto-fe-standalone/compare/915034f6a6f7aeea845b6d7aa257f17eb0f86abf...c541d569cf6b2f4746f12339d6e7111334f2fa17
