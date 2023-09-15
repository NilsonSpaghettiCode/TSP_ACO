//Visual Interface
class ISuscriber
{
    constructor()
    {

    }

    update(data)
    {
        throw new Error("Abstract method, it has that be implement.")
    }

}
//Algoritm
class IPublisher
{
    constructor()
    {
        this.suscribers = []
    }

    addSuscriber(suscriber)
    {
        throw new Error("Abstract method, it has that be implement.")
    }

    notifySuscribers(data)
    {
        throw new Error("Abstract method, it has that be implement.")
    }
}

class DataNotify
{

}

class DataIterationACO extends DataNotify
{
    /**
     * 
     * @param {*} path 
     * @param {*} iteration 
     */
    constructor(path, iteration)
    {
        super();
        this.path = path
        this.iteration = iteration
    }

    getPath()
    {
        return this.path
    }

    getIteration()
    {
        return this.iteration
    }
}

export {IPublisher, ISuscriber, DataIterationACO}