let allHeroes = [];


const loadData = (heroes) => {
  allHeroes = heroes
  createControls()
  renderTable(allHeroes)
}

function createControls(){
    const searchField = document.createElement('input');                                                                                                                  
        searchField.id = 'search-input';                                                                                                                                      
        searchField.placeholder = 'Search by name...';                                                                                                                        
        document.body.appendChild(searchField);  

    const select = document.createElement('select');                                                                                                                      
        select.id = 'page-size'; 
        const sizes = [10, 20, 50, 100, 'all'];                                                                                                                               
        for (const size of sizes) {                                                                                                                                           
            const option = document.createElement('option');                                                                                                                  
            option.value = size;                                                                                                                                              
            option.textContent = size;                                                                                                                                        
            if (size === 20) {
                option.selected = true; 
            }// default size is 20                                                                                                    
            select.appendChild(option);                                                                                                                         
        }                                                                                                                                                                     
        document.body.appendChild(select); 

    const prevButton = document.createElement('button');                                                                                                                  
        prevButton.id = 'prev-btn';                                                                                                                                           
        prevButton.textContent = 'Previous';                                                                                                                                  
        document.body.appendChild(prevButton);  

    const nextButton = document.createElement('button');                                                                                                                  
        nextButton.id = 'next-btn';                                                                                                                                           
        nextButton.textContent = 'Next';                                                                                                                                      
        document.body.appendChild(nextButton);

    const pageInfo = document.createElement('span');                                                                                                                      
        pageInfo.id = 'page-info';                                                                                                                                            
        pageInfo.textContent = 'Page 1 of 1';                                                                                                                                 
        document.body.appendChild(pageInfo);  
}

function renderTable(allHeroes){
    const table = document.createElement('table')

    const headers = [
      "Icon", "Name", "Full Name", "Intelligence", "Race", 
      "Gender", "Height", "Weight", "Place of Birth", "Alignment", 
      "Strength", "Speed", "Durability", "Power", "Combat"
    ];
    

    const tableHead = document.createElement('thead')
    const headerRow = document.createElement('tr')

    for( const header of headers){
        const th = document.createElement('th')
        th.textContent = header
        headerRow.appendChild(th)
    }

    tableHead.appendChild(headerRow)
    table.appendChild(tableHead)
    
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
 