let allHeroes = [];


const loadData = (heroes) => {
  allHeroes = heroes
  renderTable(allHeroes)
}

function renderTable(allHeroes){
    const table = document.createElement('table')
    
    
    for(const hero of allHeroes){
        const row = document.createElement('tr')
        
        const iconCell = document.createElement('td')
        const img = document.createElement('img')
        img.src = hero.images.xs
        iconCell.appendChild(img)
        row.appendChild(iconCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = hero.name
        row.appendChild(nameCell)

        const fullNameCell = document.createElement('td')
        fullNameCell.textContent = hero.biography.fullName
        row.appendChild(fullNameCell)

        const intelligenceCell = document.createElement('td')
        intelligenceCell.textContent = hero.powerstats.intelligence
        row.appendChild(intelligenceCell)

        const raceCell = document.createElement('td')
        raceCell.textContent = hero.appearance.race
        row.appendChild(raceCell)

        const genderCell = document.createElement('td')
        genderCell.textContent = hero.appearance.gender
        row.appendChild(genderCell)

        const heightCell = document.createElement('td')
        heightCell.textContent = hero.appearance.height
        row.appendChild(heightCell)

        const weightCell = document.createElement('td')
        weightCell.textContent = hero.appearance.weight
        row.appendChild(weightCell)

        const placeCell = document.createElement('td')
        placeCell.textContent = hero.biography.placeOfBirth
        row.appendChild(placeCell)

        const allignCell = document.createElement('td')
        allignCell.textContent = hero.biography.alignment
        row.appendChild(allignCell)

        const strengthCell = document.createElement('td');                                                                                                                        
        strengthCell.textContent = hero.powerstats.strength;                                                                                                                      
        row.appendChild(strengthCell);                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                             
        const speedCell = document.createElement('td');
        speedCell.textContent = hero.powerstats.speed;
        row.appendChild(speedCell);

        const durabilityCell = document.createElement('td');                                                                                                                      
        durabilityCell.textContent = hero.powerstats.durability;                                                                                                                  
        row.appendChild(durabilityCell);                                                                                                                                          
                                                                                                                                                                              
        const powerCell = document.createElement('td');
        powerCell.textContent = hero.powerstats.power;
        row.appendChild(powerCell);
  
        const combatCell = document.createElement('td');
        combatCell.textContent = hero.powerstats.combat;
        row.appendChild(combatCell);

        table.appendChild(row)
    }
    
    document.body.appendChild(table)
}  




fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  .then((response) => response.json()) 
  .then(loadData)
 