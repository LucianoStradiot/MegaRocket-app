import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';

function SuperAdmins() {
  const [superAdmins, setSuperAdmin] = useState([]);
  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admin`);
      if (superAdmins.length >= 4) {
        const { data: superAdmins } = await response.json();
        const firstFourSuperAdmins = [];
        for (let i = 0; i < superAdmins.length && i < 4; i++) {
          firstFourSuperAdmins.push(superAdmins[i]);
        }
        setSuperAdmin(firstFourSuperAdmins);
      } else {
        const { data: superAdmins } = await response.json();
        setSuperAdmin(superAdmins);
      }
    } catch (error) {
      console.log(error);
      // show error in UI
    }
  };
  const deleteSuperAdmin = async (id) => {
    try {
      // Delete a la BD
      await fetch(`${process.env.REACT_APP_API_URL}/super-admin/${id}`, {
        method: 'DELETE'
      });

      // Delete in Front End
      setSuperAdmin((currentAdmins) => {
        return currentAdmins.filter((superAdmins) => superAdmins._id !== id);
      });

      getSuperAdmins();
    } catch (error) {
      console.error(error);
      // show error in UI
    }
  };

  const createSuperAdmin = async () => {
    try {
      const createdSuperAdmin = await fetch(`${process.env.REACT_APP_API_URL}/super-admin/`, {
        method: 'POST',
        body: JSON.stringify({
          email: '',
          password: ''
        })
      });
      setSuperAdmin((currentAdmins) => {
        return [...currentAdmins, createdSuperAdmin];
      });
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
        <body>
          {superAdmins.map((superAdmin) => {
            return (
              <tr key={superAdmin._id}>
                <td>{superAdmin.email}</td>
                <button onClick={() => deleteSuperAdmin(superAdmin._id)}>X</button>
              </tr>
            );
          })}
        </body>
      </table>
      <form id="formSA" onSubmit={onSubmit}>
        <label>Email</label>
        <input type="text" name="email" value="email" />
        <label>Password</label>
        <input type="password" name="password" value="email" />
        <button type="submit">Create</button>
      </form>
    </section>
  );
}

export default SuperAdmins;
