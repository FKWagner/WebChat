import React, {Component} from 'react'
import CheckList from './CheckList'

class Card extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            showDetails: false
        }
    }

    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails})
    }

    render() {
        let cardDetails;
        if(this.state.showDetails) {
            cardDetails = (
                <div className="card__details">
                    {this.props.description}
                    <CheckList cardID={this.props.id} tasks={this.props.tasks} />
                </div>
            )
        }

        return(
            <div className="card">
            {/* Need to put {} around comment in Child section - inside a JSX Object no need for this */ }
                <div className={this.state.showDetails? "card__title card__title--is-open" : "card__title"} // End of line comment
                /* Nomral JS Comment */ 
                     onClick={this.toggleDetails.bind(this)}>
                     {this.props.title}
                </div>
              {cardDetails}
            </div>
        )
    }
}

export default Card