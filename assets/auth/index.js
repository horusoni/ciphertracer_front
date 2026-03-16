async function protectPage() {
  try {
    const response = await fetch(domain+"/auth-check", {
      credentials: "include"
    });

    if (!response.ok) {
      window.location.href = "/front/login/";
      return;
    }

  } catch (err) {
    window.location.href = "/front/login/";
  }
}

protectPage();
