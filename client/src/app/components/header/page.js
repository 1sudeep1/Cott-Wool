import React, { useEffect, useRef, useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../redux/reducerSlices/userSlice'
import { useRouter } from 'next/navigation'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, Image, Input, Badge } from "@nextui-org/react";
import Link from 'next/link';
import { IoCartOutline, IoHeartOutline, IoSearch } from "react-icons/io5";
import axios from 'axios';

const navBarConfig = {
  true: [{ 'label': 'Categories', 'href': '/categories' }, { 'label': 'Contact Us', 'href': '/contact' }],
  false: [{ 'label': 'About', 'href': '/about' }, { 'label': 'Features', 'href': '/features' }]
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
  const {wishListCounter}= useSelector(state=>state.wishList)
  const dispatch = useDispatch()
  const handleLogout = () => {
    router.push('/login')
    dispatch(setLogout())
  }

  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [toggleCat, setToggleCat]= useState(false)

  const fetchCategory = async () => {
    const res = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/category`)
    const data = await res.data
    setCategory(data.allCategory)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const {cartCounter}= useSelector(state=>state.cart)

  const handleMouseEnter=(e)=>{
    setSubCategory(e)
    setToggleCat(true)
  }
  const handleMouseLeave=()=>{
    setToggleCat(false)
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
              <div className='flex justify-between gap-5'>
                {navBarConfig[isLoggedIn].map((item, id) => {
                  return (<NavbarItem key={id} >
                    <div>
                      {item.label == 'Categories' ?
                        <Dropdown className='bg-white rounded-sm'>
                          <DropdownTrigger>
                            <Button
                              variant="bordered"
                            >
                              {item.label}
                            </Button>
                          </DropdownTrigger>

                          <DropdownMenu
                            aria-label="Action event example"
                          >
                            {category.map((item, id) => (
                              <DropdownItem className='hover:bg-[#1f3a01e1] hover:text-white' key={id} onMouseEnter={()=>handleMouseEnter(item.subCategoryName)}>
                                <Link href={`category-product/${item.categoryName}`}>{item.categoryName}</Link>
                              </DropdownItem>
                            ))}


                          </DropdownMenu>
                        </Dropdown>
                        :
                        <Link color="foreground" href={item.href}>
                          {item.label}
                        </Link>
                      }
                    </div>
                  </NavbarItem>)
                })}
              </div>
              :
              <div className='flex justify-between gap-5'>
                {navBarConfig[isLoggedIn].map((item, id) =>
                  <Link key={id} color="foreground" href={item.href}>
                    {item.label}
                  </Link>

                )}

              </div>
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
              startContent={<IoSearch className='text-xl' />}
              className="border rounded-2xl text-gray-400"
            />
          </NavbarItem>

        </NavbarContent>


        <NavbarContent justify="end">
          <div className='flex gap-5 mx-auto'>
            <NavbarItem as={Link} href='/wishlist'>
            <Badge className={`bg-red-600 text-white ${wishListCounter<1? 'hidden':null}`} content={wishListCounter} shape="circle" size='lg'>
              <IoHeartOutline className='text-3xl' title='wishlist' />
              </Badge>
            </NavbarItem>
            <NavbarItem as={Link} href='/cart'>
              <Badge className={`bg-red-600 text-white ${cartCounter<1? 'hidden':null}`} content={cartCounter} shape="circle" size='lg'>
                <IoCartOutline className='text-3xl' title='cart' />
              </Badge>
            </NavbarItem>
          </div>

          <NavbarItem>
            {isLoggedIn ?
              <div className="flex items-center gap-4 ">
                <Dropdown placement="bottom-start" >
                  <DropdownTrigger>
                    <User
                      as="button"
                      avatarProps={{
                        isBordered: true,
                        src: `http://localhost:5000/profile/${userDetails._id}`,
                        // src:`http://localhost:5000/uploads/profilePic/${userDetails.profilePic}`,
                        alt: 'profile pic'
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
 
      <ul className='bg-white rounded-sm w-[220px] fixed ps-2 m-0 right-[41%] z-10' onMouseLeave={()=>handleMouseLeave()}>
        {toggleCat && subCategory.map((subCat)=>(
          <Link href={`subcategory-products/${subCat}`}><li className='py-1 ps-2 hover:bg-[#1f3a01e1] hover:text-white'>{subCat}</li></Link>
        ))}
      </ul>
    </>
  )
}

export default Header