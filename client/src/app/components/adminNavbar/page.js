'use client'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../redux/reducerSlices/userSlice'
import { useRouter } from 'next/navigation'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, Image } from "@nextui-org/react";
import Link from "next/link";

const AuthButtons = () => {
    return (
      <div className='flex items-center gap-4'>
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" href="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </div>
    )
  }
const NavAdmin = () => {
    const router = useRouter()
    const { userDetails, isLoggedIn } = useSelector((state, actions) => state.user)
    const dispatch = useDispatch()
    const handleLogout = () => {
      router.push('/login')
      dispatch(setLogout())
    }
    return (
      <>
        <Navbar className="bg-white border-b">
        <NavbarBrand as={Link} href="/">
          <Image src='/logo.png' width={63} height={63} />
          <p className="font-bold text-inherit text-[#3D550C] text-lg"> COTT-WOOL</p>
        </NavbarBrand>
  
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <h1 className='font-semibold'>Welcome to Admin Panel</h1>
          </NavbarContent>
  
          <NavbarContent justify="end">
            <NavbarItem>
              {isLoggedIn ?
                <div className="flex items-center gap-4 ">
                  <Dropdown placement="bottom-start" >
                    <DropdownTrigger>
                      <User
                        as="button"
                        avatarProps={{
                          isBordered: true,
                          src:`http://localhost:5000/profile/${userDetails._id}`,
                          // src:`http://localhost:5000/uploads/profilePic/${userDetails.profilePic}`,
                          alt:'profile pic'
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

  export default NavAdmin