import { Page, LegacyCard, BlockStack } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {ProductsCard} from "../Sections/ProductsCard";
import { fetchUsers } from "../Slice/dashborad/dashbordSlice";
export default function Products() {
    const dispatch = useDispatch()   
  const productList = useSelector(state=> state.dashbordSlice.productList)
  const selctedProducts = useSelector(state=> state.dashbordSlice.products)
  const loading = useSelector(state => state.dashbordSlice.loading);
  const [currentPage, setCurrentPage] = useState(1); 
  const [filteredSegments, setFilteredSegments] = useState([]); 
  useEffect(()=>{
    dispatch(fetchUsers())
  },[])
  useEffect(() => {
    console.log(productList);
    const selctedProductList = productList.filter(product=> selctedProducts.includes(product.id) )

    setFilteredSegments(selctedProductList.reverse()); 
   }, [productList]);
  return (
    <Page
      title="Products"
      primaryAction={{ content: "Add Product", onAction: () => {} }}
      pagination={{
        hasNext: filteredSegments.length > (currentPage - 1) * 5 + 5,
            hasPrevious: currentPage !== 1 ,
            onNext: () => {
                setCurrentPage(prev=> prev + 1)
            },
            onPrevious: () =>{
                setCurrentPage(prev=> prev - 1)
            }
      }}
    >
      <BlockStack gap="500">
        {/* <IndexFilter /> */}
        <ProductsCard productList={filteredSegments}  currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </BlockStack>
    </Page>
  );
}
