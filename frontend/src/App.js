import ItemsContextProvider from './context/items-context';
import AdminMenuAdd from './pages/adminMenuAdd/AdminMenuAdd';
import CusMenu from './pages/cusMenuPage/CusMenu';
import AdminMenuUpdate from './pages/adminMenuUpdate/AdminMenuUpdate';
import AdminMenuView from './pages/adminMenuView/AdminMenuView';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import CusOrderBill from './pages/cusOrderBill/CusOrderBill';
import AdminOrdersView from './pages/adminOrdersView/AdminOrdersView';
import AdminSalesView from './pages/adminSalesView/AdminSalesView';
import DeliveryList from './pages/adminDeliveryList/delivery-list';
import Home from './pages/home/Home';
import SupplierList from './pages/SupplierList/SupplierList';
import AddSupplier from './pages/adminSupplierAdd/AddSupplier';
import UpdateForm from './pages/adminSupplierUpdate/UpdateSupplier';
import SideNavBar from './components/sidenavbar/sideNavBar';
import DeliveryForm from './pages/adminDeliveryUpdate/deliveryForm';
import AddDelivery from './pages/cusDeliveryAdd/AddDelivery';
import AddFeedback from './pages/cusFeedbackAdd/AddFeedback';
import FeedbackList from './pages/cusFeedbackView/FeedackList';
import AdminList from './pages/adminFeedbackView/AdminList'; 
import FUpdateForm from './pages/cusFeedbackUpdate/UpdateForm';
import AddEmployee from './pages/adminEmployeeAdd/AddEmployee';
import EmployeeList from './pages/adminEmployeeList/EmployeeList';
import EmployeeForm from './pages/adminEmployeeUpdate/UpdateEmployee';
import AddReservation from './pages/cusReservationAdd/AddReservation';
import Event from './pages/cusEventMain/Event';
import HallMain from './pages/cusHallMain/HallMain';
import AddPackage from './pages/adminAddPackage/Addpackage';
import AllHalls from './pages/adminAllHalls/AllHalls';
import PackageMain from './pages/cusPackageMain/PackageMain';
import AllPackages from './pages/adminAllPackages/AllPackages';
import AllReservations from './pages/adminAllReservations/AllReservations';
import PendingReservation from './pages/adminPendingReservation/PendingReservation';
import ApproveDetails from './pages/adminApproveDetails/ApproveDetails';
import UpdateHall from './pages/adminUpdateHall/UpdateHall';
import UpdatePackage from './pages/adminPackageUpdate/UpdatePackage';
import UpdateReservation from './pages/adminUpdateReservation/UpdateReservation';
import AddCustomer from './pages/cusRegister/AddCustomer';
import CustomerList from './pages/adminCustomerView/CustomerList';
import UpdateCustomer from './pages/adminCustomerUpdate/UpdateCustomer';



function App() {
  return (
    <div className='app'>
    <ItemsContextProvider>
      <Router>
        <Routes>
            <Route path='/admin_menu_view' element={<AdminMenuView/>}/>
            <Route path='/admin_menu_add' element={<AdminMenuAdd/>}/>
            <Route path='/admin_menu_update' element={<AdminMenuUpdate/>}/>
            <Route path='/admin_orders_view' element={<AdminOrdersView/>}/>
            <Route path='/admin_sales_view' element={<AdminSalesView/>}/>
            <Route path='/customer_menu' element={<CusMenu/>}/>
            <Route path='/customer_order_bill' element={<CusOrderBill/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path= "/Supplier" element={<SupplierList/>} />
            <Route path= "/addSupplier" element={<AddSupplier/>} />
            <Route path= "/updateSupplier/:id" element={<UpdateForm/>} />
            <Route path='/admin_delivery_list' element={<DeliveryList/>}/>
            <Route path='/admin_delivery_update/:id' element={<DeliveryForm/>}/>
            <Route path='/cus_delivery_add' element={<AddDelivery/>}/>
            <Route path='/cus_feedback_add' element={<AddFeedback/>}/>
            <Route path='/cus_feedback_view' element={<FeedbackList/>}/>
            <Route path='/admin_feedback_view' element={<AdminList/>}/>
            <Route path='/cus_feedback_update/:id' element={<FUpdateForm/>}/>
            <Route path='/admin_employee_add' element={<AddEmployee/>}/>
            <Route path='/admin_employee_list' element={<EmployeeList/>}/>
            <Route path='/admin_employee_update/:id' element={<EmployeeForm/>}/>
            <Route path="/addreservation" exact element={<AddReservation/>}/>
            <Route path="/event" exact element={<Event/>}/>
            <Route path="/hallmain" exact element={<HallMain/>}/>
            <Route path="/addpackage" exact element={<AddPackage/>}/>
            <Route path="/allhalls" exact element={<AllHalls/>}/>
            <Route path="/packagemain" exact element={<PackageMain/>}/>
            <Route path="/allpackages" exact element={<AllPackages/>}/>
            <Route path="/allreservations" exact element={<AllReservations/>}/>
            <Route path="/pendingreservations" exact element={<PendingReservation/>}/>
            <Route path="/approveform" exact element={<ApproveDetails/>}/>
            <Route path="/updatehall" exact element={<UpdateHall/>}/>
            <Route path="/updatepackage" exact element={<UpdatePackage/>}/>
            <Route path="/updatereservation" exact element={<UpdateReservation/>}/>
            <Route path="/cus_register" exact element={<AddCustomer/>}/>
            <Route path="/admin_customer_list" exact element={<CustomerList/>}/>
            <Route path="/admin_customer_update/:id" exact element={<UpdateCustomer/>}/>

            {/* <Route path='/sidenav' element={<SideNavBar/>}/> */}
        </Routes>
      </Router>
    </ItemsContextProvider>
    </div>
  );
}

export default App;
