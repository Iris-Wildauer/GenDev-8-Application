function getInsuranceWidgets() {
    return {
        category:"Versicherung",
        design:"style1",
        data: [
            {
                id: "insurance.policy_review",
                title: "Versicherungsvertrag überprüfen",
                picture: "images/530.jpg"
            },
            {
                id: "insurance.claim_assistance",
                title: "Unterstützung bei Schadensfällen",
                picture: "images/202.jpg"
            },
            {
                id: "insurance.providers_comparison",
                title: "Versicherungsanbieter vergleichen",
                picture: "images/303.jpg"
            }
        ]
    }
}

module.exports = { getInsuranceWidgets };