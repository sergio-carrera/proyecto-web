import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, query, where } from "firebase/firestore";
import ImageCarousel from "./CarouselFeedPictures";
import { onFindById } from "../../config/Api";
import Swal from "sweetalert2";
import { PublicacionModal } from "../modals/PublicacionModal";
import { useNavigate } from "react-router-dom";


export const Home = () => {
  const navigate = useNavigate();

  const handlePerfilClick = (id) => {
      navigate(`/perfil/${id}`);
  };

  const [listaSeguidores, setListaSeguidores] = useState([]);
  const [listaPublicaciones, setListaPublicaciones] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  //Para controlar el modal que permite comentar o interactuar con una publicación desde el perfil.
  const [abrirPublicacion, setAbrirPublicacion] = useState(false);
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);

  //modal para ver las personas que han dado like 
  const [likesModalOpen, setLikesModalOpen] = useState(false);
  const [likesUsuarios, setLikesUsuarios] = useState([]);

  const getListFollowers = async (uid) => {
    const querySeguidos = await getDocs(collection(db, `Usuarios/${uid}/Siguiendo`));

    const codesList = [];
    querySeguidos.forEach((doc) => {
      codesList.push(doc.data().id);
    });

    setListaSeguidores(codesList);
  };

  const getPublicaciones = async () => {
    try {
      const publicaciones = [];

      const fetchPublicacionesPromises = listaSeguidores.map(async (element) => {
        const publicacionesQuery = query(
          collection(db, "Publicaciones"),
          where("idUsuario", "==", element)
        );

        const querySnapshot = await getDocs(publicacionesQuery);

        const publicacionesPromises = querySnapshot.docs.map(async (doc) => {
          const userDetails = await onFindById('Usuarios', doc.data().idUsuario);


          // Chequear si ya le di like a una publicacin 

          const likesCollectionRef = collection(db, 'Publicaciones', doc.id, 'Likes');
          const q = query(likesCollectionRef, where('idUsuario', '==', currentUser.uid));
          const querySnapshot = await getDocs(q);

          //variable booleana que me indica si le he dado like o no 
          var heDadoLike = false;

        
          if (querySnapshot.size>0) {
            heDadoLike=true
          }else{
            heDadoLike=false
          }
          
          return {
            id: doc.id,
            nombreCompleto: userDetails.data().nombre + " " + userDetails.data().apellido,
            ...doc.data(),
            foto: userDetails.data().foto,
            likes: await obtenerCantidadLikes(doc.id),
            heDadoLike,
            cantComentarios : await obtenerCantidadComentarios(doc.id)
          
          };
        });

        const publicacionesForUser = await Promise.all(publicacionesPromises);
        publicaciones.push(...publicacionesForUser);
      });

      await Promise.all(fetchPublicacionesPromises);

      publicaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      setListaPublicaciones(publicaciones);

    } catch (error) {
      console.log('error', error);
    }
  };

  //------------------------------------------------------- Likes --------------------------------

  // Dar like
  const reaccionar= async ({target})=>{

    // agregar like
    const likeRef = collection(db, `Publicaciones/${target.dataset.id}/Likes`);
    await addDoc(likeRef, {
      idUsuario: currentUser.uid,
      fecha: new Date().toString(),
    });
    Swal.fire("haz dado like")
    actualizarCantidadLikes(target.dataset.id, true)
    // ------
    
  }

  //quitar like
  const quitarReaccionar = async ({target})=>{
    try {
      // Eliminar 
    const likeRef = collection(db, `Publicaciones/${target.dataset.id}/Likes`);
    const q = query(likeRef, where('idUsuario', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
    

      const likeDoc = querySnapshot.docs[0];
      await deleteDoc(doc(db, 'Publicaciones', target.dataset.id, 'Likes', likeDoc.id));
      actualizarCantidadLikes(target.dataset.id, false)
      Swal.fire("Like quitado correctamente.");
      
    } 

    } catch (error) {
      console.log('error al eliminar')
    }
  }

  const actualizarCantidadLikes =async  (id, estado) =>{
    // contar los likes y actualizarlos en la publicacion
    const newLikesCount = await obtenerCantidadLikes(id);
    setListaPublicaciones((prevListaPublicaciones) =>
      prevListaPublicaciones.map((publicacion) =>
        publicacion.id === id
          ? { ...publicacion, likes: newLikesCount, heDadoLike: estado }
          : publicacion
      )
    );
  }

  const actualizarCantidadComentarios = async idPublicacion =>{
    const cant = await obtenerCantidadComentarios(idPublicacion);
    setListaPublicaciones((prevListaPublicaciones) =>
      prevListaPublicaciones.map((publicacion) =>
        publicacion.id === idPublicacion
          ? { ...publicacion, cantComentarios: cant }
          : publicacion
      )
    );
  };
 
  // mostrar modal con cantidad de likes
  const mostrarLikes = async (postId) => {
    try {
      const likesRef = collection(db, `Publicaciones/${postId}/Likes`);
      const querySnapshot = await getDocs(likesRef);
      const usuarios = querySnapshot.docs.map((doc) => doc.data().idUsuario);
  
      
      const listaAux = await Promise.all(
        usuarios.map(async (element) => {
          const val = await onFindById('Usuarios', element);
          
          return {
            nombre: val.data().nombre +" "+ val.data().apellido, 
            foto: val.data().foto
          }
        })
      );
  
      setLikesUsuarios(listaAux);
      setLikesModalOpen(true);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };
  
  // Actualizar cantidad de likes 
  async function obtenerCantidadLikes(postId) {
    try {
      const likesRef = collection(db, `Publicaciones/${postId}/Likes`);
      const querySnapshot = await getDocs(query(likesRef, limit(1)));
      
      if (querySnapshot.empty) {
        return 0;
      } else {
        const totalDocsSnapshot = await getDocs(likesRef);
        return totalDocsSnapshot.size;
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
      return 0;
    }
  }

  const obtenerCantidadComentarios = async (idPublicacion) =>{
    try {
      const comentariossRef = collection(db, `Publicaciones/${idPublicacion}/Comentarios`);
      const querySnapshot = await getDocs(query(comentariossRef, limit(1)));
      
      if (querySnapshot.empty) {
        return 0;
      } else {
        const totalDocsSnapshot = await getDocs(comentariossRef);
        return totalDocsSnapshot.size;
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
      return 0;
    }
  };


  //-------------------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await getListFollowers(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (listaSeguidores.length > 0) {
      getPublicaciones();
    }
  }, [listaSeguidores]);

  return (
    <>

      {listaPublicaciones.length > 0 ? (
        listaPublicaciones.map((publicacion) => (
          <div key={publicacion.id} style={styles.card}>
            <div className="mb-3">
              <img src={publicacion.foto} style={{width:'50px', height:'50px', display:"inline",borderRadius: '50%'}}></img>
              <span 
                className="ms-2 cursor-pointer"
                onClick={() => handlePerfilClick(publicacion.idUsuario)}
              > 
                {publicacion.nombreCompleto} 
              </span>
            </div>
            <div style={styles.header}>
              <div style={styles.authorInfo}>
                <span style={styles.timeAgo}>{publicacion.fecha}</span>
              </div>
            </div>
            <div style={styles.content}>
              <p>{publicacion.caption}</p>
            </div>
            {publicacion.fileUrls && publicacion.fileUrls.length > 0 && (
              <ImageCarousel fileUrls={publicacion.fileUrls} />
            )}
            <div style={styles.reactions}>
              <span
                  onClick={() => mostrarLikes(publicacion.id)}
                  style={{ cursor: "pointer" }}
                >
                  {publicacion.likes} Me gusta
              </span>
              <span>{publicacion.cantComentarios} Comments</span>
              <span>{Math.floor(Math.random() * 50) + 10} Shares</span>
             
            </div>
            <div style={styles.actions}>
              <button onClick={publicacion.heDadoLike==true?quitarReaccionar:reaccionar} data-id={publicacion.id} style={styles.button} >
                {publicacion.heDadoLike ? "Deshacer me gusta" : "Me gusta"}
              </button>
              <button 
                style={styles.button}
                onClick={() => {
                  setPublicacionSeleccionada(publicacion)
                  setAbrirPublicacion(true)}}
              >
                Comentar
              </button>
              <button style={styles.button}>Compartir</button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay publicaciones para este usuario.</p>
      )}
      {abrirPublicacion && (
        <PublicacionModal
          onCerrar={() => setAbrirPublicacion(false)}
          publicacion={publicacionSeleccionada}
          actualizarCantidadLikes = {actualizarCantidadLikes}
          actualizarCantidadComentarios = {actualizarCantidadComentarios}
        />
      )}

      {/* Modal para mostrar likes */}
      {likesModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <div style={modalStyles.modalHeader}>
              <h2 style={{fontWeight:'bold'}}>Usuarios que dieron me gusta</h2>
          
            </div>
            <div style={modalStyles.modalBody}>
              {likesUsuarios.length > 0 ? (
                <ul>
                  {likesUsuarios.map((usuario, index) => (
                    <li key={index} className="mb-3">
                      <img src={usuario.foto} className="mr-3" style={{width:'20px', height:'20px', display:'inline'}}></img>
                      {usuario.nombre}
                    
                    <br />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay me gusta en esta publicación.</p>
              )
              
              }
              <br />
              <button onClick={() =>{ setLikesModalOpen(false);}}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

//Estilos modal de likes
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    maxHeight: "80%",
    overflowY: "auto",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  modalBody: {
    marginTop: "10px",
  },
};


// Estilos publicaciones
const styles = {
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    margin: '10px auto',
    maxWidth: '800px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  timeAgo: {
    color: '#888',
    fontSize: '12px',
  },
  content: {
    marginBottom: '10px',
  },
  carousel: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },
  carouselImage: {
    width: '100%',
    borderRadius: '8px',
    height: '600px',
  },
  arrowButton: {
    position: 'absolute',
    background: 'rgba(0,0,0,0.5)',
    color: '#fff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
  },
  reactions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    color: '#888',
    fontSize: '14px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
    marginTop: '10px',
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#1877f2',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export default Home;
