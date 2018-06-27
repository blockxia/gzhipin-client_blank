import React,{Component} from 'react'
import { TabBar}from 'antd-mobile'
import {withRouter}from 'react-router-dom'
import PropTypes from 'prop-types'
const Item=TabBar.Item
 class NavFooter extends Component{
    static propTypes={
        navList:PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired
    }
    render(){
        const navList=this.props.navList.filter(nav=>!nav.hide)
        /*nav=>!nav.hide箭头函数简化版
        function (nav) {
            console.log(nav);
            return !nav.hide
        }*/
        const path=this.props.location.pathname
        const {unReadCount}=this.props
        return(
            <TabBar>
                {navList.map((nav,index)=>(
                   <Item key={index}
                         badge={nav.path==='/message'?unReadCount:0}
                          title={nav.text}
                          icon={{uri:require(`./imgs/${nav.icon}.png`)}}
                         selectedIcon={{uri:require(`./imgs/${nav.icon}-selected.png`)}}
                         selected={nav.path===path}
                         onPress={()=>this.props.history.replace(nav.path)}
                   />
                ))}
            </TabBar>
        )
    }
}
export default withRouter(NavFooter)