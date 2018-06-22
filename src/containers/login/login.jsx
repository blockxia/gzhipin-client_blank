import React,{Component} from 'react'
import {connect}from 'react-redux'
import {NavBar,InputItem,Button,WhiteSpace,WingBlank,List} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'
import Logo from '../../components/logo/logo'

class Login extends Component{
    state={
        username:'',
        password:'',

    }
    handleChange=(name,value)=>{
        this.setState({
            [name]:value
        })
    }
    login=()=>{
       const {username,password}=this.state
        this.props.login(username,password)
    }
    goRegister=()=>{
        this.props.history.replace('/register')
    }
    render(){
        const {redirectTo, msg}=this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return(
            <div>
                <NavBar>登录</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <p className='error-msg'>{msg}</p> : null}
                        <WhiteSpace/>
                        <InputItem placeholder="请输入用户名" onChange={val=>this.handleChange('username',val)}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' placeholder="请输入密码" onChange={val=>this.handleChange('password',val)}>密码：</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登录</Button>
                        <Button onClick={this.goRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
state=>({user:state.user}),
 {login}
)(Login)
