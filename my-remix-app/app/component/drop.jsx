import {
    TextField,
    IndexTable,
    LegacyCard,
    IndexFilters,
    useSetIndexFiltersMode,
    useIndexResourceState,
    Text,
    ChoiceList,
    RangeSlider,
    Badge,
    useBreakpoints,
    Tooltip,
    EmptySearchResult,
    Spinner,
  } from '@shopify/polaris';
  // import {IndexFiltersProps, TabProps} from '@shopify/polaris';
  import {useState, useCallback, useEffect, useMemo} from 'react';
  import {Paginate} from "../component/Paginate";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '~/Slice/dashborad/dashbordSlice';
  export function Drop({productList , loading, setSubmitButton , SubmitButton , newProducts , setNewProducts}) {  
    const dispatch = useDispatch()   
    const selctedProducts = useSelector(state=> state.dashbordSlice.products)
    // const productList = useSelector(state=> state.dashbordSlice.productList)
    // let newProducts = useSelector(state=> state.dashbordSlice.newselectedProducts) 
    // const loading = useSelector(state => state.dashbordSlice.loading);  
    const [currentPage, setCurrentPage] = useState(1);  
    const [query, setQuery] = useState('');
    const [filteredSegments, setFilteredSegments] = useState([]);   
    const [itemStrings, setItemStrings] = useState([
      'All',
      'Active',
      'Draft',
      'Archived'
    ]);
    const [selected, setSelected] = useState(0);  
    const [sortBy, setSortBy] = useState('');

    
    useEffect(() => {      
      setFilteredSegments(productList); 
     }, [productList]);

    const handleTabChange = useCallback((selectedTabIndex) => {
      setSortBy(itemStrings[selectedTabIndex]);
      setSelected(selectedTabIndex);
    }, [itemStrings]);

    const sortedOrders = useMemo(() => {
      if (sortBy === 'All') {        
        setFilteredSegments(productList);
      } else {
         const status = productList.filter((product) => {
          return product.product_type == "Jewelry"
         } );
         console.log(status);
         setFilteredSegments(status)
      }
    }, [sortBy]);
  
    const tabs= itemStrings.map((item, index) => ({
      content: item,
      index,
      onAction: () => {},
      id: `${item}-${index}`,
      isLocked: index === 0,
      actions:[],
    }));
    
    function handleFilterProducts(query){
      setFilteredSegments(productList);
      console.log(query , "filtered");
      const nextFilteredProducts = productList.filter((productList) => {
        return productList.title
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase().trim());
      }); 
     setFilteredSegments(nextFilteredProducts);
    };   

    function handleQueryChange(query){
      setQuery(query);  
      if (query.length >= 2) {
        handleFilterProducts(query);
      }
      else{
        setSelected(0);
        setFilteredSegments(productList)
      }        
    };

    function handleQueryClear(){
      handleQueryChange('');
    };  
    
    // function handleSelectionChange(e) {
    //   const productId = e.target.value;
    //   const isChecked = e.target.checked;
    //   if (isChecked) {
    //     dispatch(checkProduct(productId));
    //   } else {
    //     dispatch(uncheckProduct(productId));
    //   }
    // }
      
    const {mode, setMode} = useSetIndexFiltersMode();
    const onHandleCancel = () => {
     

    };
  
    const resourceName = {
      singular: 'Product',
      plural: 'Products',
    }; 

    

  const productsData = Paginate(10, filteredSegments , currentPage);
    const emptyStateMarkup = (
    
      loading? (
        <Spinner accessibilityLabel="Spinner example" size="large" />
      ):   
      <EmptySearchResult  
        title={'No Product'}
        description={'Try after some time'}
        withIllustration
      />
    );

    const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(filteredSegments); 
  

    useEffect(()=>{
      
      setNewProducts(selectedResources);
    }, [selectedResources])
    const rowMarkup = productsData.map(
      (
        item,
        index,
      ) => (
        <IndexTable.Row
          id={item.id}
          key={item.id}
          selected={selectedResources.includes(item.id)}
          position={index}
          disabled={selctedProducts.includes(item.id)}
        >
        
          <IndexTable.Cell>
          <Tooltip content={item.title}>
            <Text variant="bodyMd" fontWeight="bold" as="span">
            {item.title.length > 30 ? `${item.title.slice(0, 30)}...` : item.title}
            </Text>
            </Tooltip>
          </IndexTable.Cell>
          
          <IndexTable.Cell>{item.variants[0].sku}</IndexTable.Cell>
          <IndexTable.Cell>{item.variants[0].barcode}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {item.variants[0].price}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{item.status}</IndexTable.Cell>
        </IndexTable.Row>
      ),
    );
  
    return (
      <LegacyCard>
        <IndexFilters          
          queryValue={query}
          queryPlaceholder="Searching in all"
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}          
          cancelAction={{
            type: 'save-as',
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          }}
          tabs={tabs}
          selected={selected}
          onSelect={handleTabChange}        
          filters={[]}
          appliedFilters={[]}
          onClearAll={() => {}}
          mode={mode}
          setMode={setMode}
          hideFilters
          filteringAccessibilityTooltip="Search (F)"
          loading = {loading}
          
        />

      
          
          <IndexTable
          emptyState={emptyStateMarkup}
          resourceName={resourceName}
          itemCount={filteredSegments.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
          {title: 'productname'},
          {title: 'Product Code'},
          {title: 'Barcode'},
          {title: 'Product Cost'},
          {title: 'Status'},
          ]}
          pagination={{
            hasNext: filteredSegments.length > (currentPage - 1) * 10 + 10,
            hasPrevious: currentPage !== 1 ,
            onNext: () => {
                setCurrentPage(prev=> prev + 1)
            },
            onPrevious: () =>{
                setCurrentPage(prev=> prev - 1)
            }
          }}
        >
          {rowMarkup}
        </IndexTable>

        
      </LegacyCard>
    );
  
  //   function disambiguateLabel(key: string, value: string | any[]): string {
  //     switch (key) {
  //       case 'moneySpent':
  //         return `Money spent is between $${value[0]} and $${value[1]}`;
  //       case 'taggedWith':
  //         return `Tagged with ${value}`;
  //       case 'accountStatus':
  //         return (value as string[]).map((val) => `Customer ${val}`).join(', ');
  //       default:
  //         return value as string;
  //     }
  //   }
  
  //   function isEmpty(value: string | string[]): boolean {
  //     if (Array.isArray(value)) {
  //       return value.length === 0;
  //     } else {
  //       return value === '' || value == null;
  //     }
  //   }
  }