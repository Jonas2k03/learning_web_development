const btnMascotaJugador = document.getElementById("btnMascota");
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const btnReiniciar = document.getElementById("btnReiniciar");
const spanMascotaJugador = document.getElementById("jugador-mascota");
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')

const spanMascotaEnemigo = document.getElementById("enemigo-mascota");
const sectionReiniciar = document.getElementById('reiniciar')

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataquesDelJugador");
const ataquesDelEnemigo = document.getElementById("ataquesDelEnemigo");

const contenedorTarjetas = document.getElementById('contendor-tarjetas')
const contendorAtaques = document.getElementById('contendor-ataques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let mokepones = []
let ataqueJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;

let jugadorId = null
let enemigoId = null
let mokeponesEnemigos = []
let inputHipodoge
let inputCapipepo
let inputRatigueya
let inputBalerion
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let btnFuego
let btnAgua
let btnTierra
let botones = []
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3;
let vidasEnemigo = 3;
let indexAtaqueJugador
let indexAtaqueEnemigo
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let anchoDelMapa = window.innerWidth - 20
let alturaBuscada = (anchoDelMapa * 600) / 800
mapa.width = anchoDelMapa
mapa.height = alturaBuscada

const anchoMaxMapa = 350
if (anchoDelMapa > anchoMaxMapa) {
  anchoDelMapa = anchoMaxMapa - 20
}




class Mokepon {
  constructor(nombre, foto, vida, id = null) {
    this.id = id
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = []
    this.ancho = 100
    this.alto = 100

    this.x = aleatorio(0, mapa.width - this.ancho)
    this.y = aleatorio(0, mapa.height - this.alto)

    this.mapaFoto = new Image()
    this.mapaFoto.src = foto
    this.velocidadX = 0
    this.velocidadY = 0
  }
  pintarMokepon() {
    lienzo.drawImage(
      this.mapaFoto,
      this.x,
      this.y,
      this.alto,
      this.ancho
    )
  }
}



let hipodoge = new Mokepon('Hipodoge', './assets/mokepon-hipodoge.png', 5)
let capipepo = new Mokepon('Capipepo', './assets/mokepon-capipepo.png', 5)
let ratigueya = new Mokepon('Ratigueya', './assets/mokepon-ratigueya.png', 5)



const hipodoge_ataques = [
  { nombre: 'FUEGO', id: 'btnFuego' },
  { nombre: 'FUEGO', id: 'btnFuego' },
  { nombre: 'FUEGO', id: 'btnFuego' },
  { nombre: 'AGUA', id: 'btnAgua' },
  { nombre: 'TIERRA', id: 'btnTierra' },
]

hipodoge.ataques.push(...hipodoge_ataques)

const capipepo_ataques = [
  { nombre: 'AGUA', id: 'btnAgua' },
  { nombre: 'AGUA', id: 'btnAgua' },
  { nombre: 'AGUA', id: 'btnAgua' },
  { nombre: 'TIERRA', id: 'btnTierra' },
  { nombre: 'FUEGO', id: 'btnFuego' },
]

capipepo.ataques.push(...capipepo_ataques)

const ratigueya_ataques = [
  { nombre: 'TIERRA', id: 'btnTierra' },
  { nombre: 'TIERRA', id: 'btnTierra' },
  { nombre: 'TIERRA', id: 'btnTierra' },
  { nombre: 'AGUA', id: 'btnAgua' },
  { nombre: 'FUEGO', id: 'btnFuego' },
]

ratigueya.ataques.push(...ratigueya_ataques)


mokepones.push(hipodoge, capipepo, ratigueya)

function iniciarJuego() {

  sectionSeleccionarAtaque.style.display = 'none'
  sectionVerMapa.style.display = 'none'


  mokepones.forEach((Mokepon) => {
    opcionDeMokepones = `
    <input type="radio" id=${Mokepon.nombre} name="mascota" />
      <label for=${Mokepon.nombre} class="tarjeta-de-mokepon">
        <p>${Mokepon.nombre}</p>
        <img src=${Mokepon.foto} alt=${Mokepon.nombre} />
      </label>
      `
    contenedorTarjetas.innerHTML += opcionDeMokepones;

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')
    inputBalerion = document.getElementById('Balerion')

  })

  sectionReiniciar.style.display = 'none'

  btnMascotaJugador.addEventListener("click", seleccionarMascotaJugador);



  btnReiniciar.addEventListener("click", reiniciarJuego);
  unirseAlJuego()


}

function unirseAlJuego() {
  fetch("http://localhost:8080/unirse")
    .then(function (respuesta) {
      console.log(respuesta)
      if (respuesta.ok) {
        respuesta.text()
          .then(function (respuesta) {
            console.log(respuesta)
            jugadorId = respuesta
          })


      }
    })
}

function seleccionarMascotaJugador() {

  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  }

  else {
    alert("No ha seleccionado ninguna mascota");
    return
  }

  sectionSeleccionarMascota.style.display = 'none'
  seleccionarMokepon(mascotaJugador)
  extraerAtaques(mascotaJugador)
  sectionVerMapa.style.display = 'flex'
  iniciarMapa()


}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mokepon: mascotaJugador
    })
  })

}

