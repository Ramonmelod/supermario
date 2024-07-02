export const controller = () => {
  const mario = document.querySelector(".mario");
  const jump = () => {
    mario.classList.add("jump");
    setTimeout(() => {
      mario.classList.remove("jump"); //setTimeout faz com que o código espere algum tempo até ir para  a função anônima
    }, 1000);
  };

  const ativaJump = document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      jump();
    }
  });
};
