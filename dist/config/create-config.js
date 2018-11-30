"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defaultConfig = _interopRequireDefault(require("./default-config"));

var _detectNode = _interopRequireDefault(require("detect-node"));

var _default = function _default(userConfig) {
  var combinedConfig = (0, _objectSpread2.default)({}, _defaultConfig.default, userConfig);
  combinedConfig.allLanguages = combinedConfig.otherLanguages.concat([combinedConfig.defaultLanguage]);

  if (_detectNode.default && !process.browser) {
    var fs = eval("require('fs')"); // eslint-disable-line

    var path = require('path');

    var getAllNamespaces = function getAllNamespaces(p) {
      return fs.readdirSync(p).map(function (file) {
        return file.replace('.json', '');
      });
    };

    var _combinedConfig = combinedConfig,
        allLanguages = _combinedConfig.allLanguages,
        defaultLanguage = _combinedConfig.defaultLanguage,
        localePath = _combinedConfig.localePath,
        localeStructure = _combinedConfig.localeStructure;
    combinedConfig = (0, _objectSpread2.default)({}, combinedConfig, {
      preload: allLanguages,
      ns: getAllNamespaces(path.join(process.cwd(), "".concat(localePath, "/").concat(defaultLanguage))),
      backend: {
        loadPath: path.join(process.cwd(), "".concat(localePath, "/").concat(localeStructure, ".json")),
        addPath: path.join(process.cwd(), "".concat(localePath, "/").concat(localeStructure, ".missing.json"))
      }
    });
  }

  return combinedConfig;
};

exports.default = _default;