function extraerAtaques(mascotaJugador) {
  let ataques

  for (let i = 0; i < mokepones.length; i++) {

    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques
    }

  }

  console.log(ataques)
  mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {

  ataques.forEach((ataque) => {
    ataquesMokepon = `<button id=${ataque.id} class="btnAtaque BAtaque">${ataque.nombre}</button>`
    contendorAtaques.innerHTML += ataquesMokepon
  }

  )

  btnFuego = document.getElementById("btnFuego");
  btnAgua = document.getElementById("btnAgua");
  btnTierra = document.getElementById("btnTierra");

  botones = document.querySelectorAll('.BAtaque')


}

function secuanciaAtaques() {
  botones.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      if (e.target.textContent === 'FUEGO') {
        ataqueJugador.push('FUEGO')
        console.log(ataqueJugador)
        boton.style.background = '#474F7A'
        boton.disabled = true;
      }
      else if (e.target.textContent === 'AGUA') {
        ataqueJugador.push('AGUA')
        console.log(ataqueJugador)
        boton.style.background = '#474F7A'
        boton.disabled = true;
      }
      else {
        ataqueJugador.push('TIERA')
        console.log(ataqueJugador)
        boton.style.background = '#474F7A'
        boton.disabled = true;
      }
      if (ataqueJugador.length === 5) {
        enviarAtaques()
      }
    })
  })

}

function enviarAtaques() {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ataques: ataqueJugador
    })

  })

  intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
  fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res) {
      if (res.ok) {
        res.json()
          .then(function ({ ataques }) {
            if (ataques.length === 5) {
              ataqueEnemigo = ataques
              combate()
            }
          })
      }
    })
}

