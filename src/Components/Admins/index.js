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
  };

  const onChangeInput = (e) => {
    setFormChange({
      ...formChange,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <section>
        <h2>Admins</h2>
        {admins.map((admin) => {
          return (
            <table key={admin._id}>
              <tbody>
                <tr>
                  <td>{admin.firstName}</td>
                  <td>{admin.lastName}</td>
                  <td>{admin.dni}</td>
                  <td>{admin.phone}</td>
                  <td>{admin.email}</td>
                  <td>{admin.city}</td>
                  <td>
                    <button className={styles.deleteButton} onClick={() => deleteAdmin(admin._id)}>
                      X
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
        <form onSubmit={onSubmit}>
          <div className={styles.block}>
            <div className={styles.firstPart}>
              <label>First Name</label>
              <input name="firstName" type="text" onChange={onChangeInput} />
              <label>Last Name</label>
              <input name="lastName" type="text" onChange={onChangeInput} />
              <label>DNI</label>
              <input name="dni" type="text" onChange={onChangeInput} />
              <label>Phone</label>
              <input name="phone" type="text" onChange={onChangeInput} />
            </div>
            <div className={styles.firstPart}>
              <label>Email</label>
              <input name="email" type="text" onChange={onChangeInput} />
              <label>City</label>
              <input name="city" type="text" onChange={onChangeInput} />
              <label>Password</label>
              <input name="password" type="text" onChange={onChangeInput} />
              <button type="submit">Send</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Admins;
