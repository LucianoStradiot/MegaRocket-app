import { useEffect, useState } from 'react';
import styles from './members.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import { Link } from 'react-router-dom';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [idMember, setIdMember] = useState();

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
      <div className={styles.subContainer}>
        <Link className={styles.buttonCreate} to="/members/form">
          <Button text={'Create'} type={'add'} />
        </Link>
        <table className={styles.tableMember}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.thMember}>Name</th>
              <th className={styles.thMember}>Last Name</th>
              <th className={styles.thMember}>Birthday</th>
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
                      <Link to={`/members/form/${member._id}`}>
                        <Button text={'Edit'} type={'edit'} />
                      </Link>
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
      </div>
    </section>
  );
};

export default Members;
