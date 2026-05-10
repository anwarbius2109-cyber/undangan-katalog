let semuaData = [];
let dataAktif = [];
let halaman = 1;
const perHalaman = 10;

fetch("data/katalog.json")
  .then(res => res.json())
  .then(data => {
    semuaData = data;
    dataAktif = data;
    tampilkan();
  });

function tampilkan(){
  const katalog = document.getElementById("katalog");
  const nomorWA = "6281261233730";

  katalog.innerHTML = `
  <div class="col-span-2 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4">

    ${Array(6).fill(`
      <div class="animate-pulse bg-white rounded-2xl overflow-hidden">
        <div class="bg-gray-200 h-64"></div>

        <div class="p-4">
          <div class="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    `).join("")}

  </div>
`;

  const start = (halaman - 1) * perHalaman;
  const end = start + perHalaman;
  const dataTampil = dataAktif.slice(start, end);

  dataTampil.forEach(item => {

    const pesan = `Halo kak 👋
Saya mau pesan undangan

✨ Tema: ${item.nama}
🔗 Preview: ${item.link}`;

    const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    katalog.innerHTML += `
      <div class="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 hover:-translate-y-2 overflow-hidden text-sm group border border-white/40 backdrop-blur">

        <div class="relative group">
          <img src="${item.gambar}" class="w-full aspect-[3/4] sm:aspect-[4/5] object-cover transition duration-500 group-hover:scale-105">

          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">

            <a href="${item.link}" target="_blank"
            class="bg-white/90 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              Preview
            </a>

            <a href="${linkWA}" target="_blank"
            class="bg-green-500 text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
              Order
            </a>

          </div>
        </div>

        <div class="p-3 text-center text-sm sm:text-base font-semibold">
          ${item.nama}
        </div>

      </div>
    `;
  });

  renderPagination();
}

function filterKategori(kategori){
  halaman = 1;

  if(kategori === "all"){
    dataAktif = semuaData;
  } else {
    dataAktif = semuaData.filter(item => item.kategori === kategori);
  }

  tampilkan();

  document.querySelectorAll(".btn-filter").forEach(btn => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");
}
/* =========================
   🔥 TAMBAH DI BAWAH INI
========================= */
function renderPagination(){
  let container = document.getElementById("pagination");

  if(!container){
    container = document.createElement("div");
    container.id = "pagination";
    container.className = "flex justify-center gap-3 mt-6";
    document.querySelector("#katalog").after(container);
  }

  const totalHalaman = Math.ceil(dataAktif.length / perHalaman);

  container.innerHTML = `
  <button onclick="prevPage()" 
    class="px-5 py-2.5 rounded-full border border-white/40 bg-white/70 backdrop-blur shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1 ${halaman === 1 ? 'opacity-40 cursor-not-allowed' : ''}">
    
    ← Prev
  </button>

  <div class="px-5 py-2.5 rounded-full bg-black text-white text-sm shadow-lg">
    ${halaman} / ${totalHalaman}
  </div>

  <button onclick="nextPage()" 
    class="px-5 py-2.5 rounded-full bg-black text-white shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-1 ${halaman === totalHalaman ? 'opacity-40 cursor-not-allowed' : ''}">
    
    Next →
  </button>
`;
}

function nextPage(){
  const totalHalaman = Math.ceil(dataAktif.length / perHalaman);
  if(halaman < totalHalaman){
    halaman++;
    tampilkan();

    const el = document.getElementById("katalog");
    const y = el.getBoundingClientRect().top + window.pageYOffset - 100;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }
}

function prevPage(){
  if(halaman > 1){
    halaman--;
    tampilkan();

    const el = document.getElementById("katalog");
    const y = el.getBoundingClientRect().top + window.pageYOffset - 100;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }
}
fetch("data/porto.json")
  .then(res => res.json())
  .then(data => {
    const porto = document.getElementById("portoList");

    // ❗ biar aman kalau section belum ada
    if(!porto) return;

    porto.innerHTML = "";

    data.forEach(item => {
      porto.innerHTML += `
        <div class="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 hover:-translate-y-2 overflow-hidden group border border-white/40">

          <div class="relative group">
            <img src="${item.gambar}" class="w-full h-80 object-cover transition duration-500 group-hover:scale-105">

            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">

              <a href="${item.link}" target="_blank"
              class="bg-white px-4 py-2 rounded-full text-sm font-semibold">
                Preview
              </a>

            </div>
          </div>

          <div class="p-4 text-center font-semibold">
            ${item.nama}
          </div>

        </div>
      `;
    });
  });
