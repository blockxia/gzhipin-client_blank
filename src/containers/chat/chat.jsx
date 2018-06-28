/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem,Grid,Icon} from 'antd-mobile'

import {connect} from 'react-redux'
import {sendMsg,updateMsg} from '../../redux/actions'
const Item = List.Item

class Chat extends Component {
    state={
        content:'',
        isShow:false
    }
    send=()=>{
       const {content} =this.state
        if(!content){
           return
        }
        const from=this.props.user._id
        const to=this.props.match.params.userid

        this.props.sendMsg({from,to,content})
        this.setState({content: '', isShow: false})
    }

    componentWillMount(){
        const emojis = ['😍', '😁', '🤣','🍀', '🙄', '🤣','❤', '🌱', '🤣','😀', '⚽', '🤣','🌈'
            ,'🍺', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
            ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
        this.emojis=emojis.map((value)=>({text:value}))
    }
    // 打开界面, 自动滚动到底部
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
        const from=this.props.match.params.userid
        const to=this.props.user._id
        this.props.updateMsg(from,to)
    }

    // 更新后, 自动滚动到底部
    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount(){
        const from=this.props.match.params.userid
        const to=this.props.user._id
        this.props.updateMsg(from,to)
    }
    toggleShow=()=>{
        const isShow=!this.state.isShow
        this.setState({isShow})
        if(isShow){
            // 异步手动派发resize事件,解决表情列表显示的bug
            setTimeout(()=>{
                window.dispatchEvent(new Event('resize'))
            },0)
        }
   }
    render() {
        const {user,chat}=this.props
        // console.log('user信息'+user);
        const {users,chatMsgs}=chat
        // console.log('users信息'+users);
        const targetId=this.props.match.params.userid
        const meId=user._id
        // const meIdUser=users[meId]
        //&&!users[meId]
        if(!users[targetId]){
            return null
        }
        const chatId=[targetId,meId].sort().join('_')

        const currentMsgs=chatMsgs.filter(msg=>msg.chat_id===chatId)
        const targetUser=users[targetId]


        const targetIcon=targetUser.header ? require(`../../assets/imgs/${targetUser.header}.png`):null
        // const meIdIcon=meIdUser.header ? require(`../../assets/imgs/${meIdUser.header}.png`):null
        return (
            <div id='chat-page'>
                <NavBar icon={<Icon type='left' onClick={()=>this.props.history.goBack()}/>}

                >{targetUser.username}</NavBar>
                <List style={{marginBottom:50}}>

                    {
                        currentMsgs.map((msg,index)=>{
                            if(msg.to===meId){
                               return(
                                   <Item key={index}
                                       thumb={targetIcon}
                                   >
                                       {msg.content}
                                   </Item>
                               )
                            }else{
                                return(
                                    <Item key={index}
                                        className='chat-me'
                                        // extra={require('../../assets/imgs/头像14.png')}
                                       extra='我'
                                        //   thumb={meIdIcon}
                                    >
                                        {msg.content}
                                    </Item>
                                )
                            }
                        })
                    }

                </List>
                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        onChange={(val)=>this.setState({content:val})}
                        onFocus={()=>{this.setState({isShow:false})}}
                        value={this.state.content}
                        extra={
                           <div>
                               <span onClick={()=>this.setState({content: ''})}>◀删除</span>
                               <span onClick={this.toggleShow} style={{marginLeft:10}}>😋</span>
                               <span onClick={this.send} style={{marginLeft:20}}>发送</span>
                           </div>

                        }
                    />
                    {
                        this.state.isShow ? (
                            <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item)=>{
                                    this.setState({
                                        content:this.state.content+item.text
                                    })
                                }}
                            />
                        ) : null
                    }


                </div>
            </div>
        )
    }
}
export default connect(
  state=>({user:state.user,chat:state.chat}),
   {sendMsg,updateMsg}
)(Chat)