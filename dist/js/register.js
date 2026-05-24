$(document).ready(function () {
  const loginpengguna = JSON.parse(localStorage.getItem("loginpengguna"));

  if (loginpengguna) {
    window.location.href = "index.html";
  }

  $("#registerform").submit(function (e) {
    e.preventDefault();

    const nama = $("#regnama").val().trim();
    const email = $("#regemail").val().trim();
    const password = $("#regpassword").val().trim();

    let pengguna = JSON.parse(localStorage.getItem("pengguna")) || [];

    const cekEmail = pengguna.find((user) => user.email === email);

    if (cekEmail) {
      alert("Email sudah terdaftar!");
      return;
    }

    const penggunabaru = {
      nama: nama,
      email: email,
      password: password,
    };

    pengguna.push(penggunabaru);

    localStorage.setItem("pengguna", JSON.stringify(pengguna));

    alert("Registrasi berhasil!");
    $("#registerform")[0].reset();

    window.location.href = "login.html";
  });
});
