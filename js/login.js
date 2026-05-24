$(document).ready(function () {
  const loginpengguna = JSON.parse(localStorage.getItem("loginpengguna"));

  if (loginpengguna) {
    window.location.href = "index.html";
  }

  $("#loginform").submit(function (e) {
    e.preventDefault();

    const email = $("#loginemail").val().trim();
    const password = $("#loginpassword").val().trim();

    let pengguna = JSON.parse(localStorage.getItem("pengguna")) || [];

    const user = pengguna.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      alert("Login berhasil!");

      localStorage.setItem("loginpengguna", JSON.stringify(user));

      window.location.href = "index.html";
    } else {
      alert("Email atau password salah!");
    }
  });
});
