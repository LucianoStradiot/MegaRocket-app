import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getAuth } from 'Redux/Auth/thunks';
import styles from './index.module.css';
import Spinner from '../../Components/Shared/Spinner';
import Button from '../../Components/Shared/Button';
import Aside from '../../Components/Shared/Aside';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { updateProfilePhoto } from 'Redux/ProfilePhoto/thunks';
import Modal from 'Components/Shared/Modal';
import { FiEdit } from 'react-icons/fi';

const Profile = () => {
  const dispatch = useDispatch();
  const idLogged = sessionStorage.getItem('firebaseUid');
  const loading = useSelector((state) => state.user.isLoading);
  const dataLog = useSelector((state) => state.user.user);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: '',
    isConfirm: false
  });
  const [isPhotoUpdated, setIsPhotoUpdated] = useState(false);

  useEffect(() => {
    dispatch(getAuth(idLogged));
  }, []);

  const handleFileChange = (e) => {
    handleUpload(e.target.files[0]);
  };

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const handleUpload = async (file) => {
    const response = await dispatch(updateProfilePhoto(file, dataLog?._id));
    const modalData = {
      title: !response ? 'Error!' : 'Success!',
      desc: !response
        ? 'There was an error uploading the photo. Please, try again'
        : 'Your photo was uploading successfully'
    };
    setModalInfo(modalData);
    if (!response) {
      setIsPhotoUpdated(false);
    } else {
      setIsPhotoUpdated(true);
    }
    setIsOpen(true);
  };

  const closeForm = () => {
    if (isPhotoUpdated) {
      window.location.reload();
    }
    setIsOpen(!isOpen);
  };

  if (sessionStorage.getItem('role') === 'MEMBER') {
    return (
      <>
        <Modal
          desc={modalInfo.desc}
          handleClose={closeForm}
          isOpen={isOpen}
          title={modalInfo.title}
        />
        <Aside page={'home'} />
        <section className={styles.container}>
          {loading && <Spinner />}
          <div className={styles.content}>
            <div className={styles.photoContainer}>
              <div className={styles.photoContainer}>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  className={styles.inputProfile}
                  style={{ display: 'none' }}
                />
                <span className={styles.profileHover} onClick={handleUploadButtonClick}>
                  <FiEdit className={styles.editIcon} />
                </span>
                <img id="upload" src={dataLog?.profilePhoto} className={styles.profilePhoto} />
              </div>
            </div>
            <div className={styles.subContainer}>
              <div className={styles.inputContainer} data-testid="member-first-name">
                <label className={styles.label}>First name</label>
                <p className={styles.p}>{dataLog?.firstName}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-last-name">
                <label className={styles.label}>Last name</label>
                <p className={styles.p}>{dataLog?.lastName}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-email">
                <label className={styles.label}>Email</label>
                <p className={styles.p}>{dataLog?.email}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-dni">
                <label className={styles.label}>DNI</label>
                <p className={styles.p}>{dataLog?.dni}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-phone">
                <label className={styles.label}>Phone</label>
                <p className={styles.p}>{dataLog?.phone}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-city">
                <label className={styles.label}>City</label>
                <p className={styles.p}>{dataLog?.city}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-postal-code">
                <label className={styles.label}>Postal Code</label>
                <p className={styles.p}>{dataLog?.postalCode}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Birthday</label>
                <p className={styles.p}>{dataLog?.birthday?.substring(0, 10)}</p>
              </div>
              <div className={styles.inputContainer} data-testid="member-membership">
                <label className={styles.label}>Membership</label>
                <p className={styles.p}>{dataLog?.membership}</p>
              </div>
            </div>
            <div className={styles.contButton}>
              <Link to="/profile/form/edit-member">
                <Button text="Edit" type="create" />
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }
  if (sessionStorage.getItem('role') === 'TRAINER') {
    return (
      <>
        <Modal
          desc={modalInfo.desc}
          handleClose={closeForm}
          isOpen={isOpen}
          title={modalInfo.title}
        />
        <Aside page={'home'} />
        <section className={styles.container}>
          {loading && <Spinner />}
          <div className={styles.content}>
            <div className={styles.photoContainer}>
              <input
                id="fileInput"
                type="file"
                onChange={handleFileChange}
                className={styles.inputProfile}
                style={{ display: 'none' }}
              />
              <span className={styles.profileHover} onClick={handleUploadButtonClick}>
                <FiEdit className={styles.editIcon} />
              </span>
              <img id="upload" src={dataLog?.profilePhoto} className={styles.profilePhoto} />
            </div>
            <div className={styles.subContainer}>
              <div className={styles.inputContainer}>
                <label className={styles.label}>First name</label>
                <p>{dataLog?.firstName}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Last name</label>
                <p>{dataLog?.lastName}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>DNI</label>
                <p>{dataLog?.dni}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Phone</label>
                <p>{dataLog?.phone}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Email</label>
                <p>{dataLog?.email}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>City</label>
                <p>{dataLog?.city}</p>
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.label}>Salary</label>
                <p>{dataLog?.salary}</p>
              </div>
            </div>
            <div className={styles.btnContainer}>
              <div className={styles.contButton}>
                <Link to="/profile/form/edit-trainer">
                  <Button text="Edit" type="create" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  return history.push('/');
};

export default Profile;
