import { useEffect, useState } from 'react';
import styles from './form-members.module.css';
import TextInput from '../../Shared/TextInput';
import Select from '../../Shared/Select';
import Button from '../../Shared/Button';
import DatePicker from '../../Shared/DatePicker';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../../Shared/Modal';

const FormMembers = () => {
  const history = useHistory();
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [isMemberCreated, setIsMemberCreated] = useState(false);
  const [memberValues, setMemberValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dni: '',
    phone: '',
    city: '',
    birthday: '',
    postalCode: '',
    membership: '',
    isActive: true
  });
  const [isOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: '',
    desc: ''
  });
  const getMembers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
    const data = await response.json();
    setMembers(data.data);
  };
  const formEdit = (id) => {
    if (id) {
      const data = members.find((aux) => aux._id === id);
      if (data) {
        setMemberValues({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          dni: data.dni,
          phone: data.phone,
          city: data.city,
          birthday: data.birthday,
          postalCode: data.postalCode,
          membership: data.membership,
          isActive: true
        });
        setIsActiveVisible(true);
      }
    } else {
      setMemberValues({
        firstName: '',
        lastName: '',
        email: '',
        dni: '',
        phone: '',
        city: '',
        birthday: '',
        postalCode: '',
        membership: '',
        isActive: true
      });
      setIsActiveVisible(false);
    }
  };
  const [isActiveVisible, setIsActiveVisible] = useState(false);

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    formEdit(id);
  }, [members]);

  const onChange = (e) => {
    setMemberValues({
      ...memberValues,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    if (!id) {
      addMember();
    } else {
      updateMember();
    }
  };

  const updateMember = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberValues)
      });

      const updatedMember = await response.json();
      if (response.ok) {
        setModalInfo({
          title: 'Success!',
          desc: updatedMember.message
        });
        setIsMemberCreated(true);
      } else {
        setIsMemberCreated(false);
        throw new Error(updatedMember.message);
      }
    } catch (error) {
      setModalInfo({
        title: 'Error!',
        desc: error.message
      });
    }
    setIsOpen(true);
  };

  const addMember = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberValues)
      });
      const dataResponse = await response.json();
      if (response.ok) {
        setModalInfo({
          title: 'Success!',
          desc: dataResponse.message
        });
        getMembers();
        setIsMemberCreated(true);
      } else {
        setIsMemberCreated(false);
        throw new Error(dataResponse.message);
      }
    } catch (error) {
      setModalInfo({
        title: 'Error!',
        desc: error.message
      });
    }
    setIsOpen(true);
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
      <h2>Members</h2>
      <form className={styles.form}>
        <div className={styles.subContainer}>
          <div>
            <TextInput
              labelName={'First Name'}
              inputName={'firstName'}
              changeAction={(e) => onChange(e)}
              inputType={'text'}
              text={memberValues.firstName}
            />
          </div>
          <div>
            <TextInput
              labelName={'Last Name'}
              inputName={'lastName'}
              changeAction={(e) => onChange(e)}
              inputType={'text'}
              text={memberValues.lastName}
            />
          </div>
          <div>
            <TextInput
              labelName={'Email'}
              inputName={'email'}
              changeAction={(e) => onChange(e)}
              inputType={'text'}
              text={memberValues.email}
            />
          </div>
          <div>
            <TextInput
              labelName={'DNI'}
              inputName={'dni'}
              changeAction={(e) => onChange(e)}
              inputType={'number'}
              text={memberValues.dni}
            />
          </div>

          <div>
            <TextInput
              labelName={'Phone'}
              inputName={'phone'}
              changeAction={(e) => onChange(e)}
              inputType={'number'}
              text={memberValues.phone}
            />
          </div>
          <div>
            <TextInput
              labelName={'City'}
              inputName={'city'}
              changeAction={(e) => onChange(e)}
              inputType={'text'}
              text={memberValues.city}
            />
          </div>
          <div>
            <TextInput
              labelName={'PostalCode'}
              inputName={'postalCode'}
              changeAction={(e) => onChange(e)}
              inputType={'number'}
              text={memberValues.postalCode}
            />
          </div>
          <div className={styles.contDate}>
            <DatePicker
              changeAction={(e) => onChange(e)}
              name={'birthday'}
              title={'Birthday'}
              val={memberValues.birthday}
            />
          </div>
          <div className={styles.inputContainer}>
            <label>Membership</label>
            <Select
              changeAction={(e) => onChange(e)}
              name={'membership'}
              selectID={''}
              selectValue={memberValues.membership}
            >
              <option value="">Seleccionar</option>
              <option value="Black Membership">Black Membership</option>
              <option value="Classic Membership">Classic Membership</option>
              <option value="Only Classes Membership">Only Classes Membership</option>
            </Select>
          </div>
          <div className={styles.inputContainer}>
            {isActiveVisible && (
              <>
                <label className={styles.label}>Status</label>
                <Select
                  changeAction={onChange}
                  name={'isActive'}
                  selectID={''}
                  selectValue={memberValues.isActive}
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Select>
              </>
            )}
          </div>
        </div>
        <div className={styles.contButton}>
          <Button clickAction={() => history.goBack()} text={'Cancel'} />
          <Button clickAction={submit} text={id ? 'Save' : 'Add'} />
        </div>
      </form>
    </section>
  );
};

export default FormMembers;
