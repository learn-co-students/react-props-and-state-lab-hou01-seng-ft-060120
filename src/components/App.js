import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  fetchPets() {
    const type = this.state.filters.type 
    fetch(type === 'all' ? `/api/pets` : `/api/pets?type=${type}`)
    .then(res => res.json())
    .then(pets => this.setState({ pets: pets}))
  }

  componentDidMount() {
    this.fetchPets()
  }

  onFindPetsClick = () => {
    this.fetchPets()
  }

  onChangeType = (e) => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  onAdoptPet = (id) => {
    const pets = this.state.pets.map((petObject) => {
      const newPet = {... petObject };
      if (newPet.id === id) {
        newPet.isAdopted = true;
      }
      return newPet;
    })
    this.setState({ pets })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              pets={this.state.pets}
              onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
