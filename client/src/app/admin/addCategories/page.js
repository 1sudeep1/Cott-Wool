import React from 'react'
import { Formik, Form, Field } from 'formik';
import { Button } from "@nextui-org/react";
const AddCategories = () => {
    return (
        <>
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
        </>
    )
}

export default AddCategories