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
    
}

export {settings, settings_aco}
