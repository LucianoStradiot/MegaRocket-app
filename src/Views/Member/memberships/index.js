import Aside from 'Components/Shared/Aside';
import styles from './memberships.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from 'Components/Shared/Modal';
import { useDispatch } from 'react-redux';
import { updateMember } from 'Redux/Members/thunks';

const MembershipMember = () => {
  const history = useHistory();
  const data = useSelector((state) => state.user.user);
  const [modal, setModal] = useState({
    title: '',
    desc: '',
    isConfirm: false,
    membership: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const handleCardOnly = () => {
    if (data && sessionStorage.getItem('role') === 'MEMBER') {
      if (data.isActive) {
        if (data.membership !== 'Only Classes Membership') {
          setModal({
            title: 'Update',
            desc: (
              <div>
                Are you sure you want to change your Membership to{' '}
                <span className={styles.cont}>Only Classes Membership</span>?
              </div>
            ),
            isConfirm: true,
            membership: 'Only Classes Membership'
          });
        } else {
          setModal({
            title: 'Error',
            desc: 'You already have this Membership',
            isConfirm: false,
            membership: ''
          });
          setRefresh(false);
        }
        setIsOpen(true);
      } else {
        setModal({
          title: 'Error',
          desc: `Your membership has expired. Communicate with an admin`,
          isConfirm: false,
          membership: ''
        });
        setIsOpen(true);
      }
    } else if (data && sessionStorage.getItem('role') !== 'MEMBER') {
      setModal({
        title: 'Error',
        desc: 'You need to be a member to have a Membership',
        isConfirm: false,
        membership: ''
      });
      setRefresh(false);
      setIsOpen(true);
    } else {
      history.push('/signUp?membership=Only Classes Membership');
    }
  };

  const handleCardClassic = () => {
    if (data && sessionStorage.getItem('role') === 'MEMBER') {
      if (data.isActive) {
        if (data.membership !== 'Classic Membership') {
          setModal({
            title: 'Update',
            desc: (
              <div>
                Are you sure you want to change your Membership to{' '}
                <span className={styles.cont}>Classic Membership</span>?
              </div>
            ),
            isConfirm: true,
            membership: 'Classic Membership'
          });
        } else {
          setModal({
            title: 'Error',
            desc: 'You already have this Membership',
            isConfirm: false,
            membership: ''
          });
          setRefresh(false);
        }
        setIsOpen(true);
      } else {
        setModal({
          title: 'Error',
          desc: `Your membership has expired. Communicate with an admin`,
          isConfirm: false,
          membership: ''
        });
        setIsOpen(true);
      }
    } else if (data && sessionStorage.getItem('role') !== 'MEMBER') {
      setModal({
        title: 'Error',
        desc: 'You need to be a member to have a Membership',
        isConfirm: false,
        membership: ''
      });
      setRefresh(false);
      setIsOpen(true);
    } else {
      history.push('/signUp?membership=Classic Membership');
    }
  };

  const handleCardBlack = () => {
    if (data && sessionStorage.getItem('role') === 'MEMBER') {
      if (data.isActive) {
        if (data.membership !== 'Black Membership') {
          setModal({
            title: 'Update',
            desc: (
              <div>
                Are you sure you want to change your Membership to{' '}
                <span className={styles.cont}>Black Membership</span>?
              </div>
            ),
            isConfirm: true,
            membership: 'Black Membership'
          });
        } else {
          setModal({
            title: 'Error',
            desc: 'You already have this Membership',
            isConfirm: false,
            membership: ''
          });
          setRefresh(false);
        }
        setIsOpen(true);
      } else {
        setModal({
          title: 'Error',
          desc: `Your membership has expired. Communicate with an admin`,
          isConfirm: false,
          membership: ''
        });
        setIsOpen(true);
      }
    } else if (data && sessionStorage.getItem('role') !== 'MEMBER') {
      setModal({
        title: 'Error',
        desc: 'You need to be a member to have a Membership',
        isConfirm: false,
        membership: ''
      });
      setRefresh(false);
      setIsOpen(true);
    } else {
      history.push('/signUp?membership=Black Membership');
    }
  };

  const changeMembership = async () => {
    try {
      const payload = {
        id: data._id,
        body: {
          membership: modal.membership
        }
      };

      const response = await dispatch(updateMember(payload));

      if (response.error) {
        throw new Error(response.message);
      } else {
        setModal({
          title: 'Success!',
          desc: 'Membership updated successfully',
          isConfirm: false,
          membership: ''
        });
        setRefresh(true);
      }
    } catch (error) {
      setModal({
        title: 'Error!',
        desc: error.message,
        isConfirm: false,
        membership: ''
      });
    }
    setIsOpen(true);
  };

  const closeF = () => {
    if (refresh) {
      window.location.reload();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <Aside page={'home'} />
      <Modal
        title={modal.title}
        desc={modal.desc}
        isOpen={isOpen}
        confirmModal={modal.isConfirm}
        handleClose={closeF}
        deleteFunction={changeMembership}
      />
      <div className={styles.mainContainer}>
        <div className={styles.container} data-testid="memberships-container-page">
          <div className={styles.header}>
            <h1 className={styles.h1}>Memberships</h1>
            <div className={styles.line}></div>
            <p className={styles.section}>
              These are all the available memberships. If you want to try a different one, please
              get in touch with your branch manager.
            </p>
          </div>
          <section className={styles.cardsCont}>
            <div
              onClick={() => handleCardOnly()}
              className={`${styles.cardContainer} ${styles.only}`}
            >
              <h3>ONLY CLASSES</h3>
              <p>$2500</p>
              <hr />
              <p>Subscribe to classes.</p>
              <p>Access to the grid class.</p>
            </div>
            <div
              onClick={() => handleCardClassic()}
              className={`${styles.cardContainer} ${styles.classic}`}
            >
              <h3>CLASSIC</h3>
              <p>$4000</p>
              <hr />
              <p>Free access to the weight room.</p>
              <p>Personalized follow-up by a trainer.</p>
              <p>Grid visualization.</p>
            </div>
            <div
              onClick={() => handleCardBlack()}
              className={`${styles.cardContainer} ${styles.black}`}
            >
              <h3>BLACK</h3>
              <p>$6000</p>
              <hr />
              <p>Free access to the weight room.</p>
              <p>Free access to classes with prior registration.</p>
              <p>Personalized follow-up by a trainer.</p>
              <p>Visualization of the grid.</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default MembershipMember;
