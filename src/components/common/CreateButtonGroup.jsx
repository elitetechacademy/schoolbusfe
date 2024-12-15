import React from 'react'
import { Row, Button } from 'antd'
import RoleHelper from '../../helpers/RoleHelper'
import RoleType from '../../utils/types/RoleType'

const CreateButtonGroup = ({ justify, style, handleCreateClick, buttonText }) => {
    const roleType = RoleHelper.GetUserRole();
    return (
        <Row justify={justify}>
            <Button
                type="primary"
                disabled={roleType !== RoleType.SuperAdmin | RoleType.Admin}
                style={style}
                onClick={() => { handleCreateClick() }}>
                {buttonText}
            </Button>
        </Row>
    )
}

export default CreateButtonGroup