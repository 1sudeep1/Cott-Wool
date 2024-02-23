import React from 'react'
import DynamicForm from '../../components/dynamicForm/page';
const AddProducts = () => {
  return (
    <>
      <DynamicForm formTitle='Add Products' fieldList={[
        { fieldName: "Product Name",type:'text', placeholder: 'enter product name', name: 'productName'},
        { fieldName: "Product Image",type:'file', name: 'productImage'},
        { fieldName: "Product Price",type:'number', name: 'productPrice', placeholder:'enter product price'},
      ]}
      textArea={[{fieldName:'Product Description', name:'productDescription', placeholder:'enter product description'}]}
      chooseCategory={[{fieldName:'Choose Category', placeholder:'select category', name:'productCategory'}]}
      chooseSubCategory={[{fieldName:'Choose Sub Category', placeholder:'select Sub category', name:'productSubCategory'}]}
      button='Add'
      />
    </>
  )
}

export default AddProducts