function getInternetWidgets(){
    return {
        category: "Internet",
        design:"style1",
        data: [
            {
                id: "internet.contract_update",
                title: "Internetvertrag optimieren",
                picture: "images/200.jpg"
            },
            {
                id:"internet.speed_test",
                title:"Internetgeschwindigkeit testen",
                picture: "images/500.jpg"
            },
            {
                id:"internet.providers_comparison",
                title:"Internetanbieter vergleichen",
                picture: "images/599.jpg"
            },
        ]
    }
}

module.exports = { getInternetWidgets };