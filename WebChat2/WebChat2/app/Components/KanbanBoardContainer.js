import React, {Component} from 'react'
import update from 'react-addons-update'
import 'whatwg-fetch'
import 'babel-polyfill'
import {throttle} from '../utils'
import KanbanBoard from './KanbanBoard'

const API_URL = 'http://kanbanapi.pro-react.com'
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'FWagner-education-test'
}

class KanbanBoardContainer extends Component {
    constructor(){
        super(...arguments)
        this.state = {
            cards:[],
        }

        // only call updateCardStatus when arguments changed
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this))
        // Call updateCardPosition at max every 500ms (or when arguments changed)
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500)
    }

    componentDidMount() {
        fetch(`${API_URL}/cards`, {headers: API_HEADERS})
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({cards: responseData})
        })
        .catch((error) => {
            console.log('Error fetching and parsing data', error)
        })

        window.state = this.state
    }

    addTask(cardId, taskName) {
        let prevState = this.state

        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId)

        let newTask = {id: Date.now(), name: taskName, done: false}

        let nextState = update(this.state.cards, {
                            [cardIndex]: {
                                tasks: {$push: [newTask] }
                            }
                        })
        
        this.setState({cards: nextState})

        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        // promises running inside :)
        .then((response) => {
            if(response.ok) {
                return response.json()
            } else {
                throw new Error ("Server response wasn't OK")
            }
        })
        .then((responseData) => {
            // When server returns the definitve ID used for the new Task on the server, update it on React
            newTask.id = responseData.id
            this.setState({cards: nextState})
        })
        .catch((error) => {
            this.setState(prevState)
        })
    }

    deleteTask(cardId, taskId, taskIndex) {
        // Keep a reference to the original state prioir to the mutations in case you need to revert the optimistic changes in the UI
        let prevState = this.state

        // Find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId)

        // Create a new object without the task
        let nextState = update(this.state.cards, {
                                [cardIndex]: {
                                    tasks: {$splice: [[taskIndex,1]] }
                                }
                            })

        this.setState({cards: nextState})

        // Call this API and remove the object server side
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
        .then((response) => {
            if(!response.ok) {
                // throw an error if server response wasn't OK so you can revert back the optimistic changes made to the UI
                throw new Error ( "Server response wasn't OK")
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error)
            this.setState(prevState)
        })
    }

    toggleTask(cardId, taskId, taskIndex) {
        let prevState = this.state

        // Find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId)

        let newDoneValue

        let nextState = update(this.state.cards, {
                                    [cardIndex]: {
                                        tasks: {
                                            [taskIndex]: {
                                                done: { $apply: (done) => {
                                                    newDoneValue = !done
                                                    return newDoneValue
                                                }}
                                            }
                                        }
                                    }
                                })
        
        this.setState({cards: nextState})

        // Update server site
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: newDoneValue})
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error ("Server response wasn't OK")
            }
        })
        .catch((error) => {
            console.error("Fetch error:" , error)
            this.setState(prevState)
        })
    }

    updateCardStatus(cardId, listId) {
        //Find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId)
        // Get the current card
        let card = this.state.cards[cardIndex]
        // Only proceed if hovering over a different listid
        if(card.status !== listId) {
            //set the component state to the mutated object
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: listId }
                    }
                }
            }))
        }
    }

    updateCardPosition(cardId, afterId) {
        // only proceed if hovering over a different card
        if(cardId !== afterId) {
            // Find the index of the card
            let cardIndex = this.state.cards.findIndex((card) => card.id == cardId)
            // Get the current card
            let card = this.state.cards[cardIndex]
            // Find the index of the card the user is hovering over
            let afterIndex = this.state.cards.findIndex((card) => card.id == afterId)
            // Use splice to remove the card and reinsert it a the new index
            this.setState(update(this.state , {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }))
        }
    }
    persistCardDrag(cardId, status) {
        // Find the index of the card
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId)
        // Find the current card
        let card = this.state.cards[cardIndex]

        fetch(`${API_URL}/cards/${cardId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({
                status: card.status,
                row_order_position: cardIndex
            })
        })
        .then((response) => {
            if(!response.ok) {
                throw new Error ("Server response wasn't OK")
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error)
            this.setState(
                update(this.state, {
                    cards: {
                        [cardIndex]: {
                            status: {$set: status}
                        }
                    }
                })
            )
        })
    }

    render() {
        return <KanbanBoard cards={this.state.cards}
                    taskCallbacks={{
                        toggle: this.toggleTask.bind(this),
                        delete: this.deleteTask.bind(this),
                            add: this.addTask.bind(this) }}
                    cardCallbacks={{
                        updateStatus: this.updateCardStatus,
                        updatePosition: this.updateCardPosition,
                        persistCardDrag: this.persistCardDrag.bind(this)
                    }}
                />
    }
}

export default KanbanBoardContainer