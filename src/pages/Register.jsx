import RegisterForm from '../components/pages-com/Register/RegisterForm';
import Footer from '../components/common/Footer';

function Register() {
  return (
    <div style={{ backgroundColor: '#FFF8F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '40px 0' }}>
        <RegisterForm />
      </div>
      <Footer />
    </div>
  )
}

export default Register;
