/* Código relacionado ao elemento sidebar  */

const close_btn = document.getElementById("close-btn");
const sidebar = document.querySelector('.main-aside');
const menu_btn = document.getElementById("menu-btn");

menu_btn.addEventListener('click', () => {
  sidebar.style.display = "block";
})

close_btn.addEventListener('click', () => {
  sidebar.style.display = "none";
})


/* Código relacionado ao tema */

const theme_toggler = document.querySelector(".theme-toggler");
const lightThemeButton = document.querySelector("#light-btn");
const darkThemeButton = document.querySelector("#dark-btn");

const availableThemes = ['light_mode', 'dark_mode'];

const loadTheme = (e) => {
  const theme = localStorage.getItem("theme_mode");

  if (!availableThemes.includes(theme)) {
    setTheme('dark_mode');
    return;
  }

  setTheme(theme);
}

const setTheme = (theme) => {

  if (theme === "dark_mode" ){
    darkThemeButton.classList.add("active");
    lightThemeButton.classList.remove("active");
  } else {
    lightThemeButton.classList.add("active");
    darkThemeButton.classList.remove("active");
  }

  document.body.setAttribute("data-theme", theme);
  saveTheme(theme)
}

const saveTheme = (theme) => {
  localStorage.setItem("theme_mode", theme);
}

window.addEventListener('load', loadTheme)

theme_toggler.addEventListener('click', (e) => {
  let theme = e.target.innerText;

  if (!availableThemes.includes(theme)) {
    return
  }
  
  setTheme(theme);
});
