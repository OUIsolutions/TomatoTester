

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