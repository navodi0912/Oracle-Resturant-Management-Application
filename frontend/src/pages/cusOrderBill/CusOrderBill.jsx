import React, {useContext} from 'react'
import './cusorderbill.css'
import FixedNav from '../../components/fixednavbar/FixedNav'
import FloatNav from '../../components/floatnav/FloatNav'
import MobileNavBar from '../../components/mobilenavbar/MobileNavBar'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { ItemContext } from '../../context/items-context';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function CusOrderBill() {
  const {getItemQuantityPrice, getTotalCartAmount } = useContext(ItemContext);
  const itemQuantityPrice = getItemQuantityPrice();
  const grandTotal = getTotalCartAmount();
  const {data} = useParams();
  const location = useLocation();
  const pickup = location.state.pickup;
  const navigate = useNavigate();

  function generateBill(){
    const doc = new jsPDF();
      
      doc.setFontSize(14);
        // Create a header for the PDF
        doc.text("Order Bill", 20, 20);
      
        // Create a table for the sales data
        let y = 40;
            doc.text(`Product`, 5, 30);
            doc.text(`Quantity`, 120,30);
            doc.text(`Price`, 170, 30);
          itemQuantityPrice.forEach((product) => {
          doc.text(`${product.name}`, 5, y);
          doc.text(`${product.quantity}`, 120, y);
          doc.text(`${product.price}`, 170, y);
          y += 10;
        });
      
        // Add the total sales amount to the PDF
        doc.text(`Total Price: Rs. ${grandTotal}`, 20, y+10);
      
        // Save the PDF
        doc.save("bill.pdf");
  }

  return (
    <section className='order_bill_main'>
      <FixedNav data={"Menu"}/>
      <MobileNavBar/>
      <div className="content_con">
        {itemQuantityPrice.length > 0 && 
        <div className="bill_con">
        <div className="download_bill_con">
          <button onClick={generateBill} className='download_btn_bill'>
            <p>Download Bill</p>
            <DownloadRoundedIcon sx={{ fontSize: 25 }}/>
          </button>
        </div>
        <table >
          <tr>
            <th className='bill_table_header'>Product</th>
            <th className='bill_table_header'>Quantity</th>
            <th className='bill_table_header'>Price</th>
          </tr>
          {itemQuantityPrice.map((data)=> 
            <tr>
              <td>{data.name}</td>
              <td>{data.quantity}</td>
              <td>Rs. {data.price}</td>
            </tr>
          )}
          
          <tr>
            <td></td>
            <td></td>
            <td className='total_amount'>Rs. {grandTotal}</td>
          </tr>
        </table>
      </div>}
        
        <div className={`deliver_details_con ${pickup != 'Delivery' ? 'hide' : null}`}>
          <button className='delivery_btn_bill' onClick={()=>navigate(`/cus_delivery_add`)}>Add Delivery Details</button>
        </div>
      </div>
    </section>
  )
}

