import React from 'react'
import {render} from 'react-dom'
import KanbanBoard from './Components/KanbanBoard'

let cardsList = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read the **whole** book and the online extensions",
        status: "in-progress",
        tasks: []
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book. The complete source code can be found at [github](https://github.com/pro-react)",
        status: "todo",
        tasks: [
            {
                id: 1,
                name: "ContactList Example",
                done: true
            },
            {
                id: 2,
                name: "Kanban Example",
                done: false
            },
            {
                id: 3,
                name: "My own experiments",
                done: false
            }
        ]
    },
]

render(<KanbanBoard cards={cardsList} />, document.getElementById('root'))
