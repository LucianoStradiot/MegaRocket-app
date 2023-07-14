import styles from './table.module.css';

import { Link } from 'react-router-dom';
import { FiEdit, FiXSquare } from 'react-icons/fi';

/**
 *To implement the Table you have to pass one list(list), the names of your
 *columns(column), the names of your fields(fields), one link and one action to execute.
 *example:
 *list ['name', 'surname', 'age'];
 *fields ['member.name', 'member.surname', 'age'];
 */

const Table = ({ list, column, fields, link, action }) => {
  const headers = column.length;

  const splitDescription = (description, maxLength) => {
    const words = description.split(' ');
    let line = '';
    let lines = [];

    words.forEach((word) => {
      if (line.length + word.length <= maxLength) {
        line += word + ' ';
      } else {
        lines.push(line.trim());
        line = word + ' ';
      }
    });

    if (line.trim() !== '') {
      lines.push(line.trim());
    }

    return lines;
  };

  return (
    <section className={styles.container}>
      <div className={styles.tableContainer} data-testid="container-table">
        <table className={styles.contTable}>
          <thead className={styles.theadTable}>
            <tr>
              {column.map((aux, index) => {
                if (index === headers - 1) {
                  return (
                    <th
                      key={index}
                      className={`${styles.thTable} ${styles.headers} ${styles.borderRight}`}
                    >
                      {aux}
                    </th>
                  );
                } else if (index === 0) {
                  return (
                    <th
                      key={index}
                      className={`${styles.thTable} ${styles.headers} ${styles.borderLeft}`}
                    >
                      {aux}
                    </th>
                  );
                } else {
                  return (
                    <th key={index} className={`${styles.thTable} ${styles.headers}`}>
                      {aux}
                    </th>
                  );
                }
              })}
            </tr>
          </thead>

          <tbody className={styles.tbody}>
            {list.map((item) => {
              return (
                <>
                  <tr key={item._id} className={styles.rows}>
                    {fields.map((field, index) => {
                      const nestedFields = field.split('.');
                      const fieldData = nestedFields.reduce(
                        (obj, field) => obj && obj[field],
                        item
                      );
                      let transformedFieldData =
                        field === 'date' ? fieldData.substring(0, 10) : fieldData;
                      if (field === 'isActive') {
                        fieldData
                          ? (transformedFieldData = 'Active')
                          : (transformedFieldData = 'Inactive');
                      }
                      if (field === 'description') {
                        transformedFieldData = splitDescription(fieldData, 50);
                        return (
                          <td key={index} className={styles.thTable}>
                            {transformedFieldData.map((line, index) => (
                              <div key={index}>{line}</div>
                            ))}
                          </td>
                        );
                      }
                      if (fieldData === (undefined || null)) {
                        if (!fieldData) transformedFieldData = 'empty';
                      }
                      return (
                        <td key={index} className={styles.thTable}>
                          {transformedFieldData}
                        </td>
                      );
                    })}
                    <td
                      className={`${styles.thTable} ${styles.btnsContainer}`}
                      data-testid="buttons-table"
                    >
                      <Link to={link + item._id}>
                        <FiEdit className={styles.editIcon} />
                      </Link>
                      <FiXSquare
                        className={`${styles.editIcon} ${styles.trash}`}
                        onClick={() => action(item._id)}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
