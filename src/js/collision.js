export const collision = (pipecollision, mariocollision, goombacollision) => {
  const pipePosition = pipecollision.offsetLeft; // monitora o posicionamento class pipecontroller
  const marioPosition = mariocollision.offsetTop; //monitora o posicionamento class mariocontroller
  const goombaPosition = goombacollision.offsetLeft; //monitora o posicionamento class mariocontroller
  const marioLeftPosition = mariocollision.offsetLeft; //monitora o posicionamento class mariocontroller

  if (
    (pipePosition - marioLeftPosition < 60 &&
      pipePosition - marioLeftPosition > 0 &&
      marioPosition > 353) || // pipe death condition
    (goombaPosition - marioLeftPosition < 30 &&
      goombaPosition - marioLeftPosition > -15 && // foi colocado um valor menor que zero para evitar que o Mario passe muito rapido pelo Goomba e não morra
      marioPosition > 353) // goomba death condition
  ) {
    console.log("colisão");
    return true;
  } else {
    console.log("sem colisão");
    return false;
  }
};
