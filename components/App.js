// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CardList from './cardList'
import SideBar from './sideBar'
import cards, { newBoard, words } from './words'

export default class App extends React.Component {
  state = {
    remainingRed: 9,
    remainingBlue: 8,
    redScore: 0,
    blueScore: 0,
    teamTurn: 'redTurn',
    reveal: false,
    cards: cards,
    disableCards: false
  }

  revealPush = () => {
    this.setState({
      reveal: !this.state.reveal
    })
  }

  newRound = () => {
    let newCards = newBoard(words);
    this.setState({
      remainingRed: 9,
      remainingBlue: 8,
      teamTurn: 'redTurn',
      disableCards: false,
      cards: newCards,
      reveal: false
    })
  }

  newGame = () => {
    this.setState({
      redScore: 0,
      blueScore: 0,
    }, this.newRound)
  }

  endRound = (winningTeam) => {
    if (winningTeam === 'red') {
      this.setState({
        redScore: this.state.redScore + 1,
        disableCards: true
      })
      alert("Red Team Wins!")
    } else {
      this.setState({
        blueScore: this.state.blueScore + 1,
        disableCards: true
      })
      alert("Blue Team Wins!")
    }
  }

  scorePoint = (team) => {
    if (team === 'red') {
      this.setState({
        remainingRed: this.state.remainingRed - 1,
        teamTurn: this.state.teamTurn === 'redTurn' ? 'blueTurn' : 'redTurn'
      }, () => {
        if (!this.state.remainingRed) this.endRound('red')
      })

    } else if (team === 'blue') {
      this.setState({
        remainingBlue: this.state.remainingBlue - 1,
        teamTurn: this.state.teamTurn === 'redTurn' ? 'blueTurn' : 'redTurn'
      }, () => {
        if (!this.state.remainingBlue) this.endRound('blue')
      })

    } else if (team === 'assasin') {
      if (this.state.teamTurn === 'redTurn') {
        this.endRound('blue')
      } else {
        this.endRound('red')
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SideBar
          myState={this.state}
          revealPush={this.revealPush}
          reveal={this.state.reveal}
          newRound={this.newRound}
          newGame={this.newGame}
        />
        <CardList
          scorePoint={this.scorePoint}
          reveal={this.state.reveal}
          cards={this.state.cards}
          disableCards={this.state.disableCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
});

