const platos = [
{id:1,nombre:"Ceviche Mixto Clásico",precio:35,desc:"Pescado, camarón, pulpo, leche de tigre y camote",img:"img/ceviche.jpg"},
{id:2,nombre:"Arroz con Mariscos",precio:32,desc:"Arroz cremoso con conchas, langostinos y calamar",img:"img/arroz.jpg"},
{id:3,nombre:"Chicharrón de Pescado",precio:28,desc:"Pescado crocante con yuca frita y salsa tártara",img:"img/chicharron.jpg"},
{id:4,nombre:"Leche de Tigre Power",precio:18,desc:"Concentrado afrodisiaco, pescado, limón y ají limo",img:"img/leche.jpg"},
{id:5,nombre:"Jalea Mixta Dorada",precio:40,desc:"Pesca del día frita, chicharrón de mariscos y criolla",img:"img/jalea.jpg"},
{id:6,nombre:"Sudado de Pescado",precio:30,desc:"Pescado en caldo concentrado con tomate y culantro",img:"img/sudado.jpg"}
];

let carrito = [];
const grid = document.getElementById('menu-grid');

platos.forEach(p=>{
grid.innerHTML+=`<div class="card"><img src="${p.img}" alt="${p.nombre}"><div class="card-body"><h3>${p.nombre}</h3><p>${p.desc}</p><div class="price">S/ ${p.precio.toFixed(2)}</div><button onclick="addToCart(${p.id})">Agregar al carrito</button></div></div>`;
});

function addToCart(id){
  const plato=platos.find(x=>x.id===id);
  const exist=carrito.find(x=>x.id===id);
  if(exist){exist.qty++}else{carrito.push({...plato,qty:1})}
  updateCart();
  openCart();
}

function updateCart(){
  const count=carrito.reduce((a,b)=>a+b.qty,0);
  document.getElementById('cart-count').textContent=count;
  let total=0;
  const container=document.getElementById('cartItems');
  if(carrito.length===0){
    container.innerHTML=`<p class="empty">Carrito vacío, ¡agrega algo rico! 🐟</p>`
  }else{
    container.innerHTML='';
    carrito.forEach(item=>{
      total+=item.precio*item.qty;
      container.innerHTML+=`<div class="cart-item"><div><strong>${item.nombre}</strong><br><small>S/ ${item.precio} x ${item.qty}</small></div><div><button onclick="changeQty(${item.id},-1)">-</button> <button onclick="changeQty(${item.id},1)">+</button></div></div>`;
    });
  }
  document.getElementById('total').textContent=total.toFixed(2);
}

function changeQty(id,delta){
  const item=carrito.find(x=>x.id===id);
  if(!item)return;
  item.qty+=delta;
  if(item.qty<=0)carrito=carrito.filter(x=>x.id!==id);
  updateCart();
}

function openCart(){
  document.getElementById('cartModal').classList.add('open');
  document.getElementById('overlay').classList.add('show')
}

function closeCart(){
  document.getElementById('cartModal').classList.remove('open');
  document.getElementById('overlay').classList.remove('show')
}

function sendWhatsApp(){
  if(carrito.length===0){alert('Carrito vacío');return}
  let mensaje=`Hola! Soy cliente de El Ancla Dorada ⚓%0A%0AQuiero hacer este pedido:%0A`;
  carrito.forEach(i=>{mensaje+=`- ${i.nombre} x${i.qty} (S/ ${i.precio*i.qty})%0A`});
  const total=document.getElementById('total').textContent;
  mensaje+=`%0ATotal: S/ ${total}%0A%0ADirección: %0ANombre: `;
  const numero="51954386577";
  window.open(`https://wa.me/${numero}?text=${mensaje}`,'_blank');
}

// MODO OSCURO NUEVO
function toggleMode(){
 document.body.classList.toggle('dark');
 const btn = document.querySelector('.btn-mode');
 btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}
