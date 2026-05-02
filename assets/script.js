fetch("data/katalog.json")
  .then(res => res.json())
  .then(data => {
    const katalog = document.getElementById("katalog");

    data.forEach(item => {
      katalog.innerHTML += `
        <div class="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">

          <div class="relative">
            <img src="${item.gambar}" class="w-full h-80 object-cover">

            <a href="${item.link}" target="_blank"
              class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm">
              Preview
            </a>
          </div>

          <div class="p-4 text-center font-semibold">
            ${item.nama}
          </div>

        </div>
      `;
    });
  });
