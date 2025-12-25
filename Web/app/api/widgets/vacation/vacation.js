function getVacationWidgets() {
    return {
        category:"Urlaub",
        design:"style2",
        data: [
            {
                id: "vacation.destination_guide",
                title: "Reiseführer für Reiseziele",
                picture: "images/urlaub1.jpg"
            },
            {
                id: "vacation.travel_tips",
                title: "Reisetipps und Empfehlungen",
                picture: "images/urlaub2.jpg"
            },
            {
                id: "vacation.package_comparison",
                title: "Pauschalangebote vergleichen",
                picture: "images/urlaub3.jpg"
            }
        ]
    }
}

module.exports = { getVacationWidgets };