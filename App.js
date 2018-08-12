import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Container} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import TTTBoard from './src/TTTBoard';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      board:[0,0,0,0,0,0,0,0,0], //0=none, 1=circle, 2=cross
      currentPlayer:1,
      turnNumber:1,
      currentBoard:99
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Entypo': require('native-base/Fonts/Entypo.ttf')
    });
  }

  async processTurn(winner, nextBoard){
    currentPlayer = this.state.turnNumber%2+1;
    this.setState({currentPlayer:currentPlayer});
    this.setState({turnNumber:this.state.turnNumber+1});

    if (winner != 0){
        newBoard = [...this.state.board];
        newBoard[this.state.currentBoard] = winner;
        await this.setState({board:newBoard}, ()=>{if (this.state.board[nextBoard] != 0) {nextBoard++};});
    }
    while (this.state.board[nextBoard] != 0) {if(nextBoard>8){nextBoard=0}else{nextBoard++}};
    this.setState({currentBoard:nextBoard}, ()=>{ this.render();});
    console.log('main board:',this.state.board);
}

  checkActive(board){
      return ((board == this.state.currentBoard || this.state.currentBoard == 99) && (this.state.board[board] == 0));
  }

  render() {
    return (
      <Container style={styles.gridStyle}>
        <Grid>
          <Row style={[styles.gridStyle,{borderBottomWidth: 1, borderBottomColor: '#000'}]}>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              <TTTBoard style={styles.board} currentPlayer = {this.state.currentPlayer}
                processTurn = {this.processTurn.bind(this)} boardNo = {0} enabled = {this.checkActive(0)}/>
            </Col>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              <TTTBoard style={styles.board} currentPlayer = {this.state.currentPlayer}
                processTurn = {this.processTurn.bind(this)} boardNo = {1} enabled = {this.checkActive(1)}/>
            </Col>
            <Col style={styles.gridStyle}>
              <TTTBoard style={styles.board} currentPlayer = {this.state.currentPlayer}
                processTurn = {this.processTurn.bind(this)} boardNo = {2} enabled = {this.checkActive(2)}/>
            </Col>
          </Row>
          <Row style={[styles.gridStyle,{borderBottomWidth: 1, borderBottomColor: '#000'}]}>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              <TTTBoard style={styles.board} currentPlayer = {this.state.currentPlayer}
                processTurn = {this.processTurn.bind(this)} boardNo = {3} enabled = {this.checkActive(3)}/>
            </Col>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              <TTTBoard style={styles.board} currentPlayer = {this.state.currentPlayer}
                processTurn = {this.processTurn.bind(this)} boardNo = {4} enabled = {this.checkActive(4)}/>
            </Col>
            <Col style={styles.gridStyle}>
              <TTTBoard style={styles.board} currentPlayer = {this.state.currentPlayer}
                processTurn = {this.processTurn.bind(this)} boardNo = {5} enabled = {this.checkActive(5)}/>
            </Col>
          </Row>
          <Row style={styles.gridStyle}>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              <TTTBoard style={styles.board} currentPlayer = {this.state.currentPlayer}
                processTurn = {this.processTurn.bind(this)} boardNo = {6} enabled = {this.checkActive(6)}/>
            </Col>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              <TTTBoard style={styles.board} currentPlayer = {this.state.currentPlayer}
                processTurn = {this.processTurn.bind(this)} boardNo = {7} enabled = {this.checkActive(7)}/>
            </Col>
            <Col style={styles.gridStyle}>
              <TTTBoard style={styles.board} currentPlayer = {this.state.currentPlayer}
                processTurn = {this.processTurn.bind(this)} boardNo = {8} enabled = {this.checkActive(8)}/>
            </Col>
          </Row>
        </Grid>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridStyle:{
    padding:5
  }
});
