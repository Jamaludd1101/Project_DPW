$(document).ready(function () {
  const loginpengguna = JSON.parse(localStorage.getItem("loginpengguna"));

  if (!loginpengguna) {
    alert("Silakan login terlebih dahulu!");

    window.location.href = "login.html";
  }

  if (loginpengguna) {
    $("#nama").val(loginpengguna.nama);
    $("#email").val(loginpengguna.email);
  }

  function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
  }

  function hitungBooking() {
    const checkin = $("#checkin").val();
    const checkout = $("#checkout").val();

    const hargakamar = parseInt($("#kamar").val()) || 0;
    const jumlahtamu = parseInt($("#tamu").val()) || 1;

    const namakamar = $("#kamar option:selected").data("nama");

    let tambahan = parseInt($("input[name='sarapan']:checked").val()) || 0;

    let textlayanan = tambahan > 0 ? "Termasuk Sarapan" : "Kamar Saja";

    let durasi = 0;

    if (checkin && checkout) {
      const tglIn = new Date(checkin);

      const tglOut = new Date(checkout);

      const selisih = tglOut - tglIn;

      durasi = selisih / (1000 * 60 * 60 * 24);

      if (durasi < 1) {
        durasi = 0;
      }
    }
    if (durasi > 2) {
      tambahan = 0;
      textlayanan = "Gratis Sarapan";
    }

    const total = durasi * (hargakamar + tambahan);

    $("#textkamar").text(namakamar);

    $("#textdurasi").text(durasi + " Malam");

    $("#textlayanan").text(textlayanan);

    $("#texttamu").text(jumlahtamu + " Orang");

    $("#texttotal").text(formatRupiah(total));

    return {
      durasi,
      total,
      textlayanan,
      hargakamar,
      namakamar,
      jumlahtamu,
    };
  }

  $("#checkin, #checkout, #kamar, #tamu").on("change", function () {
    hitungBooking();
  });

  $("input[name='sarapan']").on("change", function () {
    hitungBooking();
  });

  $("#bookingform").submit(function (e) {
    e.preventDefault();

    const hasil = hitungBooking();

    if (hasil.durasi < 1) {
      alert("Tanggal booking tidak valid!");
      return;
    }

    let databooking = JSON.parse(localStorage.getItem("booking")) || [];

    const jumlahBooking = databooking.filter(
      (item) => item.kamar === hasil.namakamar,
    ).length;

    const kapasitas = kapasitasKamar[hasil.namakamar];

    if (jumlahBooking >= kapasitas) {
      alert("Maaf, kamar sudah penuh!");

      return;
    }
    const booking = {
      id: Date.now(),
      nama: $("#nama").val(),
      email: $("#email").val(),
      telepon: $("#telepon").val(),
      checkin: $("#checkin").val(),
      checkout: $("#checkout").val(),
      kamar: hasil.namakamar,
      hargakamar: hasil.hargakamar,
      durasi: hasil.durasi,
      jumlahtamu: $("#tamu").val(),
      layanan: hasil.textlayanan,
      catatan: $("#catatan").val(),
      total: hasil.total,
    };

    databooking.push(booking);

    localStorage.setItem("booking", JSON.stringify(databooking));

    alert("Booking berhasil!");

    console.log(booking);
    window.location.href = "rooms.html";

    $("#bookingform")[0].reset();

    if (loginpengguna) {
      $("#nama").val(loginpengguna.nama);
      $("#email").val(loginpengguna.email);
    }

    hitungBooking();
  });
});
