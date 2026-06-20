import LoginCard from '../components/pages-com/Login/LoginCard'
import Footer from '../components/common/Footer';

function Login() {
  return (
    <div style={{ backgroundColor: '#FFF8F6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '40px 0' }}>
        <LoginCard />
      </div>
        <Footer />
    </div>
  )
}

export default Login
