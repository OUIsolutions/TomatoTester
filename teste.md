Eai Galerinha, pra quem odiou a Absolute Position, trago pra vocês mais uma invenção maluca,que eu fiz , enquanto to aprendendo front end.

[Doc](https://ouisolutions.github.io/TomatoTestter/)

A Tomato Tester é uma lib que faz os elementos na tela ficarem pseudo aleatórios, tornando facil a depuração de elementos ,enquanto estilizamos as divs. A geração de cores é procedural,determinada por uma seed que você decidi. a lib por padrão tenta colocar os valores em tons pastéis, e sempre um ao oposto do outro,de modo que fique sempre fácil de visualizar , (mas você pode mudar isso),  ou testar novas seeds para encontrar a combinação de cores que mais se adapta pro seu gosto.
```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Full Generation</title>
        <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/TomatoTestter@main/versions/TomatoTestter_v0.956.js"></script>
        <script>
            let my_seed = 'hello my cold friend'
            tomato_start(my_seed)
        </script>
        <style>
            .container{
                width: 70vw;
                height: 70vh;
            }
            .child{
                width: 30%;
                height: 30%;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="child">
                <h4>child 1</h4>
            </div>
            <div class="child">
    
                <h4>child 2</h4>
            </div>
            <div class="child">
                <h4>child 3</h4>
            </div>
       
        </div>
    </body>
    </html>
```


[Exemplo Rodando](https://ouisolutions.github.io/TomatoTestter/internal/exemples/full.html)