"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _link = _interopRequireDefault(require("next/link"));

/*
  This `Link` component is a wrap of the standard
  NextJs `Link` component, with some simple lang
  redirect logic in place.

  If you haven't already, read this issue comment:
  https://github.com/zeit/next.js/issues/2833#issuecomment-414919347

  This component automatically provides this functionality:
  <Link href="/product?slug=something" as="/products/something">

  Wherein `slug` is actually our i18n lang, and it gets
  pulled automatically.

  Very important: if you import `Link` from NextJs directly,
  and not this file, your lang subpath routing will break.
*/
function _default() {
  var config = this.config,
      i18n = this.i18n;

  var Link =
  /*#__PURE__*/
  function (_React$Component) {
    (0, _inherits2.default)(Link, _React$Component);

    function Link() {
      (0, _classCallCheck2.default)(this, Link);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Link).apply(this, arguments));
    }

    (0, _createClass2.default)(Link, [{
      key: "render",
      value: function render() {
        var defaultLanguage = config.defaultLanguage,
            localeSubpaths = config.localeSubpaths;
        var _this$props = this.props,
            children = _this$props.children,
            href = _this$props.href;
        var lng = i18n.languages[0];

        if (localeSubpaths && lng !== defaultLanguage) {
          return _react.default.createElement(_link.default, {
            href: "".concat(href, "?lng=").concat(lng),
            as: "/".concat(lng).concat(href)
          }, children);
        }

        return _react.default.createElement(_link.default, {
          href: href
        }, children);
      }
    }]);
    return Link;
  }(_react.default.Component);

  Link.propTypes = {
    children: _propTypes.default.node.isRequired,
    href: _propTypes.default.string.isRequired
    /*
      Usage of `withNamespaces` here is just to
      force `Link` to rerender on language change
    */

  };
  return this.withNamespaces()(Link);
}