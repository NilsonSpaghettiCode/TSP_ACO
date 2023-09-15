import { settings_aco } from "./utils/settings.js";
import { IPublisher, DataIterationACO } from "./Interfaces/IObserver.js";

class Ant {
  constructor(start) {
    this.path = [];
    this.nodo = start;
    this.aristas = []
    //this.addNode(this.nodo);
    //this.energy_total = 10; Variable inventada, estaria chevere ver como usarla
    if (start == "NONE") {
      this.cost = Infinity;
    } else
    {
      this.cost = 0;
    }
  }
  valueOf()
  {
    return this.cost
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

    this.cost += arista.peso;
    this.addNode(this.nodo);
    this.addAristas(arista)
  }

  pheromonalContribution()
  {
    return (settings_aco.learning/this.cost) //Revisar posibilidad de obtener 0
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

class ACO extends IPublisher{
  constructor(graph) {
    super();
    this.best_way = new Ant("NONE");
    this.graph = graph;
    this.iteration = 0;
    this.beginnings = [];
    this.ant_per_node = 0;
    this.names_nodes = Object.keys(this.graph.getNodos());
    
  }

  /**
   * Methods inherited
   */
  addSuscriber(suscriber)
  {
    this.suscribers.push(suscriber)
  }

  notifySuscribers(data)
  {
    for (const index in this.suscribers) {
      let suscriber = this.suscribers[index]
      let data_notify = new DataIterationACO(this.best_way, data)
      suscriber.update(data_notify)
    }
  }
  /**
   * Create array with all nodes for beginning (ANTS)
   */
  aprox() {
    this.generateBegings();
    let ants = this.buildAnts();
    let copy_ants_reset = _.cloneDeep(ants)
    
    for (let index = 0; index < settings_aco.max_iterations; index++) {
      this.runAnts(ants)
      let temporal_best_way = this.bestWay(ants)
      if (this.best_way > temporal_best_way) {
        this.best_way = _.cloneDeep(temporal_best_way)
      }
      this.notifySuscribers(index);

      this.updateFeromone(ants)
      ants = _.cloneDeep(copy_ants_reset)

    }
    return this.best_way;
  }
  updateFeromone(ants)
  {
    
    for (let index = 0; index < ants.length; index++) {

      const ant_i = ants[index];
      let aristas = ant_i.getAristas()
      let aporte_feromonal_hormiga = ant_i.pheromonalContribution()

      for (let index = 0; index < aristas.length; index++) {
        const arista_i = aristas[index];
        arista_i.agregarContribucionFeromona(aporte_feromonal_hormiga)  
      }
    }

    let nombres_aristas = this.graph.getNombresAristas()
    let aristas = this.graph.getAristas()
    for (let index = 0; index < nombres_aristas.length; index++) {
      const nombre_arista = nombres_aristas[index];
      aristas[nombre_arista].updateFeromona()
    }
   

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

  bestWay(ants) {
    let cost_actual = ants[0].getCost();
    let ant_best_way = {}
    for (let index = 1; index < ants.length; index++) {
      const ant_i = ants[index];
      if (cost_actual > ant_i.getCost()) {
        ant_best_way = ant_i
        cost_actual = ant_i.getCost()
      }
    }
    return ant_best_way;
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
  getBegin() {
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

  /**
   * Calculate the: amount of ants/nodes
   */
  calculateAntPerNode(
    amount_ants = settings_aco.amount_ants,
    amount_nodes = this.names_nodes.length
  ) {
    return Math.round(amount_ants / amount_nodes);
  }
  
}

export { ACO };
