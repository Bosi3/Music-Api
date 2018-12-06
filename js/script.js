 
  
      const createResultList = (results) => {
        console.log(results);
        const $results = document.querySelector(`.results`);
        $results.innerHTML = results.Search.map((resultMap) => {
            console.log("map", resultMap)
           return `<li class="liste" id="${resultMap.id}" >Title: ${resultMap.name}</li>`;
        });

    const search = value => {
        const url = `https://musicdemons.com/api/v1/artist`;
        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
              },
            body: `name=${value}`
        };

        fetch(url, options)
        .then(response => response.json())
        .then(data => createResultList(data));
        
    };
  

    const handleKeyUpSearch = e => {
        const $input = e.currentTarget;
        search($input.value);
        console.log($input.value)

    };

    const init = () => {
        document.querySelector(`.search`).addEventListener(`keyup`, handleKeyUpSearch);
    };

    init();
      }
    