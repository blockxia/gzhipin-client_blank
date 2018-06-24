import React,{Component} from 'react'
import {connect}from 'react-redux'
import {Switch,Route} from 'react-router-dom'
import LaoBanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'

 class Main extends Component{
    render(){
        return(
           <Switch>
               <Route path='/laobaninfo' component={LaoBanInfo}/>
               <Route path='/dasheninfo' component={DashenInfo}/>
           </Switch>
        )
    }
}
export default connect()(Main)