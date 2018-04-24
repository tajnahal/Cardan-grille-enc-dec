import React, { Component } from 'react';
import {connect} from 'react-redux';
import {dec_chooseGrid,enc_chooseGrid,setOutput} from '../AC';
class MatrixCell extends Component {
  handleClick = (id) => {
    const {mode,input,dec_chooseGrid,enc_chooseGrid,setOutput,D_matrix,E_matrix,count} = this.props
    if (mode === 0){
      dec_chooseGrid(id);
      setOutput(D_matrix,mode);
    } else {
      enc_chooseGrid(id,input,count);
      setOutput(E_matrix,mode);
    }
  }
  render() {
    const {active,visited,value,id} = this.props.cell;
    const styles = {
      width:'30px',
      height:'30px',
      border:'1px solid black',
      borderCollapse: 'collapse',
      alignContent:'flex-start',
      cursor:'pointer',
      backgroundColor:active===true?'#FFD54F':visited===true?'0D47A1':'white',
      textAlign:'center',
      fontSize:'24px',
      color:visited===true?'white':'#212121'
    }
    return (
      <div style={styles} onClick={()=>this.handleClick(id)}>
        {value}
      </div>
    );
  }
}

export default connect(state=>({
  mode:state.mode,
  input:state.enc.input,
  D_matrix: state.dec.matrix,
  E_matrix: state.enc.matrix,
  E_count:state.enc.count
}),{dec_chooseGrid,enc_chooseGrid,setOutput})(MatrixCell);
