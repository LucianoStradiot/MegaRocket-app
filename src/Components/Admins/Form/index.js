import { useState, useEffect } from 'react';
import styles from './admins-form.module.css';
import Button from '../../Shared/Button';
import TextInput from '../../Shared/TextInput';
import Modal from '../../Shared/Modal';
import { useParams, useHistory } from 'react-router-dom';
import { createAdmin, putAdmins } from '../../../Redux/Admins/thunks';
import { useDispatch, useSelector } from 'react-redux';
const AdminForm = () => {
  const history = useHistory();
  const admins = useSelector((state) => state.admins.data);
  const { id } = useParams();
  const [formChange, setFormChange] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: ''
  });
  const dispatch = useDispatch();
  const [isAdminCreated, setIsAdminCreated] = useState(false);

  const [responseModal, setResponseModal] = useState({
    title: '',
    description: ''
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    formEdit(id);
  }, []);

  const formEdit = (id) => {
    if (id) {
      const data = admins.find((aux) => aux._id === id);
      console.log('data', data);
      if (data) {
        setFormChange({
          firstName: data.firstName,
          lastName: data.lastName,
          dni: data.dni,
          phone: data.phone,
          email: data.email,
          city: data.city,
          password: data.password
        });
      }
    }
  };

  const handleCreateAdmin = async () => {
    try {
      const response = await dispatch(createAdmin(formChange));
      if (!response.error) {
        setIsAdminCreated(true);
        setResponseModal({
          title: 'Success!',
          description: response.message
        });
        setIsOpen(true);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setIsAdminCreated(false);
      setResponseModal({
        title: 'Error!',
        description: error.message
      });
      setIsOpen(true);
    }
  };

  const handleupdateAdmins = async () => {
    const payload = {
      id: id,
      body: formChange
    };
    try {
      const response = await dispatch(putAdmins(payload));

      if (response.error) {
        throw new Error(response.message);
      } else {
        setIsAdminCreated(true);
        setResponseModal({
          title: 'Success!',
          description: response.message
        });
      }
      setIsOpen(true);
    } catch (error) {
      setIsAdminCreated(false);
      setResponseModal({
        title: 'Error!',
        description: error.message
      });
      setIsOpen(true);
    }
  };

  const cancel = () => {
    history.push('/admins');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      handleupdateAdmins();
    } else {
      handleCreateAdmin();
    }
  };

  const onChangeInput = (e) => {
    setFormChange({
      ...formChange,
      [e.target.name]: e.target.value
    });
  };

  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeForm = () => {
    if (isAdminCreated) {
      setIsOpen(false);
      history.goBack();
    } else {
      switchIsOpen();
    }
  };

  return (
    <section className={styles.sectionForm}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        handleClose={() => closeForm()}
      />
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.subContainer}>
          <div>
            <TextInput
              labelName="First name"
              inputType="text"
              inputName="firstName"
              id="firstName"
              text={formChange.firstName}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div>
            <TextInput
              labelName="Last name"
              inputType="text"
              inputName="lastName"
              id="lastName"
              text={formChange.lastName}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div>
            <TextInput
              labelName="DNI"
              inputType="text"
              inputName="dni"
              id="dni"
              text={formChange.dni}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div>
            <TextInput
              labelName="Phone"
              inputType="text"
              inputName="phone"
              id="phone"
              text={formChange.phone}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div>
            <TextInput
              labelName="Email"
              inputType="text"
              inputName="email"
              id="email"
              text={formChange.email}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div>
            <TextInput
              labelName="City"
              inputType="text"
              inputName="city"
              id="city"
              text={formChange.city}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div>
            <TextInput
              labelName="Password"
              inputType="password"
              inputName="password"
              id="password"
              text={formChange.password}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
        </div>
        <div className={styles.btnContainer}>
          <Button text="Cancel" clickAction={cancel} type="cancel" />
          {!id && <Button text="Add" clickAction={onSubmit} type="Create" />}
          {id && <Button text="Save" clickAction={onSubmit} type="Create" />}
        </div>
      </form>
    </section>
  );
};

export default AdminForm;
