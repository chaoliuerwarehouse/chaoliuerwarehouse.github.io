// site.js — small touches: floating WhatsApp button and minor UX helpers
(function(){
  const MERCHANT_WA_DISPLAY = '+233 24 000 0000'; // human readable
  const MERCHANT_WA = '233240000000'; // wa.me style - update

  // floating WhatsApp button
  const a = document.createElement('a');
  a.href = `https://wa.me/${MERCHANT_WA}`;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label','Chat on WhatsApp');
  a.style.position = 'fixed';
  a.style.right = '16px';
  a.style.bottom = '16px';
  a.style.background = '#25D366';
  a.style.color = '#fff';
  a.style.padding = '12px 14px';
  a.style.borderRadius = '999px';
  a.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
  a.style.zIndex = 9999;
  a.innerHTML = '<span style="font-size:18px;margin-right:6px">💬</span> WhatsApp';
  document.body.appendChild(a);

  // optional: prefer WhatsApp link when user clicks certain product-related elements
  document.addEventListener('click', (e)=>{
    const el = e.target.closest && e.target.closest('[data-wa]');
    if(!el) return;
    // element should include data-wa-message attribute
    const msg = encodeURIComponent(el.getAttribute('data-wa-message') || 'Hello, I have a question');
    window.open(`https://wa.me/${MERCHANT_WA}?text=${msg}`,'_blank');
    e.preventDefault();
  });
})();