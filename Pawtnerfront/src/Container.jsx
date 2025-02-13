import cat from './assets/gato.jpg';
import dog from './assets/cao.jpg';
import rat from './assets/hamster.jpg';
import bunny from './assets/coelho.jpg';

export default function Title(){

const backendURl = import.meta.env.VITE_PAWTNERBACKEND
console.log(backendURl)
    
    return ( 
        
        <div>
            
            <div className="Container">
             <img src= {cat} alt="" />
             <img src= {dog} alt="" />
             <img src= {rat} alt="" />
             <img src= {bunny} alt="" /> 

            
        </div></div>
        
    );
}
