const origin = window.location.origin;

function handleSignupFormSubmit(e) {
  e.preventDefault();

  const signupForm = document.querySelector('form');
  const formDataEntries = new FormData(signupForm).entries();
  const { url } = Object.fromEntries(formDataEntries);

  if (!document.getElementById('#btn-copy-url-to-clipboard').classList.contains('hidden')) {
    document.getElementById('#btn-copy-url-to-clipboard').classList.add('hidden')
  }

  fetch(`${origin}/short-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  }).then(async (data) => {
    alias = (await data.json()).alias;
    document.getElementById('#btn-copy-url-to-clipboard').classList.remove('hidden');
  });
}

function copyShortUrlToClipboard() {
  navigator.clipboard.writeText(`${origin}/${alias}`);
  alert('Link copied to clipboard!');
}