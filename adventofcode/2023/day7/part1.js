const fs = require('fs');
const x = fs.readFileSync('input.txt').toString().split('\n').map(item => {
    const [hand, bid] = item.split(' ')
    return { hand, bid: +bid }
})

const scoreMap = {
    "A": 13,
    "K": 12,
    "Q": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    "J": 1,
}

const combinationMap = {
    "5": "fok",
    "4": "fouk",
    "23": "fh",
    "32": "fh",
    "3": "toak",
    "22": "tp",
    "2": "op",
    "1": "hc"
}

function determineCombination(cards) {
    let map = ''
    for (const key in cards) {
        const card = cards[key]
        if (card > 1) {
            map += card
        }
    }
    return combinationMap[map || '1']
}

function determineHand(hand) {
    const answer = { cat: '', cards: {} }
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        answer[`score_${i}`] = scoreMap[card]
        if(answer.cards[card]) {
            if(card === 'J') {
                
            }
            answer.cards[card]++
        } else {
            answer.cards[card] = 1
        }
    }
    answer.cat = determineCombination(answer.cards)
    return answer
}

function sortByHand(arrayOfHnB) {
    const sorted = {
        fok: [],
        fouk: [],
        fh: [],
        toak: [],
        tp: [],
        op: [],
        hc: []
    }
    try {
        arrayOfHnB.forEach(player => {
            const { hand, bid } = player
            const handInfo = determineHand(hand)
            sorted[handInfo.cat].push({ ...handInfo, bid })
        })
    
        for (const key in sorted) {
            const element = sorted[key]
            element.sort((a, b) => {
                for (let i = 0; i <= 4; i++) {
                    if (a[`score_${i}`] !== b[`score_${i}`]) {
                        return a[`score_${i}`] - b[`score_${i}`];
                    }
                }
                return 0;
            })
        }
    
        return [
            ...sorted.hc,
            ...sorted.op,
            ...sorted.tp,
            ...sorted.toak,
            ...sorted.fh,
            ...sorted.fouk,
            ...sorted.fok,
        ].map((item, index) => item.bid * (index+1)).reduce((acc, curr) => acc+curr)
    } catch (error) {
        console.log(error.message)
    }
    
}

console.log(sortByHand(x))