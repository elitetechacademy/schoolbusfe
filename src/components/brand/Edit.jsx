import React, { useState, useEffect } from 'react'
import { Form, Button, Input } from 'antd'

const Edit = ({ initialFormData, handleSaveClick }) => {
    
    //states
    const [formSubmittable, setFormSubmittable] = useState(false);

    //hooks

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => { setFormSubmittable(true) })
            .catch(() => { setFormSubmittable(false) });
    }, [form, values]);

    useEffect(() => {
        if(initialFormData){
            form.setFieldsValue(initialFormData);
        }        
      }, [initialFormData]);


    return (
        <Form
            form={form}
            onFinish={handleSaveClick}
            autoComplete="off"
        >
            <Form.Item
                name="brandId"
                style={{ display: "none" }}
                rules={[
                    {
                        required: true,
                        message: 'Marka adı boş olamaz.',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Marka Adı"
                name="brandName"
                rules={[
                    {
                        required: true,
                        message: 'Marka adı boş olamaz.',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit" disabled={!formSubmittable}>
                    Kaydet
                </Button>
            </Form.Item>
        </Form>
    )


}

export default Edit