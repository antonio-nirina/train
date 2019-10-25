import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

const stylesAdd = {
  "backgroundColor": "gray",
    "display": "block",
    "width": "47px",
    "textAlign": "center",
    "position": "absolute",
  "top": "29px",
  "right": "15px",
  "height": "38px",
}

const styleMb = {
  "padding": "6px 4px",
   "border": "yellowgreen",
    "borderRadius": "5px",
    "backgroundColor": "gray",
}

const listeStyle = {
  "width": "166px",
  "margin": "0 auto",
}

const listAStyle = {
  "textDecoration": "none",
  "border": "1px solid rgba(175,42,47,0.2)"
}

const all = {
  "position": "absolute",
  "borderRight": "1px solid gray",
  "top": "29px",
  "left": "15px",
  "borderRadius": "25px 0 0 25px",
  "border": "1px solid",
}

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div Name="main container">
        <div className="insert col-sm-6" style={{"margin":"0 auto"}}>
          <div className="title" style={{"text-align":"center","margin": "5px 0px","position": "relative"}}>
            Hello TODO MVC REACTJS
          </div>
          <div>
            <input type="text" className="form-control" name="add" 
            style={{"borderRadius": "25px 0 0 25px","paddingLeft": "39px","paddingRight": "44px"}}/>
          </div>
          <div className="all">
            <i className="fa fa-chevron-down fa-1x" style={{"color":"gray","padding": "1px 11px","lineHeight":"35px"}}></i>
          </div>
          <div className="add">
            <i className="fa fa-plus-circle fa-2x" style={{"borderRadius": "25px","lineHeight":"38px"}}></i>
          </div>
          <div className="list-todo">
            <div className="mb" style={{"marginTop":"4px"}}>
              <i style={{"color": "#37c936"}} className="fa fa-lg fa fa-check-circle-o"></i>
              <span>Test</span>
              <i style={{"float": "right"}}className="fa fa-trash-o fa-lg text-danger"></i>
            </div>
            <div className="mb" style={{"marginTop": "4px"}}>
              <i style={{"color":"#37c936"}} className="fa fa-lg fa fa-check-circle-o"></i>
              <span>Test</span>
              <i style={{"float":"right"}} className="fa fa-trash-o fa-lg text-danger"></i>
            </div>
            <div className="mb" style={{"marginTop":"4px"}}>
              <i style={{"color":"#37c936"}} className="fa fa-lg fa fa-circle-thin"></i>
              <span>Test</span>
              <i style={{"float":"right"}} className="fa fa-trash-o fa-lg text-danger"></i>
            </div>
            <div className="mb" style={{"marginTop": "4px"}}>
              <i style={{"color": "#37c936"}} className="fa fa-lg fa fa-check-circle-o"></i>
              <span>Test</span>
              <i style={{"float":"right"}} className="fa fa-trash-o fa-lg text-danger"></i>
            </div>
            <div className="mb" style={{"marginTop": "4px"}}>
              <span style={{"float": "left"}}>4 items</span>
              <div className="liste">
                <a style={{"color": "#fff"}} href="#">All</a>
                <a href="#">Active</a>
                <a href="#">Completed</a>
              </div>
            </div>
          </div>      
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
