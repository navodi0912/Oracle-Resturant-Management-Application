import React, {useState} from 'react'
import './singleorderadmin.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import axios from 'axios';

export default function SingleOrderAdmin(props) {
    const [orderReceived, setOrderReceived] = useState(false);
    const [deleteClicked, setDeleteClicked] = useState(false);
    const singleOrderDetails = props.data;
    const product = props.data.products;
    function handleDelete(){
        const deleteUrl = `http://localhost:8070/order/staff//delete/${props.data._id}`

        axios.delete(deleteUrl).then((res)=>{
            alert("Successfully deleted");
          }).catch((err)=> {
            console.log(err);
          })
    }
  return (
    <div style={{opacity: `${orderReceived ? 0.5 : 1}`}} className={`admin_view_orders_table_con ${deleteClicked ? 'delete_clicked' : null}`}>
        <table  className='admin_orders_view_table'>
            <tr>
                <th className='admin_orders_header'>Product</th>    
                <th className='admin_orders_header'>Quantity</th>
            </tr>
            {Object.entries(product).map(([key, value]) => (
            <tr>
                <td>{key}</td>
                <td>{value}</td>
            </tr>
      ))}
        </table>
        <div className="admin_order_status_btns">
            <button onClick={()=> {setOrderReceived(!orderReceived)}}><VisibilityIcon sx={{ fontSize: 18 }}/> <p>Order Received</p> </button>
            <button className='order_dispatched_kitchen' onClick={()=> {handleDelete(); setDeleteClicked(true)}}><VerifiedUserIcon sx={{ fontSize: 18 }}/> <p>Order Dispatched</p> </button>
        </div>
    </div>
  )
}
