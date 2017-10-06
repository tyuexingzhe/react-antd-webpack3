import React from 'react';
import { Icon, Tabs, Form, Input, Button, Modal, Checkbox } from 'antd';
import styles from './modal.css';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MyModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
    };
    this.action = 'register';
    this.field = {
      login: ['username', 'password', 'remeberMe'],
      register: ['r_username', 'r_password', 'r_confirmPassword']
    }
  }
  handleCancel = ()=>{
    // this.props.dispatch({
    //   type : 'user/save',
    //   payload: {isModalVisible: false},
    // });
    this.props.form.resetFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    const { field, action, props, handleCancel } = this;
    const formData = props.form.getFieldsValue(field[action]);
    props.form.validateFields(field[action], {}, err => {
      if (!err) {
        // props.dispatch({
        //   type: `user/${action}`,
        //   payload: { formData, handleCancel },
        // });
        if (action === 'register') {
          handleCancel();
        }
      }
    });
  };

  handleTabChange = (key)=>{
    this.props.form.resetFields();
    this.action = key === 'login' ? 'login' : 'register';
  }

  checkConfirm = (rule, value, callback)=>{
    const form = this.props.form;
    if(value && this.state.confirmDirty){
      form.valiateFields(['r_confirmPassword'],{
        force: true,
      });
    }
    callback();
  }

  checkPassword = (rule, value ,callback)=>{
    const form = this.props.form;
    if(value && value !== form.getFieldValue('r_password')) {
      callback('两次输入的密码不一致');
    }else{
      callback();
    }
  }


  render(){
    const { getFieldDecorator }  = this.props.form;
    return (
      <Modal 
        title="用户中心" 
        wrapClassName="vertical-center-modal" 
        visible={this.props.isModalVisible}
        onCancel = {this.handleCancel}
        footer={[
          <Button size="large" onClick={this.handleCancel} key="0">
            关闭
          </Button>
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
    );
  }
}

const WarppedMyModal = Form.create()(MyModal);

export default WarppedMyModal;
