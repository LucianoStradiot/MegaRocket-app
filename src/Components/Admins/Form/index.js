import { useEffect, useState } from 'react';
import styles from './admins-form.module.css';
import Button from '../../Shared/Button';
import TextInput from '../../Shared/TextInput';
import Modal from '../../Shared/Modal';
import { useParams, useHistory } from 'react-router-dom';

const AdminForm = () => {
  const history = useHistory();
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

  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const [isOpen, setIsOpen] = useState(false);

  const getAdminById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`);
      const data = await response.json();
      setFormChange({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        dni: data.data.dni,
        phone: data.data.phone,
        email: data.data.email,
        city: data.data.city,
        password: data.data.password
      });
    } catch (error) {
      console.error(error);
    }
  };
  const createAdmin = async () => {
    try {
      console.log('formChange', formChange);
      const createdAdmin = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formChange)
      });

      const createdAdminsData = await createdAdmin.json();
      if (createdAdmin.ok) {
        setFormChange({
          firstName: '',
          lastName: '',
          dni: '',
          phone: '',
          email: '',
          city: '',
          password: ''
        });
        setResponseModal({
          title: 'Succes!',
          description: createdAdminsData.message,
          isConfirm: false
        });
        setIsOpen(true);
      } else {
        setResponseModal({
          title: 'ERROR!',
          description: createdAdminsData.message,
          isConfirm: false
        });
        setIsOpen(true);
      }
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };

  const updateAdmins = async () => {
    try {
      const updatedAdminRes = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formChange)
      });

      const updatedAdmin = await updatedAdminRes.json();
      if (updatedAdminRes.ok) {
        setFormChange({
          firstName: '',
          lastName: '',
          dni: '',
          phone: '',
          email: '',
          city: '',
          password: ''
        });
        setResponseModal({
          title: 'Success!',
          description: updatedAdmin.message,
          isConfirm: false
        });
        setIsOpen(true);
      } else {
        setResponseModal({
          title: 'ERROR!',
          description: updatedAdmin.message,
          isConfirm: false
        });
        setIsOpen(true);
      }
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };

  const cancel = () => {
    history.push(`${process.env.REACT_APP_API_URL}/api/admins/`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      updateAdmins();
    } else {
      createAdmin();
    }
  };

  useEffect(() => {
    if (id) {
      getAdminById(id);
    }
  }, []);

  const onChangeInput = (e) => {
    setFormChange({
      ...formChange,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setIsOpen(!isOpen);
    history.push(`${process.env.REACT_APP_API_URL}/api/admins/`);
  };

  return (
    <section className={styles.sectionForm}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => handleClose()}
      />
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.block}>
          <div className={styles.firstPart}>
            <TextInput
              labelName="First name"
              inputType="text"
              inputName="firstName"
              id="firstName"
              text={formChange.firstName}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div className={styles.firstPart}>
            <TextInput
              labelName="Last name"
              inputType="text"
              inputName="lastName"
              id="lastName"
              text={formChange.lastName}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div className={styles.firstPart}>
            <TextInput
              labelName="DNI"
              inputType="text"
              inputName="dni"
              id="dni"
              text={formChange.dni}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div className={styles.firstPart}>
            <TextInput
              labelName="Phone"
              inputType="text"
              inputName="phone"
              id="phone"
              text={formChange.phone}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div className={styles.firstPart}>
            <TextInput
              labelName="Email"
              inputType="text"
              inputName="email"
              id="email"
              text={formChange.email}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div className={styles.firstPart}>
            <TextInput
              labelName="City"
              inputType="text"
              inputName="city"
              id="city"
              text={formChange.city}
              changeAction={(e) => onChangeInput(e)}
            />
          </div>
          <div className={styles.firstPart}>
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
          <Button text="Confirm" clickAction={onSubmit} type="Create" />
        </div>
      </form>
    </section>
  );
};

export default AdminForm;
