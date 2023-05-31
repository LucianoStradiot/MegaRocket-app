import { useEffect, useState } from 'react';
import styles from './admins.module.css';

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

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);

      const { data: admins } = await response.json();

      setAdmins(admins);
    } catch (error) {
      alert(error);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'DELETE'
      });

      setAdmins((currentAdmins) => {
        return currentAdmins.filter((admin) => admin._id !== id);
      });
      alert('Admin deleted succesfully!');
      getAdmins();
    } catch (error) {
      alert(error);
    }
  };

  const createAdmin = async () => {
    try {
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
        alert(createdAdminsData.message);
      } else {
        throw new Error(createdAdminsData.message);
      }
    } catch (error) {
      alert(error);
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
        setAdmins((currentAdmins) => {
          const updatedAdmins = [...currentAdmins];
          updatedAdmins[dataIndex] = updatedAdmin.data;
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
        alert(updatedAdmin.message);
      } else {
        throw new Error(updatedAdmin.message);
      }
    } catch (error) {
      alert(error);
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

    const data = admins.find((admin) => admin._id === id);
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

  return (
    <div className={styles.container}>
      <section>
        <h2 className={styles.title}>Admins</h2>
        <button className={styles.createBtn} onClick={create}>
          Create
        </button>
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
            {admins.map((admin) => {
              return (
                <tr className={styles.rows} key={admin._id}>
                  <td className={styles.columns}>{admin.firstName}</td>
                  <td className={styles.columns}>{admin.lastName}</td>
                  <td className={styles.columns}>{admin.dni}</td>
                  <td className={styles.columns}>{admin.phone}</td>
                  <td className={styles.columns}>{admin.email}</td>
                  <td className={styles.columns}>{admin.city}</td>
                  <td>
                    <button className={styles.editBtn} onClick={() => edit(admin._id)}>
                      Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={() => deleteAdmin(admin._id)}>
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isVisible && (
          <form className={styles.container} onSubmit={onSubmit}>
            <div className={styles.block}>
              <div className={styles.firstPart}>
                <label>First Name</label>
                <input
                  name="firstName"
                  id="firstName"
                  value={formChange.firstName}
                  type="text"
                  onChange={onChangeInput}
                />
                <label>Last Name</label>
                <input
                  name="lastName"
                  id="lastName"
                  value={formChange.lastName}
                  type="text"
                  onChange={onChangeInput}
                />
                <label>DNI</label>
                <input
                  name="dni"
                  id="dni"
                  value={formChange.dni}
                  type="text"
                  onChange={onChangeInput}
                />
                <label>Phone</label>
                <input
                  name="phone"
                  id="phone"
                  value={formChange.phone}
                  type="text"
                  onChange={onChangeInput}
                />
                <button className={styles.cancelBtn} onClick={cancel}>
                  Cancel
                </button>
              </div>
              <div className={styles.firstPart}>
                <label>Email</label>
                <input
                  name="email"
                  id="email"
                  value={formChange.email}
                  type="text"
                  onChange={onChangeInput}
                />
                <label>City</label>
                <input
                  name="city"
                  id="city"
                  value={formChange.city}
                  type="text"
                  onChange={onChangeInput}
                />
                <label>Password</label>
                <input
                  name="password"
                  id="password"
                  value={formChange.password}
                  type="password"
                  onChange={onChangeInput}
                />
                {buttonAddIsVisible && (
                  <button className={`${styles.createBtn} && ${styles.createBtn2}`} type="submit">
                    Create
                  </button>
                )}
                {buttonSaveIsVisible && (
                  <button className={`${styles.createBtn} && ${styles.createBtn2}`} onClick={save}>
                    Save
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default Admins;
