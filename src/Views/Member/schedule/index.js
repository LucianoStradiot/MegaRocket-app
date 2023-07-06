import React, { useEffect, useState, useRef } from 'react';
import styles from 'Views/Member/schedule/schedule.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'Redux/Classes/thunks';
import {
  deleteOldSubscription,
  deleteSubscription,
  getSubscriptions,
  createSubscription
} from 'Redux/Subscriptions/thunks';
import Modal from 'Components/Shared/Modal';
import Aside from 'Components/Shared/Aside';
import Spinner from 'Components/Shared/Spinner';
import { useHistory } from 'react-router-dom';
import { getMembers } from 'Redux/Members/thunks';

const MemberSchedule = () => {
  const history = useHistory();
  const classes = useSelector((state) => state.classes.data);
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const members = useSelector((state) => state.members.data);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.classes.isLoading);

  const [modal, setModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const memberID = useRef('');
  const [isOpen, setIsOpen] = useState(false);
  const findSubToDelete = useRef(null);
  const payload = useRef(null);

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getSubscriptions());
    dispatch(getMembers());
    dispatch(deleteOldSubscription());
  }, []);

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00'
  ];

  const [idDelete, setIdDelete] = useState('');
  members.forEach((member) => {
    if (sessionStorage.getItem('email') === member?.email) {
      memberID.current = member._id;
    }
  });

  const handleCreateSub = async () => {
    const response = await dispatch(createSubscription(payload.current));
    if (!response.error) {
      setModal({
        title: 'Success!',
        description: response.message,
        isConfirm: false
      });
      dispatch(getSubscriptions());
    } else {
      setModal({
        title: 'Error!',
        description: response.message,
        isConfirm: false
      });
    }
    setIsOpen(true);
  };

  const handleDeleteSub = async () => {
    const response = await dispatch(deleteSubscription(idDelete));
    if (!response.error) {
      setModal({
        title: 'Success!',
        description: response.message,
        isConfirm: false
      });
      dispatch(getSubscriptions());
    } else {
      setModal({
        title: 'Error!',
        description: response.message,
        isConfirm: false
      });
    }
    setIsOpen(true);
  };

  const openModal = (title, description) => {
    setIdDelete(findSubToDelete.current);
    setModal({
      title: title,
      description: description,
      isConfirm: true
    });
    setIsOpen(true);
  };

  const handleDataForCreate = (oneClass) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const classDayOfWeek = days.indexOf(oneClass.day);

    const currentDayOfWeek = currentDate.getDay();

    let dayDifference = classDayOfWeek - currentDayOfWeek;
    if (dayDifference < 0) {
      dayDifference += 7;
    }

    const limitDate = new Date(currentYear, currentMonth - 1, currentDay + dayDifference);

    const limitYear = limitDate.getFullYear();
    const limitMonth = String(limitDate.getMonth() + 1).padStart(2, '0');
    const limitDay = String(limitDate.getDate()).padStart(2, '0');

    const formattedLimitDate = `${limitYear}-${limitMonth}-${limitDay}`;
    payload.current = {
      classes: oneClass._id,
      member: memberID.current,
      date: formattedLimitDate
    };
  };

  return (
    <>
      {loading && <Spinner />}
      <Aside page={'home'} />
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <Modal
            title={modal.title}
            desc={modal.description}
            isOpen={isOpen}
            confirmModal={modal.isConfirm}
            handleClose={() => setIsOpen(!isOpen)}
            deleteFunction={findSubToDelete.current ? handleDeleteSub : handleCreateSub}
          />
          <div className={styles.screenContainer}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th></th>
                  {weekDays.map((day) => (
                    <th key={day} className={styles.th}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((hour) => (
                  <>
                    <tr className={styles.tr}>
                      <th className={styles.th}>{hour}</th>
                      {weekDays.map((day, dayIndex) => (
                        <td key={dayIndex}>
                          {classes
                            .filter((oneClass) => oneClass.day === day && oneClass.hour === hour)
                            .map((oneClass, index) => {
                              const filteredSubscriptions = subscriptions.filter(
                                (subscription) => oneClass._id === subscription.classes._id
                              );
                              const subscriptionsLength = filteredSubscriptions.length;

                              return (
                                <div className={styles.card} key={index}>
                                  <button
                                    className={
                                      subscriptionsLength !== oneClass.slots
                                        ? styles.classCard
                                        : styles.fullClassCard
                                    }
                                    onClick={() => {
                                      if (sessionStorage.getItem('role') === 'MEMBER') {
                                        if (subscriptions.length > 0) {
                                          subscriptions.forEach((sub) => {
                                            if (
                                              memberID.current === sub.member?._id &&
                                              sub.classes._id === oneClass._id
                                            ) {
                                              findSubToDelete.current = sub._id;
                                            } else {
                                              findSubToDelete.current = null;
                                              handleDataForCreate(oneClass);
                                            }
                                          });
                                        } else {
                                          findSubToDelete.current = null;
                                          handleDataForCreate(oneClass);
                                        }

                                        openModal(
                                          ``,
                                          findSubToDelete.current
                                            ? 'Are you sure you want to delete your subscription?'
                                            : 'Confirm your subscription'
                                        );
                                      } else {
                                        history.push('/auth/login');
                                      }
                                    }}
                                  >
                                    <p className={styles.inlineBlock}>
                                      <div>{`Activity: ${
                                        oneClass && oneClass.activity
                                          ? oneClass.activity.name
                                          : 'not available'
                                      }`}</div>
                                      <div>{`Trainer: ${
                                        oneClass && oneClass.trainer
                                          ? oneClass.trainer.firstName
                                          : 'not available'
                                      }`}</div>
                                      <div>
                                        {'Slots: '}
                                        {subscriptionsLength}
                                        {' / '}
                                        {oneClass.slots}
                                      </div>
                                    </p>
                                  </button>
                                </div>
                              );
                            })}
                        </td>
                      ))}
                    </tr>
                  </>
                ))}
                <tr className={styles.tr}>
                  <td colSpan={weekDays.length + 1}>
                    {classes.length === 0 && <p>There are no classes yet.</p>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberSchedule;
