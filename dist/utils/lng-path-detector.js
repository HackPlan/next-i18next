"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(req, res, next) {
  if (req.i18n) {
    var language = req.i18n.languages[0];
    var _req$i18n$options = req.i18n.options,
        allLanguages = _req$i18n$options.allLanguages,
        defaultLanguage = _req$i18n$options.defaultLanguage;
    /*
      If a user has hit a subpath which does not
      match their language, give preference to
      the path, and change user language.
    */

    allLanguages.forEach(function (lng) {
      if (req.url.startsWith("/".concat(lng, "/")) && language !== lng) {
        req.i18n.changeLanguage(lng);
      }
    });
    /*
      If a user has hit the root path and their
      language is not set to default, give
      preference to the path and reset their
      language.
    */

    if (language !== defaultLanguage && !req.url.startsWith("/".concat(language, "/"))) {
      req.i18n.changeLanguage(defaultLanguage);
    }
    /*
      If a user has a default language prefix
      in their URL, strip it.
    */


    if (language === defaultLanguage && req.url.startsWith("/".concat(defaultLanguage, "/"))) {
      res.redirect(301, req.url.replace("/".concat(defaultLanguage, "/"), '/'));
    }
  }

  next();
};

exports.default = _default;