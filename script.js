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

// ... existing code ...

function displayCardDetails(cardData) {
    const cardContainer = document.getElementById('cardDetails');
    let cardText = cardData.oracle_text || 'No text available';

    // Check for special card types like Adventure
    if (cardData.card_faces && cardData.card_faces.length > 1) {
        cardText = cardData.card_faces.map(face => `${face.name}: ${face.oracle_text}`).join('\n\n');
    }

    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerHTML = `
        <h2>${cardData.name}</h2>
        <p>${cardData.mana_cost}</p>
        <p><i>${cardData.type_line}</i></p>
        <p>${cardText}</p>
    `;
    cardContainer.appendChild(cardElement);
}

// Improved Copy to Clipboard Function
document.getElementById('copyBtn').addEventListener('click', () => {
    const cardDetailsText = document.getElementById('cardDetails').innerText;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(cardDetailsText)
            .then(() => alert('Copied to clipboard!'))
            .catch(err => console.error('Error in copying text: ', err));
    } else {
        // Fallback for browsers without Clipboard API support
        const textarea = document.createElement('textarea');
        textarea.value = cardDetailsText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        alert('Copied to clipboard!');
    }
});
