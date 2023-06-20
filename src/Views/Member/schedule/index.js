import React, { useEffect } from 'react';
import styles from 'Views/Member/schedule/schedule.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from 'Redux/Classes/thunks';
import { getSubscriptions /* deleteSubscritpions  */ } from 'Redux/Subscriptions/thunks';
import SidebarMember from 'Components/Shared/SidebarMember';

const MemberSchedule = () => {
  const classes = useSelector((state) => state.classes.data);
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const dispatch = useDispatch();

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

  return (
    <div className={styles.container}>
      <div>
        <SidebarMember />
      </div>
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
                        .map((oneClass, index) => (
                          <div className={styles.card} key={index}>
                            <button className={styles.classCard}>
                              <p className={styles.inlineBlock}>
                                <div>{`Activity: ${oneClass.activity.name}`}</div>
                                <div>{`Trainer: ${oneClass.trainer.firstName}`}</div>
                                <div>
                                  {'Slots: '}
                                  {
                                    subscriptions.filter(
                                      (subscription) => oneClass._id === subscription.classes._id
                                    ).length
                                  }
                                  {'/'}
                                  {oneClass.slots}
                                </div>
                              </p>
                            </button>
                          </div>
                        ))}
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
  );
};

export default MemberSchedule;
