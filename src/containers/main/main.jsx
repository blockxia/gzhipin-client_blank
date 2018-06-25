import React,{Component} from 'react'
import {connect}from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {getUser} from '../../redux/actions'
import { NavBar,}from 'antd-mobile'
import LaoBanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import {getRedirectPath} from "../../utils/index";

 class Main extends Component{
     navList = [
         {
             path: '/laoban', // 路由路径
             component: Laoban,
             title: '大神列表',
             icon: 'dashen',
             text: '大神',
         },
         {
             path: '/dashen', // 路由路径
             component: Dashen,
             title: '老板列表',
             icon: 'laoban',
             text: '老板',
         },
         {
             path: '/message', // 路由路径
             component: Message,
             title: '消息列表',
             icon: 'message',
             text: '消息',
         },
         {
             path: '/personal', // 路由路径
             component: Personal,
             title: '用户中心',
             icon: 'personal',
             text: '个人',
         }
     ]
     componentDidMount(){
         const userid=Cookies.get('userid')
         const {user}=this.props
         if(userid && !user._id){
             this.props.getUser()
         }
     }
    render(){
         const userid=Cookies.get('userid')
         if(!userid){
            return <Redirect to='/login'/>
         }
         const {user}=this.props
        if(!user._id){
             return null
        }
        const path=this.props.location.pathname
        if(path==='/'){
            return <Redirect to={getRedirectPath(user.type,user.header)}/>
        }
        const navList=this.navList
        if(user.type==='laoban'){
            navList[1].hide=true
        }else{
            navList[0].hide=true
        }


        const currentNav=navList.find(nav=>nav.path===path)
        return(
           <div>
               {currentNav?<NavBar>{currentNav.title}</NavBar>:null}
               <Switch>
                   <Route path='/laobaninfo' component={LaoBanInfo}/>
                   <Route path='/dasheninfo' component={DashenInfo}/>
                   <Route path='/laoban' component={Laoban}/>
                   <Route path='/dashen' component={Dashen}/>
                   <Route path='/message' component={Message}/>
                   <Route path='/personal' component={Personal}/>
                   <Route component={NotFound}/>
               </Switch>
               {currentNav? <NavFooter navList={navList}/>:null}
           </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {getUser}
)(Main)