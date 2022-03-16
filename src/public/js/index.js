const origin = window.location.origin;

function handleSignupFormSubmit(e) {
  e.preventDefault();

  const signupForm = document.querySelector('form');
  const formDataEntries = new FormData(signupForm).entries();
  const { url } = Object.fromEntries(formDataEntries);

  console.log({ url });

  fetch(`${origin}/short-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  }).then(async (data) => {
    console.log(await data.json());
  });
}