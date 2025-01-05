import React, { useEffect, useState } from 'react'
import { Table, Button, Space, Row, Modal } from 'antd'
import ModelService from '../services/ModelService';
import ModalMode from '../utils/types/ModalMode';
import Edit from '../components/model/Edit';
import { toast } from 'react-toastify';
import EditButtonGroup from '../components/common/EditButtonGroup';
import CreateButtonGroup from '../components/common/CreateButtonGroup';

const Brand = () => {

  //states
  const [models, setModels] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(ModalMode.INSERT);
  const [formData, setFormData] = useState(null);

  //hooks
  useEffect(() => {
    handleGetModels().then(() => { }).catch(() => { });
  }, []);

  const { confirm } = Modal


  //functions
  const handleGetModels = async () => {
    const result = await ModelService.GetAllAsync();
    if (result.isSuccess) {
      let models = result.data.map(model =>{
        return {
          key:model.modelId,
          modelId:model.modelId,
          modelName:model.modelName,
          brandId:model.brand.brandId,
          brandName:model.brand.brandName
        }
      });
      setModels(models);
    }
  }

  const handleEditClick = (id) => {
    let currentModel = models.find(model => model.modelId == id);
    setFormData(currentModel);
    setModalMode(ModalMode.EDIT);
    setModalOpen(true);
  }

  const handleCreateClick = () => {
    setFormData({ modelName: null });
    setModalMode(ModalMode.INSERT);
    setModalOpen(true);
  }

  const handleSaveClick = async (values) => {
    let result;
    if (modalMode == ModalMode.INSERT)
      result = await ModelService.CreateAsync(values);
    else
      result = await ModelService.UpdateAsync(values);
    toast(result.message, { type: result.isSuccess ? "success" : "error" });
    setModalOpen(false);
    await handleGetModels();
  }

  const handleDeleteClick = (id) => {
    confirm({
      title: "Uyarı",
      content: "Kayıt silinecek. Devam etmek ister misiniz?",
      onOk: async () => {
        const result = await ModelService.DeleteAsync(id);
        if (result.isSuccess) {
          await handleGetModels();
        }
        toast(result.message, { type: result.isSuccess ? "success" : "error" });
      }
    });
  }

  const columns = [
    {
      title: 'Model Adı',
      dataIndex: 'modelName',
      key: 'modelName',
      filters: models.map(model => {
        return {
          text: model.modelName,
          value: model.modelName
        }
      }),
      onFilter: (value, record) => record.modelName.includes(value),
      sorter: (a, b, sortOrder) => {
        if (sortOrder === 'ascend') {
          return a.modelName.localeCompare(b.modelName);
        } else if (sortOrder === 'descend') {
          return a.modelName.localeCompare(b.modelName);
        }
        return 0;
      },
    },
    {
      title: 'Markası',
      dataIndex: 'brandName', // Nested veri için doğru erişim
      key: 'brandName',
      filters: models.map(model => ({
        text: model.brandName,
        value: model.brandName,
      })),
      onFilter: (value, record) => record.brandName.includes(value),
      sorter: (a, b, sortOrder) => {
        if (sortOrder === 'ascend') {
          return a.brandName.localeCompare(b.brandName);
        } else if (sortOrder === 'descend') {
          return b.brandName.localeCompare(a.brandName);
        }
        return 0;
      },
    },
    {
      key: 'action',
      render: (_, record) => (
        <EditButtonGroup
          handleEditClick={() => handleEditClick(record.modelId)}
          handleDeleteClick={() => handleDeleteClick(record.modelId)} />
      ),
    },
  ];


  return (
    <>
      <CreateButtonGroup
        justify="end"
        style={{ marginBottom: "15px" }}
        buttonText="Yeni Model Ekle"
        handleCreateClick={() => handleCreateClick()} />
      <Table columns={columns} dataSource={models} />
      <Modal title={modalMode == ModalMode.EDIT ? "Model Düzenle" : "Model Ekle"} open={modalOpen} footer={null} onCancel={() => { setModalOpen(false) }}>
        <Edit
          initialFormData={formData}
          handleSaveClick={handleSaveClick} />
      </Modal>
    </>

  )
}

export default Brand