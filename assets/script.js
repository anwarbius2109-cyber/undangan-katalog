fetch("data/katalog.json")
  .then(res => res.json())
  .then(data => {

    const katalog = document.getElementById("katalog");
    const nomorWA = "6281261233730"; // ✅ TARUH DI SINI

    data.forEach(item => {

      katalog.innerHTML += `
        <div class="bg-white rounded-xl shadow overflow-hidden">

          <div class="relative">
            <img src="${item.gambar}" class="w-full h-80 object-cover">

            <!-- PREVIEW -->
            <a href="${item.link}" target="_blank"
            class="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full">
            Preview
            </a>

            <!-- ORDER -->
            <a href="https://wa.me/${nomorWA}?text=${encodeURIComponent(`Halo, saya mau pesan tema ${item.nama}\nLink: ${item.link}`)}"
            target="_blank"
            class="absolute bottom-2 left-1/2 -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full shadow">
            Order
            </a>
          </div>

          <div class="p-4 text-center font-semibold">
            ${item.nama}
          </div>

        </div>
      `;

    });
  });
