import React, {useState, useEffect} from 'react'
import './adminordersview.css'
import SingleOrderAdmin from './singleOrderAdmin/SingleOrderAdmin';
import axios from 'axios';
import SideNavBar from '../../components/sidenavbar/sideNavBar';

export default function AdminOrdersView() {
    const [orders, setOrders] = useState([]);

    useEffect(()=>{
        const url = "http://localhost:8070/order/staff/";
        function getItems(){
          axios.get(url).then((res)=> {
            setOrders(res.data);
          }).catch((err)=> {
            alert(err);
          })
        }
        getItems();
      }, [])
  return (
    <section className='admin_view_orders'>
    <SideNavBar/>
      <div className="admin_view_orders_content_con">
        <div className="middle_order_con">
            {orders.map((product) => <SingleOrderAdmin data={product}/>)}
        </div>
      </div>
    </section>
  )
}
