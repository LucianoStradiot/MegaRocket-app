import React, { useState, useEffect } from 'react';
import TextInput from '../../Shared/TextInput';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import styles from './formSuperAdmin.module.css';
import { useParams, useHistory } from 'react-router-dom';

const FormSuperAdmin = () => {
  const [superAdmins, setSuperAdmin] = useState([]);
  const [btnAddIsVisible, setAddVisible] = useState(false);
  const [btnSaveIsVisible, setSaveVisible] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [dataForm, setDataForm] = useState({
    email: '',
    password: ''
  });
  const [isModalOpen, setModalIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });
  const history = useHistory();
  const { id } = useParams();

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin`);
      const { data: superAdmins } = await response.json();
      setSuperAdmin(superAdmins);
    } catch (error) {
      setResponseModal({
        title: 'Error!',
        description: error.message,
        isConfirm: false
      });
      setModalIsOpen(true);
    }
  };

  const createSuperAdmin = async () => {
    try {
      const createdSuperAdmin = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataForm)
      });
      const createdSuperAdminData = await createdSuperAdmin.json();
      if (createdSuperAdmin.ok) {
        if (superAdmins) {
          setSuperAdmin((currentSuperAdmins) => {
            return [...currentSuperAdmins, createdSuperAdminData.data];
          });
        } else {
          setSuperAdmin(createdSuperAdminData.data);
        }
        setDataForm({
          email: '',
          password: ''
        });
        setResponseModal({
          title: 'Success!',
          description: createdSuperAdminData.message,
          isConfirm: false
        });
        setModalIsOpen(true);
        setIsUserCreated(true);
      } else {
        setResponseModal({
          title: 'Error!',
          description: createdSuperAdminData.message,
          isConfirm: false
        });
        setIsUserCreated(false);
        setModalIsOpen(true);
      }
    } catch (error) {
      setResponseModal({
        title: 'Error!',
        description: error.message,
        isConfirm: false
      });
      setModalIsOpen(true);
    }
  };

  const updSuperAdmin = async () => {
    try {
      const updatedSuperAdmin = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admin/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataForm)
        }
      );
      const updSuperAdminData = await updatedSuperAdmin.json();
      if (updatedSuperAdmin.ok) {
        setDataForm({
          email: '',
          password: ''
        });
        setResponseModal({
          title: 'Success!',
          description: updSuperAdminData.message,
          isConfirm: false
        });
        setIsUserCreated(true);
        setModalIsOpen(true);
      } else {
        setResponseModal({
          title: 'Error!',
          description: updSuperAdminData.message,
          isConfirm: false
        });
        setIsUserCreated(false);
        setModalIsOpen(true);
      }
    } catch (error) {
      setResponseModal({
        title: 'Error!',
        description: error.message,
        isConfirm: false
      });
      setModalIsOpen(true);
    }
  };

  const onChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    createSuperAdmin();
  };
  const save = () => {
    updSuperAdmin();
  };

  const formEdit = (id) => {
    if (id) {
      const data = superAdmins.find((aux) => aux._id === id);
      if (data) {
        setDataForm({
          email: data.email,
          password: data.password
        });
        setAddVisible(false);
        setSaveVisible(true);
      } else {
        return false;
      }
    } else {
      setDataForm({
        email: '',
        password: ''
      });
      setAddVisible(true);
      setSaveVisible(false);
    }
  };

  const closeForm = () => {
    if (isUserCreated) {
      setModalIsOpen(false);
      history.goBack();
    }
    setModalIsOpen(!isModalOpen);
  };

  useEffect(() => {
    getSuperAdmins();
  }, []);

  useEffect(() => {
    formEdit(id);
  }, [superAdmins]);

  return (
    <section className={styles.sectionForm}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isModalOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={closeForm}
      />
      <form className={styles.form} id="form">
        <div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Email"
              inputType="text"
              inputName="email"
              id="email"
              text={dataForm.email}
              changeAction={onChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <TextInput
              labelName="Password"
              inputType="password"
              inputName="password"
              id="password"
              text={dataForm.password}
              changeAction={onChange}
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button text="Cancel" clickAction={() => history.goBack()} type="cancel" />
          {btnAddIsVisible && <Button text="Add" clickAction={submit} type="add" />}
          {btnSaveIsVisible && <Button text="Save" clickAction={save} type="save" />}
        </div>
      </form>
    </section>
  );
};

export default FormSuperAdmin;
