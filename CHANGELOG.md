# MedjaiBot Framework changelog

# [1.7.0](https://github.com/MedjaiBot/Framework/compare/v1.6.1...v1.7.0) (2019-10-08)


### Bug Fixes

* **logger:** fixed log levels in the WebLogger ([9c0ac0d](https://github.com/MedjaiBot/Framework/commit/9c0ac0d))


### Features

* **pluginmanager:** load container bindings before initializing the plugins ([a65eca7](https://github.com/MedjaiBot/Framework/commit/a65eca7))

## [1.6.1](https://github.com/MedjaiBot/Framework/compare/v1.6.0...v1.6.1) (2019-09-27)


### Bug Fixes

* **servermodule:** bound the output streams for the TTYLogger ([31006e4](https://github.com/MedjaiBot/Framework/commit/31006e4))

# [1.6.0](https://github.com/MedjaiBot/Framework/compare/v1.5.0...v1.6.0) (2019-09-27)


### Bug Fixes

* **container:** fixed the return type of GetPreconfiguredContainer ([9e7694d](https://github.com/MedjaiBot/Framework/commit/9e7694d))


### Features

* **event:** added the Cancelable event ([ece2185](https://github.com/MedjaiBot/Framework/commit/ece2185))

# [1.5.0](https://github.com/MedjaiBot/Framework/compare/v1.4.1...v1.5.0) (2019-09-27)


### Features

* **container:** added pre configurable containers and container modules ([071a008](https://github.com/MedjaiBot/Framework/commit/071a008))
* **logger:** added the WebLogger ([e56781a](https://github.com/MedjaiBot/Framework/commit/e56781a))

## [1.4.1](https://github.com/MedjaiBot/Framework/compare/v1.4.0...v1.4.1) (2019-09-24)


### Bug Fixes

* **packaging:** ignore fs calls for this module ([bd05b67](https://github.com/MedjaiBot/Framework/commit/bd05b67))

# [1.4.0](https://github.com/MedjaiBot/Framework/compare/v1.3.4...v1.4.0) (2019-09-21)


### Features

* **pluginmanager:** call the onInit function with the InitializationSide ([e0dcac0](https://github.com/MedjaiBot/Framework/commit/e0dcac0))

## [1.3.4](https://github.com/MedjaiBot/Framework/compare/v1.3.3...v1.3.4) (2019-09-21)


### Bug Fixes

* **pluginmanager:** set the base properties of the plugin when instantiated ([0d461c3](https://github.com/MedjaiBot/Framework/commit/0d461c3))

## [1.3.3](https://github.com/MedjaiBot/Framework/compare/v1.3.2...v1.3.3) (2019-09-21)


### Bug Fixes

* **pluginmanager:** fixed the loading of plugins ([1f03ba6](https://github.com/MedjaiBot/Framework/commit/1f03ba6))
* **pluginmanager:** removed webpack specific stuff ([55b4da4](https://github.com/MedjaiBot/Framework/commit/55b4da4))

## [1.3.2](https://github.com/MedjaiBot/Framework/compare/v1.3.1...v1.3.2) (2019-09-20)


### Bug Fixes

* **ttylogger:** fixed the error method ([c8eb85f](https://github.com/MedjaiBot/Framework/commit/c8eb85f))

## [1.3.1](https://github.com/MedjaiBot/Framework/compare/v1.3.0...v1.3.1) (2019-09-20)


### Bug Fixes

* **ttylogger:** fixed the className check ([a9c161e](https://github.com/MedjaiBot/Framework/commit/a9c161e))

# [1.3.0](https://github.com/MedjaiBot/Framework/compare/v1.2.1...v1.3.0) (2019-07-26)


### Features

* **containerconstants:** added the initializationside constant ([07c96bc](https://github.com/MedjaiBot/Framework/commit/07c96bc))

## [1.2.1](https://github.com/MedjaiBot/Framework/compare/v1.2.0...v1.2.1) (2019-07-26)


### Bug Fixes

* **pluginmanager:** fixed the file stats call ([09d71d9](https://github.com/MedjaiBot/Framework/commit/09d71d9))

# [1.2.0](https://github.com/MedjaiBot/Framework/compare/v1.1.2...v1.2.0) (2019-07-26)


### Features

* **plugins:** Added the InitializationContext ([3b3edf4](https://github.com/MedjaiBot/Framework/commit/3b3edf4))

## [1.1.2](https://github.com/MedjaiBot/Framework/compare/v1.1.1...v1.1.2) (2019-07-19)


### Bug Fixes

* **TravisCI:** Fixed copy before deploy ([0fbc80e](https://github.com/MedjaiBot/Framework/commit/0fbc80e))
* **TravisCI:** Fixed deployment step ([8701282](https://github.com/MedjaiBot/Framework/commit/8701282))
* **TravisCI:** Fixed TravisCI config ([ddd858e](https://github.com/MedjaiBot/Framework/commit/ddd858e))
* **TravisCI:** Hopefully fixed the release of the NPM package ([a76cf8e](https://github.com/MedjaiBot/Framework/commit/a76cf8e))

## [1.1.1](https://github.com/MedjaiBot/Framework/compare/v1.1.0...v1.1.1) (2019-07-19)


### Bug Fixes

* **Release:** Fixed release step on TravisCi ([ea7eef7](https://github.com/MedjaiBot/Framework/commit/ea7eef7))

# [1.1.0](https://github.com/MedjaiBot/Framework/compare/v1.0.1...v1.1.0) (2019-07-19)


### Features

* **TypeScript:** Generate declaration files ([ff5ff42](https://github.com/MedjaiBot/Framework/commit/ff5ff42))

## [1.0.1](https://github.com/MedjaiBot/Framework/compare/v1.0.0...v1.0.1) (2019-07-19)


### Bug Fixes

* **PluginManager:** Fixed import for the Extras file ([cdc1b29](https://github.com/MedjaiBot/Framework/commit/cdc1b29))

# 1.0.0 (2019-05-17)


### Features

* **EventManager:** Added Event and EventManager ([9a692db](https://github.com/MedjaiBot/Framework/commit/9a692db))
* **Logger:** Added Loglevel and Logger ([c302b42](https://github.com/MedjaiBot/Framework/commit/c302b42))
* **PluginManager:** Added Plugin and PluginManager ([a356928](https://github.com/MedjaiBot/Framework/commit/a356928))
