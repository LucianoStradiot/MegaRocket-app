import { useEffect, useState } from 'react';
import styles from './form-members.module.css';
import TextInput from 'Components/Shared/TextInput';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';
import Modal from 'Components/Shared/Modal';
import { updateMember } from 'Redux/Members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Shared/Spinner';
import DatePicker from 'Components/Shared/DatePicker';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const FormMembers = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.members.isPending);
  const [isOpen, setIsOpen] = useState(false);
  const [isMemberCreated, setIsMemberCreated] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const dataLog = useSelector((state) => state.user.user);
  const currentDate = new Date();
  const minDate = new Date();
  minDate.setFullYear(currentDate.getFullYear() - 15);

  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(11)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .messages({
        'string.pattern.base': 'First name must contain letters only',
        'string.min': 'First name can´t be shorter than 3 characters',
        'string.max': 'First name can´t be longer than 25 characters',
        'string.empty': 'First name can´t be empty'
      }),
    lastName: Joi.string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
      .required()
      .messages({
        'string.pattern.base': 'Last name must contain letters only',
        'string.min': 'Last name can´t be shorter than 3 characters',
        'string.max': 'Last name can´t be longer than 25 characters',
        'string.empty': 'Last name can´t be empty'
      }),
    dni: Joi.string().min(7).max(9).required().messages({
      'string.min': 'DNI must have 7-9 digits',
      'string.max': 'DNI must have 7-9 digits',
      'string.empty': 'DNI can´t be empty'
    }),
    phone: Joi.string()
      .regex(/^[0-9]*$/)
      .length(10)
      .required()
      .messages({
        'string.length': 'Phone number must have 10 digits',
        'string.empty': 'Phone number can´t be empty',
        'string.pattern.base': 'Phone number must be only numbers'
      }),
    city: Joi.string()
      .min(3)
      .regex(/^[a-zA-Z\s.,]+$/)
      .required()
      .messages({
        'string.pattern.base': 'City must contain letters and spaces only',
        'string.empty': 'City can´t be empty',
        'string.min': 'City must have at least 4 characters'
      }),
    birthday: Joi.date().iso().max(minDate.toISOString()).required().messages({
      'date.format': 'Invalid birth date format',
      'date.max': 'You must be at least 15 years old'
    }),
    postalCode: Joi.string()
      .regex(/^[0-9]*$/)
      .min(4)
      .max(5)
      .required()
      .messages({
        'string.length': 'Postal code must have between 4 and 5 digits',
        'string.empty': 'Postal code can´t be empty',
        'string.pattern.base': 'Postal code must be only numbers'
      })
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    formEdit(dataLog?._id);
  }, []);

  const formEdit = (id) => {
    if (id) {
      setValue('firstName', dataLog?.firstName);
      setValue('lastName', dataLog?.lastName);
      setValue('dni', dataLog?.dni.toString());
      setValue('phone', dataLog?.phone.toString());
      setValue('city', dataLog?.city);
      setValue('birthday', dataLog?.birthday.toString().substring(0, 10));
      setValue('postalCode', dataLog?.postalCode.toString());
    }
  };

  const onSubmit = (data) => {
    handleUpdateMember(data);
  };
  const handleUpdateMember = async (memberValues) => {
    const payload = {
      id: dataLog?._id,
      body: memberValues
    };
    const response = await dispatch(updateMember(payload));
    const modalData = {
      title: response.error ? 'Error!' : 'Success!',
      desc: response.message
    };
    setModalInfo(modalData);

    if (response.error) {
      setIsOpen(true);
      setIsMemberCreated(false);
    } else {
      setIsOpen(true);
      setIsMemberCreated(true);
    }
  };

  const closeForm = () => {
    if (isMemberCreated) {
      setIsOpen(false);
      history.goBack();
    }
    setIsOpen(!isOpen);
  };

  return (
    <section className={styles.container}>
      <Modal
        title={modalInfo.title}
        desc={modalInfo.desc}
        isOpen={isOpen}
        handleClose={closeForm}
      />
      {loading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="form-members">
        <div className={styles.subContainer}>
          <div data-testid="member-first-name">
            <TextInput
              labelName={'First Name'}
              name={'firstName'}
              inputType={'text'}
              register={register}
              error={errors.firstName?.message}
            />
          </div>
          <div data-testid="member-last-name">
            <TextInput
              labelName={'Last Name'}
              name={'lastName'}
              inputType={'text'}
              register={register}
              error={errors.lastName?.message}
            />
          </div>
          <div data-testid="member-dni">
            <TextInput
              labelName={'DNI'}
              name={'dni'}
              inputType={'text'}
              register={register}
              error={errors.dni?.message}
            />
          </div>
          <div data-testid="member-phone">
            <TextInput
              labelName={'Phone'}
              name={'phone'}
              inputType={'text'}
              register={register}
              error={errors.phone?.message}
            />
          </div>
          <div data-testid="member-city">
            <TextInput
              labelName={'City'}
              name={'city'}
              inputType={'text'}
              register={register}
              error={errors.city?.message}
            />
          </div>
          <div data-testid="member-birthday">
            <DatePicker
              name={'birthday'}
              title={'Birthday'}
              register={register}
              error={errors.birthday?.message}
            />
          </div>
          <div data-testid="member-postal-code">
            <TextInput
              labelName={'PostalCode'}
              name={'postalCode'}
              inputType={'text'}
              register={register}
              error={errors.postalCode?.message}
            />
          </div>
        </div>
        <div className={styles.contButton}>
          <div>
            <Button text="Cancel" type="submit" clickAction={() => history.goBack()} />
          </div>
          <Button type="submit" text={'Save'} testId="member-confirm-button" />
        </div>
      </form>
    </section>
  );
};

export default FormMembers;
