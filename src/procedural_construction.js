

/**
 * @param {number} seed
 * @param {number} current_color
 * @return {number}
 */
function tomato_get_rgb_number(seed,current_color){

    let multiplication =  seed * current_color  * tomato_total_generations;

    let result = (multiplication % (tomato_max_rgb + tomato_min_rgb));

    if(result < tomato_min_rgb){
        result = tomato_min_rgb;
    }

    return result;

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