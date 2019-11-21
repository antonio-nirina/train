import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import '../assets/style/todo.css';

class Init extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      value:'',
      isShowLenged:false
    };
    this.onSend = this.onSend.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onDeleted = this.onDeleted.bind(this)
    this.changeAction = this.changeAction.bind(this)
    this.add = this.add.bind(this)
    this.onChangeAll = this.onChangeAll.bind(this)
  }

  onDeleted(el,i){
    {/*eslint-disable */}
    this.state.list.map((e,index) => {
      if(i === index){
          return e.data = '';
      }
    })

    const newList = this.state.list.filter(el => el.data)
    this.setState({list: newList});
  }

  add(event){
    if (event.which === 13) {
      this.onSend()
    }
  }

  onChangeAll() {
    this.state.list.map(e => {
      e.active = !e.active
    })
    this.setState({list: this.state.list});
  }

  changeAction(el,i){
    this.state.list.map((e,index) => {
      if(i === index){
        return e.active = !e.active;
      }
    })
    this.setState({list: this.state.list});
  }

  onSend(){
    if (this.state.value) {
      const obj = {
        'data':this.state.value,
        'active':false
      }
      // Mahagaga mitsy ty klé
      this.state.list.push(obj)
      this.setState({value: ''});
    }  
  }

  handleChange(event){
    // const arr = [...this.state.list, ...event.target.value]
     this.setState({value:event.target.value});
  }

  render() {
    return (
      <div className="init">
        <Header />
        {/*eslint-disable */}
        <div className="main container">
          <div className="insert col-sm-6" style={{"margin": "0 auto"}}>
            <div className="title" style={{"textAlign":"center","margin": "5px 0px","position": "relative"}}>
              Hello TODO MVC REACTJS
            </div>
            <div>
              <input type="text" className="form-control" name="add" 
              style={{"borderRadius": "25px 0 0 25px","paddingLeft": "39px","paddingRight": "44px"}} 
              value={this.state.value} onChange={this.handleChange}
              onKeyDown={this.add}
              />
            </div>
            <div className="all">
              <i className="fa fa-chevron-down fa-1x" style={{"color":"gray","padding": "1px 11px","lineHeight":"35px"}} onClick={this.onChangeAll}></i>
            </div>
            <div className="add">
              <i className="fa fa-plus-circle fa-2x" style={{"borderRadius": "25px","lineHeight":"38px"}} onClick={this.onSend}></i>
            </div>
            {
              this.state.list.map((el,i) => {
                return(
              <div className="mb" style={{"marginTop":"4px"}} key={i}>
                <i 
                style={{"color": "#37c936","marginRight": "5px"}} 
                className={el.active ? "fa fa-lg fa fa-check-circle-o":"fa fa-lg fa fa-circle-thin"}
                onClick={() => this.changeAction(el,i)}
                ></i>
                <span>{el.data}</span>
                <i style={{"float":"right"}} className="fa fa-trash-o fa-lg text-danger" onClick={() => this.onDeleted(el,i)}></i>
              </div>
                );
              })
            }
            {
              this.state.list.length > 0 ? (
                <div className="mb" style={{"marginTop": "4px"}}>
                <span style={{"float": "left"}}>{this.state.list.length}{this.state.list.length > 1 ? "items" : "item"}</span>
                <div className="liste">
                  <a style={{"color": "#fff"}} href="#">All</a>
                  <a href="#">Active</a>
                  <a href="#">Completed</a>
                </div>
              </div>
              ) : null
            }  
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Init;
