import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {Container, Header, Content, Footer, Icon, Button, Text} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import styles from './assets/Styles';


export default class TTTBoard extends Component{
  constructor(props){
    super(props);
    this.state = {
      board:[0,0,0,0,0,0,0,0,0] //0=empty, 1=O, 2=X
      //0,1,2
      //3,4,5
      //6,7,8
      //winning combo rows(012,345,678) columns(036,147,258) diag(048,246)
    }
  }

  determineCell(cell){
      switch(this.state.board[cell]){
        case 1: return <Icon type='Entypo' name='circle'/>;
                break;
        case 2: return <Icon type='Entypo' name='cross'/>;
                break;
        default: if(this.props.enabled == true)
                 {return <Button block light onPress={this.selectCell.bind(this,cell)}><Text></Text></Button>;}
                 else {return <Text></Text>;}
      }
  }

  checkBoard(){
    //check if there are any winners, if so return the winning player
    //0,1,2
    //3,4,5
    //6,7,8
    //winning combo rows(012,345,678) columns(036,147,258) diag(048,246)
    //return 0 for no winners
    if(this.state.board[0]==this.state.board[1] && this.state.board[1]==this.state.board[2]){return this.state.board[0]}
    if(this.state.board[3]==this.state.board[4] && this.state.board[4]==this.state.board[5]){return this.state.board[3]}
    if(this.state.board[6]==this.state.board[7] && this.state.board[7]==this.state.board[8]){return this.state.board[6]}

    if(this.state.board[0]==this.state.board[3] && this.state.board[3]==this.state.board[6]){return this.state.board[0]}
    if(this.state.board[1]==this.state.board[4] && this.state.board[4]==this.state.board[7]){return this.state.board[1]}
    if(this.state.board[2]==this.state.board[5] && this.state.board[5]==this.state.board[8]){return this.state.board[2]}

    if(this.state.board[0]==this.state.board[4] && this.state.board[4]==this.state.board[8]){return this.state.board[0]}
    if(this.state.board[2]==this.state.board[4] && this.state.board[4]==this.state.board[6]){return this.state.board[2]}

    return 0;
}

  selectCell(cell){
    currentBoard = [...this.state.board];
    currentBoard[cell] = this.props.currentPlayer;
    this.setState({board:currentBoard}
     , ()=>{//console.log(this.state.board);
      winner = this.checkBoard();
      console.log(winner);
      this.props.processTurn(winner, cell); //cell would tell the app which board to play next
    });
  }

  render(){
    return(
      <Grid>
        <Row style={[styles.cellRow, {borderBottomWidth: 1, borderBottomColor: '#000'}]}>
          <Col style={[styles.cellColumn,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.determineCell(0)}
          </Col>
          <Col style={[styles.cellColumn,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.determineCell(1)}
          </Col>
          <Col style={styles.cellColumn}>
              {this.determineCell(2)}
          </Col>
        </Row>
        <Row style={[styles.cellRow, {borderBottomWidth: 1, borderBottomColor: '#000'}]}>
          <Col style={[styles.cellColumn,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.determineCell(3)}
          </Col>
          <Col style={[styles.cellColumn,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.determineCell(4)}
          </Col>
          <Col style={styles.cellColumn}>
            {this.determineCell(5)}
        </Col>
        </Row>
        <Row style={styles.cellRow}>
          <Col style={[styles.cellColumn,{borderRightWidth: 1,borderRightColor: '#000'}]}>
              {this.determineCell(6)}
          </Col>
          <Col style={[styles.cellColumn,{borderRightWidth: 1,borderRightColor: '#000'}]}>
            {this.determineCell(7)}
        </Col>
          <Col style={styles.cellColumn}>
            {this.determineCell(8)}
        </Col>
        </Row>
      </Grid>
    );
  }
}
