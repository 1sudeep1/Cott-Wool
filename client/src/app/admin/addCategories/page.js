import React from 'react'
import DynamicForm from '../../components/dynamicForm/page';
const AddCategories = () => {
  return (
    <>
      <DynamicForm formTitle='Add Categories' fieldList={[
        { fieldName: "Category Name", placeholder: 'enter category name', name: 'categoryName' },
      ]}
        subCategoryFieldList={[{ fieldName: 'Sub Category Name', name: 'subCategoryName' }]}
        button='Add'
      />
    </>
  )
}

export default AddCategories