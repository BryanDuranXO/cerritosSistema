import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/usuarios.css';
import cerritos from '../assets/logocerritos.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";  

function HabAdmin() {
  const navigate = useNavigate();
 
  const [checked, IsChecked] = useState('checked')

  return (
    <div className="contNav">
      <div className="side">
        <div className="imgag">
          <img className='logo' src={cerritos} alt="logo" />
        </div>
        <div className="subM2"></div>
        <div onClick={() => { navigate('/ReservacionAdmin') }} className="subM">Reservaciones</div>
        <div onClick={() => { navigate('/Busqueda') }} className="subM">Buscar contrato</div>
        <div onClick={() => { navigate('/Usuarios') }} className="subM">Gestionar usuarios</div>
        <div onClick={() => { navigate('/HabitacionesAdmin') }} className="subM">Gestionar habitaciones</div>
        <div onClick={() => { navigate('/Perfil') }} className="subM">Perfil</div>
      </div>

      <div className="main">
        <div className="nav">
          <div className="nv">
            <img className='userPic' src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="user" />John Doe
            <button className='butSal' onClick={() => { navigate('/Acceso') }}>Cerrar sesión</button>
          </div>
        </div>

        <div className="content">

          <div className="users2">

            <div className="add">
              <div className="textoUsers">Habitaciones</div>
              <div className="butoAdd">
                <button className="btn btn-primary" type="button" style={{fontSize: '15px',width: '100%', height: '30px', textAlign:'center', padding: '1px'}}>
                  <FontAwesomeIcon icon={faPlus} /> Agregar habitación
                </button>
              </div>
            </div>

            

            <div className="separacion"></div>
            <div className="input">
               <div className="check">
               <label style={{marginRight: '8px', marginBottom: '5px'}} htmlFor="Check">Mostrar todas las habitaciones</label>
                <input className='checkInput' type="checkbox" name="Check" id="check" checked={checked}/>
               </div>
               
                <label style={{margin: '1%', fontWeight: '500'}} htmlFor="Search">Buscar habitación</label>
                <input style={{margin: '1%', borderRadius: '2px', backgroundColor:'#D9D9D9', borderStyle: 'none', height: '55%', textAlign: 'center'}}  type="text" name="Search" id="search" />            
            </div>
            <div className="HBCont">

              <div className="HBItem">

                <div className="HBItem-sub">
                <p class="fs-3 text-center">Habitación premium</p>
                 <p class='fs-4'>Descripción:</p>
                 <p class='fs-6' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aut a veniam officiis nobis nemo ipsum accusamus perferendis debitis error, amet harum commodi laboriosam eius suscipit doloremque eaque, nam iusto!:</p>
                 <p class='fs-5 fw-medium'>Costo:</p>
                 <p class='fs-5 fw-medium'>Costo por extras:</p>
  
                </div>

                <div className="HBItem-sub2">
                    <img className='HBimg' src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Home1.jpg" alt="img" />

                    <div className="sub2Btn">
                    <button type="button" class="btn btn-danger btn-sm">Eliminar</button>
                    <button type="button" class="btn btn-warning btn-sm">Actualizar</button>
                    </div>
                </div>
              </div>

                
              <div className="HBItem">

<div className="HBItem-sub">
<p class="fs-3 text-center">Habitación premium</p>
 <p class='fs-4'>Descripción:</p>
 <p class='fs-6' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aut a veniam officiis nobis nemo ipsum accusamus perferendis debitis error, amet harum commodi laboriosam eius suscipit doloremque eaque, nam iusto!:</p>
 <p class='fs-5 fw-medium'>Costo:</p>
 <p class='fs-5 fw-medium'>Costo por extras:</p>

</div>

<div className="HBItem-sub2">
    <img className='HBimg' src="https://cerritosxochitepec.com/wp-content/uploads/2021/12/Home1.jpg" alt="img" />

    <div className="sub2Btn">
    <button type="button" class="btn btn-danger btn-sm">Eliminar</button>
    <button type="button" class="btn btn-warning btn-sm">Actualizar</button>
    </div>
</div>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabAdmin;
