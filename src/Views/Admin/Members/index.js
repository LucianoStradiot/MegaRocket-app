import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMember, getMembers } from 'Redux/Members/thunks';
import styles from './members.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import Table from 'Components/Shared/Table';
import Aside from 'Components/Shared/Aside';

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
    <>
      <Aside page={'admins'} />
      <div className={styles.container}>
        <section className={styles.wrap}>
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
              <Link className={styles.buttonCreate} to="/admins/members/form">
                <Button text={'Create'} type={'add'} />
              </Link>
              <Table
                list={listMembers}
                column={['Name', 'Last Name', 'DNI', 'Phone', 'Email', 'Membership', 'Status', '']}
                fields={[
                  'firstName',
                  'lastName',
                  'dni',
                  'phone',
                  'email',
                  'membership',
                  'isActive'
                ]}
                link={'/admins/members/form/'}
                action={confirmDelete}
              />
            </div>
          )}
        </section>
      </div>
    </>
  ) : (
    <>
      <Aside page={'admins'} />
      <div className={styles.container}>
        <section>
          <Modal
            title={modalInfo.title}
            desc={modalInfo.desc}
            isOpen={isOpen}
            handleClose={() => setIsOpen(!isOpen)}
            confirmModal={modalInfo.isConfirm}
            deleteFunction={() => handledeleteMember(idMember)}
          />
          <section>
            <Link to="/admins/members/form">
              <Button text="Create" type="create" />
            </Link>
            <p className={styles.info}>There is no Member yet.</p>
          </section>
        </section>
      </div>
    </>
  );
};

export default Members;
