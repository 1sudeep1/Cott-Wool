'use client'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCategories from './addCategories/page';
import AddProducts from './addProducts/page';
import Customers from './customers/page';
import { Pagination } from "@nextui-org/react";
import NavAdmin from '../components/adminNavbar/page'
import axios from 'axios';

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


  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0)

  const fetchAllusers = async (page = 1) => {
    const res = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}`)
    const data = await res.data
    setUsers(data.allUsers)
    setCount(data.count)

  }

  useEffect(() => {
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
          <AddCategories />
        </TabPanel>

        <TabPanel value={value} index={2} className='mx-auto'>
          <AddProducts />
        </TabPanel>

        <TabPanel value={value} index={3} className='mx-auto'>
          <Customers usersId={users._id} users={users} />
          {/* server side pagination */}
          <Pagination onChange={(page) => fetchAllusers(page)} total={Math.ceil(count / 5) || 1} initialPage={1} />
        </TabPanel>

        <TabPanel value={value} index={4}>
          All Products
        </TabPanel>
      </Box>
    </>
  )
}

export default Admin