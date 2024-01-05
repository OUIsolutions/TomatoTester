

function tomato_random_rgb(){
    let red =  Math.floor(Math.random() * 256);
    let green =  Math.floor(Math.random() * 256);
    let blue =  Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
}

function tomatto_process_elements(){
    


    let all_elements = document.body.querySelectorAll('*');
    all_elements.forEach(element => {
        if(element.style){
            element.style.backgroundColor = tomato_random_rgb();
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
