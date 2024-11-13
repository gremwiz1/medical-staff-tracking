import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Card, Modal, Input } from "antd";
import { RootState } from "../store/store";
import { deleteNurse } from "../slices/nursesSlice";
import NurseModal from "../components/nurseModal";

const { Search } = Input;

const NursesPage: React.FC = () => {
  const nurses = useSelector((state: RootState) => state.nurses.nurses);
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNurse, setEditingNurse] = useState<any | null>(null);
  const [searchText, setSearchText] = useState("");

  const openModal = (nurse?: any) => {
    setEditingNurse(nurse || null);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingNurse(null);
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

  const confirmDelete = (nurseId: number) => {
    Modal.confirm({
      title: "Вы уверены, что хотите удалить эту медсестру?",
      content: "Это действие нельзя будет отменить.",
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      onOk() {
        dispatch(deleteNurse(nurseId));
      },
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const filteredData = nurses.filter((nurse) =>
    nurse.fullName.toLowerCase().includes(searchText.toLowerCase())
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
        Добавить медсестру
      </Button>
      <Search
        placeholder="Поиск по ФИО"
        value={searchText}
        onChange={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      {isMobile ? (
        filteredData.map((nurse) => (
          <Card key={nurse.id} style={{ marginBottom: 16 }}>
            <p>
              <b>ФИО:</b> {nurse.fullName}
            </p>
            <p>
              <b>Отделение:</b> {nurse.department}
            </p>
            <Button onClick={() => openModal(nurse)}>Редактировать</Button>
            <Button onClick={() => confirmDelete(nurse.id)}>Удалить</Button>
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
      <NurseModal
        visible={isModalVisible}
        onClose={closeModal}
        nurse={editingNurse}
      />
    </>
  );
};

export default NursesPage;
