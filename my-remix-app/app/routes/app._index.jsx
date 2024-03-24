
import { useDispatch , useSelector  } from 'react-redux';
import { postData } from '~/Slice/dashborad/dashbordSlice';
import  {Button} from '../component/Button'
import {ResourceList} from "../component/ResourceList"
import { Form, useLoaderData , useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Page } from '@shopify/polaris';
import {showToastMessage} from '../component/Toast';
import {Table} from "../component/Table"

import axios from "axios";
export const loader = async () => {
  // Concatenating the URL parts

  try {
    const response = await fetch('https://dynamicpricing.expertvillagemedia.com/public/api/getproduct'); 
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to load data');
  }
};

export default function Index() {
  const Navigate  = useNavigate()
  const dispatch = useDispatch()
  const thead= [ "Select" , "productname" , "Product Code" , 	"Barcode" , "Product Cost" , "Status" ];
  const data = useLoaderData();  
  const newProducts = useSelector(state=> state.dashbordSlice.newselectedProducts) 
  const productList = useSelector(state=> state.dashbordSlice.productList) 
  const [tbody , setTbody] = useState(data.data.data.products)
  const [buttonState , setButtonState] = useState(false)
  // console.log(productList , "valueindex")
  const submitdata = (e) => { 
    
    e.preventDefault();
    if(newProducts.length !== 0){
      axios.post('https://dynamicpricing.expertvillagemedia.com/public/api/addproduct', {
      product_id:newProducts
      }
      )
      .then((response) => {
        console.log(response);      
        dispatch(postData());
        showToastMessage("Product is added" , 2000);    
        Navigate("/allproducts")  

      }, (error) => {
        console.log(error);
      });
      }
      else{
        setButtonState(prev => !prev);
        showToastMessage("Please select one product" , 2000);
      }
  };


  return (
    <div className='dp-dashbord-page page-wrapper'>  
      <Page title="DashBoard" primaryAction={{content: 'Submit',  disabled: {buttonState} , onAction: (e) => submitdata(e)}}>
        <Form >                   
        <ResourceList thead={thead} tbody={tbody}/>
       
        </Form>
      </Page>      
    </div>
  );
}
