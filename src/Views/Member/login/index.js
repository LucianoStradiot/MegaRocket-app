import { joiResolver } from '@hookform/resolvers/joi';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import TextInput from 'Components/Shared/TextInput';
import { loginMemberUser } from 'Redux/Members/thunks';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const LoginMember = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.members.isPending);
  const [isOpen, setIsOpen] = useState(false);
  const [isMemberLogged, setIsMemberLogged] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  const schema = Joi.object({
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.empty': 'Email can´t be empty',
      'string.pattern.base': 'Email must be in a valid format'
    }),
    dni: Joi.string().min(7).max(9).required().messages({
      'string.min': 'DNI must have 7-9 digits',
      'string.max': 'DNI must have 7-9 digits',
      'string.empty': 'DNI can´t be empty'
    })
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });
  const logMember = async (memberValues) => {
    try {
      const dataResponse = await dispatch(loginMemberUser(memberValues));
      const modalData = {
        title: dataResponse.message === 'Invalid credentials' ? 'Error!' : 'Success!',
        desc: dataResponse.message
      };
      setModalInfo(modalData);
      if (dataResponse.message === 'Invalid credentials') {
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
      setIsOpen(true);
      history.push('/member/schedule');
    }
    setIsOpen(!isOpen);
  };
  return (
    <section className={styles.container}>
      <Modal
        desc={modalInfo.desc}
        handleClose={closeForm}
        isOpen={isOpen}
        title={modalInfo.title}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(logMember)}>
        <TextInput
          error={errors.email?.message}
          register={register}
          inputType={'email'}
          labelName={'Email'}
          name={'email'}
        />
        <TextInput
          error={errors.dni?.message}
          register={register}
          inputType={'text'}
          labelName={'DNI'}
          name={'dni'}
        />
        <div className={styles.btnContainer}>
          <Button text={'Login'} type={'submit'} />
          <Button text="Reset" type="reset" clickAction={() => reset()} />
        </div>
      </form>
      <h2>Register Now!</h2>
      <section className={styles.cardsCont}>
        <Link
          className={`${styles.cardContainer} ${styles.only}`}
          to="/member/signUp?membership=Only Classes Membership"
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
          to="/member/signUp?membership=Classic Membership"
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
          to="/member/signUp?membership=Black Membership"
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
export default LoginMember;
