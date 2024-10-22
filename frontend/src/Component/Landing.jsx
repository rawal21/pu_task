import { Link } from "react-router-dom";
import  "../App.css"

function Lannding() {
  return ( 
  <>
   
   <div class="floating-avatars ">
    <img src="https://tse3.mm.bing.net/th?id=OIP.YDyoIafIwW1tILED3HgZRQHaHa&pid=Api&P=0&h=180" class="avatar avatar1" alt="Avatar 1"/>
    <img src="https://i.pinimg.com/originals/6c/ed/56/6ced56ed5358c9937230cb972cc3dab6.png" class="avatar avatar2" alt="Avatar 2"/>
    <img src="https://i.pinimg.com/736x/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg" class="avatar avatar3" alt="Avatar 3"/>
  </div>
   
   <div class="background-container">


  <div className="container" >
 
    <h1 className="mb-5">Welcome </h1>
    <Link  to = "/signup" class="start-btn">Let's Start!</Link>
  </div>
</div>


  </> );
}

export default Lannding;