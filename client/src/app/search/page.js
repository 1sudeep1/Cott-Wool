'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import GridProductsHome from '../components/gridProductsHome/page';
import Header from '../components/header/page';
import Footer from '../components/footer/page';
const SearchPage = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('item')
  const [searchData, setSearchData] = useState([])
  const [noSearch, setNoSearch] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchResult = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/search?item=${search}`);
          if(searchResult){
            setSearchData(searchResult.data);
          }else{
            setNoSearch(searchResult.data)
          }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
    <Header/>
    <h1 className='text-xl font-semibold p-5 capitalize'>Searched Results: {search}</h1>
      <GridProductsHome allProducts={searchData.length>0? searchData: noSearch}/>
      <Footer/>
    </>
  );
};

export default SearchPage;
