import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../redux/reducerSlices/userSlice'
import { useRouter } from 'next/navigation'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, Image, Input, SearchIcon } from "@nextui-org/react";
import Link from 'next/link';
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";

const navBarConfig = {
  true: [{ 'label': 'Categories', 'href': '/categories' }, { 'label': 'Contact Us', 'href': '/contact' }],
  false: [{ 'label': 'About Us', 'href': '/about' }, { 'label': 'Features', 'href': '/features' }]
}

const AuthButtons = () => {
  return (
    <div className='flex items-center gap-4'>
      <NavbarItem className="hidden lg:flex font-semibold">
        <Button title="login" className="font-semibold" as={Link} color="primary" href="/login" variant="flat">
          Login
        </Button>
      </NavbarItem>
      <NavbarItem className="hidden lg:flex ">
        <Button title="sign up" className="font-semibold" as={Link} color="primary" href="/register" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </div>
  )
}

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
      <Navbar className="bg-white">
        <NavbarBrand as={Link} href="/">
          <Image src='/logo.png' width={63} height={63} />
          <p className="font-bold text-inherit text-[#3D550C] text-lg"> COTT-WOOL</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">

          {
            isLoggedIn ?
              <>
                {navBarConfig[isLoggedIn].map((item, id) => {
                  return (<NavbarItem key={id} >
                    <Link className='font-semibold' color="foreground" href={item.href}>
                      {item.label}
                    </Link>
                  </NavbarItem>)
                })}
              </>
              :
              <>
                {navBarConfig[isLoggedIn].map((item, id) => {
                  return (<NavbarItem key={id} >
                    <Link className='font-semibold' color="foreground" href={item.href}>
                      {item.label}
                    </Link>
                  </NavbarItem>)
                })}
              </>
          }
          <NavbarItem>
            <Input
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",

              }}
              placeholder="Type to search products..."
              size="sm"
              type="search"
              startContent={<FaSearch />}
              className="border rounded-2xl text-gray-400"
            />
          </NavbarItem>

        </NavbarContent>


        <NavbarContent justify="end">
          <NavbarItem>
            <FaHeart className='text-xl' title='wishlist' />
          </NavbarItem>
          <NavbarItem>
            <FaShoppingCart className='text-xl' title='cart' />
          </NavbarItem>

          <NavbarItem>
            {isLoggedIn ?
              <div className="flex items-center gap-4 ">
                <Dropdown placement="bottom-start" >
                  <DropdownTrigger>
                    <User
                      as="button"
                      avatarProps={{
                        isBordered: true,
                        src: "https://as1.ftcdn.net/v2/jpg/05/60/26/08/1000_F_560260880_O1V3Qm2cNO5HWjN66mBh2NrlPHNHOUxW.jpg",
                      }}

                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat" className='bg-gray-400 text-white'>

                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">{userDetails.fullName}</p>
                      <p className="font-semibold">{userDetails.email}</p>
                    </DropdownItem>

                    <DropdownItem key="settings">
                      <Link color="foreground" href="/profile">
                        My Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem as={Link} href='/change-password' key="team_settings">Change Password</DropdownItem>
                    <DropdownItem key="analytics">
                      Analytics
                    </DropdownItem>
                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>
                    <DropdownItem key="help_and_feedback">
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" className='text-red-600' onClick={handleLogout}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              :
              <AuthButtons />
            }

          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default Header