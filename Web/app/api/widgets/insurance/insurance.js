function getInsuranceWidgets() {
    return {
        category:"Versicherung",
        design:"style1",
        data: [
            {
                id: "insurance.policy_review",
                title: "Versicherungsvertrag überprüfen",
                picture: "images/versicherung1.jpg"
            },
            {
                id: "insurance.claim_assistance",
                title: "Unterstützung bei Schadensfällen",
                picture: "images/versicherung2.jpg"
            },
            {
                id: "insurance.providers_comparison",
                title: "Versicherungsanbieter vergleichen",
                picture: "images/versicherung3.jpg"
            }
        ]
    }
}

module.exports = { getInsuranceWidgets };