import React, { useEffect, useState } from 'react';
import styles from 'Views/Member/schedule/schedule.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'Redux/Classes/thunks';
import { getSubscriptions } from 'Redux/Subscriptions/thunks';
import Modal from 'Components/Shared/Modal';
import Aside from 'Components/Shared/Aside';

const MemberSchedule = () => {
  const classes = useSelector((state) => state.classes.data);
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const dispatch = useDispatch();

  const [modal, setModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getSubscriptions());
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

  const openModal = (title, description) => {
    setModal({
      title: title,
      description: description
    });
    setIsOpen(true);
  };

  return (
    <>
      <Aside page={'home'} />
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <Modal
            title={modal.title}
            desc={modal.description}
            isOpen={isOpen}
            confirmModal={modal.isConfirm}
            handleClose={() => setIsOpen(!isOpen)}
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
                                    onClick={() =>
                                      openModal(
                                        'Subscribe to',
                                        `Activity: ${
                                          oneClass && oneClass.activity
                                            ? oneClass.activity.name
                                            : 'not available'
                                        }, Trainer: ${
                                          oneClass && oneClass.trainer
                                            ? oneClass.trainer.firstName
                                            : 'not available'
                                        }, Slots: ${subscriptionsLength} / ${oneClass.slots}`
                                      )
                                    }
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
