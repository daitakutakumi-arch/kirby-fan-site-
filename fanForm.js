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
      `https://api.github.com/repos/daitakutakumi-arch.github.io/kirby-fan-site-/dispatches`,
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github.everest-preview+json",
          "Authorization": "token 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"
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
