function getVacationWidgets() {
    return {
        category:"Urlaub",
        design:"style1",
        data: [
            {
                id: "vacation.destination_guide",
                title: "Reiseführer für Reiseziele",
                picture: "images/cat_on_beach.jpg"
            },
            {
                id: "vacation.travel_tips",
                title: "Reisetipps und Empfehlungen",
                picture: "images/mies_am_chillen.jpg"
            },
            {
                id: "vacation.package_comparison",
                title: "Pauschalangebote vergleichen",
                picture: "images/vacation_cat.jpg"
            }
        ]
    }
}

module.exports = { getVacationWidgets };