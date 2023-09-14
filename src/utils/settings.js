let settings =
{
    idMap: "map",
    zoom: 7,
    urlTemplate: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    center: [1,1],
    atribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}

let settings_aco = 
{
    initial_feromone: 0.1,
    evaporation: 0.01,
    learning: 1,
    max_iterations:200,
    amount_ants:153
    
}

export {settings, settings_aco}
