import { useState, useRef, useEffect } from 'react';
import '../../../style/Register/RegisterForm.css';

const SpaceshipIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

function RegisterForm() {
  const [role, setRole] = useState('murid');
  const [photoModal, setPhotoModal] = useState({ isOpen: false, field: null, title: '' });
  const [fileNames, setFileNames] = useState({});
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleFileSelect = (field, file) => {
    if (file) {
      setFileNames(prev => ({ ...prev, [field]: file.name }));
    }
    setPhotoModal({ isOpen: false, field: null, title: '' });
  };

  const openModal = (field, title) => {
    setPhotoModal({ isOpen: true, field, title });
  };

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  useEffect(() => {
    if (isCameraOpen) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing camera: ", err);
          alert("Gagal mengakses kamera. Pastikan izin kamera telah diberikan pada browser Anda.");
          closeCamera();
        });
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOpen]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(blob => {
        if (blob) {
          const file = new File([blob], "kamera_capture.jpg", { type: "image/jpeg" });
          handleFileSelect(photoModal.field, file);
          closeCamera();
        }
      }, 'image/jpeg');
    }
  };

  const renderMuridForm = () => (
    <>
      <div className="form-group">
        <label>Nama Lengkap</label>
        <input type="text" placeholder="Masukkan nama lengkap" required />
      </div>
      <div className="form-group">
        <label>NISN</label>
        <input type="text" placeholder="Masukkan NISN" required />
      </div>
      <div className="form-group">
        <label>Kelas</label>
        <input type="text" placeholder="Masukkan kelas" required />
      </div>
      <div className="form-group">
        <label>No HP</label>
        <input type="tel" placeholder="Masukkan no HP" required />
      </div>
      <div className="form-group full-width">
        <label>Email</label>
        <input type="email" placeholder="Masukkan email" required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" placeholder="Masukkan password" required />
      </div>
      <div className="form-group">
        <label>Password Confirmation</label>
        <input type="password" placeholder="Konfirmasi password" required />
      </div>
      <div className="form-group full-width">
        <label>Foto Profil</label>
        <button type="button" className="file-modal-btn" onClick={() => openModal('murid_foto', 'Upload Foto Profil')}>
          {fileNames['murid_foto'] ? `Terpilih: ${fileNames['murid_foto']}` : 'Pilih / Ambil Foto Profil'}
        </button>
      </div>
    </>
  );

  const renderGuruForm = () => (
    <>
      <div className="form-group">
        <label>Nama</label>
        <input type="text" placeholder="Masukkan nama" required />
      </div>
      <div className="form-group">
        <label>No HP</label>
        <input type="tel" placeholder="Masukkan no HP" required />
      </div>
      <div className="form-group full-width">
        <label>Email</label>
        <input type="email" placeholder="Masukkan email" required />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" placeholder="Masukkan password" required />
      </div>
      <div className="form-group">
        <label>Password Confirmation</label>
        <input type="password" placeholder="Konfirmasi password" required />
      </div>
      <div className="form-group">
        <label>Kartu Pegawai</label>
        <button type="button" className="file-modal-btn" onClick={() => openModal('guru_kartu', 'Upload Kartu Pegawai')}>
          {fileNames['guru_kartu'] ? `Terpilih: ${fileNames['guru_kartu']}` : 'Pilih / Ambil Kartu Pegawai'}
        </button>
      </div>
      <div className="form-group">
        <label>Foto Profil (Opsional)</label>
        <button type="button" className="file-modal-btn" onClick={() => openModal('guru_foto', 'Upload Foto Profil')}>
          {fileNames['guru_foto'] ? `Terpilih: ${fileNames['guru_foto']}` : 'Pilih / Ambil Foto Profil'}
        </button>
      </div>
    </>
  );

  return (
    <div className="register-container">
      <div className="tabs-container">
        <button 
          className={`tab-btn tab-murid ${role === 'murid' ? 'active' : ''}`}
          onClick={() => setRole('murid')}
          type="button"
        >
          Murid
        </button>
        <button 
          className={`tab-btn tab-guru ${role === 'guru' ? 'active' : ''}`}
          onClick={() => setRole('guru')}
          type="button"
        >
          Guru
        </button>
      </div>
      
      <div className="register-card">
        <h2 className="register-title">HALAMAN REGISTER</h2>
        <p className="register-subtitle">Lengkapi data kamu untuk mulai pre-order di kantin !</p>
        
        <form className="register-form">
          <div className="form-grid">
            {role === 'murid' ? renderMuridForm() : renderGuruForm()}
          </div>
          
          <button type="submit" className="submit-btn">
            Daftar sekarang
            <SpaceshipIcon />
          </button>
        </form>
      </div>

      <div className="register-footer-text">
        <p>Sudah punya akun ? <a href="/login">masuk di sini</a></p>
        <a href="/" className="back-to-home">Kembali ke Beranda</a>
      </div>

      {/* Options Modal */}
      {photoModal.isOpen && !isCameraOpen && (
        <div className="photo-modal-overlay" onClick={() => setPhotoModal({ isOpen: false, field: null, title: '' })}>
          <div className="photo-modal" onClick={e => e.stopPropagation()}>
            <h3>{photoModal.title}</h3>
            <div className="photo-modal-actions">
              <button type="button" className="photo-action-btn" onClick={openCamera}>
                Buka Kamera
              </button>
              <label className="photo-action-btn">
                Ambil dari Penyimpanan / Galeri
                <input 
                  type="file" 
                  accept="image/*,application/pdf" 
                  onChange={(e) => handleFileSelect(photoModal.field, e.target.files[0])} 
                />
              </label>
            </div>
            <button type="button" className="close-modal-btn" onClick={() => setPhotoModal({ isOpen: false, field: null, title: '' })}>
              Batal
            </button>
          </div>
        </div>
      )}

      {/* Live Camera Capture Modal */}
      {isCameraOpen && (
        <div className="photo-modal-overlay">
          <div className="camera-modal">
            <video ref={videoRef} className="camera-video" autoPlay playsInline />
            <div className="camera-controls">
              <button type="button" className="cancel-capture-btn" onClick={closeCamera}>Batal</button>
              <button type="button" className="capture-btn" onClick={capturePhoto}>Potret</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
