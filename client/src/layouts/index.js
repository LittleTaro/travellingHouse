import MenuBar from '@/components/MenuBar';
import { useLocation } from 'react-router';
import { StoreProvider } from 'think-react-store';
import * as store from '../stores';

function BasicLayout(props) {
  const location = useLocation();
  const paths = ['/', '/order', '/user'];

  return (
    <StoreProvider store={store}>
      {props.children}
      <MenuBar show={paths.includes(location.pathname)} pathName={location.pathname} />
    </StoreProvider>
   
  );
}

export default BasicLayout;
