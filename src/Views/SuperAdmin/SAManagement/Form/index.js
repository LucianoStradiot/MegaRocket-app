import TextInput from 'Components/Shared/TextInput';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import styles from 'Views/SuperAdmin/SAManagement/Form/formSuperAdmin.module.css';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSuperAdmin, editSuperAdmin, getSuperAdmins } from 'Redux/SuperAdmins/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const FormSuperAdmin = () => {
  const superAdmins = useSelector((state) => state.superAdmins.data);
  const isLoading = useSelector((state) => state.superAdmins.loading);
  const dispatch = useDispatch();

  const [btnAddIsVisible, setAddVisible] = useState(false);
  const [btnSaveIsVisible, setSaveVisible] = useState(false);
  const [isUserCreated, setIsUserCreated] = useState(false);

  const [isModalOpen, setModalIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });
  const history = useHistory();
  const { id } = useParams();

  const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const schema = Joi.object({
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.pattern.base': 'Email must be in a valid format'
    }),
    password: Joi.string().regex(RGXPassword).min(8).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
    })
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  const submit = async (dataForm) => {
    const response = await dispatch(createSuperAdmin(dataForm));
    if (response.error) {
      setResponseModal({
        title: 'Error!',
        description: response.message,
        isConfirm: false
      });
      setModalIsOpen(true);
      setIsUserCreated(false);
    } else {
      setResponseModal({
        title: 'Success!',
        description: response.message
      });
      setModalIsOpen(true);
      setIsUserCreated(true);
    }
  };

  const save = async (dataForm) => {
    const response = await dispatch(editSuperAdmin(id, dataForm));
    if (response.error) {
      setResponseModal({
        title: 'Error!',
        description: response.message
      });
      setModalIsOpen(true);
      setIsUserCreated(false);
    } else {
      setResponseModal({
        title: 'Success!',
        description: response.message
      });
      setModalIsOpen(true);
      setIsUserCreated(true);
    }
  };

  const formEdit = (id) => {
    if (id) {
      const data = superAdmins.find((aux) => aux._id === id);
      if (data) {
        setValue('email', data.email);
        setValue('password', data.password);
        setAddVisible(false);
        setSaveVisible(true);
        setIsUserCreated(false);
      } else {
        return false;
      }
    } else {
      setAddVisible(true);
      setSaveVisible(false);
      setIsUserCreated(true);
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
    dispatch(getSuperAdmins());
  }, []);

  useEffect(() => {
    formEdit(id);
  }, [superAdmins]);

  const onSubmit = (data) => {
    id ? save(data) : submit(data);
  };

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
        <form className={styles.form} id="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className={styles.inputContainer}>
              <TextInput
                labelName="Email"
                inputType="text"
                name="email"
                id="email"
                register={register}
                error={errors.email?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <TextInput
                labelName="Password"
                inputType="password"
                name="password"
                id="password"
                register={register}
                error={errors.password?.message}
              />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <div>
              <Button text="Cancel" clickAction={() => history.goBack()} type="cancel" />
              <Button text="Reset" clickAction={() => reset()} type="reset" />
            </div>
            {btnAddIsVisible && <Button text="Add" type="submit" />}
            {btnSaveIsVisible && <Button text="Save" type="submit" />}
          </div>
        </form>
      </section>
    </>
  );
};

export default FormSuperAdmin;
