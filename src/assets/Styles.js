import {StyleSheet} from 'react-native'

export default StyleSheet.create(
{
  cellRow:{
    height:30,
    margin:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellColumn:{
    width:30,
    margin:1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  cellContent:{
      alignSelf:'stretch',
  },
  board:{
    flex:0,
    width:100,
    height:100,
    backgroundColor:'#abcdef'
  }
}
)
