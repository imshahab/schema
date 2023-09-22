document.addEventListener('DOMContentLoaded', ()=>{
    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    const generateBtnEl = document.querySelector('.get-btn')
    const darkBtnEl = document.querySelector('.dark-btn')
    const selectEl = document.getElementById('mode-selector')
    const seedColorEl = document.getElementById('seed-color')
    let colorsElArr = []
    let colorsHexElArr = []
    for (let i = 1; i < 6; i++) {
        colorsElArr.push(document.getElementById(`color-${i}`))
        colorsHexElArr.push(document.getElementById(`color-${i}-hex`))
    }
    colorsElArr.forEach(color => {
        
        color.firstChild.addEventListener('click', e => {
            navigator.clipboard.writeText(rgb2hex(e.target.parentElement.style.backgroundColor))
        })
    })

    colorsHexElArr.forEach(color => {
        color.addEventListener('click', e => {
            navigator.clipboard.writeText(e.target.innerHTML)
        })
    })
    
    generateColors()
    if (localStorage.getItem('darkMode')) {
        document.documentElement.style.setProperty('--background-color', '#1F2937')
        document.documentElement.style.setProperty('--button-color', '#3D4B60')
        document.documentElement.style.setProperty('--text-color', 'white')
        darkBtnEl.innerHTML = `<a class="fa-solid fa-sun"></a>`
   }  
   else {
       darkBtnEl.innerHTML = `<a class="fa-solid fa-moon"></a>`
   }
   

    darkBtnEl.addEventListener('click', () => {
        localStorage.getItem('darkMode')
            ? localStorage.removeItem('darkMode')
            : localStorage.setItem('darkMode', true) 
        location.reload()
    })
    

    generateBtnEl.addEventListener('click', generateColors)
    function generateColors(){
        fetch(`https://www.thecolorapi.com/scheme?hex=${seedColorEl.value.slice(1)}&format=json&mode=${selectEl.value}&count=5`)
            .then(result => result.json())
            .then(data => {
                for (let i = 0; i < data['colors'].length; i++){
                    colorsElArr[i].style.backgroundColor = data['colors'][i]['hex']['value']
                    colorsHexElArr[i].textContent = data['colors'][i]['hex']['value']
                }
            })
    }


})