document.getElementById('submitBtn').addEventListener('click', () => {
    const cardList = document.getElementById('cardList').value;
    const cardNames = cardList.split('\n');
    document.getElementById('cardDetails').innerHTML = '';
    cardNames.forEach(cardName => {
        if (cardName.trim() !== '') {
            fetchCardDetails(cardName.trim());
        }
    });
});

function fetchCardDetails(cardName) {
    fetch(`https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`)
        .then(response => response.json())
        .then(data => {
            displayCardDetails(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayCardDetails(cardData) {
    const cardContainer = document.getElementById('cardDetails');
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerHTML = `
        <h2>${cardData.name}</h2>
        <p>${cardData.mana_cost}</p>
        <p><i>${cardData.type_line}</i></p>
        <p>${cardData.oracle_text}</p>
    `;
    cardContainer.appendChild(cardElement);
}
