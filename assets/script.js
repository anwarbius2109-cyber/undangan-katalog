let semuaData = [];

fetch("data/katalog.json")
  .then(res => res.json())
  .then(data => {
    semuaData = data;
    tampilkan(data);
  });

function tampilkan(data){
  const katalog = document.getElementById("katalog");
  const nomorWA = "6281261233730";

  katalog.innerHTML = "";

  data.forEach(item => {

    const pesan = `Halo kak 👋
Saya mau pesan undangan

✨ Tema: ${item.nama}
🔗 Preview: ${item.link}`;

    const linkWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    katalog.innerHTML += `
      <div class="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden text-sm">

        <div class="relative group">
          <img src="${item.gambar}" class="w-full aspect-[3/4] sm:aspect-[4/5] object-cover">

          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">

            <a href="${item.link}" target="_blank"
            class="bg-white/90 px-4 py-2 rounded-full text-sm font-semibold">
              Preview
            </a>

            <a href="${linkWA}" target="_blank"
            class="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
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
}

function filterKategori(kategori){
  let hasil;

  if(kategori === "all"){
    hasil = semuaData;
  } else {
    hasil = semuaData.filter(item => item.kategori === kategori);
  }

  tampilkan(hasil);

  document.querySelectorAll(".btn-filter").forEach(btn => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");
}

/* =========================
   🔥 TAMBAH DI BAWAH INI
========================= */

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
