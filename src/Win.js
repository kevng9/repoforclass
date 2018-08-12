import React, { Component } from 'react';
import {
  View
} from 'react-native';
import {Container, Header, Content, Footer, Icon, Button, Text} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import styles from './assets/Styles';

export default class TTTBoard extends Component{
  render() {
    if(this.props.player == 1){
    return (
      <Container style={styles.winContainer}>
          <Icon type='Entypo' name='circle' style={styles.winIcon}/>;
      </Container>
    );} else {
    return (
      <Container style={styles.winContainer}>
          <Icon type='Entypo' name='cross' style={styles.winIcon}/>;
      </Container>
    );
  }
  }
}
