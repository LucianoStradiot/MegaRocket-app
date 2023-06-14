import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMember, getMembers } from '../../Redux/Members/thunks';
import styles from './members.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import Spinner from '../Shared/Spinner';

const Members = () => {
  const listMembers = useSelector((state) => state.members.data);
  const pending = useSelector((state) => state.members.isPending);
  const [idMember, setIdMember] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: '',
    isConfirm: false
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  const handledeleteMember = async () => {
    const response = await dispatch(deleteMember(idMember));
    if (!response.error) {
      setModalInfo({
        title: 'Success!',
        desc: response.message,
        isConfirm: false
      });
      dispatch(getMembers());
    } else {
      setModalInfo({
        title: 'Error!',
        desc: response.message,
        isConfirm: false
      });
    }
    setIsOpen(true);
  };

  const confirmDelete = (id) => {
    setIdMember(id);

    setModalInfo({
      title: 'Confirm',
      desc: 'Are you sure you want to delete it?',
      isConfirm: true
    });
    setIsOpen(true);
  };

  return listMembers?.length > 0 ? (
    <section className={styles.container}>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={() => setIsOpen(!isOpen)}
        confirmModal={modalInfo.isConfirm}
        deleteFunction={() => handledeleteMember(idMember)}
      />
      {pending && <Spinner />}
      {!pending && (
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
              {listMembers?.length > 0 &&
                listMembers?.map((member) => {
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
      )}
    </section>
  ) : (
    <section className={styles.container}>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={() => setIsOpen(!isOpen)}
        confirmModal={modalInfo.isConfirm}
        deleteFunction={() => handledeleteMember(idMember)}
      />
      <section>
        <Link to="/members/form">
          <Button text="Create" type="create" />
        </Link>
        <p className={styles.info}>There is no Member yet.</p>
      </section>
    </section>
  );
};

export default Members;
