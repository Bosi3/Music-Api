
    let theId;
    let theName;
    let songId;
    const $results = document.querySelector(`.results`);
    const createResultList = (results) => {           
        $results.innerHTML = results.map((resultMap) => {
            //console.log("map", resultMap)
           return `<li class="liste" id="${resultMap.id}" > ${resultMap.name}</li>`;                       
        })
    };
 
    $results.addEventListener("click",function(e) { 
        let liste = document.querySelectorAll(".liste"); 
        $results.remove()       
                   // console.log(liste)
                   /* for (let i = 0; i < liste.length; i++) {
                        const element = liste[i];
                        element.remove()                        
                    }   */
                  
        if(e.target && e.target.nodeName == "LI") {
            //console.log(e.target.id + e.target.name +" was clicked");
           theId = e.target.id;
           }
       
        fetch(`https://musicdemons.com/api/v1/artist/${theId}/songs`)
           .then(res => res.json())
            .then( (song) => {  
                song.map((data)=>{
                let monSong = document.querySelector(".songs");
                let title = document.createElement("h2");
                let maLi = document.createElement("li");
                title.innerHTML = `${data.title}`;
                let ifrm = document.createElement("iframe");
                ifrm.setAttribute("src", `https://www.youtube.com/embed/${data.youtube_id}` );
                ifrm.setAttribute("class", "theiframe");
                ifrm.setAttribute("frameborder", "0");
                ifrm.setAttribute("allow", "autoplay; encrypted-media");
                ifrm.setAttribute("fullscreen", "");
                ifrm.setAttribute('min-width', '420');
                ifrm.setAttribute('min-height', '315');
                maLi.appendChild(title);
                maLi.appendChild(ifrm);
                monSong.appendChild(maLi);
                songId=`${data.id}`;
               
                })
    });
 })
     const search = value => {
         const url = `https://musicdemons.com/api/v1/artist/autocomplete`;
         const options = {
             method: "POST",
             headers: {
                 'Content-type': 'application/x-www-form-urlencoded'
               },
               body: `name=${value}`
             };
     
             fetch(url, options)
             .then(response => response.json())
               .then((responseData) => createResultList(responseData))              
     };

     const handleKeyUpSearch = e => {
         const $input = e.currentTarget;
         search($input.value);
         //console.log($input.value) 
     };
 
     const init = () => {
         document.querySelector(`.search`).addEventListener(`keyup`, handleKeyUpSearch);
     };

     init();
      
     
