import { ReactNotifications } from 'react-notifications-component';
import './App.scss';
import GroceryList from './Components/GroceryList/GroceryList';
import "react-notifications-component/dist/theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <>
      <ReactNotifications />
      <GroceryList />
    </>
  );
}

export default App;
