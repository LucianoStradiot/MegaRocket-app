import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubscriptions, deleteSubscription } from 'Redux/Subscriptions/thunks';
import style from './subscriptions.module.css';
import Modal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import Spinner from 'Components/Shared/Spinner';
import Table from 'Components/Shared/Table';
import { Link } from 'react-router-dom';
import Aside from 'Components/Shared/Aside';

function Subscriptions() {
  const [idDelete, setIdDelete] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [responseModal, setResponseModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const pending = useSelector((state) => state.subscriptions.isPending);

  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  const handleDeleteSub = async () => {
    const response = await dispatch(deleteSubscription(idDelete));
    if (!response.error) {
      setResponseModal({
        title: 'Success!',
        description: response.message,
        isConfirm: false
      });
      dispatch(getSubscriptions());
    } else {
      setResponseModal({
        title: 'Error!',
        description: response.message,
        isConfirm: false
      });
    }
    setIsOpen(true);
  };

  const openModalConfirm = (id) => {
    setIdDelete(id);
    setResponseModal({
      title: 'Confirm',
      description: 'Are you sure you want to delete it?',
      isConfirm: true
    });
    setIsOpen(true);
  };

  return subscriptions.length > 0 ? (
    <>
      <Aside page={'admins'} />
      <div className={style.container}>
        <section className={style.subContainer}>
          <Modal
            title={responseModal.title}
            desc={responseModal.description}
            isOpen={isOpen}
            confirmModal={responseModal.isConfirm}
            handleClose={() => setIsOpen(!isOpen)}
            deleteFunction={() => handleDeleteSub(idDelete)}
          />
          {pending && <Spinner />}
          {!pending && (
            <div>
              <Link to="/admins/subscriptions/form">
                <Button type="add" text="Create" className={style.btnCreate} />
              </Link>
              <Table
                list={subscriptions}
                column={['Date', 'Member Name', 'Class Hour', 'Activity Name', '']}
                fields={['date', 'member.lastName', 'classes.hour', 'classes.activity.name']}
                link={'/admins/subscriptions/form/'}
                action={openModalConfirm}
              />
            </div>
          )}
        </section>
      </div>
    </>
  ) : (
    <>
      <Aside page={'admins'} />
      <div className={style.container}>
        <section>
          <Modal
            title={responseModal.title}
            desc={responseModal.description}
            isOpen={isOpen}
            confirmModal={responseModal.isConfirm}
            handleClose={() => setIsOpen(!isOpen)}
            deleteFunction={() => handleDeleteSub(idDelete)}
          />
          {pending && <Spinner />}
          {!pending && (
            <section>
              <Link to="/admins/subscriptions/form/">
                <Button text="Create" type="create" />
              </Link>
              <p className={style.info}>There is no Subscription yet.</p>
            </section>
          )}
        </section>
      </div>
    </>
  );
}

export default Subscriptions;
