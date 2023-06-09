import { useEffect, useState } from 'react';
import styles from './members.module.css';
import TextInput from '../Shared/TextInput';
import Select from '../Shared/Select';
import Button from '../Shared/Button';
import DatePicker from '../Shared/DatePicker';
import Modal from '../Shared/Modal';

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
    birthday: '',
    postalCode: '',
    membership: '',
    isActive: true
  });
  const [idMember, setIdMember] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const [confirmModal, setConfirmModal] = useState(false);
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
      birthday: '',
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
        setModalInfo({
          title: 'Success',
          desc: updatedMember.message
        });
        modalConfirmFalse();
      } else {
        throw new Error(updatedMember.message);
      }
    } catch (error) {
      setModalInfo({
        title: 'Error',
        desc: error.message
      });
      modalConfirmFalse();
    }
  };

  const addMember = async (member) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberValues)
      });
      const dataResponse = await response.json();
      if (response.ok) {
        setMembers([...members, member]);
        setModalInfo({
          title: 'Success',
          desc: 'Member created successfully'
        });
        modalConfirmFalse();
        getMembers();
      } else {
        throw new Error(dataResponse.message);
      }
    } catch (error) {
      setModalInfo({
        title: 'Error',
        desc: error.message
      });
      modalConfirmFalse();
    }
  };

  const deleteMember = async (memberId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${memberId}`, {
        method: 'DELETE'
      });
      setMembers([...members.filter((member) => member._id !== memberId)]);
      const dataResponse = await response.json();
      if (!response.ok) {
        throw new Error(dataResponse.message);
      } else {
        setModalInfo({
          title: 'Success',
          desc: dataResponse.message
        });
        setConfirmModal(false);
      }
    } catch (error) {
      setModalInfo({
        title: 'Error',
        desc: error.message
      });
      setConfirmModal(false);
    }
  };
  const switchIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const modalConfirmTrue = () => {
    setConfirmModal(true);
    switchIsOpen();
  };

  const modalConfirmFalse = () => {
    setConfirmModal(false);
    switchIsOpen();
  };

  const confirmDelete = (id) => {
    setIdMember(id);
    modalConfirmTrue();
    setModalInfo({
      title: 'Confirm',
      desc: 'Are you sure?'
    });
  };

  return (
    <section className={styles.container}>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={switchIsOpen}
        confirmModal={confirmModal}
        deleteFunction={() => deleteMember(idMember)}
      />
      <h2>Members</h2>
      {showForm ? (
        <form className={styles.form}>
          <div className={styles.subContainer}>
            <div className={styles.inputContainer}>
              <TextInput
                labelName={'First Name'}
                inputName={'firstName'}
                changeAction={(e) => onChange(e)}
                inputType={'text'}
                text={memberValues.firstName}
              />
            </div>
            <div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName={'Last Name'}
                  inputName={'lastName'}
                  changeAction={(e) => onChange(e)}
                  inputType={'text'}
                  text={memberValues.lastName}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName={'Email'}
                  inputName={'email'}
                  changeAction={(e) => onChange(e)}
                  inputType={'text'}
                  text={memberValues.email}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName={'DNI'}
                  inputName={'dni'}
                  changeAction={(e) => onChange(e)}
                  inputType={'number'}
                  text={memberValues.dni}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName={'Phone'}
                  inputName={'phone'}
                  changeAction={(e) => onChange(e)}
                  inputType={'number'}
                  text={memberValues.phone}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName={'City'}
                  inputName={'city'}
                  changeAction={(e) => onChange(e)}
                  inputType={'text'}
                  text={memberValues.city}
                />
              </div>
            </div>
            <DatePicker
              changeAction={(e) => onChange(e)}
              name={'birthday'}
              title={'Birthday'}
              val={memberValues.birthday}
            />
            <div>
              <div className={styles.inputContainer}>
                <TextInput
                  labelName={'PostalCode'}
                  inputName={'postalCode'}
                  changeAction={(e) => onChange(e)}
                  inputType={'number'}
                  text={memberValues.postalCode}
                />
              </div>
            </div>
            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Membership</label>
                <Select
                  changeAction={(e) => onChange(e)}
                  name={'membership'}
                  selectID={''}
                  selectValue={memberValues.membership}
                >
                  <option value="">Seleccionar</option>
                  <option value="Black Membership">Black Membership</option>
                  <option value="Classic Membership">Classic Membership</option>
                  <option value="Only Classes Membership">Only Classes Membership</option>
                </Select>
              </div>
            </div>

            <div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Status</label>
                <Select
                  changeAction={onChange}
                  name={'isActive'}
                  selectID={''}
                  selectValue={memberValues.isActive}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Select>
              </div>
            </div>
            <Button
              clickAction={onSubmit}
              text={idMember ? 'Edit' : 'Add'}
              type={idMember ? 'edit' : 'Add'}
            />
            <Button
              clickAction={() => {
                setShowForm(false);
                setIdMember('');
                setMemberValues({
                  firstName: '',
                  lastName: '',
                  email: '',
                  dni: '',
                  phone: '',
                  city: '',
                  birthday: '',
                  postalCode: '',
                  membership: '',
                  isActive: true
                });
              }}
              text={'Cancel'}
              type={'deleteCancel'}
            />
          </div>
        </form>
      ) : (
        <>
          <table className={styles.tableMember}>
            <thead>
              <tr>
                <th className={styles.thMember}>Name</th>
                <th className={styles.thMember}>Last Name</th>
                <th className={styles.thMember}>Birthday</th>
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
                      <td className={styles.tdMember}>{member.birthday}</td>
                      <td className={styles.tdMember}>
                        <Button
                          clickAction={() => {
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
                          text={'Edit'}
                          type={'edit'}
                        />
                      </td>
                      <td className={styles.tdMember}>
                        <Button
                          clickAction={() => {
                            confirmDelete(member._id);
                          }}
                          text={'X'}
                          type={'deleteCancel'}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <Button
            clickAction={() => {
              setShowForm(true);
              setIdMember('');
            }}
            text={'Add'}
            type={'add'}
          />
        </>
      )}
    </section>
  );
};

export default Members;
