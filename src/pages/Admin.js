import { Link } from 'react-router-dom';
import AddCustomProduct from '../components/AdminSystem';

const Admin = () => {
    return (<>
        <Link to={'/'}>Home</Link>
        <h1>Admin System</h1>
        <AddCustomProduct />
    </>
    );
};

export default Admin;


