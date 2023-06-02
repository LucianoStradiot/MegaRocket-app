import { useEffect, useState } from 'react';
import styles from './members.module.css';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [memberValues, setMemberValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dni: '',
    phone: '',
    city: '',
    birthday: new Date(),
    postalCode: '',
    membership: '',
    isActive: true
  });
  const [idMember, setIdMember] = useState('');

  const getMembers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
    const data = await response.json();
    setMembers(data.data);
  };

  useEffect(() => {
    getMembers();
  }, []);

  const onChange = (e) => {
    setMemberValues({
      ...memberValues,
      [e.target.name]: e.target.value
    });
  };

  console.log(memberValues);

  const getDateValue = () => {
    const date = new Date(memberValues.birthday);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateValue = `${year}-${month}-${day}`;
    return dateValue;
  };

  const changeDateFormat = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (idMember === '') {
      addMember(memberValues);
    } else {
      updateMember(idMember);
    }
    setShowForm(false);
    setIdMember('');
    setMemberValues({
      firstName: '',
      lastName: '',
      email: '',
      dni: '',
      phone: '',
      city: '',
      birthday: new Date(),
      postalCode: '',
      membership: '',
      isActive: true
    });
  };

  const updateMember = async (idMember) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${idMember}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberValues)
      });

      const updatedMember = await response.json();
      if (response.ok) {
        const dataIndex = members.findIndex((Member) => Member._id === idMember);

        setMembers((currentMembers) => {
          const updatedMembers = [...currentMembers];
          updatedMembers[dataIndex] = updatedMember.data;
          return updatedMembers;
        });

        alert('Miembro actualizado exitosamente');
      } else {
        throw new Error('Error al actualizar el miembro');
      }
    } catch (error) {
      console.error(error);
      alert('Ha ocurrido un error al actualizar el miembro');
    }
  };

  const addMember = async (member) => {
    const dateFormat = changeDateFormat(member.birthday);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...member, birthday: dateFormat })
      });
      if (response.ok) {
        setMembers([...members, member]);
        alert('Miembro creado exitosamente');
        getMembers();
      } else {
        throw new Error('Error al crear el miembro');
      }
    } catch (error) {
      console.error(error);
      alert('Ha ocurrido un error al crear el miembro');
    }
  };

  const deleteMember = async (memberId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/members/${memberId}`, {
        method: 'DELETE'
      });
      setMembers([...members.filter((member) => member._id !== memberId)]);
      alert('Miembro eliminado exitosamente');
    } catch (error) {
      console.error(error);
      alert('Ha ocurrido un error al eliminar el miembro');
    }
  };

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      {showForm ? (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.subContainer}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>First Name</label>
              <input
                className={styles.input}
                name="firstName"
                type="text"
                value={memberValues.firstName}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Last Name</label>
                <input
                  className={styles.input}
                  name="lastName"
                  type="text"
                  value={memberValues.lastName}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  name="email"
                  type="text"
                  value={memberValues.email}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>DNI</label>
                <input
                  className={styles.input}
                  name="dni"
                  type="number"
                  value={memberValues.dni}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Phone</label>
                <input
                  className={styles.input}
                  name="phone"
                  type="number"
                  value={memberValues.phone}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>City</label>
                <input
                  className={styles.input}
                  name="city"
                  type="text"
                  value={memberValues.city}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Birthday</label>
                <input
                  className={styles.input}
                  name="birthday"
                  type="date"
                  value={getDateValue()}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>PostalCode</label>
                <input
                  className={styles.input}
                  name="postalCode"
                  type="number"
                  value={memberValues.postalCode}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Membership</label>
                <select
                  className={styles.input}
                  name="membership"
                  value={memberValues.membership}
                  onChange={(e) => onChange(e)}
                >
                  <option value="">Seleccionar</option>
                  <option value="Black Membership">Black Membership</option>
                  <option value="Classic Membership">Classic Membership</option>
                  <option value="Only Classes Membership">Only Classes Membership</option>
                </select>
              </div>
            </div>

            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Status</label>
                <select
                  className={styles.input}
                  name="isActive"
                  value={memberValues.isActive}
                  onChange={onChange}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
            </div>

            <button className={styles.button} type="submit">
              {idMember ? 'Edit' : 'Add'}
            </button>
            <button
              className={styles.button}
              onClick={() => {
                setShowForm(false);
                setIdMember('');
                setMemberValues({
                  firstName: '',
                  lastName: '',
                  email: '',
                  dni: '',
                  phone: '',
                  city: '',
                  birthday: new Date().toISOString(),
                  postalCode: '',
                  membership: '',
                  isActive: true
                });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <table className={styles.tableMember}>
            <thead>
              <tr>
                <th className={styles.thMember}>Name</th>
                <th className={styles.thMember}>Last Name</th>
                <th className={styles.thMember}></th>
                <th className={styles.thMember}></th>
              </tr>
            </thead>
            <tbody>
              {members?.length > 0 &&
                members?.map((member) => {
                  return (
                    <tr key={member._id}>
                      <td className={styles.tdMember}>{member.firstName}</td>
                      <td className={styles.tdMember}>{member.lastName}</td>
                      <td className={styles.tdMember}>
                        <button
                          className={styles.editButton}
                          onClick={() => {
                            setIdMember(member._id);
                            setShowForm(true);
                            setMemberValues({
                              firstName: member.firstName,
                              lastName: member.lastName,
                              email: member.email,
                              dni: member.dni,
                              phone: member.phone,
                              city: member.city,
                              birthday: member.birthday,
                              postalCode: member.postalCode,
                              membership: member.membership,
                              isActive: member.isActive
                            });
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td className={styles.tdMember}>
                        <button
                          className={styles.deleteButton}
                          onClick={() => {
                            setIdMember(member._id);
                            deleteMember(member._id);
                          }}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <button
            className={styles.button}
            onClick={() => {
              setShowForm(true);
              setIdMember('');
            }}
          >
            Add
          </button>
        </>
      )}
    </section>
  );
};

export default Members;
