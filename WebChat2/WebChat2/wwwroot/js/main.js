webpackJsonp([0],{

/***/ 0:
/*!********************!*\
  !*** ./app/App.js ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 34);
	
	var _KanbanBoardContainer = __webpack_require__(/*! ./Components/KanbanBoardContainer */ 172);
	
	var _KanbanBoardContainer2 = _interopRequireDefault(_KanbanBoardContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var cardsList = [{
	    id: 1,
	    title: "Read the Book",
	    description: "I should read the **whole** book and the online extensions",
	    color: "#BD8D31",
	    status: "in-progress",
	    tasks: []
	}, {
	    id: 2,
	    title: "Write some code",
	    description: "Code along with the samples in the book. The complete source code can be found at [github](https://github.com/pro-react)",
	    color: "#3A7E28",
	    status: "todo",
	    tasks: [{
	        id: 1,
	        name: "ContactList Example",
	        done: true
	    }, {
	        id: 2,
	        name: "Kanban Example",
	        done: false
	    }, {
	        id: 3,
	        name: "My own experiments",
	        done: false
	    }]
	}, {
	    id: 3,
	    title: "This is a new card with a very long title, thus having more then 80 charaters lets throw a warning",
	    description: "Show custom propType failure",
	    color: "#AFFE",
	    status: "done",
	    tasks: []
	}];
	
	(0, _reactDom.render)(_react2.default.createElement(_KanbanBoardContainer2.default, null), document.getElementById('root'));

/***/ },

/***/ 172:
/*!************************************************!*\
  !*** ./app/Components/KanbanBoardContainer.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactAddonsUpdate = __webpack_require__(/*! react-addons-update */ 475);
	
	var _reactAddonsUpdate2 = _interopRequireDefault(_reactAddonsUpdate);
	
	__webpack_require__(/*! whatwg-fetch */ 178);
	
	__webpack_require__(/*! babel-polyfill */ 179);
	
	var _KanbanBoard = __webpack_require__(/*! ./KanbanBoard */ 173);
	
	var _KanbanBoard2 = _interopRequireDefault(_KanbanBoard);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var API_URL = 'http://kanbanapi.pro-react.com';
	var API_HEADERS = {
	    'Content-Type': 'application/json',
	    Authorization: 'FWagner-education-test'
	};
	
	var KanbanBoardContainer = function (_Component) {
	    _inherits(KanbanBoardContainer, _Component);
	
	    function KanbanBoardContainer() {
	        _classCallCheck(this, KanbanBoardContainer);
	
	        var _this = _possibleConstructorReturn(this, (KanbanBoardContainer.__proto__ || Object.getPrototypeOf(KanbanBoardContainer)).apply(this, arguments));
	
	        _this.state = {
	            cards: []
	        };
	        return _this;
	    }
	
	    _createClass(KanbanBoardContainer, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;
	
	            fetch(API_URL + '/cards', { headers: API_HEADERS }).then(function (response) {
	                return response.json();
	            }).then(function (responseData) {
	                _this2.setState({ cards: responseData });
	            }).catch(function (error) {
	                console.log('Error fetching and parsing data', error);
	            });
	
	            window.state = this.state;
	        }
	    }, {
	        key: 'addTask',
	        value: function addTask(cardId, taskName) {
	            var _this3 = this;
	
	            var prevState = this.state;
	
	            var cardIndex = this.state.cards.findIndex(function (card) {
	                return card.id == cardId;
	            });
	
	            var newTask = { id: Date.now(), name: taskName, done: false };
	
	            var nextState = (0, _reactAddonsUpdate2.default)(this.state.cards, _defineProperty({}, cardIndex, {
	                tasks: { $push: [newTask] }
	            }));
	
	            this.setState({ cards: nextState });
	
	            fetch(API_URL + '/cards/' + cardId + '/tasks', {
	                method: 'post',
	                headers: API_HEADERS,
	                body: JSON.stringify(newTask)
	            })
	            // promises running inside :)
	            .then(function (response) {
	                if (response.ok) {
	                    return response.json();
	                } else {
	                    throw new Error("Server response wasn't OK");
	                }
	            }).then(function (responseData) {
	                // When server returns the definitve ID used for the new Task on the server, update it on React
	                newTask.id = responseData.id;
	                _this3.setState({ cards: nextState });
	            }).catch(function (error) {
	                _this3.setState(prevState);
	            });
	        }
	    }, {
	        key: 'deleteTask',
	        value: function deleteTask(cardId, taskId, taskIndex) {
	            var _this4 = this;
	
	            // Keep a reference to the original state prioir to the mutations in case you need to revert the optimistic changes in the UI
	            var prevState = this.state;
	
	            // Find the index of the card
	            var cardIndex = this.state.cards.findIndex(function (card) {
	                return card.id == cardId;
	            });
	
	            // Create a new object without the task
	            var nextState = (0, _reactAddonsUpdate2.default)(this.state.cards, _defineProperty({}, cardIndex, {
	                tasks: { $splice: [[taskIndex, 1]] }
	            }));
	
	            this.setState({ cards: nextState });
	
	            // Call this API and remove the object server side
	            fetch(API_URL + '/cards/' + cardId + '/tasks/' + taskId, {
	                method: 'delete',
	                headers: API_HEADERS
	            }).then(function (response) {
	                if (!response.ok) {
	                    // throw an error if server response wasn't OK so you can revert back the optimistic changes made to the UI
	                    throw new Error("Server response wasn't OK");
	                }
	            }).catch(function (error) {
	                console.error("Fetch error:", error);
	                _this4.setState(prevState);
	            });
	        }
	    }, {
	        key: 'toggleTask',
	        value: function toggleTask(cardId, taskId, taskIndex) {
	            var _this5 = this;
	
	            var prevState = this.state;
	
	            // Find the index of the card
	            var cardIndex = this.state.cards.findIndex(function (card) {
	                return card.id == cardId;
	            });
	
	            var newDoneValue = void 0;
	
	            var nextState = (0, _reactAddonsUpdate2.default)(this.state.cards, _defineProperty({}, cardIndex, {
	                tasks: _defineProperty({}, taskIndex, {
	                    done: { $apply: function $apply(done) {
	                            newDoneValue = !done;
	                            return newDoneValue;
	                        } }
	                })
	            }));
	
	            this.setState({ cards: nextState });
	
	            // Update server site
	            fetch(API_URL + '/cards/' + cardId + '/tasks/' + taskId, {
	                method: 'put',
	                headers: API_HEADERS,
	                body: JSON.stringify({ done: newDoneValue })
	            }).then(function (response) {
	                if (!response.ok) {
	                    throw new Error("Server response wasn't OK");
	                }
	            }).catch(function (error) {
	                console.error("Fetch error:", error);
	                _this5.setState(prevState);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(_KanbanBoard2.default, { cards: this.state.cards,
	                taskCallbacks: {
	                    toggle: this.toggleTask.bind(this),
	                    delete: this.deleteTask.bind(this),
	                    add: this.addTask.bind(this) } });
	        }
	    }]);
	
	    return KanbanBoardContainer;
	}(_react.Component);
	
	exports.default = KanbanBoardContainer;

