'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { Button, Textarea, Select, SelectItem, Input } from "@nextui-org/react";
import CreatableSelect from 'react-select/creatable';
import toast from 'react-hot-toast';
import axios from 'axios';

const DynamicForm = (props) => {
    const inputRef= useRef(null)
    const initialFieldValues = {};
    props.fieldList.map((item) =>{
        return (
                initialFieldValues[item.name] = ''
                )
    })

    const [category, setCategory] = useState([])

    const fetchCategory = async () => {
        const res = await axios.get(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/category`)
        const data = await res.data
        setCategory(data.allCategory)
    }

    useEffect(() => {
        fetchCategory()
    }, [])


    const handleCategory = async (inputCategory) => {
        try {
            const res = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/category`, inputCategory)
            const data = await res.data;
            toast(res.check? data.msg+'Add more categories' : data.msg,
            {
              icon: res.check?'✅':'❌',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
        } catch (err) {
            console.log(err)
        }
    }
    

    const handleProduct = async (inputProduct) => {
        try {
            const formData= new FormData();
            formData.append('productImage', inputRef.current.files[0])
    
            for (let item in inputProduct) {
                formData.append(item, inputProduct[item]);
            }
            const res = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products`, formData)
            const data = await res.data;
            toast(res.status===200? data.msg+' Add more products' : data.msg,
                {
                  icon: res.status===200?'✅':'❌',
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                }
              );
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate=async(productId, updateValue)=>{
        try{
        //    console.log('sudeep alina', productId)
        const formData= new FormData();
        formData.append('productImage', inputRef.current.files[0])
    
        for (let item in updateValue) {
            formData.append(item, updateValue[item]);
        }
            const res = await axios.put(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, formData)
            const data = await res.data;
            toast(res.status==200? data.msg: data.msg,
            {
              icon: res.status==200?'✅':'❌',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
        }catch(err){
            console.log(err)
        }
    }
    

    return (
        <>
            <h1 className='text-lg mb-5 text-center'>{props.formTitle}</h1>
            <Formik
                initialValues={initialFieldValues}

                onSubmit={async (values, { resetForm }) => {
                    if (values.productPrice && props.button=="Add") {
                        await handleProduct(values);
                                            
                    } else if(props.button=="Update"){
                        await handleUpdate(props.productId, values);
                    }
                    
                    else {
                        await handleCategory(values);
                    }
                    resetForm()
                }}


            >
                {(formikProps) => (
                    <Form>
                        <div className='flex flex-col gap-5'>
                            {props.fieldList.map((item) => (
                                <div className='flex items-center gap-2 justify-between' key={item.fieldName}>
                                    <label htmlFor={item.name}>{item.fieldName}</label>
                                    {item.type!='file'?
                                    <Field  type={item.type}  name={item.name} id={item.name} placeholder={item.placeholder} className='border p-1 rounded-md'onChange={formikProps.handleChange} />
                                    :
                                    <Field innerRef={inputRef} type={item.type}  name={item.name} id={item.name} placeholder={item.placeholder} className='border p-1 rounded-md' />
                                    }
                                
                                </div>
                            ))}


                            {props.textArea && props.textArea.map((item) => (
                                <div className='flex  gap-2 justify-between' key={item.fieldName}>
                                    <label htmlFor={item.name}>{item.fieldName}</label>
                                    <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                        <Textarea
                                            id={item.name} className='border'
                                            placeholder={item.placeholder}
                                            onChange={formikProps.handleChange}
                                        />
                                    </div>
                                </div>
                            ))}

                            {props.subCategoryFieldList && props.subCategoryFieldList.map((item) => (
                                <div className='flex items-center gap-2 justify-between' key={item.fieldName}>
                                    <label htmlFor={item.name}>{item.fieldName}</label>
                                    {/* <Field name="subCategoryName" id="subCategoryName" placeholder='sub-category name' className='border p-1 rounded-md' /> */}
                                    <CreatableSelect name={item.name} id={item.name} isMulti options={[]}
                                        onChange={(selectedOptions) => {
                                            const selectedValues = selectedOptions ? selectedOptions.map((option) => option.value) : [];
                                            formikProps.setFieldValue(item.name, selectedValues);

                                        }} />
                                </div>
                            ))}

                            {props.chooseCategory && props.chooseCategory.map((item) => (
                                <div className='flex  gap-2 justify-between' key={item.fieldName} >
                                    <label htmlFor="chooseCategory">{item.fieldName}</label>
                                    <Select
                                        placeholder={item.placeholder}
                                        selectionMode="multiple"
                                        className="max-w-xs"
                                        onChange={formikProps.handleChange}
                                        name={item.name}
                                    >
                                        {category.map((item) => (
                                            <SelectItem key={item.categoryName} value={item.categoryName} className='bg-gray-400' >
                                                {item.categoryName}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            ))}
                            {props.chooseSubCategory && props.chooseSubCategory.map((item) => (
                                <div className='flex gap-2 justify-between' key={item.fieldName}>
                                    <label htmlFor="chooseCategory">{item.fieldName}</label>
                                    <Select
                                        placeholder={item.placeholder}
                                        selectionMode="multiple"
                                        className="max-w-xs"
                                        onChange={formikProps.handleChange}
                                        name={item.name}
                                    >
                                        {category.map((categoryItem) => (
                                            categoryItem.subCategoryName.map((subCategory) => (
                                                <SelectItem key={subCategory} value={subCategory} className='bg-gray-400'>
                                                    {subCategory}
                                                </SelectItem>
                                            ))
                                        ))}
                                    </Select>
                                </div>
                            ))}

                            <Button type='submit' className='bg-[#3D550C] text-white p-1 rounded-md'>{props.button}</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default DynamicForm