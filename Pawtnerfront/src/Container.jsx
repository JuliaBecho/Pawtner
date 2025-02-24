import gif from './assets/gifcat.gif';

export default function Title(){

const backendURl = import.meta.env.VITE_PAWTNERBACKEND
console.log(backendURl)
    
    return ( 
        
        <div>
            
            <div className="Container">
            <img src={gif} alt="GIF" className='gif' />
            
        </div></div>
        
    );
}
