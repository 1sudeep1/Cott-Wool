'use client'
import React from 'react'
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
import { Formik, Form, Field } from 'formik';
import { Textarea } from "@nextui-org/react";

import { Select, SelectItem } from "@nextui-org/react";

const animals = [
  { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
  { label: "Dog", value: "dog", description: "The most popular pet in the world" },
  { label: "Elephant", value: "elephant", description: "The largest land animal" },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  { label: "Penguin", value: "penguin", description: "A group of aquatic flightless birds" },
  { label: "Zebra", value: "zebra", description: "A several species of African equids" },
  {
    label: "Shark",
    value: "shark",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  { label: "Otter", value: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
  { label: "Crocodile", value: "crocodile", description: "A large semiaquatic reptile" },
];

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
                      <p className="font-semibold">{`${userDetails.firstName} ${userDetails.lastName}`}</p>
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
          <h1 className='text-lg mb-5 text-center'>Add Categories</h1>
          <Formik>
            <Form>
              <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-2 justify-between'>
                  <label htmlFor="categoryName">Category Name</label>
                  <Field name="categoryName" id="categoryName" placeholder='category name' className='border p-1 rounded-md' />
                </div>
                <div className='flex items-center gap-2 justify-between'>
                  <label htmlFor="subCategoryName">Sub-category Name</label>
                  <Field name="subCategoryName" id="subCategoryName" placeholder='sub-category name' className='border p-1 rounded-md' />
                </div>
                <Button>Submit</Button>
              </div>
            </Form>
          </Formik>
        </TabPanel>
        <TabPanel value={value} index={2} className='mx-auto'>
          <h1 className='text-lg mb-5 text-center'>Add Products</h1>
          <Formik>
            <Form>
              <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-2 justify-between'>
                  <label htmlFor="productName">Product Name</label>
                  <Field name="productName" id="productName" placeholder='product name' className='border p-1 rounded-md' />
                </div>
                <div className='flex items-center gap-2 justify-between'>
                  <label htmlFor="productImage">Product Image</label>
                  <Field type='file' name="productImage" id="productImage" className='border p-1 rounded-md' />
                </div>
                <div className='flex items-center gap-2 justify-between'>
                  <label htmlFor="productPrice">Product Price</label>
                  <Field type='number' name="productPrice" id="productPrice" placeholder='product price' className='border p-1 rounded-md' />
                </div>
                <div className='flex  gap-2 justify-between'>
                  <label htmlFor="productDescription">Product Description</label>
                  <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                    <Textarea
                      id="productDescription" className='border'
                      placeholder="Enter your Product description"
                    />
                  </div>
                </div>
                <div className='flex  gap-2 justify-between' >
                  <label htmlFor="productDescription">Choose Category</label>
                  <Select

                    placeholder="Select an animal"
                    selectionMode="multiple"
                    className="max-w-xs"
                  >
                    {animals.map((animal) => (
                      <SelectItem key={animal.value} value={animal.value} className='bg-gray-400' >
                        {animal.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <Button>Submit</Button>
              </div>
            </Form>
          </Formik>
        </TabPanel>

        <TabPanel value={value} index={3}>
          Customers
        </TabPanel>
        <TabPanel value={value} index={4}>
         All Products
        </TabPanel>
      </Box>
    </>
  )
}

export default Admin