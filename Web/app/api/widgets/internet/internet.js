function getInternetWidgets(){
    return {
        category: "Internet",
        design:"style1",
        data: [
            {
                id: "internet.contract_update",
                title: "Internetvertrag optimieren",
                picture: "images/internet1.jpg"
            },
            {
                id:"internet.speed_test",
                title:"Internetgeschwindigkeit testen",
                picture: "images/internet2.jpg"
            },
            {
                id:"internet.providers_comparison",
                title:"Internetanbieter vergleichen",
                picture: "images/internet3.jpg"
            },
        ]
    }
}

module.exports = { getInternetWidgets };