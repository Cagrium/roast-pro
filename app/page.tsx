"use client";
import { useState } from "react";

export default function Home() {
  const [onay, setOnay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sonuc, setSonuc] = useState("");
  const [kullaniciAdi, setKullaniciAdi] = useState("");
  
  // MODALLAR
  const [girisAcik, setGirisAcik] = useState(false);
  const [nasilCalisirAcik, setNasilCalisirAcik] = useState(false);
  const [premiumAcik, setPremiumAcik] = useState(false);
  
  // USER INFO
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [freeRights, setFreeRights] = useState(3);
  const [yasalModal, setYasalModal] = useState({ acik: false, baslik: "", icerik: "" });

  const legalContents: Record<string, string> = {
    "Kullanım Şartları": "1. Bu uygulama tamamen mizah amaçlıdır.\n2. Alınma gücenme yok.\n3. RoastAI sorumlu değildir.",
    "Gizlilik Politikası": "1. Veri tutmuyoruz.\n2. Kredi kartını görmüyoruz.",
    "Rıza Metni": "Botun benimle dalga geçmesine izin veriyorum."
  };

  const laflar = [
    "Bio'na 'Gezgin' yazmışsın ama en uzak gittiğin yer BİM.",
    "Tweetlerin o kadar sıkıcı ki telefonumun şarjı %10 arttı.",
    "Profil fotoğrafına baktım, yapay zeka olmama rağmen devrelerim yandı.",
    "Elon Musk bu hesabı görse Twitter'ı aldığına pişman olurdu.",
    "Takipçi sayınla takip ettiklerin arasındaki oran... Matematiğe hakaret."
  ];

  const beniYak = () => {
    if (!kullaniciAdi) return;
    if (freeRights <= 0) { setPremiumAcik(true); return; }
    setLoading(true); 
    setTimeout(() => {
      setSonuc(laflar[Math.floor(Math.random() * laflar.length)]);
      setLoading(false);
      setFreeRights(prev => prev - 1);
    }, 3000);
  };

  const girisYapSimulasyon = () => {
    if(userEmail.length > 3) { setIsLoggedIn(true); setGirisAcik(false); } else { alert("Geçerli e-posta gir."); }
  };
  const satinAlSimulasyon = () => alert("Çok Yakında! Ödeme sistemimiz hazırlanıyor.");
  const metinAc = (baslik: string) => setYasalModal({ acik: true, baslik, icerik: legalContents[baslik] || "..." });
  const paylas = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(sonuc)}`, '_blank');

  return (
    <div className="page-wrapper">
      <style jsx global>{`
        /* --- GENEL AYARLAR --- */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; width: 100%; }
        body { 
          font-family: 'Inter', sans-serif; 
          background: #000; /* Arka planı tamamen siyah yaptık ki çakışma olmasın */
          background-image: radial-gradient(circle at top left, #0044cc, #000000 60%);
          background-attachment: fixed; 
          color: white; 
        }
        button, input { border: none; outline: none; font-family: inherit; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 5px; }

        .page-wrapper { width: 100%; position: relative; }
        
        /* Navbar Sabit */
        .nav-bar { 
            position: fixed; top: 0; left: 0; width: 100%; z-index: 999; 
            padding: 20px 40px; display: flex; justify-content: space-between; align-items: center;
            background: rgba(0,0,0,0.3); backdrop-filter: blur(10px);
        }
        
        /* Bileşenler */
        .premium-badge { background: linear-gradient(45deg, #FFD700, #FFA500); color: black; padding: 5px 12px; border-radius: 20px; font-weight: 900; cursor: pointer; font-size: 0.9rem; }
        .login-btn { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); padding: 8px 20px; border-radius: 50px; font-weight: 800; cursor: pointer; color: white; backdrop-filter: blur(10px); }
        .input-box { background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.2); color: white; padding: 15px; width: 100%; border-radius: 12px; font-size: 1.1rem; font-weight: bold; margin-bottom: 20px; }
        .btn-premium { background: #FFD700; color: black; font-weight: 900; font-size: 1.1rem; padding: 15px; width: 100%; border-radius: 12px; cursor: pointer; }

        /* Modal */
        .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index: 2000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); padding: 20px; }
        .glass-modal { background: #111; border: 1px solid #333; padding: 30px; border-radius: 20px; width: 100%; text-align: center; position: relative; color: white; max-height: 90vh; overflow-y: auto; }

        /* =========================================
           💻 PC GÖRÜNÜMÜ (Sticky ve Solid Background)
           ========================================= */
        @media (min-width: 769px) {
            .section-card { 
                position: sticky; top: 0; min-height: 100vh; width: 100%; 
                display: flex; flex-direction: column; align-items: center; justify-content: center; 
                box-shadow: 0 -20px 50px rgba(0,0,0,0.8); padding: 20px;
                /* ÖNEMLİ: Arka planlar artık daha koyu, çakışmayı önler */
            }
            
            /* 1. HERO: Saydam olabilir çünkü en altta */
            .card-hero { background: transparent; z-index: 10; padding-top: 80px; }
            
            /* 2. INFO: Üstüne bindiğinde alttakini kapatmalı */
            .card-info { 
                background: #0a0f1e; /* KOYU RENK - Şeffaflık yok */
                border-top: 1px solid rgba(255,255,255,0.1); 
                z-index: 20; 
                border-radius: 40px 40px 0 0;
            }
            
            /* 3. FOOTER: En üstte, kapkaranlık */
            .card-footer { 
                background: #000; 
                z-index: 30; 
                border-radius: 40px 40px 0 0; 
                border-top: 1px solid rgba(255,255,255,0.1);
            }

            .nav-right { display: flex; align-items: center; gap: 20px; }
            
            .content-container { 
                max-width: 1200px; width: 90%; margin: 0 auto; 
                display: flex; flex-direction: row; 
                align-items: center; justify-content: center; gap: 80px; 
            }
            
            .hero-title { font-size: 5rem; font-weight: 900; line-height: 0.95; margin-bottom: 30px; }
            .roket { font-size: 250px; }
            
            .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; }
            .info-grid, .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; width: 100%; max-width: 1200px; }
            
            .glass-modal { max-width: 900px; padding: 50px; }
        }

        /* =========================================
           📱 MOBİL GÖRÜNÜM (Normal Akış)
           ========================================= */
        @media (max-width: 768px) {
            .section-card { 
                position: relative; /* Sticky YOK */
                min-height: auto; 
                padding: 100px 20px 50px 20px; 
                width: 100%; display: flex; flex-direction: column;
                background: transparent !important; /* Mobilde arka plan derdi yok */
            }
            
            .card-info { background: rgba(0,0,0,0.5) !important; border-radius: 0; padding-top: 50px; }
            .card-footer { background: #000 !important; border-radius: 0; }

            .nav-bar { padding: 15px 20px; }
            .nav-right { display: none; } /* Mobilde üst menüyü sadeleştirdik */
            
            .content-container { 
                width: 100%; display: flex; flex-direction: column; 
                text-align: center; gap: 40px; 
            }
            
            .hero-title { font-size: 3rem; line-height: 1.1; }
            .roket { font-size: 120px; order: -1; margin-bottom: 20px; }
            
            .pricing-grid { display: flex; flex-direction: column; gap: 15px; margin-top: 20px; }
            .info-grid { display: flex; flex-direction: column; gap: 20px; }
            .footer-grid { display: flex; flex-direction: column; gap: 30px; text-align: center; }
            
            .glass-modal { max-width: 95%; padding: 25px; }
        }

        /* DİĞER DETAYLAR */
        .price-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; text-align: center; }
        .price-amount { font-size: 2rem; font-weight: 900; margin: 10px 0; }
        .buy-btn { background: rgba(255,255,255,0.1); width: 100%; padding: 10px; border-radius: 50px; font-weight: bold; cursor: pointer; margin-top: 10px; color: white; }
        .buy-btn.gold { background: #FFD700; color: black; }
        .info-card { background: rgba(255,255,255,0.05); padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); text-align: center; }
        .x-card { background: #000; border: 1px solid #333; padding: 20px; border-radius: 16px; max-width: 600px; width: 100%; text-align: left; position: relative; margin: 0 auto; }
        .x-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .x-user { display: flex; gap: 10px; } 
        .x-avatar { width: 40px; height: 40px; background: #FFD700; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .x-name { font-weight: bold; } .x-handle { color: #555; font-size: 0.9rem; }
        .x-metrics { display: flex; justify-content: space-between; color: #555; font-size: 0.8rem; margin-top: 15px; border-top: 1px solid #222; padding-top: 10px; }

        @keyframes shake { 0% { transform: translate(1px, 1px); } 50% { transform: translate(-1px, -2px); } 100% { transform: translate(1px, -1px); } }
        .roket-shaking { animation: shake 0.4s infinite; filter: drop-shadow(0 0 60px rgba(255, 69, 0, 0.8)); }
      `}</style>
      
      {/* 1. HERO KARTI */}
      <section className="section-card card-hero">
        <div className="nav-bar">
          <h2 style={{fontSize: '1.5rem', fontWeight: '900'}}>RoastAI 🔥</h2>
          <div className="nav-right">
            <span className="premium-badge" onClick={() => setPremiumAcik(true)}>Premium 👑</span>
            <span style={{cursor:'pointer', fontWeight:'bold', fontSize:'0.9rem'}} onClick={() => setNasilCalisirAcik(true)}>Nasıl?</span>
            {isLoggedIn ? <div style={{width:'35px', height:'35px', background:'#FFD700', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'black', fontWeight:'bold'}}>{userEmail.charAt(0).toUpperCase()}</div> : <button className="login-btn" onClick={() => setGirisAcik(true)}>Giriş</button>}
          </div>
        </div>

        <div className="content-container">
          <div style={{flex: 1, minWidth: '300px'}}>
            <h1 className="hero-title">EGONU <br /> YERLE BİR <br /> EDELİM.</h1>
            <p style={{fontSize: '1.2rem', color: '#bfdbfe', marginBottom: '30px', fontWeight:'500'}}>Yapay zeka profilini incelesin.</p>
            <div style={{maxWidth: '100%'}}>
              <div onClick={() => setOnay(!onay)} style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px', cursor:'pointer'}}><div style={{width:'20px', height:'20px', border:'2px solid rgba(255,255,255,0.5)', borderRadius:'4px', display:'flex', alignItems:'center', justifyContent:'center', background: onay ? '#FFD700' : 'transparent'}}>{onay && "✓"}</div><span style={{fontSize:'0.9rem'}}>Eleştirilmeyi kabul ediyorum.</span></div>
              <input className="input-box" type="text" placeholder="@kullaniciadi" onChange={(e) => setKullaniciAdi(e.target.value)} />
              <button className="btn-premium" disabled={!onay || loading} onClick={beniYak}>{loading ? "ANALİZ..." : "🔥 BENİ YAK!"}</button>
            </div>
          </div>
          <div style={{flex: 1, display: 'flex', justifyContent: 'center', padding:'20px'}}>
             {sonuc ? <span style={{fontSize: '150px'}}>🔥</span> : <span className={`roket ${loading ? 'roket-shaking' : ''}`}>🚀</span>}
          </div>
        </div>
      </section>

      {/* 2. INFO KARTI (ARKA PLANI KOYU, ÇAKIŞMAZ) */}
      <section className="section-card card-info">
         <div className="content-container" style={{flexDirection:'column', gap:'30px'}}>
            <h2 style={{fontSize:'2.5rem', fontWeight:'900'}}>NEDEN?</h2>
            <div className="info-grid">
               <div className="info-card"><h3 style={{color:'#FFD700', fontSize:'2rem'}}>%100</h3><p>Acımasız Doğruluk.</p></div>
               <div className="info-card"><h3 style={{color:'#FFD700', fontSize:'2rem'}}>+50K</h3><p>Ağlayan Kullanıcı.</p></div>
               <div className="info-card"><h3 style={{color:'#FFD700', fontSize:'2rem'}}>GPT-4o</h3><p>Derin Analiz.</p></div>
               <div className="info-card" style={{border:'1px solid #FFD700'}}><h3 style={{color:'#FFD700', fontSize:'2rem'}}>GROK</h3><p>Filtresiz Mizah.</p></div>
            </div>
         </div>
      </section>

      {/* 3. FOOTER */}
      <section className="section-card card-footer">
         <div className="footer-grid">
            <div><h4 style={{color:'#FFD700'}}>RoastAI Inc.</h4><p style={{opacity:0.5, fontSize:'0.9rem'}}>© 2026</p></div>
            <div><h4>Yasal</h4><p onClick={() => metinAc("Kullanım Şartları")} style={{cursor:'pointer', fontSize:'0.9rem'}}>Kullanım Şartları</p><p onClick={() => metinAc("Gizlilik Politikası")} style={{cursor:'pointer', fontSize:'0.9rem'}}>Gizlilik</p></div>
            <div><h4>İletişim</h4><a href="https://x.com/cagrium" style={{color:'white', fontSize:'0.9rem'}}>@cagrium</a></div>
         </div>
      </section>

      {/* MODALLAR */}
      {premiumAcik && (
        <div className="modal-overlay">
           <div className="glass-modal">
              <button onClick={() => setPremiumAcik(false)} style={{position:'absolute', top:'15px', right:'20px', background:'none', color:'white', fontSize:'1.5rem', cursor:'pointer'}}>✕</button>
              <h2 style={{color:'#FFD700', marginBottom:'15px', fontSize:'1.5rem'}}>PREMIUM 👑</h2>
              <div className="pricing-grid">
                 <div className="price-card"><h4>BAŞLANGIÇ</h4><div className="price-amount">$2.99</div><button className="buy-btn" onClick={satinAlSimulasyon}>SATIN AL</button></div>
                 <div className="price-card"><h4>POPÜLER</h4><div className="price-amount">$7.99</div><button className="buy-btn" onClick={satinAlSimulasyon}>SATIN AL</button></div>
                 <div className="price-card" style={{borderColor:'#FFD700'}}><h4>SINIRSIZ</h4><div className="price-amount" style={{color:'#FFD700'}}>$9.99</div><button className="buy-btn gold" onClick={satinAlSimulasyon}>SATIN AL</button></div>
              </div>
           </div>
        </div>
      )}

      {nasilCalisirAcik && <div className="modal-overlay"><div className="glass-modal"><button onClick={() => setNasilCalisirAcik(false)} style={{position:'absolute', top:'15px', right:'20px', background:'none', color:'white', fontSize:'1.5rem', cursor:'pointer'}}>✕</button><h2>SİSTEM</h2><p>1. Veri Tara &rarr; 2. Analiz Et &rarr; 3. Roastla 🔥</p></div></div>}
      
      {girisAcik && <div className="modal-overlay"><div className="glass-modal"><button onClick={() => setGirisAcik(false)} style={{position:'absolute', top:'15px', right:'20px', background:'none', color:'white', fontSize:'1.5rem', cursor:'pointer'}}>✕</button><h2>{isLoginMode ? "Giriş" : "Kayıt"}</h2><input className="input-box" placeholder="Email" onChange={(e) => setUserEmail(e.target.value)} /><button className="btn-premium" onClick={girisYapSimulasyon}>Giriş Yap</button></div></div>}
      
      {yasalModal.acik && <div className="modal-overlay"><div className="glass-modal"><button onClick={() => setYasalModal({...yasalModal, acik:false})} style={{position:'absolute', top:'15px', right:'20px', background:'none', color:'white', fontSize:'1.5rem', cursor:'pointer'}}>✕</button><h2>{yasalModal.baslik}</h2><p style={{fontSize:'0.9rem'}}>{yasalModal.icerik}</p></div></div>}

      {sonuc && <div className="modal-overlay"><div className="x-card"><button onClick={() => setSonuc("")} style={{position:'absolute', top:'10px', right:'15px', background:'none', color:'white', fontSize:'1.5rem', cursor:'pointer'}}>✕</button><p style={{fontSize:'1.1rem', marginTop:'20px'}}>{sonuc}</p><div style={{marginTop:'15px', color:'#71767b', cursor:'pointer'}} onClick={paylas}>Share on X</div></div></div>}
    </div>
  );
}