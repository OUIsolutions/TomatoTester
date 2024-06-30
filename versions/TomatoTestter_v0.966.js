

/**
 * @param {number} num
 * @return {number}**/
function parse_to_positive(num){
    if(num <0){
        return num  * -1;
    }
    return  num;
}


/**
 * @param {Array<Array<number>>}already_generated
 @param {Array<number>} current_generation
 @return number
 * */
function get_mos_similar_element(already_generated,current_generation){
    let min = 1000000000
    already_generated.forEach(e =>{
            let current_min =
                (parse_to_positive(e[0] - current_generation[0])+
                parse_to_positive(e[1] - current_generation[1])+
                parse_to_positive(e[0] - current_generation[0]))*10
            if(current_min < min){
                min = current_min
            }
    })
    return min;
}

/**
 * @typedef {object} MaxSimilarity
 * @property {Array<number>} rgb
 * @property {number} most_similarity
 */




/**
 * @param {Array<Array<number>>}already_generated
    @param {Array<Array<number>>}current_generations
 @return {Array<MaxSimilarity>}
 * */
function construct_lowest_similarity(already_generated,current_generations){
    return current_generations.map(e => {
        return {
            most_similarity: get_mos_similar_element(already_generated, e),
            rgb: e
        }
    });
}

/**
 *
 * @param  {Array<MaxSimilarity>} generations
 * @return {Array<number>}
 */
function  get_max_similarity_rgb(generations){
    let max = generations[0]
    generations.forEach(e =>{
        if(e.most_similarity > max.most_similarity){
            max =  e
        }
    })
    return max.rgb
}

const TOMATO_DEFAULT_SEED = 'hello my cold friend';
const  TOMATO_MIN_RGB = 60;
const  TOMATO_MAX_RGB = 220;
const TOTA_GENERATIONS = 1000

/**
 * @typedef {object} TomatoPseudoRamdomColors
 * @property {string} rgb
 * @property {string} color
 */



/**
 * @typedef {object} TomatoGenerationProps
 * @property {number} total_generations
 * @property {Array<Array<number>>}already_generated
 * @return {Array<Array<number>>}
 * */


function generate_list_of_elements(props,generation){
    let all_generations = []
    for(let i = 0; i < TOTA_GENERATIONS; i++){
        generation.total_generations+=1;

        let red =  tomato_get_rgb_number(props,generation,10);
        let green = tomato_get_rgb_number(props,generation,20);
        let blue =  tomato_get_rgb_number(props,generation,30);
        let current_generation = [red,green,blue];
        all_generations.push(current_generation)

    }
    return all_generations
}



/**
 * @param {TomatoProps} props
 * @param {TomatoGenerationProps} generation
 * @return  {TomatoPseudoRamdomColors}*/
function tomato_generate_pseudo_random_colors(props,generation){
    //determine Math seed

    let all_generations =generate_list_of_elements(props,generation)

    let formatted_with_max = construct_lowest_similarity(generation.already_generated,all_generations)
    let current_generation = get_max_similarity_rgb(formatted_with_max)
    generation.already_generated.push(current_generation)
    let red =  current_generation[0]
    let green = current_generation[1]
    let blue = current_generation[2]


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
 * @param {TomatoGenerationProps} generation
 * @param {number} current_color
 * @return {number}
 */
function tomato_get_rgb_number(props,generation,current_color){


    let multiplication =  props.numerical_seed * (current_color ) * generation.total_generations;
    return (multiplication % (props.max_rgb - props.min_rgb)) + props.min_rgb;

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
        let mul_result = ascci_value * ascci_value;
        result = (result + mul_result);

    });
    return result;

}

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
 * @property {HTMLElement || function} target
 * @property {number=undefined} min_rgb
 * @property {number=undefined} max_rgb
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

    return  props;
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
        already_generated:[]
    };


    if(!formatted_props.target){
        formatted_props.target = ()=>document.body;
    }



    function internal_starter(){
        tomato_process_elements(formatted_props,generation_props);
        const observer = new MutationObserver( ()=>tomato_process_elements(formatted_props,generation_props));
        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
    }
    let target = undefined;


    //first we try to executate an normal function
    if(formatted_props.target instanceof  Function) {
        try{
            target= formatted_props.target();
        }
        catch(e){}
    }

    if(target){
        formatted_props.target = target;
    }

    let still_target_a_function = formatted_props.target instanceof  Function;

    if(!still_target_a_function){
        internal_starter();
        return;
    }

    if(still_target_a_function){
        let max_tries = 50;
        let interval = setInterval(()=>{

            try{
                target= formatted_props.target();
            }
            catch(e){
                console.log(e);
                clearInterval(interval);
            }


            if(target){
                formatted_props.target = target;
                internal_starter();
                clearInterval(interval);
            }

            max_tries--;
            if(max_tries < 0){
                clearInterval(interval);
                console.log('Tomato could not find the target element');
            }

        },100);

    }


}
