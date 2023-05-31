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
    birthday: '2023-05-29T07:32:26+0000',
    postalCode: '',
    membership: '',
    isActive: true
  });
  const [idMember, setIdMember] = useState('');
  const getMembers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
    const data = await response.json();
    setMembers(data.data);
    console.log(data);
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
      birthday: '2023-05-29T07:32:26+0000',
      postalCode: '',
      membership: '',
      isActive: true
    });
  };

  const changeDateFormat = (date) => {
    let dateArray = date.split('-');

    let year = dateArray[0];
    let month = dateArray[1];
    let day = dateArray[2];

    dateArray = month + '/' + day + '/' + year;
    return dateArray;
  };

  const updateMember = async (idMember) => {
    const dateFormat = changeDateFormat(memberValues.birthday);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${idMember}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...memberValues, birthday: dateFormat })
      });

      const updatedMember = await response.json();
      if (response.ok) {
        const dataIndex = members.findIndex((Member) => Member._id === idMember);

        setMembers((currentMembers) => {
          const updatedMembers = [...currentMembers];
          updatedMembers[dataIndex] = updatedMember.data;
          return updatedMembers;
        });
      }
    } catch (error) {
      console.log(error);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMember = async (memberId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${memberId}`, {
        method: 'DELETE'
      });
      console.log(response);
      setMembers([...members.filter((member) => member._id !== memberId)]);
    } catch (error) {
      console.log(error);
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
                  value={memberValues.birthday}
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
                <input
                  className={styles.input}
                  name="membership"
                  type="text"
                  value={memberValues.membership}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>IsActive</label>
                <input
                  className={styles.input}
                  name="isActive"
                  type="checkbox"
                  value={memberValues.isActive}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <button className={styles.button} type="submit">
              Add
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
                  birthday: '2023-05-29T07:32:26+0000',
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
                          onClick={() => deleteMember(member._id)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <button className={styles.button} onClick={() => setShowForm(true)}>
            Add
          </button>
        </>
      )}
    </section>
  );
};

export default Members;
