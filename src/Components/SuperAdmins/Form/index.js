import React, { useState, useEffect } from 'react';
import TextInput from '../../Shared/TextInput';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';
import styles from './formSuperAdmin.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSuperAdmin,
  editSuperAdmin,
  getSuperAdmins
} from '../../../Redux/SuperAdmins/thunks';
import Spinner from '../../Shared/Spinner';

const FormSuperAdmin = () => {
  const superAdmins = useSelector((state) => state.superAdmins.data);
  const isLoading = useSelector((state) => state.superAdmins.loading);
  const dispatch = useDispatch();

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

  const onChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  };

  const submit = async () => {
    const response = await dispatch(createSuperAdmin(dataForm));
    if (response.error) {
      setResponseModal({
        title: 'Error!',
        description: response.message,
        isConfirm: false
      });
      setModalIsOpen(true);
      setIsUserCreated(true);
    } else {
      setResponseModal({
        title: 'Success!',
        description: response.message
      });
      setModalIsOpen(true);
      setIsUserCreated(false);
    }
  };

  const save = async () => {
    const response = await dispatch(editSuperAdmin(id, dataForm));
    if (response.error) {
      setResponseModal({
        title: 'Error!',
        description: response.message
      });
      setModalIsOpen(true);
      setIsUserCreated(true);
    } else {
      setResponseModal({
        title: 'Success!',
        description: response.message
      });
      setModalIsOpen(true);
      setIsUserCreated(false);
    }
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
        setIsUserCreated(false);
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
      setIsUserCreated(true);
    }
  };

  const closeForm = () => {
    if (!isUserCreated) {
      setModalIsOpen(false);
      history.goBack();
    }
    setModalIsOpen(!isModalOpen);
  };

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  useEffect(() => {
    formEdit(id);
  }, [superAdmins]);

  return (
    <>
      {isLoading && <Spinner />}
      <section className={styles.sectionForm}>
        <Modal
          title={responseModal.title}
          desc={responseModal.description}
          isOpen={isModalOpen}
          confirmModal={responseModal.isConfirm}
          handleClose={() => closeForm()}
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
            {btnAddIsVisible && <Button text="Add" clickAction={() => submit()} type="add" />}
            {btnSaveIsVisible && <Button text="Save" clickAction={() => save()} type="save" />}
          </div>
        </form>
      </section>
    </>
  );
};

export default FormSuperAdmin;
