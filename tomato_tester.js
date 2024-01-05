

let tomato_total_generations = 0;


/**
 * @param {number} seed
 * @return {number}
 */
function tomato_get_rgb_number(seed){
    tomato_total_generations+=1;
    const MAX_RGB = 255;

    //means it's the first generation
    if(tomato_total_generations === 1){
        let multiplication = seed * tomato_total_generations ;
        return  multiplication % MAX_RGB;
    }


    let last_multiplication =  seed * (tomato_total_generations -1);

    let last_rgb = last_multiplication % MAX_RGB;

    const LIMIT_TRYS = 100;
    const MININUM_DIFFERENCE = 100;
    let max_try = LIMIT_TRYS + tomato_total_generations;

    let rgb = 0;

    for(;tomato_total_generations < max_try; tomato_total_generations++){

        let multiplication = seed * tomato_total_generations;
        rgb = multiplication % MAX_RGB;
        let difference = rgb - last_rgb;
        let positive_difference = Math.abs(difference);
        if(positive_difference > MININUM_DIFFERENCE){
            break;
        }
    }

    console.log(rgb)

    return rgb


}
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
    

    let red =  tomato_get_rgb_number(seed);
    let green = tomato_get_rgb_number(seed);
    let blue =  tomato_get_rgb_number(seed);


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


/**
 * @param {string} seed
 * @return {number}
 * */

function tomato_create_tomato_num_seed(seed){
    let chars =  seed.split('');
    let result = 1;
    chars.forEach(char => {
        let ascci_value = char.charCodeAt(0);
        result = result * ascci_value;
    });

    const ONE_BILLION_LIMIT = 1000000000;
    result = result % ONE_BILLION_LIMIT;
    return result;

}

function tomato_start(seed){

    const TOMATO_DEFAULT_SEED = 'ssssssssss';
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
