
/**
 * @param {number} seed
 * @param {number}total_generation
 * */
function  tomato_get_rgb_pure(seed,total_generation){

    let multiplication =
        (seed + total_generation + tomato_max_rgb)*
        (total_generation + tomato_max_rgb);


    let result =  multiplication % tomato_max_rgb;
    if(result < tomato_min_rgb){
        result = tomato_min_rgb;
    }

    return result;
}

/**
 * @param {number} seed
 * @return {number}
 */
function tomato_get_rgb_number(seed){

    let last_rgb =  tomato_get_rgb_pure(seed,tomato_total_generations-1);
    const LIMIT_TRYS = 100;

    let max_try = LIMIT_TRYS + tomato_total_generations;

    let rgb = 0;
    tomato_total_generations+=1;

    for(;tomato_total_generations < max_try; tomato_total_generations++){

        rgb = tomato_get_rgb_pure(seed,tomato_total_generations);
        let difference = rgb - last_rgb;
        let positive_difference = Math.abs(difference);
        if(positive_difference > tomato_minimum_difference){
            break;
        }
    }

    return rgb


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