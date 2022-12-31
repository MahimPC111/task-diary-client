import React from 'react';
import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import './Header.css'
import img from '../../assets/navbar-icon.png'
import { FaMoon } from 'react-icons/fa';
import { BsFillSunFill } from 'react-icons/bs';


const Header = () => {
    const { user, logOutUser, handleThemeChange, theme } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSignOut = () => {
        logOutUser()
            .then(() => {
                navigate('/login');
            })
            .catch(e => toast.error(e.message))
    }
    const bg1 = {
        background: '#37446b'
    }
    const bg2 = {
        background: '#6579b8'
    }
    const navLinkColor = theme ? 'header-link' : 'header-link2';
    const bgTheme = theme ? bg1 : bg2;

    return (
        <Navbar collapseOnSelect expand="lg" bg={theme ? 'dark' : 'light'} variant="dark">
            <Container className='d-flex align-items-center text-center'>

                <img src={img} style={{ width: '60px' }} alt='' />

                <Navbar.Brand className='fs-1 fw-semibold'>
                    <span style={{ color: '#FF9933' }}>Task</span>
                    <span style={{ color: '#6699FF' }}>Diary</span>
                </Navbar.Brand>
                <Navbar.Toggle style={bgTheme} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-lg-5 me-auto">
                        <NavLink className={`${navLinkColor} ${({ isActive }) => isActive ? 'active' : undefined}`} to='/'>Home</NavLink>
                        {
                            user?.uid &&
                            <>
                                <NavLink className={navLinkColor} to='/addTask'>Add Task</NavLink>
                                <NavLink className={navLinkColor} to='/myTasks'>My Tasks</NavLink>
                                <NavLink className={navLinkColor} to='/completedTasks'>Completed Tasks</NavLink>
                                <NavLink className={navLinkColor} to='/media'>Media</NavLink>
                            </>
                        }
                    </Nav>
                    <Nav>
                        {
                            user?.uid ?
                                <button onClick={handleSignOut} className='button-logout'>Log Out</button>
                                :
                                <>
                                    <NavLink className={navLinkColor} to='/login'>Log In</NavLink>
                                    <NavLink className={navLinkColor} to='/register'>Register</NavLink>
                                </>

                        }
                        <button className='button-mode' onClick={handleThemeChange}>
                            {theme ? <BsFillSunFill /> : < FaMoon />}
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default Header;