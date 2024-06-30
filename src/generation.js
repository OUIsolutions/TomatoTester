
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
    let not_repetitive = []
    all_generations.forEach(x =>{
        if(!not_repetitive.find(e => e.toString() === x.toString())){
            not_repetitive.push(x)
        }
    })

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




