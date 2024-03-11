import React, {useState, useRef} from 'react'
import './menudisplay.css'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import leafImg from '../menudisplay/assets/pngegg.png';
import MenuItems from './menuItems/MenuItems';
import CartDisplay from './cartDisplay/CartDisplay';

export default function MenuDisplay({scrollPosition}) {
  const [cartClicked, setCartClicked] = useState(false);
  const [searchActivity, setSearchActivity] = useState(false); // this turns to true when the search button is clicked for the first time, and set to false when the filter button are clicked
  const [enteredItem, setEnteredItem] = useState(null); // the entered name is added to a state
  const [searchItem, setSearchItem] = useState(null); // after that the above state is added to another state upon the click of a button
  const [filterOn, setFilterOn] = useState(false); // the state is passed form here because when the search button is clicked the filter option should be set to false
  let enteredVal = null;
  const searchBtnRef = useRef(null);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchBtnRef.current.click();
    }
  };

  return (
    <div className='menuDisplay'>
      <img className='leafimg leaf1' src={leafImg}/>
      <img className='leafimg leaf2' src={leafImg}/>
      <div className="description_con">
        <div className="topic_con">
          <h1 className='first_line'>Discover</h1>
          <h1 className='second_line'>--- OUR PRODUCTS ---</h1>
          <h1 className='mobile_line'>OUR PRODUCTS</h1>
        </div>
        <div className="desc_con">
          <p>Welcome to our culinary wonderland where we transform ordinary ingredients into extraordinary delights! 
            Indulge in a sensory journey as we take your taste buds on a tantalizing adventure with each dish on our 
            menu.From classic favorites to inventive creations, every dish is a masterpiece carefully crafted with love 
            and passion by our talented chefs. Join us for an unforgettable dining experience that will leave you craving for more.</p>
        </div>
      </div>

      <form className="search_bar">
        <input className='search_field' onChange={(e) => {setEnteredItem(e.target.value)}} onKeyPress={handleKeyPress} type="text" placeholder='Find your flavor adventures'/>
        <button className="search_btn" onClick={(e) => {e.preventDefault(); setSearchItem(enteredItem); setFilterOn(false); setSearchActivity(true)}} ref={searchBtnRef}><LocalMallIcon sx={{ fontSize: 20 }}/></button>
      </form>
      <MenuItems scrollPosition={scrollPosition} cartClicked={cartClicked} setCartClicked={setCartClicked} searchActivity ={searchActivity} setSearchActivity = {setSearchActivity} searchItem={searchItem} filterOn={filterOn} setFilterOn={setFilterOn} />
      <CartDisplay scrollPosition={scrollPosition} cartClicked={cartClicked} setCartClicked = {setCartClicked}/>
    </div>
  )
}
