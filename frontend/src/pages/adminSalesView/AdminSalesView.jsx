import React, {useState, useEffect} from 'react';
import './adminsalesview.css';
import axios from 'axios';
import jsPDF from 'jspdf';
import SideNavBar from '../../components/sidenavbar/sideNavBar';


export default function AdminSalesView() {
    const [salesDetails, setSalesDetails] = useState([]);
    const [final_total, setFinalTotal] = useState(0);
   
    function generatePDF() {
        const doc = new jsPDF();

        doc.setFontSize(13);
      
        // Create a header for the PDF
        doc.text("Sales Report", 20, 20);
      
        // Create a table for the sales data
        let y = 40;
            doc.text(`Order ID`, 5, 30);
            doc.text(`Order Date`, 90,30);
            doc.text(`Amount`, 170, 30);
        salesDetails.forEach((product) => {
          doc.text(`${product._id}`, 5, y);
          doc.text(`${product.timestamp}`, 90, y);
          doc.text(`${product.total}`, 170, y);
          y += 10;
        });
      
        // Add the total sales amount to the PDF
        doc.text(`Total Sales: Rs. ${final_total}`, 20, y+10);
      
        // Save the PDF
        doc.save("sales_report.pdf");
      }
      

    useEffect(()=>{
        const url = "http://localhost:8070/order/admin/";
        function getItems(){
          axios.get(url).then((res)=> {
            setSalesDetails(res.data);
            const total = res.data.reduce((acc, curr) => acc + curr.total, 0);
            setFinalTotal(total);
          }).catch((err)=> {
            alert(err);
          })
        }
        getItems();
      }, [])
      // console.log(salesDetails);
  return (
    <section className='admin_sales_view'>
      <SideNavBar/>
      <div className="admin_sales_view_content_con">
        <div className="admin_sales_view_table_con">
            <table className='admin_sales_view_table'>
                <tr>
                    <th className='sales_view_header'>Order ID</th>
                    <th className='sales_view_header'>Order Date</th>
                    <th className='sales_view_header'>Amount</th>
                </tr>
                {salesDetails.map((product)=> 
                    <tr className='table_row_style'>
                        <td style={{color:"black", fontWeight:"bold"}}>{product._id}</td>
                        <td style={{color:"black", fontWeight:"bold"}}>{product.timestamp}</td>
                        <td style={{color:"black", fontWeight:"bold"}}>{product.total}</td>
                    </tr>
                )}
                
                {/* {itemList.map((product) => <SingleMenuItem data={product}/>)} */}
            </table>
        </div>
        <div className="admin_sales_view_report_btn_con">
            <div className="salesCount_btn_con">
                <h1>Total Sales</h1>
                <div className="total_amount_con">
                    <h2>Rs. {final_total}</h2>
                </div>
                <button onClick={generatePDF} className='report_generate_btn'>Generate report</button>
            </div>
        </div>
      </div>
    </section>
  )
}






















