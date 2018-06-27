import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_CHAT,
    RECEIVE_MSG,
    MSG_UPDATE
} from './action-types'
import {reqLogin,reqRegister,reqUpdateUser,reqUser,reqUserList,reqChatMsgList,reqReadChatMsg}from '../api'
import io from 'socket.io-client'
const socket=io('ws://localhost:4000')

function initSocketIO(userid,dispatch) {
    if(!io.socket){
        io.socket=socket
        socket.on('receiveMsg',function (chatMsg) {
            if(chatMsg.from===userid||chatMsg.to===userid){
                console.log('接收到一个需要显示的消息')
                dispatch(receiveMsg(chatMsg,userid))
            }else{
                console.log('接收到一条与我无关消息')
            }
        })
    }

}
async function getMsgList(userid,dispatch) {
    initSocketIO(userid,dispatch)
    const response=await reqChatMsgList()
    const result=response.data
    if(result.code===0){
        console.log('获取得到当前用户的所有聊天相关信息',result.data);
        dispatch(receiveChat({...result.data,meId:userid}))
    }

}
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})
const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
const receiveUserList=(users)=>({type:RECEIVE_USER_LIST,data:users})
const receiveMsg=(chatMsg,meId)=>({type:RECEIVE_MSG,data:{chatMsg,meId}})
const receiveChat=({users,chatMsgs,meId})=>({type:RECEIVE_CHAT,data:{users,chatMsgs,meId}})
const msgUpdate=({count,from,to})=>({type:MSG_UPDATE,data:{count,from,to}})
export const resetUser=(msg)=>({type:RESET_USER,data:msg})

export const register=({username,password,password2,type})=>{
    if(!username){
        return errorMsg('必须指定用户名')
    }else if(!password){
        return errorMsg('必须指定密码')
    }
    return async dispatch=>{
        if(password!==password2){
            dispatch(errorMsg('两个密码必须一致'))
            return
        }
        const response=await reqRegister({username,password,type})
        const result=response.data

        console.log(result);
        if(result.code===0){
            const user=result.data

            getMsgList(user._id,dispatch)
            dispatch(authSuccess(user))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }

}

export const login=(username, password)=>{
    if(!username) {
        return errorMsg('必须指定用户名')
    } else if(!password) {
        return errorMsg('必须指定密码')
    }
    return  async dispatch=>{
        const response=await reqLogin(username, password)
        const result=response.data
        if(result.code===0){
            const user=result.data
            // console.log('登录用户信息login()',user);
            getMsgList(user._id,dispatch)
            dispatch(authSuccess(user))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}


export const updateUser=(user)=>{
    return async dispatch=>{
        const response=await reqUpdateUser(user)
        // console.log(response);
        const result=response.data
        // debugger
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUser=()=>{
    return async dispatch=>{
        const response=await reqUser()
        const result=response.data
        if(result.code===0){
            // console.log('获取用户信息getUser()',result.data);
            getMsgList(result.data._id,dispatch)
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUserList=(type)=>{
    // console.log('-----------');
    return async dispatch=>{
        const response=await reqUserList(type)
        const result =response.data
        // console.log(result);
        if(result.code===0){
            dispatch(receiveUserList(result.data))
        }
    }
}
export const sendMsg=({from, to, content})=>{
    return dispatch=>{
        // 向服务器发消息
        console.log('浏览器向服务器发送消息', from, to, content)
        socket.emit('sendMsg',{from, to, content})
    }
}

export const updateMsg=(from,to)=>{
        return async dispatch=>{
            const response=await reqReadChatMsg(from)
            const result=response.data
            if(result.code===0){
                const count=result.data
                dispatch(msgUpdate({count,from,to}))
            }

        }
}