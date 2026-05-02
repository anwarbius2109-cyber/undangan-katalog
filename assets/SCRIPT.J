fetch("data/katalog.json")
  .then(res => res.json())
  .then(data => {

    const katalog = document.getElementById("katalog");
    const nomorWA = "6281261233730"; // ✅ TARUH DI SINI

    data.forEach(item => {

      katalog.innerHTML += `
        <div class="bg-white rounded-xl shadow overflow-hidden">

          <div class="relative group">

  <img src="${item.gambar}" class="w-full h-80 object-cover">

  <!-- OVERLAY -->
  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">

    <a href="${item.link}" target="_blank"
    class="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition">
      Preview
    </a>

    <a href="https://wa.me/${nomorWA}?text=${encodeURIComponent(`Halo, saya mau pesan tema ${item.nama}\nLink: ${item.link}`)}"
    target="_blank"
    class="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 hover:scale-105 transition shadow-lg">
      Order
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
