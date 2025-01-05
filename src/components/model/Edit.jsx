import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Select } from 'antd'
import BrandService from '../../services/BrandService'

const Edit = ({ initialFormData, handleSaveClick }) => {
    //states
    const [formSubmittable, setFormSubmittable] = useState(false);
    const [brands, setBrands] = useState([]);

    //hooks
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);

    useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => { setFormSubmittable(true);})
            .catch(() => { setFormSubmittable(false);});
    }, [form, values]);

    useEffect(() => {
        if (initialFormData) {
            form.setFieldsValue(initialFormData);
        }
    }, [initialFormData]);

    useEffect(() => {
        handleGetBrands().then(() => { }).catch(() => { });
    }, []);

    const handleGetBrands = async () => {
        const result = await BrandService.GetAllAsync();
        if (result.isSuccess) {
            setBrands(
                result.data.map(brand => {
                    return {
                        key: brand.brandId,
                        value: brand.brandId,
                        label: brand.brandName
                    }
                }));
        }
    }

    return (
        <Form
            labelCol={{span:8}}
            wrapperCol={{span:16}}
            form={form}
            onFinish={handleSaveClick}
            autoComplete="off"
        >
            <Form.Item
                name="modelId"
                style={{ display: "none" }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Model Adı"
                name="modelName"
                rules={[
                    {
                        required: true,
                        message: 'Model adı boş olamaz.',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Marka"
                name='brandId'
                rules={[
                    {
                        required: true,
                        message: 'Marka boş olamaz.',
                    },
                ]}
            >
                <Select options={brands} />
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