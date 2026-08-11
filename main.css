/* ============================================================
   NEXORA STUDIO — main.css
   Core layout, components, colors, typography.
   No animations or responsive rules here (see animations.css / responsive.css)
   ============================================================ */


/* ── RESET & VARS ── */
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
:root{
  --bg:#0B1020;--card:#111827;--primary:#00D9FF;--secondary:#4F46E5;
  --accent:#7C3AED;--text:#fff;--muted:#6b7280;--border:rgba(255,255,255,0.07);
  --danger:#ef4444;--success:#22c55e;--warn:#eab308;
  --sb-width:232px;--topbar-h:60px;
}
html,body{height:100%;overflow:hidden;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  background:var(--bg);color:var(--text);font-size:14px;line-height:1.5;}
button,input,textarea{font-family:inherit;}
input[type="text"],input[type="email"],input[type="password"]{-webkit-appearance:none;appearance:none;}
canvas#bg{position:fixed;inset:0;z-index:0;pointer-events:none;}

/* ── SCREENS ── */
.screen{position:fixed;inset:0;z-index:20;display:flex;align-items:center;justify-content:center;
  transition:opacity .5s ease,transform .5s ease;background:var(--bg);}
.screen.off{opacity:0;pointer-events:none;transform:scale(.97);}
#app{position:fixed;inset:0;z-index:10;display:flex;transition:opacity .4s;}
#app.off{opacity:0;pointer-events:none;}

/* ── TOAST ── */
#toasts{position:fixed;bottom:20px;right:20px;z-index:999;display:flex;flex-direction:column;gap:8px;max-width:300px;}
.toast{background:#1f2937;border:1px solid var(--border);border-radius:10px;padding:11px 15px;
  font-size:13px;display:flex;align-items:center;gap:8px;box-shadow:0 8px 30px rgba(0,0,0,.5);
  animation:fadeUp .3s both;word-break:break-word;}
