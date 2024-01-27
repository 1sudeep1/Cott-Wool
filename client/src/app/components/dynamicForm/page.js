import React from 'react'
import { Formik, Form, Field } from 'formik';
import { Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import CreatableSelect from 'react-select/creatable';

const animals = [
    { label: "Cat", value: "cat", description: "The second most popular pet in the world" },
    { label: "Dog", value: "dog", description: "The most popular pet in the world" },
    { label: "Elephant", value: "elephant", description: "The largest land animal" },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    { label: "Giraffe", value: "giraffe", description: "The tallest land animal" },
  ];

const DynamicForm = (props) => {
    return (
        <>
            <h1 className='text-lg mb-5 text-center'>{props.formTitle}</h1>
            <Formik>
                <Form>
                    <div className='flex flex-col gap-5'>
                        {props.fieldList.map((item) => (
                            <div className='flex items-center gap-2 justify-between' key={item.fieldName}>
                                <label htmlFor={item.name}>{item.fieldName}</label>
                                <Field type={item.type} name={item.name} id={item.name} placeholder={item.placeholder} className='border p-1 rounded-md' />
                            </div>
                        ))}


                        {props.textArea && props.textArea.map((item) => (
                            <div className='flex  gap-2 justify-between' key={item.fieldName}>
                                <label htmlFor={item.name}>{item.fieldName}</label>
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <Textarea
                                        id={item.name} className='border'
                                        placeholder={item.placeholder}
                                    />
                                </div>
                            </div>
                        ))}

                        {props.subCategoryFieldList && props.subCategoryFieldList.map((item) => (
                            <div className='flex items-center gap-2 justify-between' key={item.fieldName}>
                                <label htmlFor={item.name}>{item.fieldName}</label>
                                {/* <Field name="subCategoryName" id="subCategoryName" placeholder='sub-category name' className='border p-1 rounded-md' /> */}
                                <CreatableSelect name={item.name} id={item.name} isMulti options={[]} />
                            </div>
                        ))}

                        {props.chooseCategory && props.chooseCategory.map((item)=>(
                        <div className='flex  gap-2 justify-between' key={item.fieldName} >
                            <label htmlFor="chooseCategory">{item.fieldName}</label>
                            <Select
                                placeholder={item.placeholder}
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
                        ))}
                        {props.chooseSubCategory && props.chooseSubCategory.map((item)=>(
                        <div className='flex  gap-2 justify-between' key={item.fieldName} >
                            <label htmlFor="chooseCategory">{item.fieldName}</label>
                            <Select
                                placeholder={item.placeholder}
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
                        ))}

                        <Button className='bg-slate-400 p-1 rounded-md'>{props.button}</Button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default DynamicForm