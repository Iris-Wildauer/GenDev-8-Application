function getInsuranceWidgets() {
    console.log("link")
    return [
                {
                    id: "insurance.policy_review",
                    title: "Versicherungsvertrag überprüfen",
                    picture: "images/cat.jpg" //ganz wichtig kein / am anfang!!!!!
                },
                {
                    id: "insurance.claim_assistance",
                    title: "Unterstützung bei Schadensfällen",
                    picture: "images/cat2.jpg"
                },
                {
                    id: "insurance.providers_comparison",
                    title: "Versicherungsanbieter vergleichen",
                    picture: "images/cat3.jpg"
                },
            ]

}

module.exports = { getInsuranceWidgets };