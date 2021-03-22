# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2020-03-22

### Added

* It's now possible to override service factories with `ServiceContainer.override('aServiceId', aFactory);`

## [1.1.1] - 2020-02-18

### Changed

* Changed TypeScript compilation to `commonjs`

## [1.1.0] - 2020-02-16

### Changed

* renamed `@injectViaId` to `@inject` so `@inject` can be used with an optional serviceId parameter

## [1.0.0] - 2020-02-15

### Added

* `@injectViaId` decorator

## [0.1.3] - 2020-02-02

### Added

* `Changelog.md`

### Fixed

* Fixed two bugs in `decorator.ts`

## [0.1.2] - 2020-02-02

### Added

* Initial release
