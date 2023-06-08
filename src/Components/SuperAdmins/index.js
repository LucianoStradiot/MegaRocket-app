import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Button from '../Shared/Button';
import TextInput from '../Shared/TextInput';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';

function SuperAdmins() {
  const [superAdmins, setSuperAdmin] = useState([]);
  const [idStatus, setIdStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [btnAddIsVisible, setAddVisible] = useState(false);
  const [btnSaveIsVisible, setSaveVisible] = useState(false);
  const [dataForm, setDataForm] = useState({
    email: '',
    password: ''
  });
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admin`);
      const { data: superAdmins } = await response.json();
      setSuperAdmin(superAdmins);
    } catch (error) {
      setResponseModal({
        title: 'ERROR!',
        description: error.message,
        isConfirm: false
      });
      setIsOpen(true);
    }
  };
  const deleteSuperAdmin = async () => {
    try {
      const responseSuperAdmin = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admin/${idDelete}`,
        {
          method: 'DELETE'
        }
      );
      setSuperAdmin((currentAdmins) => {
        return currentAdmins.filter((superAdmins) => superAdmins._id !== idDelete);
      });
      const response = await responseSuperAdmin.json();
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
        setSuperAdmin((currentSuperAdmins) => {
          return [...currentSuperAdmins, createdSuperAdminData.data];
        });
        setDataForm({
          email: '',
          password: ''
        });
        setResponseModal({
          title: 'Succes!',
          description: createdSuperAdminData.message,
          isConfirm: false
        });
        setIsOpen(true);
      } else {
        setResponseModal({
          title: 'ERROR!',
          description: createdSuperAdminData.message,
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
  const updSuperAdmin = async () => {
    try {
      const updatedSuperAdmin = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admin/${idStatus}`,
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
        const dataIndex = superAdmins.findIndex((superAdmin) => superAdmin._id === idStatus);
        setSuperAdmin((currentSuperAdmin) => {
          const updatedSuperAdmins = [...currentSuperAdmin];
          updatedSuperAdmins[dataIndex] = updSuperAdminData.data;
          return updatedSuperAdmins;
        });
        setDataForm({
          email: '',
          password: ''
        });
        setIdStatus('');
        setResponseModal({
          title: 'Succes!',
          description: updSuperAdminData.message,
          isConfirm: false
        });
        setIsOpen(true);
      } else {
        setResponseModal({
          title: 'ERROR!',
          description: updSuperAdminData.message,
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
  const onChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    createSuperAdmin();
    formInvisible();
  };
  const save = () => {
    updSuperAdmin();
    formInvisible();
  };
  const cancel = () => {
    formInvisible();
  };

  const create = () => {
    formVisible();
    addVisible();

    setDataForm({
      email: '',
      password: ''
    });
  };

  const edit = (id) => {
    formVisible();
    saveVisible();
    setIdStatus(id);

    const data = superAdmins.find((superAdmin) => superAdmin._id === id);

    setDataForm({
      email: data.email,
      password: data.password
    });
  };

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

  useEffect(() => {
    getSuperAdmins();
  }, []);

  return (
    <section className={styles.container}>
      <Modal
        title={responseModal.title}
        desc={responseModal.description}
        isOpen={isOpen}
        confirmModal={responseModal.isConfirm}
        handleClose={() => setIsOpen(!isOpen)}
        deleteFunction={() => deleteSuperAdmin(idDelete)}
      />
      <h2 className={styles.h2}>SuperAdmin</h2>
      <section>
        <Link to="/superAdmins/form">
          <Button text="Open form" clickAction={() => console.log('hola')} type="create" />
        </Link>
        <Button text="Create" clickAction={create} type="create" />
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}>Email</th>
              <th className={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {superAdmins.map((superAdmin) => {
              return (
                <tr key={superAdmin._id}>
                  <td className={styles.row}>{superAdmin.email}</td>
                  <td className={styles.row}>
                    <div className={styles.containerButtons}>
                      <Button text="Edit" type="edit" clickAction={() => edit(superAdmin._id)} />
                      <Button
                        text="X"
                        type="deleteCancel"
                        clickAction={() => openModalConfirm(superAdmin._id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isVisible && (
          <section className={styles.sectionForm}>
            <form className={styles.form} onSubmit={submit} id="form">
              <div>
                <div className={styles.inputContainer}>
                  <TextInput
                    labelName="First name"
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
                <Button text="Cancel" clickAction={cancel} type="cancel" />
                {btnAddIsVisible && <Button text="Add" clickAction={submit} type="add" />}
                {btnSaveIsVisible && <Button text="Save" clickAction={save} type="save" />}
              </div>
            </form>
          </section>
        )}
      </section>
    </section>
  );
}

export default SuperAdmins;
