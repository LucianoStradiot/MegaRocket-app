import { useEffect, useState } from 'react';
import styles from './form-members.module.css';
import TextInput from 'Components/Shared/TextInput';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import DatePicker from 'Components/Shared/DatePicker';
import { useHistory, useParams } from 'react-router-dom';
import Modal from 'Components/Shared/Modal';
import { createMember, getMembers, updateMember } from 'Redux/Members/thunks';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Shared/Spinner';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const FormMembers = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const listMembers = useSelector((state) => state.members.data);
  const loading = useSelector((state) => state.members.isPending);
  const [isOpen, setIsOpen] = useState(false);
  const [isMemberCreated, setIsMemberCreated] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const RGXEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

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
    email: Joi.string().regex(RGXEmail).required().messages({
      'string.empty': 'Email can´t be empty',
      'string.pattern.base': 'Email must be in a valid format'
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
    birthday: Joi.date().required().messages({
      'date.base': 'Invalid birth date format'
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
      }),
    membership: Joi.string()
      .valid('Only Classes Membership', 'Classic Membership', 'Black Membership')
      .required()
      .messages({
        'any.required': 'Membership is required',
        'any.only': 'Invalid Membership'
      }),
    isActive: Joi.string().valid('true', 'false').allow(true, false)
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onSubmit',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  useEffect(() => {
    formEdit(id);
  }, []);

  const formEdit = (id) => {
    if (id) {
      const data = listMembers.find((aux) => aux._id === id);
      if (data) {
        setValue('firstName', data.firstName);
        setValue('lastName', data.lastName);
        setValue('email', data.email);
        setValue('dni', data.dni.toString());
        setValue('phone', data.phone.toString());
        setValue('city', data.city);
        setValue('birthday', data.birthday.toString().substring(0, 10));
        setValue('postalCode', data.postalCode.toString());
        setValue('membership', data.membership);
        setValue('isActive', data.isActive);
      }
    }
  };

  const onSubmit = (data) => {
    id ? handleUpdateMember(data) : addMember(data);
  };
  const handleUpdateMember = async (memberValues) => {
    const payload = {
      id: id,
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

  const addMember = async (memberValues) => {
    try {
      const dataResponse = await dispatch(createMember(memberValues));
      const modalData = {
        title: dataResponse.error ? 'Error!' : 'Success!',
        desc: dataResponse.message
      };
      setModalInfo(modalData);
      dispatch(getMembers());
      if (dataResponse.error) {
        setIsOpen(true);
        setIsMemberCreated(false);
      } else {
        setIsOpen(true);
        setIsMemberCreated(true);
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
          {!id && (
            <div data-testid="member-email">
              <TextInput
                labelName={'Email'}
                name={'email'}
                inputType={'text'}
                register={register}
                error={errors.email?.message}
              />
            </div>
          )}
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
          <div data-testid="member-postal-code">
            <TextInput
              labelName={'PostalCode'}
              name={'postalCode'}
              inputType={'text'}
              register={register}
              error={errors.postalCode?.message}
            />
          </div>
          <div className={styles.contDate} data-testid="member-birthday">
            <DatePicker
              name={'birthday'}
              title={'Birthday'}
              register={register}
              error={errors.birthday?.message}
            />
          </div>
          <div className={styles.inputContainer} data-testid="member-membership">
            <label>Membership</label>
            <Select
              name={'membership'}
              selectID={''}
              register={register}
              error={errors.membership?.message}
            >
              <option value="">Choose a membership</option>
              <option value="Black Membership">Black Membership</option>
              <option value="Classic Membership">Classic Membership</option>
              <option value="Only Classes Membership">Only Classes Membership</option>
            </Select>
          </div>
          <div className={styles.inputContainer} data-testid="member-active">
            {id && (
              <>
                <label className={styles.label}>Status</label>
                <Select name={'isActive'} selectID={''} register={register}>
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Select>
              </>
            )}
          </div>
        </div>
        <div className={styles.contButton}>
          <div>
            <Button text="Cancel" type="button" clickAction={() => history.goBack()} />
            <Button text="Reset" type="button" clickAction={() => reset()} />
          </div>
          <Button type="submit" text={id ? 'Save' : 'Add'} testId="member-confirm-button" />
        </div>
      </form>
    </section>
  );
};

export default FormMembers;
