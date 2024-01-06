
/**
 * @typedef {object} TomatoPseudoRamdomColors
 * @property {string} rgb
 * @property {string} color
 */

/**
 * @param {number} seed
 * @return  {TomatoPseudoRamdomColors}*/
function tomato_generate_pseudo_random_colors(seed){
    //determine Math seed
    
    tomato_total_generations+=1;
    let red =  tomato_get_rgb_number(seed,0);
    let green = tomato_get_rgb_number(seed,1);
    let blue =  tomato_get_rgb_number(seed,2);

    tomato_last_generation = [red,green,blue];

    let color = 'black';
    if(red + green + blue < 300){
        color = 'white';
    }

    return {
        rgb: `rgb(${red},${green},${blue})`,
        color: color
    };
  
}

/**@param {number}seed */
function tomato_process_elements(seed){

    let all_elements = document.body.querySelectorAll('*');
    

    all_elements.forEach(element => {
        //set the tomato attribute
        if(element.getAttribute('tomato')){
            return;
        }
        element.setAttribute('tomato', 'true');

        if(element.style){
            let tomato_colors = tomato_generate_pseudo_random_colors(seed);
            element.style.backgroundColor = tomato_colors.rgb;
            element.style.color = tomato_colors.color;
        }
    });
}




function tomato_start(seed){

    let tomato_numerical_seed = 0;
    if(seed){
        tomato_numerical_seed = tomato_create_tomato_num_seed(seed);
    }
    else {
        tomato_numerical_seed = tomato_create_tomato_num_seed(TOMATO_DEFAULT_SEED);
    }



    window.addEventListener('load', ()=>{
        tomato_process_elements(tomato_numerical_seed);
        const observer = new MutationObserver( ()=>tomato_process_elements(tomato_numerical_seed));
        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
    });

}
