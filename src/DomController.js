import { ISuscriber } from "./Interfaces/IObserver.js";
import { settings_dom, settings_aco } from "./utils/settings.js";

class DomController extends ISuscriber {
  constructor(ids) {
    super();
    this.ids = ids; //List
    this.elements = {};
  }

  update(data) {
    console.log("DOM: ", data);
    this.setIteration_actual(data.getIteration())
    this.setCosto(data.getPath().getCost());
  }

  setIteration_actual(iteracion) {
    this.elements[settings_dom.id_iteracion_i].textContent = iteracion + 1
  }

  setCosto(costo)
  {
    
    this.elements[settings_dom.id_costo].textContent = costo
  }

  setIterationMaxima()
  {
    this.elements[settings_dom.id_iteraciones_max].textContent = settings_aco.max_iterations
  }

  addEventsButtons(function_start, function_reset)
  {
    this.elements[settings_dom.btn_start].addEventListener('click', function_start);
    this.elements[settings_dom.btn_reset].addEventListener('click', function_reset);
  }

  startDefaultValues()
  {
    this.setElements()
    this.setIterationMaxima()
    this.alternateStateBtnReset()
  }

  reset()
  {
    this.setIteration_actual(-1)
  }

  alternateStateBtnStart()
  {
    let state = this.elements[settings_dom.btn_start].disabled
    if (state) {
      this.elements[settings_dom.btn_start].disabled = false
    } else
    {
      this.elements[settings_dom.btn_start].disabled = true
    }
  }

  alternateStateBtnReset()
  {
    let state = this.elements[settings_dom.btn_reset].disabled
    if (state) {
      this.elements[settings_dom.btn_reset].disabled = false
    } else
    {
      this.elements[settings_dom.btn_reset].disabled = true
    }
  }

  setElements() {
    for (const index in this.ids) {
        let _id = this.ids[index]
        let element = this.getElementById(_id)
        this.elements[_id] = element
    }
  }
  getElementById(id) {
    return document.getElementById(id);
  }
}

export { DomController };
