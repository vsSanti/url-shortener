function handleSignupFormSubmit(e) {
  e.preventDefault();

  const signupForm = document.querySelector('form');
  const formDataEntries = new FormData(signupForm).entries();
  const { url } = Object.fromEntries(formDataEntries);

  console.log({ url });
}