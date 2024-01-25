'use client'
import React, { useEffect, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/reducerSlices/userSlice'
import { useRouter } from 'next/navigation'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import AddCategories from './addCategories/page';
import AddProducts from './addProducts/page';
import Customers from './customers/page';
import {Pagination} from "@nextui-org/react";

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
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit"> <Link href="/">COTT-WOOL</Link></p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <h1>Welcome to Admin Panel</h1>
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
                      My Settings
                    </DropdownItem>
                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Admin = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [users, setUsers]= useState([]);
  const [count, setCount]= useState(0)

  const fetchAllusers= async(page=1)=>{
    const res= await fetch(`http://localhost:5000/users?page=${page}`)
    const data= await res.json()
    setUsers(data.allUsers)
    setCount(data.count)
    

  }

  useEffect(()=>{
    fetchAllusers()
  }, [])

  return (
    <>
      <NavAdmin />

      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: screen }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Add Categories" {...a11yProps(1)} />
          <Tab label="Add Products" {...a11yProps(2)} />
          <Tab label="Customers" {...a11yProps(3)} />
          <Tab label="All Products" {...a11yProps(4)} />

        </Tabs>

        <TabPanel value={value} index={0}>
          Dashboard
        </TabPanel>

        <TabPanel value={value} index={1} className='mx-auto'>
          <AddCategories/>
        </TabPanel>

        <TabPanel value={value} index={2} className='mx-auto'>
          <AddProducts/>
        </TabPanel>

        <TabPanel value={value} index={3} className='mx-auto'>
          <Customers usersId={users._id} users={users}/>
          {/* server side pagination */}
          <Pagination onChange={(page)=>fetchAllusers(page)}  total={Math.ceil(count/5)} initialPage={1} />
        </TabPanel>

        <TabPanel value={value} index={4}>
         All Products
        </TabPanel>
      </Box>
    </>
  )
}

export default Admin