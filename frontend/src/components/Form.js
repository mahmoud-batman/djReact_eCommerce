import React, { Component } from "react";
import { Form, Input, Button } from "antd";
const FormItem = Form.Item;

class CustomForm extends Component {
  render() {
    return (
      <div>
        <Form>
          <FormItem label="Title">
            <Input name="title" placeholder="Put a title here" />
          </FormItem>
          <FormItem label="Content">
            <Input name="content" placeholder="Enter some content ..." />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default CustomForm;
