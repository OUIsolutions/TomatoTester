
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
 * @property {number=undefined} max_difference
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
    props.max_difference = get_value_or_default(props.max_difference,TOMATO_MAX_DIFFERENCE);

    return  props;
}