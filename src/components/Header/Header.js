import React from 'react';
import { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import './Header.css'
import img from '../../assets/navbar-icon.png'


const Header = () => {
    const { user, logOutUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleSignOut = () => {
        logOutUser()
            .then(() => {
                navigate('/login');
            })
            .catch(e => toast.error(e.message))
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container className='d-flex align-items-center text-center'>

                <img src={img} style={{ width: '60px' }} alt='' />

                <Navbar.Brand className='fs-1 fw-semibold'>
                    <span style={{ color: '#FF9933' }}>Task</span>
                    <span style={{ color: '#6699FF' }}>Diary</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-lg-5 me-auto">
                        {
                            user?.uid &&
                            <>
                                <NavLink className={`header-link ${({ isActive }) => isActive ? 'active' : undefined}`} to='/'>Home</NavLink>
                                <NavLink className='header-link' to='/addTask'>Add Task</NavLink>
                                <NavLink className='header-link' to='/myTasks'>My Tasks</NavLink>
                                <NavLink className='header-link' to='/completedTasks'>Completed Tasks</NavLink>
                                <NavLink className='header-link' to='/media'>Media</NavLink>
                            </>
                        }
                    </Nav>
                    <Nav>
                        {
                            user?.uid ?
                                <button onClick={handleSignOut} className='button-logout'>Log Out</button>
                                :
                                <>
                                    <NavLink className='header-link' to='/login'>Log In</NavLink>
                                    <NavLink className='header-link' to='/register'>Register</NavLink>
                                </>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;