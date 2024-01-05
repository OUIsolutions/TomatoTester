
const TOMATO_DEFAULT_SEED = 'Qsdaonuninfinr#';
let tomato_nums = [];
let tomato_char_point = 0;
let total_generations = 0;

/**
 * @return number
 * */
function tomato_get_next_num(){
    if(tomato_char_point >= tomato_nums.length){
        tomato_char_point = 0;
    }
    let current_num  =  tomato_nums[tomato_char_point];
    tomato_char_point+=1;
    return current_num;

}
/**
 * @param {string} seed
 * @return {Array<number>}
 * */
function tomato_create_tomato_nums(seed){
    let chars =  seed.split('');
    return chars.map(char => char.charCodeAt(0));
}

function tomato_get_rgb_number(){
    let generated_seed  = 0;
    total_generations+=1;

    for(let i =0; i < tomato_nums.length + 1; i++){
        let current_num = tomato_get_next_num();
        generated_seed += current_num * total_generations;
    }
    
    //transform generated_seed into an number from 0 to 255
    return generated_seed % 256;


}

function tomato_generate_pseudo_random_colors(){
    //determine Math seed

    tomato_get_rgb_number();

    let red =  tomato_get_rgb_number();
    let green = tomato_get_rgb_number();
    let blue =  tomato_get_rgb_number();


    let color = 'black';
    if(red + green + blue < 300){
        color = 'white';
    }

    return {
        rgb: `rgb(${red},${green},${blue})`,
        color: color
    };
  
}

function tomato_process_elements(){

    let all_elements = document.body.querySelectorAll('*');
    
    //these is to avoid reprocessing elements
    let filtered_elements = all_elements.filter(element => element.getAttribute('tomato'));
    
    filtered_elements.forEach(element => {
        //set the tomato attribute
        element.setAttribute('tomato', 'true');

        if(element.style){
            let tomato_colors = tomato_generate_pseudo_random_colors();
            element.style.backgroundColor = tomato_colors.rgb;
            element.style.color = tomato_colors.color;
        }
    });
}


function tomato_start(seed){


    if(seed){
        tomato_nums = tomato_create_tomato_nums(seed);
    }
    else {
        tomato_nums = tomato_create_tomato_nums(TOMATO_DEFAULT_SEED);
    }

    window.addEventListener('load', ()=>{
        tomato_process_elements();
        const observer = new MutationObserver(tomato_process_elements);
        const config = { childList: true, subtree: true };
        observer.observe(document.body, config);
    });

}