function seleccionarMascotaEnemigo(enemigo) {

  spanMascotaEnemigo.innerHTML = enemigo.nombre
  ataquesMokeponEnemigo = enemigo.ataques
  secuanciaAtaques()
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



function ataqueRandomEnemigo() {
  randomAtaque = aleatorio(0, ataquesMokeponEnemigo.length - 1);

  if (randomAtaque == 0 || randomAtaque == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (randomAtaque == 3 || randomAtaque == 4) {
    ataqueEnemigo.push("AGUA");
  }
  else {
    ataqueEnemigo.push("TIERRA");
  }
  console.log(ataqueEnemigo)
  iniciarPelea()
}

function iniciarPelea() {
  if (ataqueJugador.length == 5) {
    combate();
  }
}

function indexAmbosOponente(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {

  clearInterval(intervalo)

  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] == ataqueEnemigo[index]) {
      indexAmbosOponente(index, index)
      crearMensaje("EMPATE")

    }
    else if (ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "TIERRA") {
      indexAmbosOponente(index, index)
      victoriasJugador++
      crearMensaje("GANASTE");
      spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO") {
      indexAmbosOponente(index, index)
      crearMensaje("GANASTE");
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else if (ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index] == "AGUA") {
      indexAmbosOponente(index, index)
      crearMensaje("GANASTE");
      victoriasJugador++
      spanVidasJugador.innerHTML = victoriasJugador
    } else {
      indexAmbosOponente(index, index)
      crearMensaje("PERDISTE");
      victoriasEnemigo++
      spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
  }


  revisarVidas();
}

function crearMensaje(resultado) {

  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo



  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function revisarVidas() {
  if (victoriasEnemigo === victoriasJugador) {
    crearMensajeVictoria("¡EMPATE!")
  }
  else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeVictoria(1)
  }
  else {
    crearMensajeVictoria(0)
  }


}

function crearMensajeVictoria(resultado) {
  let sectionMensajes = document.getElementById("resultado");

  let parrafo = document.createElement("p");
  if (resultado === 1) {
    sectionMensajes.innerHTML = "HAS GANADO.";
  } else {
    sectionMensajes.innerHTML = "HAS PERDIDO.";
  }


  sectionReiniciar.style.display = 'block'



}

function reiniciarJuego() {
  location.reload();
}

function pintarCanvas() {

  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
  lienzo.clearRect(0, 0, mapa.width, mapa.height)
  lienzo.drawImage(
    mapaBackground,
    0,
    0,
    mapa.width,
    mapa.height
  )
  mascotaJugadorObjeto.pintarMokepon()
  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

  mokeponesEnemigos.forEach(function (mokepon) {
    if (mokepon != undefined) {
      mokepon.pintarMokepon()
      revisarColision(mokepon)
    }

  })

  if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0) {
  }

}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x,
      y
    })
  })
    .then(function (res) {
      if (res.ok) {
        res.json()
          .then(function ({ enemigos }) {
            console.log(enemigos)

            mokeponesEnemigos = enemigos.map(function (enemigo) {
              let mokeponEnemigo = null
              if (enemigo.mokepon != undefined) {
                const mokeponNombre = enemigo.mokepon.nombre || ""
                if (mokeponNombre === "Hipodoge") {
                  mokeponEnemigo = new Mokepon('Hipodoge', './assets/mokepon-hipodoge.png', 5, enemigo.id)
                }
                else if (mokeponNombre === "Capipepo") {
                  mokeponEnemigo = new Mokepon('Capipepo', './assets/mokepon-capipepo.png', 5, enemigo.id)
                }
                else if (mokeponNombre === "Ratigueya") {
                  mokeponEnemigo = new Mokepon('Ratigueya', './assets/mokepon-ratigueya.png', 5, enemigo.id)
                }



                mokeponEnemigo.x = enemigo.x
                mokeponEnemigo.y = enemigo.y
              }


              return mokeponEnemigo
            })



          })
      }
    })
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {


  mascotaJugadorObjeto.velocidadX = 0
  mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "w":
      moverArriba()
      break
    case "s":
      moverAbajo()
      break

    case "a":
      moverIzquierda()
      break

    case "d":
      moverDerecha()
      break;

    default:

      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
  intervalo = setInterval(pintarCanvas, 50)
  window.addEventListener('keydown', sePresionoUnaTecla)
  window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() {
  for (let i = 0; i < mokepones.length; i++) {

    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i]
    }

  }
}

function revisarColision(enemigo) {

  const arribaEnemigo = enemigo.y
  const abajoEnemigo = enemigo.y + enemigo.alto
  const derechaEnemigo = enemigo.x + enemigo.ancho
  const izquierdaEnemigo = enemigo.x

  const arribaMascota = mascotaJugadorObjeto.y
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
  const izquierdaMascota = mascotaJugadorObjeto.x

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return
  }
  detenerMovimiento()
  clearInterval(intervalo)

  enemigoId = enemigo.id
  sectionSeleccionarAtaque.style.display = 'flex'
  sectionVerMapa.style.display = 'none'
  seleccionarMascotaEnemigo(enemigo);
}
window.addEventListener("load", iniciarJuego);
