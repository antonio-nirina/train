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

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: [
        {"name":"Antonio","fisrt":"Nirina"},
        {"name":"Antonio","fisrt":"Nirina"},
        {"name":"Antonio","fisrt":"Nirina"},
        {"name":"Antonio","fisrt":"Nirina"},
        {"name":"Antonio","fisrt":"Nirina"},
        {"name":"Antonio","fisrt":"Nirina"},
        ]
    };
  }

  render() {
    return (
      <div className="main" style={{'backgroundColor':'#37c936'}}>
        <p>
         Hello TODO MVC REACTJS
        </p>
        <div className="input-group">
          <input type="text" class="form-control" style={{'borderRaduis':'75px'}} />
          <div className="input-group-addon hover-cursor">
            <i className="fa fa-plus-circle fa-2x"></i>
          </div>
        </div>
        <div style={{"margin":"5px 0px"}}>
          {this.state.name.map((e,i) => {
            return(
              <div key={i}>
              <span>
                  <i  className={`fa fa-lg ${i == 1 ? 'fa fa-circle-thin':'fa-check-circle-o' }`}></i>
              </span>
                <span style={{'marginLeft':'5px'}}>{e.name+" "+e.fisrt}</span>
                <span style={{'float':'right'}}>
                  <i  className="fa fa-trash-o fa-lg text-danger"></i>
                </span>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
