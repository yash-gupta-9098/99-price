
import {Outlet}  from "@remix-run/react";
import {Provider} from 'react-redux'
import {store} from '../Redux/store'
import '@shopify/polaris/build/esm/styles.css';
import { AppProvider } from "@shopify/polaris";

export default function App() {
  
  return (
    <AppProvider >
      <Provider store={store} >    
        <Outlet />    
      </Provider>
    </AppProvider>
  );
}
