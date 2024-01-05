

function tomato_random_rgb(){
    let red =  Math.floor(Math.random() * 256);
    let green =  Math.floor(Math.random() * 256);
    let blue =  Math.floor(Math.random() * 256);

    let color = 'black';
    if(red + green + blue < 300){
        color = 'white';
    }

    return {
        rgb: `rgb(${red},${green},${blue})`,
        color: color
    };
  
}

function tomato_process_elements(){
    
    let all_elements = document.body.querySelectorAll('*');
    all_elements.forEach(element => {
        if(element.style){
            let tomato_colors = tomato_random_rgb();
            element.style.backgroundColor = tomato_colors.rgb;
            element.style.color = tomato_colors.color;
        }
    });
}


function tomatto_start(){
    window.addEventListener('load', ()=>{
        tomatto_process_elements();
        //set an  listener for change dimensions
        const observer = new MutationObserver(tomatto_process_elements);
        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
    });

}
