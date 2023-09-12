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
    evaporation: 1,
    alpha:1,
    beta:3,
    max_iterations:200,
    max_anc:200
    
}

export {settings, settings_aco}
