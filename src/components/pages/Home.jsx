import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { addDoc, collection, deleteDoc, doc, getDocs, limit, query, where } from "firebase/firestore";
import ImageCarousel from "./CarouselFeedPictures";
import { onFindById } from "../../config/Api";
import Swal from "sweetalert2";
import { PublicacionModal } from "../modals/PublicacionModal";

export const Home = () => {
  const [listaSeguidores, setListaSeguidores] = useState([]);
  const [listaPublicaciones, setListaPublicaciones] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  //Para controlar el modal que permite comentar o interactuar con una publicación desde el perfil.
  const [abrirPublicacion, setAbrirPublicacion] = useState(false);

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
            heDadoLike
          
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
    Swal.fire("has dado like")
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
 
  /*const darLike = async (id) => {
    
    try {

      const likeRef = collection(db, `Publicaciones/${id}/Likes`);
  
      // Query to check if the user has already liked the post
      const q = query(likeRef, where("idUsuario", "==", "AE48EuNLkOar4XoJIY2BK7RXSik2"));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // User has already liked this post, so dislike it
        const likeDocId = querySnapshot.docs[0].id;
        await deleteDoc(doc(db, `Publicaciones/${id}/Likes/${likeDocId}`));
        Swal.fire("Like removido");
  
        // Update the state to reflect the new status
        const newLikesCount = await obtenerCantidadLikes(id);
        setListaPublicaciones((prevListaPublicaciones) =>
          prevListaPublicaciones.map((publicacion) =>
            publicacion.id === id
              ? { ...publicacion, likes: newLikesCount, hasLiked: false }
              : publicacion
          )
        );
  
        return;
      } else{
        await addDoc(likeRef, {
          idUsuario: currentUser.uid,
          fecha: new Date().toString(),
        });
    
        // Fetch the updated likes count
        const newLikesCount = await obtenerCantidadLikes(id);
    
        // Update the likes count and like status in the state
        setListaPublicaciones((prevListaPublicaciones) =>
          prevListaPublicaciones.map((publicacion) =>
            publicacion.id === postId
              ? { ...publicacion, likes: newLikesCount, hasLiked: true }
              : publicacion
          )
        );
    
        Swal.fire("Haz dado like");
      }
  
      // If the user hasn't liked the post, allow them to add a like
      
    } catch (error) {
      console.error("Error al dar like a la publicación: ", error);
    }
  };
  */


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
              <span className="ms-2"> {publicacion.nombreCompleto} </span>
            </div>
            <div style={styles.header}>
              <div style={styles.authorInfo}>
                <span style={styles.timeAgo}>Usuario: {publicacion.idUsuario}</span>
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
              <span>{publicacion.likes} Likes</span>
              <span>{Math.floor(Math.random() * 100) + 20} Comments</span>
              <span>{Math.floor(Math.random() * 50) + 10} Shares</span>
             
            </div>
            <div style={styles.actions}>
              <button onClick={publicacion.heDadoLike==true?quitarReaccionar:reaccionar} data-id={publicacion.id} style={styles.button} >
                {publicacion.heDadoLike ? "Deshacer like" : "Me gusta"}
              </button>
              <button 
                style={styles.button}
                onClick={() => setAbrirPublicacion(true)}
              >
                Comentar
              </button>
              <button style={styles.button}>Compartir</button>
            </div>
            {abrirPublicacion && (
              <PublicacionModal
                onCerrar={() => setAbrirPublicacion(false)}
                publicacion={publicacion}
              />
            )}
          </div>
        ))
      ) : (
        <p>No publicaciones found for this user.</p>
      )}
    </>
  );
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
