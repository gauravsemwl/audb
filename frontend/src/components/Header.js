import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavItem } from 'react-bootstrap';
import { FaUser, FaShoppingCart } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
const Header = () => {
    const { userInfo } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/login')
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/" style={{
                        fontSize: '25px',
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: '700',

                    }}>
                        <img
                            src='images/image.png'
                            alt='Aud'
                            style={{ width: '50px', marginRight: '5px', marginBottom: '2px' }}
                        />
                        AUDIO BOOKS
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                    <Navbar.Collapse id='basic-navbar-new'>
                        <Nav className='ms-auto'>
                            {userInfo ? (
                                <Nav.Link onClick={logoutHandler}>{`Logout ( ${userInfo.name} )`}</Nav.Link>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link href='/login'><FaUser />SignIn</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header