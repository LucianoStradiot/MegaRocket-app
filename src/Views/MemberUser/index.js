import Button from 'Components/Shared/Button';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const memberUser = () => {
  return (
    <div>
      <h1>Usuario</h1>
      <Link to="/memberUser/activityInfo/">
        <Button text="activity" type="add" />
      </Link>
    </div>
  );
};
export default memberUser;
