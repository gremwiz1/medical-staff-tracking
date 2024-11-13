import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { addDoctor, editDoctor } from "../slices/doctorsSlice";

interface DoctorModalProps {
  visible: boolean;
  onClose: () => void;
  doctor?: any;
}

const DoctorModal: React.FC<DoctorModalProps> = ({
  visible,
  onClose,
  doctor,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (doctor) {
      form.setFieldsValue(doctor);
    } else {
      form.resetFields();
    }
  }, [doctor, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (doctor) {
          dispatch(editDoctor({ ...values, id: doctor.id }));
        } else {
          dispatch(addDoctor({ ...values, id: Date.now() }));
        }
        onClose();
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validation Failed:", info); // Можно добавить лог для отладки ошибок валидации
      });
  };

  return (
    <Modal
      visible={visible}
      title={doctor ? "Редактировать врача" : "Добавить врача"}
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
        <Form.Item name="isHead" valuePropName="checked">
          <Checkbox>Заведующий отделением</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DoctorModal;
