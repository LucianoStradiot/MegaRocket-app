import styles from './table.module.css';
import Button from '../Button';
import { Link } from 'react-router-dom';

/**
 *To implement the Table you have to pass one list(list), the names of your
 *columns(column), the names of your fields(fields), one link and one action to execute.
 *example:
 *list ['name', 'surname', 'age'];
 *fields ['member.name', 'member.surname', 'age'];
 */

const Table = ({ list, column, fields, link, action }) => {
  return (
    <section className={styles.container}>
      <table className={styles.contTable}>
        <thead className={styles.theadTable}>
          {column.map((aux, index) => {
            return (
              <th key={index} className={styles.thTable}>
                {aux}
              </th>
            );
          })}
        </thead>
        <tbody>
          {list.map((item) => {
            return (
              <>
                <tr key={item._id}>
                  {fields.map((field, index) => {
                    const nestedFields = field.split('.');
                    const fieldData = nestedFields.reduce((obj, field) => obj && obj[field], item);
                    const transformedFieldData =
                      field === 'date' ? fieldData.substring(0, 10) : fieldData;
                    return (
                      <td key={index} className={styles.thTable}>
                        {transformedFieldData}
                      </td>
                    );
                  })}
                  <td className={styles.thTable}>
                    <Link to={link + item._id}>
                      <Button type="edit" text="Edit" />
                    </Link>
                    <Button text="X" type="deleteCancel" clickAction={() => action(item._id)} />
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