/***/ },

/***/ 173:
/*!***************************************!*\
  !*** ./app/Components/KanbanBoard.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _List = __webpack_require__(/*! ./List */ 174);
	
	var _List2 = _interopRequireDefault(_List);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var KanbanBoard = function (_Component) {
	    _inherits(KanbanBoard, _Component);
	
	    function KanbanBoard() {
	        _classCallCheck(this, KanbanBoard);
	
	        return _possibleConstructorReturn(this, (KanbanBoard.__proto__ || Object.getPrototypeOf(KanbanBoard)).apply(this, arguments));
	    }
	
	    _createClass(KanbanBoard, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'app' },
	                _react2.default.createElement(_List2.default, { id: 'todo',
	                    title: 'To Do',
	                    taskCallbacks: this.props.taskCallbacks,
	                    cards: this.props.cards.filter(function (card) {
	                        return card.status === "todo";
	                    }) }),
	                _react2.default.createElement(_List2.default, { id: 'in-progress',
	                    title: 'In Progress',
	                    taskCallbacks: this.props.taskCallbacks,
	                    cards: this.props.cards.filter(function (card) {
	                        return card.status === "in-progress";
	                    }) }),
	                _react2.default.createElement(_List2.default, { id: 'done',
	                    title: 'Done',
	                    taskCallbacks: this.props.taskCallbacks,
	                    cards: this.props.cards.filter(function (card) {
	                        return card.status === "done";
	                    }) })
	            );
	        }
	    }]);
	
	    return KanbanBoard;
	}(_react.Component);
	
	KanbanBoard.propTypes = {
	    cards: _react.PropTypes.arrayOf(_react.PropTypes.object),
	    taskCallbacks: _react.PropTypes.object
	};
	
	exports.default = KanbanBoard;

/***/ },

/***/ 174:
/*!********************************!*\
  !*** ./app/Components/List.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Card = __webpack_require__(/*! ./Card */ 175);
	
	var _Card2 = _interopRequireDefault(_Card);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var List = function (_Component) {
	    _inherits(List, _Component);
	
	    function List() {
	        _classCallCheck(this, List);
	
	        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
	    }
	
	    _createClass(List, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var cards = this.props.cards.map(function (card) {
	                return _react2.default.createElement(_Card2.default, _extends({ key: card.id,
	                    taskCallbacks: _this2.props.taskCallbacks
	                }, card));
	            });
	
	            return _react2.default.createElement(
	                'div',
	                { className: 'list' },
	                _react2.default.createElement(
	                    'h1',
	                    null,
	                    this.props.title
	                ),
	                cards
	            );
	        }
	    }]);
	
	    return List;
	}(_react.Component);
	
	List.propTypes = {
	    title: _react.PropTypes.string.isRequired,
	    cards: _react.PropTypes.arrayOf(_react.PropTypes.object),
	    taskCallbacks: _react.PropTypes.object
	};
	
	exports.default = List;

