import React, { Component } from "react";
import axios from "axios";
import Global from "../Global";

export default class BuscadorJugadores extends Component {
  selectEquipo = React.createRef();
  cajaJugador = React.createRef();

  state = {
    equipos: [],
    jugadoresPorEquipo: [],
  };
  loadEquipos = () => {
    var request = "api/Equipos";
    var url = Global.urlApiEquipos + request;
    axios.get(url).then((response) => {
      console.log(response.data);
      this.setState({
        equipos: response.data,
      });
    });
  };

  buscarJugadoresPorEquipo = (e) => {
    e.preventDefault();
    let idEquipo = this.selectEquipo.current.value;
    console.log("El id del equipo seleccionado es: " + idEquipo);
    let request = "api/Jugadores/JugadoresEquipos/" + idEquipo;
    var url = Global.urlApiEquipos + request;
    axios.get(url).then((response) => {
      console.log(response.data);
      this.setState({
        jugadoresPorEquipo: response.data,
      });
    });
  };

  buscarJugadoresPorNombre = (e) => {
    e.preventDefault();
    let jugador = this.cajaJugador.current.value;
    let request = "api/Jugadores/FindJugadores/" + jugador;
    var url = Global.urlApiEquipos + request;
    axios.get(url).then((response) => {
      console.log(response.data);
      this.setState({
        jugadoresPorEquipo: response.data,
      });
    });
  };

  componentDidMount = () => {
    this.loadEquipos();
  };

  render() {
    return (
      <div>
        <h1>Buscador Jugadores</h1>
        <form>
          <label>Nombre jugador: </label>
          <input type="text" ref={this.cajaJugador} />
          <button onClick={this.buscarJugadoresPorNombre}>
            Buscar por NOMBRE
          </button>
          <hr />
          <label>Seleccione equipo </label>
          <select ref={this.selectEquipo}>
            {this.state.equipos.map((equipo, index) => {
              return (
                <option key={index} value={equipo.idEquipo}>
                  {equipo.nombre}
                </option>
              );
            })}
          </select>
          <button onClick={this.buscarJugadoresPorEquipo}>
            Buscar jugadores
          </button>
        </form>

        <table border={1}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Posicion</th>
              <th>Pais</th>
              <th>Fecha nacimiento</th>
            </tr>
          </thead>
          <tbody>
            {this.state.jugadoresPorEquipo.map((jugador, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={jugador.imagen}
                      style={{ width: "150px", height: "150px" }}
                    ></img>
                  </td>
                  <td>{jugador.nombre}</td>
                  <td>{jugador.posicion}</td>
                  <td>{jugador.pais}</td>
                  <td>{jugador.fechaNacimiento}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
