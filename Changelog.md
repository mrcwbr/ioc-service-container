# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2021-05-12

### Added

* Parameter `buildInstantly` to `ServiceContainer.set()` for forcing to build the instance of a service directly

## [1.2.1] - 2021-03-22

### Fixed

* Fixed `ServiceContainer.override` function to ignore case-sensitiveness

## [1.2.0] - 2021-03-22

### Added

* It's now possible to override service factories with `ServiceContainer.override('aServiceId', aFactory);`

## [1.1.1] - 2021-02-18

### Changed

* Changed TypeScript compilation to `commonjs`

## [1.1.0] - 2021-02-16

### Changed

* renamed `@injectViaId` to `@inject` so `@inject` can be used with an optional serviceId parameter

## [1.0.0] - 2021-02-15

### Added

* `@injectViaId` decorator

## [0.1.3] - 2021-02-02

### Added

* `Changelog.md`

### Fixed

* Fixed two bugs in `decorator.ts`

## [0.1.2] - 2021-02-02

### Added

* Initial release
