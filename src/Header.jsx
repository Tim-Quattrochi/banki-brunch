import './App.css'


function Header() { 
  
return(
    <div className="bg-neutral flex justify-between h-40 flex items-center w-screen">
        
      <header className="">
        <h1 className=" text-white font-bubble text-[5rem] ">BANKI BRUNCH</h1>
      </header>
      <img id="waffle" className="w-80" src="src/assets/waffle.png"/>
    </div>
)
}
export default Header
