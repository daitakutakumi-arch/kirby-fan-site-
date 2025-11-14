const form = document.getElementById("fanForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    message: form.message.value
  };

  try {
    await fetch(
      `https://api.github.com/repos/daitakutakumi-arch/kirby-fan-site-/dispatches`,
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github.everest-preview+json",
          "Authorization": "token あなたのPAT"
        },
        body: JSON.stringify({
          event_type: "add_post",
          client_payload: data
        })
      }
    );

    status.textContent = "投稿しました！";
    form.reset();
  } catch (err) {
    status.textContent = "エラー！";
    console.error(err);
  }
});

