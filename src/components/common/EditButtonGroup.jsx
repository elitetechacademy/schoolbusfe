import React from 'react'
import { Space, Button } from 'antd'
import RoleHelper from '../../helpers/RoleHelper'
import RoleType from '../../utils/types/RoleType'

const EditButtonGroup = ({ handleEditClick, handleDeleteClick }) => {
    const roleType = RoleHelper.GetUserRole();
    return (
        <Space size="middle">
            <Button
                type="primary"
                disabled={roleType === RoleType.User | RoleType.Guest}
                onClick={() => { handleEditClick() }}>
                Güncelle
            </Button>
            <Button
                type="primary"
                disabled={roleType !== RoleType.SuperAdmin}
                onClick={() => { handleDeleteClick() }}>
                Sil
            </Button>
        </Space>
    )
}

export default EditButtonGroup