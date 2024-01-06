# TomatoTester
A Repo to test Divs position

With TomatoTester you can test div positions easily,
it works by changing each tags to random colors


# Run 
for run, you just need to pass the cdn script tag into your project 
and them call the **tomato_start** function , with an seed

```html
<script src="https://cdn.jsdelivr.net/gh/OUIsolutions/TomatoTestter@main/versions/TomatoTestter_v0.960.js"></script>
<script>

    tomato_start()
</script>
```

# Full example
[Runnable Example](https://ouisolutions.github.io/TomatoTestter/internal/exemples/full.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Full Generation</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/TomatoTestter@main/versions/TomatoTestter_v0.960.js"></script>
    <script>tomato_start() </script>
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

# Source 
The source code its located in:
[Source](https://github.com/OUIsolutions/TomatoTestter)

# Colors Generation
The Colors are generated in a procedural way, trying to find pastel colors ,and making the 
colors became opposite to one to another.

# Modifying attributes
If you want to modify atrributes of the procedural genrataion , these can be easly done 
with

[Runnable Example](https://ouisolutions.github.io/TomatoTestter/internal/exemples/modifying.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modifying Generation</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/TomatoTestter@main/versions/TomatoTestter_v0.960.js"></script>
    <script>

        let props = {
            min_rgb:20,
            max_rgb:255,
            min_difference:0,
            target: ()=>document.body,
            seed:"Hello my Cold Friend"
        }

        tomato_start(props)

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

# Contribution or Forking

For Contributing on the source code, modify the modifications you want and then
add the source you added or removed inside the python array **SOURCES** located into 
the build.py, than call **python3 build.py** to generate an  new release, that will be saved 
into **versions** folder.
All the examples located into **interna/exmples** will be updated, based on the #lib# reference
located in **internal/exemples_not_linked** 

## Modifying the Readme 
the same as build , you can modify the **interna/readme.md** with the text or reference you want to make
than, the main **readme,md** will be updated
