import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../redux/reducerSlices/userSlice'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const { userDetails, isLoggedIn } = useSelector((state, actions) => state.user)
  const dispatch = useDispatch()
  const handleLogout = () => {
    router.push('/login')
    dispatch(setLogout())
  }
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit"> <Link href="/">COTT-WOOL</Link></p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            {isLoggedIn ? <button onClick={handleLogout}>Logout</button> : <Link href="/login">Login</Link>}
          </NavbarItem>
          <NavbarItem>
            {isLoggedIn ?
              <Button as={Link} color="primary" href="#" variant="flat">
                {userDetails.firstName}
              </Button>
              :
              <Button as={Link} color="primary" href="/register" variant="flat">
                Sign Up
              </Button>
            }

          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default Header