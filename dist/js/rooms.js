$(document).ready(function () {
  const booking = JSON.parse(localStorage.getItem("booking")) || [];
  $(".btnpesan").click(function () {
    window.location.href = "booking.html";
  });
  $(".room-card").each(function () {
    const card = $(this);
    const namaKamar = card.data("kamar");

    const kapasitas = kapasitasKamar[namaKamar];

    const jumlahBooking = booking.filter(
      (item) => item.kamar === namaKamar,
    ).length;

    const sisaKamar = kapasitas - jumlahBooking;

    if (sisaKamar > 0) {
      card
        .find(".sisakamar")
        .removeClass("text-danger")
        .addClass("text-primary")
        .text(`Sisa Kamar: ${sisaKamar}`);
    } else {
      card
        .find(".sisakamar")
        .removeClass("text-primary")
        .addClass("text-danger")
        .text("Kamar Penuh");
      card
        .find(".btnpesan")
        .removeClass("btn-custom")
        .addClass("btn-secondary")
        .text("Penuh")
        .removeAttr("href")
        .css({
          "pointer-events": "none",
          cursor: "not-allowed",
          opacity: "0.7",
        });
      card.css({
        opacity: "0.8",
      });
    }
  });
});
