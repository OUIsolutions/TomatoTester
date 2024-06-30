

/**
 * @param {TomatoProps} props
 * @param {TomatoGenerationProps} generation
 * @param {number} current_color
 * @return {number}
 */
function tomato_get_rgb_number(props,generation,current_color){

    while(true){
        let multiplication =  (props.numerical_seed * current_color) * (generation.total_generations *100);
        generation.total_generations+=1;
        let result = multiplication % props.max_rgb
        if(result > props.min_rgb){
            return result;
        }
    }



}

/**
 * @param {string} seed
 * @return {number}
 * */

function tomato_create_tomato_num_seed(seed){
    let chars =  seed.split('');
    let result = 1;
    const MAX_VALUE = 10000000000000;
    chars.forEach(char => {
        let ascci_value = char.charCodeAt(0) *100;
        result = (result * ascci_value);
        while(result > MAX_VALUE){
            result -= parseInt(result/100)
        }
    });


    return result;

}