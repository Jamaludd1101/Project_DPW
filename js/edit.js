$(document).ready(function () {
  const loginpengguna = JSON.parse(localStorage.getItem("loginpengguna"));

  if (!loginpengguna) {
    alert("Silakan login!");

    window.location.href = "login.html";
  }
  const editId = Number(localStorage.getItem("editBookingId"));
  let semuaBooking = JSON.parse(localStorage.getItem("booking")) || [];

  const bookingDipilih = semuaBooking.find(
    (item) => item.id === editId && item.email === loginpengguna.email,
  );

  // Jika booking tidak ditemukan
  if (!bookingDipilih) {
    alert("Booking tidak ditemukan!");

    window.location.href = "manage.html";
  }

  $("#editnama").val(bookingDipilih.nama);

  $("#editcheckin").val(bookingDipilih.checkin);

  $("#editcheckout").val(bookingDipilih.checkout);

  $("#edittamu").val(bookingDipilih.jumlahTamu);

  $("#editcatatan").val(bookingDipilih.catatan);

  $("#editkelas").val(bookingDipilih.hargaKamar);

  if (bookingDipilih.layanan === "Termasuk Sarapan") {
    $("#sarapan").prop("checked", true);
  } else {
    $("#kamarsaja").prop("checked", true);
  }

  $("#editbookingform").submit(function (e) {
    e.preventDefault();

    const checkin = $("#editcheckin").val();

    const checkout = $("#editcheckout").val();

    const hargaKamar = parseInt($("#editkelas").val()) || 0;

    const namaKamar = $("#editkelas option:selected").text();

    const jumlahTamu = parseInt($("#edittamu").val()) || 1;

    let tambahan = parseInt($("input[name='sarapan']:checked").val()) || 0;

    let layanan = tambahan > 0 ? "Termasuk Sarapan" : "Kamar Saja";

    const tglIn = new Date(checkin);

    const tglOut = new Date(checkout);

    let durasi = (tglOut - tglIn) / (1000 * 60 * 60 * 24);

    if (durasi < 1) {
      alert("Tanggal tidak valid!");
      return;
    }

    if (durasi > 2) {
      tambahan = 0;

      layanan = "Gratis Sarapan";
    }

    const total = durasi * (hargaKamar + tambahan);

    const indexBooking = semuaBooking.findIndex((item) => item.id === editId);

    semuaBooking[indexBooking] = {
      ...semuaBooking[indexBooking],

      nama: $("#editnama").val(),

      checkin: checkin,

      checkout: checkout,

      kamar: namaKamar,

      hargaKamar: hargaKamar,

      jumlahTamu: jumlahTamu,

      durasi: durasi,

      layanan: layanan,

      catatan: $("#editcatatan").val(),

      total: total,
    };

    localStorage.setItem("booking", JSON.stringify(semuaBooking));

    alert("Booking berhasil diperbarui!");

    localStorage.removeItem("editBookingId");

    window.location.href = "manage.html";
  });
});
