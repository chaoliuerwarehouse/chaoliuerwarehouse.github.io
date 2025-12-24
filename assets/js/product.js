// product.js — renders a single product page based on ?id=<number>
(async function(){
  function q(name){const url=new URL(window.location.href);return url.searchParams.get(name)}
  const id = Number(q('id') || '1');
  const out = document.getElementById('product');
  try{
    const res = await fetch('/assets/data/products.json');
    const products = await res.json();
    const p = products.find(x=>x.id===id);
    if(!p){ out.innerHTML = '<p>Product not found.</p>'; return }

    const imgs = (p.images && p.images.length) ? p.images : ['https://via.placeholder.com/600x400?text=No+image'];
    const imgHtml = `<img src="${imgs[0]}" alt="${p.title}" />`;
    let sizes = '';
    if(p.sizes && p.sizes.length){
      sizes = `<label for="size">Size</label><select id="size">${p.sizes.map(s=>`<option value="${s}">${s}</option>`).join('')}</select>`
    }
    out.innerHTML = `
      <div class="prod-grid">
        <div>${imgHtml}</div>
        <div class="prod-body">
          <h2>${p.title}</h2>
          <div class="product-price">GHS ${Number(p.price).toFixed(2)}</div>
          <div class="meta">SKU: ${p.sku} • Category: ${p.category} • Stock: ${p.stock}</div>
          <p>${p.description}</p>
          <div style="margin-top:0.5rem">${sizes}</div>
          <div style="margin-top:1rem">
            <a class="btn primary" href="/checkout.html?product=${p.id}&amount=${p.price}">Buy — Checkout</a>
            <a id="wa-btn" class="whatsapp-btn" href="#" style="margin-left:0.5rem">WhatsApp</a>
          </div>
          <p style="margin-top:0.5rem;color:#666;font-size:0.95rem">Tip: You can use Mobile Money (MTN/Vodafone) or Cash on Delivery for local orders.</p>
        </div>
      </div>
    `;

    // configure WhatsApp link to open chat with merchant number and prefilled message
    const MERCHANT_WA = '233240000000'; // update to your WhatsApp-enabled number (no leading 0, include country code)
    const waBtn = document.getElementById('wa-btn');
    const text = encodeURIComponent(`Hello, I'm interested in ${p.title} (SKU: ${p.sku}). Is it available?`);
    waBtn.href = `https://wa.me/${MERCHANT_WA}?text=${text}`;

  }catch(err){
    console.error(err);
    out.innerHTML = '<p>Unable to load product data.</p>';
  }
})();