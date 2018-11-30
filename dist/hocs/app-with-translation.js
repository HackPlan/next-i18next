"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _router = _interopRequireDefault(require("next/router"));

var _reactI18next = require("react-i18next");

var _utils = require("../utils");

function _default(WrappedComponent) {
  var config = this.config,
      i18n = this.i18n;
  return (
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inherits2.default)(_class, _React$Component);

      function _class() {
        var _this;

        (0, _classCallCheck2.default)(this, _class);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).call(this));

        if (config.localeSubpaths) {
          i18n.on('languageChanged', function (lng) {
            if (process.browser) {
              var originalRoute = window.location.pathname;

              var _lngPathCorrector = (0, _utils.lngPathCorrector)(config, i18n, originalRoute, lng),
                  _lngPathCorrector2 = (0, _slicedToArray2.default)(_lngPathCorrector, 2),
                  href = _lngPathCorrector2[0],
                  as = _lngPathCorrector2[1];

              if (as !== originalRoute) {
                _router.default.replace(href, as, {
                  shallow: true
                });
              }
            }
          });
        }

        return _this;
      }

      (0, _createClass2.default)(_class, [{
        key: "render",
        value: function render() {
          var _this$props = this.props,
              initialLanguage = _this$props.initialLanguage,
              initialI18nStore = _this$props.initialI18nStore;

          if (!process.browser) {
            initialLanguage = i18n.language;
            initialI18nStore = i18n.store.data;
          }

          return _react.default.createElement(_reactI18next.I18nextProvider, {
            i18n: i18n,
            initialLanguage: initialLanguage,
            initialI18nStore: initialI18nStore
          }, _react.default.createElement(WrappedComponent, this.props));
        }
      }], [{
        key: "getInitialProps",
        value: function () {
          var _getInitialProps = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee(_ref) {
            var Component, ctx, pageProps, req, initialI18nStore, initialLanguage, _req$i18n$languages;

            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    Component = _ref.Component, ctx = _ref.ctx;
                    // Recompile pre-existing getInitialProps
                    pageProps = {};

                    if (!Component.getInitialProps) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 5;
                    return Component.getInitialProps(ctx);

                  case 5:
                    pageProps = _context.sent;

                  case 6:
                    // Initiate vars to return
                    req = ctx.req;
                    initialI18nStore = {};
                    initialLanguage = null; // Load translations to serialize if we're serverside

                    if (!(req && req.i18n)) {
                      _context.next = 17;
                      break;
                    }

                    _req$i18n$languages = (0, _slicedToArray2.default)(req.i18n.languages, 1);
                    initialLanguage = _req$i18n$languages[0];
                    _context.next = 14;
                    return i18n.changeLanguage(initialLanguage);

                  case 14:
                    req.i18n.languages.forEach(function (l) {
                      initialI18nStore[l] = {};
                      i18n.nsFromReactTree.forEach(function (ns) {
                        initialI18nStore[l][ns] = (req.i18n.services.resourceStore.data[l] || {})[ns] || {};
                      });
                    });
                    _context.next = 21;
                    break;

                  case 17:
                    _context.next = 19;
                    return Promise.all(i18n.nsFromReactTree.filter(function (ns) {
                      return !i18n.hasResourceBundle(i18n.languages[0], ns);
                    }).map(function (ns) {
                      return new Promise(function (resolve) {
                        return i18n.loadNamespaces(ns, function () {
                          return resolve();
                        });
                      });
                    }));

                  case 19:
                    initialI18nStore = i18n.store.data;
                    initialLanguage = i18n.language;

                  case 21:
                    return _context.abrupt("return", {
                      initialI18nStore: initialI18nStore,
                      initialLanguage: initialLanguage,
                      pageProps: pageProps
                    });

                  case 22:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          return function getInitialProps(_x) {
            return _getInitialProps.apply(this, arguments);
          };
        }()
      }]);
      return _class;
    }(_react.default.Component)
  );
}