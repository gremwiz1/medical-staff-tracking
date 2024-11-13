import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Card, Modal, Input } from "antd";
import { RootState } from "../store/store";
import { deleteDoctor } from "../slices/doctorsSlice";
import DoctorModal from "../components/doctorModal";

const { Search } = Input;

const DoctorsPage: React.FC = () => {
  const doctors = useSelector((state: RootState) => state.doctors.doctors);
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any | null>(null);
  const [searchText, setSearchText] = useState("");

  const openModal = (doctor?: any) => {
    setEditingDoctor(doctor || null);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingDoctor(null);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const confirmDelete = (doctorId: number) => {
    Modal.confirm({
      title: "Вы уверены, что хотите удалить этого врача?",
      content: "Это действие нельзя будет отменить.",
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      onOk() {
        dispatch(deleteDoctor(doctorId));
      },
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = doctors.filter((doctor) =>
    doctor.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "ФИО",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a: any, b: any) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Отделение",
      dataIndex: "department",
      key: "department",
      filters: [
        { text: "Кардиологическое", value: "кардиологическое" },
        { text: "Хирургическое", value: "хирургическое" },
      ],
      onFilter: (value: any, record: any) => record.department === value,
    },
    {
      title: "Заведующий",
      dataIndex: "isHead",
      key: "isHead",
      filters: [
        { text: "Да", value: true },
        { text: "Нет", value: false },
      ],
      onFilter: (value: any, record: any) => record.isHead === value,
      render: (isHead: boolean) => (isHead ? "Да" : "Нет"),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button onClick={() => openModal(record)}>Редактировать</Button>
          <Button onClick={() => confirmDelete(record.id)}>Удалить</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => openModal()}
        style={{ marginBottom: 16 }}
      >
        Добавить врача
      </Button>
      <Search
        placeholder="Поиск по ФИО"
        value={searchText}
        onChange={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      {isMobile ? (
        filteredData.map((doctor) => (
          <Card key={doctor.id} style={{ marginBottom: 16 }}>
            <p>
              <b>ФИО:</b> {doctor.fullName}
            </p>
            <p>
              <b>Отделение:</b> {doctor.department}
            </p>
            <p>
              <b>Заведующий:</b> {doctor.isHead ? "Да" : "Нет"}
            </p>
            <Button onClick={() => openModal(doctor)}>Редактировать</Button>
            <Button onClick={() => confirmDelete(doctor.id)}>Удалить</Button>
          </Card>
        ))
      ) : (
        <Table
          dataSource={filteredData}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      )}
      <DoctorModal
        visible={isModalVisible}
        onClose={closeModal}
        doctor={editingDoctor}
      />
    </>
  );
};

export default DoctorsPage;
