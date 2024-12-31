// Select necessary DOM elements
const forms = document.querySelector(".forms");
const pwShowHide = document.querySelectorAll(".eye-icon");
const links = document.querySelectorAll(".link");

// Toggle password visibility
if (pwShowHide) {
    pwShowHide.forEach(eyeIcon => {
        eyeIcon.addEventListener("click", () => {
            const pwFields = eyeIcon.closest("form").querySelectorAll(".password");
            
            pwFields.forEach(passwordField => {
                if (passwordField.type === "password") {
                    passwordField.type = "text";
                    eyeIcon.classList.replace("bx-hide", "bx-show");
                    eyeIcon.setAttribute("aria-label", "Hide password"); // Accessibility improvement
                } else {
                    passwordField.type = "password";
                    eyeIcon.classList.replace("bx-show", "bx-hide");
                    eyeIcon.setAttribute("aria-label", "Show password");
                }
            });
        });
    });
}

// Toggle between login and signup forms
if (links) {
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault(); // Prevent default anchor behavior
            if (forms) {
                forms.classList.toggle("show-signup"); // Toggle CSS class to switch forms
            }
        });
    });
}
