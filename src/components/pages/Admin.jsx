import { useNavigate } from "react-router-dom";

const Admin = () => {

const navigate = useNavigate();

const goUserAdmin =()=>{
    navigate('/AdminGestionUsuario')
}
    
const goAdminPublicaciones =()=>{
    navigate('/AdminTodasPublicacion')
}
return (
    <>
        <div className="m-3" style={{ width:"1920px", textAlign:'center'}}>
            <button className="btn btn-primary mb-2" style={{height:'60px', width:'400px'}} onClick={goUserAdmin}>Gestion de usuarios</button>
            <br />
            <button className="btn btn-success mb-2" style={{height:'60px', width:'400px'}} onClick={goAdminPublicaciones}>Gestion de publicaciones</button>
            <br />
            <button className="btn btn-danger mb-2" style={{height:'60px', width:'400px'}}>Gestion de reportes</button>
        </div>
      
    </>


  )
}

export default Admin
