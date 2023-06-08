import React from 'react';
import Button from '../../Shared/Button';
import DatePicker from '../../Shared/DatePicker';
import Select from '../../Shared/Select';
import style from '../../Subscriptions/subscriptions.module.css';
const Form = (
  createClasses,
  createMember,
  createDate,
  createId,
  onchangeInput,
  classes,
  members,
  button,
  setShowForm,
  updateSubscription,
  createSubscription
) => {
  return (
    <form className={style.formSubscription}>
      <label htmlFor="">Classes</label>
      <Select
        name="classes"
        selectID="classes"
        changeAction={onchangeInput}
        selectValue={createClasses}
      >
        <option value="" disabled>
          Choose a classes
        </option>
        {classes.map((oneClass) => {
          return (
            <option
              value={oneClass._id}
              key={oneClass._id}
              selected={oneClass._id === createClasses}
            >
              {oneClass.hour} {oneClass.activity.name}, Trainer:{' '}
              {oneClass.trainer && oneClass.trainer.firstName}
            </option>
          );
        })}
      </Select>
      <label htmlFor="">Member Email</label>
      <Select
        name="member"
        selectID="member"
        changeAction={onchangeInput}
        selectValue={createMember}
      >
        <option value="" disabled>
          Choose a Member
        </option>
        {members.map((subs) => {
          return (
            <option value={subs._id} key={subs._id} selected={subs._id === createMember}>
              {subs.email}
            </option>
          );
        })}
      </Select>
      <label htmlFor="">Date</label>
      <DatePicker
        className={style.inputForm}
        type="date"
        name="date"
        val={createDate}
        changeAction={onchangeInput}
      />
      <Button
        text={button === 'Create' ? 'add' : 'Save'}
        type={button === 'Create' ? 'add' : 'save'}
        clickAction={button === 'Create' ? createSubscription : () => updateSubscription(createId)}
      />
      <Button text="Cancel" type="cancel" clickAction={() => setShowForm(false)} />
    </form>
  );
};

export default Form;