/***/ },

/***/ 175:
/*!********************************!*\
  !*** ./app/Components/Card.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _CheckList = __webpack_require__(/*! ./CheckList */ 176);
	
	var _CheckList2 = _interopRequireDefault(_CheckList);
	
	var _marked = __webpack_require__(/*! marked */ 177);
	
	var _marked2 = _interopRequireDefault(_marked);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var titlePropType = function titlePropType(props, propName, componentName) {
	    if (props[propName]) {
	        var value = props[propName];
	        if (typeof value !== 'string' || value.length > 80) {
	            return new Error(propName + ' in ' + componentName + ' is longer than 80 characters');
	        }
	    }
	};
	
	var Card = function (_Component) {
	    _inherits(Card, _Component);
	
	    function Card() {
	        _classCallCheck(this, Card);
	
	        var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
	
	        _this.state = {
	            showDetails: false
	        };
	        return _this;
	    }
	
	    _createClass(Card, [{
	        key: 'toggleDetails',
	        value: function toggleDetails() {
	            this.setState({ showDetails: !this.state.showDetails });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var cardDetails = void 0;
	            if (this.state.showDetails) {
	                cardDetails = _react2.default.createElement(
	                    'div',
	                    { className: 'card__details' },
	                    _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: (0, _marked2.default)(this.props.description) } }),
	                    _react2.default.createElement(_CheckList2.default, { cardId: this.props.id,
	                        tasks: this.props.tasks,
	                        taskCallbacks: this.props.taskCallbacks })
	                );
	            }
	
	            var sideColor = {
	                position: 'absolute',
	                zIndex: -1,
	                top: 0,
	                bottom: 0,
	                left: 0,
	                width: 7,
	                backgroundColor: this.props.color
	            };
	
	            return _react2.default.createElement(
	                'div',
	                { className: 'card' },
	                _react2.default.createElement('div', { style: sideColor }),
	                _react2.default.createElement(
	                    'div',
	                    { className: this.state.showDetails ? "card__title card__title--is-open" : "card__title" // End of line comment
	                        /* Nomral JS Comment */
	                        , onClick: this.toggleDetails.bind(this) },
	                    this.props.title
	                ),
	                cardDetails
	            );
	        }
	    }]);
	
	    return Card;
	}(_react.Component);
	
	Card.propTypes = {
	    id: _react.PropTypes.number,
	    title: titlePropType,
	    description: _react.PropTypes.string,
	    color: _react.PropTypes.string,
	    tasks: _react.PropTypes.arrayOf(_react.PropTypes.object),
	    taskCallbacks: _react.PropTypes.object
	};
	
	exports.default = Card;

/***/ },

/***/ 176:
/*!*************************************!*\
  !*** ./app/Components/CheckList.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(/*! react */ 1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CheckList = function (_Component) {
	    _inherits(CheckList, _Component);
	
	    function CheckList() {
	        _classCallCheck(this, CheckList);
	
	        return _possibleConstructorReturn(this, (CheckList.__proto__ || Object.getPrototypeOf(CheckList)).apply(this, arguments));
	    }
	
	    _createClass(CheckList, [{
	        key: 'checkInputKeyPress',
	        value: function checkInputKeyPress(evt) {
	            if (evt.key === 'Enter') {
	                this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
	                evt.target.value = '';
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;
	
	            var tasks = this.props.tasks.map(function (task, taskIndex) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: task.id, className: 'checklist__task' },
	                    _react2.default.createElement('input', { type: 'checkbox', checked: task.done, onChange: _this2.props.taskCallbacks.toggle.bind(null, _this2.props.cardId, task.id, taskIndex) }),
	                    task.name,
	                    _react2.default.createElement('a', { href: '#', className: 'checklist__task--remove', onClick: _this2.props.taskCallbacks.delete.bind(null, _this2.props.cardId, task.id, taskIndex) })
	                );
	            });
	
	            return _react2.default.createElement(
	                'div',
	                { className: 'checklist' },
	                _react2.default.createElement(
	                    'ul',
	                    null,
	                    tasks
	                ),
	                _react2.default.createElement('input', { type: 'text',
	                    className: 'checklist--add-task',
	                    placeholder: 'Type then hit Enter to add a task',
	                    onKeyPress: this.checkInputKeyPress.bind(this) })
	            );
	        }
	    }]);
	
	    return CheckList;
	}(_react.Component);
	
	CheckList.propTypes = {
	    cardId: _react.PropTypes.number,
	    tasks: _react.PropTypes.arrayOf(_react.PropTypes.object)
	};
	
	exports.default = CheckList;

/***/ }

});
//# sourceMappingURL=main.js.map