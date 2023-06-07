import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Button from '../Shared/Button';
import TextInput from '../Shared/TextInput';
import Modal from '../Shared/Modal';

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [idStatus, setIdStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);
  const [formChange, setFormChange] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    password: ''
  });
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  console.log(formChange);
  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);

      const { data: admins } = await response.json();

      setAdmins(admins);
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };

  const deleteAdmin = async () => {
    try {
      const responseAdmin = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${idDelete}`, {
        method: 'DELETE'
      });

      setAdmins((currentAdmins) => {
        return currentAdmins.filter((admin) => admin._id !== idDelete);
      });
      const response = await responseAdmin.json();
      setResponseModal({
        title: 'Succes!',
        description: response.message,
        isConfirm: false
      });
      setIsOpen(true);
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
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
        setAdmins((currentAdmins) => [...currentAdmins, createdAdminsData.data]);
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
      const updatedAdminRes = await fetch(
        `${process.env.REACT_APP_API_URL}/api/admins/${idStatus}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formChange)
        }
      );

      const updatedAdmin = await updatedAdminRes.json();
      if (updatedAdminRes.ok) {
        const dataIndex = admins.findIndex((admin) => admin._id === idStatus);
        const adminNotEdited = admins.find((admin) => admin._id === idStatus);

        setAdmins((currentAdmins) => {
          const updatedAdmins = [...currentAdmins];
          updatedAdmins[dataIndex] = updatedAdmin.data ? updatedAdmin.data : adminNotEdited;
          return updatedAdmins;
        });
        setFormChange({
          firstName: '',
          lastName: '',
          dni: '',
          phone: '',
          email: '',
          city: '',
          password: ''
        });
        setIdStatus('');
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

  useEffect(() => {
    getAdmins();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    createAdmin();
    formInvisible();
  };

  const onChangeInput = (e) => {
    setFormChange({
      ...formChange,
      [e.target.name]: e.target.value
    });
  };

  const save = () => {
    updateAdmins();
    formInvisible();
  };

  const create = () => {
    formVisible();
    addVisible();
    setFormChange({
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      password: ''
    });
  };

  const cancel = () => {
    formInvisible();
  };

  function edit(id) {
    formVisible();
    saveVisible();
    setIdStatus(id);

    const data = admins?.find((admin) => admin._id === id);
    setFormChange({
      firstName: data?.firstName,
      lastName: data?.lastName,
      dni: data?.dni,
      phone: data?.phone,
      email: data?.email,
      city: data?.city,
      password: data?.password
    });
  }

  const formVisible = () => {
    setIsVisible(true);
  };

  const formInvisible = () => {
    setIsVisible(false);
  };

  const addVisible = () => {
    setAddVisible(true);
    setSaveVisible(false);
  };

  const saveVisible = () => {
    setAddVisible(false);
    setSaveVisible(true);
  };

  const openModalConfirm = (id) => {
    setIdDelete(id);
    setResponseModal({
      title: '',
      description: 'Are you sure you want to delete it?',
      isConfirm: true
    });
    setIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <section>
        <Modal
          title={responseModal.title}
          desc={responseModal.description}
          isOpen={isOpen}
          confirmModal={responseModal.isConfirm}
          handleClose={() => setIsOpen(!isOpen)}
          deleteFunction={() => deleteAdmin(idDelete)}
        />
        <h2 className={styles.title}>Admins</h2>
        <Button text="Create" clickAction={create} type="create" />
        <table className={styles.mainTable}>
          <thead>
            <tr className={styles.rowsHead}>
              <th className={styles.columns1}>Name</th>
              <th>Last Name</th>
              <th>DNI</th>
              <th>Phone</th>
              <th>E-mail</th>
              <th>City</th>
              <th className={styles.columns2}></th>
            </tr>
          </thead>
          <tbody>
            {admins?.map((admin) => {
              return (
                <tr className={styles.rows} key={admin?._id}>
                  <td className={styles.columns}>{admin?.firstName}</td>
                  <td className={styles.columns}>{admin?.lastName}</td>
                  <td className={styles.columns}>{admin?.dni}</td>
                  <td className={styles.columns}>{admin?.phone}</td>
                  <td className={styles.columns}>{admin?.email}</td>
                  <td className={styles.columns}>{admin?.city}</td>
                  <td className={styles.columns}>
                    <Button text="Edit" type="edit" clickAction={() => edit(admin._id)} />
                    <Button
                      text="X"
                      type="deleteCancel"
                      clickAction={() => openModalConfirm(admin._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isVisible && (
          <section className={styles.sectionForm}>
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
                {buttonAddIsVisible && (
                  <Button text="Create" clickAction={onSubmit} type="Create" />
                )}
                {buttonSaveIsVisible && <Button text="Save" clickAction={save} type="save" />}
              </div>
            </form>
          </section>
        )}
      </section>
    </div>
  );
}

export default Admins;
