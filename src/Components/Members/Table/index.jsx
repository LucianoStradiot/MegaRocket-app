import React from 'react';

import styles from './table.module.css';

const Table = ({ members, deleteMember }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {members.length > 0 &&
          members?.map((member) => {
            return (
              <tr key={member._id}>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td></td>
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
