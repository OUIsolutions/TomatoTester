
const TOMATO_DEFAULT_SEED = 'hello my cold friend';
const  TOMATO_MIN_RGB = 60;
const  TOMATO_MAX_RGB = 220;
const  TOMATO_MAX_DIFFERENCE = 50;


/**
 * @param {any} value
 * @param {any} default_value
 * @return {any}
 * */

function get_value_or_default(value,default_value){
    if(value !== undefined &&  value !== null){
        return value;
    }
    return  default_value;
}

/**
 * @typedef {object} TomatoProps
 * @property {string=undefined} seed
 * @property {number} numerical_seed
 * @property {HTMLElement} target
 * @property {number=undefined} min_rgb
 * @property {number=undefined} max_rgb
 * @property {number=undefined} min_difference
 **/



/**
 * @param {object || undefined || null} element
 * @returns {TomatoProps}
 * */
function tomato_construct_props(element){
    /**@type {TomatoProps}*/
    let props = get_value_or_default(element,{});
    props.seed = get_value_or_default(props.seed,TOMATO_DEFAULT_SEED);
    props.min_rgb = get_value_or_default(props.min_rgb,TOMATO_MIN_RGB);
    props.max_rgb = get_value_or_default(props.max_rgb,TOMATO_MAX_RGB);
    props.min_difference = get_value_or_default(props.min_difference,TOMATO_MAX_DIFFERENCE);

    return  props;
}


/**
 * @param {TomatoProps} props
 * @param {TomatoGenerationProps} generation
 * @param {number} current_color
 * @return {number}
 */
function tomato_get_rgb_number(props,generation,current_color){


    let multiplication =  props.numerical_seed * (current_color +1) * generation.total_generations;
    let pseudo_random_rgb = (multiplication % (props.max_rgb - props.min_rgb)) + props.min_rgb;

    if(!generation.last_generation){
        return pseudo_random_rgb;
    }

    let last_rgb = generation.last_generation[current_color];


    let MAX_TRYS = 100;
    for(let i =1; i < MAX_TRYS;i++){

        let difference = Math.abs(pseudo_random_rgb - last_rgb);

        if(difference > props.min_difference){
            break;
        }
        multiplication =  props.numerical_seed * (current_color +1 + i) * generation.total_generations;
        pseudo_random_rgb = (multiplication % (props.max_rgb - props.min_rgb)) + props.min_rgb;

    }


    return pseudo_random_rgb;

}

/**
 * @param {string} seed
 * @return {number}
 * */

function tomato_create_tomato_num_seed(seed){
    let chars =  seed.split('');
    let result = 1;
    const ONE_MILLION_LIMIT = 1000000;

    chars.forEach(char => {
        let ascci_value = char.charCodeAt(0);
        result = (result * ascci_value) + 1;

        if(result > ONE_MILLION_LIMIT){
            result = result % ONE_MILLION_LIMIT;
        }

    });

    return result;

}

/**
 * @typedef {object} TomatoPseudoRamdomColors
 * @property {string} rgb
 * @property {string} color
 */

/**
 * @typedef {object} TomatoGenerationProps
 * @property {number} total_generations
 * @property {Array<number>} last_generation
 * */

/**
 * @param {TomatoProps} props
 * @param {TomatoGenerationProps} generation
 * @return  {TomatoPseudoRamdomColors}*/
function tomato_generate_pseudo_random_colors(props,generation){
    //determine Math seed
    generation.total_generations+=1;

    let red =  tomato_get_rgb_number(props,generation,0);
    let green = tomato_get_rgb_number(props,generation,1);
    let blue =  tomato_get_rgb_number(props,generation,2);

    generation.last_generation = [red,green,blue];

    let color = 'black';
    if(red + green + blue < 300){
        color = 'white';
    }

    return {
        rgb: `rgb(${red},${green},${blue})`,
        color: color
    };
  
}

/**@param {TomatoProps}props
 * @param {TomatoGenerationProps} generation
 * */
function tomato_process_elements(props,generation){

    let all_elements = props.target.querySelectorAll('*');

    all_elements.forEach(element => {
        //set the tomato attribute
        if(element.getAttribute('tomato')){
            return;
        }
        element.setAttribute('tomato', 'true');

        if(element.style){
            let tomato_colors = tomato_generate_pseudo_random_colors(props,generation);
            element.style.backgroundColor = tomato_colors.rgb;
            element.style.color = tomato_colors.color;
        }
    });
}



/**
 * @param {TomatoProps} props
 * */
function tomato_start(props=undefined){
    let formatted_props = tomato_construct_props(props);
    formatted_props.numerical_seed = tomato_create_tomato_num_seed(formatted_props.seed);


    /**@type {TomatoGenerationProps}*/
    let generation_props = {
        total_generations:0,
        last_generation:undefined
    }


    window.addEventListener('load', ()=>{

        if(formatted_props.target instanceof  Function){
            formatted_props.target = formatted_props.target();
        }

        if(!formatted_props.target){
            formatted_props.target = document.body;
        }

        tomato_process_elements(formatted_props,generation_props);

        const observer = new MutationObserver( ()=>tomato_process_elements(formatted_props,generation_props));
        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
    });

}

