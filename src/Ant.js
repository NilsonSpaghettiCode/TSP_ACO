import { settings_aco } from "./utils/settings.js";
class Ant {
  constructor(start) {
    this.path = [];
    this.nodo = start;
    this.aristas = []
    this.addNode(this.nodo);
    //this.energy_total = 10; Variable inventada, estaria chevere ver como usarla
    this.cost = 0;
  }

  addNode(name_node) {
    this.path.push(name_node);
  }

  addAristas(name_way)
  {
    this.aristas.push(name_way)
  }

  move(arista) {
    this.nodo = arista.nodo_fin.getNombre();
    let nombre_arista = arista.getNombre()

    this.cost += arista.peso;
    this.addNode(this.nodo);
    this.addAristas(nombre_arista)
  }
  length() {
    return this.path.length;
  }

  getNodoActual() {
    return this.nodo;
  }

  getPath() {
    return this.path;
  }

  getAristas()
  {
    return this.aristas
  }

  getCost() {
    return this.cost;
  }
}

class ACO {
  constructor(graph) {
    this.best_way = [];
    this.graph = graph;
    this.iteration = 0;
    this.beginnings = [];
    this.ant_per_node = 0;
    this.names_nodes = Object.keys(this.graph.getNodos());
  }

  /**
   * Create array with all nodes for beginning (ANTS)
   */
  aprox() {

    //console.log("DATA: ",this.beginnings)
    this.generateBegings();
    let ants = this.buildAnts();
    this.runAnts(ants)

    let ant_best_way = this.bestWay(ants)

    console.log(ant_best_way)

    console.log(ants)

    /**
     * let start = "EZE";
    let test = new Ant(start);
    console.log(test)

    
     * 
     */

    return this.best_way;
  }
  updateFeromone(ants)
  {

  }
  runAnts(ants)
  {
    for (let index = 0; index < ants.length; index++) {
      
      const ant = ants[index];

      while (ant.getPath().length != this.names_nodes.length) {

        let nextArista = this.getNextArista(ant);
        ant.move(nextArista);

      }

    }
  }
  getBegin() {
    //Arreglar
    let nombre_nodo = "";

    for (const i in this.beginnings) {
      if (this.beginnings[i].max_value != 0) {
        nombre_nodo = this.beginnings[i].name;

        this.beginnings[i].max_value -= 1;

        return nombre_nodo;
      }
    }
    nombre_nodo;
  }

  buildAnts(amount_ants = settings_aco.amount_ants) {
    //Revisar
    let ants = [];

    for (let index = 0; index < amount_ants; index++) {
      let nombre = this.getBegin();
      let ant_i = new Ant(nombre);
      ants.push(ant_i);
    }
    return ants;
  }

  bestWay(ants) {
    let cost_actual = ants[0].getCost();
    let best_way = ants[0].getPath();
    let ant_best_way = {}
    for (let index = 1; index < ants.length; index++) {
      const ant_i = ants[index];
      if (cost_actual > ant_i.getCost()) {
        best_way = ant_i.getPath();
        ant_best_way = ant_i
      }
    }
    return ant_best_way;
  }

  getNextArista(ant_i) {
    let nodo = "";
    let arista_siguiente = {};
    let path_ant = [];
    let neighbors = [];

    nodo = ant_i.getNodoActual();
    path_ant = ant_i.getPath();
    neighbors = this.graph.getNodosVecinos(nodo);

    let options = neighbors.filter(
      (arista) => !path_ant.includes(arista.nodo_fin.getNombre())
    );

    let addition_tao_visibility = 0;

    /**
     * REFACTORIZAR
     */
    for (let index = 0; index < options.length; index++) {
      const arista = options[index];
      let tao_visibility = arista.visibilidad * arista.feromona;
      arista.setVisibilidadFeromona(tao_visibility);
      addition_tao_visibility += tao_visibility;
    }

    for (let index = 0; index < options.length; index++) {
      const arista = options[index];
      let pxy = arista.getVisibilidadFeromona() / addition_tao_visibility;
      arista.setPxy(pxy);
    }

    let selection = Math.random();

    let value = 0;

    //console.log("Selecction", selection)

    for (let index = 0; index < options.length; index++) {
      const arista = options[index];
      let li = value;
      value += arista.getPxy();
      let ls = value;
      //console.log("[",li,",",ls,"]")
      if (selection >= li && selection <= ls) {
        arista_siguiente = arista;
        return arista_siguiente;
      }
    }

    /**
     * HASTA AQUÍ
     */
  }

  generateBegings() {
    //Refactorizar llamados a variables incesarios
    let ants_asigned = 0;
    let amount_nodes = this.names_nodes.length;
    let amount_ants = settings_aco.amount_ants;
    this.ant_per_node = this.calculateAntPerNode();

    let tempora_ant_per_node = this.ant_per_node;


    for (let i = 0; i < amount_nodes; i++) {  
      
      let data = {};
      
      if (i == amount_nodes - 1) {
        let total_ants = ants_asigned + tempora_ant_per_node; //Se calcula valor final

        if (total_ants != amount_ants) {
          let nw_max = amount_ants - ants_asigned;
          
          data = { name: this.names_nodes[i], max_value: nw_max };

          this.beginnings.push(data);

          ants_asigned += nw_max;
          
        } else {
          data = { name: this.names_nodes[i], max_value: tempora_ant_per_node };
          this.beginnings.push(data);
          
        }
      } else {
        data = { name: this.names_nodes[i], max_value: tempora_ant_per_node };
        
        this.beginnings.push(data);
        ants_asigned += tempora_ant_per_node;
      }
    }
    
  }
  calculateAntPerNode(
    amount_ants = settings_aco.amount_ants,
    amount_nodes = this.names_nodes.length
  ) {
    return Math.round(amount_ants / amount_nodes);
  }
  /**
   * Calculate the: amount of ants/nodes
   */
}

export { ACO };
