import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';

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
  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admin`);
      const { data: superAdmins } = await response.json();
      setSuperAdmin(superAdmins);
    } catch (error) {
      alert(error);
    }
  };
  const deleteSuperAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/super-admin/${id}`, {
        method: 'DELETE'
      });
      setSuperAdmin((currentAdmins) => {
        return currentAdmins.filter((superAdmins) => superAdmins._id !== id);
      });
      alert('SuperAdmin deleted succesfully!');
      getSuperAdmins();
    } catch (error) {
      alert(error);
    }
  };

  const createSuperAdmin = async () => {
    try {
      const createdSuperAdmin = await fetch(`${process.env.REACT_APP_API_URL}/super-admin/`, {
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
        alert(createdSuperAdminData.message);
      } else {
        alert(createdSuperAdminData.message);
      }
    } catch (error) {
      alert(error);
    }
  };
  const updSuperAdmin = async () => {
    try {
      const updatedSuperAdmin = await fetch(
        `${process.env.REACT_APP_API_URL}/super-admin/${idStatus}`,
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
        alert(updSuperAdminData.message);
      } else {
        alert(updSuperAdminData.message);
      }
    } catch (error) {
      alert(error);
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

  useEffect(() => {
    getSuperAdmins();
  }, []);

  return (
    <section className={styles.container}>
      <h2>SuperAdmin</h2>
      <section>
        <button onClick={create} className={styles.createButton}>
          Create
        </button>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {superAdmins.map((superAdmin) => {
              return (
                <tr key={superAdmin._id}>
                  <td className={styles.row}>{superAdmin.email}</td>
                  <td className={styles.row}>
                    <div className={styles.containerButtons}>
                      <button className={styles.updateButton} onClick={() => edit(superAdmin._id)}>
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => deleteSuperAdmin(superAdmin._id)}
                      >
                        X
                      </button>
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
                  <label className={styles.label}>Email</label>
                  <input
                    className={styles.input}
                    type="text"
                    name="email"
                    id="email"
                    value={dataForm.email}
                    onChange={onChange}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={styles.label}>Password</label>
                  <input
                    className={styles.input}
                    type="password"
                    name="password"
                    id="password"
                    value={dataForm.password}
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className={styles.btnContainer}>
                <button className={`${styles.button} ${styles.btnCancel}`} onClick={cancel}>
                  Cancel
                </button>
                {btnAddIsVisible && (
                  <button className={styles.button} onClick={submit}>
                    Add
                  </button>
                )}
                {btnSaveIsVisible && (
                  <button className={styles.button} onClick={save}>
                    Save
                  </button>
                )}
              </div>
            </form>
          </section>
        )}
      </section>
    </section>
  );
}

export default SuperAdmins;
