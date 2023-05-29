import { useEffect, useState } from 'react';
import styles from './admins.module.css';

function Admins() {
  const [admins, setAdmins] = useState([]);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`);

      const { data: admins } = await response.json();

      setAdmins(admins);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE'
      });

      setAdmins((currentAdmins) => {
        return currentAdmins.filter((admin) => admin._id !== id);
      });
      alert('Admin deleted succesfully!');
      getAdmins();
    } catch (error) {
      console.error(error);
    }
  };

  const createAdmin = async () => {
    try {
      const createdAdmin = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formChange)
      });

      if (createdAdmin.ok) {
        const createdAdminsData = await createdAdmin.json();
        setAdmins((currentAdmins) => [...currentAdmins, createdAdminsData.data]);
        console.log(createdAdminsData);
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
        const resp = await createdAdmin.json();
        alert(resp.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateAdmins = async () => {
    try {
      const updatedAdminRes = await fetch(`${process.env.REACT_APP_API_URL}/admins/${idStatus}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formChange)
      });

      if (updatedAdminRes.ok) {
        const updatedAdmin = await updatedAdminRes.json();
        if (updatedAdmin.error) {
          alert(updatedAdmin.message);
        } else {
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
        }
      } else {
        const resp = await updatedAdminRes.json();
        alert(resp.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    createAdmin();
    formVisible();
  };

  const onChangeInput = (e) => {
    setFormChange({
      ...formChange,
      [e.target.name]: e.target.value
    });
  };

  const [idStatus, setIdStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [buttonAddIsVisible, setAddVisible] = useState(false);
  const [buttonSaveIsVisible, setSaveVisible] = useState(false);

  const save = () => {
    updateAdmins();
    formInvisible();
  };

  const create = () => {
    formVisible();
    addVisible();
  };

  function modify(id) {
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
        <h2>Admins</h2>
        <button onClick={create}>Create</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>E-mail</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => {
              return (
                <tr key={admin._id}>
                  <td>{admin.firstName}</td>
                  <td>{admin.lastName}</td>
                  <td>{admin.email}</td>
                  <td>{admin.city}</td>
                  <td>
                    <button className={styles.updateButton} onClick={() => modify(admin._id)}>
                      Modify
                    </button>
                    <button className={styles.deleteButton} onClick={() => deleteAdmin(admin._id)}>
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isVisible && (
          <form onSubmit={onSubmit}>
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
                  <button className={styles.button} type="submit">
                    Create
                  </button>
                )}
                {buttonSaveIsVisible && (
                  <button className={styles.button} onClick={save}>
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
