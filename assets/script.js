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

  katalog.innerHTML = "";

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
      <div class="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden text-sm">

        <div class="relative group">
          <img src="${item.gambar}" class="w-full aspect-[3/4] sm:aspect-[4/5] object-cover">

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
  function nextPage(){
  const totalHalaman = Math.ceil(dataAktif.length / perHalaman);
  if(halaman < totalHalaman){
    halaman++;
    tampilkan();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function prevPage(){
  if(halaman > 1){
    halaman--;
    tampilkan();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
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
      class="px-4 py-2 bg-gray-200 rounded ${halaman === 1 ? 'opacity-50 cursor-not-allowed' : ''}">
      Prev
    </button>

    <span class="px-4 py-2 text-sm">
      ${halaman} / ${totalHalaman}
    </span>

    <button onclick="nextPage()" 
      class="px-4 py-2 bg-black text-white rounded ${halaman === totalHalaman ? 'opacity-50 cursor-not-allowed' : ''}">
      Next
    </button>
  `;
}

function nextPage(){
  const totalHalaman = Math.ceil(dataAktif.length / perHalaman);
  if(halaman < totalHalaman){
    halaman++;
    tampilkan();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function prevPage(){
  if(halaman > 1){
    halaman--;
    tampilkan();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div class="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">

          <div class="relative group">
            <img src="${item.gambar}" class="w-full h-80 object-cover">

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
