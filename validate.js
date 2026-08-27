 async function validate(boolean) {
  return new Promise((resolve, rejet) => {
    if (boolean === true) {
      resolve("todo ok");
    } else {
      rejet("todo mal");
    }
  });
}

 module.exports= validate
