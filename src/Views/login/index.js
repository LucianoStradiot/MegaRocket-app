import { joiResolver } from '@hookform/resolvers/joi';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import TextInput from 'Components/Shared/TextInput';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { login } from 'Redux/Auth/thunks';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.members.isPending);
  const [isOpen, setIsOpen] = useState(false);
  const [isMemberLogged, setIsMemberLogged] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const RGXPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  const schema = Joi.object({
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.empty': 'Email can´t be empty',
      'string.pattern.base': 'Email must be in a valid format'
    }),
    password: Joi.string().min(8).regex(RGXPassword).required().messages({
      'string.pattern.base':
        'Password must contain at least one uppercase and one lowercase letter, and one number',
      'string.empty': 'Password can´t be empty',
      'string.min': 'Password must be at least 8 characters'
    })
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });
  const logUser = async (userValue) => {
    try {
      const dataResponse = await dispatch(login(userValue));
      const modalData = {
        title: dataResponse.type === 'LOGIN_ERROR' ? 'Error!' : 'Success!',
        desc: dataResponse.type === 'LOGIN_ERROR' ? 'Invalid credentials' : 'Logged successfully'
      };
      setModalInfo(modalData);
      if (dataResponse.type === 'LOGIN_ERROR') {
        setIsOpen(true);
        setIsMemberLogged(false);
      } else {
        setIsMemberLogged(true);
        setIsOpen(true);
      }
    } catch (error) {
      const modalData = {
        title: 'Error!',
        desc: error.message
      };
      setModalInfo(modalData);
    }
  };
  const closeForm = () => {
    if (isMemberLogged) {
      if (sessionStorage.getItem('role') === 'SUPER_ADMIN') {
        history.push('/superAdmins/admins');
      }
      if (sessionStorage.getItem('role') === 'ADMIN') {
        history.push('/admins/activities');
      }
      if (sessionStorage.getItem('role') === 'TRAINER') {
        history.push('/trainers');
      }
      if (sessionStorage.getItem('role') === 'MEMBER') {
        history.push('/');
      }
      setIsOpen(true);
    }
    setIsOpen(!isOpen);
  };
  return (
    <section className={styles.container} data-testid="container-login">
      <Modal
        desc={modalInfo.desc}
        handleClose={closeForm}
        isOpen={isOpen}
        title={modalInfo.title}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(logUser)}>
        <TextInput
          error={errors.email?.message}
          register={register}
          inputType={'email'}
          labelName={'Email'}
          name={'email'}
          testId="input-email-login"
        />
        <div className={styles.passwordContainer}>
          <TextInput
            error={errors.password?.message}
            register={register}
            inputType={showPassword ? 'text' : 'password'}
            labelName={'Password'}
            name={'password'}
            testId="input-password-login"
          />
          {!showPassword && (
            <FiEyeOff className={styles.editIcon} onClick={togglePasswordVisibility} />
          )}
          {showPassword && <FiEye className={styles.editIcon} onClick={togglePasswordVisibility} />}
        </div>
        <Link to="/recoverPassword" className={styles.password}>
          <a>Forgot password?</a>
        </Link>
        <div className={styles.btnContainer}>
          <div>
            <Button text="Cancel" type="cancel" clickAction={() => history.push('/')} />
          </div>
          <Button text={'Login'} type={'submit'} testId="confirm-button-login" />
        </div>
      </form>
      <h2 className={styles.h2Cont}>Register Now</h2>
      <section className={styles.cardsCont}>
        <Link
          className={`${styles.cardContainer} ${styles.only}`}
          to="/signUp?membership=Only Classes Membership"
        >
          <div>
            <h3>ONLY CLASSES</h3>
            <p>$2500</p>
            <hr></hr>
            <p>Subscribe to classes.</p>
            <p>Access to the grid class.</p>
          </div>
        </Link>
        <Link
          to="/signUp?membership=Classic Membership"
          className={`${styles.cardContainer} ${styles.classic}`}
        >
          <div>
            <h3>CLASSIC</h3>
            <p>$4000</p>
            <hr></hr>
            <p>Free access to the weight room.</p>
            <p>Personalized follow-up by a trainer.</p>
            <p>Grid visualization.</p>
          </div>
        </Link>
        <Link
          to="/signUp?membership=Black Membership"
          className={`${styles.cardContainer} ${styles.black}`}
        >
          <div>
            <h3>BLACK</h3>
            <p>$6000</p>
            <hr></hr>
            <p>Free access to the weight room.</p>
            <p>Free access to classes with prior registration.</p>
            <p>Personalized follow-up by a trainer.</p>
            <p>Visualization of the grid.</p>
          </div>
        </Link>
      </section>
    </section>
  );
};

export default Login;
