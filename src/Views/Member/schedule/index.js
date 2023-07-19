import React, { useEffect, useState, useRef } from 'react';
import styles from 'Views/Member/schedule/schedule.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses, deleteOldClasses } from 'Redux/Classes/thunks';
import { getMembers } from 'Redux/Members/thunks';
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

const MemberSchedule = () => {
  const history = useHistory();
  const userLoged = useSelector((state) => state.user.user);
  const classes = useSelector((state) => state.classes.data);
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.classes.isLoading);
  const members = useSelector((state) => state.members.data);
  const data = useSelector((state) => state.user.user);

  const [modal, setModal] = useState({
    title: '',
    description: '',
    isConfirm: false
  });

  const [isOpen, setIsOpen] = useState(false);
  const findSubToDelete = useRef(null);
  const payload = useRef(null);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    dispatch(deleteOldClasses());
    dispatch(deleteOldSubscription());
    dispatch(getClasses());
    dispatch(getMembers());
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

  const [idDelete, setIdDelete] = useState('');

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
    if (sessionStorage.getItem('role') === 'MEMBER') {
      setIdDelete(findSubToDelete.current);
      setModal({
        title: title,
        description: description,
        isConfirm: true
      });
    } else if (
      sessionStorage.getItem('role') === 'TRAINER' ||
      sessionStorage.getItem('role') === 'ADMIN'
    ) {
      if (Array.isArray(description)) {
        const memberNames = description.map((member) => `${member.firstName} ${member.lastName}`);
        setModal({
          title: title,
          description: (
            <>
              <ul>
                {memberNames.map((name, index) => (
                  <li key={index}>{name}</li>
                ))}
              </ul>
            </>
          ),
          isConfirm: false
        });
      } else {
        setModal({
          title: title,
          description: description,
          isConfirm: false
        });
      }
    } else {
      setModal({
        title: title,
        description: description,
        isConfirm: false
      });
    }

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
      member: userLoged?._id,
      date: formattedLimitDate
    };
  };

  const cardColor = (subscriptionsLength, oneClass) => {
    if (sessionStorage.getItem('role') === 'MEMBER') {
      for (const sub of subscriptions) {
        if (userLoged?._id === sub?.member?._id && sub?.classes?._id === oneClass?._id) {
          return styles.subscribedClass;
        }
      }
    }

    if (sessionStorage.getItem('role') === 'TRAINER') {
      if (userLoged?._id === oneClass?.trainer?._id) {
        return styles.subscribedClass;
      } else {
        return styles.classCard;
      }
    }

    if (subscriptionsLength !== oneClass.slots) {
      return styles.classCard;
    } else {
      return styles.fullClassCard;
    }
  };

  const filteredClasses = classes.filter(
    (oneClass) =>
      oneClass.activity.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      oneClass.trainer.firstName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      oneClass.trainer.lastName.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <>
      {loading && <Spinner />}
      <Aside page={'home'} />
      <div className={styles.mainContainer}>
        <div className={styles.wrap}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by activity or trainer"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
          </div>
          <Modal
            title={modal.title}
            desc={modal.description}
            isOpen={isOpen}
            confirmModal={modal.isConfirm}
            handleClose={() => setIsOpen(!isOpen)}
            deleteFunction={findSubToDelete.current ? handleDeleteSub : handleCreateSub}
          />
          <div className={styles.container}>
            <div className={styles.screenContainer}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tr}>
                    <th className={styles.background}>
                      <div className={styles.info}>
                        <div className={styles.blueCard}></div>
                        {sessionStorage.getItem('role') === 'TRAINER' ? (
                          <p>Not assigned</p>
                        ) : (
                          <p>Available</p>
                        )}
                      </div>
                      <div className={styles.info}>
                        <div className={styles.redCard}></div>
                        {sessionStorage.getItem('role') === 'TRAINER' ? (
                          <p>Your classes</p>
                        ) : (
                          <p>Subscribed</p>
                        )}
                      </div>
                      <div className={styles.info}>
                        {sessionStorage.getItem('role') === 'TRAINER' ? (
                          <p></p>
                        ) : (
                          <>
                            <div className={styles.greyCard}></div>
                            <p>Not available</p>
                          </>
                        )}
                      </div>
                    </th>
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
                            {filteredClasses
                              .filter((oneClass) => oneClass.day === day && oneClass.hour === hour)
                              .map((oneClass, index) => {
                                const filteredSubscriptions = subscriptions?.filter(
                                  (subscription) => oneClass?._id === subscription?.classes?._id
                                );
                                const subscriptionsLength = filteredSubscriptions.length;

                                const cardClass = cardColor(subscriptionsLength, oneClass);
                                return (
                                  <div className={styles.card} key={index}>
                                    <button
                                      className={cardClass}
                                      onClick={() => {
                                        if (sessionStorage.getItem('role') === 'MEMBER') {
                                          if (data.isActive) {
                                            if (subscriptions.length > 0) {
                                              for (const sub of subscriptions) {
                                                if (
                                                  userLoged?._id === sub.member?._id &&
                                                  sub.classes._id === oneClass._id
                                                ) {
                                                  findSubToDelete.current = sub._id;
                                                  break;
                                                } else {
                                                  findSubToDelete.current = null;
                                                  handleDataForCreate(oneClass);
                                                }
                                              }
                                            } else {
                                              findSubToDelete.current = null;
                                              handleDataForCreate(oneClass);
                                            }
                                            {
                                              subscriptionsLength !== oneClass.slots
                                                ? openModal(
                                                    findSubToDelete.current
                                                      ? 'Delete'
                                                      : 'Subscribe',
                                                    findSubToDelete.current
                                                      ? 'Are you sure you want to delete your subscription?'
                                                      : 'Confirm your subscription'
                                                  )
                                                : setModal({
                                                    title: 'Error',
                                                    description:
                                                      'You cannot subscribe to a full class',
                                                    isConfirm: false
                                                  });
                                              setIsOpen(true);
                                            }
                                          } else {
                                            setModal({
                                              title: 'Error',
                                              description: 'Your membership has expired',
                                              isConfirm: false
                                            });
                                            setIsOpen(true);
                                          }
                                        } else if (sessionStorage.getItem('role') === 'TRAINER') {
                                          const filteredMembers = members.filter((member) => {
                                            return subscriptions.some(
                                              (subs) =>
                                                subs.classes._id === oneClass._id &&
                                                subs.member._id === member._id
                                            );
                                          });
                                          oneClass.trainer._id === data._id
                                            ? openModal(
                                                'These are the registered members',
                                                filteredMembers
                                              )
                                            : openModal('Error', 'This is not your class');
                                        } else if (sessionStorage.getItem('role') === 'ADMIN') {
                                          const filteredMembers = members.filter((member) => {
                                            return subscriptions.some(
                                              (subs) =>
                                                subs.classes._id === oneClass._id &&
                                                subs.member._id === member._id
                                            );
                                          });
                                          openModal(
                                            'These are the registered members',
                                            filteredMembers
                                          );
                                        } else if (
                                          sessionStorage.getItem('role') === 'SUPER_ADMIN'
                                        ) {
                                          openModal('Error', 'You are not able to see this');
                                        } else {
                                          history.push('/auth/login');
                                        }
                                      }}
                                    >
                                      <p className={styles.inlineBlock}>
                                        <div>{`Activity: ${
                                          oneClass && oneClass.activity
                                            ? oneClass.activity.name
                                            : 'Not available'
                                        }`}</div>
                                        <div>{`Trainer: ${
                                          oneClass && oneClass.trainer
                                            ? `${oneClass.trainer.firstName} ${oneClass.trainer.lastName}`
                                            : 'Not available'
                                        }`}</div>
                                        <div>
                                          {'Slots: '}
                                          {`${subscriptionsLength}/${oneClass.slots}`}
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
                      {filteredClasses.length === 0 && <p>No matching classes found.</p>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberSchedule;
