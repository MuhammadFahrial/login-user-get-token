const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");
const login = document.getElementById("CTA");
const isLogin = document.querySelector(".isLogin");

const authLogin = async (username, password) => {
  const url = "https://dummyjson.com/auth/login";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
      // expiresInMins: 60, // optional
    }),
  };
  try {
    const res = await fetch(url, options);
    if (res.status === 200) {
      const result = await res.json();
      return result.token;
    }
  } catch (err) {
    console.error(err);
  }
};

const currentUser = async (username, password) => {
  const token = await authLogin(username, password);
  const url = "https://dummyjson.com/auth/me";
  const options = {
    method: "GET",
    headers: {
      Authorization: token,
    },
  };

  try {
    const res = await fetch(url, options);
    if (res.status === 401) {
      alert("Password dan Email Salah");
      isLogin.innerHTML = "";
    } else {
      const result = await res.json();
      const text = `
      <p>First Name : <span>${result.firstName}</span></p>
      <p>Last Name : <span>${result.lastName}</span> </p>
      <p>Age : <span>${result.age}</span></p>
      <p>Gender : <span>${result.gender}</span></p>
      <p>Email : <span>${result.email}</span></p>
      <p>Phone : <span>${result.phone}</span></p>
      `;
      isLogin.innerHTML += text;
    }
  } catch (err) {
    console.error(err);
  }
  inputUsername.value = "";
  inputPassword.value = "";
};

login.addEventListener("click", () => {
  currentUser(inputUsername.value, inputPassword.value);
});
