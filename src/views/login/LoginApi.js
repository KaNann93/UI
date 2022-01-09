export default async function auth(
  e,
  email,
  password,
  setToken,
  sourcePath,
  hist
) {
  e.preventDefault();
  console.log(e);
  //let [token, setToken] = useState();
  //const email = document.getElementById("email").value;
  //const password = document.getElementById("password").value;
  console.log(email);
  console.log(password);
  //console.log("in Auth",(e.target),document.getElementById('email'),document.getElementById('password'));
  // const data=await fetchData("/users/email/"+email);
  const data = await fetchData("/login", email, password);
  //console.log(data.status);
  if (data.response === true) {
    console.log("Logged IN");
  }
  //const response = JSON.parse(data);
  //console.log(data);
  console.log(data.status);
  console.log(data.response);
  console.log(data.token);
  
  sessionStorage.setItem('token', data.token);
  //setToken({ token: data.token });
  if (sourcePath === "Login") {
    hist.push("/admin/dashboard");
  }
  // useFetch('https://rdhc-server.herokuapp.com/users');
}

const fetchData = async (url, email, password) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      //'Content-Type': "application/x-www-form-urlencoded"
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  //console.log("Response ::: " + response);
  const json = await response.json();
  return json;
};
