import { Link } from 'react-router-dom';
import AddCustomProduct from '../components/AdminSystem';

const Admin = () => {
    return (<>
        <Link to={'/'}>Home</Link>
        <AddCustomProduct />
    </>
    );
};

export default Admin;


