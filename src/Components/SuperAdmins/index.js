import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';

function SuperAdmins() {
  const [superAdmins, setSuperAdmin] = useState([]);
  const [dataFormValue, setDataFormValue] = useState({
    email: '',
    password: ''
  });
  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admin`);
      const { data: superAdmins } = await response.json();
      setSuperAdmin(superAdmins);
    } catch (error) {
      console.log(error);
      // show error in UI
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
      getSuperAdmins();
    } catch (error) {
      console.error(error);
      // show error in UI
    }
  };

  const onChange = (e) => {
    setDataFormValue({
      ...dataFormValue,
      [e.target.name]: e.target.value
    });
  };
  const createSuperAdmin = async () => {
    try {
      const createdSuperAdmin = await fetch(`${process.env.REACT_APP_API_URL}/super-admin/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataFormValue)
      });
      if (createdSuperAdmin.ok) {
        const createdSuperAdminData = await createdSuperAdmin.json();
        setSuperAdmin((currentAdmins) => [...currentAdmins, createdSuperAdminData.data]);
        console.log(createdSuperAdminData);
        setDataFormValue({
          email: '',
          password: ''
        });
      }
    } catch (error) {
      console.error(error);
      // show error in UI
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createSuperAdmin();
  };
  useEffect(() => {
    getSuperAdmins();
  }, []);

  return (
    <section className={styles.container}>
      <h2>SuperAdmin</h2>
      <button>Create</button>
      <table>
        <thead>
          <tr>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {superAdmins.map((superAdmin) => {
            return (
              <tr key={superAdmin._id}>
                <td>{superAdmin.email}</td>
                <td>
                  <button onClick={() => deleteSuperAdmin(superAdmin._id)}>X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <form id="formSA" onSubmit={onSubmit}>
        <label>Email</label>
        <input type="text" name="email" onChange={onChange} />
        <label>Password</label>
        <input type="password" name="password" onChange={onChange} />
        <button type="submit">Create</button>
      </form>
    </section>
  );
}

export default SuperAdmins;
