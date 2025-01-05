import React, { useEffect, useState } from 'react'
import { Table, Button, Space, Row, Modal } from 'antd'
import BrandService from '../services/BrandService';
import ModalMode from '../utils/types/ModalMode';
import Edit from '../components/brand/Edit';
import { toast } from 'react-toastify';
import EditButtonGroup from '../components/common/EditButtonGroup';
import CreateButtonGroup from '../components/common/CreateButtonGroup';

const Brand = () => {

  //states
  const [brands, setBrands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(ModalMode.INSERT);
  const [formData, setFormData] = useState(null);

  //hooks
  useEffect(() => {
    handleGetBrands().then(() => { }).catch(() => { });
  }, []);

  const { confirm } = Modal


  //functions
  const handleGetBrands = async () => {
    const result = await BrandService.GetAllAsync();
    if (result.isSuccess) {

      setBrands(
        result.data.map(brand => {
          return {
            key: brand.brandId,
            brandId: brand.brandId,
            brandName: brand.brandName
          }
        }));
    }
  }

  const handleEditClick = (id) => {
    let currentBrand = brands.find(brand => brand.brandId == id);
    setFormData(currentBrand);
    setModalMode(ModalMode.EDIT);
    setModalOpen(true);
  }

  const handleCreateClick = () => {
    setFormData({ brandName: null });
    setModalMode(ModalMode.INSERT);
    setModalOpen(true);
  }

  const handleSaveClick = async (values) => {
    let result;
    if (modalMode == ModalMode.INSERT)
      result = await BrandService.CreateAsync(values);
    else
      result = await BrandService.UpdateAsync(values);

    toast(result.message, { type: result.isSuccess ? "success" : "error" });
    setModalOpen(false);
    await handleGetBrands();
  }

  const handleDeleteClick = (id) => {
    confirm({
      title: "Uyarı",
      content: "Kayıt silinecek. Devam etmek ister misiniz?",
      onOk: async () => {
        const result = await BrandService.DeleteAsync(id);
        if (result.isSuccess) {
          await handleGetBrands();
        }
        toast(result.message, { type: result.isSuccess ? "success" : "error" });
      }
    });
  }

  const columns = [
    {
      title: 'Marka Adı',
      dataIndex: 'brandName',
      key: 'name',
      filters: brands.map(brand =>{
        return {
          text:brand.brandName,
          value:brand.brandName
        }
      }),
      onFilter: (value, record) => record.brandName.includes(value),
      sorter: (a, b, sortOrder) => {
        if (sortOrder === 'ascend') {
          return a.brandName.localeCompare(b.brandName);
        } else if (sortOrder === 'descend') {
          return a.brandName.localeCompare(b.brandName);
        }
        return 0;
      },
    },
    {
      key: 'action',
      render: (_, record) => (
        <EditButtonGroup
          handleEditClick={() => handleEditClick(record.brandId)}
          handleDeleteClick={() => handleDeleteClick(record.brandId)} />
      ),
    },
  ];


  return (
    <>
      <CreateButtonGroup
        justify="end"
        style={{ marginBottom: "15px" }}
        buttonText="Yeni Marka Ekle"
        handleCreateClick={() => handleCreateClick()} />
      <Table columns={columns} dataSource={brands} />
      <Modal title={modalMode == ModalMode.EDIT ? "Model Düzenle" : "Model Ekle"} open={modalOpen} footer={null} onCancel={() => { setModalOpen(false) }}>
        <Edit
          initialFormData={formData}
          handleSaveClick={handleSaveClick} />
      </Modal>
    </>

  )
}

export default Brand