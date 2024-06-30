

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