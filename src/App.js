import './App.css';
import React, {createContext, useContext, useReducer, useState} from "react";

const productCTX = createContext(null);
const store = {
  price : 7000,
  prodName : "SkinCare-product",
  buycount : 0,
  available : 25
}

function reducer(state, action){
switch(action.type){
  case "add-to-cart" : 
       return {...state, buycount:state.buycount+1, available:state.available-1}
  case "remove-to-cart" : 
       return {...state, buycount:state.buycount-1,
        available:state.available+1}
  case "Buynow" : 
       return {...state, buycount:0}
       case "Restore" : 
       return {...state, available: +state.available + +action.payload}
  default : return state
}
}

function App() {
  const [state, dispatch] = useReducer(reducer, store)
  // const [price, setPrice] = useState(7000);
  // const [prodName, setProdname] = useState("SkinCare-product")
  // const [buycount, setBuycount] = useState(0);
  return (
    <div className="App">
      <h1>Context with Reducer</h1>
      <productCTX.Provider
      value={{
        state,
        dispatch
      }}
      >
      <Admin/>
      <div className="product-div">
      <Products/>
      <Carts/>
      </div>
      <Billing/>
      </productCTX.Provider>
    </div>
  );
}

export default App;


function Admin() {
  const [restore, setRestore] = useState(0)
  const { dispatch }=useContext(productCTX)
  return (
    <div className="admin">
      <h2>Admin</h2>
      <input type="number" placeholder="Enter the values"
      value={restore}
      onChange={(e)=>setRestore(e.target.value)}
      />
      <button onClick={()=>dispatch({type:"Restore",payload : restore})}>Restore</button>
    </div>
  );
}

function Products() {
  const {state, dispatch} = useContext(productCTX)
  return (
    <div className="products">
      <h3>Product-Info</h3>
      <img src="https://cdn2.stylecraze.com/wp-content/uploads/2020/09/15-Best-Image-Skincare-Products-Of-2020.jpg" alt="product-img"/>
      <p>{state.prodName}</p>
      <p>{state.price}</p>
      <p>Product-Availability : {state.available}</p>
      <button onClick={()=>dispatch({type:"add-to-cart"})}>Add to cart</button>
    </div>
  );
}

function Carts() {
  const {state, dispatch} = useContext(productCTX)
  function handleRemovebtn(){
    dispatch({type : "remove-to-cart"}) 
  }
  return (
    <div className="carts">
      <h3>Cart-Info</h3>
       <img src="https://cdn2.stylecraze.com/wp-content/uploads/2020/09/15-Best-Image-Skincare-Products-Of-2020.jpg" alt="product-img"/>
      <p>{state.prodName}</p>
      <p>No of Items : {state.buycount}</p>
      <button className="btn" onClick={()=>dispatch({type:"add-to-cart"})}>+</button>
      <button className="btn" onClick={handleRemovebtn}>-</button>
      <button onClick={()=>dispatch({type : "Buynow"})}>Buy Now</button>
    </div>
  );
}
function Billing() {
  const {state} = useContext(productCTX)
  const totalprice = state.price*state.buycount;
  return (
    <div className="billing">
      <h3>Total Cost : {totalprice}</h3>
    </div>
  );
}