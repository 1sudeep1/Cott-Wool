import React from 'react'
import { Formik, Form, Field } from 'formik';
import { Textarea, Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

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
const AddProducts = () => {
    return (
        <>
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
        </>
    )
}

export default AddProducts