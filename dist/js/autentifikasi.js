$(document).ready(function () {
  const loginpengguna = JSON.parse(localStorage.getItem("loginpengguna"));

  if (loginpengguna) {
    $("#navAuth").html(`
      <div class="dropdown">
        <button
          class="btn btn-light btn-sm dropdown-toggle fw-semibold"
          type="button"
          data-bs-toggle="dropdown"
        >
          ${loginpengguna.nama}
        </button>

        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <a class="dropdown-item border-bottom" href="manage.html">
              Manage Booking
            </a>
          </li>

          <li>
            <button class="dropdown-item text-danger" id="logoutBtn">
              Logout
            </button>
          </li>
        </ul>
      </div>
    `);

    $("#logoutBtn").click(function () {
      localStorage.removeItem("loginpengguna");

      alert("Logout berhasil");

      window.location.href = "login.html";
    });
  } else {
    $("#navAuth").html(`
      <a
        href="login.html"
        class="btn btn-outline-light btn-sm fw-semibold px-3"
      >
        Login
      </a>

      <a
        href="register.html"
        class="btn btn-light btn-sm text-dark fw-semibold px-3 d-none d-sm-block"
      >
        Register
      </a>
    `);
  }
});
