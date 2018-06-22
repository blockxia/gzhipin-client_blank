import React,{Component} from 'react'
import {connect}from 'react-redux'
import {NavBar,InputItem,Button,WhiteSpace,WingBlank,List} from 'antd-mobile'
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
        console.log(this.state);
    }
    goRegister=()=>{
        this.props.history.replace('/register')
    }
    render(){
        return(
            <div>
                <NavBar>登录</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
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
export default connect()(Login)
