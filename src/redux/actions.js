import {AUTH_SUCCESS,ERROR_MSG}from './action-types'
import {reqLogin,reqRegister}from '../api'

const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})

export const register=({username,password,password2,type})=>{
    return dispatch=>{
        reqRegister({username,password,type}).then(response=>{
          const result=response.data
            console.log(result);
            if(result.code===0){
              const user=result.data
                dispatch(authSuccess(user))
            }else{
                dispatch(errorMsg(result.msg))
            }
        })
    }
}

export const login=(username, password)=>{
    return dispatch=>{
        reqLogin(username, password).then(response=>{
            const result=response.data
            if(result.code===0){
                const user=result.data
                dispatch(authSuccess(user))
            }else{
                dispatch(errorMsg(result.msg))
            }
        })
    }
}