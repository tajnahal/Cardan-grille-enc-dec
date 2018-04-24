import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {fillMatrix,buildMatrix,setMatrixSize,setOutput} from '../AC';
import {buildArrFromCryptoText} from '../selectors';
//material-ui
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {Drawer,ListItem,List,ListItemText,Divider,Input,Select} from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    backgroundColor:'#212121'
  },
  toolbar: theme.mixins.toolbar,
  //
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  option:{
    backgroundColor:'#EFEBE9',
    color:'#212121'
  }
});


class SideBar extends Component {
  state = {
    inputText:''
  }
  handleChangeSizeMatrix =  e => {
    const {mode, D_sizeMatrix, E_sizeMatrix} = this.props;
    this.props.setMatrixSize(e.target.value,mode)
    this.props.buildMatrix(e.target.value,mode)

    const send = buildArrFromCryptoText(this.state.inputText,mode === 0 ? D_sizeMatrix : E_sizeMatrix)
    this.props.fillMatrix(send);
  };
  handleChangeInputText =  e => {
    this.setState({
      inputText:e.target.value
    })
  };
  // componentWillUpdate(){
  //   const {mode, D_sizeMatrix, E_sizeMatrix, setOutput,E_matrix} = this.props;
  //   if (mode === 0){
  //     const send = buildArrFromCryptoText(this.state.inputText,mode === 0 ? D_sizeMatrix : E_sizeMatrix)
  //     this.props.fillMatrix(send,mode);
  //   } else setOutput(E_matrix,mode);
  //   console.log('--->','componentWillUpdate');
  // }
  componentDidUpdate(){
    const {mode, D_sizeMatrix, E_sizeMatrix, setOutput,E_matrix} = this.props;
    if (mode === 0){
      const send = buildArrFromCryptoText(this.state.inputText,mode === 0 ? D_sizeMatrix : E_sizeMatrix)
      this.props.fillMatrix(send,mode);
    } else setOutput(E_matrix,mode);
    console.log('--->','componentDidUpdate');
  }
  render() {
    const { classes,E_sizeMatrix,D_sizeMatrix,mode,E_output } = this.props;
    return (
      <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
      >
        <List component="nav">
            <ListItem>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="uncontrolled-native">Size</InputLabel>
              <Select native value={mode===0?D_sizeMatrix:E_sizeMatrix} input={<Input id="uncontrolled-native" onChange={this.handleChangeSizeMatrix}/>}>
                <option value={4} className={classes.option}>4</option>
                <option value={6} className={classes.option}>6</option>
                <option value={8} className={classes.option}>8</option>
                <option value={10} className={classes.option}>10</option>
                <option value={12} className={classes.option}>12</option>
              </Select>
              <FormHelperText>Only square matrix yet</FormHelperText>
            </FormControl>
            </ListItem>
            <Divider />
            <ListItem divider>
              {mode === 0 && <textarea rows="10" value={this.state.inputText} onChange={this.handleChangeInputText} style={{backgroundColor:'#EFEBE9',fontSize:'16px'}}/>}
              {mode === 1 && <textarea rows="10" value={this.props.E_output} style={{backgroundColor:'#EFEBE9',fontSize:'16px'}}/>}
            </ListItem>

          </List>
      </Drawer>
    );
  }
}
SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
const materialWrapper = withStyles(styles);
const reduxWrapper = connect(state=>{

  return {
    mode:state.mode,
    D_sizeMatrix:state.dec.sizeMatrix,
    E_sizeMatrix:state.enc.sizeMatrix,
    E_output: state.enc.output,
    E_matrix: state.enc.matrix,
  }
},{buildMatrix,fillMatrix,setMatrixSize,setOutput});

export default compose(materialWrapper,reduxWrapper)(SideBar);
