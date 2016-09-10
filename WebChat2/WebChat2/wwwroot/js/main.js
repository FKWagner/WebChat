webpackJsonp([0],[
/* 0 */
/*!********************!*\
  !*** ./app/App.js ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _HelloWorld = __webpack_require__(/*! ./components/HelloWorld */ 1);
	
	var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/*!**************************************!*\
  !*** ./app/components/HelloWorld.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 35);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GroceryList = function (_Component) {
	    _inherits(GroceryList, _Component);
	
	    function GroceryList() {
	        _classCallCheck(this, GroceryList);
	
	        return _possibleConstructorReturn(this, (GroceryList.__proto__ || Object.getPrototypeOf(GroceryList)).apply(this, arguments));
	    }
	
	    _createClass(GroceryList, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'ul',
	                null,
	                _react2.default.createElement(
	                    ListItem,
	                    { quantity: '1' },
	                    'Bread'
	                ),
	                _react2.default.createElement(
	                    ListItem,
	                    { quantity: '6' },
	                    'Eggs'
	                ),
	                _react2.default.createElement(
	                    ListItem,
	                    { quantity: '2' },
	                    'Milk'
	                )
	            );
	        }
	    }]);
	
	    return GroceryList;
	}(_react.Component);
	
	var ListItem = function (_Component2) {
	    _inherits(ListItem, _Component2);
	
	    function ListItem() {
	        _classCallCheck(this, ListItem);
	
	        return _possibleConstructorReturn(this, (ListItem.__proto__ || Object.getPrototypeOf(ListItem)).apply(this, arguments));
	    }
	
	    _createClass(ListItem, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'li',
	                null,
	                this.props.quantity,
	                'x ',
	                this.props.children
	            );
	        }
	    }]);
	
	    return ListItem;
	}(_react.Component);
	
	(0, _reactDom.render)(_react2.default.createElement(GroceryList, null), document.getElementById("root"));

/***/ }
]);
//# sourceMappingURL=main.js.map