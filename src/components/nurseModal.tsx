import React, { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { addNurse, editNurse } from "../slices/nursesSlice";

interface NurseModalProps {
  visible: boolean;
  onClose: () => void;
  nurse?: any;
}

const NurseModal: React.FC<NurseModalProps> = ({ visible, onClose, nurse }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (nurse) {
      form.setFieldsValue(nurse);
    } else {
      form.resetFields();
    }
  }, [nurse, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (nurse) {
          dispatch(editNurse({ ...values, id: nurse.id }));
        } else {
          dispatch(addNurse({ ...values, id: Date.now() }));
        }
        onClose();
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info); // Лог для отладки ошибок валидации
      });
  };

  return (
    <Modal
      visible={visible}
      title={nurse ? "Редактировать медсестру" : "Добавить медсестру"}
      onCancel={() => {
        onClose();
        form.resetFields(); 
      }}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="fullName"
          label="ФИО"
          rules={[{ required: true, message: "Пожалуйста, введите ФИО" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="department"
          label="Отделение"
          rules={[
            { required: true, message: "Пожалуйста, выберите отделение" },
          ]}
        >
          <Select placeholder="Выберите отделение">
            <Select.Option value="кардиологическое">Кардиология</Select.Option>
            <Select.Option value="хирургическое">Хирургия</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NurseModal;
