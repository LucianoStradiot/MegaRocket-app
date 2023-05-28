import { useEffect, useState } from 'react';

function Classes() {
  const [classes, setClasses] = useState([]);
  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/classes`);
      const { data: classes } = await response.json();
      setClasses(classes);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClass = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/classes/${id}`, { method: 'DELETE' });
      setClasses((currentClasses) => {
        return currentClasses.filter((oneClass) => oneClass._id !== id);
      });
      getClasses();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <section>
      <h2>Classes</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Hour</th>
            <th>Trainer</th>
            <th>Activity</th>
            <th>Slots</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((oneClass) => {
            return (
              <tr key={oneClass._id}>
                <td>{oneClass.day}</td>
                <td>{oneClass.hour}</td>
                <td>{oneClass.trainer.firstName}</td>
                <td>{oneClass.activity.name}</td>
                <td>{oneClass.slots}</td>
                <td>
                  <button key={oneClass._id} onClick={() => deleteClass(oneClass._id)}>
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Classes;
