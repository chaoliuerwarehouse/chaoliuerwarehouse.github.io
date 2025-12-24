const products = [
  {id:1,title:'Kente Stitched Set (Men)',price:350,src:'https://images.unsplash.com/photo-1520975911170-2a9b5b4d6d7e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'},
  {id:2,title:'Kente Wrap Dress (Women)',price:280,src:'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'},
  {id:3,title:'African Print Shirt',price:120,src:'https://images.unsplash.com/photo-1545259742-0bb8c4d5f4f6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'},
  {id:4,title:'Children Kente Set',price:90,src:'https://images.unsplash.com/photo-1519741491602-1d08aa5d2f3c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'},
  {id:5,title:'Accessories (Beads & Jewelry)',price:40,src:'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'},
  {id:6,title:'Batakari (Smock)',price:220,src:'https://images.unsplash.com/photo-1520975911170-2a9b5b4d6d7e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder'}
];

const cart = [];
function currencyGHS(n){return 'GHS ' + Number(n).toFixed(2)}

function renderProducts(){
  const container = document.getElementById('products');
  const tpl = document.getElementById('product-template');
  products.forEach(p=>{
    const node = tpl.content.cloneNode(true);
    node.querySelector('.product-image').src = p.src;
    node.querySelector('.product-image').alt = p.title;
    node.querySelector('.product-title').textContent = p.title;
    node.querySelector('.product-price').textContent = currencyGHS(p.price);
    node.querySelector('.add-to-cart').addEventListener('click',()=>{
      cart.push(p);
      document.getElementById('cart-count').textContent = cart.length;
      alert(p.title + ' added to cart.');
    });
    container.appendChild(node);
  });
}

function setupLangToggle(){
  const btn = document.getElementById('lang-toggle');
  const enToTwi = {
    'Clothing for Ghana — Traditional & Modern':'Ahyere maa Ghana — Nkosuo ne Trɛdehyɛn',
    'Shop Featured':'Tɔ Nea Wɔahyɛ Mu',
    'Shop by Category':'Tɔ Nwomasom mu',
    'Featured Products':'Nea Wɔahyɛ Mu',
    'About Chaoliu ER Warehouse':'Fa Chaoliu ER Warehouse Ho Nsɛm'
  };
  let twi = false;
  btn.addEventListener('click',()=>{
    twi = !twi;
    btn.textContent = twi ? 'EN' : 'Twi';
    document.querySelectorAll('h2,h3,a.btn.cta,section#about h3').forEach(el=>{
      const txt = el.textContent.trim();
      if(twi && enToTwi[txt]) el.textContent = enToTwi[txt];
      if(!twi && Object.values(enToTwi).includes(txt)){
        const key = Object.keys(enToTwi).find(k=>enToTwi[k]===txt);
        if(key) el.textContent = key;
      }
    });
  });
}

window.addEventListener('DOMContentLoaded',()=>{
  renderProducts();
  setupLangToggle();
});
