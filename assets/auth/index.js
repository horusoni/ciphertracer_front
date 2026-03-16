async function protectPage() {
  try {
    const response = await fetch(domain+"/auth-check", {
      credentials: "include"
    });

    if (!response.ok) {
      window.location.href = "/login/";
      return;
    }

  } catch (err) {
    window.location.href = "/login/";
  }
}

protectPage();
