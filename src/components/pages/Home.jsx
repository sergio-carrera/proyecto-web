import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import ImageCarousel from "./CarouselFeedPictures";



export const Home = () => {
  const [listaSeguidores, setListaSeguidores] = useState([]);
  const [listaPublicaciones, setListaPublicaciones] = useState([]);

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

      for (const element of listaSeguidores) {
        const publicacionesQuery = query(
          collection(db, "Publicaciones"),
          where("idUsuario", "==", element)
        );

        const querySnapshot = await getDocs(publicacionesQuery);

        querySnapshot.forEach((doc) => {
          publicaciones.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      }

      // Sorting publicaciones by fecha in descending order
      publicaciones.sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return fechaB - fechaA; // Orden descendente
      });

      setListaPublicaciones(publicaciones);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getListFollowers(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    if (listaSeguidores.length > 0) {
      getPublicaciones();
    }
  }, [listaSeguidores]);

  return (
    <>
      <h1 style={styles.title}>Publicaciones Feed</h1>
      {listaPublicaciones.length > 0 ? (
        listaPublicaciones.map((publicacion) => (
          <div key={publicacion.id} style={styles.card}>
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
              <span>{Math.floor(Math.random() * 500) + 100} Likes</span>
              <span>{Math.floor(Math.random() * 100) + 20} Comments</span>
              <span>{Math.floor(Math.random() * 50) + 10} Shares</span>
            </div>
            <div style={styles.actions}>
              <button style={styles.button}>Me gusta</button>
              <button style={styles.button}>Comentar</button>
              <button style={styles.button}>Compartir</button>
            </div>
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
