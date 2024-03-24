import React, { useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import {fetchUsers , checkProduct , uncheckProduct } from "../Slice/dashborad/dashbordSlice";
export const ResourceList = (props) => { 
  const dispatch = useDispatch()
  const product = useSelector(state=> state.dashbordSlice)
  const newProducts = useSelector(state=> state.dashbordSlice.newselectedProducts)
  
  useEffect(()=>{
    dispatch(fetchUsers())
  }, [])
  function handleCheckboxChange(e) {
    const productId = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      dispatch(checkProduct(productId));
    } else {
      dispatch(uncheckProduct(productId));
    }
  }
  return (
    <>
  <table>
    <thead>
      <tr>
        {props.thead.map((th, index) => (
          <th key={index}>{th}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {props.tbody.map((item, index) => (         
        <tr key={index}>
          <td><input type="checkbox" name="productId" value={item.id} checked={           
           product.products.includes(item.id) || newProducts.includes(item.id)           
           } 
           disabled={product.products.includes(item.id)} onChange={handleCheckboxChange} /></td>
          <td>{item.title}</td>          
          <td>{item.variants[0].sku}</td>
           <td>{item.variants[0].barcode}</td>
          <td>{item.variants[0].price}</td>
          <td>{item.status}</td>          
        </tr>
      ))}
    </tbody>
  </table>
  </>
  )
}

