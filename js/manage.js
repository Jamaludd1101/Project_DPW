$(document).ready(function () {
  const loginpengguna = JSON.parse(localStorage.getItem("loginpengguna"));
  if (!loginpengguna) {
    alert("Silakan login terlebih dahulu!");

    window.location.href = "login.html";
  }

  let booking = JSON.parse(localStorage.getItem("booking")) || [];

  booking = booking.filter((booking) => booking.email === loginpengguna.email);

  function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
  }

  function membuatidbooking(kamar, index) {
    let kode = "BK";

    if (kamar.includes("Standard")) kode = "ST";
    else if (kamar.includes("Superior")) kode = "SU";
    else if (kamar.includes("Deluxe")) kode = "DE";
    else if (kamar.includes("President")) kode = "PR";

    return `#${kode}-${String(index + 1).padStart(4, "0")}`;
  }

  function tampilkanBooking(data) {
    let html = "";

    if (data.length === 0) {
      html = `
        <tr>
          <td colspan="7" class="text-center text-muted py-4">
            Belum ada reservasi
          </td>
        </tr>
      `;
    }

    data.forEach((booking, index) => {
      const idBooking = membuatidbooking(booking.kamar, index);

      html += `
        <tr>
          <td class="fw-bold">
            ${idBooking}
          </td>

          <td>
            ${booking.nama}
          </td>

          <td>
            ${booking.kamar}
          </td>

          <td>
            <small>
              ${booking.checkin} - ${booking.checkout}
            </small>
          </td>

          <td>
            ${booking.durasi} Malam
          </td>

          <td class="text-success fw-semibold">
            ${formatRupiah(booking.total)}
          </td>

            <td class="text-center">

            <button
                class="btn btn-warning btn-sm fw-semibold me-1 btnedit"
                data-id="${booking.id}"
            >
                Edit
            </button>

            <button
                class="btn btn-danger btn-sm fw-semibold btnhapus"
                data-id="${booking.id}"
            >
                Batal
            </button>
            </td>
        </tr>
      `;
    });

    $("#listreservasi").html(html);
  }
  tampilkanBooking(booking);

  $("#searchtamu").on("keyup", function () {
    const keyword = $(this).val().toLowerCase();

    const hasilFilter = booking.filter((booking) =>
      booking.nama.toLowerCase().includes(keyword),
    );

    tampilkanBooking(hasilFilter);
  });

  $(document).on("click", ".btnhapus", function () {
    const id = $(this).data("id");

    const konfirmasi = confirm("Yakin ingin membatalkan booking?");

    if (!konfirmasi) return;

    let semuaBooking = JSON.parse(localStorage.getItem("booking")) || [];

    semuaBooking = semuaBooking.filter((item) => item.id !== id);

    localStorage.setItem("booking", JSON.stringify(semuaBooking));

    booking = booking.filter((item) => item.id !== id);

    tampilkanBooking(booking);

    alert("Booking berhasil dibatalkan!");
  });

  $(document).on("click", ".btnedit", function () {
    const id = $(this).data("id");

    localStorage.setItem("editBookingId", id);
    window.location.href = "edit.html";
  });
});
