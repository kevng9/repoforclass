import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Container} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import TTTBoard from './src/TTTBoard';
import Win from './src/Win';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      board:[0,0,0,0,0,0,0,0,0], //0=none, 1=circle, 2=cross
      currentPlayer:1,
      turnNumber:1,
      currentBoard:99,
      winner:0,
    }
  }

  checkBoard(){
    //check if there are any winners, if so return the winning player
    //0,1,2
    //3,4,5
    //6,7,8
    //winning combo rows(012,345,678) columns(036,147,258) diag(048,246)
    //return 0 for no winners
    //rows
    if(this.state.board[0]==this.state.board[1] && this.state.board[1]==this.state.board[2] && this.state.board[0]!=0){this.setState({winner:this.state.board[0]})}
    if(this.state.board[3]==this.state.board[4] && this.state.board[4]==this.state.board[5] && this.state.board[3]!=0){this.setState({winner:this.state.board[3]})}
    if(this.state.board[6]==this.state.board[7] && this.state.board[7]==this.state.board[8] && this.state.board[6]!=0){this.setState({winner:this.state.board[6]})}
    //columns
    if(this.state.board[0]==this.state.board[3] && this.state.board[3]==this.state.board[6] && this.state.board[0]!=0){this.setState({winner:this.state.board[0]})}
    if(this.state.board[1]==this.state.board[4] && this.state.board[4]==this.state.board[7] && this.state.board[1]!=0){this.setState({winner:this.state.board[1]})}
    if(this.state.board[2]==this.state.board[5] && this.state.board[5]==this.state.board[8] && this.state.board[2]!=0){this.setState({winner:this.state.board[2]})}
    //diagonals
    if(this.state.board[0]==this.state.board[4] && this.state.board[4]==this.state.board[8] && this.state.board[0]!=0){this.setState({winner:this.state.board[0]})}
    if(this.state.board[2]==this.state.board[4] && this.state.board[4]==this.state.board[6] && this.state.board[2]!=0){this.setState({winner:this.state.board[2]})}

    //code draw condition*
    if (this.state.board.includes(0)==true){
      this.setState({winner:0});
    }else{
      this.setState({winner:3});
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

  renderCell(board){
    console.log(board, this.state.board[board]);
    if(this.state.board[board] != 0)
      {
        return <Win player={this.state.board[board]}/>;
      }
      else {
        return <TTTBoard style={styles.board} currentPlayer = {this.state.currentPlayer}
      processTurn = {this.processTurn.bind(this)} boardNo = {board} enabled = {this.checkActive(board)}/>;
    }
  }

  render() {
    return (
      <Container style={styles.gridStyle}>
        <Grid>
          <Row style={[styles.gridStyle,{borderBottomWidth: 1, borderBottomColor: '#000'}]}>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.renderCell(0)}
            </Col>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.renderCell(1)}
            </Col>
            <Col style={styles.gridStyle}>
              {this.renderCell(2)}
            </Col>
          </Row>
          <Row style={[styles.gridStyle,{borderBottomWidth: 1, borderBottomColor: '#000'}]}>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.renderCell(3)}
            </Col>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.renderCell(4)}
            </Col>
            <Col style={styles.gridStyle}>
              {this.renderCell(5)}
            </Col>
          </Row>
          <Row style={styles.gridStyle}>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.renderCell(6)}
            </Col>
            <Col style={[styles.gridStyle,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.renderCell(7)}
            </Col>
            <Col style={styles.gridStyle}>
              {this.renderCell(8)}
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
