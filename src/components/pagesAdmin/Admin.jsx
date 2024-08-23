
// Estilos en línea para centrar el texto y aplicar la paleta de colores
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    color: '#333',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  title: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#fcc1d7', // Color rosa similar al de los botones
  },
  paragraph: {
    fontSize: '18px',
    marginTop: '20px',
    color: '#333',
  },
  image: {
    width: '250px',
    height: '250px',
    marginBottom: '20px',
  }
};

export const Admin = () => {
  return (
    <div style={styles.container}>
      <img 
        src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/logoredondo.jpg?alt=media&token=bc5ff39d-8022-4597-aa2a-511b58221f83" 
        alt="Logo" 
        style={styles.image} 
      />
      <h1 style={styles.title}>Panel administrador</h1>
      <p style={styles.paragraph}>Acá puedes administrar tu aplicacion</p>
    </div>
  );
};
