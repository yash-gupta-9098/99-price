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
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Slice/dashborad/dashbordSlice';
  
  export function Drop() {
    const dispatch = useDispatch()

    
    const [currentPage, setCurrentPage] = useState(1);
    const product = useSelector(state=> state.dashbordSlice)
    const productList = useSelector(state=> state.dashbordSlice.productList)
    const loading = useSelector(state => state.dashbordSlice.loading);
    const newProducts = useSelector(state=> state.dashbordSlice.newselectedProducts)
    const [query, setQuery] = useState('');
    const [filteredSegments, setFilteredSegments] = useState([]);
    const sleep = (ms) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const [itemStrings, setItemStrings] = useState([
      'All',
      'Active',
      'Draft',
      'Archived'
    ]);
    const [selected, setSelected] = useState(0);  
    const [sortBy, setSortBy] = useState('');


    useEffect(()=>{
      dispatch(fetchUsers())
      .then((response) => {
        setFilteredSegments(productList);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        
    });
      
    }, [])


    const handleTabChange = useCallback((selectedTabIndex) => {
      // Here you can define your sorting logic based on the selected tab index
      // For simplicity, let's say sorting is based on the index itself
      setSortBy(itemStrings[selectedTabIndex]);
      setSelected(selectedTabIndex);
    }, [itemStrings]);


    const sortedOrders = useMemo(() => {
      // Sorting logic here
      // For example, if you want to sort orders based on date
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
    
    
    // const [queryValue, setQueryValue] = useState('');
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

      console.log(query);
      setQuery(query);
  
      if (query.length >= 2) handleFilterProducts(query);
    };

    function handleQueryClear(){
      handleQueryChange('');
    };  
    


    function handleSelectionChange(e) {
      const productId = e.target.value;
      const isChecked = e.target.checked;
      if (isChecked) {
        dispatch(checkProduct(productId));
      } else {
        dispatch(uncheckProduct(productId));
      }
    }

      
    const {mode, setMode} = useSetIndexFiltersMode();
    const onHandleCancel = () => {
     

    };
  
  
    const resourceName = {
      singular: 'order',
      plural: 'orders',
    };
  
    // const {selectedResources, allResourcesSelected, handleSelectionChange} =
    //   useIndexResourceState(orders);


    const itemsPerPage = 10; // Number of items per page      
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedList = query || selected ? filteredSegments.slice(start, end) :  productList.slice(start, end) ;

    const productsData = query || selected ? filteredSegments : productList;
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
  
    const rowMarkup = paginatedList.map(
      (
        item,
        index,
      ) => (
        <IndexTable.Row
          id={item.id}
          key={item.id}
          selected={product.products.includes(item.id) || newProducts.includes(item.id)}
          position={index}
          disabled={product.products.includes(item.id)}
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
          itemCount={productsData.length}
        //   selectedItemsCount={
        //     productList.length ? 'All' : product.products.length
        //   }
          onSelectionChange={handleSelectionChange}
          headings={[
          {title: 'productname'},
          {title: 'Product Code'},
          {title: 'Barcode'},
          {title: 'Product Cost'},
          {title: 'Status'},
          ]}
          pagination={{
            hasNext: productsData.length > end,
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