

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