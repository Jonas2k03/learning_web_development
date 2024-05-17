//1 es piedra, 2 es papel, 3 es tijera
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + min) + min);
  }
  function eleccion(jugada) {
    let resultado;
    if (jugada == 1) {
      resultado = "PIEDRA";
    } else if (jugada == 2) {
      resultado = "PAPEL";
    } else if (jugada == 3) {
      resultado = "TIJERA";
    } else {
      resultado = "OPCION NO VALIDA";
    }
    return resultado;
  }

  function jugar(pc, jugador) {
    // opcionJugador = jugador;
    // opcionPC = pc;
    if (pc == jugador) {
      return -1;
    } else if (jugador == 1 && pc == 3) {
      return jugador;
    } else if (jugador == 2 && pc == 1) {
      return jugador;
    } else if (jugador == 3 && pc == 2) {
      return jugador;
    } else {
      return pc;
    }
  }

  let pc;
  let jugador;

  //COMBATE

  let contadorJugador = 0;
  let contadorPC = 0;

  while (contadorJugador < 2 && contadorPC < 2) {
    pc = aleatorio(1, 3);
    jugador = prompt("Elige: 1. Piedra, 2. Papel, 3. Tijera");

    alert("Tu eliges: " + eleccion(jugador));
    alert("El PC elige: " + eleccion(pc));
    jugada = jugar(pc, jugador);

    if (jugada == jugador) {
      contadorJugador++;
      contadorPC--;
      alert("Has ganado " + contadorJugador + " rondas.");
    } else if (jugada == pc) {
      contadorPC++;
      contadorJugador--;
      alert("Has ganado " + contadorJugador + " rondas.");
    } else {
      alert("Has ganado " + contadorJugador + " rondas.");
    }
  }

  if (contadorJugador == 2) {
    alert("GANASTE");
  } else {
    alert("PERDISTE");
  }