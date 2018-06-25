import React,{Component} from 'react'
import {connect} from 'react-redux'
 class Message extends Component{
    render(){
        return (
            <div style={{marginTop:50}}>
                老板列表</div>
        )
    }
}
export default connect(

)(Message)