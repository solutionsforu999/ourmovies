import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='d-flex justify-content-between border'>
            <Link to={'/'}>Movies Guide </Link>
            {/* <Link to={'popular'}> Popular </Link>
            <Link to={'posts'}> Posts </Link>
            <Link to={'toprated'}> TopRated </Link> */}
            <Link to={'comingup'}> UpComing </Link>
        </div>
    )
}
export default Navbar;