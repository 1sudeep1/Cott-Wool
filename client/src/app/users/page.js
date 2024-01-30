'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RegisterNewUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/users`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {Array.isArray(data) && data.length > 0 ? (
        data.map((item, id) => (
          <div key={id}>
            <p className='text-xl font-semibold'>Name: {item.name}</p>
            <p className='text-xl font-semibold'>Email: {item.email}</p>
            <p className='text-xl font-semibold'>Password: {item.password}</p>
            <p className='text-xl font-semibold'>Gender: {item.gender}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default RegisterNewUser;