.toast.ok{border-color:rgba(34,197,94,.3);color:#86efac;}
.toast.err{border-color:rgba(239,68,68,.3);color:#fca5a5;}
.toast.inf{border-color:rgba(0,217,255,.3);color:#67e8f9;}

/* ── LOGO BOX ── */
.logo-box{background:linear-gradient(145deg,#0d1117,#1a1f2e);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 32px rgba(0,217,255,.45),0 0 64px rgba(79,70,229,.2);}

/* ── SPLASH ── */
#splash{flex-direction:column;gap:28px;}
.splash-logo .logo-box{width:100px;height:100px;border-radius:22px;
  animation:zoomIn 1.1s cubic-bezier(.34,1.56,.64,1) both,float 3s 1.2s ease-in-out infinite;}
.splash-title{text-align:center;animation:fadeUp .8s .4s both;}
.splash-title h1{font-size:clamp(28px,6vw,40px);font-weight:800;letter-spacing:-1px;
  background:linear-gradient(90deg,#00D9FF,#fff,#7C3AED);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.splash-title p{color:var(--muted);font-size:13px;margin-top:6px;letter-spacing:.8px;}
.splash-btn{animation:fadeUp .8s .9s both;}
.btn-glow{padding:14px 52px;border-radius:14px;font-size:16px;font-weight:700;border:none;cursor:pointer;
  background:linear-gradient(90deg,#00D9FF,#4F46E5);color:#fff;
  box-shadow:0 0 30px rgba(0,217,255,.4);transition:all .2s;min-width:160px;}
.btn-glow:hover{transform:scale(1.04);box-shadow:0 0 50px rgba(0,217,255,.65);}
.btn-glow:active{transform:scale(.98);}

/* ── AUTH ── */
#auth{overflow-y:auto;padding:20px 0;}
.auth-card{width:420px;max-width:calc(100vw - 32px);background:rgba(17,24,39,.95);
  border:1px solid var(--border);border-radius:20px;padding:clamp(24px,5vw,36px);
  backdrop-filter:blur(16px);box-shadow:0 24px 80px rgba(0,0,0,.6);animation:fadeUp .55s both;}
.auth-logo{display:flex;flex-direction:column;align-items:center;gap:10px;margin-bottom:22px;}
.auth-logo .logo-box{width:54px;height:54px;border-radius:13px;}
.auth-logo h2{font-size:20px;font-weight:800;}
.auth-logo p{color:var(--muted);font-size:13px;}
.tabs{display:flex;background:rgba(255,255,255,.05);border-radius:10px;padding:4px;margin-bottom:18px;}
.tab{flex:1;padding:8px;border:none;background:transparent;color:var(--muted);font-size:13px;
  font-weight:600;cursor:pointer;border-radius:7px;transition:all .2s;}
.tab.on{background:rgba(0,217,255,.15);color:var(--primary);}
.field{position:relative;margin-bottom:11px;}
.field .ico{position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:15px;color:var(--muted);pointer-events:none;}
.field input{width:100%;padding:12px 13px 12px 36px;border-radius:10px;
  border:1px solid var(--border);background:rgba(255,255,255,.05);color:#fff;
  font-size:14px;outline:none;transition:border .2s;-webkit-appearance:none;}
.field input:focus{border-color:rgba(0,217,255,.5);box-shadow:0 0 0 3px rgba(0,217,255,.08);}
.field input::placeholder{color:var(--muted);}
.forgot{text-align:right;margin-bottom:13px;}
.forgot a{color:var(--primary);font-size:12px;cursor:pointer;text-decoration:none;}
.btn-main{width:100%;padding:13px;border-radius:12px;border:none;cursor:pointer;
  background:linear-gradient(90deg,#00D9FF,#4F46E5);color:#fff;font-size:15px;font-weight:700;
  box-shadow:0 0 18px rgba(0,217,255,.22);transition:all .2s;margin-bottom:16px;}
.btn-main:hover{box-shadow:0 0 30px rgba(0,217,255,.45);transform:translateY(-1px);}
.btn-main:active{transform:translateY(0);}
.btn-main:disabled{opacity:.6;cursor:not-allowed;transform:none;}
.sep{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.sep span{color:var(--muted);font-size:12px;white-space:nowrap;}
.sep::before,.sep::after{content:'';flex:1;height:1px;background:var(--border);}
.btn-google{width:100%;padding:11px;border-radius:10px;border:1px solid var(--border);
  background:rgba(255,255,255,.05);color:#e5e7eb;font-size:14px;font-weight:600;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:9px;transition:all .2s;margin-bottom:14px;}
.btn-google:hover{background:rgba(255,255,255,.1);}
.auth-foot{text-align:center;color:var(--muted);font-size:13px;}
.auth-foot a{color:var(--primary);cursor:pointer;font-weight:600;}
.alert{padding:10px 13px;border-radius:8px;font-size:13px;margin-bottom:11px;display:none;line-height:1.4;}
.alert.show{display:block;}
.alert.err{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);color:#fca5a5;}
.alert.ok{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);color:#86efac;}
.alert.inf{background:rgba(0,217,255,.08);border:1px solid rgba(0,217,255,.2);color:#67e8f9;}

/* ── SIDEBAR ── */
.sidebar{width:var(--sb-width);height:100vh;background:rgba(8,12,24,.99);
  border-right:1px solid var(--border);display:flex;flex-direction:column;
  flex-shrink:0;transition:width .28s ease,transform .28s ease;overflow:hidden;z-index:30;}
.sidebar.slim{width:64px;}
/* Mobile sidebar overlay */
.sb-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:29;}
.sb-brand{padding:16px 13px;display:flex;align-items:center;gap:11px;
  border-bottom:1px solid var(--border);cursor:pointer;overflow:hidden;flex-shrink:0;}
.sb-brand .logo-box{width:34px;height:34px;border-radius:9px;flex-shrink:0;}
.sb-brand-txt{overflow:hidden;white-space:nowrap;transition:opacity .2s;}
.sb-brand-txt h3{font-size:13px;font-weight:800;}
.sb-brand-txt p{font-size:10px;color:var(--muted);}
.sidebar.slim .sb-brand-txt,.sidebar.slim .nl,.sidebar.slim .nav-badge,
.sidebar.slim .sb-profile-info,.sidebar.slim .upgrade-card{display:none;}
.sb-prof{padding:13px 11px;border-bottom:1px solid var(--border);
  display:flex;align-items:center;gap:9px;overflow:hidden;flex-shrink:0;}
.av{border-radius:50%;background:linear-gradient(135deg,#00D9FF,#4F46E5);
  display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;
  position:relative;overflow:hidden;border:2px solid rgba(255,255,255,.1);}
.av img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
.dot-on{position:absolute;bottom:1px;right:1px;width:9px;height:9px;
  border-radius:50%;background:#22c55e;border:2px solid var(--bg);}
.sb-profile-info{overflow:hidden;flex:1;}
.sb-profile-info strong{display:block;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.sb-profile-info small{color:var(--muted);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;}
.svip{display:inline-block;font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;
  background:rgba(234,179,8,.15);color:#eab308;border:1px solid rgba(234,179,8,.3);margin-top:3px;}
.sb-nav{flex:1;padding:9px 7px;overflow-y:auto;overflow-x:hidden;}
.sb-nav::-webkit-scrollbar{width:3px;}
.sb-nav::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:9px;}
.ni-row{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:10px;cursor:pointer;
  margin-bottom:2px;border:1px solid transparent;transition:all .16s;overflow:hidden;white-space:nowrap;}
.ni-row:hover{background:rgba(255,255,255,.05);}
.ni-row.on{background:linear-gradient(90deg,rgba(0,217,255,.13),rgba(79,70,229,.07));border-color:rgba(0,217,255,.17);}
.ni-row .ni{font-size:18px;flex-shrink:0;}
.nl{font-size:13px;color:var(--muted);flex:1;}
.ni-row.on .nl{color:#fff;font-weight:700;}
.nav-badge{background:#00D9FF;color:#000;font-size:10px;font-weight:800;border-radius:99px;padding:1px 6px;flex-shrink:0;}
.upgrade-card{margin:10px;border-radius:12px;padding:13px;flex-shrink:0;
  background:linear-gradient(135deg,rgba(234,179,8,.1),rgba(79,70,229,.1));border:1px solid rgba(234,179,8,.2);}
.upgrade-card h4{color:#eab308;font-size:12px;margin-bottom:5px;}
.upgrade-card p{color:#9ca3af;font-size:11px;margin-bottom:9px;line-height:1.5;}
.btn-up{width:100%;padding:8px;border-radius:8px;border:none;cursor:pointer;
  background:linear-gradient(90deg,#00D9FF,#4F46E5);color:#fff;font-size:12px;font-weight:700;}

/* ── TOPBAR ── */
.topbar{height:var(--topbar-h);display:flex;align-items:center;padding:0 16px;gap:10px;
  border-bottom:1px solid var(--border);background:rgba(8,12,24,.97);
  backdrop-filter:blur(12px);flex-shrink:0;z-index:25;}
.btn-menu{display:none;width:36px;height:36px;border-radius:9px;border:1px solid var(--border);
  background:rgba(255,255,255,.04);color:#fff;cursor:pointer;font-size:18px;
  align-items:center;justify-content:center;flex-shrink:0;}
.srch{flex:1;max-width:420px;position:relative;}
.srch input{width:100%;padding:8px 11px 8px 34px;border-radius:10px;
  background:rgba(255,255,255,.06);border:1px solid var(--border);color:#fff;
  font-size:13px;outline:none;transition:border .2s;}
.srch input:focus{border-color:rgba(0,217,255,.35);}
.srch .si{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:14px;}
.tb-r{display:flex;align-items:center;gap:8px;margin-left:auto;}
.ib{width:34px;height:34px;border-radius:9px;border:none;cursor:pointer;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;font-size:17px;transition:all .2s;}
.ib.pri{background:linear-gradient(90deg,#00D9FF,#4F46E5);color:#fff;font-size:19px;
  box-shadow:0 0 10px rgba(0,217,255,.28);}
.ib.gh{background:rgba(255,255,255,.05);border:1px solid var(--border);color:#fff;}
.nb{position:relative;}
.nb .dot{position:absolute;top:-4px;right:-4px;background:#ef4444;color:#fff;font-size:9px;
  font-weight:800;border-radius:99px;width:15px;height:15px;
  display:flex;align-items:center;justify-content:center;border:2px solid var(--bg);}
.btn-out{padding:6px 12px;border-radius:8px;border:1px solid rgba(239,68,68,.28);
  background:rgba(239,68,68,.07);color:#fca5a5;font-size:12px;font-weight:700;cursor:pointer;
  transition:all .2s;white-space:nowrap;}
.btn-out:hover{background:rgba(239,68,68,.16);}
.tb-name{font-size:13px;font-weight:600;color:#e5e7eb;white-space:nowrap;overflow:hidden;
  text-overflow:ellipsis;max-width:100px;}

/* ── MAIN WRAP ── */
.main-wrap{display:flex;flex-direction:column;flex:1;overflow:hidden;min-width:0;}
.main-scroll{flex:1;overflow-y:auto;padding:20px 16px;-webkit-overflow-scrolling:touch;}
.main-scroll::-webkit-scrollbar{width:4px;}
.main-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:9px;}

/* ── STAT STRIP ── */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;}
.stat{background:var(--card);border:1px solid var(--border);border-radius:13px;
  padding:13px 14px;display:flex;align-items:center;gap:10px;}
.stat-ic{width:38px;height:38px;border-radius:9px;display:flex;align-items:center;
  justify-content:center;font-size:17px;flex-shrink:0;}
.stat-v{font-size:19px;font-weight:800;}
.stat-l{font-size:11px;color:var(--muted);}

/* ── CARDS ── */
.card{background:var(--card);border:1px solid var(--border);border-radius:14px;}
.glass{background:rgba(17,24,39,.85);border:1px solid var(--border);
  border-radius:14px;backdrop-filter:blur(10px);}
.row-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
.row-hd h3{font-size:14px;font-weight:700;}
.lnk{font-size:12px;color:var(--primary);cursor:pointer;background:none;border:none;
  padding:0;font-weight:600;}
.lnk:hover{text-decoration:underline;}

/* ── HERO CARD ── */
.hero{position:relative;overflow:hidden;margin-bottom:18px;border-radius:14px;border:1px solid var(--border);}
.hero-inner{background:linear-gradient(135deg,#0a0d18,#0a1628,#160a24);
  padding:clamp(20px,4vw,28px);display:flex;align-items:center;gap:20px;min-height:140px;}
.hero-txt h2{font-size:clamp(16px,2.5vw,20px);font-weight:800;margin-bottom:6px;}
.hero-txt p{color:#9ca3af;font-size:12px;margin-bottom:14px;line-height:1.5;}
.btn-act{padding:10px 20px;border-radius:10px;border:none;cursor:pointer;
  background:linear-gradient(90deg,#00D9FF,#4F46E5);color:#fff;font-size:13px;font-weight:700;
  box-shadow:0 0 14px rgba(0,217,255,.26);transition:all .2s;}
.btn-act:hover{transform:translateY(-1px);box-shadow:0 0 24px rgba(0,217,255,.45);}
.btn-act:active{transform:translateY(0);}

/* ── ROOM ROW ── */
.room-rows{display:flex;flex-direction:column;gap:7px;margin-bottom:18px;}
.room-row{background:var(--card);border:1px solid var(--border);border-radius:11px;
  padding:12px 14px;display:flex;align-items:center;gap:11px;cursor:pointer;transition:all .2s;}
.room-row:hover,.room-row:active{border-color:rgba(0,217,255,.25);transform:translateX(2px);}
.room-ico{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;
  justify-content:center;font-size:19px;flex-shrink:0;}
.room-info{flex:1;min-width:0;}
.room-info strong{font-size:13px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.room-info small{font-size:11px;color:var(--muted);}
.bp{font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;
  background:rgba(124,58,237,.15);color:#a78bfa;border:1px solid rgba(124,58,237,.2);white-space:nowrap;}
.on-c{font-size:11px;color:#22c55e;font-weight:600;white-space:nowrap;}
.room-empty{text-align:center;padding:28px 20px;color:var(--muted);font-size:13px;}

/* ── DASH GRID ── */
.dg{display:grid;grid-template-columns:1fr 270px;gap:18px;}
.rp{display:flex;flex-direction:column;gap:12px;}
.panel{background:var(--card);border:1px solid var(--border);border-radius:13px;padding:14px;}

/* ── NOTIF ITEM ── */
.ni-item{display:flex;gap:9px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04);}
.ni-item:last-child{border-bottom:none;}
.ni-ico{width:32px;height:32px;border-radius:8px;background:rgba(79,70,229,.14);
  display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
.ni-txt{flex:1;font-size:12px;color:#d1d5db;line-height:1.5;}
.ni-txt strong{color:#fff;}
.ni-t{font-size:11px;color:var(--muted);}
.ni-dot{width:7px;height:7px;border-radius:50%;background:#00D9FF;flex-shrink:0;margin-top:3px;}

/* ── MSG ITEM ── */
.mi{display:flex;align-items:center;gap:9px;padding:8px 0;
  border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;}
.mi:last-child{border-bottom:none;}
.mi:hover{opacity:.8;}
.mi-info{flex:1;min-width:0;}
.mi-info strong{font-size:12px;display:block;}
.mi-info small{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block;}
.mi-meta{display:flex;flex-direction:column;align-items:flex-end;gap:3px;}
.mi-t{font-size:11px;color:var(--muted);}
.mi-u{background:#00D9FF;color:#000;font-size:10px;font-weight:800;border-radius:99px;padding:1px 6px;}

/* ── FEED ── */
.feed{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:13px;margin-bottom:9px;}
.feed-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
.feed-user{display:flex;gap:8px;align-items:center;}
.feed-user strong{font-size:13px;display:block;}
.feed-user small{color:var(--muted);font-size:11px;}
.feed-txt{font-size:13px;color:#d1d5db;line-height:1.6;margin-bottom:9px;}
.feed-acts{display:flex;gap:14px;}
.feed-acts button{background:none;border:none;cursor:pointer;color:var(--muted);
  font-size:12px;font-weight:600;display:flex;align-items:center;gap:4px;
  transition:color .15s;padding:4px 0;}
.feed-acts button:hover{color:var(--primary);}

/* ── MODAL ── */
.ovl{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:100;
  display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);
  padding:16px;-webkit-overflow-scrolling:touch;overflow-y:auto;}
.ovl.off{display:none;}
.modal{background:#111827;border:1px solid var(--border);border-radius:18px;
  padding:clamp(20px,5vw,28px);width:100%;max-width:420px;
  box-shadow:0 24px 80px rgba(0,0,0,.7);animation:fadeUp .28s both;}
.modal h2{font-size:17px;font-weight:800;margin-bottom:5px;}
.modal>p{color:var(--muted);font-size:13px;margin-bottom:17px;}
.m-acts{display:flex;gap:9px;margin-top:17px;flex-wrap:wrap;}
.m-acts button{flex:1;min-width:100px;padding:11px;border-radius:10px;font-size:13px;font-weight:700;cursor:pointer;border:none;transition:all .15s;}
.btn-cancel{background:transparent;border:1px solid var(--border)!important;color:#9ca3af;}
.btn-cancel:hover{background:rgba(255,255,255,.05);}
.btn-ok{background:linear-gradient(90deg,#00D9FF,#4F46E5);color:#fff;}
.btn-ok:hover{box-shadow:0 0 18px rgba(0,217,255,.4);}
.btn-ok:disabled{opacity:.6;cursor:not-allowed;}
.tag-inp{width:100%;padding:10px 13px;border-radius:10px;border:1px solid var(--border);
  background:rgba(255,255,255,.05);color:#fff;font-size:14px;outline:none;
  margin-bottom:9px;-webkit-appearance:none;}
.tag-inp:focus{border-color:rgba(0,217,255,.4);}
.tag-inp::placeholder{color:var(--muted);}
.emoji-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;margin-bottom:12px;}
.eo{padding:7px;border-radius:8px;border:2px solid transparent;
  background:rgba(255,255,255,.04);font-size:19px;cursor:pointer;text-align:center;transition:all .14s;}
.eo:hover,.eo.sel{border-color:#00D9FF;background:rgba(0,217,255,.1);}
.inv-box{background:rgba(0,217,255,.06);border:1px solid rgba(0,217,255,.2);
  border-radius:10px;padding:13px;margin-bottom:11px;}
.inv-url{font-size:11px;color:#67e8f9;word-break:break-all;font-family:monospace;
  margin-bottom:8px;line-height:1.5;}
.inv-meta{font-size:11px;color:var(--muted);}
.inv-btns{display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;}
.btn-cp{padding:8px 14px;border-radius:8px;border:none;background:rgba(0,217,255,.14);
  color:#00D9FF;font-size:12px;font-weight:700;cursor:pointer;flex:1;min-width:80px;}
.btn-cp:hover{background:rgba(0,217,255,.24);}
.warn-box{background:rgba(234,179,8,.07);border:1px solid rgba(234,179,8,.2);
  border-radius:8px;padding:10px;font-size:12px;color:#eab308;line-height:1.5;}

/* ── JOIN SCREEN ── */
#join{overflow-y:auto;padding:20px 0;}
.join-card{width:400px;max-width:calc(100vw - 32px);background:#111827;
  border:1px solid var(--border);border-radius:18px;padding:clamp(24px,5vw,32px);
  box-shadow:0 24px 80px rgba(0,0,0,.7);text-align:center;animation:fadeUp .5s both;}
.join-card .logo-box{width:58px;height:58px;border-radius:14px;margin:0 auto 14px;}
.join-card h2{font-size:19px;font-weight:800;margin-bottom:5px;}
.join-card>p{color:var(--muted);font-size:13px;margin-bottom:17px;}
.join-info{background:rgba(0,217,255,.06);border:1px solid rgba(0,217,255,.14);
  border-radius:10px;padding:13px;margin-bottom:14px;text-align:left;}
.join-info strong{font-size:14px;display:block;margin-bottom:3px;}
.join-info small{font-size:12px;color:var(--muted);}
.timer{display:inline-flex;align-items:center;gap:6px;background:rgba(234,179,8,.09);
  border:1px solid rgba(234,179,8,.24);border-radius:99px;padding:4px 12px;
  font-size:12px;color:#eab308;margin-bottom:14px;}

/* ── ROOM VIEW ── */
#rv{overflow:hidden;}
.rsb{width:210px;height:100vh;background:rgba(8,12,24,.99);border-right:1px solid var(--border);
  display:flex;flex-direction:column;flex-shrink:0;overflow-y:auto;
  -webkit-overflow-scrolling:touch;transition:transform .28s ease;}
.rsb::-webkit-scrollbar{width:3px;}
.rsb::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08);border-radius:9px;}
.rsb-hd{padding:14px;}
.back-btn{display:flex;align-items:center;gap:7px;color:var(--muted);font-size:13px;
  cursor:pointer;margin-bottom:13px;transition:color .15s;background:none;border:none;padding:0;}
.back-btn:hover{color:#fff;}
.room-hero-img{width:100%;height:100px;border-radius:11px;overflow:hidden;margin-bottom:12px;
  background:linear-gradient(135deg,#0d1117,#0a1628);
  display:flex;align-items:center;justify-content:center;font-size:44px;}
.rsb-name{font-size:15px;font-weight:800;margin-bottom:3px;}
.rsb-badge{font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;
  background:rgba(0,217,255,.12);color:#00D9FF;border:1px solid rgba(0,217,255,.2);}
.rsb-desc{font-size:11px;color:var(--muted);line-height:1.5;margin:7px 0;}
.room-id-row{display:flex;align-items:center;gap:5px;margin-bottom:7px;}
.room-id-txt{font-size:10px;color:var(--muted);font-family:monospace;}
.btn-cid{background:none;border:none;cursor:pointer;color:var(--muted);font-size:13px;
  transition:color .15s;padding:2px;}
.btn-cid:hover{color:var(--primary);}
.on-info{font-size:12px;color:#22c55e;font-weight:600;margin-bottom:10px;}
.on-avs{display:flex;margin-bottom:13px;}
.on-av{width:26px;height:26px;border-radius:50%;border:2px solid var(--bg);
  display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;
  background:linear-gradient(135deg,#00D9FF,#4F46E5);color:#fff;}
.on-av:not(:first-child){margin-left:-7px;}
.rnav{padding:0 7px;}
.rni{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:10px;cursor:pointer;
  margin-bottom:2px;border:1px solid transparent;color:var(--muted);font-size:13px;transition:all .15s;}
.rni:hover{background:rgba(255,255,255,.05);color:#fff;}
.rni.on{background:rgba(0,217,255,.1);border-color:rgba(0,217,255,.18);color:#fff;font-weight:700;}
.inv-sec{padding:13px 14px;border-top:1px solid var(--border);margin-top:auto;flex-shrink:0;}
.inv-sec h4{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;
  letter-spacing:.5px;margin-bottom:3px;}
.inv-sec p{font-size:11px;color:var(--muted);margin-bottom:9px;}
.btn-inv{width:100%;padding:9px;border-radius:9px;border:none;cursor:pointer;
  background:linear-gradient(90deg,#00D9FF,#4F46E5);color:#fff;font-size:12px;font-weight:700;
  box-shadow:0 0 10px rgba(0,217,255,.22);transition:all .2s;}
.btn-inv:hover{box-shadow:0 0 20px rgba(0,217,255,.44);}

/* ── ROOM MAIN ── */
.rmain{flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;}
.rtopbar{height:var(--topbar-h);display:flex;align-items:center;padding:0 14px;gap:10px;
  border-bottom:1px solid var(--border);background:rgba(8,12,24,.97);
  backdrop-filter:blur(12px);flex-shrink:0;}
.rtabs{display:flex;border-bottom:1px solid var(--border);padding:0 14px;
  background:rgba(8,12,24,.85);flex-shrink:0;overflow-x:auto;}
.rtabs::-webkit-scrollbar{height:0;}
.rtab{padding:11px 15px;font-size:13px;font-weight:600;cursor:pointer;color:var(--muted);
  border-bottom:2px solid transparent;transition:all .18s;white-space:nowrap;
  display:flex;align-items:center;gap:5px;flex-shrink:0;}
.rtab:hover{color:#fff;}
.rtab.on{color:var(--primary);border-bottom-color:var(--primary);}
.voice-bar{padding:9px 16px;background:rgba(0,217,255,.05);
  border-bottom:1px solid rgba(0,217,255,.1);display:none;
  align-items:center;gap:10px;flex-wrap:wrap;}
.voice-bar.show{display:flex;}
.v-status{font-size:13px;color:#67e8f9;display:flex;align-items:center;gap:7px;}
.vdot{width:8px;height:8px;border-radius:50%;background:#22c55e;animation:pulse 1s infinite;}
.btn-mic{padding:6px 13px;border-radius:8px;border:none;cursor:pointer;font-size:12px;font-weight:700;}
.btn-mic.on{background:rgba(34,197,94,.14);color:#4ade80;border:1px solid rgba(34,197,94,.28);}
.btn-mic.off{background:rgba(239,68,68,.14);color:#f87171;border:1px solid rgba(239,68,68,.28);}
.btn-lv{padding:6px 13px;border-radius:8px;border:1px solid rgba(239,68,68,.28);
  background:rgba(239,68,68,.09);color:#fca5a5;font-size:12px;font-weight:700;cursor:pointer;margin-left:auto;}

/* ── CHAT ── */
.chat-area{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:3px;
  -webkit-overflow-scrolling:touch;}
.chat-area::-webkit-scrollbar{width:4px;}
.chat-area::-webkit-scrollbar-thumb{background:rgba(255,255,255,.07);border-radius:9px;}
.msg-grp{margin-bottom:14px;}
.msg-row{display:flex;gap:10px;align-items:flex-start;}
.msg-av{width:36px;height:36px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;
  justify-content:center;font-size:12px;font-weight:700;
  background:linear-gradient(135deg,#00D9FF,#4F46E5);border:2px solid rgba(255,255,255,.1);}
.msg-av.ai{background:linear-gradient(135deg,#4F46E5,#7C3AED);}
.msg-cnt{flex:1;min-width:0;}
.msg-hd{display:flex;align-items:center;gap:7px;margin-bottom:3px;flex-wrap:wrap;}
.msg-name{font-size:13px;font-weight:700;}
.msg-ts{font-size:11px;color:var(--muted);}
.tag-bot{font-size:10px;font-weight:700;padding:1px 6px;border-radius:4px;
  background:rgba(124,58,237,.24);color:#a78bfa;}
.tag-svip{font-size:10px;font-weight:700;padding:1px 6px;border-radius:4px;
  background:rgba(234,179,8,.18);color:#eab308;}
.bubble{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);
  border-radius:0 12px 12px 12px;padding:9px 13px;font-size:13px;color:#e5e7eb;
  line-height:1.65;max-width:min(640px,100%);word-break:break-word;}
.bubble.ai{background:rgba(79,70,229,.09);border-color:rgba(79,70,229,.19);}
.bubble.own{background:rgba(0,217,255,.07);border-color:rgba(0,217,255,.17);}
.sys-msg{text-align:center;color:var(--muted);font-size:12px;padding:7px;margin:3px 0;}
.chat-inp-wrap{padding:12px 14px;border-top:1px solid var(--border);background:rgba(8,12,24,.92);flex-shrink:0;}
.chat-inp-row{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);
  border:1px solid var(--border);border-radius:13px;padding:4px 7px 4px 13px;transition:border .2s;}
.chat-inp-row:focus-within{border-color:rgba(0,217,255,.32);}
.chat-inp-row input{flex:1;background:none;border:none;color:#fff;font-size:14px;outline:none;padding:7px 0;}
.chat-inp-row input::placeholder{color:var(--muted);}
.ct-btn{width:30px;height:30px;border-radius:7px;border:none;cursor:pointer;background:transparent;
  color:var(--muted);font-size:15px;display:flex;align-items:center;justify-content:center;transition:all .14s;}
.ct-btn:hover{background:rgba(255,255,255,.07);color:#fff;}
.send-btn{width:34px;height:34px;border-radius:9px;border:none;cursor:pointer;
  background:linear-gradient(90deg,#00D9FF,#4F46E5);color:#fff;font-size:17px;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 0 10px rgba(0,217,255,.28);transition:all .18s;flex-shrink:0;}
.send-btn:hover{box-shadow:0 0 20px rgba(0,217,255,.46);}
.send-btn:active{transform:scale(.94);}
/* ── ROOM RIGHT ── */
.rright{width:260px;background:rgba(8,12,24,.99);border-left:1px solid var(--border);
  display:flex;flex-direction:column;overflow-y:auto;flex-shrink:0;
  -webkit-overflow-scrolling:touch;}
.rright::-webkit-scrollbar{width:3px;}
.rright::-webkit-scrollbar-thumb{background:rgba(255,255,255,.07);border-radius:9px;}
.rrs{padding:13px;border-bottom:1px solid var(--border);}
.rrs:last-child{border-bottom:none;}
.rrs-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
.rrs-hd span{font-size:13px;font-weight:700;}
.add-btn{width:22px;height:22px;border-radius:6px;border:none;cursor:pointer;
  background:rgba(0,217,255,.11);color:#00D9FF;font-size:15px;
  display:flex;align-items:center;justify-content:center;}
.mem-row{display:flex;align-items:center;gap:9px;padding:6px 0;
  border-bottom:1px solid rgba(255,255,255,.03);}
.mem-row:last-child{border-bottom:none;}
.mem-info{flex:1;}
.mem-info strong{font-size:12px;display:block;}
.mrole{font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;}
.ro{background:rgba(234,179,8,.14);color:#eab308;}
.rm{background:rgba(0,217,255,.11);color:#00D9FF;}
.rv{color:#22c55e;font-size:11px;font-weight:600;}
.task-row{display:flex;align-items:center;gap:9px;padding:7px 0;
  border-bottom:1px solid rgba(255,255,255,.03);}
.task-row:last-child{border-bottom:none;}
.tchk{width:16px;height:16px;border-radius:4px;border:1.5px solid rgba(255,255,255,.2);
  flex-shrink:0;cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all .15s;}
.tchk.done{background:var(--primary);border-color:var(--primary);}
.ti{flex:1;}
.ti strong{font-size:12px;display:block;}
.ti small{font-size:11px;color:var(--muted);}
.tpri{font-size:10px;font-weight:700;padding:1px 6px;border-radius:4px;}
.ph{background:rgba(239,68,68,.14);color:#f87171;}
.pm{background:rgba(234,179,8,.14);color:#eab308;}
.pl{background:rgba(34,197,94,.14);color:#4ade80;}
.file-row{display:flex;align-items:center;gap:9px;padding:7px 0;
  border-bottom:1px solid rgba(255,255,255,.03);}
.file-row:last-child{border-bottom:none;}
.fic{width:30px;height:30px;border-radius:7px;display:flex;align-items:center;
  justify-content:center;font-size:15px;flex-shrink:0;}
.fi{flex:1;}
.fi strong{font-size:12px;display:block;}
.fi small{font-size:11px;color:var(--muted);}
.dl-btn{background:none;border:none;cursor:pointer;color:var(--muted);font-size:15px;transition:color .14s;}
.dl-btn:hover{color:var(--primary);}
.notes-bx{background:rgba(234,179,8,.05);border:1px solid rgba(234,179,8,.14);
  border-radius:9px;padding:11px;}
.notes-bx h5{font-size:12px;font-weight:700;color:#eab308;margin-bottom:7px;}
.notes-bx div{font-size:12px;color:#d1d5db;line-height:1.7;}
.notes-bx ul{padding-left:15px;}

/* ── PLACEHOLDER PANELS ── */
.ph-panel{display:flex;flex-direction:column;align-items:center;justify-content:center;
  flex:1;gap:13px;color:var(--muted);padding:30px;}
.ph-panel .icon{font-size:44px;}
.ph-panel h3{font-size:15px;font-weight:700;color:#fff;}
.ph-panel p{font-size:13px;text-align:center;}

