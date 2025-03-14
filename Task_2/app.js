function validateInput(input, errorId, validationFn) {
  const errorElement = document.getElementById(errorId);
  if (validationFn(input.value)) {
    errorElement.style.display = "none";
  } else {
    errorElement.style.display = "block";
  }
}

document.getElementById("name").addEventListener("blur", function () {
  validateInput(this, "nameError", (value) => value.trim() !== "");
});

document.getElementById("email").addEventListener("blur", function () {
  validateInput(this, "emailError", (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
});

document.getElementById("phone").addEventListener("blur", function () {
  validateInput(this, "phoneError", (value) => /^\d{10}$/.test(value));
});

document.getElementById("password").addEventListener("blur", function () {
  validateInput(this, "passwordError", (value) => value.length >= 6);
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let valid = true;

    // Validate all fields on submit
    ["name", "email", "phone", "password"].forEach((field) => {
      const input = document.getElementById(field);
      const errorId = field + "Error";
      validateInput(input, errorId, (value) => {
        if (field === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (field === "phone") return /^\d{10}$/.test(value);
        if (field === "password") return value.length >= 6;
        return value.trim() !== "";
      });
      if (document.getElementById(errorId).style.display === "block")
        valid = false;
    });

    if (valid) {
      document.getElementById("successMessage").style.display = "block";
      setTimeout(() => {
        document.getElementById("successMessage").style.display = "none";
        document.getElementById("registrationForm").reset();
      }, 3000);
    }
  });
