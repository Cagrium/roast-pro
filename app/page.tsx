"use client";
import { useState } from "react";

export default function Home() {
  const [onay, setOnay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sonuc, setSonuc] = useState("");
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  const [girisAcik, setGirisAcik] = useState(false);
  const [nasilCalisirAcik, setNasilCalisirAcik] = useState(false);
  const [premiumAcik, setPremiumAcik] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [freeRights, setFreeRights] = useState(3);
  const [yasalModal, setYasalModal] = useState({ acik: false, baslik: "", icerik: "" });

  const beniYak = () => {
    if (!kullaniciAdi) return;
    if (freeRights <= 0) { setPremiumAcik(true); return; }
    setLoading(true); 
    setTimeout(() => {
      setSonuc("Bio'na 'Gezgin' yazmışsın ama en uzak gittiğin yer BİM.");
      setLoading(false);
      setFreeRights(prev => prev - 1);
    }, 3000);
  };

  const girisYapSimulasyon = () => { if(userEmail.length > 3) { setIsLoggedIn(true); setGirisAcik(false); } };
  const metinAc = (baslik: string) => setYasalModal({ acik: true, baslik, icerik: "Bu bir simülasyondur." });

  return (
    <div className="main-container">
      <style jsx global>{`
        /* BU KISIM KARTLARIN ÜST ÜSTE KAYMASINI SAĞLAR */
        .section-card {
          position: sticky;
          top: 0;
          height: 100vh; /* Ekranı tam kaplamalı ki sticky çalışsın */
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 -5px 20px rgba(0,0,0,0.5);
        }

        /* 1. KART: HERO (En altta) */
        .card-hero {
          background: radial-gradient(circle at top left, #0055FF, #000000);
          z-index: 10;
        }

        /* 2. KART: INFO (Ortada - Yarı Saydam) */
        .card-info {
          background: rgba(15, 23, 42, 0.95); /* Koyu Mavi/Siyah */
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255,255,255,0.1);
          border-radius: 40px 40px 0 0;
          z-index: 20;
        }

        /* 3. KART: FOOTER (En üstte - Siyah) */
        .card-footer {
          background: #000000;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-radius: 40px 40px 0 0;
          z-index: 30;
          height: auto;
          min-height: 60vh;
          padding-top: 50px;
          justify-content: flex-start;
        }

        /* DİĞER STİLLER */
        .nav-bar { position: absolute; top: 0; left: 0; width: 100%; padding: 30px 50px; display: flex; justify-content: space-between; align-items: center; z-index: 100; }
        .nav-right { display: flex; gap: 20px; align-items: center; }
        .hero-title { font-size: 5rem; font-weight: 900; text-transform: uppercase; line-height: 0.9; margin-bottom: 20px; }
        .content-container { max-width: 1200px; width: 90%; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 50px; }
        
        .input-box { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); padding: 20px; width: 100%; border-radius: 12px; color: white; margin-bottom: 20px; font-size: 1.1rem; }
        .btn-premium { background: #FFD700; color: black; font-weight: 900; padding: 20px; width: 100%; border-radius: 12px; cursor: pointer; font-size: 1.1rem; }
        .roket { font-size: 200px; filter: drop-shadow(0 0 50px rgba(0,0,0,0.5)); }

        .info-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 40px; }
        .info-card { background: rgba(255,255,255,0.05); padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); }
        .footer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; width: 100%; max-width: 1000px; }
        
        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; text-align: center; }
          .content-container { flex-direction: column; }
          .info-grid, .footer-grid { grid-template-columns: 1fr; }
          .section-card { height: auto; min-height: 100vh; } /* Mobilde de sticky kalsın */
          .nav-bar { padding: 20px; flex-direction: column; gap: 15px; }
        }

        /* MODAL */
        .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index: 200; display:flex; align-items:center; justify-content:center; }
        .glass-modal { background: #111; padding: 40px; border-radius: 20px; border: 1px solid #333; max-width: 600px; width: 90%; text-align: center; position: relative; }
      `}</style>

      {/* 1. HERO BÖLÜMÜ */}
      <section className="section-card card-hero">
        <div className="nav-bar">
          <h2 style={{fontSize:'1.5rem', fontWeight:'900'}}>RoastAI 🔥</h2>
          <div className="nav-right">
            <button style={{background:'linear-gradient(45deg, #FFD700, #FFA500)', color:'black', padding:'5px 15px', borderRadius:'20px', fontWeight:'bold', cursor:'pointer'}} onClick={() => setPremiumAcik(true)}>Premium 👑</button>
            <span style={{cursor:'pointer', fontWeight:'bold'}} onClick={() => setNasilCalisirAcik(true)}>Nasıl?</span>
            <button style={{background:'rgba(255,255,255,0.1)', padding:'8px 20px', borderRadius:'20px', color:'white', fontWeight:'bold', cursor:'pointer'}} onClick={() => setGirisAcik(true)}>Giriş</button>
          </div>
        </div>

        <div className="content-container">
          <div style={{flex: 1, minWidth: '300px'}}>
            <h1 className="hero-title">EGONU <br/> YERLE BİR <br/> EDELİM.</h1>
            <p style={{fontSize:'1.2rem', opacity:0.8, marginBottom:'30px'}}>Yapay zeka profilini incelesin.</p>
            <div onClick={() => setOnay(!onay)} style={{display:'flex', gap:'10px', marginBottom:'20px', cursor:'pointer'}}>
              <div style={{width:'20px', height:'20px', border:'1px solid white', background: onay ? '#FFD700' : 'transparent'}}></div>
              <span>Eleştirilmeyi kabul ediyorum.</span>
            </div>
            <input className="input-box" placeholder="@kullaniciadi" onChange={(e) => setKullaniciAdi(e.target.value)} />
            <button className="btn-premium" onClick={beniYak} disabled={loading}>{loading ? "ANALİZ..." : "🔥 BENİ YAK!"}</button>
          </div>
          <div style={{flex: 1, display:'flex', justifyContent:'center'}}>
            <span className="roket">🚀</span>
          </div>
        </div>
      </section>

      {/* 2. NEDEN BİZ BÖLÜMÜ (Burada Sticky Devreye Girer) */}
      <section className="section-card card-info">
        <div className="content-container" style={{flexDirection:'column'}}>
          <h2 style={{fontSize:'3rem', fontWeight:'900'}}>NEDEN?</h2>
          <div className="info-grid">
            <div className="info-card"><h3 style={{color:'#FFD700', fontSize:'2rem'}}>%100</h3><p>Acımasız.</p></div>
            <div className="info-card"><h3 style={{color:'#FFD700', fontSize:'2rem'}}>+50K</h3><p>Kullanıcı.</p></div>
            <div className="info-card"><h3 style={{color:'#FFD700', fontSize:'2rem'}}>GPT-4o</h3><p>Zeki.</p></div>
            <div className="info-card"><h3 style={{color:'#FFD700', fontSize:'2rem'}}>GROK</h3><p>Komik.</p></div>
          </div>
        </div>
      </section>

      {/* 3. FOOTER BÖLÜMÜ */}
      <section className="section-card card-footer">
        <div className="footer-grid">
          <div><h4 style={{color:'#FFD700', marginBottom:'15px'}}>RoastAI Inc.</h4><p style={{opacity:0.5}}>© 2026</p></div>
          <div><h4 style={{marginBottom:'15px'}}>Yasal</h4><p>Kullanım Şartları</p><p>Gizlilik</p></div>
          <div><h4 style={{marginBottom:'15px'}}>İletişim</h4><p>@cagrium</p></div>
        </div>
      </section>

      {/* MODALLAR */}
      {premiumAcik && <div className="modal-overlay"><div className="glass-modal"><button onClick={() => setPremiumAcik(false)} style={{position:'absolute', top:20, right:20, background:'none', color:'white', fontSize:'1.5rem', cursor:'pointer'}}>X</button><h2>PREMIUM</h2><p>Çok Yakında...</p></div></div>}
      {nasilCalisirAcik && <div className="modal-overlay"><div className="glass-modal"><button onClick={() => setNasilCalisirAcik(false)} style={{position:'absolute', top:20, right:20, background:'none', color:'white', fontSize:'1.5rem', cursor:'pointer'}}>X</button><h2>NASIL?</h2><p>1. Veri Tara &rarr; 2. Analiz &rarr; 3. Roast</p></div></div>}
      {girisAcik && <div className="modal-overlay"><div className="glass-modal"><button onClick={() => setGirisAcik(false)} style={{position:'absolute', top:20, right:20, background:'none', color:'white', fontSize:'1.5rem', cursor:'pointer'}}>X</button><h2>GİRİŞ</h2><input className="input-box" placeholder="Email" /><button className="btn-premium">Giriş Yap</button></div></div>}
      {sonuc && <div className="modal-overlay"><div className="glass-modal"><button onClick={() => setSonuc("")} style={{position:'absolute', top:20, right:20, background:'none', color:'white', fontSize:'1.5rem', cursor:'pointer'}}>X</button><p>{sonuc}</p></div></div>}
    </div>
  );
}