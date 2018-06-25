import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER}from './action-types'
import {reqLogin,reqRegister,reqUpdateUser,reqUser}from '../api'

const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})
const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
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
            dispatch(authSuccess(user))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}


export const updateUser=(user)=>{
    return async dispatch=>{
        const response=await reqUpdateUser(user)
        console.log(response);
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
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg))
        }
    }
}