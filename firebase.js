/* ============================================================
   NEXORA STUDIO — responsive.css
   Breakpoints: 1100px (hide right panel), 900px (stack grid),
   700px (mobile drawer nav), 400px (small phones)
   ============================================================ */

/* ── RESPONSIVE ── */
@media(max-width:1100px){.rright{display:none;}}
@media(max-width:900px){
  .dg{grid-template-columns:1fr;}
  .rp{display:none;}
  .stats{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:700px){
  :root{--sb-width:100%;}
  .sidebar{position:fixed;transform:translateX(-100%);height:100vh;z-index:30;width:240px!important;}
  .sidebar.open{transform:translateX(0);}
  .sb-overlay{display:block;}
  .btn-menu{display:flex;}
  .tb-name{display:none;}
  .rsb{position:fixed;transform:translateX(-100%);z-index:31;width:220px!important;}
  .rsb.open{transform:translateX(0);}
  .sb-overlay{z-index:30;}
  .stats{grid-template-columns:repeat(2,1fr);}
  .hero-inner{flex-direction:column;}
  .hero-inner svg{display:none;}
  .auth-card{padding:22px 18px;}
}
@media(max-width:400px){
  .stats{grid-template-columns:1fr 1fr;}
  .rtabs{padding:0 8px;}
  .rtab{padding:10px 10px;font-size:12px;}
}
