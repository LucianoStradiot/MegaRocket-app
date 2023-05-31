import React from 'react';

import styles from './table.module.css';

const Table = ({ members, deleteMember, setIdMember, setMemberValues }) => {
  console.log(members);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {members?.length > 0 &&
          members?.map((member) => {
            return (
              <tr key={member._id}>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      setIdMember(member._id);
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
                <td>
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
