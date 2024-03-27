
import axios from "axios";
import { useDispatch , useSelector  } from 'react-redux';
import { fetchUsers, postData } from '~/Slice/dashborad/dashbordSlice';
import { Form, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Page } from '@shopify/polaris';
import {showToastMessage} from '../component/Toast';
import { Drop } from '~/component/drop';
export default function Index() {
  const dispatch = useDispatch()   
  const Navigate  = useNavigate()
  const selctedProducts = useSelector(state=> state.dashbordSlice.products)
  const productList = useSelector(state=> state.dashbordSlice.productList)
  const loading = useSelector(state => state.dashbordSlice.loading);  
  // const newProducts = useSelector(state=> state.dashbordSlice.newselectedProducts) 
  
  useEffect(()=>{
    dispatch(fetchUsers())
  }, [])
  
  const [SubmitButton , setSubmitButton] = useState(true)
  const [newProducts , setNewProducts] = useState([])
  useEffect(()=>{
    console.log(newProducts , "index");
    if(newProducts.length > 0){
      setSubmitButton(false)
    }else{
      setSubmitButton(true)
    }
  }, [newProducts])
  const submitdata = () => { 
    if(newProducts.length !== 0){
      axios.post('https://dynamicpricing.expertvillagemedia.com/public/api/addproduct', {
      product_id:newProducts
      }
      )
      .then((response) => {
        console.log(response);      
        dispatch(postData());
        showToastMessage("Product is added" , 2000);    
        Navigate("products")  

      }, (error) => {
        console.log(error);
      });
      }
      else{
        
        showToastMessage("Please select one product" , 2000);
      }
  };


  return (
    <div className='dp-dashbord-page page-wrapper'>  
      <Page title="DashBoard" primaryAction={{content: 'Submit', disabled: SubmitButton,  onAction: () => submitdata()}}>
        <Form >
          <Drop newProducts={newProducts} setNewProducts={setNewProducts}  productList={productList} loading={loading}/>       
        </Form>
      </Page>      
    </div>
  );
}
