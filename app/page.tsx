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

  const legalContents: Record<string, string> = {
    "Kullanım Şartları": "1. Bu uygulama tamamen mizah ve eğlence amaçlıdır.\n2. Yapay zekanın ürettiği hakaretler, kişiliğinize yapılmış gerçek bir saldırı değildir.\n3. RoastAI kullanımı sonucunda oluşabilecek 'ego kırılması', 'ağlama krizleri' veya 'arkadaş ortamında rezil olma' durumlarından RoastAI Inc. sorumlu tutulamaz.\n4. Uygulamayı kullanarak, profilinizin en acımasız şekilde eleştirilmesini peşinen kabul etmiş sayılırsınız.",
    "Gizlilik Politikası": "1. Verileriniz (Kullanıcı adı) sadece analiz anında kullanılır ve OpenAI sunucularına gönderilir.\n2. Hiçbir verinizi veritabanımızda saklamıyoruz.\n3. Kredi kartı bilgileriniz ödeme altyapısı tarafından korunur.",
    "Rıza Metni": "İşbu metni onaylayarak;\nRoastAI botunun profilimi incelemesine ve benimle dalga geçmesine izin veriyorum."
  };

  const laflar = [
    "Bio'na 'Gezgin' yazmışsın ama en uzak gittiğin yer BİM. O profil ne öyle?",
    "Tweetlerin o kadar sıkıcı ki telefonumun şarjı %10 arttı. Kapat o hesabı.",
    "Profil fotoğrafına baktım, yapay zeka olmama rağmen devrelerim yandı.",
    "Elon Musk bu hesabı görse Twitter'ı aldığına pişman olurdu.",
    "Takipçi sayınla takip ettiklerin arasındaki oran... Matematiğe hakaret resmen."
  ];

  const beniYak = () => {
    if (!kullaniciAdi) return;
    if (freeRights <= 0) { setPremiumAcik(true); return; }
    setLoading(true); 
    const rastgeleLaf = laflar[Math.floor(Math.random() * laflar.length)];
    setTimeout(() => {
      setSonuc(rastgeleLaf);
      setLoading(false);
      setFreeRights(prev => prev - 1);
    }, 3000);
  };

  const girisYapSimulasyon = () => {
    if(userEmail.length > 3) { setIsLoggedIn(true); setGirisAcik(false); } else { alert("Lütfen geçerli bir e-posta giriniz."); }
  };
  const satinAlSimulasyon = () => { alert("Çok Yakında! Ödeme sistemimiz hazırlanıyor."); };
  const metinAc = (baslik: string) => { setYasalModal({ acik: true, baslik: baslik, icerik: legalContents[baslik] || "İçerik yükleniyor..." }); };
  const paylas = () => {
     const text = `Yapay Zeka beni yerin dibine soktu! 💀\n\n"${sonuc}"\n\nSen de dene: roastai.com`;
     window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="page-wrapper">
      
      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        body { 
          font-family: 'Inter', sans-serif; 
          background: radial-gradient(circle at top left, #0055FF, #000000);
          background-attachment: fixed;
          color: white; 
          overflow-x: hidden; 
        }

        /* --- CİLA: SCROLLBAR ÖZELLEŞTİRME --- */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #FFD700; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #FFA500; }

        /* --- CİLA: SEÇİM RENGİ --- */
        ::selection { background: #FFD700; color: black; }

        button, input { border: none; outline: none; font-family: inherit; }

        .page-wrapper { width: 100%; position: relative; }
        .section-card { position: sticky; top: 0; min-height: 100vh; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 -10px 40px rgba(0,0,0,0.5); }
        .card-hero { background: transparent; z-index: 10; }
        .card-info { background: rgba(20, 30, 60, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-top: 1px solid rgba(255,255,255,0.1); border-radius: 60px 60px 0 0; z-index: 20; padding-bottom: 100px; }
        .card-footer { background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); border-top: 1px solid rgba(255,255,255,0.05); z-index: 30; min-height: 60vh; border-radius: 60px 60px 0 0; position: relative; }

        .nav-bar { position: absolute; top: 0; left: 0; width: 100%; padding: 30px 50px; display: flex; justify-content: space-between; align-items: center; z-index: 100; }
        .nav-right { display: flex; align-items: center; gap: 25px; }
        .nav-link { font-weight: bold; opacity: 0.8; cursor: pointer; transition: 0.3s; font-size: 1rem; border-bottom: 2px solid transparent; position: relative; z-index: 101; }
        .nav-link:hover { opacity: 1; border-color: white; }
        .premium-badge { background: linear-gradient(45deg, #FFD700, #FFA500); color: black; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: 900; box-shadow: 0 0 15px rgba(255, 215, 0, 0.5); cursor: pointer; transition: 0.3s; position: relative; z-index: 101; }
        .premium-badge:hover { transform: scale(1.1); box-shadow: 0 0 25px rgba(255, 215, 0, 0.8); }
        .login-btn { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); padding: 10px 25px; border-radius: 50px; font-weight: 800; cursor: pointer; transition: 0.3s; color: white; backdrop-filter: blur(10px); position: relative; z-index: 101; }
        .login-btn:hover { background: white; color: #0055FF; }

        .content-container { max-width: 1200px; width: 90%; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 50px; position: relative; z-index: 10; }
        .hero-title { font-size: 5rem; font-weight: 900; line-height: 0.9; letter-spacing: -3px; margin-bottom: 20px; text-transform: uppercase; }
        @media (max-width: 768px) { .hero-title { font-size: 3rem; } }

        @keyframes ucus { 0% { transform: translate(0,0) rotate(-45deg); } 50% { transform: translate(10px,-20px) rotate(-40deg); } 100% { transform: translate(0,0) rotate(-45deg); } }
        @keyframes shake { 0% { transform: translate(1px, 1px) rotate(0deg); } 25% { transform: translate(-2px, -2px) rotate(-1deg); } 50% { transform: translate(2px, 1px) rotate(1deg); } 75% { transform: translate(-1px, 2px) rotate(0deg); } 100% { transform: translate(1px, -2px) rotate(-1deg); } }
        .roket { font-size: 200px; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4)); display: block; }
        .roket-idle { animation: ucus 3s ease-in-out infinite; }
        .roket-shaking { animation: shake 0.4s infinite; filter: drop-shadow(0 0 60px rgba(255, 69, 0, 0.8)); }

        .btn-premium { background: #FFD700; color: black; font-weight: 900; font-size: 1.2rem; padding: 20px; width: 100%; border-radius: 16px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0px 6px 0px 0px #b8860b, 0px 15px 20px rgba(0,0,0,0.2); transition: all 0.1s; cursor: pointer; position: relative; z-index: 50; }
        .btn-premium:active { transform: translateY(6px); box-shadow: 0px 0px 0px 0px #b8860b; }
        .btn-premium:disabled { background: #888; color: #ccc; box-shadow: none; transform: translateY(6px); cursor: not-allowed; }
        .input-box { background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.2); color: white; padding: 20px; width: 100%; border-radius: 16px; font-size: 1.2rem; font-weight: bold; margin-bottom: 20px; position: relative; z-index: 50; }
        .input-box:focus { background: rgba(255,255,255,0.25); border-color: white; }

        .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.8); z-index: 200; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); }
        .glass-modal { background: rgba(10, 10, 15, 0.9); border: 1px solid rgba(255, 255, 255, 0.15); padding: 40px; border-radius: 30px; max-width: 600px; width: 90%; text-align: center; position: relative; color: white; box-shadow: 0 50px 100px rgba(0,0,0,0.9); }

        .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; align-items: stretch; }
        @media (max-width: 768px) { .pricing-grid { grid-template-columns: 1fr; } }
        .price-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 20px 15px; border-radius: 20px; transition: 0.3s; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; }
        .price-card:hover { background: rgba(255,215,0,0.1); border-color: #FFD700; transform: scale(1.03); }
        .price-header { margin-bottom: 10px; }
        .price-title { font-size: 0.9rem; color: #aaa; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
        .price-amount { font-size: 2rem; font-weight: 900; color: white; margin: 5px 0; }
        .price-amount.large { font-size: 2.5rem; color: #FFD700; }
        .price-desc { font-size: 0.8rem; color: #ccc; margin-bottom: 15px; }
        .special-badge { position: absolute; top: 0; right: 0; background: #FF0000; color: white; font-size: 0.6rem; font-weight: bold; padding: 4px 8px; border-bottom-left-radius: 10px; }
        .strike-price { text-decoration: line-through; color: #888; font-size: 1rem; margin-right: 8px; }
        .buy-btn { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.3); color: white; padding: 10px; border-radius: 50px; font-weight: bold; cursor: pointer; transition: 0.3s; width: 100%; font-size: 0.9rem; }
        .buy-btn.gold { background: #FFD700; color: black; border: none; }
        .buy-btn:hover { background: white; color: black; }
        .buy-btn.gold:hover { background: #FFA500; }

        .x-card { background: #000; border: 1px solid #333; padding: 20px; border-radius: 16px; max-width: 600px; width: 90%; text-align: left; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .x-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
        .x-user { display: flex; gap: 10px; }
        .x-avatar { width: 48px; height: 48px; background: #FFD700; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; color: black; }
        .x-names { display: flex; flex-direction: column; }
        .x-name { font-weight: 700; color: white; display: flex; align-items: center; gap: 4px; }
        .x-handle { color: #71767b; font-size: 15px; }
        .x-logo { width: 20px; height: 20px; color: white; font-weight: bold; font-size: 18px; }
        .x-content { font-size: 17px; line-height: 24px; color: white; margin-bottom: 15px; white-space: pre-wrap; }
        .x-metrics { display: flex; justify-content: space-between; color: #71767b; font-size: 13px; margin-top: 15px; border-top: 1px solid #333; padding-top: 15px; }
        .x-metric { display: flex; align-items: center; gap: 5px; cursor: pointer; transition: 0.2s; }
        .x-metric:hover { color: #1d9bf0; }

        .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; width: 100%; max-width: 1200px; }
        .info-card { background: rgba(255,255,255,0.03); padding: 30px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); transition: 0.3s; }
        .info-card:hover { background: rgba(255,255,255,0.08); transform: translateY(-5px); }
        .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 40px; width: 100%; max-width: 1200px; }
        .footer-col h4 { color: #FFD700; margin-bottom: 20px; font-size: 1.3rem; }
        .footer-col a { display: block; color: #aaa; margin-bottom: 10px; cursor: pointer; transition: 0.3s; text-decoration: none; }
        .footer-col a:hover { color: white; padding-left: 5px; text-shadow: 0 0 10px rgba(255,255,255,0.5); }
      `}</style>
      
      {/* 1. HERO KARTI */}
      <section className="section-card card-hero">
        <div className="nav-bar">
          <h2 style={{fontSize: '1.8rem', fontWeight: '900'}}>RoastAI 🔥</h2>
          <div className="nav-right">
            <span className="premium-badge" onClick={() => setPremiumAcik(true)}>Premium 👑</span>
            <span className="nav-link" onClick={() => setNasilCalisirAcik(true)}>Nasıl Çalışır?</span>
            {isLoggedIn ? (
               <div style={{width:'40px', height:'40px', background:'#FFD700', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', color:'black', fontWeight:'bold'}} title={userEmail}>
                 {userEmail.charAt(0).toUpperCase()}
               </div>
            ) : (
               <button className="login-btn" onClick={() => setGirisAcik(true)}>Giriş Yap</button>
            )}
          </div>
        </div>

        <div className="content-container">
          <div style={{flex: 1, minWidth: '300px'}}>
            <h1 className="hero-title">EGONU <br /> YERLE BİR <br /> EDELİM.</h1>
            <p style={{fontSize: '1.4rem', color: '#bfdbfe', fontWeight: '500', marginBottom: '40px', maxWidth: '500px'}}>
              Yapay zeka profilini incelesin ve duymaktan korktuğun gerçekleri yüzüne vursun.
            </p>
            <div style={{maxWidth: '450px'}}>
              <div onClick={() => setOnay(!onay)} style={{display:'flex', alignItems:'center', gap:'15px', marginBottom:'20px', cursor:'pointer', userSelect:'none'}}>
                <div style={{width:'24px', height:'24px', border:'2px solid rgba(255,255,255,0.5)', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center', background: onay ? '#FFD700' : 'transparent', borderColor: onay ? '#FFD700' : 'rgba(255,255,255,0.5)', color:'black', fontWeight:'bold'}}>{onay && "✓"}</div>
                <span style={{fontSize: '0.9rem', fontWeight: 'bold'}}>Mizahi amaçla eleştirilmeyi kabul ediyorum.</span>
              </div>
              <input className="input-box" type="text" placeholder="@kullaniciadi" onChange={(e) => setKullaniciAdi(e.target.value)} />
              <button className="btn-premium" disabled={!onay || loading} onClick={beniYak}>
                {loading ? "ANALİZ EDİLİYOR..." : (onay ? "🔥 BENİ YAK!" : "ÖNCE ONAY VER ☝️")}
              </button>
            </div>
          </div>
          <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', position: 'relative'}}>
             <div style={{position: 'absolute', width: '400px', height: '400px', background: sonuc ? 'red' : '#60a5fa', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.4}}></div>
             <div style={{zIndex: 10, transition: 'all 0.5s'}}>
               {sonuc ? <span style={{fontSize: '200px', display: 'block'}}>🔥</span> : <span className={`roket ${loading ? 'roket-shaking' : 'roket-idle'}`}>🚀</span>}
             </div>
          </div>
        </div>
        <div style={{position:'absolute', bottom:'30px', opacity:0.7, animation:'bounce 2s infinite', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center'}}>
           <span style={{fontSize:'2rem', lineHeight:'1'}}>↓</span>
        </div>
      </section>

      {/* 2. NEDEN BİZ */}
      <section className="section-card card-info">
         <div className="content-container" style={{flexDirection:'column'}}>
            <h2 style={{fontSize:'3.5rem', fontWeight:'900', marginBottom:'50px'}}>NEDEN <span style={{color:'#FFD700'}}>ROAST?</span></h2>
            <div className="info-grid">
               <div className="info-card">
                  <h3 style={{fontSize:'2.5rem', color:'#FFD700', marginBottom:'10px'}}>%100</h3>
                  <p>Acımasız Doğruluk. Duygularını kapıda bırak.</p>
               </div>
               <div className="info-card">
                  <h3 style={{fontSize:'2.5rem', color:'#FFD700', marginBottom:'10px'}}>+50K</h3>
                  <p>Ağlayan Kullanıcı. Egosu kırılanlar kulübü.</p>
               </div>
               <div className="info-card">
                  <h3 style={{fontSize:'2.5rem', color:'#FFD700', marginBottom:'10px'}}>GPT-4o</h3>
                  <p>OpenAI'ın en son teknolojisi ile derin analiz.</p>
               </div>
               <div className="info-card" style={{border:'1px solid rgba(255,215,0,0.3)'}}>
                  <h3 style={{fontSize:'2.5rem', color:'#FFD700', marginBottom:'10px'}}>GROK</h3>
                  <p>xAI destekli filtresiz, sansürsüz mizah motoru.</p>
               </div>
            </div>
         </div>
      </section>

      {/* 3. FOOTER */}
      <section className="section-card card-footer">
         <div className="footer-grid">
            <div className="footer-col" style={{gridColumn: 'span 2'}}>
               <h4 style={{fontSize:'2rem', color:'#fff'}}>RoastAI Inc.</h4>
               <p style={{color:'#ccc', lineHeight:'1.6', fontSize:'1.1rem', maxWidth:'400px'}}>İnternetin en karanlık mizah köşesi.</p>
               <p style={{opacity:0.5, marginTop: '30px'}}>© 2026 RoastAI.</p>
            </div>
            <div className="footer-col">
               <h4>Yasal</h4>
               <a onClick={() => metinAc("Kullanım Şartları")}>Kullanım Şartları</a>
               <a onClick={() => metinAc("Gizlilik Politikası")}>Gizlilik Politikası</a>
               <a onClick={() => metinAc("Rıza Metni")}>Rıza Metni</a>
            </div>
            <div className="footer-col">
               <h4>İletişim</h4>
               <a href="https://x.com/cagrium" target="_blank">@cagrium (Twitter)</a>
               <a href="mailto:hello@roastai.com">hello@roastai.com</a>
            </div>
         </div>
         <div style={{position:'absolute', bottom:'20px', right:'40px', opacity:0.3, fontSize:'3rem'}}>⇲</div>
      </section>

      {/* --- MODALLAR --- */}

      {/* PREMIUM */}
      {premiumAcik && (
        <div className="modal-overlay">
           <div className="glass-modal animate-bounce-in" style={{maxWidth:'900px', padding:'50px'}}> 
              <button onClick={() => setPremiumAcik(false)} style={{position:'absolute', top:'20px', right:'30px', background:'none', color:'white', fontSize:'2rem', fontWeight:'bold', cursor:'pointer'}}>✕</button>
              <h2 style={{fontSize:'2.5rem', fontWeight:'900', color:'#FFD700'}}>PREMIUM PAKETLER 👑</h2>
              <p style={{marginTop:'10px', color:'#ccc'}}>Kalan Ücretsiz Hakkınız: <strong>{freeRights}</strong></p>
              
              <div className="pricing-grid">
                 <div className="price-card">
                    <div className="price-header"><div className="price-title">BAŞLANGIÇ</div><div className="price-amount">$2.99</div></div>
                    <p className="price-desc">5 Profil Analizi</p>
                    <button className="buy-btn" onClick={satinAlSimulasyon}>SATIN AL</button>
                 </div>
                 <div className="price-card">
                    <div className="price-header"><div className="price-title">POPÜLER</div><div className="price-amount">$7.99</div></div>
                    <p className="price-desc">25 Profil Analizi</p>
                    <button className="buy-btn" onClick={satinAlSimulasyon}>SATIN AL</button>
                 </div>
                 <div className="price-card" style={{background:'rgba(255,215,0,0.15)', borderColor:'#FFD700'}}>
                    <div className="special-badge">❄️ YILBAŞI ÖZEL</div>
                    <div className="price-header"><div className="price-title" style={{color:'#FFD700'}}>SINIRSIZ</div><div className="price-row"><span className="strike-price">$14.99</span><span className="price-amount large">$9.99</span></div></div>
                    <p className="price-desc">Tek Seferlik Ödeme</p>
                    <button className="buy-btn gold" onClick={satinAlSimulasyon}>SATIN AL</button>
                 </div>
              </div>
              <p style={{fontSize:'0.8rem', marginTop:'30px', opacity:0.6}}>Ödemeler güvenli altyapı ile korunmaktadır.</p>
           </div>
        </div>
      )}

      {/* NASIL ÇALIŞIR */}
      {nasilCalisirAcik && (
        <div className="modal-overlay">
           <div className="glass-modal">
              <button onClick={() => setNasilCalisirAcik(false)} style={{position:'absolute', top:'20px', right:'30px', background:'none', color:'white', fontSize:'2rem', fontWeight:'bold', cursor:'pointer'}}>✕</button>
              <h2 style={{fontSize:'2rem', fontWeight:'900', marginBottom:'30px'}}>SİSTEM</h2>
              <div style={{textAlign:'left', display:'flex', flexDirection:'column', gap:'20px'}}>
                 <div style={{display:'flex', alignItems:'center', gap:'15px'}}><span style={{fontSize:'2rem'}}>🕵️‍♂️</span><div><h4 style={{color:'#FFD700'}}>Veri Tarama</h4><p style={{fontSize:'0.9rem', color:'#ccc'}}>Profilini saniyeler içinde tarıyoruz.</p></div></div>
                 <div style={{display:'flex', alignItems:'center', gap:'15px'}}><span style={{fontSize:'2rem'}}>🧠</span><div><h4 style={{color:'#FFD700'}}>Analiz</h4><p style={{fontSize:'0.9rem', color:'#ccc'}}>GPT-4o zayıf noktanı bulur.</p></div></div>
                 <div style={{display:'flex', alignItems:'center', gap:'15px'}}><span style={{fontSize:'2rem'}}>🔥</span><div><h4 style={{color:'#FFD700'}}>Roast</h4><p style={{fontSize:'0.9rem', color:'#ccc'}}>En acımasız gerçekleri yüzüne vururuz.</p></div></div>
              </div>
           </div>
        </div>
      )}

      {/* GİRİŞ */}
      {girisAcik && (
        <div className="modal-overlay">
           <div className="glass-modal">
              <button onClick={() => setGirisAcik(false)} style={{position:'absolute', top:'20px', right:'30px', background:'none', color:'white', fontSize:'2rem', fontWeight:'bold', cursor:'pointer'}}>✕</button>
              <h2 style={{fontSize:'2rem', fontWeight:'900', marginBottom:'10px'}}>{isLoginMode ? "Giriş Yap" : "Kayıt Ol"}</h2>
              <input style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'white', padding:'15px', width:'100%', borderRadius:'12px', marginBottom:'15px'}} type="email" placeholder="E-posta" onChange={(e) => setUserEmail(e.target.value)} />
              <input style={{background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'white', padding:'15px', width:'100%', borderRadius:'12px', marginBottom:'15px'}} type="password" placeholder="Şifre" />
              <button className="btn-premium" style={{marginTop:'10px', fontSize:'1rem'}} onClick={girisYapSimulasyon}>{isLoginMode ? "Giriş Yap ->" : "Hesap Oluştur ->"}</button>
              <p style={{marginTop:'20px', cursor:'pointer', color:'#FFD700'}} onClick={() => setIsLoginMode(!isLoginMode)}>{isLoginMode ? "Hesabın yok mu? Kayıt Ol" : "Giriş Yap"}</p>
           </div>
        </div>
      )}

      {/* YASAL METİNLER */}
      {yasalModal.acik && (
        <div className="modal-overlay">
           <div className="glass-modal">
              <button onClick={() => setYasalModal({...yasalModal, acik: false})} style={{position:'absolute', top:'20px', right:'30px', background:'none', color:'white', fontSize:'2rem', fontWeight:'bold', cursor:'pointer'}}>✕</button>
              <h2 style={{fontSize:'1.8rem', fontWeight:'900', marginBottom:'20px', color:'#FFD700'}}>{yasalModal.baslik}</h2>
              <p style={{lineHeight:'1.6', color:'#ccc', textAlign:'left', whiteSpace:'pre-wrap'}}>{yasalModal.icerik}</p>
           </div>
        </div>
      )}

      {/* SONUÇ KARTI */}
      {sonuc && (
        <div className="modal-overlay">
          <div className="x-card">
            <button onClick={() => setSonuc("")} style={{position:'absolute', top:'10px', right:'15px', background:'none', color:'#71767b', fontSize:'1.5rem', fontWeight:'bold', cursor:'pointer'}}>✕</button>
            <div className="x-header">
               <div className="x-user">
                  <div className="x-avatar">🤖</div>
                  <div className="x-names">
                     <div className="x-name">RoastAI Bot <span style={{color:'#1d9bf0', marginLeft:'4px'}}>✔</span></div>
                     <div className="x-handle">@roast_ai_bot</div>
                  </div>
               </div>
               <div className="x-logo">𝕏</div>
            </div>
            <div className="x-content">{sonuc}</div>
            <div style={{color:'#71767b', fontSize:'15px', marginBottom:'15px'}}>3:24 PM · Jan 29, 2026 · <span style={{color:'white', fontWeight:'bold'}}>1.2M</span> Views</div>
            <div className="x-metrics">
               <div className="x-metric">💬 2.1K</div>
               <div className="x-metric">↻ 15K</div>
               <div className="x-metric">♥ 85K</div>
               <div className="x-metric" onClick={paylas}>Share</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}