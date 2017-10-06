import React from 'react';
import ReactDOM from 'react-dom';
import {
    Row,
    Col,
    Menu,
    Icon,
    Tabs,
    Modal,
    message,
    Form,
    Button,
    Checkbox,
    Input
} from 'antd';
import {Link} from 'react-router-dom';
import myModal from '../Modal/modal';
import './pc_header.css';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;

class PcHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: 'admin',
            userid: 0,
            loading: false,
        }
    }
    componentWillMount() {
        if(localStorage.userid!=''){
            this.setState({hasLogined:true});
            this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid})
        }
    }
    handleClick = (e) => {
        //console.log('click ', e);
        if (e.key == 'register') {
            this.setState({modalVisible: true})
        }else if(e.key == 'logout'){
            this.handleLogout();
        }else{
            this.setState({current: e.key});
        }
    }
    handleCancel = (e) =>{
        this.setState({
            modalVisible:false
        })
    }
    handleOk = (e)=>{
        this.setState({
            modalVisible:false
        })  
    }
    handleLogout =()=>{
        localStorage.userid='';
        localStorage.userNickName='';
        this.setState({
            hasLogined :false
        })
    }
    render() {
        let {getFieldDecorator} = this.props.form;
        const userState = this.state.hasLogined
            ? <SubMenu  title={<span><Icon type="github" />{this.state.userNickName}</span>} className='register'>
                    <Menu.Item key='usercenter'><Link target='_blank' to={'/..'}>
                        <Icon type='user'/>个人中心
                    </Link></Menu.Item>
                    <Menu.Item key='logout' ><Icon type='logout'/>退出</Menu.Item>
                </SubMenu >
            : <Menu.Item key='register' className='register'>
                <Icon type='appstore'/>登录/注册
            </Menu.Item>
        return (
            <div className='pcheader'>
                <Row>
                    <Col span={2}></Col>
                    <Col span={3}>
                        <Link to="/" className='logo'>
                            <img src={require("../../../images/news.png")} alt="Logo"/>
                            <span>News</span>
                        </Link>
                    </Col>
                    <Col span={16}>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal">
                            <Menu.Item key="top">
                                <Icon type="appstore"/>头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore"/>社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore"/>国内
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Icon type="appstore"/>国际
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore"/>娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore"/>体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore"/>科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore"/>时尚
                            </Menu.Item>
                            {userState}
                        </Menu>
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Modal
                    title="用户中心"
                    wrapClassName="vertical-center-modal" 
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk}>
                            确认
                        </Button>,
                    ]}
                >
                    <Tabs type="card" onChange={this.handleTabChange}>
                        <TabPane key="register" tab="注册">
                            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                            <FormItem label="用户名" hasFeedback>
                                {
                                getFieldDecorator('r_username', {
                                    validateTrigger: 'onBlur',
                                    rules: [
                                    {
                                        required: true,
                                        message: '请输入您的用户名！',
                                    },
                                    {
                                        pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
                                        message: '需字母开头，且仅支持字母、数字、下划线',
                                    },
                                    {
                                        max: 16,
                                        message: '不能超过16个字符',
                                    },
                                    {
                                        validator: (rule, value, callback) => {
                                        {/* this.props.dispatch({
                                            type: 'user/query',
                                            payload: { value, callback },
                                        }); */}
                                        },
                                    },
                                    ],
                                })(<Input prefix={<Icon type="user" style={{fontSize: '13px'}}/>} placeholder="Username"/>)
                                }
                            </FormItem>
                            <FormItem label="密码" hasFeedback>
                                {
                                getFieldDecorator('r_password',{
                                    validateTrigger: 'onBlur',
                                    rules:[
                                    {
                                        required:true,
                                        message: '请输入一个密码'
                                    },
                                    {
                                        pattern: /^[a-zA-Z][a-zA-Z0-9_]*$/,
                                        message: '密码为字母开头，用户名仅能为字母、数字和下划线组成'
                                    },
                                    {
                                        max:16,
                                        message: '超出最长16个字符，请重新填写' 
                                    },
                                    {
                                        min:6,
                                        message: '密码不少于5个字符'
                                    },
                                    {
                                        validator: this.checkConfirm,
                                    }
                                    ]
                                })( <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />)
                                }
                            </FormItem>
                            <FormItem label="确认密码" hasFeedback>
                                {
                                getFieldDecorator('r_confirmPassword',{
                                    validateTrigger: 'onBlur',
                                    rules: [
                                    {
                                        required : true,
                                        message: '请确认您的密码'
                                    },
                                    {
                                        validator : this.checkPassword,
                                    }
                                    ]
                                })(<Input type="password" prefix={<Icon type="lock" style={{fontSize: '13px'}}/>} placeholder="Confirm Password"/>)
                                }
                            </FormItem>
                            <Button type="primary" htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                        <TabPane key="login" tab="登录">
                            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                            <FormItem hasFeedback>
                                {
                                getFieldDecorator('username',{
                                    validateTrigger: 'onBlur',
                                    rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名'
                                    },{
                                        pattern: /^[a-zA-z][a-zA-z0-9_]*$/,
                                        message:'字母开头，用户名仅能为字母、数字和下划线'
                                    },{
                                        max: 16,
                                        message: '超出最长16个字符，请重新填写' 
                                    }
                                    ]
                                })(<Input prefix={<Icon type="user" style={{fontSize: '13px'}}/>} placeholder="Username" />)
                                }
                            </FormItem>
                            <FormItem hasFeedback>
                                {
                                getFieldDecorator('password',{
                                    validateTrigger:'onBlur',
                                    rules : [
                                    {
                                        required: true,
                                        message:'请输入密码'
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_]{5,16}$/,
                                        message:'密码格式错误'
                                    }
                                    ]
                                })( <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />)
                                }
                            </FormItem>
                            <FormItem hasFeedback>
                                {
                                getFieldDecorator('remeberMe',{
                                    valuePropName : 'checked',
                                })(<Checkbox>记住我</Checkbox>)
                                }
                            </FormItem>
                            <Button type="primary" htmlType="submit">登录</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

export default PcHeader = Form.create({})(PcHeader);