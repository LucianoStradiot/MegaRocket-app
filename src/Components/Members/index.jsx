import { useEffect, useState } from 'react';
import styles from './members.module.css';
import Table from './Table';
import Form from './Form';

const Members = () => {
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/members`);
    const data = await response.json();
    setMembers(data.data);
  };

  useEffect(() => {
    getMembers();
  }, []);

  const addMember = ({ name, email }) => {
    const newMember = {
      id: Math.floor(Math.random() * 1000),
      name,
      email
    };
    setMembers([...members, newMember]);
  };

  const deleteMember = (_id) => {
    setMembers([...members.filters((user) => user.id != _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <Form addMember={addMember} />
      <Table data={members} deleteMember={deleteMember} />
    </section>
  );
};

export default Members;
