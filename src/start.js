

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