import React from 'react';

import styles from './table.module.css';

const Table = ({ members, deleteMember, setIdMember, setMemberValues, setShowForm }) => {
  console.log(members);
  return (
    <table className={styles.tableMember}>
      <thead>
        <tr>
          <th className={styles.thMember}>Name</th>
          <th className={styles.thMember}>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {members?.length > 0 &&
          members?.map((member) => {
            return (
              <tr key={member._id}>
                <td className={styles.tdMember}>{member.firstName}</td>
                <td className={styles.tdMember}>{member.lastName}</td>
                <td className={styles.tdMember}>
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      setIdMember(member._id);
                      setShowForm(true);
                      setMemberValues({
                        firstName: member.firstName,
                        lastName: member.lastName,
                        email: member.email,
                        dni: member.dni,
                        phone: member.phone,
                        city: member.city,
                        birthday: member.birthday,
                        postalCode: member.postalCode,
                        membership: member.membership,
                        isActive: member.isActive
                      });
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className={styles.tdMember}>
                  <button className={styles.deleteButton} onClick={() => deleteMember(member._id)}>
                    X
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
