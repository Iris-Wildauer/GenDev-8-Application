function getInsuranceWidgets() {
    return [
                {
                    id: "insurance.policy_review",
                    title: "Versicherungsvertrag überprüfen",
                    picture: "http://localhost:8080/images/cat.jpg"
                },
                {
                    id: "insurance.claim_assistance",
                    title: "Unterstützung bei Schadensfällen",
                    picture: "http://localhost:8080/images/cat2.jpg"
                },
                {
                    id: "insurance.providers_comparison",
                    title: "Versicherungsanbieter vergleichen",
                    picture: "http://localhost:8080/images/cat3.jpg"
                },
            ]

}

module.exports = { getInsuranceWidgets };